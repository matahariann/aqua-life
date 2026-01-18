<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StationMainAbioticSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('station_main_abiotic')->insert([
            [
                'id' => 1,
                'salinity' => 30.2,
                'temperature' => 29.1,
                'dissolved_oxygen' => 6.4,
                'ph' => 7.8,
                'nh3' => 0.02,
                'nh2' => 0.01,
                'ammonia' => 0.05,
                'id_user' => 3,
                'id_station' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'salinity' => 18.7,
                'temperature' => 28.4,
                'dissolved_oxygen' => 5.2,
                'ph' => 7.4,
                'nh3' => 0.04,
                'nh2' => 0.02,
                'ammonia' => 0.08,
                'id_user' => 3,
                'id_station' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 3,
                'salinity' => 0.5,
                'temperature' => 27.3,
                'dissolved_oxygen' => 7.1,
                'ph' => 7.2,
                'nh3' => 0.01,
                'nh2' => 0.00,
                'ammonia' => 0.02,
                'id_user' => 2,
                'id_station' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
