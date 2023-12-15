<?php

namespace App\Http\Controllers;

use App\Models\ComponentDesign;
use Inertia\Inertia;
use Twig\Environment;
use App\Models\Website;
use App\Models\Industry;
use App\Models\Template;
use Illuminate\Support\Arr;
use App\Models\SectionsData;
use Illuminate\Http\Request;
use App\Models\ComponentsData;
use App\Models\ComponentSection;
use App\Models\Page;
use App\Models\Section;
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
                $pages = $template->pages;
                $website = Website::create([
                    'name' => $data['name'],
                    'template_id' => $data['template_id'],
                    'user_id' => $data['user_id'] ?? 1,
                    'general_data' => json_encode($form_data),
                ]);

                foreach ($pages as $page) {
                    foreach ($page->sections as $section) {
                        SectionsData::create([
                            'page_name' => $page->value,
                            'name' => $section->value,
                            'website_id' => $website->id,
                            'content_data' => json_encode([]),
                            'design_data' => json_encode([]),
                        ]);
    
                        foreach ($section->component_designs as $cpt_dsg) {
                            ComponentsData::create([
                                'name' => $cpt_dsg->component->value,
                                'website_id' => $website->id,
                                'section_name' => $section->value,
                                'content_data' => json_encode([]),
                                'design_data' => json_encode([]),
                            ]);
                        }
                    }
                }
            });
        } catch (\Exception $e) {
            dd($e->getMessage());
        }
    }

    public function my_website($id, $page_name = "default")
    {   
        if($page_name == "default") {
            $page_name = "home_pg";
        }

        $loader = new FilesystemLoader();
        $twig = new Environment($loader);
        $website = Website::with(["sections_data", 'components_data'])->find($id);

        $template = Template::where('id', $website->template_id)->first();
        $pages = Page::where('template_id', $template->id)->get();
        $pages_array = $pages->transform(function($item) {
            return [
                'name' => $item->name, 
                'value' => $item->value, 
            ];
        })->toArray();

        $page = Page::with('sections')
            ->with('sections.component_designs')
            ->with('sections.component_designs.component')
            ->where('template_id', $template->id)
            ->where('value', $page_name)
            ->first();

        $general_content_data = json_decode($website->general_data, true);
        $general_design_data = json_decode($website->design_data, true);
        $general_data = array_merge($general_content_data, $general_design_data);

        $rednerData = [
            'gen' => $general_data,
            'pages' => $pages_array,
        ];

        $combine_cpt_sec_data = [];

        $sections_data = $website->sections_data->filter(function($item) use($page_name) {
            return $item->page_name == $page_name;
        });
        // Sections Data
        foreach ($sections_data as $value) {
            // first combine design and content data 
            $section_content_data = json_decode($value->content_data, true);
            $section_design_data = json_decode($value->design_data, true);
            $combinedSecData = array_merge($section_content_data, $section_design_data);
            $combine_cpt_sec_data[$value->name] = $combinedSecData ?? [];
        }

        // filter component data 
        $components_data = $website->components_data->filter(function($item) use($page_name) {
            return $item->page_name == $page_name;
        });

        // Component Data in the section
        if(count($components_data) > 0) {
            foreach ($components_data as $key => $value) {
                $section_name = $value->section_name;
                if (isset($combine_cpt_sec_data[$section_name])) {
                    // If the section already exists, merge the component data and section data
                    $cpt_design_data = $value->design_data;
                    $cpt_content_data = $value->content_data;
                    // first combine content and design data 
                    $combinedCptData = array_merge(json_decode($cpt_content_data, true), json_decode($cpt_design_data, true));
                    $combine_cpt_sec_data[$section_name] = array_merge($combine_cpt_sec_data[$section_name], [$value->name => $combinedCptData]);
                } else {
                    // If the section doesn't exist, create a new entry
                    $combine_cpt_sec_data[$section_name] = [$value->name => json_decode($value->data, true)];
                }
            }
        }
        // combine with renderData 
        $rednerData = array_merge($rednerData, $combine_cpt_sec_data);
        if ($website) {
            $sections = [];
            foreach ($page->sections as $key => $section) {
                $cpt_dsgs = $section->component_designs;
                $newSectionContent = $section->content;

                foreach ($cpt_dsgs as $key => $cpt_dsg) {
                    $cpt_name = $cpt_dsg->component->value;
                    $newSectionContent = str_replace("[$cpt_name]", $cpt_dsg->content, $newSectionContent);
                }

                // $sectionContent = $twig->createTemplate($newSectionContent);
                $sectionName = $section->value;
                // Check if data exists for the current section
                if (isset($combine_cpt_sec_data[$sectionName])) {
                    // $sections_array = $combine_cpt_sec_data[$sectionName];
                    // $sectionOutput = $sectionContent->render($sections_array);
                    // Save the rendered output along with other section information
                    $sections[$sectionName] = [
                        'output' => $newSectionContent,
                    ];
                }
            }

            $templateContent = $template->layout;
            // dd( $combine_cpt_sec_data);
            // dd($sections);
            foreach ($combine_cpt_sec_data as $sectionName => $sectionData) {
                // Array to string 
                $replaceString = implode(', ', $sections[$sectionName]);
                $templateContent = str_replace("{{{$sectionName}}}", $replaceString, $templateContent);
            }

            $templateContent = str_replace("{{links}}", $template->links, $templateContent);
            $templateContent = str_replace("{{js}}", $template->js, $templateContent);
            $twigTemplate = $twig->createTemplate($templateContent);
            $finalOutput = $twigTemplate->render($rednerData);
            return view('my_website', compact('finalOutput'));
        }
    }

    public function content_edit(Request $request, $id) {
        $website = Website::with([
            'template.pages.sections.component_designs',
            'template.pages.sections.fields'
        ])->findOrFail($id);  
        return view('frontend.website.content', compact('website'));
    }
    

    public function content_update(Request $request, $id) {
        $website = Website::findOrFail($id);
        $pages = $request->pages;
        $old_components_data = $website->components_data;
        $components_data = $request->components;
        // Store components data 
        if(array_key_exists('components', $request->all())) {
            if(count($components_data) > 0) {
                foreach ($old_components_data as $cpt) {
                    $new_cpt_data = [];
                    $section_name = $components_data[$cpt->name][0];// section id in array key 0
                    Arr::forget($components_data[$cpt->name], 0); // delete the section id 

                    // check it is the loopable component or not 
                        foreach ($components_data[$cpt->name] as $cpt_card_data) {
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

                    // dd($new_cpt_data);
                    $cpt->update([
                        'content_data' => json_encode($new_cpt_data),
                    ]);
                }
            }
    
        }
        // Store Sections Data on specific page
        foreach ($pages as $key => $page) {
            $sections_data = $page['sections'];
            $old_sections_data = $website->sections_data->filter(function($item) use($key) {
                return $item->page_name == $key;
            });
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
                        'content_data' => json_encode($sections_data[$section->name]),
                    ]);
                } 
            }
        }

        return redirect()->route('home');
    }

    public function design_edit($id) {
        $website = Website::with([
            'template.pages.sections.component_designs',
            'template.pages.sections.fields'
        ])->findOrFail($id);  
        return view('frontend.website.design', compact('website'));
    }

    public function design_update(Request $request, $id) {
        $website = Website::findOrFail($id);
        $old_components_data = $website->components_data;
        $components_data = $request->components;
        $pages = $request->pages;
        $data = array(
            'color_pallet' => $request->color_pallet,
            'font' => $request->font,
        );

        $website->update([
            'design_data' => json_encode($data),
        ]);

        // Store Sections Data
        foreach ($pages as $key => $page) {
            $sections_data = $page['sections'];
            $old_sections_data = $website->sections_data->filter(function($item) use($key) {
                return $item->page_name == $key;
            });

            foreach ($old_sections_data as $section) {
                if(isset($sections_data[$section->name])) {
                    $section->update([
                        'design_data' => json_encode($sections_data[$section->name]),
                    ]);
                } 
            }
        }

        // Store Section data 
        foreach ($old_components_data as $cpt) {
            if(isset($components_data[$cpt->name])) {
                $cpt->update([
                    'design_data' => json_encode($components_data[$cpt->name]),
                ]);
            } 
        }
        return to_route('home');
    }

    public function cpt_dsg_update(Request $request) {
        $loader = new FilesystemLoader();
        $twig = new Environment($loader);
        $website = Website::find($request->website_id);
        $section= Section::where('value', $request->section_name)->first();
        $oldComponentDesignId = ComponentDesign::where('value', $request->old_cpt_dsg_name)->value('id');
        $newComponentDesignId = $request->new_cpt_dsg_id;
        

        $section->component_designs()->updateExistingPivot($oldComponentDesignId, [
            'component_design_id' => $newComponentDesignId,
        ]);

        $sections_data = SectionsData::where('website_id', $website->id)->where('name', $section->value)->first();
        $combinedSecData = array_merge(json_decode($sections_data->content_data, true), json_decode($sections_data->design_data, true));

        $components_data = ComponentsData::where('website_id', $website->id)->where('section_name', $section->value)->get();

        $cpt_dsgs = $section->component_designs;
        $newSectionContent = $section->content;
        
        foreach ($cpt_dsgs as $key => $cpt_dsg) {
            $cpt_name = $cpt_dsg->component->value;
            $newSectionContent = str_replace("[$cpt_name]", $cpt_dsg->content, $newSectionContent);
        }

        $sectionsData = [
            $section->value => $combinedSecData,
        ];

        foreach ($components_data as $key => $value) {
            $section_name = $value->section_name;
            if (isset($sectionsData[$section_name])) {
                // If the section already exists, merge the component data and section data
                $cpt_design_data = $value->design_data;
                $cpt_content_data = $value->content_data;
                // first combine content and design data 
                $combinedCptData = array_merge(json_decode($cpt_content_data, true), json_decode($cpt_design_data, true));
                $sectionsData[$section_name] = array_merge($sectionsData[$section_name], [$value->name => $combinedCptData]);
            } else {
                // If the section doesn't exist, create a new entry
                $sectionsData[$section_name] = [$value->name => json_decode($value->data, true)];
            }
        }

        $twigTemplate = $twig->createTemplate($newSectionContent);
        $finalOutPut = $twigTemplate->render($sectionsData[$section->value]);

        return response()->json([
            'success' => true,
            'data' => $finalOutPut,
            'message' => "Component Design Update Successfully",
        ]);
    }
}
