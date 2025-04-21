<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    protected $fillable = [
        'name',
        'sku',
        'barcode',
        'description',
        'purchase_price',
        'selling_price',
        'current_stock',
        'alert_threshold',
        'category_id',
        'supplier_id',
        'image_path',
        'is_active'
    ];

    // Ajout des accesseurs pour les champs qui sont mentionnés dans le frontend mais pas dans la base de données
    public function getMinStockLevelAttribute()
    {
        return $this->alert_threshold;
    }

    public function getImageUrlAttribute()
    {
        return $this->image_path;
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function supplier(): BelongsTo
    {
        return $this->belongsTo(Supplier::class);
    }
}
