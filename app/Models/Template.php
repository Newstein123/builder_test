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

    public function sections() {
        return $this->hasMany(Section::class);
    }

    public function category() {
        return $this->belongsTo(Category::class);
    }

    public function industry() {
        return $this->category->industry();
    }
}
