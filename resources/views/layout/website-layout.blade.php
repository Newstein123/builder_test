<!-- resources/views/layouts/dynamic-layout.blade.php -->
@php
    use Illuminate\Support\Facades\Blade;
@endphp
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title> @yield('title') </title>
</head>
<body>
    {{-- navbar --}}
    <div>
        <nav></nav>
        <footer></footer>
        {!! Blade::render($template->layout, ['content' => $template->content]) !!}
    </div>
</body>
</html>

{{-- @php
    $compiler = new Illuminate\View\Compilers\BladeCompiler(
        app('files'),
        app('config')->get('view.compiled')
    );
    echo $compiler->compileString($template->layout);
@endphp --}}
