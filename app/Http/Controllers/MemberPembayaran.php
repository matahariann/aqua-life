<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MemberPembayaran extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();

        $perPage = $request->input('per_page', 10);
        $payments = \App\Models\Payment::where('id_user', $user->id)
            ->orderBy('created_at', 'desc')
            ->paginate($perPage)
            ->withQueryString();

        return Inertia::render("Member/Pembayaran/page", [
            'auth' => [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                    'membership' => $user->is_membership,
                ]
            ],
            'payments' => $payments,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'proof' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ], [
            'proof.required' => 'Bukti pembayaran wajib diunggah',
            'proof.image' => 'File harus berupa gambar',
            'proof.mimes' => 'Format gambar harus jpeg, png, jpg, atau gif',
            'proof.max' => 'Ukuran gambar maksimal 2MB',
        ]);

        $user = Auth::user();

        // Check if there's a pending payment
        $pendingPayment = \App\Models\Payment::where('id_user', $user->id)
            ->where('status', 'Pending')
            ->first();

        if ($pendingPayment) {
            return redirect()->back()->with('error', 'Anda masih memiliki pengajuan pembayaran yang sedang diproses.');
        }

        if ($request->hasFile('proof')) {
            $image = $request->file('proof');
            // Store image in public disk, in "payments" folder
            $path = $image->store('payments', 'public');

            \App\Models\Payment::create([
                'id_user' => $user->id,
                'proof' => $path,
                'status' => 'Pending',
            ]);

            return redirect()->back()->with('success', 'Bukti pembayaran berhasil diunggah dan sedang diproses admin.');
        }

        return redirect()->back()->with('error', 'Gagal mengunggah bukti pembayaran.');
    }
}
