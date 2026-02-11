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

            // 1. Similarity
            ['id' => 1, 'name' => 'Similarity', 'initial_value' => 0.00, 'final_value' => 0.49, 'weight' => 3],
            ['id' => 2, 'name' => 'Similarity', 'initial_value' => 0.50, 'final_value' => 0.69, 'weight' => 6],
            ['id' => 3, 'name' => 'Similarity', 'initial_value' => 0.70, 'final_value' => 1.00, 'weight' => 10],
            
            // 2. Dominance
            ['id' => 4, 'name' => 'Dominance', 'initial_value' => 0.00, 'final_value' => 0.31, 'weight' => 10],
            ['id' => 5, 'name' => 'Dominance', 'initial_value' => 0.32, 'final_value' => 0.68, 'weight' => 6],
            ['id' => 6, 'name' => 'Dominance', 'initial_value' => 0.69, 'final_value' => 1.00, 'weight' => 3],

            // 3. Diversity
            ['id' => 7, 'name' => 'Diversity', 'initial_value' => 0.00, 'final_value' => 1.99, 'weight' => 3],
            ['id' => 8, 'name' => 'Diversity', 'initial_value' => 2.00, 'final_value' => 2.99, 'weight' => 6],
            ['id' => 9, 'name' => 'Diversity', 'initial_value' => 3.00, 'final_value' => 4.00, 'weight' => 10],

            // 4. Total Abundance
            ['id' => 10, 'name' => 'Total Abundance', 'initial_value' => 500, 'final_value' => 999, 'weight' => 6],
            ['id' => 11, 'name' => 'Total Abundance', 'initial_value' => 1000, 'final_value' => 999999, 'weight' => 10],

            // 5. Number of Species
            ['id' => 12, 'name' => 'Number of Species', 'initial_value' => 0, 'final_value' => 49, 'weight' => 3],
            ['id' => 13, 'name' => 'Number of Species', 'initial_value' => 50, 'final_value' => 99, 'weight' => 6],
            ['id' => 14, 'name' => 'Number of Species', 'initial_value' => 100, 'final_value' => 9999, 'weight' => 10],
        ]);
    }
}
