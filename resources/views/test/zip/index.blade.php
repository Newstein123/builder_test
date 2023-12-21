@extends('layout.frontend')
@section('content')
    <form action="{{route('zip.store')}}" method="POST" enctype="multipart/form-data">
        @csrf
        <div class="my-3">
            <label for="filename"> File Name </label>
            <input type="text" name="filename" id="" class="form-control my-3">
        </div>
        <div class="my-3">
            <label for="zipfile"> Upload your zip file </label>
            <input type="file" name="zipfile" id="" class="form-control my-3">
        </div>
        <button class="btn btn-primary"> Save  </button>
    </form>
@endsection