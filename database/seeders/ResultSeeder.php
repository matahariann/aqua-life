<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ResultSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('results')->insert([
            [
                'id' => 1,
                'value' => 0.82,
                'status' => 'good',
                'conclusion' => 'Kondisi perairan tergolong baik.',
                'recommendation' => 'Pertahankan pengelolaan kualitas air dan monitoring rutin.',
                'id_user' => 3,
                'id_station' => 1,
                'created_at' => now()->subDays(5),
                'updated_at' => now()->subDays(5),
            ],
            [
                'id' => 2,
                'value' => 0.64,
                'status' => 'moderate',
                'conclusion' => 'Kondisi perairan tergolong sedang.',
                'recommendation' => 'Optimalkan aerasi dan evaluasi sumber bahan organik.',
                'id_user' => 3,
                'id_station' => 2,
                'created_at' => now()->subDays(2),
                'updated_at' => now()->subDays(2),
            ],
            [
                'id' => 3,
                'value' => 0.41,
                'status' => 'poor',
                'conclusion' => 'Kondisi perairan tergolong buruk.',
                'recommendation' => 'Lakukan tindakan korektif segera dan kurangi beban pencemar.',
                'id_user' => 2,
                'id_station' => 3,
                'created_at' => now()->subDays(1),
                'updated_at' => now()->subDays(1),
            ],
        ]);
    }
}
