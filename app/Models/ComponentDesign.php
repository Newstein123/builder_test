<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ComponentDesign extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function component() {
        return $this->belongsTo(Component::class);
    }
}
