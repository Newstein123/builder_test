<?php

namespace App\Http\Controllers\Backend;

use Inertia\Inertia;
use App\Models\Template;
use App\Models\SectionField;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\SubIndustry;

class TemplateController extends Controller
{   
    public function index(Request $request) {
        $template_id = $request->template_id;

        if($template_id) {
            $template = Template::find($template_id);
        }

        $templates = Template::with('category')->get();
        return Inertia::render('Backend/Template/Index', [
            'templates' => $templates,
            'template' => $template ?? "",
        ]);
    }

    public function create() {
        $categories = Category::select('id', 'name')->latest('id')->get();
        $sub_industries = SubIndustry::select('id', 'name')->latest('id')->get();
        return Inertia::render('Backend/Template/Create', [
            'categories' => $categories,
            'sub_industries' => $sub_industries,
        ]);
    }

    public function store(Request $request) {
        $request->validate([
            'name' => 'required',
            'category_id' => 'required',
        ]);

        Template::create([
            'name' => $request->name,
            'category_id' => $request->category_id,
            'isShow' => $request->isShow == "yes" ? true : false,
        ]);

        return to_route('template.index')->with('message', 'Template Created Successfully');
    }

    public function get_old_template_store(Request $request) {
        try {
            DB::transaction(function () use($request) {
                $content = [];
                foreach ($request->content as $value) {
                    $content = array_merge($content, $value);
                }
                $layout = $request->layout;
                $sections = $request->sections;
                $name = $request->name;
                $category_id = $request->category_id;
                
                $template = Template::create([
                    'name' => $name,
                    'category_id' => $category_id,
                    'content' => json_encode($content),
                    'layout' => $layout,
                ]);
                $template->sections()->attach($sections);
            });
        } catch (\Exception $e) {
            dd($e->getMessage());
        }
    }

    public function update(Request $request, $id) {
        $template = Template::find($id);

        if($template) {
            $template->update([
                'content' => $request->content,
                'layout' => $request->layout,
                'scripts' => $request->scripts,
                'links' => $request->links,
                'css' => $request->css,
                'js' => $request->js,
            ]);
        }

        return redirect()->back();
    }
}
