<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Category;
use App\Models\Supplier;

class SportProductsSeeder extends Seeder
{
    public function run(): void
    {
        // Vérifier que nous avons des catégories
        $categoryCount = Category::count();
        if ($categoryCount === 0) {
            $this->command->error('Aucune catégorie trouvée. Veuillez exécuter CategorySeeder d\'abord.');
            return;
        }

        // Obtenir les IDs des catégories
        $categoryIds = Category::pluck('id', 'name')->toArray();

        // Créer un fournisseur par défaut si aucun n'existe
        $supplierId = null;
        if (Supplier::count() === 0) {
            $supplier = Supplier::create([
                'name' => 'SportEquip Inc.',
                'contact_name' => 'Jean Dupont',
                'email' => 'contact@sportequip.com',
                'phone' => '01 23 45 67 89'
            ]);
            $supplierId = $supplier->id;
        } else {
            $supplierId = Supplier::first()->id;
        }

        // Configuration des images pour les produits
        $imageMapping = [
            'Maillot de football équipe de France' => 'maillotequipedefrance.jpg',
            'Short de running homme' => 'shortrunning.webp',
            'Chaussures de running Nike Air Zoom' => 'nikeairzoom.jpg',
            'Chaussures de football Adidas Predator' => 'predator.jpg',
            'Ballon de football Adidas Champions League' => 'ballonchampionsleague.jpg',
            'Ballon de basketball Spalding NBA' => 'ballonspaldingnba.jpg',
            'Raquette de tennis Wilson Pro' => 'raquettewilsonpro.jpg',
            'Set d\'haltères 10kg (paire)' => 'altere10kg.jpg',
            'Tapis de yoga 6mm' => 'tapisyoga.webp',
            'Lunettes de natation Speedo' => 'lunettenatationspeedo.webp',
            'Ski Rossignol Experience 80' => 'skirossignol.jpg',
            'Casque vélo route Giro' => 'casquevelogiro.jpg',
            'Montre GPS Garmin Forerunner' => 'montregpsgarmin.webp',
            'Protéine whey 1kg' => 'proteinewhey.jpg',
            'Sac de sport Nike 45L' => 'sacsportnike.webp',
            'Gourde isotherme 750ml' => 'gourdeisotherme.avif'
        ];

        // Liste des produits par catégorie
        $products = [
            // Vêtements de sport
            [
                'name' => 'Maillot de football équipe de France',
                'sku' => 'VET-FOOT-001',
                'barcode' => '3001234567890',
                'description' => 'Maillot officiel de l\'équipe de France de football, saison 2025',
                'purchase_price' => 45.00,
                'selling_price' => 89.99,
                'current_stock' => 25,
                'alert_threshold' => 5,
                'category_id' => $categoryIds['Vêtements de sport'] ?? null,
                'supplier_id' => $supplierId,
                'image_path' => $imageMapping['Maillot de football équipe de France'] ?? null,
                'is_active' => true
            ],
            [
                'name' => 'Short de running homme',
                'sku' => 'VET-RUN-001',
                'barcode' => '3001234567891',
                'description' => 'Short léger et respirant pour la course à pied',
                'purchase_price' => 12.50,
                'selling_price' => 24.99,
                'current_stock' => 40,
                'alert_threshold' => 8,
                'category_id' => $categoryIds['Vêtements de sport'] ?? null,
                'supplier_id' => $supplierId,
                'image_path' => $imageMapping['Short de running homme'] ?? null,
                'is_active' => true
            ],

            // Chaussures
            [
                'name' => 'Chaussures de running Nike Air Zoom',
                'sku' => 'CHS-RUN-001',
                'barcode' => '3001234567892',
                'description' => 'Chaussures de course avec amorti Air Zoom pour un confort optimal',
                'purchase_price' => 65.00,
                'selling_price' => 129.99,
                'current_stock' => 15,
                'alert_threshold' => 3,
                'category_id' => $categoryIds['Chaussures'] ?? null,
                'supplier_id' => $supplierId,
                'image_path' => $imageMapping['Chaussures de running Nike Air Zoom'] ?? null,
                'is_active' => true
            ],
            [
                'name' => 'Chaussures de football Adidas Predator',
                'sku' => 'CHS-FOOT-001',
                'barcode' => '3001234567893',
                'description' => 'Chaussures à crampons pour terrains secs',
                'purchase_price' => 54.00,
                'selling_price' => 99.99,
                'current_stock' => 20,
                'alert_threshold' => 5,
                'category_id' => $categoryIds['Chaussures'] ?? null,
                'supplier_id' => $supplierId,
                'image_path' => $imageMapping['Chaussures de football Adidas Predator'] ?? null,
                'is_active' => true
            ],

            // Sports collectifs
            [
                'name' => 'Ballon de football Adidas Champions League',
                'sku' => 'SC-FOOT-001',
                'barcode' => '3001234567894',
                'description' => 'Ballon officiel de la Champions League, taille 5',
                'purchase_price' => 20.00,
                'selling_price' => 39.99,
                'current_stock' => 30,
                'alert_threshold' => 8,
                'category_id' => $categoryIds['Sports collectifs'] ?? null,
                'supplier_id' => $supplierId,
                'image_path' => $imageMapping['Ballon de football Adidas Champions League'] ?? null,
                'is_active' => true
            ],
            [
                'name' => 'Ballon de basketball Spalding NBA',
                'sku' => 'SC-BASK-001',
                'barcode' => '3001234567895',
                'description' => 'Ballon officiel NBA, taille 7, intérieur/extérieur',
                'purchase_price' => 25.00,
                'selling_price' => 49.99,
                'current_stock' => 25,
                'alert_threshold' => 6,
                'category_id' => $categoryIds['Sports collectifs'] ?? null,
                'supplier_id' => $supplierId,
                'image_path' => $imageMapping['Ballon de basketball Spalding NBA'] ?? null,
                'is_active' => true
            ],

            // Sports de raquette
            [
                'name' => 'Raquette de tennis Wilson Pro',
                'sku' => 'SR-TEN-001',
                'barcode' => '3001234567896',
                'description' => 'Raquette de tennis professionnelle, cadre en graphite',
                'purchase_price' => 90.00,
                'selling_price' => 179.99,
                'current_stock' => 12,
                'alert_threshold' => 2,
                'category_id' => $categoryIds['Sports de raquette'] ?? null,
                'supplier_id' => $supplierId,
                'image_path' => $imageMapping['Raquette de tennis Wilson Pro'] ?? null,
                'is_active' => true
            ],

            // Fitness et musculation
            [
                'name' => 'Set d\'haltères 10kg (paire)',
                'sku' => 'FIT-HALT-001',
                'barcode' => '3001234567897',
                'description' => 'Paire d\'haltères en fonte, 10kg chacun',
                'purchase_price' => 25.00,
                'selling_price' => 49.99,
                'current_stock' => 15,
                'alert_threshold' => 3,
                'category_id' => $categoryIds['Fitness et musculation'] ?? null,
                'supplier_id' => $supplierId,
                'image_path' => $imageMapping['Set d\'haltères 10kg (paire)'] ?? null,
                'is_active' => true
            ],
            [
                'name' => 'Tapis de yoga 6mm',
                'sku' => 'FIT-YOGA-001',
                'barcode' => '3001234567898',
                'description' => 'Tapis de yoga antidérapant, épaisseur 6mm',
                'purchase_price' => 10.00,
                'selling_price' => 19.99,
                'current_stock' => 35,
                'alert_threshold' => 7,
                'category_id' => $categoryIds['Fitness et musculation'] ?? null,
                'supplier_id' => $supplierId,
                'image_path' => $imageMapping['Tapis de yoga 6mm'] ?? null,
                'is_active' => true
            ],

            // Sports aquatiques
            [
                'name' => 'Lunettes de natation Speedo',
                'sku' => 'AQ-NAT-001',
                'barcode' => '3001234567899',
                'description' => 'Lunettes de natation anti-buée avec protection UV',
                'purchase_price' => 12.50,
                'selling_price' => 24.99,
                'current_stock' => 30,
                'alert_threshold' => 6,
                'category_id' => $categoryIds['Sports aquatiques'] ?? null,
                'supplier_id' => $supplierId,
                'image_path' => $imageMapping['Lunettes de natation Speedo'] ?? null,
                'is_active' => true
            ],

            // Sports d'hiver
            [
                'name' => 'Ski Rossignol Experience 80',
                'sku' => 'HIV-SKI-001',
                'barcode' => '3001234567900',
                'description' => 'Ski all-mountain pour skieurs intermédiaires à avancés',
                'purchase_price' => 200.00,
                'selling_price' => 399.99,
                'current_stock' => 8,
                'alert_threshold' => 2,
                'category_id' => $categoryIds['Sports d\'hiver'] ?? null,
                'supplier_id' => $supplierId,
                'image_path' => $imageMapping['Ski Rossignol Experience 80'] ?? null,
                'is_active' => true
            ],

            // Cyclisme
            [
                'name' => 'Casque vélo route Giro',
                'sku' => 'CYC-CAS-001',
                'barcode' => '3001234567901',
                'description' => 'Casque de vélo léger et aérodynamique pour la route',
                'purchase_price' => 45.00,
                'selling_price' => 89.99,
                'current_stock' => 18,
                'alert_threshold' => 4,
                'category_id' => $categoryIds['Cyclisme'] ?? null,
                'supplier_id' => $supplierId,
                'image_path' => $imageMapping['Casque vélo route Giro'] ?? null,
                'is_active' => true
            ],

            // Running
            [
                'name' => 'Montre GPS Garmin Forerunner',
                'sku' => 'RUN-MON-001',
                'barcode' => '3001234567902',
                'description' => 'Montre GPS avec suivi d\'activité et fréquence cardiaque',
                'purchase_price' => 125.00,
                'selling_price' => 249.99,
                'current_stock' => 10,
                'alert_threshold' => 2,
                'category_id' => $categoryIds['Running'] ?? null,
                'supplier_id' => $supplierId,
                'image_path' => $imageMapping['Montre GPS Garmin Forerunner'] ?? null,
                'is_active' => true
            ],

            // Nutrition sportive
            [
                'name' => 'Protéine whey 1kg',
                'sku' => 'NUT-PROT-001',
                'barcode' => '3001234567903',
                'description' => 'Protéine en poudre whey isolate, saveur chocolat',
                'purchase_price' => 15.00,
                'selling_price' => 29.99,
                'current_stock' => 40,
                'alert_threshold' => 8,
                'category_id' => $categoryIds['Nutrition sportive'] ?? null,
                'supplier_id' => $supplierId,
                'image_path' => $imageMapping['Protéine whey 1kg'] ?? null,
                'is_active' => true
            ],

            // Accessoires
            [
                'name' => 'Sac de sport Nike 45L',
                'sku' => 'ACC-SAC-001',
                'barcode' => '3001234567904',
                'description' => 'Sac de sport spacieux avec compartiment pour chaussures',
                'purchase_price' => 20.00,
                'selling_price' => 39.99,
                'current_stock' => 25,
                'alert_threshold' => 5,
                'category_id' => $categoryIds['Accessoires'] ?? null,
                'supplier_id' => $supplierId,
                'image_path' => $imageMapping['Sac de sport Nike 45L'] ?? null,
                'is_active' => true
            ],
            [
                'name' => 'Gourde isotherme 750ml',
                'sku' => 'ACC-GRD-001',
                'barcode' => '3001234567905',
                'description' => 'Gourde isotherme qui maintient les boissons froides pendant 24h',
                'purchase_price' => 8.00,
                'selling_price' => 15.99,
                'current_stock' => 50,
                'alert_threshold' => 10,
                'category_id' => $categoryIds['Accessoires'] ?? null,
                'supplier_id' => $supplierId,
                'image_path' => $imageMapping['Gourde isotherme 750ml'] ?? null,
                'is_active' => true
            ],
        ];

        // Vérifier si les produits existent déjà (par SKU)
        foreach ($products as $productData) {
            $existingProduct = Product::where('sku', $productData['sku'])->first();

            if ($existingProduct) {
                // Mise à jour du chemin d'image uniquement
                if (isset($productData['image_path']) && $productData['image_path']) {
                    $existingProduct->image_path = $productData['image_path'];
                    $existingProduct->save();
                    $this->command->info("Image mise à jour pour {$existingProduct->name}");
                }
            } else {
                // Création d'un nouveau produit
                Product::create($productData);
                $this->command->info("Produit créé: {$productData['name']}");
            }
        }

        $this->command->info('Produits de sport créés/mis à jour avec succès !');
    }
}
