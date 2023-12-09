<?php

namespace App\Http\Controllers;

use App\Models\Industry;
use App\Models\SubIndustry;
use Inertia\Inertia;
use Illuminate\Http\Request;

class SubIndustryController extends Controller
{
    public function index(Request $request) {
        $sub_industries = SubIndustry::where('industry_id', $request->industry_id)->get();
        $industry = Industry::with('fields')->where('id', $request->industry_id)->first();
        $idy_fields = $industry->fields;
        return Inertia::render('Backend/SubIndustry/Index', [
            'sub_industries' => $sub_industries,
            'industry_id' => $request->industry_id,
            'idy_fields' => $idy_fields,
        ]);
    }   
}
