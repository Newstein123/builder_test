<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Twig\Environment;
use App\Models\Website;
use App\Models\Industry;
use App\Models\SectionsData;
use App\Models\Template;
use Illuminate\Http\Request;
use Twig\Loader\FilesystemLoader;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class WebsiteController extends Controller
{
    public function create(Request $request)
    {
        $template_id = $request->template_id;
        if ($template_id) {
            $template = Template::find($template_id);
            $general_data = $template->industry->fields;
        }
        $industries = Industry::with('sub_industries')
            ->with('sub_industries.categories')
            ->with('sub_industries.categories.templates')
            ->latest('id')
            ->get();
        return Inertia::render('Frontend/Website/Create', [
            'industries' => $industries,
            'general_data'   => $general_data ?? "",
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->data;
        $form_data = $request->formData;
        
        if($form_data) {
            foreach ($form_data as $key => $value) {
                if ($value instanceof \Illuminate\Http\UploadedFile) {
                    $filename = time() . '_' .  $value->getClientOriginalName();
                    $path = Storage::putFileAs('uploads/' . $key, $value, $filename);
                    $form_data[$key] = $path;
                }
            }
        }

        try {
            DB::transaction(function () use($data, $form_data) {
                $template = Template::find($data['template_id']);
                $sections = $template->sections;
                $website = Website::create([
                    'name' => $data['name'],
                    'template_id' => $data['template_id'],
                    'user_id' => $data['user_id'] ?? 1,
                    'general_data' => json_encode($form_data),
                ]);

                foreach ($sections as $section) {
                    SectionsData::create([
                        'name' => $section->value,
                        'website_id' => $website->id,
                    ]);
                }
            });
        } catch (\Exception $e) {
            dd($e->getMessage());
        }
    }

    public function my_website($id)
    {
        $loader = new FilesystemLoader();
        $twig = new Environment($loader);
        $website = Website::with("sections_data")->find($id);

        $template = Template::with('sections')
            ->with('sections.component_designs')
            ->with('sections.component_designs.component')
            ->where('id', $website->template_id)
            ->first();

        $general_data = json_decode($website->general_data, true);

        $sectionsData = [];
        
        foreach ($website->sections_data as $value) {
            $sectionsData[$value->name] = $value->data ?? [];
        }

        if ($website) {
            $sections = [];

            foreach ($template->sections as $key => $section) {
                $cpt_dsgs = $section->component_designs;
                $newSectionContent = $section->content;

                foreach ($cpt_dsgs as $key => $cpt_dsg) {
                    $cpt_name = $cpt_dsg->component->value;
                    $newSectionContent = str_replace("[$cpt_name]", $cpt_dsg->content, $newSectionContent);
                }

                $sectionContent = $twig->createTemplate($newSectionContent);
                $sectionName = $section->value;

                // Check if data exists for the current section
                if (isset($sectionsData[$sectionName])) {
                    $sectionOutput = $sectionContent->render($sectionsData[$sectionName]);

                    // Save the rendered output along with other section information
                    $sections[$sectionName] = [
                        'output' => $sectionOutput,
                    ];
                }
            }

            $templateContent = $template->layout;

            foreach ($sectionsData as $sectionName => $sectionData) {
                // Array to string 
                $replaceString = implode(', ', $sections[$sectionName]);
                $templateContent = str_replace("{{{$sectionName}}}", $replaceString, $templateContent);
            }

            $twigTemplate = $twig->createTemplate($templateContent);
            $finalOutput = $twigTemplate->render($general_data);
            return view('my_website', compact('finalOutput'));
        }
    }

    public function content_edit($id) {
        $website = Website::with([
            'template.sections.component_designs',
            'template.sections.fields'
        ])->findOrFail($id);        

        return view('frontend.website.content', compact('website'));
    }
}
