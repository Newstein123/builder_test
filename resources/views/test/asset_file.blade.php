<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    @php
        $assets = $template->assets;
    @endphp
    <form action="{{route('asset_update')}}" method="POST">
        @csrf
        @method('PUT')
        @foreach ($assets as $asset)
            <input type="hidden" name="asset_id" value="{{$asset->id}}">
            <textarea name="csscode" id="" cols="30" rows="10">{{Storage::get($asset->path)}}</textarea>
        @endforeach
        <button type="submit"> Save </button>
    </form>
</body>
</html>