<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ComponentSection extends Model
{
    use HasFactory;

    protected $fillable = ['section_id', 'component_design_id'];
}
