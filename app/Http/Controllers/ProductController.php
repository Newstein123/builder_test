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
        $products_resource = ProductResource::collection($products);
        return Inertia::render('Product/Index', [
            'data' => $products_resource,
        ]);
    }

    public function create() {
        $categories = ItemCategory::all();
        return Inertia::render('Product/Create', [
            'cats' => $categories,
        ]);
    }

    public function store(Request $request) {
        $name = $request->name;
        $price = $request->price;
        $quantity  = $request->quantity;
    $variations = json_encode($request->variations);
        $desc = $request->description;
        $category_id = $request->category_id;
        Product::create([
            'user_id' => 1,
            'name' => $name,
            'price' => $price,
            'quantity' => $quantity,
            'variations' => $variations,
            'description' => $desc,
            'category_id' => $category_id,
        ]);
        return to_route('product.index')->with('message', 'Product Created Successfully');
    }
}
