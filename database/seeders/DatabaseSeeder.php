<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            GeoZoneSeeder::class,
            WaterTypeSeeder::class,
            StationSeeder::class,
            PaymentSeeder::class,
            StationMainAbioticSeeder::class,
            StationIndexAdditionalSeeder::class,
            BioticFamiliesSeeder::class,
            SpeciesSeeder::class,
            MainAbioticParameterSeeder::class,
            AdditionalAbioticParameterSeeder::class,
            BioticIndexParameterSeeder::class,
            ResultSeeder::class,
        ]);
    }
}
