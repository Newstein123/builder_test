<?php

namespace App\Http\Controllers;

use App\Models\Field;
use Illuminate\Http\Request;

class FieldController extends Controller
{
    public function delete($id) {
        $field = Field::find($id);
        if($field) {
            $field->delete();
        }

        return redirect()->back();
    }
}
