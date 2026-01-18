<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function register()
    {
        return Inertia::render('Registrasi');
    }

    public function actionRegister(Request $request)
    {
        // Validasi input
        $validated = $request->validate([
            'name' => ['required', 'string', 'min:3', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'confirmed', 'min:8'], 
        ], [
            'name.required' => 'Nama tidak boleh kosong',
            'name.min' => 'Nama minimal 3 karakter',
            'email.required' => 'Email tidak boleh kosong',
            'email.email' => 'Format email tidak valid',
            'email.unique' => 'Email sudah terdaftar',
            'password.required' => 'Password tidak boleh kosong',
            'password.min' => 'Password minimal 8 karakter',
            'password.confirmed' => 'Password tidak sama',
        ]);

        try {
            // Buat user baru
            $user = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
                'role' => 'member', // Default role
                'is_membership' => false,
            ]);

            // Flash message sukses
            Session::flash('success', 'Registrasi berhasil! Selamat datang di AquaLife.');

            // Redirect ke halaman member history
            return redirect()->route('Login');

        } catch (\Exception $e) {
            // Flash message error
            Session::flash('error', 'Terjadi kesalahan saat registrasi. Silakan coba lagi.');
            return back()->withInput($request->except('password', 'password_confirmation'));
        }
    }
    public function login()
    {
        if (Auth::check()) {
            return redirect('/');
        } else {
            return Inertia::render('Login');
        }
    }

    public function actionLogin(Request $request)
    {
        $data = [
            'email' => $request->input('email'),
            'password' => $request->input('password'),
        ];

        if (Auth::attempt($data)) {
            $request->session()->regenerate();

            // Flash message sukses
            Session::flash('success', 'Login berhasil! Selamat datang.');

            // Redirect sesuai role
            if (Auth::user()->role === 'member') {
                return redirect()->route('member.history');
            } elseif (Auth::user()->role === 'operator') {
                return redirect()->route('operator.history');
            } if (Auth::user()->role === 'admin') {
                return redirect()->route('admin.kelola-pengguna');
            }
        }

        // Jika login gagal, return dengan error
        Session::flash('error', 'Email atau Password Salah');
        return back()->withErrors(['email' => 'Email atau Password Salah'])->withInput();
    }

    public function actionLogout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/login')->with('info', 'Anda telah berhasil logout.');
    }
}
