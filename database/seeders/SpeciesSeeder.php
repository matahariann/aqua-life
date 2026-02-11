<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SpeciesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // DB::table('species')->insert([
        //     [
        //         'id' => 1,
        //         'name' => 'Chironomus sp.',
        //         'abundance' => 35,
        //         'taxa_indicator' => 0.85,
        //         'id_user' => 3,
        //         'id_station' => 1,
        //         'id_family' => 1,
        //         'created_at' => now(),
        //         'updated_at' => now(),
        //     ],
        //     [
        //         'id' => 2,
        //         'name' => 'Tubifex sp.',
        //         'abundance' => 22,
        //         'taxa_indicator' => 0.90,
        //         'id_user' => 3,
        //         'id_station' => 2,
        //         'id_family' => 2,
        //         'created_at' => now(),
        //         'updated_at' => now(),
        //     ],
        //     [
        //         'id' => 3,
        //         'name' => 'Corbicula fluminea',
        //         'abundance' => 18,
        //         'taxa_indicator' => 0.60,
        //         'id_user' => 2,
        //         'id_station' => 3,
        //         'id_family' => 3,
        //         'created_at' => now(),
        //         'updated_at' => now(),
        //     ],
        // ]);
    }
}
