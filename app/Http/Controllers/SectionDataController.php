<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Field;
use App\Models\Section;
use App\Models\Component;
use Illuminate\Http\Request;
use App\Models\ComponentDesign;
use App\Models\ComponentSection;

class SectionDataController extends Controller
{
    public function index(Request $request) {
        $section_id = request()->section_id;
        $components = Component::with('designs')->get();
        $section = Section::with('fields')->find($section_id);
        $section_fields = $section->fields;   
        
        if($request->field_id) {
            $field = Field::find($request->field_id);
        }

        return Inertia::render('Backend/SectionData/Index', [
            'section_id' => $section_id,
            'section_fields' => $section_fields,
            'components' => $components,
            'template_id' => request()->template_id,
            'fieldResponse' => $field ?? '',
        ]);
    }

    public function section_components() {
        $section_id = request()->section_id;
        $components = Component::with('designs')->get();
        $section = Section::with('component_designs')->find($section_id);
        $section_cpts = $section->component_designs;
        return Inertia::render('Backend/SectionData/Component', [
            'section_id' => $section_id,
            'section_cpts' => $section_cpts,
            'components' => $components,
            'fieldResponse' => '',
        ]);
    }

    public function section_components_store(Request $request) {
        $request->validate([
            'section_id' => 'required',
            'component_design_id' => 'required',
        ]);

        try {
            ComponentSection::create([
                'component_design_id' => $request->component_design_id,
                'section_id' => $request->section_id,
            ]);
        } catch (\Exception $e) {
            dd($e->getMessage());
        }
        return redirect()->back();
    }

    public function content_store(Request $request) {
        $request->validate([
            'name' => 'required',
            'value' => 'required',
            'type' => 'required',
            'section_id' => 'required',
        ]);

        $section = Section::find($request->section_id);

        if($section) {
            $section->fields()->create([
                'name' => $request->name,
                'value' => $request->value,
                'type' => $request->type,
                'option' => $request->option,
                'data_type' => 'content',
            ]);
        }

        return redirect()->back();
    }

    public function design_store(Request $request) {
        $request->validate([
            'name' => 'required',
            'value' => 'required',
            'type' => 'required',
            'section_id' => 'required',
        ]);

        $section = Section::find($request->section_id);

        if($section) {
            $section->fields()->create([
                'name' => $request->name,
                'value' => $request->value,
                'type' => $request->type,
                'option' => $request->option,
                'data_type' => 'design',
            ]);
        }

        return redirect()->back();
    }
}
