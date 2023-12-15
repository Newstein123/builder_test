@extends('layout.frontend')
@section('content')
    <div>
        <div class="d-flex justify-content-between">
            <div> All Products </div>
            <div> 
                <a href="{{route('product.create')}}" class="btn btn-primary"> Create Product  </a>
            </div>
        </div>
        <div class="my-10">
            <table class="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th> No </th>
                        <th> Product Name </th>
                        <th> Category  </th>
                        <th> Visibility  </th>
                        <th> Stock </th>
                        <th> Price </th>
                        <th> Action </th>
                    </tr>
                </thead>
                <tbody>
                    @forelse ($products as $product)
                        <tr>
                            <td> {{$product->id}} </td>
                            <td> {{$product->name}} </td>
                            {{-- <td> {{$product->category->name}} </td> --}}
                            <td> My Category  </td>
                            <td> {{$product->visibility}} </td>
                            <td> {{$product->stock}} </td>
                            <td> {{$product->price}} </td>
                            <td>
                                <a 
                                    class="btn btn-success"
                                    href="{{route('product.create', ["product_id" => $product->id])}}"> Edit  </a>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="100%" class="text-danger text-center"> No Data </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
@endsection