<?php

namespace App\Http\Controllers\Backend;

use Inertia\Inertia;
use Twig\Environment;
use App\Models\Website;
use App\Models\Component;
use Illuminate\Http\Request;
use App\Models\ComponentDesign;
use App\Models\ComponentVariable;
use Twig\Loader\FilesystemLoader;
use App\Http\Controllers\Controller;

class ComponentController extends Controller
{   
    public function index () {
        $components = Component::all();
        return Inertia::render('Backend/Components/Index', [
            'components' => $components,
        ]);
    }

    public function create() {
        $cpt = Component::all();
        return Inertia::render('Backend/Components/Create', [
            'cpt' => $cpt,
        ]);
    }

    public function store(Request $request) {
        $request->validate([
            'name' => 'required|unique:components',
            'value' => 'required|unique:components',
        ]);

        $name = $request->name;
        $value = $request->value;

        Component::create([
            'name' => $name,
            'value' => $value,
            'loopable' => $request->loopable,
            'max_no_loop' => $request->max_no_loop,
        ]);

        return to_route('component.index')->with('message', 'Component create successfully');
    }

    public function cpt_content_store(Request $request) {
        $request->validate([
            'name' => 'required',
            'value' => 'required',
            'type' => 'required',
        ]);

        $component = Component::find($request->cpt_id);
        if($component) {
            $component->fields()->create([
                'name' => $request->name,
                'value' => $request->value,
                'type' => $request->type,
                'option' => $request->option,
                'data_type' => 'content'
            ]);
        }

        return redirect()->back();
    }

    public function cpt_design_store(Request $request) {
        $request->validate([
            'name' => 'required',
            'value' => 'required',
            'type' => 'required',
        ]);

        $component = Component::find($request->cpt_id);
        if($component) {
            $component->fields()->create([
                'name' => $request->name,
                'value' => $request->value,
                'type' => $request->type,
                'option' => $request->option,
                'data_type' => 'design'
            ]);
        }
        return redirect()->back();
    }

    public function get_all_cpt_dsgs(Request $request) {
        $loader = new FilesystemLoader();
        $twig = new Environment($loader);
        $cpt_name = $request->cpt_name;
        $cpt = Component::with('designs')->where('value', $cpt_name)->first();
        $cpt_dsgs = $cpt->designs;
        $cpt_dsgs_content = [];

        foreach ($cpt_dsgs as $key => $value) {
            $twigTemplate = $twig->createTemplate($value->skeleton);
            $finalOutput = $twigTemplate->render();
            $cpt_dsgs_content[$value->id]  = $finalOutput;
        }
        
        return response()->json([
            'success' => true,
            'data' => $cpt_dsgs_content,
        ]);
    }
}
