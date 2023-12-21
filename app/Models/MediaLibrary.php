<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MediaLibrary extends Model
{
    use HasFactory;

    protected $fillable = ['parent_id', 'name', 'type', 'path', 'mimetype'];

    public function parent()
    {
        return $this->belongsTo(MediaLibrary::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(MediaLibrary::class, 'parent_id');
    }
}
