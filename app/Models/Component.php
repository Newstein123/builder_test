<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Component extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function designs() {
        return $this->hasMany(ComponentDesign::class);
    }

    public function fields() {
        return $this->morphMany(Field::class, 'fieldable');
    }

    public function variables() {
        return $this->hasMany(ComponentVariable::class);
    }
}
