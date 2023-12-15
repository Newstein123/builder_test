<?php

use App\Helper\MyHelper;
use Inertia\Inertia;
use Twig\Environment;
use App\Models\Product;
use App\Models\Template;
use App\Models\SubIndustry;
use Illuminate\Http\Request;
use App\Models\ProductOption;
use App\Models\ProductVariations;
use Twig\Loader\FilesystemLoader;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\TestController;
use App\Http\Controllers\FieldController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SectionController;
use App\Http\Controllers\WebsiteController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\IndustryController;
use App\Http\Controllers\SectionDataController;
use App\Http\Controllers\SubIndustryController;
use App\Http\Controllers\ItemCategoryController;
use App\Http\Controllers\Frontend\HomeController;
use App\Http\Controllers\ComponentDesignController;
use App\Http\Controllers\Backend\TemplateController;
use App\Http\Controllers\Backend\ComponentController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ProductVariationsController;
use App\Models\OptionVariant;
use App\Models\ProductVariatant;
use App\Models\VariatantAttribute;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/test/template', function () {
    $page = request()->query('page') ?? 1;
    $perpage = 5;
    $template = Template::find(1);
    $products = Product::skip(($page - 1) * $perpage)->take($perpage)->get();
    return Inertia::render('Temp/View', [
        'data' => array(
            'name' => "Min Thet Paing",
            'hero_bg' => "green",
            'my_bg' => 'red',
        ),
        'templateStructure' => $template->content,
        'products' => $products,
        'count' => Product::count(),
    ]);
});

Route::prefix('admin')->group(function () {
    // Pages 
        Route::resource('page', PageController::class);

    // Section Data 
    Route::prefix('section-data')->group(function () {
        Route::get('/', [SectionDataController::class, 'index'])->name('section.data.index');
        Route::get('component', [SectionDataController::class, 'section_components'])->name('section.data.component.index');
        Route::post('component', [SectionDataController::class, 'section_components_store'])->name('section.data.component.store');
        Route::post('content/store', [SectionDataController::class, 'content_store'])->name('section.content.data.store');
        Route::post('design/store', [SectionDataController::class, 'design_store'])->name('section.design.data.store');
    });

    // Cpt Design 
    Route::prefix('component-design')->group(function () {
        Route::get('/', [ComponentDesignController::class, 'index'])->name('component.design.index');
        Route::post('store', [ComponentDesignController::class, 'store'])->name('component.design.store');
        Route::put('edit/{id}', [ComponentDesignController::class, 'update'])->name('component.design.update');
    });

    // Component 
    Route::prefix('component')->group(function () {
        Route::get('/', [ComponentController::class, 'index'])->name('component.index');
        Route::post('store', [ComponentController::class, 'store'])->name('component.store');
        Route::post('conent/store', [ComponentController::class, 'cpt_content_store'])->name('component.content.data.store');
        Route::post('design/store', [ComponentController::class, 'cpt_design_store'])->name('component.design.data.store');
        Route::get('cpt_designs', [ComponentController::class, 'get_all_cpt_dsgs'])->name('component.cpt_dsgs.all');
    });

    // Field 

    Route::delete('field/delete/{id}', [FieldController::class, 'delete'])->name('field.delete');
    Route::get('field/show/{id}', [FieldController::class, 'show'])->name('field.show');
});

// My Website 
// 
Route::prefix('my-website')->group(function() {
    Route::get('content-edit/{id}', [WebsiteController::class, 'content_edit'])->name('website.content.edit');
    Route::post('content-edit/{id}', [WebsiteController::class, 'content_update'])->name('website.content.update');
    Route::get('design-edit/{id}', [WebsiteController::class, 'design_edit'])->name('website.design.edit');
    Route::post('design-edit/{id}', [WebsiteController::class, 'design_update'])->name('website.design.update');
    Route::post('component-design/update', [WebsiteController::class, 'cpt_dsg_update'])->name('website.component-dsg.update');
    Route::get('{id}', [WebsiteController::class, 'my_website'])->name('website.template');
    Route::get('{id}/{page_name}', [WebsiteController::class, 'my_website'])->name('website.template');

});

