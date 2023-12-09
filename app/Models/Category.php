<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $guarded = [];
    
    function templates() {
        return $this->hasMany(Template::class);
    }

    function sub_industry() {
        return $this->belongsTo(SubIndustry::class);
    }

    function industry() {
        return $this->sub_industry->industry();
    }
}
