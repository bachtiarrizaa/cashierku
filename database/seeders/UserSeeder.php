<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $now = Carbon::now();

        $roles = DB::table('roles')->pluck('id', 'name');

        $users = [
            [
                'name' => 'Admin User',
                'email' => 'admin@gmail.com',
                'password' => Hash::make('password'),
                'role_id' => $roles['admin'],
            ],
            [
                'name' => 'Cashier User',
                'email' => 'cashier@gmail.com',
                'password' => Hash::make('password'),
                'role_id' => $roles['cashier'],
            ],
            [
                'name' => 'Marketing User',
                'email' => 'marketing@gmail.com',
                'password' => Hash::make('password'),
                'role_id' => $roles['marketing'],
            ],
        ];

        foreach ($users as $user) {
            DB::table('users')->updateOrInsert(
                ['email' => $user['email']],
                [
                    'name' => $user['name'],
                    'password' => $user['password'],
                    'role_id' => $user['role_id'],
                    'created_at' => $now,
                    'updated_at' => $now,
                ]
            );
        }
    }
}
