<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Template extends Model
{
    use HasFactory;

    protected $guarded = [];
    protected $casts = [
        'content' => 'json',
    ];

    public function category() {
        return $this->belongsTo(Category::class);
    }

    public function industry() {
        return $this->category->industry();
    }

    public function pages() {
        return $this->hasMany(Page::class);
    }

}
