@extends('layout.frontend')
@section('content')
    <div class="container">
        <div class="my-3">
            <textarea cols="100%" rows="100%">{{file_get_contents('storage/'.$template->content)}}</textarea>
        </div>
    </div>
@endsection