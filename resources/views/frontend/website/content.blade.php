@extends('layout.frontend')
@section('content')
    <div class="row m-5">
        <div class="col-3">
            this is side bar 
        </div>
        <div class="col-9">
            @foreach ($website->template->sections as $section)
                <h3> {{$section->name}} </h3>
                <div>
                    @foreach ($section->fields as $field)
                        <div>
                            <label for="{{$field->name}}"> {{$field->name}} </label>
                            <input type="{{$field->type}}" name="{{$field->value}}" class="form-control my-3">
                        </div>
                    @endforeach

                    <h3> Components </h3>
                    @foreach ($section->component_designs as $cpt)
                        <div class="d-flex justify-content-between">
                            <h5> {{$cpt->component->name}} </h5>
                            @if ($cpt->component->loopable) 
                                <button class="btn btn-primary btn-sm" 
                                    data-max_no_loop="{{$cpt->component->max_no_loop}}" 
                                    data-id={{$cpt->id}}
                                    data-name={{$cpt->component->name}}
                                > Add New {{$cpt->component->name}} </button>
                            @endif
                        </div>

                        @if ($cpt->component->loopable)
                            <ul class="nav nav-tabs" id="myTab{{$cpt->id}}" role="tablist">
                                <li class="nav-item" role="presentation">
                                <button class="{{$cpt->id}}section-nav-link nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane{{$cpt->id}}" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true"> {{$cpt->component->name}}-1 </button>
                                </li>
                            </ul>
                            <div class="tab-content my-3" id="myTabContent{{$cpt->id}}">
                                <div class="{{$cpt->id}}section-tab-pane  tab-pane fade show active" id="home-tab-pane{{$cpt->id}}" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
                                    @foreach ($cpt->component->variables as $var)
                                        <div>
                                            <label for="{{$var->name}}"> {{$var->name}} </label>
                                            <input type="{{$var->type}}" name="{{$var->value}}" class="form-control my-3">
                                        </div>
                                    @endforeach
                                </div>
                            </div>
                        @else
                            @foreach ($cpt->component->variables as $var)
                                <div>
                                    <label for="{{$var->name}}"> {{$var->name}} </label>
                                    <input type="{{$var->type}}" name="{{$var->value}}" class="form-control my-3">
                                </div>
                            @endforeach
                        @endif
                    @endforeach
                </div>
            @endforeach
        </div>
    </div>
@endsection

@section('script')
    <script>
        $(document).ready(function() {
            // Add New Button Click Event
            $('.btn-primary').on('click', function() {
                var max_loop = $(this).attr('data-max_no_loop')
                var id = $(this).attr('data-id');
                var name = $(this).attr('data-name');
                var no_of_items = $(`.${id}section-nav-link`).length;

                if(no_of_items >= max_loop) {
                    return false
                }

                // Remove old active class 
                $(`.${id}section-nav-link`).removeClass('active');
                $(`.${id}section-tab-pane`).removeClass('active');

                var tabContentId = '#myTabContent' + id;
                var tabId = '#myTab' + id;

                var newTabContent = $(tabContentId).find('.tab-pane:first').clone();
                var newTab = $(tabId).find('.nav-item:first').clone();
                newTab.find('button').addClass('active');
                // Add Navbar Name 
                var newName = name + '-' + (no_of_items + 1)
                newTab.find('button').html(newName )
                newTabContent.filter('.tab-pane').addClass('active show');

                // Update the ID and make it unique
                var newId = new Date().getTime(); // Using a timestamp for a unique ID
                var targetId = 'home-tab-pane' + newId;

                newTab.find('button').attr('data-bs-target', '#' + targetId);
                newTabContent.attr('id', targetId);

                // Update input names to make them unique
                newTabContent.find('input').each(function() {
                    var currentName = $(this).attr('name');
                    var newName = currentName + '-new';
                    $(this).attr('name', newName);
                });

                // Append the cloned tab-pane to tab-content
                $(tabContentId).append(newTabContent);
                $(tabId).append(newTab);
            });
        });

    </script>
@endsection