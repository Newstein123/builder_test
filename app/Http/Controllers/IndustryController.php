<?php

namespace App\Http\Controllers;

use App\Models\Industry;
use Illuminate\Http\Request;
use Inertia\Inertia;

class IndustryController extends Controller
{
    public function index() {
        return Inertia::render('Backend/Industry/Index', [
            'industries' => Industry::all(),
        ]);
    }

    public function fields_store(Request $request) {
        $request->validate([
            'name' => 'required',
            'value' => 'required',
            'type' => 'required',
            'industry_id' => 'required',
        ]);
        
        $industry_id = $request->industry_id;
        $industry = Industry::find($industry_id);
        if($industry) {
            $industry->fields()->create([
                'name' => $request->name,
                'value' => $request->value,
                'type' => $request->type,
                'option' => $request->option,
            ]);

        }

        return redirect()->back();
    }
}
