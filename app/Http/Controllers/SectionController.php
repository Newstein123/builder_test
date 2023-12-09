<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Field;
use App\Models\Section;
use App\Models\Template;
use Illuminate\Http\Request;
use App\Models\ComponentSection;
use Illuminate\Support\Facades\DB;

class SectionController extends Controller
{
    public function index(Request $request) {
        $template_id = $request->template_id;
        $section_id = $request->section_id;
        if($section_id) {
            $section = Section::find($section_id);
        }

        $templates = Template::with('sections')->get();
        $sections = Section::where('template_id', $template_id)->get();
        return Inertia::render('Backend/Section/Index', [
            'sections' => $sections,
            'template_id' => $template_id,
            'templates'   => $templates,
            'section' => $section ?? "",
        ]);
    }

    public function store(Request $request) {
        $request->validate([
            'name' => 'required|unique:sections',
            'template_id' => 'required',
            'value' => 'required',
        ]);

        Section::create([
            'name' => $request->name,
            'template_id' => $request->template_id,
            'isShow' => $request->isShow == 'yes' ? 1 : 0,
            'value' => $request->value,
        ]);

        return redirect()->back();
    }

    public function update(Request $request, $id) {
        $section = Section::find($id);
        if($section) {
            $section->update([
                'content' => $request->content,
                'name' => $request->name,
                'value' => $request->value,
            ]);
        }

        return redirect()->back();
    }

    public function duplicate_sections(Request $request) {
        $request->validate([
            'section_id' => 'required',
        ]);

        $template = Template::find($request->template_id);
        if($template) {
            try {
                DB::transaction(function () use($request) {
                    $section = Section::with('fields')->with('component_designs')->find($request->section_id);
                    $fields  = $section->fields;
                    $components = $section->component_designs;
                    // Duplicate Section

                    $dup_section = $section->replicate();
                    $dup_section->name = 'Duplicate ' . $section->name;
                    $dup_section->template_id = $request->template_id;
                    $dup_section->save();

                    // Duplicate Fields 
                    foreach ($fields as $field) {
                        $dup_field =  $field->replicate();
                        $dup_field->fieldable_id = $dup_section->id;
                        $dup_field->save();
                    }

                    // Duplicate Components 

                    foreach ($components as $cpt) {
                        ComponentSection::create([
                            'component_design_id' => $cpt->id,
                            'section_id' => $dup_section->id,
                        ]);
                    }
                });
            } catch (\Exception $e) {
                dd($e->getMessage());
            }
        }

        return redirect()->back();
    }
}
