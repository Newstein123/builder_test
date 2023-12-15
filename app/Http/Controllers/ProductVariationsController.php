<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Http\Request;

class ProductVariationsController extends Controller
{
    public function store(Request $request) {
        $var_data = $request->var_data;
        $product_id = $request->product_id ?? 1;
        $product = Product::find($product_id);

        $option_variants = []; 
        foreach ($var_data as $key => $vd) {
            $option_variants[$vd['option']] = $vd['variants'];
        }
        $product->update([
            'variations' => json_encode($option_variants),
        ]);

        $products = [];
        $this->generateCombinations($var_data, [], 0, $products);
        
        // delete old products 
        foreach ($product->variants as $key => $variant) {
            $variant->delete();
        }
        
        foreach ($products as $key => $product) {
            ProductVariant::create([
                'product_id' => 1,
                'data' => json_encode($product),
                'image' => ''
            ]);
        }

        return response()->json([
            'success' => true,
            'data' => $option_variants,
            'message' => 'Product Variatant Successfully'
        ]);
    }

    public function edit($id) {
        $product = Product::findOrFail($id);
        return view('frontend.product.variants.edit', compact('product'));
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
}
