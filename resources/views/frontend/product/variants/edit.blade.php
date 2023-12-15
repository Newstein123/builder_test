@extends('layout.frontend')
@section('content')
    <div>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th> Image </th>
                    <th> Stock </th>
                    <th> Price </th>
                    <th> Variants </th>
                </tr>
            </thead>
            <tbody>
                @foreach ($product->variants as $var)
                    @php
                        $var_data = json_decode($var->data);
                        
                    @endphp
                    <tr>
                        <td>
                            @if ($var->image)
                            {{$var->image}}  
                            @else
                                <input type="file" name="image" id="" class="form-control w-25"> 
                            @endif
                        </td>
                        <td> {{$var->stock}} </td>
                        <td> {{$var->price}} </td>
                        <td> 
                            <ul>
                                @foreach ($var_data as $key => $item)
                                    <li> {{$key}} : {{$item}} </li>
                                @endforeach
                            </ul>
                        </td>
                        
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
@endsection


{{-- product variation modal  --}}
<form id="submitVariations">
    <div class="modal fade" id="editVariatants" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                    <h3> Product Variatant </h3>
                    <button type="button" id="addOption" class="btn btn-outline-dark"> Add Option </button>
                    <div id="variatantContainer">
                        <div class="row" id="variatantData">
                            <div class="col-md-4">
                                <label for="option"> Options </label>
                                <select name="var_data[0][option]" id="option" class="form-select my-3">
                                    <option value="color"> Color </option>
                                    <option value="size"> Size </option>
                                    <option value="material"> Material </option>
                                </select>
                            </div>
                            <div class="col-md-8">
                                <label for="variants" class="d-block"> Variatants </label>
                                <select id="variants" class="form-control select2 my-3 w-100" multiple="multiple" name="var_data[0][variants][]">
                                </select>
                            </div>
                        </div>
                    </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
    </div>
</form>