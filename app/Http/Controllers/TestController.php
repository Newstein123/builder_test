<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Website;
use App\Models\Template;
use Illuminate\Http\Request;
use App\Models\TemplateAsset;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\Storage;

class TestController extends Controller
{   private $defaultlData;

    public function __construct() {
        $this->defaultlData = [
            'name' => 'My name',
            'position' => 'My Position',
            'style' => "this is style",
            'header_bgcolor' => 'green'
        ];
    }

    public function render_template($id) {
        $template = Template::find($id);
        // $links = $template->links;
        // $css = $template->css;
        // $js = $template->js;
        // $website_name = "Min Thet Paing";
        // $data = [
        //     'name' => "min thet paing",
        //     'position' => "Web Developer",
        //     'header_bgcolor' => 'red'
        // ];
        // 
        $layout = $template->layout;
        // $renderedTemplate = $this->replaceTemplateVariables($template->content, $data);
        // return view('welcome', compact('renderedTemplate', 'links', 'css', 'website_name', 'js'));
        return view('test.template-view', compact('template'));
    }

    private function replaceVariables($content, $data)
    {
        foreach ($data as $variable => $value) {
            $content = str_replace('{{$' . $variable . '}}', $value, $content);
        }

        return $content;
    }

    // app/Helpers/TemplateHelper.php

    function replaceTemplateVariables($content, $data)
    {
        return preg_replace_callback('/\{\{\s*\$([^\s\}]+)\s*\}\}|\$([^\s\}]+)/', function ($matches) use ($data) {
            $variableName = $matches[1] ?? $matches[2];
            return $data[$variableName] ?? $this->defaultlData[$variableName] ?? $variableName;
        }, $content);
    }
    
    function generateCombinations($options, $currentCombination = [], $currentIndex = 0, &$result = []) {
        if($currentIndex == count($options)) {
             $result[] = $currentCombination;
             return;
        }

        $currentOption = $options[$currentIndex];

        foreach ($currentOption['variants'] as $variant) {
            $newCombination = $currentCombination;
            $newCombination[$currentOption['option']] = $variant;
            $this->generateCombinations($options, $newCombination, $currentIndex + 1, $result);
        }

    }

    function product_var() {
        $options = [
            [
                'option' => 'color',
                'variants' => ['red', 'green', 'blue'],
            ],
            [
                'option' => 'size',
                'variants' => ['md', 'xl', 'sm'],
            ],
            [
                'option' => 'gender',
                'variants' => ['male', 'female'],
            ],
        ];
        $products = [];
        $this->generateCombinations($options, [], 0, $products);
        $product = Product::find(1);
        dd($product->variants);
    }

    function asset_file() {
        $website = Website::find(9);
        $template = Template::where('id', $website->template_id)->first();
        return view('test.asset_file', compact('template'));
    }
    
    function asset_file_update(Request $request) {
        $asset = TemplateAsset::find($request->asset_id);
        Storage::put($asset->path, $request->csscode);
        return redirect()->back();
    }

    function aws_file_upload() {
        return view('test.aws_file');
    }

    function aws_file_store(Request $request) {
        $file = $request->file('file');
        $filename = time() . '_'. $file->getClientOriginalName();
        $path = 'public/images';
        $path = Storage::putFileAs($path, $file, $filename);
        dd(Storage::url($path));
        dd($path);
    }
}

