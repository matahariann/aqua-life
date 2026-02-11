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

            /*
            |--------------------------------------------------------------------------
            | KONDUKTIVITAS (Ω)
            |--------------------------------------------------------------------------
            */
            ['id'=> 1, 'name' => 'Conductivity', 'initial_value' => 0.00,  'final_value' => 2.99,  'weight' => 1.00, 'created_at' => now(), 'updated_at' => now()],
            ['id'=> 2, 'name' => 'Conductivity', 'initial_value' => 3.00,  'final_value' => 4.99,  'weight' => 1.50, 'created_at' => now(), 'updated_at' => now()],
            ['id'=> 3, 'name' => 'Conductivity', 'initial_value' => 5.00,  'final_value' => 10.00, 'weight' => 2.00, 'created_at' => now(), 'updated_at' => now()],
            ['id'=> 4, 'name' => 'Conductivity', 'initial_value' => 10.01, 'final_value' => 50.00, 'weight' => 1.50, 'created_at' => now(), 'updated_at' => now()],
            ['id'=> 5, 'name' => 'Conductivity', 'initial_value' => 50.01, 'final_value' => 9999.00,'weight' => 1.00, 'created_at' => now(), 'updated_at' => now()],

            /*
            |--------------------------------------------------------------------------
            | RASIO C/N
            |--------------------------------------------------------------------------
            */
            ['id'=> 6, 'name' => 'C/N Ratio', 'initial_value' => 0.00,  'final_value' => 1.99,  'weight' => 1.00, 'created_at' => now(), 'updated_at' => now()],
            ['id'=> 7, 'name' => 'C/N Ratio', 'initial_value' => 2.00,  'final_value' => 3.99,  'weight' => 1.50, 'created_at' => now(), 'updated_at' => now()],
            ['id'=> 8, 'name' => 'C/N Ratio', 'initial_value' => 4.00,  'final_value' => 10.00, 'weight' => 2.00, 'created_at' => now(), 'updated_at' => now()],
            ['id'=> 9, 'name' => 'C/N Ratio', 'initial_value' => 10.01, 'final_value' => 20.00, 'weight' => 1.50, 'created_at' => now(), 'updated_at' => now()],
            ['id'=> 10, 'name' => 'C/N Ratio', 'initial_value' => 20.01, 'final_value' => 9999.00,'weight' => 1.00, 'created_at' => now(), 'updated_at' => now()],
            
            /*
            |--------------------------------------------------------------------------
            | TURBIDITAS (NTU)
            |--------------------------------------------------------------------------
            */
            ['id'=> 11, 'name' => 'Turbidity', 'initial_value' => 0.00,  'final_value' => 5.99,   'weight' => 2.00, 'created_at' => now(), 'updated_at' => now()],
            ['id'=> 12, 'name' => 'Turbidity', 'initial_value' => 6.00,  'final_value' => 100.00, 'weight' => 1.50, 'created_at' => now(), 'updated_at' => now()],
            ['id'=> 13, 'name' => 'Turbidity', 'initial_value' => 100.01,'final_value' => 9999.00,'weight' => 1.00, 'created_at' => now(), 'updated_at' => now()],

            /*
            |--------------------------------------------------------------------------
            | CLAY (%)
            |--------------------------------------------------------------------------
            */
            ['id'=> 14, 'name' => 'Clay', 'initial_value' => 0.00,  'final_value' => 4.99,  'weight' => 1.00, 'created_at' => now(), 'updated_at' => now()],
            ['id'=> 15, 'name' => 'Clay', 'initial_value' => 5.00,  'final_value' => 4.99,  'weight' => 1.50, 'created_at' => now(), 'updated_at' => now()],
            ['id'=> 16, 'name' => 'Clay', 'initial_value' => 10.00, 'final_value' => 20.00, 'weight' => 2.00, 'created_at' => now(), 'updated_at' => now()],

            /*
            |--------------------------------------------------------------------------
            | SAND (%)
            |--------------------------------------------------------------------------
            */
            ['id'=> 17, 'name' => 'Sand', 'initial_value' => 0.00,  'final_value' => 4.99,   'weight' => 1.00, 'created_at' => now(), 'updated_at' => now()],
            ['id'=> 18, 'name' => 'Sand', 'initial_value' => 5.00,  'final_value' => 10.00,  'weight' => 2.00, 'created_at' => now(), 'updated_at' => now()],
            ['id'=> 19, 'name' => 'Sand', 'initial_value' => 10.01, 'final_value' => 20.00,  'weight' => 1.50, 'created_at' => now(), 'updated_at' => now()],
            ['id'=> 20, 'name' => 'Sand', 'initial_value' => 20.01, 'final_value' => 100.00, 'weight' => 1.00, 'created_at' => now(), 'updated_at' => now()],

            /*
            |--------------------------------------------------------------------------
            | SILT (%)
            |--------------------------------------------------------------------------
            */
            ['id'=> 21, 'name' => 'Silt', 'initial_value' => 0.00,  'final_value' => 30.00, 'weight' => 1.00, 'created_at' => now(), 'updated_at' => now()],
            ['id'=> 22, 'name' => 'Silt', 'initial_value' => 30.01, 'final_value' => 49.99, 'weight' => 1.50, 'created_at' => now(), 'updated_at' => now()],
            ['id'=> 23, 'name' => 'Silt', 'initial_value' => 50.00, 'final_value' => 90.00, 'weight' => 2.00, 'created_at' => now(), 'updated_at' => now()],
            ['id'=> 24, 'name' => 'Silt', 'initial_value' => 90.01, 'final_value' => 100.00,'weight' => 1.50, 'created_at' => now(), 'updated_at' => now()],

            /*
            |--------------------------------------------------------------------------
            | Coarse Sediment (%)
            |--------------------------------------------------------------------------
            */
            ['id'=> 25, 'name' => 'Coarse Sediment', 'initial_value' => 0.00,  'final_value' => 10.00, 'weight' => 1.00, 'created_at' => now(), 'updated_at' => now()],
            ['id'=> 26, 'name' => 'Coarse Sediment', 'initial_value' => 10.01, 'final_value' => 30.00, 'weight' => 2.00, 'created_at' => now(), 'updated_at' => now()],
            ['id'=> 27, 'name' => 'Coarse Sediment', 'initial_value' => 30.01, 'final_value' => 100.00, 'weight' => 3.00, 'created_at' => now(), 'updated_at' => now()],

            /*
            |--------------------------------------------------------------------------
            | Total Organic Dissolved (mg/L)
            |--------------------------------------------------------------------------
            */
            ['id'=> 28, 'name' => 'Total Organic Dissolved', 'initial_value' => 0.00,  'final_value' => 10.00, 'weight' => 3.00, 'created_at' => now(), 'updated_at' => now()],
            ['id'=> 29, 'name' => 'Total Organic Dissolved', 'initial_value' => 10.01, 'final_value' => 25.00, 'weight' => 2.00, 'created_at' => now(), 'updated_at' => now()],
            ['id'=> 30, 'name' => 'Total Organic Dissolved', 'initial_value' => 25.01, 'final_value' => 999.00, 'weight' => 1.00, 'created_at' => now(), 'updated_at' => now()],

            /*
            |--------------------------------------------------------------------------
            | Total Organic Substrate (%)
            |--------------------------------------------------------------------------
            */
            ['id'=> 31, 'name' => 'Total Organic Substrate', 'initial_value' => 0.00,  'final_value' => 5.00,  'weight' => 3.00, 'created_at' => now(), 'updated_at' => now()],
            ['id'=> 32, 'name' => 'Total Organic Substrate', 'initial_value' => 5.01,  'final_value' => 15.00, 'weight' => 2.00, 'created_at' => now(), 'updated_at' => now()],
            ['id'=> 33, 'name' => 'Total Organic Substrate', 'initial_value' => 15.01, 'final_value' => 100.00, 'weight' => 1.00, 'created_at' => now(), 'updated_at' => now()],

            /*
            |--------------------------------------------------------------------------
            | Macrozoobenthos Density (ind/m²)
            |--------------------------------------------------------------------------
            */
            ['id'=> 34, 'name' => 'Macrozoobenthos Density', 'initial_value' => 0.00,  'final_value' => 100.00, 'weight' => 1.00, 'created_at' => now(), 'updated_at' => now()],
            ['id'=> 35, 'name' => 'Macrozoobenthos Density', 'initial_value' => 101.00, 'final_value' => 500.00, 'weight' => 2.00, 'created_at' => now(), 'updated_at' => now()],
            ['id'=> 36, 'name' => 'Macrozoobenthos Density', 'initial_value' => 501.00, 'final_value' => 99999.00, 'weight' => 3.00, 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
