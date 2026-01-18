<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MainAbioticParameterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('main_abiotic_parameters')->insert([
            [
                'id' => 1,
                'name' => 'ph',
                'initial_value' => 7.0,
                'final_value' => 8.5,
                'weight' => 0.25,
                'id_geo_zone' => 1,
                'id_type_water' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'name' => 'dissolved_oxygen',
                'initial_value' => 5.0,
                'final_value' => 8.0,
                'weight' => 0.35,
                'id_geo_zone' => 1,
                'id_type_water' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 3,
                'name' => 'salinity',
                'initial_value' => 28.0,
                'final_value' => 34.0,
                'weight' => 0.40,
                'id_geo_zone' => 1,
                'id_type_water' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
