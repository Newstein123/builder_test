<?php

namespace App\Http\Controllers;

use App\Models\Field;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FieldController extends Controller
{
    public function delete($id) {
        $field = Field::find($id);
        if($field) {
            $field->delete();
        }

        return redirect()->back();
    }

    public function show($id) {
        $field = Field::find($id);
        return Inertia::render('Backend/SectionData/Index', [
            'field' => $field,
        ]);
    }
}
