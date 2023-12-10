@php
    $fonts = [
    [
        'name' => "Merriweather",
        'family' => "serif",
    ],
    [
        'name' => "Noto Sans Myanmar",
        'family' => "sans-serif",
    ],
    [
        'name' => "Noto Serif Myanmar",
        'family' => "serif",
    ],
    [
        'name' => "Padauk",
        'family' => "sans-serif",
    ],
    [
        'name' => "Poppins",
        'family' => "sans-serif",
    ]
];

@endphp
@extends('layout.frontend')
@section('content')
    <div class="m-5">
        <form action="{{route('website.design.update', request()->segment(3))}}" method="POST">
            @csrf
            {{-- Color Pallet  --}}
            <div>
                <p> Color Pallet </p>
                <div>
                    <label for="color-pallet"> Primary Color  </label>
                    <input type="color" name="color_pallet[primary_color]" id="" class="form-control w-25 my-3">
                </div>
                <div>
                    <label for="color-pallet"> Secondary Color  </label>
                    <input type="color" name="color_pallet[secondary_color]" id="" class="form-control w-25 my-3">
                </div>
                <div>
                    <label for="color-pallet"> Accent Color  </label>
                    <input type="color" name="color_pallet[accent_color]" id="" class="form-control w-25 my-3">
                </div>
            </div>
            {{-- Font Style  --}}
            <div>
                <label for="font-style"> Font Style </label>
                <div class="d-flex justify-content-between my-3">
                    @foreach ($fonts as $font)
                    <div 
                        value="{{$font['name']}}" 
                        data-font-name="{{$font['name']}}"
                        data-font-family="{{$font['family']}}"
                        class="font-family border border-primary p-3"
                        style="cursor: pointer"
                    > 
                        {{$font['name']}} {{$font['family']}} 
                    </div>
                @endforeach
                <div id="fontFamilyInputs">
                    <input type="hidden" name="font[name]" value="{{$fonts[0]['name']}}">
                    <input type="hidden" name="font[family]" value="{{$fonts[0]['family']}}">
                </div>
                </div>
            </div>
            <button class="btn btn-primary" type="submit"> Save  </button>
        </form>
    </div>
@endsection

@section('script')
    <script>
        $(document).ready(function() {
            $('.font-family').on('click', function() {
                var fontNameInput = $(this).attr('data-font-name');
                var fontFamilyInput = $(this).attr('data-font-family');
                var html = `<input type="hidden" name="font[name]" value="${fontNameInput}">
                            <input type="hidden" name="font[family]" value="${fontFamilyInput}">
                            `
                console.log(html)
                $('#fontFamilyInputs').html(html);
            })
        })
    </script>
@endsection