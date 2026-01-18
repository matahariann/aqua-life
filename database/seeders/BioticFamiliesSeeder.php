<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BioticFamiliesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('biotic_families')->insert([
            [
                'id' => 1,
                'name' => 'Chironomidae',
                'weight' => 0.8,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'name' => 'Tubificidae',
                'weight' => 0.9,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 3,
                'name' => 'Corbiculidae',
                'weight' => 0.6,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
