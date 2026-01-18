<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'id' => 1,
                'name' => 'Admin Sistem',
                'email' => 'admin@gmail.com',
                'password' => Hash::make('password'),
                'role' => 'admin',
                'is_membership' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'name' => 'Operator',
                'email' => 'operator@gmail.com',
                'password' => Hash::make('password'),
                'role' => 'operator',
                'is_membership' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 3,
                'name' => 'Arsyad',
                'email' => 'arsyad@gmail.com',
                'password' => Hash::make('password'),
                'role' => 'member',
                'is_membership' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 4,
                'name' => 'Sunan',
                'email' => 'sunan@gmail.com',
                'password' => Hash::make('password'),
                'role' => 'member',
                'is_membership' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 5,
                'name' => 'Dimas',
                'email' => 'dimas@gmail.com',
                'password' => Hash::make('password'),
                'role' => 'member',
                'is_membership' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
