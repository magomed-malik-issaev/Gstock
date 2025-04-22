<?php
// filepath: c:\laragon\www\Gstock\backend\app\Http\Controllers\API\ProductController.php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        try {
            $query = Product::query();

            // Filtrage par catégorie
            if ($request->has('category_id')) {
                $query->where('category_id', $request->category_id);
            }

            // Recherche par nom
            if ($request->has('search')) {
                $query->where('name', 'like', '%' . $request->search . '%');
            }

            $products = $query->with(['category', 'supplier'])->get();

            // Ajout des URLs d'images complètes
            $products->transform(function ($product) {
                if ($product->image_path) {
                    $product->image_url = asset('images/' . $product->image_path);
                }
                return $product;
            });

            return response()->json([
                'success' => true,
                'data' => $products
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des produits',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'sku' => 'nullable|string|max:255|unique:products',
                'barcode' => 'nullable|string|max:255|unique:products',
                'description' => 'nullable|string',
                'purchase_price' => 'required|numeric|min:0',
                'selling_price' => 'required|numeric|min:0',
                'current_stock' => 'required|integer|min:0',
                'alert_threshold' => 'nullable|integer|min:0',
                'category_id' => 'required|exists:categories,id',
                'supplier_id' => 'nullable|exists:suppliers,id',
                'image_path' => 'nullable|string',
                'is_active' => 'nullable|boolean'
            ]);

            $product = Product::create($validated);

            return response()->json([
                'success' => true,
                'data' => $product,
                'message' => 'Produit créé avec succès'
            ], Response::HTTP_CREATED);
        } catch (\Exception $e) {
            Log::error('Erreur lors de la création du produit: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la création du produit',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $product = Product::with(['category', 'supplier'])->findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $product
            ]);
        } catch (\Exception $e) {
            Log::error('Erreur lors de la récupération du produit: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération du produit',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $product = Product::findOrFail($id);

            $validated = $request->validate([
                'name' => 'sometimes|required|string|max:255',
                'sku' => 'nullable|string|max:255|unique:products,sku,' . $id,
                'barcode' => 'nullable|string|max:255|unique:products,barcode,' . $id,
                'description' => 'nullable|string',
                'purchase_price' => 'sometimes|required|numeric|min:0',
                'selling_price' => 'sometimes|required|numeric|min:0',
                'current_stock' => 'sometimes|required|integer|min:0',
                'alert_threshold' => 'nullable|integer|min:0',
                'category_id' => 'sometimes|required|exists:categories,id',
                'supplier_id' => 'nullable|exists:suppliers,id',
                'image_path' => 'nullable|string',
                'is_active' => 'nullable|boolean'
            ]);

            $product->update($validated);

            return response()->json([
                'success' => true,
                'data' => $product,
                'message' => 'Produit mis à jour avec succès'
            ]);
        } catch (\Exception $e) {
            Log::error('Erreur lors de la mise à jour du produit: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la mise à jour du produit',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $product = Product::findOrFail($id);
            $product->delete();

            return response()->json([
                'success' => true,
                'message' => 'Produit supprimé avec succès'
            ]);
        } catch (\Exception $e) {
            Log::error('Erreur lors de la suppression du produit: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la suppression du produit',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
