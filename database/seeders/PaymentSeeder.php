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
        DB::table('payments')->insert([
            [
                'id' => 1,
                'proof' => 'contoh_bukti_pembayaran.jpeg',
                'status' => 'approved',
                'id_user' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'proof' => 'contoh_bukti_pembayaran.jpeg',
                'status' => 'pending',
                'id_user' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 3,
                'proof' => 'contoh_bukti_pembayaran.jpeg',
                'status' => 'rejected',
                'id_user' => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
