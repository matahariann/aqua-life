<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Models\Payment;
use Inertia\Inertia;

class MemberPembayaran extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();

        $perPage = $request->input('per_page', 10);
        $payments = \App\Models\Payment::where('id_user', $user->id)
            ->orderBy('created_at', 'desc')
            ->with(['user:id,email,membership_start_at,membership_end_at'])
            ->paginate($perPage)
            ->withQueryString()
            ->through(function ($payment) {
                $proof = (string) ($payment->proof ?? '');
                $proofUrl = $proof;

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
                    'snap_token' => $payment->snap_token,
                    'created_at' => $payment->created_at,
                    'user' => [
                        'membership_start_at' => $payment->user?->membership_start_at,
                        'membership_end_at' => $payment->user?->membership_end_at,
                    ]
                ];
            });

        return Inertia::render("Member/Pembayaran/page", [
            'auth' => [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                    'membership' => $user->is_membership,
                    'membership_start_at' => $user->membership_start_at,
                    'membership_end_at' => $user->membership_end_at,
                ]
            ],
            'payments' => $payments,
        ]);
    }

    public function store(Request $request)
    {
        $user = Auth::user();

        // Check if there's a pending payment
        $pendingPayment = Payment::where('id_user', $user->id)
            ->where('status', 'pending')
            ->orWhere('status', 'Pending')
            ->first();

        if ($pendingPayment) {
            // If already has snap_token, just return it so they can pay
            if ($pendingPayment->snap_token) {
                return redirect()->back()->with('snapToken', $pendingPayment->snap_token);
            }
            return redirect()->back()->with('error', 'Anda masih memiliki pengajuan pembayaran yang sedang diproses.');
        }

        \Midtrans\Config::$serverKey = config('midtrans.server_key');
        \Midtrans\Config::$isProduction = config('midtrans.is_production');
        \Midtrans\Config::$isSanitized = config('midtrans.is_sanitized');
        \Midtrans\Config::$is3ds = config('midtrans.is_3ds');

        $orderId = 'MEMBERSHIP-' . $user->id . '-' . time();
        $params = [
            'transaction_details' => [
                'order_id' => $orderId,
                'gross_amount' => 50000, // Harga membership
            ],
            'customer_details' => [
                'first_name' => $user->name,
                'email' => $user->email,
            ]
        ];

        try {
            $snapToken = \Midtrans\Snap::getSnapToken($params);

            Payment::create([
                'id_user' => $user->id,
                'status' => 'pending',
                'order_id' => $orderId,
                'snap_token' => $snapToken,
            ]);

            return redirect()->back()->with('snapToken', $snapToken);
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Gagal menghubungkan ke Midtrans: ' . $e->getMessage());
        }
    }

    /**
     * Update bukti pembayaran untuk history yang belum disetujui.
     */
    public function update(Request $request, Payment $payment)
    {
        // Dengan Midtrans, tidak perlu manual update bukti pembayaran.
        // Jika ada status gagal, user buat baru atau bayar ulang.
        return redirect()->back()->with('error', 'Pembayaran menggunakan Midtrans tidak dapat diedit secara manual.');
    }

    /**
     * Hapus history pembayaran yang belum disetujui.
     */
    public function destroy(Payment $payment)
    {
        $user = Auth::user();

        // Pastikan payment milik user & belum disetujui
        if ($payment->id_user !== $user->id || strtolower($payment->status) === 'approved') {
            abort(403, 'Anda tidak dapat membatalkan pembayaran ini.');
        }

        // Jika payment ini di-cancel, kita hapus dari database
        $payment->delete();

        return redirect()->back()->with('success', 'Transaksi berhasil dibatalkan.');
    }
}
