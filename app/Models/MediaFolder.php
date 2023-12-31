<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MediaFolder extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'slug'];

    public function files() {
        return $this->hasMany(MediaFile::class);
    }
}