// industry  

Route::post('/industry-fields/store', [IndustryController::class, 'fields_store'])->name('industry.field.store');
Route::resource('industry', IndustryController::class);
Route::resource('sub_industry', SubIndustryController::class);
Route::resource('website', WebsiteController::class);
// Route::get('my-website/{id}', [TestController::class, 'render_template']);
Route::resource('category', ItemCategoryController::class);
Route::resource('product', ProductController::class);
Route::resource('product-variations', ProductVariationsController::class);
Route::resource('admin/template', TemplateController::class);
Route::post('admin/section-duplicate', [SectionController::class, 'duplicate_sections'])->name('section.duplicate');
Route::resource('admin/section', SectionController::class);
Route::get('/', [HomeController::class, 'index'])->name('home');

require __DIR__ . '/auth.php';

Route::get('/test/twig', function () {
    $loader = new FilesystemLoader();
    $twig = new Environment($loader);

    // Fetch template content from the database
    $templateContent = Template::where('id', 1)->value('layout');

    // Assuming 'layout' is the column name where your Twig template content is stored
    $twigTemplate = $twig->createTemplate($templateContent);

    $userData = [
        'products' => [
            ['name' => 'Product 1', 'price' => 19.99],
            ['name' => 'Product 2', 'price' => 29.99],
        ],
    ];

    $combinedData = [
        'user' => $userData,
    ];

    // Use the $twigTemplate->render() method to render the Twig template
    $finalOutput = $twigTemplate->render($combinedData);

    // Assuming 'twig.template' is the path to your view file
    return view('twig.template', compact('finalOutput'));
});

