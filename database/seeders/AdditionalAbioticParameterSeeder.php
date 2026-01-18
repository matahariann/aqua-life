<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AdditionalAbioticParameterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('additional_abiotic_parameters')->insert([
            [
                'id' => 1,
                'name' => 'turbidity',
                'initial_value' => 0.0,
                'final_value' => 5.0,
                'weight' => 0.30,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'name' => 'conductivity',
                'initial_value' => 10.0,
                'final_value' => 50.0,
                'weight' => 0.35,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 3,
                'name' => 'ratio_cn',
                'initial_value' => 8.0,
                'final_value' => 12.0,
                'weight' => 0.35,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
