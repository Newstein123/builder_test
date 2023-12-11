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
                <h3> General Design Data </h3>
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

            {{-- Sections and Component Design Data  --}}
            <h3> Section Design Data </h3>
            <div class="d-flex align-items-start">
                {{-- Section Tab Starts  --}}
                <div class="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    @foreach ($website->sections as $key =>  $section)
                        <button 
                            class="nav-link {{$key == 0 ? "active" : ""}}" 
                            id="v-pills-home-tab" 
                            data-bs-toggle="pill" 
                            data-bs-target="#v-pills-home{{$key}}" 
                            type="button" role="tab" 
                            aria-controls="v-pills-home" 
                            aria-selected="true"
                        > 
                            {{$section->name}} 
                        </button>
                    @endforeach        
                </div>
                {{-- Section Tab Ends  --}}

                {{-- Section Tab Content Starts  --}}
                <div class="tab-content" id="v-pills-tabContent">
                    @foreach ($website->sections as $key =>  $section)
                    <div 
                        class="tab-pane fade show {{$key == 0 ? "active" : ""}}" 
                        id="v-pills-home{{$key}}" 
                        role="tabpanel" 
                        aria-labelledby="v-pills-home-tab" 
                        tabindex="0"
                    >
                        {{-- Section Data Starts --}}
                    <h3> {{$section->name}} </h3>
                    <div>
                        {{-- Section Fields  --}}
                        @foreach ($section->fields as $field)
                            @if ($field->data_type == "design")
                            <div>
                                <label for="{{$field->name}}"> {{$field->name}} </label>
                                <input 
                                    type="{{$field->type}}" 
                                    name="sections[{{$section->value}}][{{$field->value}}]" class="form-control my-3"
                                    value=""
                                >
                            </div>
                            @endif
                        @endforeach
                        {{-- Components  --}}
                        <h3> Components </h3>
                        @foreach ($section->component_designs as $cpt)
                            <h5> {{$cpt->component->name}} </h5>
                            @foreach ($cpt->component->fields as $var)
                                @if ($var->data_type == "design")
                                <div>
                                    <label for="{{$var->name}}"> {{$var->name}} </label>
                                    <input type="{{$var->type}}" name="components[{{$cpt->component->value}}][{{$var->value}}]" class="form-control my-3">
                                </div>
                                @endif
                            @endforeach
                        @endforeach
                    </div>
                    </div>
                        {{-- Section Data Ends  --}}
                    @endforeach
                </div>
                {{-- Section Tab Content Ends  --}}
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
                $('#fontFamilyInputs').html(html);
            })
        })
    </script>
@endsection