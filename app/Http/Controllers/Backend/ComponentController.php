<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Component;
use App\Models\ComponentDesign;
use App\Models\ComponentVariable;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
}
