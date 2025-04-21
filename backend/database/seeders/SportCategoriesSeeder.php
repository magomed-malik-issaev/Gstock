<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class SportCategoriesSeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Vêtements de sport',
                'description' => 'Tenues sportives, maillots, shorts, etc.'
            ],
            [
                'name' => 'Chaussures',
                'description' => 'Chaussures de course, baskets, chaussures de football, etc.'
            ],
            [
                'name' => 'Sports collectifs',
                'description' => 'Équipement pour football, basketball, volleyball, etc.'
            ],
            [
                'name' => 'Sports de raquette',
                'description' => 'Équipement pour tennis, badminton, squash, etc.'
            ],
            [
                'name' => 'Fitness et musculation',
                'description' => 'Haltères, tapis, accessoires de fitness, etc.'
            ],
            [
                'name' => 'Sports aquatiques',
                'description' => 'Maillots de bain, lunettes, accessoires de natation, etc.'
            ],
            [
                'name' => 'Sports d\'hiver',
                'description' => 'Skis, snowboards, vêtements d\'hiver, etc.'
            ],
            [
                'name' => 'Cyclisme',
                'description' => 'Vélos, casques, accessoires de cyclisme, etc.'
            ],
            [
                'name' => 'Running',
                'description' => 'Équipement spécifique pour la course à pied'
            ],
            [
                'name' => 'Nutrition sportive',
                'description' => 'Compléments alimentaires, barres énergétiques, etc.'
            ],
            [
                'name' => 'Accessoires',
                'description' => 'Sacs de sport, gourdes, montres, etc.'
            ]
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }

        $this->command->info('Catégories de sport créées avec succès !');
    }
}
