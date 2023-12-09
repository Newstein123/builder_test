<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function store(Request $request) {
        $request->validate([
            'name' => 'required|unique:categories',
            'value' => 'required|unique:categories',
            'sub_industry_id' => 'required',
        ]);

        Category::create([
            'name' => $request->name,
            'value' => $request->value,
            'sub_industry_id' => $request->sub_industry_id,
        ]);

        return redirect()->back()->with('message', 'Category Created Successfully');
    }
}
