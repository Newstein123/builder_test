@extends('layout.frontend')
@section('content')
    <div class="d-flex justify-content-center align-items center">
        <div class="w-50">
            <form action="{{route('template-file.store')}}" method="POST" enctype="multipart/form-data">
            @csrf
            <div class="my-3">
                <label for="layout"> Add Layout File </label>
                <input type="file" name="file" id="" class="form-control w-100 my-3">
            </div>
            <div class="text-end">
                <button type="submit"> Save </button>
            </div>
            </form>
        </div>
    </div>
@endsection