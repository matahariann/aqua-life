<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PaymentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $start = now();

        DB::table('payments')->insert([
            [
                'id' => 1,
                'proof' => 'contoh_bukti_pembayaran.jpeg',
                'status' => 'approved',
                'membership_start_at' => $start,
                'membership_end_at' => $start->copy()->addMonth(),
                'id_user' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'proof' => 'contoh_bukti_pembayaran.jpeg',
                'status' => 'pending',
                'membership_start_at' => null,
                'membership_end_at' => null,
                'id_user' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 3,
                'proof' => 'contoh_bukti_pembayaran.jpeg',
                'status' => 'rejected',
                'membership_start_at' => null,
                'membership_end_at' => null,
                'id_user' => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
