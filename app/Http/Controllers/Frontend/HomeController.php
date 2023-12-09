<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Website;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index () {
        $websites = Website::with('template')->where('user_id', 1)->get();
        return Inertia::render('Frontend/Home/Index', [
            'websites' => $websites
        ]);
    }
}
