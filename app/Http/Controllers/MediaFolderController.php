<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\MediaFolder;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

class MediaFolderController extends Controller
{
    public function index() {
        $folders = MediaFolder::all();
        return Inertia::render('Backend/Folder/Index', [
            'folders' => $folders,   
        ]);
    }

    public function store(Request $request) {
        $request->validate([
            'name' => 'required',
        ]);

        MediaFolder::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
        ]);

        return to_route('folder.index');
    }
}
