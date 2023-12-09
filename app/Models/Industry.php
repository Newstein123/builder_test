<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Industry extends Model
{
    use HasFactory;

    protected $guarded = [];

    function sub_industries() {
        return $this->hasMany(SubIndustry::class);
    }

    public function fields() {
        return $this->morphMany(Field::class, 'fieldable');
    }
}
