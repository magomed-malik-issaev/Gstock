<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\ProductController;

Route::get('/', function () {
    return view('welcome');
});

// Routes pour les catégories
Route::get('/api/categories', [CategoryController::class, 'index']);
Route::post('/api/categories', [CategoryController::class, 'store']);
Route::get('/api/categories/{category}', [CategoryController::class, 'show']);
Route::put('/api/categories/{category}', [CategoryController::class, 'update']);
Route::delete('/api/categories/{category}', [CategoryController::class, 'destroy']);

// Routes pour les produits
Route::get('/api/products', [ProductController::class, 'index']);
Route::post('/api/products', [ProductController::class, 'store']);
Route::get('/api/products/{product}', [ProductController::class, 'show']);
Route::put('/api/products/{product}', [ProductController::class, 'update']);
Route::delete('/api/products/{product}', [ProductController::class, 'destroy']);
