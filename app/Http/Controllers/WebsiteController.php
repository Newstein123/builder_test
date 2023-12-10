<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Twig\Environment;
use App\Models\Website;
use App\Models\Industry;
use App\Models\Template;
use Illuminate\Support\Arr;
use App\Models\SectionsData;
use Illuminate\Http\Request;
use App\Models\ComponentsData;
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
        $website = Website::with(["sections_data", 'components_data'])->find($id);
        $components_data = $website->components_data;
        

        $template = Template::with('sections')
            ->with('sections.component_designs')
            ->with('sections.component_designs.component')
            ->where('id', $website->template_id)
            ->first();

        $general_data = json_decode($website->general_data, true);
        $design_data = json_decode($website->design_data, true);

        $rednerData = [
            'design' => $design_data,
        ];

        $sectionsData = [];

        // Sections Data
        foreach ($website->sections_data as $value) {
            $sectionsData[$value->name] = json_decode($value->data, true) ?? [];
        }
        // Component Data in the section
        foreach ($components_data as $key => $value) {
            $section_name = $value->section_name;
            if (isset($sectionsData[$section_name])) {
                // If the section already exists, merge the data
                $sectionsData[$section_name] = array_merge($sectionsData[$section_name], [$value->name => json_decode($value->data, true)]);
            } else {
                // If the section doesn't exist, create a new entry
                $sectionsData[$section_name] = [$value->name => json_decode($value->data, true)];
            }
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
                    $sections_array = $sectionsData[$sectionName];
                    $sectionOutput = $sectionContent->render($sections_array);
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

            $templateContent = str_replace("{{links}}", $template->links, $templateContent);
            $templateContent = str_replace("{{js}}", $template->js, $templateContent);
            $twigTemplate = $twig->createTemplate($templateContent);
            $finalOutput = $twigTemplate->render($rednerData ?? []);
            return view('my_website', compact('finalOutput'));
        }
    }

    public function content_edit(Request $request, $id) {
        $website = Website::with([
            'template.sections.component_designs',
            'template.sections.fields'
        ])->findOrFail($id);        

        return view('frontend.website.content', compact('website'));
    }
    

    public function content_update(Request $request, $id) {
        $website = Website::findOrFail($id);
        $old_sections_data = $website->sections_data;
        $sections_data = $request->sections;
        $components = $request->components;

        // Store components data 
        if(array_key_exists('components', $request->all())) {
            if(count($components) > 0) {
                foreach ($components as $cpt_name => $cpt_data) {
                    $section_name = $cpt_data[0];// section id in array key 0
                    Arr::forget($cpt_data, 0); // delete the section id 
                    $new_cpt_data = array_values($cpt_data);
    
                    // check file exist and store the image 
    
                    $new_cpt_data = [];
                    foreach ($cpt_data as $cpt_card_data) {
                        $new_data = [];
                        foreach ($cpt_card_data as $var => $data) {
                            if ($data instanceof \Illuminate\Http\UploadedFile) {
                                $filename = time() . '_' .  $data->getClientOriginalName();
                                $path = Storage::putFileAs('uploads/' . $var, $data, $filename);
                                $new_data[$var] = env('APP_URL') . '/storage/' . $path;
                            } else {
                                $new_data[$var] = $data;
                            }
                        }
                        $new_cpt_data[] = $new_data;
                    }
    
                    ComponentsData::create([
                        'name' => $cpt_name,
                        'website_id' => $id,
                        'section_name' => $section_name, 
                        'data' => json_encode($new_cpt_data),
                    ]);
                }
            }
    
        }
        // Store Sections Data
        foreach ($old_sections_data as $section) {
            if(isset($sections_data[$section->name])) {
                foreach ($sections_data[$section->name] as $key => $value) {
                    if($value instanceof \Illuminate\Http\UploadedFile) {
                        $filename = time() . '_' .  $value->getClientOriginalName();
                        $path = Storage::putFileAs('uploads/' . $key, $value, $filename);
                        $sections_data[$section->name][$key] = env('APP_URL'). '/storage/' . $path;
                    }
                }
                
                $section->update([
                    'data' => json_encode($sections_data[$section->name]),
                ]);
            } 
        }

        return redirect()->route('home');
    }

    public function design_edit($id) {
        return view('frontend.website.design');
    }

    public function design_update(Request $request, $id) {
        $website = Website::findOrFail($id);
        $data = array(
            'color_pallet' => $request->color_pallet,
            'font' => $request->font,
        );
        $website->update([
            'design_data' => json_encode($data),
        ]);
        
        return to_route('home');
    }
}
