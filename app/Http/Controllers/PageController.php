<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PageController extends Controller
{
    public function index(Request $request) {
        $template_id = $request->template_id;
        $page_id = $request->page_id;

        if($page_id) {
            $page = Page::find($page_id);
        }

        $pages = Page::where('template_id', $template_id)->get();

        return Inertia::render('Backend/Page/Index', [
            'pages' => $pages,
            'template_id' => $template_id,
            'page' => $page ?? '',
        ]);
    }

    public function store(Request $request) {
        $request->validate([
            'name' => 'required',
            'template_id' => 'required',
            'value' => 'required',
        ]);

        Page::create([
            'name' => $request->name,
            'template_id' => $request->template_id,
            'isPremium' => $request->isPremium == 'yes' ? 1 : 0,
            'value' => $request->value,
        ]);

        return redirect()->back();
    }

    public function update(Request $request, $id) {
        $request->validate([
            'name' => 'required',
            'value' => 'required',
        ]);

        $page = Page::find($id);
        if($page) {
            $page->update([
                'content' => $request->content,
            ]);
            return redirect()->back();
        }

    }
}
