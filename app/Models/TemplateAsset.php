<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TemplateAsset extends Model
{
    use HasFactory;

    protected $fillable = ['template_id', 'file_type', 'path'];
}
