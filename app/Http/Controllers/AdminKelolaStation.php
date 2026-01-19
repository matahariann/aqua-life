<?php

namespace App\Http\Controllers;

use App\Models\Station;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class AdminKelolaStation extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
    
        // Ambil jumlah data per halaman dari request, default 10
        $perPage = $request->input('per_page', 10);
    
        // Validasi jumlah data per halaman
        $allowedPerPage = [5, 10, 25, 50, 100];
        if (!in_array($perPage, $allowedPerPage)) {
            $perPage = 10;
        }
    
        // Ambil data station dengan pagination
        $stations = Station::with([
            'waterType:id,name',
            'geoZone:id,name',
            'user:id,name,email,role,is_membership',
        ])
        ->orderBy('created_at', 'desc')
        ->paginate($perPage)
        ->withQueryString();
    
        $users = User::orderBy('created_at', 'desc')->paginate($perPage);
        // Kirim data ke view
        return Inertia::render("Admin/Kelola Station/page", [
            'auth' => [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                    'membership' => $user->is_membership,
                ]
            ],
            'stations' => $stations,
            'users' => $users
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role' => 'required|in:member,operator,admin',
            'is_membership' => 'boolean',
        ], [
            'name.required' => 'Nama tidak boleh kosong',
            'name.max' => 'Nama maksimal 255 karakter',
            'email.required' => 'Email tidak boleh kosong',
            'email.email' => 'Format email tidak valid',
            'email.unique' => 'Email sudah terdaftar',
            'email.max' => 'Email maksimal 255 karakter',
            'password.required' => 'Password tidak boleh kosong',
            'password.min' => 'Password minimal 8 karakter',
        ]);
    
        $validated['password'] = Hash::make($validated['password']);
    
        User::create($validated);
    
        return redirect()->back()->with('success', 'Pengguna berhasil ditambahkan');
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
            'password' => 'nullable|string|min:8',
            'role' => 'required|in:member,operator,admin',
            'is_membership' => 'boolean',
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

        if (!empty($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            unset($validated['password']);
        }

        $user->update($validated);

        return redirect()->back()->with('success', 'Pengguna berhasil diupdate');
    }

    public function destroy(Station $station)
    {
        $station->delete();
        return redirect()->back()->with('success', 'Pengguna berhasil dihapus');
    }
}
