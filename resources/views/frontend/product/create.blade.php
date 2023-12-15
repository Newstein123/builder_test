@extends('layout.frontend')
@php
   $variants = $product->variants;
@endphp
@section('content')
<form action="{{route('product.store')}}" method="POST">
    @csrf
    <input type="hidden" name="product_id" value="{{$product->id}}">
    <div class="row position-relative my-3">
        <div class="col-md-3">
            <ul class="list-group position-sticky top-0">
                <li class="list-group-item" aria-current="true">
                    <a href="#details" class="btn-link"> Details </a>
                </li>
                <li class="list-group-item">
                    <a href="#images" class="btn-link"> Images </a>
                </li>
                <li class="list-group-item">
                    <a href="#inventory" class="btn-link"> Inventory </a>
                </li>
                <li class="list-group-item">
                    <a href="#organization" class="btn-link"> Organization </a>
                </li>
                <li class="list-group-item">
                    <a href="#sellingTools" class="btn-link"> Selling Tools </a>
                </li>
                <li class="list-group-item">
                    <a href="#marketing" class="btn-link"> Marketing </a>
                </li>
              </ul>
        </div>
        <div class="col-md-9">
            <div class="d-flex justify-content-between position-sticky top-0 bg-dark p-3">
                <div> 
                    <button type="button" class="btn btn-danger"> Back </button>
                </div>
                <div>
                    <button type="submit" class="btn btn-dark"> Save </button>
                </div>
            </div>
            {{-- details  --}}
            <div id="details">
                {{-- name  --}}
                <div>
                    <label for="name"> Name </label>
                    <input name="name" value="{{$product->name}}" type="text" class="form-control my-3">
                </div>
                {{-- description  --}}
                <div>
                    <label for="description"> Description  </label>
                    <textarea name="description" id="" cols="10" rows="5" class="form-control my-3" placeholder="Enter Description">{{$product->description}}</textarea>
                </div>
                
                {{-- Details info  --}}
                <div>
                    <label for="details_info"> Details Information </label>
                    <div id="summernote" class="my-3" name="details_info"></div>
                </div>
            </div>
            {{-- images --}}
            <div id="images">
                {{-- Images  --}}
                <div>
                    <label for="images"> Images </label>
                    <input type="file" name="images" id="" class="form-control my-3" multiple>
                </div>
            </div>
            {{-- inventory  --}}
            <div id="inventory">
                {{-- price                  --}}
                <div>
                    <label for="price"> Price </label>
                    <input type="number" name="price" id="" value="{{$product->price}}" class="form-control my-3">
                </div>
                {{-- onsale price  --}}
                <div>
                    <input type="checkbox" name="on_sale_on" id="showOnSale" class="me-3">
                    <label for="showOnSale"> OnSale </label>
                </div>
                <div>
                    <label for="onslae"> On Sale Price </label>
                    <input type="number" name="sale_price" id="" class="form-control my-3" value="0">
                </div>
                {{-- stock  --}}
                <div>
                    <input type="checkbox" name="on_sale_on" id="showOnSale" class="me-3">
                    <label for="showStock"> Unlimitted Stock </label>
                </div>
                <div>
                    <label for="stock"> Stock </label>
                    <input type="number" name="stock" id="" class="form-control my-3">
                </div>
                @if (count($variants) < 1)
                    <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#addVariatants"> Add Variatants </button>
                @else
                    <button type="button" class="btn btn-success"> 
                        <a href="{{route('product-variations.edit', $product->id)}}"> Edit Variants  </a>
                    </button>
                @endif
            </div>
            {{-- organization  --}}
            <div id="organization" class="my-3">
                {{-- category  --}}
                <div>
                    <label for="category" class="me-3"> Category </label>
                    <button class="btn btn-dark"> Add </button>
                </div>
                {{-- tags  --}}
                <div>
                    <label for="tags"> Tags </label>
                    <select class="form-control select2 my-3"  name="tags[]" multiple>
                        @if ($product->tags)
                            @foreach (json_decode($product->tags) as $tag)
                                <option value="{{$tag}}"> {{$tag}} </option>
                            @endforeach
                        @endif
                    </select>
                </div>
            </div>
            {{-- selling tools  --}}
            <div id="sellingTools">
                {{-- featured products  --}}
                <div>
                    <input type="checkbox" name="featured" id="featured" class="my-3 me-3">
                    <label for="featured">Featured</label>
                </div>
            </div>
        </div>
    </div>

</form>

    {{-- product variation modal  --}}
    @include('frontend.product.variants.create')
@endsection
@section('script')
    <script>
        $(document).ready(function() {
            // functionShowField(e, name, id) {
            //     $('name').toggleClass('class')
            // }
            // 
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
        
            $('#submitVariations').on('submit', function(e) {
                
                e.preventDefault();
                var formData = new FormData(this);
                var url = "{{ route('product-variations.store') }}"
                $.ajax({
                    url : url,
                    data : formData,
                    method : 'post',
                    contentType : false,
                    processData : false,
                    success : function (res) {
                        if(res.success) {
                            $('#addVariatants').modal('hide')
                        }
                    },
                    error : function (err, xhr) {
                        console.log(err, xhr)
                    }
                })
            })

             // Counter to generate unique IDs for cloned rows
            var counter = 1;
            function initializeSelect2(row) {
                row.find('.select2').select2({
                    tags: true,
                    tokenSeparators: [',', ' ']
                });
            }
            // Add Option button click event
            $('#addOption').on('click', function() {
                // Clone the variatantData row
                var clonedRow = $('#variatantData').clone();

                // Update IDs and names to make them unique
                clonedRow.attr('id', 'variatantData' + counter);
                clonedRow.find('select[name="var_data[0][option]"]').attr('name', 'var_data[' + counter + '][option]');
                clonedRow.find('select[name="var_data[0][variants][]"]').attr('name', 'var_data[' + counter + '][variants][]');

                // Append the cloned row to variatantContainer
                initializeSelect2(clonedRow)
                $('#variatantContainer').append(clonedRow);
                // Increment the counter for the next row
                counter++;
            });
        })
    </script>
@endsection