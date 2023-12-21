<?php

namespace App\Http\Controllers;

use App\Models\MediaLibrary;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class MediaLibraryController extends Controller
{
    public function get_media(Request $request) {
        $parent_id = null;
        $old_parent_id = $request->old_parent_id;
        
        if($request->parent_id) {
            $parent_id = $request->parent_id;
        }

        $media = MediaLibrary::with('children')
                                ->where('parent_id', $parent_id)
                                ->get();
        $media_resource = $media->transform(function($item) {
            return [
                'id' => $item->id,
                'parent_id' => $item->parent_id,
                'name' => $item->name,
                'path' => $item->path,
                'type' => $item->type,
                'size' => $item->path != null ? Storage::size($item->path) : '',
                'mimetype' => $item->mimetype,
                'children' => $item->children,
            ];
        });
        return Inertia::render('Backend/Media/Index', [
            'media' => $media_resource, 
            'parent_id' => $parent_id,
            'old_parent_id' => $old_parent_id,
        ]);
    }

    public function store_media(Request $request) {
        $request->validate([
            'name' => 'required',
        ]);
        
        if($request->hasFile('file')) {
            $file = $request->file('file');
            $filename = time(). '_'. $request->name;
            $mimetype = $file->getClientMimeType();
            $path = Storage::putFileAs('media', $file, $filename);
        } else {
            $path = null;
        }

        MediaLibrary::create([
            'parent_id' => $request->parent_id ?? null,
            'name' => $request->name,
            'type' => $request->type,
            'path' => $path,
            'mimetype' => $mimetype ?? null,
        ]);

        return redirect()->back();
    }
}