Route::get('/website-data/test', function () {
    $loader = new FilesystemLoader();
    $twig = new Environment($loader);
    $template = Template::with('sections')->with('sections.component_designs')->with('sections.component_designs.component')->where('id', 1)->first();
    
    $designData = [
        'primary_color' => "lightblue",
        'secondary_color' => "gold",
    ];

    $heroData = [
        "title" => "I am Min Thet Paing, I am a Developer",
        'desc' => 'Contact Me if you need',
        'hero_image' => "https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
    ];

    $aboutData = [
        "name" => "Min Thet Paing",
        "email" => 'minthetpaing376@gmail.com',
        "about_image" => "https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
    ];

    $productData = [
        'products' => [
            [
                'product_name' => 'Product 1', 
                'product_desc' => "this is product desc",
                'product_image' => "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            ],
            [
                'product_name' => 'Product 2', 
                'product_desc' => "this is product desc",
                'product_image' => "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            ],
            [
                'product_name' => 'Product 3', 
                'product_desc' => "this is product desc",
                'product_image' => "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            ],
            [
                'product_name' => 'Product 4', 
                'product_desc' => "this is product desc",
                'product_image' => "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            ],
            [
                'product_name' => 'Product 5', 
                'product_desc' => "this is product desc",
                'product_image' => "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            ],
            [
                'product_name' => 'Product 6', 
                'product_desc' => "this is product desc",
                'product_image' => "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            ],
            
        ],
    ];

    $sectionsData = [
        'hero_section' => $heroData,
        'about_section' => $aboutData,
        'product_section' => $productData,
    ];
    dd($sectionsData);
    $sections = [];

    foreach ($template->sections as $key =>$section) {
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
    $finalOutput = $twigTemplate->render($designData);
    return view('welcome', compact('finalOutput'));
});

// Category 
Route::post('/category/create', [CategoryController::class, 'store'])->name('category.create');
Route::get('/test/component/edit', function(Request $request) {
    $loader = new FilesystemLoader();
    $twig = new Environment($loader);
    $cpt_name = 'team_card';
    $website = App\Models\Website::find(5);
    $cpt = App\Models\Component::with('designs')->where('value', $cpt_name)->first();
    $cpt_dsgs = $cpt->designs;
    $cpt_dsgs_content = [];

    foreach ($cpt_dsgs as $key => $value) {
       $twigTemplate = $twig->createTemplate($value->skeleton);
       $finalOutput = $twigTemplate->render();
       $cpt_dsgs_content[$value->id]  = $finalOutput;
    }
});

Route::get('/test/component/update', function() {
    $website = App\Models\Website::find(3);
    $template = App\Models\Template::find($website->template_id);
    $cpt_dsg = App\Models\ComponentDesign::find(3);
});

// Route::get('/test/products', function() {
//     $options = [
//         [
//             'option' => 'color',
//             'variants' => ['red', 'green', 'blue'],
//         ],
//         [
//             'option' => 'size',
//             'variants' => ['md', 'xl', 'sm'],
//         ],
//         [
//             'option' => 'gender',
//             'variants' => ['male', 'female'],
//         ],
//     ];


//     $var = [];
//     foreach ($options as $option) {
//         $var[$option['option']] = $option['variants'];
//     }

//     $products = [];

    
//     $variatants = [
//         [
//             'color' =>   ['red', 'green', 'blue'],
//         ],
//         [
//             'size' => ['md', 'xl', 'sm'],
//         ],
//         [
//             'gender' => ['male', 'female'],
//         ],
//         [
//             'material' => ['plastic', 'wood'],
//         ]
//     ];

//     $products = [
//         [
//             'color' => 'red',
//             'size' => 'md',
//             'geneder' => 'male',
//             'material' => 'wood'
//         ],
//         [
//             'color' => 'red',
//             'size' => 'md',
//             'geneder' => 'female',
//             'material' => 'wood'
//         ],
//         [
//             'color' => 'red',
//             'size' => 'lg',
//             'geneder' => 'male',
//             'material' => 'wood'
//         ],
//         [
//             'color' => 'red',
//             'size' => 'lg',
//             'geneder' => 'female',
//             'material' => 'wood'
//         ],
//         [
//             'color' => 'red',
//             'size' => 'sm',
//             'geneder' => 'male',
//             'material' => 'wood'
//         ],
//         [
//             'color' => 'red',
//             'size' => 'sm',
//             'geneder' => 'female',
//             'material' => 'wood'
//         ],
//         [
//             'color' => 'red',
//             'size' => 'md',
//             'geneder' => 'male',
//             'material' => 'plastic'
//         ],
//         [
//             'color' => 'red',
//             'size' => 'md',
//             'geneder' => 'female',
//             'material' => 'plastic'
//         ],
//         [
//             'color' => 'red',
//             'size' => 'lg',
//             'geneder' => 'male',
//             'material' => 'plastic'
//         ],
//         [
//             'color' => 'red',
//             'size' => 'lg',
//             'geneder' => 'female',
//             'material' => 'plastic'
//         ],
//         [
//             'color' => 'red',
//             'size' => 'sm',
//             'geneder' => 'male',
//             'material' => 'plastic'
//         ],
//         [
//             'color' => 'red',
//             'size' => 'sm',
//             'geneder' => 'female',
//             'material' => 'plastic'
//         ],
//     ];

//     $combinations = [];

//     dd((new MyHelper())->generateCombinations($options, $combinations));

//     DB::transaction(function () use ($options) {
//         $option_variatant = [];
//         foreach ($options as $i) {

//             $option = ProductOption::create([
//                 'name' => $i['options'],
//             ]);

//             foreach ($i['variatants'] as $j) {
//                 $var = ProductVariatant::create([
//                     'name' => $j,
//                 ]);

//                 OptionVariant::create([
//                     'option_id' => $option->id
//                 ]);
//             }
//         };
//     });

    
// });

Route::get('/test/products', [TestController::class, 'product_var']);


