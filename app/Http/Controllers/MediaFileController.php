<?php

namespace App\Http\Controllers;

use App\Models\MediaFolder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class MediaFileController extends Controller
{
    public function index(Request $request) {
        $folder_slug = $request->slug;
        $folder = MediaFolder::with('files')->where('slug', $folder_slug)->first();
        $files = $folder->files->transform(function($item) {
            return [
                'filename' => $item->filename,
                'file_path' => $item->file_path,
                'file_type' => $item->mime_type,
                'file_size' => Storage::size($item->file_path),
                'update_at' => $item->updated_at->toFormattedDateString(),
            ];
        });

        return Inertia::render('Backend/File/Index', [
            'files' => $files,
        ]);
    }
}
