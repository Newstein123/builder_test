<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <style>
        .modal {
            --bs-modal-width : 80% !important;
        }
        .pulse {
        animation: pulse 1.5s infinite;
      }

      @keyframes pulse {
        0% {
          transform: scale(1);
          opacity: 1;
        }
        50% {
          transform: scale(1.01);
          opacity: 0.8;
        }
        100% {
          transform: scale(1);
          opacity: 1;
        }
      }

      .skeleton {
        background-color: grey;
        margin: 10px 0px;
        border-radius: 5px;
      }

      .skeleton-profile-img {
        height: 10em;
      }

      .skeleton-heading {
        height: 30px;
      }

      .skeleton-text {
        height: 20px;
      }

      .skeleton-button-lg {
        height: 3em;
        width: 10em;
      }
      .skeleton-button-md {
        height: 2.5em;
        width: 7em;
      }
      .skeleton-button-sm {
        height: 2em;
        width: 5em;
      }

      .selected {
        border: 2px solid blue;
      }
    </style>
</head>
<body>
    {!! $finalOutput !!}
    <div class="modal fade" id="cptModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel"> Choose Component  </h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary update-cpt-dsg">Save</button>
            </div>
          </div>
        </div>
      </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js" integrity="sha512-v2CJ7UaYy4JwqLDIrZUI/4hqeoQieOmAZNXBeQyjo21dadnwR+8ZaIJVT8EE2iyI61OV8e6M8PP2/4hpQINQ/g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script>
        $(document).ready(function() {
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            
            var cpt_name = "";
            var old_cpt_dsg_name = "";
            var section_name = "";
            var new_cpt_dsg_id = "";
            
            $(document).on('click', '.editable-cpt', function() {
                cpt_name = $(this).attr('data-t3-cpt');
                var cpt_dsg_class = $(`.component-${cpt_name}`)
                old_cpt_dsg_name = cpt_dsg_class.data('t3-cptdsg');
                section_name = $(this).attr('data-t3-sec')
                var url = "{{ route('component.cpt_dsgs.all') }}"
                var data = {
                    cpt_name : cpt_name,
                }
                $.ajax({
                    url : url,
                    method : 'get',
                    data : data,
                    success : function(res) {
                        if (res.success) {
                            $('#cptModal').modal('show');
                            var html = "<div class='row'>";
                            for (const key in res.data) {
                                if (res.data.hasOwnProperty(key)) {
                                    const element = res.data[key];
                                    html += `<div class='col-3 cpt-dsg-element' data-t3-cptDsg="${key}">${element}</div>`;
                                }
                            }
                            html += "</div>";
                            $('.modal-body').html(html);
                        }
                    },
                    error : function(err, xhr) {
                        console.log(err, xhr)
                    }
                })
            })

            $(document).on('click', '.cpt-dsg-element', function() {
                new_cpt_dsg_id = $(this).attr('data-t3-cptDsg');
                $(this).addClass('selected');
                $('.cpt-dsg-element').not(this).removeClass('selected');
            });

            $(document).on('click', '.update-cpt-dsg', function() {
                var website_id = "{{ request()->segment(2) }}";
                data = {
                    new_cpt_dsg_id,
                    section_name,
                    old_cpt_dsg_name,
                    website_id
                }
                var url = "{{ route('website.component-dsg.update') }}"
                $.ajax({
                    url : url,
                    method : 'post',
                    data : data,
                    success : function(res) {
                        if(res.success) {
                            $(`#t3_${section_name}`).html(res.data);
                            $('#cptModal').modal('hide');
                        }
                    },
                    error : function(err, xhr) {
                        console.log(err, xhr)
                    }
                })
            })
        })

        
    </script>
</body>
</html>