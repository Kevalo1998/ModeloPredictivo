$(document).ready(function(){
    var funcion;   
    buscar_lote();  
    function buscar_lote(consulta){
        funcion="buscar";
        $.post('../controlador/LoteController.php',{consulta,funcion},(response)=>{
            const lotes=JSON.parse(response);
            let template=``;
            lotes.forEach(lote=>{
                template+=`
                <div loteId="${lote.id}" loteStock="${lote.stock}"class="col-12 col-sm-6 col-md-4 d-flex align-items-stretch flex-column">`;
                if (lote.estado=='light') {
                    template+=`<div class="card bg-light">`;    
                }
                if (lote.estado=='danger') {
                    template+=`<div class="card bg-danger">`;    
                }
                if (lote.estado=='warning') {
                    template+=`<div class="card bg-warning">`;    
                }
                template+=`<div class="card-header text-muted border-bottom-0">
                <h6>Codigo ${lote.id}</h6>
                    <i class="fas fa-lg fa-cubes mr-1"></i>${lote.stock}
                </div>
                <div class="card-body pt-0">
                  <div class="row">
                    <div class="col-7">
                      <h2 class="lead"><b>${lote.nombre}</b></h2>
                      <ul class="ml-4 mb-0 fa-ul">
                        <li class="small"><span class="fa-li"><i class="fas fa-lg fa-mortar-pestle"></i></span><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Concentracion: ${lote.concentracion}</font></font></li>
                        <li class="small"><span class="fa-li"><i class="fas fa-lg fa-prescription-bottle"></i></span><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Adicional: ${lote.adicional}</font></font></li>
                        <li class="small"><span class="fa-li"><i class="fas fa-lg fa-flask"></i></span><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Laboratorio: ${lote.laboratorio}</font></font></li>
                        <li class="small"><span class="fa-li"><i class="fas fa-lg fa-copyright"></i></span><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Tipo: ${lote.tipo}</font></font></li>
                        <li class="small"><span class="fa-li"><i class="fas fa-lg fa-pills"></i></span><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Presentacion: ${lote.presentacion}</font></font></li>
                        <li class="small"><span class="fa-li"><i class="fas fa-lg fa-calendar-times"></i></span><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Vencimiento: ${lote.vencimiento}</font></font></li>
                        <li class="small"><span class="fa-li"><i class="fas fa-lg fa-truck"></i></span><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Proveedor: ${lote.proveedor}</font></font></li>
                        <li class="small"><span class="fa-li"><i class="fas fa-lg fa-calendar-alt"></i></span><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Mes: ${lote.mes}</font></font></li>
                        <li class="small"><span class="fa-li"><i class="fas fa-lg fa-calendar-day"></i></span><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Dia: ${lote.dia}</font></font></li>
                      </ul>
                    </div>
                    <div class="col-5 text-center">
                      <img src="${lote.avatar}" alt="" class="img-circle img-fluid">
                    </div>
                  </div>
                </div>
                <div class="card-footer">
                  <div class="text-right">
                    <button  class="editarlot btn btn-sm btn-success"type="button"data-toggle="modal"data-target="#editarlote">
                      <i class="fas fa-pencil-alt"></i>
                    </button>
                    <button  class="borrarlote btn btn-sm btn-danger">
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
                `;
            });
            $('#lotes').html(template);
        });
    }
    $(document).on('keyup','#buscar-lote',function(){
        let valor=$(this).val();
        if (valor!="") {
            buscar_lote(valor);
        } else {
            buscar_lote();
        }

    });

    $(document).on('click','.editarlot',(e)=>{
        const elemento=$(this)[0].activeElement.parentElement.parentElement.parentElement.parentElement;
        const id=$(elemento).attr('loteId');
        const stock=$(elemento).attr('loteStock');
        $('#id_lote_prod_1').val(id);
        $('#stocked').val(stock);
        $('#codigo_lote').html(id);
  
    });

    $('#form-editar-lote').submit(e=>{
        let id=$('#id_lote_prod_1').val();
        let stock=$('#stocked').val();
        funcion='editarlote';
        $.post('../controlador/LoteController.php',{id,stock,funcion},(response)=>{
            if (response=='edit') {
                $('#edit-lote').hide('slow');
                $('#edit-lote').show(1000);
                $('#edit-lote').hide(2000);
                $('#id_lote_prod_1').trigger('reset');
                
            }
            buscar_lote();
        });
        e.preventDefault();
    });
    $(document).on('click','.borrarlote',(e)=> {
        funcion = "borrarlote"; 
        const elemento = $(this)[0].activeElement.parentElement.parentElement.parentElement.parentElement;
        const id = $(elemento).attr('loteId');
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: "btn btn-success",
              cancelButton: "btn btn-danger mr-1"
            },
            buttonsStyling: false
          });
          swalWithBootstrapButtons.fire({
            title: 'Eliminar el lote '+id+'?',
            text: 'Nose puede recuperar esto',
            icon:'warning',
            showCancelButton: true,
            confirmButtonText: '¡si, borra esto!',
            cancelButtonText: 'No, Cancelar', 
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
                $.post('../controlador/LoteController.php',{id,funcion},(response)=>{
                    if (response=='borrado') {
                        swalWithBootstrapButtons.fire(
                            'borrado!',
                            'El lote '+id+' fue borrado',
                            'success'
                        )
                        buscar_lote();
                    } 
                    else {
                        swalWithBootstrapButtons.fire(
                            'No se puede borrar!',
                            'El lote '+id+' no puede ser borrado, hay lotes con el producto',
                            'error'
                        )
                         
                    }
                })
            } else if (
            result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire({
                title: 'Cancelado',
                text: 'El lote '+id+' no fue borrado',
                icon: 'error'
              });
            }
          });   
    })

    
})