<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Payment;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class MidtransWebhookController extends Controller
{
    public function handle(Request $request)
    {
        $payload = $request->all();

        Log::info('Midtrans Webhook Received: ', $payload);

        $orderId = $payload['order_id'] ?? '';
        $statusCode = $payload['status_code'] ?? '';
        $grossAmount = $payload['gross_amount'] ?? '';
        $signatureKey = $payload['signature_key'] ?? '';
        $transactionStatus = $payload['transaction_status'] ?? '';

        $serverKey = config('midtrans.server_key');
        
        // Verifikasi Signature
        $calculatedSignature = hash('sha512', $orderId . $statusCode . $grossAmount . $serverKey);

        if ($calculatedSignature !== $signatureKey) {
            Log::warning('Midtrans Webhook Signature Mismatch: ', $payload);
            return response()->json(['message' => 'Invalid signature'], 403);
        }

        $payment = Payment::where('order_id', $orderId)->first();

        if (!$payment) {
            Log::warning('Midtrans Webhook Payment Not Found: ' . $orderId);
            return response()->json(['message' => 'Payment not found'], 404);
        }

        // Handle based on transaction status
        if ($transactionStatus == 'capture' || $transactionStatus == 'settlement') {
            $payment->update(['status' => 'approved']);

            // Update user membership
            $user = User::find($payment->id_user);
            if ($user && $user->role === 'member') {
                $user->is_membership = true;
                $user->membership_start_at = now();
                $user->membership_end_at = now()->addMonth();
                $user->save();
            }
        } elseif ($transactionStatus == 'deny' || $transactionStatus == 'expire' || $transactionStatus == 'cancel' || $transactionStatus == 'failure') {
            $payment->update(['status' => 'rejected']);

            // Update status membership user terkait menjadi tidak aktif jika ditolak
            $user = User::find($payment->id_user);
            if ($user && $user->role === 'member') {
                $user->is_membership = false;
                $user->membership_start_at = null;
                $user->membership_end_at = null;
                $user->save();
            }
        } elseif ($transactionStatus == 'pending') {
            $payment->update(['status' => 'pending']);
        }

        return response()->json(['message' => 'Webhook processed successfully']);
    }
}
