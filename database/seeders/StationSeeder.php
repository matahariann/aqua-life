<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('stations')->insert([
            [
                'id' => 1,
                'id_type_water' => 2, // marine
                'id_geo_zone' => 1,   // pesisir
                'id_user' => 3,       // member
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'id_type_water' => 3, // brackish
                'id_geo_zone' => 2,   // estuari
                'id_user' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 3,
                'id_type_water' => 1, // freshwater
                'id_geo_zone' => 3,   // perairan darat
                'id_user' => 2,       // operator
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
