<!-- resources/views/your/view/name.blade.php -->

@extends('layout.website-layout', ['layout' => $template->layout])
@php
    $content = json_decode($template->content, true);
@endphp
@section('content')
    {{-- Hero Section  --}}
    @if (array_key_exists('hero', $content))
        {!! $content['hero'] !!}
    @endif
    @if (array_key_exists('about', $content))
        {!! $content['about'] !!}
    @endif
    @if (array_key_exists('service', $content))
        {!! $content['service'] !!}
    @endif
@endsection
