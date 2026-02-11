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

            /*
            |--------------------------------------------------------------------------
            | SALINITY - MARINE (Water Type = 1)
            |--------------------------------------------------------------------------
            */
            ['id' => 1, 'name'=>'Salinity','initial_value'=>0.00,'final_value'=>27.99,'weight'=>1,'id_geo_zone'=>null,'id_type_water'=>1,'created_at'=>now(),'updated_at'=>now()],
            ['id' => 2, 'name'=>'Salinity','initial_value'=>28.00,'final_value'=>31.99,'weight'=>2,'id_geo_zone'=>null,'id_type_water'=>1,'created_at'=>now(),'updated_at'=>now()],
            ['id' => 3, 'name'=>'Salinity','initial_value'=>32.00,'final_value'=>38.00,'weight'=>3,'id_geo_zone'=>null,'id_type_water'=>1,'created_at'=>now(),'updated_at'=>now()],
            ['id' => 4, 'name'=>'Salinity','initial_value'=>38.01,'final_value'=>41.00,'weight'=>2,'id_geo_zone'=>null,'id_type_water'=>1,'created_at'=>now(),'updated_at'=>now()],
            ['id' => 5, 'name'=>'Salinity','initial_value'=>41.01,'final_value'=>100.00,'weight'=>1,'id_geo_zone'=>null,'id_type_water'=>1,'created_at'=>now(),'updated_at'=>now()],

            /*
            |--------------------------------------------------------------------------
            | SALINITY - FRESH (Water Type = 2)
            |--------------------------------------------------------------------------
            */
            ['id' => 6, 'name'=>'Salinity','initial_value'=>0.00,'final_value'=>0.50,'weight'=>3,'id_geo_zone'=>null,'id_type_water'=>2,'created_at'=>now(),'updated_at'=>now()],
            ['id' => 7, 'name'=>'Salinity','initial_value'=>0.51,'final_value'=>4.00,'weight'=>2,'id_geo_zone'=>null,'id_type_water'=>2,'created_at'=>now(),'updated_at'=>now()],
            ['id' => 8, 'name'=>'Salinity','initial_value'=>4.01,'final_value'=>100.00,'weight'=>1,'id_geo_zone'=>null,'id_type_water'=>2,'created_at'=>now(),'updated_at'=>now()],

            /*
            |--------------------------------------------------------------------------
            | SALINITY - ESTUARINE (Water Type = 3)
            |--------------------------------------------------------------------------
            */
            ['id' => 9, 'name'=>'Salinity','initial_value'=>0.00,'final_value'=>2.99,'weight'=>1,'id_geo_zone'=>null,'id_type_water'=>3,'created_at'=>now(),'updated_at'=>now()],
            ['id' => 10, 'name'=>'Salinity','initial_value'=>3.00,'final_value'=>4.99,'weight'=>2,'id_geo_zone'=>null,'id_type_water'=>3,'created_at'=>now(),'updated_at'=>now()],
            ['id' => 11, 'name'=>'Salinity','initial_value'=>5.00,'final_value'=>25.00,'weight'=>3,'id_geo_zone'=>null,'id_type_water'=>3,'created_at'=>now(),'updated_at'=>now()],
            ['id' => 12, 'name'=>'Salinity','initial_value'=>25.01,'final_value'=>30.00,'weight'=>2,'id_geo_zone'=>null,'id_type_water'=>3,'created_at'=>now(),'updated_at'=>now()],
            ['id' => 13, 'name'=>'Salinity','initial_value'=>30.01,'final_value'=>100.00,'weight'=>1,'id_geo_zone'=>null,'id_type_water'=>3,'created_at'=>now(),'updated_at'=>now()],

            /*
            |--------------------------------------------------------------------------
            | TEMPERATURE - TEMPERATE (Geo Zone = 1)
            |--------------------------------------------------------------------------
            */
            ['id' => 14, 'name'=>'Temperature','initial_value'=>0.00,'final_value'=>2.99,'weight'=>1,'id_geo_zone'=>1,'id_type_water'=>null,'created_at'=>now(),'updated_at'=>now()],
            ['id' => 15, 'name'=>'Temperature','initial_value'=>3.00,'final_value'=>4.99,'weight'=>2,'id_geo_zone'=>1,'id_type_water'=>null,'created_at'=>now(),'updated_at'=>now()],
            ['id' => 16, 'name'=>'Temperature','initial_value'=>5.00,'final_value'=>22.00,'weight'=>3,'id_geo_zone'=>1,'id_type_water'=>null,'created_at'=>now(),'updated_at'=>now()],
            ['id' => 17, 'name'=>'Temperature','initial_value'=>22.01,'final_value'=>25.00,'weight'=>2,'id_geo_zone'=>1,'id_type_water'=>null,'created_at'=>now(),'updated_at'=>now()],
            ['id' => 18, 'name'=>'Temperature','initial_value'=>25.01,'final_value'=>100.00,'weight'=>1,'id_geo_zone'=>1,'id_type_water'=>null,'created_at'=>now(),'updated_at'=>now()],

            /*
            |--------------------------------------------------------------------------
            | TEMPERATURE - TROPICAL (Geo Zone = 2)
            |--------------------------------------------------------------------------
            */
            ['id' => 19, 'name'=>'Temperature','initial_value'=>0.00,'final_value'=>13.99,'weight'=>1,'id_geo_zone'=>2,'id_type_water'=>null,'created_at'=>now(),'updated_at'=>now()],
            ['id' => 20, 'name'=>'Temperature','initial_value'=>14.00,'final_value'=>17.99,'weight'=>2,'id_geo_zone'=>2,'id_type_water'=>null,'created_at'=>now(),'updated_at'=>now()],
            ['id' => 21, 'name'=>'Temperature','initial_value'=>18.00,'final_value'=>28.00,'weight'=>3,'id_geo_zone'=>2,'id_type_water'=>null,'created_at'=>now(),'updated_at'=>now()],
            ['id' => 22, 'name'=>'Temperature','initial_value'=>28.01,'final_value'=>32.00,'weight'=>2,'id_geo_zone'=>2,'id_type_water'=>null,'created_at'=>now(),'updated_at'=>now()],
            ['id' => 23, 'name'=>'Temperature','initial_value'=>32.01,'final_value'=>100.00,'weight'=>1,'id_geo_zone'=>2,'id_type_water'=>null,'created_at'=>now(),'updated_at'=>now()],

            /*
            |--------------------------------------------------------------------------
            | Dissolved Oxygen (Semua Geo Zone & Semua Water Type)
            |--------------------------------------------------------------------------
            */
            ['id' => 24, 'name'=>'Dissolved Oxygen','initial_value'=>0.00,'final_value'=>3.99,'weight'=>1,'id_geo_zone'=>null,'id_type_water'=>null,'created_at'=>now(),'updated_at'=>now()],
            ['id' => 25, 'name'=>'Dissolved Oxygen','initial_value'=>4.00,'final_value'=>5.99,'weight'=>2,'id_geo_zone'=>null,'id_type_water'=>null,'created_at'=>now(),'updated_at'=>now()],
            ['id' => 26, 'name'=>'Dissolved Oxygen','initial_value'=>6.00,'final_value'=>13.00,'weight'=>3,'id_geo_zone'=>null,'id_type_water'=>null,'created_at'=>now(),'updated_at'=>now()],

            /*
            |--------------------------------------------------------------------------
            | PH (Semua Geo Zone & Semua Water Type)
            |--------------------------------------------------------------------------
            */
            ['id' => 27, 'name'=>'PH','initial_value'=>0.00,'final_value'=>4.99,'weight'=>1,'id_geo_zone'=>null,'id_type_water'=>null,'created_at'=>now(),'updated_at'=>now()],
            ['id' => 28, 'name'=>'PH','initial_value'=>5.00,'final_value'=>6.99,'weight'=>2,'id_geo_zone'=>null,'id_type_water'=>null,'created_at'=>now(),'updated_at'=>now()],
            ['id' => 29, 'name'=>'PH','initial_value'=>7.00,'final_value'=>8.00,'weight'=>3,'id_geo_zone'=>null,'id_type_water'=>null,'created_at'=>now(),'updated_at'=>now()],
            ['id' => 30, 'name'=>'PH','initial_value'=>8.01,'final_value'=>9.00,'weight'=>2,'id_geo_zone'=>null,'id_type_water'=>null,'created_at'=>now(),'updated_at'=>now()],
            ['id' => 31, 'name'=>'PH','initial_value'=>9.01,'final_value'=>14.00,'weight'=>1,'id_geo_zone'=>null,'id_type_water'=>null,'created_at'=>now(),'updated_at'=>now()],

            /*
            |--------------------------------------------------------------------------
            | NH3 (mg/L)
            |--------------------------------------------------------------------------
            */
            ['id' => 32, 'name' => 'NH3', 'initial_value' => 0.00, 'final_value' => 0.02, 'weight' => 3.00, 'id_geo_zone' => null, 'id_type_water' => null, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 33, 'name' => 'NH3', 'initial_value' => 0.03, 'final_value' => 0.05, 'weight' => 2.00, 'id_geo_zone' => null, 'id_type_water' => null, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 34, 'name' => 'NH3', 'initial_value' => 0.06, 'final_value' => 999.00, 'weight' => 1.00, 'id_geo_zone' => null, 'id_type_water' => null, 'created_at' => now(), 'updated_at' => now()],

            /*
            |--------------------------------------------------------------------------
            | NH2 (mg/L)
            |--------------------------------------------------------------------------
            */
            ['id' => 35, 'name' => 'NH2', 'initial_value' => 0.00, 'final_value' => 0.10, 'weight' => 3.00, 'id_geo_zone' => null, 'id_type_water' => null, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 36, 'name' => 'NH2', 'initial_value' => 0.11, 'final_value' => 0.50, 'weight' => 2.00, 'id_geo_zone' => null, 'id_type_water' => null, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 37, 'name' => 'NH2', 'initial_value' => 0.51, 'final_value' => 999.00, 'weight' => 1.00, 'id_geo_zone' => null, 'id_type_water' => null, 'created_at' => now(), 'updated_at' => now()],

            /*
            |--------------------------------------------------------------------------
            | AMONIA (mg/L)
            |--------------------------------------------------------------------------
            */
            ['id' => 38, 'name' => 'Amonia', 'initial_value' => 0.00, 'final_value' => 0.02, 'weight' => 3.00, 'id_geo_zone' => null, 'id_type_water' => null, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 39, 'name' => 'Amonia', 'initial_value' => 0.03, 'final_value' => 0.05, 'weight' => 2.00, 'id_geo_zone' => null, 'id_type_water' => null, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 40, 'name' => 'Amonia', 'initial_value' => 0.06, 'final_value' => 999.00, 'weight' => 1.00, 'id_geo_zone' => null, 'id_type_water' => null, 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
