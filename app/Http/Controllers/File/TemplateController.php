<?php

namespace App\Http\Controllers\File;

use Twig\Environment;
use App\Models\Template;
use Illuminate\Http\Request;
use Twig\Loader\FilesystemLoader;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class TemplateController extends Controller
{   
    public function index() {
        $loader = new FilesystemLoader();
        $twig = new Environment($loader);
        $template = Template::find(7);
        $data = [
            'page' => 'my page',
            'css_assets' => [
                ['path' => "this is path"]
            ],
            'js' => "this is js",
            'links' => "this is css",
        ];
        $twigTemplate = $twig->createTemplate(file_get_contents('storage/'.$template->content));
        $finalOut = $twigTemplate->render($data);
        return view('backend.template.index', compact('template'));
    }

    public function create() {
        return view('backend.template.create');
    }

    public function store(Request $request) {
        $file = $request->file('file');
        $filename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME).'.twig';
        $path = $file->storeAs('template/layout', $filename, 'public');
        try {
            Template::create([
                'name' => "min thet paing",
                'content' => $path,
                'category_id' => 1,
            ]);
            return redirect()->route('template-file.index');
        } catch (\Exception $e) {
            dd($e->getMessage());
        }
    }
}
