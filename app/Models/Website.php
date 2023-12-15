<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Website extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function template() {
        return $this->belongsTo(Template::class);
    }

    public function sections_data() {
        return $this->hasMany(SectionsData::class);
    }

    public function components_data() {
        return $this->hasMany(ComponentsData::class);
    }

    public function pages() {
        return $this->template->pages();
    }

    // public function sections() {
    //     return $this->pages->sections();
    // }

    // public function components() {
    //     return $this->sections->components();
    // }

    // public function fields() {
    //     return $this->sections->fields();
    // }
}
