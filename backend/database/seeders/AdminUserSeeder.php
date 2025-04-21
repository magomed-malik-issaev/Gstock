<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (!User::where('email', 'admin@gstock.com')->exists()) {
        User::create([
            'name' => 'Admin',
            'email' => 'admin@gstock.com',
            'password' => Hash::make('kilam13'),
            'role' => 'admin',
            'email_verified_at' => now()
        ]);

        $this->command->info('Utilisateur administrateur créé avec succès !');
    }else {
        $this->command->info('L\'utilisateur administrateur existe déjà.');
    }
    }
    /**
     * Reverse the database seeds.
     */
    
}
