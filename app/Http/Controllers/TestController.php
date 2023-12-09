<?php

namespace App\Http\Controllers;

use App\Models\Template;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Blade;

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
    
}

