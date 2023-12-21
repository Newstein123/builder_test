<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Storage;

Route::get('/upload', function() {
    // Assume $repositoryUrl and $templateName are user-provided values
    $repositoryUrl = 'https://github.com/Newstein123/modalpopup.git';
    $templateName = 'new-template';

    // Specify the destination directory for the cloned repository
    $destination = storage_path("app/template-creations/$templateName");

    // Clone the repository using the git command
    exec("git clone $repositoryUrl $destination");

    return view('test.zip.index');
});
Route::get('/gitclone', function() {
    $templateName = 'new-template';

    // Specify the path to the cloned repository
    $repositoryPath = storage_path("app/template-creations/$templateName");
    
    // Navigate to the repository directory
    chdir($repositoryPath);
    
    // Pull changes from the remote repository
    Artisan::call('git:pull');
});
Route::post('/upload/store', function(Request $request) {
    if ($request->hasFile('zipfile')) {
        $file = $request->file('zipfile');
        $filename = $request->filename.'.zip';
        $og_filename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $path = Storage::putFileAs('uploads/zipfile', $file, $filename);
        $zip = new \ZipArchive;
    
        if ($zip->open(storage_path('app/public/'.$path), \ZipArchive::CREATE) === true) {
            // Extract files here
            $exactFile = storage_path('app/uploads');
            $zip->extractTo($exactFile);
            $zip->close();
            $extractedFiles = File::directories($exactFile .'/'.$og_filename);
            dd(array_map('basename', $extractedFiles));
            $pages = [];
            foreach ($extractedFiles as $file) {
                if ($file->isDir()) {
                    $pages[] = $file->getFilename();
                }
            }
            dd($pages);
            // move to filepath 
            $destinationPath = storage_path('app/public/templates/resources/'.$request->filename);

            // create path 
            if (!File::exists($destinationPath)) {
                File::makeDirectory($destinationPath, 0755, true, true);
            }

            File::move(storage_path('app/uploads/'.$og_filename), $destinationPath);
            Storage::delete($path);
            File::deleteDirectory(storage_path('app/template'));
        } else {
            // Handle error
            dd('Failed to open the zip file');
        }

        return redirect()->back();
    }    
})->name('zip.store');
