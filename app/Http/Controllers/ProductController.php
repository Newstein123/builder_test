<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\ItemCategory;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{   
    public function index() {
        $page = 1;
        $perpage = 10;
        $products = Product::latest('id')->skip(($page - 1) * $perpage)->take($perpage)->get();
        // return Inertia::render('Product/Index', [
        //     'data' => $products_resource,
        // ]);
        return view('frontend.product.index', compact('products'));
    }

    public function create(Request $request) {
        $categories = ItemCategory::all();
        // return Inertia::render('Product/Create', [
        //     'cats' => $categories,
        // ]);
        $product_id = $request->product_id;
        if($product_id) {
            $product = Product::findOrFail($product_id);
        } else {
            $product = Product::create([]);
        }
        return view('frontend.product.create', compact('product'));
    }

    public function store(Request $request) {
        $product = Product::findOrFail($request->product_id);
        $name = $request->name ?? 'Untitled Name';
        $price = $request->price ?? 0;
        $stock  = $request->stock ?? 0;
        $desc = $request->description ?? '';
        $category_id = $request->category_id ?? null;
        $additional_info = $request->additional_info ?? [];
        $currency = $request->currency ?? 'mmk';
        $tags = $request->tags ?? [];
        $visibility = $request->visibility ?? 0;

        $product->update([
            'name' => $name,
            'price' => $price,
            'stock' => $stock,
            'description' => $desc,
            'category_id' => $category_id,
            'tags' => json_encode($tags), 
            'additional_info' => $additional_info,
            'currency' => $currency,
            'visibility' => $visibility,
        ]);

        return redirect()->route('product.index')->with('message', 'Saved');
    }
}
