<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BioticIndexParameterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('biotic_index_parameters')->insert([
            [
                'id' => 1,
                'name' => 'diversity',
                'initial_value' => 2.0,
                'final_value' => 4.0,
                'weight' => 0.40,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'name' => 'dominance',
                'initial_value' => 0.0,
                'final_value' => 0.3,
                'weight' => 0.30,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 3,
                'name' => 'similarity',
                'initial_value' => 0.6,
                'final_value' => 1.0,
                'weight' => 0.30,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
