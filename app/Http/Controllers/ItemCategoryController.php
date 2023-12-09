<?php

namespace App\Http\Controllers;

use App\Models\ItemCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ItemCategoryController extends Controller
{
    public function create() {
        return Inertia::render('Category/Create');
    }

    public function store(Request $request) {
        $name = $request->name;
        $website_id = $request->website_id;
        $value = $request->value;
        $variations = $request->variations;
        ItemCategory::create([
            'name' => $name,
            'website_id' => $website_id ?? 1,
            'value' => $value,
            'variations' => json_encode($variations),
        ]);
        return to_route('category.create');
    }
}
