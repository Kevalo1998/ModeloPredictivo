$(document).ready(function(){
    var tipo_usuario=$('#tipo_usuario').val();
    var funcion;
    var edit=false; 
    $('.select2').select2();
    rellenar_laboratorios();
    rellenar_tipos();
    rellenar_presentaciones();
    buscar_producto();
    rellenar_proveedores();
    if (tipo_usuario==3||tipo_usuario==4||tipo_usuario==2) {
        $('#bcp').hide();
    }
    function rellenar_proveedores() {
        funcion="rellenar_proveedores";
        $.post('../controlador/ProveedorController.php',{funcion},(response)=>{
            const proveedores=JSON.parse(response);
            let template='';
            proveedores.forEach(proveedor=>{
                template+=`
                    <option value="${proveedor.id}">${proveedor.nombre}</option>
                `;
            });
            $('#proveedor').html(template);
        })
    }
    function rellenar_laboratorios() {
        funcion="rellenar_laboratorios";
        $.post('../controlador/LaboratorioController.php',{funcion},(response)=>{
            const laboratorios=JSON.parse(response);
            let template='';
            laboratorios.forEach(laboratorio=>{
                template+=`
                    <option value="${laboratorio.id}">${laboratorio.nombre}</option>
                `;
            });
            $('#modal_laboratorio').html(template);
        })
    }
    
    function rellenar_tipos() {
        funcion="rellenar_tipos";
        $.post('../controlador/TipoController.php',{funcion},(response)=>{
            const tipos=JSON.parse(response);
            let template='';
            tipos.forEach(tipo=>{
                template+=`
                    <option value="${tipo.id}">${tipo.nombre}</option>
                `;
            });
            $('#modal_tipo').html(template);
        })
    }

    function rellenar_presentaciones() {
        funcion="rellenar_presentaciones";
        $.post('../controlador/PresentacionController.php',{funcion},(response)=>{
            const presentaciones=JSON.parse(response);
            let template='';
            presentaciones.forEach(presentacion=>{
                template+=`
                    <option value="${presentacion.id}">${presentacion.nombre}</option>
                `;
            });
            $('#modal_presentacion').html(template);
        })
    }
    $('#form-crear-producto').submit(e=>{
        let id=$('#id_edit_prod').val();
        let nombre=$('#nombre_producto').val();
        let concentracion=$('#concentracion').val();
        let adicional=$('#adicional').val();
        let precio=$('#precio').val();
        let laboratorio=$('#modal_laboratorio').val();
        let tipo=$('#modal_tipo').val();
        let presentacion=$('#modal_presentacion').val();
        if (edit==true){
            funcion="editar";
        }else{
            funcion="crear";
        }
        $.post('../controlador/ProductoController.php',{funcion,id,nombre,concentracion,adicional,precio,laboratorio,tipo,presentacion},(response)=>{
            
            if (response=='add') {
                $('#add').hide('slow');
                $('#add').show(1000);
                $('#add').hide(2000);
                $('#form-crear-producto').trigger('reset');
                buscar_producto();
            } 
            else if (response=='edit'){
                $('#edit_prod').hide('slow');
                $('#edit_prod').show(1000);
                $('#edit_prod').hide(2000);
                $('#form-crear-producto').trigger('reset');
                buscar_producto();    
            }
            else{
                $('#noadd').hide('slow');
                $('#noadd').show(1000);
                $('#noadd').hide(2000);
                $('#form-crear-producto').trigger('reset');
            }
        });
        e.preventDefault();
    });
    function buscar_producto(consulta){
        funcion="buscar";
        $.post('../controlador/ProductoController.php',{consulta,funcion},(response)=>{
            const productos=JSON.parse(response);
            let template=``;
            productos.forEach(producto=>{
                template+=`
                <div prodId="${producto.id}"prodNombre="${producto.nombre}"prodPrecio="${producto.precio}"prodConcentracion="${producto.concentracion}"prodAdicional="${producto.adicional}"prodLaboratorio="${producto.laboratorio_id}" prodTipo="${producto.tipo_id}" prodPresentacion="${producto.presentacion_id}" prodAvatar="${producto.avatar}" class="col-12 col-sm-6 col-md-4 d-flex align-items-stretch flex-column">
              <div class="card bg-light d-flex flex-fill">
                <div class="card-header text-muted border-bottom-0">
                    <i class="fas fa-lg fa-cubes mr-1"></i>${producto.stock}
                </div>
                <div class="card-body pt-0">
                  <div class="row">
                    <div class="col-7">
                      <h2 class="lead"><b>${producto.nombre}</b></h2>
                      <h4 class="lead"><b><i class="fas fa-lg fa-money-bill-1 mr-1"></i>${producto.precio}</b></h4>
                      <ul class="ml-4 mb-0 fa-ul text-muted">
                        <li class="small"><span class="fa-li"><i class="fas fa-lg fa-mortar-pestle"></i></span><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Concentracion: ${producto.concentracion}</font></font></li>
                        <li class="small"><span class="fa-li"><i class="fas fa-lg fa-prescription-bottle"></i></span><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Adicional: ${producto.adicional}</font></font></li>
                        <li class="small"><span class="fa-li"><i class="fas fa-lg fa-flask"></i></span><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Laboratorio: ${producto.laboratorio}</font></font></li>
                        <li class="small"><span class="fa-li"><i class="fas fa-lg fa-copyright"></i></span><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Tipo: ${producto.tipo}</font></font></li>
                        <li class="small"><span class="fa-li"><i class="fas fa-lg fa-pills"></i></span><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Presentacion: ${producto.presentacion}</font></font></li>
                      </ul>
                    </div>
                    <div class="col-5 text-center">
                      <img src="${producto.avatar}" alt="avatar de usuario" class="img-circle img-fluid">
                    </div>
                  </div>
                </div>
                <div class="card-footer">
                  <div class="text-right">`;
                  if (tipo_usuario == 1) {
                    template += `
                        <button class="avatar btn btn-sm bg-teal" type="button" data-toggle="modal" data-target="#cambiologoip">
                            <i class="fas fa-image"></i>
                        </button>
                        <button class="editar btn btn-sm btn-success" type="button" data-toggle="modal" data-target="#crearproducto">
                            <i class="fas fa-pencil-alt"></i>
                        </button>
                        <button class="lote btn btn-sm btn-primary" type="button" data-toggle="modal" data-target="#crearlote">
                            <i class="fas fa-plus-square"></i>
                        </button>
                        <button class="borrarip btn btn-sm btn-danger">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    `;
                }
                template+=`
                  </div>
                </div>
              </div>
            </div>
                `;
            });
            $('#productos').html(template);
        });
    }
    $(document).on('keyup','#buscar-producto',function(){
        let valor=$(this).val();
        if (valor!="") {
            buscar_producto(valor);
        } else {
            buscar_producto();
        }

    });

    $(document).on('click','.avatar',(e)=>{
        funcion="cambiar_avatar";
        const elemento=$(this)[0].activeElement.parentElement.parentElement.parentElement.parentElement;
        const id=$(elemento).attr('prodId');
        const avatar=$(elemento).attr('prodAvatar');
        const nombre=$(elemento).attr('prodNombre');
        $('#funcionip').val(funcion);
        $('#id_logo_prod').val(id);
        $('#avatarip').val(avatar);
        $('#logoactual_ip').attr('src',avatar);
        $('#nombre_logoip').html(nombre);

    });
    $(document).on('click','.lote',(e)=>{
        const elemento=$(this)[0].activeElement.parentElement.parentElement.parentElement.parentElement;
        const id=$(elemento).attr('prodId');
        const nombre=$(elemento).attr('prodNombre');
        $('#id_lote_prod').val(id);
        $('#nombre_producto_lote').html(nombre);
    });

    $('#form-logo-ip').submit(e=>{
        let formData=new FormData($('#form-logo-ip')[0]);
        $.ajax({
            url:'../controlador/ProductoController.php',
            type:'POST',
            data:formData,
            cache:false,
            processData:false,
            contentType:false
        }).done(function(response){
            
            const json=JSON.parse(response);
            if(json.alert=='edit'){
                $('#logoactual_ip').attr('src',json.ruta);
                $('#editip').hide('slow');
                $('#editip').show(1000);
                $('#editip').hide(2000);
                $('#form-logo-ip').trigger('reset');
                buscar_producto();
            }
            if(json.alert=='noedit'){
                $('#noeditip').hide('slow');
                $('#noeditip').show(1000);
                $('#noeditip').hide(2000);
                $('#form-logo-ip').trigger('reset');  
            }
        })
        e.preventDefault();
    });

    $(document).on('click','.editar',(e)=>{
        const elemento=$(this)[0].activeElement.parentElement.parentElement.parentElement.parentElement;
        const id=$(elemento).attr('prodId');
        const nombre=$(elemento).attr('prodNombre');
        const concentracion=$(elemento).attr('prodConcentracion');
        const adicional=$(elemento).attr('prodAdicional');
        const precio=$(elemento).attr('prodPrecio');
        const laboratorio=$(elemento).attr('prodLaboratorio');
        const tipo=$(elemento).attr('prodTipo');
        const presentacion=$(elemento).attr('prodPresentacion');
        $('#id_edit_prod').val(id);
        $('#nombre_producto').val(nombre);
        $('#concentracion').val(concentracion);
        $('#adicional').val(adicional);
        $('#precio').val(precio);
        $('#modal_laboratorio').val(laboratorio).trigger('change');
        $('#modal_tipo').val(tipo).trigger('change');
        $('#modal_presentacion').val(presentacion).trigger('change');
        edit=true;
    });
    $(document).on('click','.borrarip',(e)=> {
        funcion = "borrarip"; 
        const elemento = $(this)[0].activeElement.parentElement.parentElement.parentElement.parentElement;
        const id = $(elemento).attr('prodId');
        const nombre = $(elemento).attr('prodNombre'); 
        const avatar = $(elemento).attr('prodAvatar');
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: "btn btn-success",
              cancelButton: "btn btn-danger mr-1"
            },
            buttonsStyling: false
          });
          swalWithBootstrapButtons.fire({
            title: 'Eliminar '+nombre+'?',
            text: 'Nose puede recuperar esto',
            imageUrl:''+avatar+'',
            imagenWigth:100,
            imagenHeigth:100,
            showCancelButton: true,
            confirmButtonText: '¡si, borra esto!',
            cancelButtonText: 'No, Cancelar', 
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
                $.post('../controlador/ProductoController.php',{id,funcion},(response)=>{
                    
                    edit=false;  
                    if (response=='borrado') {
                        swalWithBootstrapButtons.fire(
                            'borrado!',
                            'El producto '+nombre+' fue borrado',
                            'success'
                        )
                        buscar_producto();
                    } 
                    else {
                        swalWithBootstrapButtons.fire(
                            'No se puede borrar!',
                            'El producto '+nombre+' no puede ser borrado, hay lotes con el producto',
                            'error'
                        )
                         
                    }
                })
            } else if (
            result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire({
                title: 'Cancelado',
                text: 'El producto '+nombre+' no fue borrado',
                icon: 'error'
              });
            }
          });   
    })
    $('#form-crear-lote').submit(e=>{
        let id_producto=$('#id_lote_prod').val();
        let proveedor=$('#proveedor').val();
        let stock=$('#stock').val();
        let vencimiento=$('#vencimiento').val();
        funcion='crearlote';
        $.post('../controlador/LoteController.php',{funcion,vencimiento,stock,proveedor,id_producto},(response)=>{
            
            $('#add-lote').hide('slow');
            $('#add-lote').show(1000);
            $('#add-lote').hide(2000);
            $('#form-crear-lote').trigger('reset');
            buscar_producto();
        });
        e.preventDefault();

    });
})