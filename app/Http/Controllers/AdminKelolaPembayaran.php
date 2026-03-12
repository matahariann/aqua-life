<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Payment;

class AdminKelolaPembayaran extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();

        $perPage = $request->input('per_page', 10);
        $allowedPerPage = [5, 10, 25, 50, 100];
        if (!in_array($perPage, $allowedPerPage)) {
            $perPage = 10;
        }

        $payments = Payment::with(['user:id,email'])
            ->orderBy('created_at', 'desc')
            ->paginate($perPage)
            ->withQueryString()
            ->through(function ($payment) {
                $proof = (string) ($payment->proof ?? '');
                $proofUrl = $proof;

                // If it's a plain filename, assume it's in public disk via storage symlink
                if ($proof && !preg_match('/^https?:\/\//i', $proof)) {
                    if (strpos($proof, '/') === false) {
                        // Seeded file directly in public folder
                        $proofUrl = '/' . ltrim($proof, '/');
                    } else {
                        // Uploaded file under storage/app/public/...
                        $proofUrl = '/storage/' . ltrim($proof, '/');
                    }
                }

                return [
                    'id' => $payment->id,
                    'status' => $payment->status,
                    'proof' => $payment->proof,
                    'proof_url' => $proofUrl,
                    'created_at' => $payment->created_at,
                    'membership_start_at' => $payment->membership_start_at,
                    'membership_end_at' => $payment->membership_end_at,
                    'user' => [
                        'email' => $payment->user?->email,
                    ],
                ];
            });

        return Inertia::render("Admin/Kelola Pembayaran/page", [
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

    public function approve(Payment $payment)
    {
        // Set status payment disetujui
        $payment->status = 'approved';

        // Tanggal mulai membership = saat disetujui
        $start = now();
        $end = $start->copy()->addMonth();

        // Simpan tanggal berakhir membership di history pembayaran
        $payment->membership_end_at = $end;
        $payment->save();

        // Update status membership user terkait
        $user = $payment->user;
        if ($user && $user->role === 'member') {
            $user->is_membership = true;
            $user->save();
        }

        return redirect()->back()->with('success', 'Pembayaran disetujui');
    }

    public function reject(Payment $payment)
    {
        $payment->update(['status' => 'rejected']);
        return redirect()->back()->with('success', 'Pembayaran ditolak');
    }
}
