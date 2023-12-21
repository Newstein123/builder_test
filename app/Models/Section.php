<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Section extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function fields() {
        return $this->morphMany(Field::class, 'fieldable');
    }

    public function component_designs() {
        return $this->belongsToMany(ComponentDesign::class, 'component_sections', 'section_id', 'component_design_id');
    }

    public function pages() {
        return $this->belongsToMany(Page::class)->withPivot('position');
    }
}
