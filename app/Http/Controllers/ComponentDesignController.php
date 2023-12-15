<?php

namespace App\Http\Controllers;

use App\Models\Component;
use App\Models\ComponentDesign;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ComponentDesignController extends Controller
{
    public function index(Request $request) {
        $cpt_designs = ComponentDesign::where('component_id', $request->cpt_id)->get();
        $cpt = Component::with('fields')->with('variables')->where('id', $request->cpt_id)->first();
        $cpt_fields = $cpt->fields;
        $cpt_vars = $cpt->variables;

        $cpt_design_id = $request->cpt_design_id;

        if($cpt_design_id) {
            $cpt_design = ComponentDesign::find($cpt_design_id);
        }

        return Inertia::render('Backend/ComponentDesign/Index', [
            'cpt_designs' => $cpt_designs,
            'cpt_id' => $request->cpt_id,
            'cpt_fields' => $cpt_fields,
            'cpt_vars' => $cpt_vars,
            'cpt_design' => $cpt_design ?? "",
        ]);
    }

    public function store(Request $request) {
        $request->validate([
            'name' => 'required|unique:component_designs',
            'value' => 'required|unique:component_designs',
            'component_id' => 'required',
        ]);

        ComponentDesign::create([
            'name' => $request->name,
            'value' => $request->value,
            'component_id' => $request->component_id,
            'isShow' => $request->isShow == "yes" ? 1 : 0,
            'isPremium' => $request->isShow == "yes" ? 1 : 0,
        ]);

        return redirect()->back();
    }

    public function update(Request $request, $id) {
        $cpt_design = ComponentDesign::find($id);
        if($cpt_design) {
            $cpt_design->update([
                'content' => $request->content,
                'skeleton' => $request->skeleton,
            ]);
        }
        return redirect()->back();
    }
}
