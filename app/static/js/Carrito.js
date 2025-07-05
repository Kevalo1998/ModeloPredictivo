$(document).ready(function(){
    calcularTotal();
    RecuperarLsc();
    contador=Contar_productos();
  RecuperarLsc_compra();
    $(document).on('click','.agregar-carrito',(e)=>{
        
        const elemento=$(this)[0].activeElement.parentElement.parentElement.parentElement.parentElement;
        const id=$(elemento).attr('prodId');
        const nombre=$(elemento).attr('prodNombre');
        const concentracion=$(elemento).attr('prodConcentracion');
        const adicional=$(elemento).attr('prodAdicional');
        const precio=$(elemento).attr('prodPrecio');
        const laboratorio=$(elemento).attr('prodLaboratorio');
        const tipo=$(elemento).attr('prodTipo');
        const presentacion=$(elemento).attr('prodPresentacion');
        const avatar=$(elemento).attr('prodAvatar');
        const stock=$(elemento).attr('prodStock');
            const producto={
                id:id,
                nombre:nombre,  
                concentracion:concentracion,
                adicional:adicional,
                precio:precio,
                laboratorio:laboratorio,
                tipo:tipo,
                presentacion:presentacion,
                avatar:avatar,
                stock:stock,
                cantidad:1
            }
            let id_producto;
            let productos;
            productos=RecuperarLs();
            productos.forEach(prod=>{
                if (prod.id===producto.id) {
                    id_producto=prod.id;
                }
            });
            if (id_producto===producto.id) {
                Swal.fire({
                    icon:'error',
                    title:'Ooops..',
                    text:'doble',
                })
            } else {
                template=`
                <tr prodId="${producto.id}">
                    <td>${producto.id}</td>
                    <td>${producto.nombre}</td>
                    <td>${producto.concentracion}</td>
                    <td>${producto.adicional}</td>
                    <td>${producto.precio}</td>
                    <td><button class="borrar-producto btn btn-danger"><i class="fas fa-times-circle"></i></button></td>

                </tr>
            `;
            $('#lista').append(template);
            AgregarLS(producto);
            let contador;
            contador=Contar_productos();
            
            }
            
    })
    $(document).on('click','.borrar-producto',(e)=>{
        const elemento=$(this)[0].activeElement.parentElement.parentElement;
        const id=$(elemento).attr('prodId');
        elemento.remove();
        Eleminar_prod_ls(id);
        contador=Contar_productos();
       
        
    })
    $(document).on('click','.vaciar-carrito',(e)=>{
        $('#lista').empty();
        Eleminarls();
        contador=Contar_productos();
        
    })
    $(document).on('click','#procesar-pedido',(e)=>{
        procesar_pedido();
    })
    $(document).on('click','#procesar-compra',(e)=>{
        procesar_compra();
    })
    function RecuperarLs(){
        let productos;
        if(localStorage.getItem('productos')===null){
            productos=[];
        }
        else{
            productos=JSON.parse(localStorage.getItem('productos'))
        }
        return productos
    }
    function AgregarLS(producto){
        let productos;
        productos=RecuperarLs();
        productos.push(producto);
        localStorage.setItem('productos',JSON.stringify(productos))
    }
    function RecuperarLsc(){
        let productos,id_producto;
        productos=RecuperarLs();
        funcion="buscar_id";
        productos.forEach(producto =>{
            id_producto=producto.id;
            $.post('../controlador/ProductoController.php',{funcion,id_producto},(response)=>{
                let template_carrito='';
                let json=JSON.parse(response);
                template_carrito=`
                                <tr prodId="${json.id}">
                                    <td>${json.id}</td>
                                    <td>${json.nombre}</td>
                                    <td>${json.concentracion}</td>
                                    <td>${json.adicional}</td>
                                    <td>${json.precio}</td>
                                    <td><button class="borrar-producto btn btn-danger"><i class="fas fa-times-circle"></i></button></td>

                                </tr>
                `;
                $('#lista').append(template_carrito);   
            })
        });
    }
    function Eleminar_prod_ls(id) {
        let productos;
        productos=RecuperarLs();
        productos.forEach(function(producto,indice){
            if (producto.id===id) {
                productos.splice(indice,1);
            }
        });
        localStorage.setItem('productos',JSON.stringify(productos));
    }
    function Eleminarls(){
        localStorage.clear();
    }
    function Contar_productos(){
        let productos;
        let contador=0;
        productos=RecuperarLs();
        productos.forEach(producto=>{
            contador++;

        });
        return contador;
    }
    function procesar_pedido(){
        let productos;
        productos=RecuperarLs();
        if (productos.length===0) {
            Swal.fire({
                icon:'error',
                title:'Ooops..',
                text:'0 productos',

            })
        }
        else{
            location.href='../vista/adm_compra.php';
        }
    }
    function RecuperarLsc_compra(){
        let productos,id_producto;
        productos=RecuperarLs();
        funcion="buscar_id";
        productos.forEach(producto =>{
            id_producto=producto.id;
            $.post('../controlador/ProductoController.php',{funcion,id_producto},(response)=>{
                let template_compra='';
                let json=JSON.parse(response);
                template_compra=`
                                <tr prodId="${producto.id}" prodPrecio="${json.precio}">
                                <td>${json.nombre}</td>
                                <td>${json.stock}</td>
                                <td class="precio">${Number(json.precio).toFixed(2)}</td>
                                <td>${json.concentracion}</td>
                                <td>${json.adicional}</td>
                                <td>${json.laboratorio}</td>
                                <td>${json.presentacion}</td>
                                <td><input type="number" min="1" class="form-control cantidad_producto" value="${producto.cantidad}"></td>
                                <td class="subtotales"><h5>${(Number(json.precio) * Number(producto.cantidad)).toFixed(2)}</h5></td>
                                <td><button class="borrar-producto btn btn-danger"><i class="fas fa-times-circle"></i></button></td>
                            </tr>
                     `;
                $('#lista-compra').append(template_compra);   
            })
        });

        
    }
    $(document).on('click', '#actualizar',(e)=>{
        let productos, precios;
        precios=document.querySelectorAll('.precio');
        productos=RecuperarLs(); // Recupera productos del Local Storage
        productos.forEach(function (producto,indice) {
            producto.precio=precios[indice].textContent;
        });
        localStorage.setItem('productos', JSON.stringify(productos)); // Guarda los datos actualizados
        calcularTotal(); // Recalcula el total
    })
    $('#cp').keyup((e) => {
        let id, cantidad, producto, productos, montos, precio;
        producto = $(this)[0].activeElement.parentElement.parentElement;
        id = $(producto).attr('prodId');
        precio = $(producto).attr('prodPrecio');
        cantidad = producto.querySelector('input').value;
        montos = document.querySelectorAll('.subtotales');
        productos = RecuperarLs();
    
        productos.forEach(function (prod, indice) {
            if (prod.id === id) {
                prod.cantidad = cantidad;
                prod.precio = precio;
                montos[indice].innerHTML = `<h5>${cantidad*precio}</h5>`;
            }
        });
    
        localStorage.setItem('productos', JSON.stringify(productos));
        calcularTotal();
    });
    function calcularTotal() {
        let productos, subtotal, con_igv, total_sin_descuento, pago, vuelto, descuento;
        let total=0, igv = 0.18;
        productos = RecuperarLs(); // Recupera datos de Local Storage
    
        productos.forEach(producto => {
            let subtotal_producto = Number(producto.precio * producto.cantidad);
            total =total+ subtotal_producto;
        });
    
        pago = $('#pago').val();
        descuento = $('#descuento').val();
    
        total_sin_descuento = total.toFixed(2);
        con_igv = parseFloat(total *igv).toFixed(2);
        subtotal = parseFloat(total - con_igv).toFixed(2);
    
        total=total-descuento;
        vuelto = pago - total;
    
        $('#subtotal').html(subtotal);
        $('#con_igv').html(con_igv);
        $('#total_sin_descuento').html(total_sin_descuento);
        $('#total').html(total.toFixed(2));
        $('#vuelto').html(vuelto.toFixed(2));
    }
    function procesar_compra(){
        let nombre,dni;
        nombre=$('#cliente').val();
        dni=$("#dni").val();
        if (RecuperarLs().length==0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No hay productos, Selecciones algunos!',
            }).then(function(){
                location.href='../vista/adm_catalogo.php'
            })
        }
        else if(nombre==''){
            Swal.fire({
                icon: 'error',
                title: 'Oops.....',
                text: 'Necesitamos un nombre de clientel',
            })
        }
        else{
            Verificar_stock().then(error=>{
                
                if (error==0) {
                    Registrar_compra(nombre,dni);
                    
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se realizo la compra',
                        showConfirmButton: false,
                        timer: 1500
                    }).then(function(){
                        Eleminarls();
                        location.href='../vista/adm_catalogo.php'
                    })
                } else {
                    
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops.....',
                        text: 'Stock Insuficiente',
                    })
                }
            });

            
        }
    }
    async function Verificar_stock() {
        let productos;
        funcion='verificar_stock';
        productos=RecuperarLs();
        const response=await fetch('../controlador/ProductoController.php',{
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: 'funcion='+funcion+'&productos='+JSON.stringify(productos)
        })
        let error=await response.text();
        return error;
    }
    function Registrar_compra(nombre,dni){
        funcion='registrar_compra';
        let total=$('#total').get(0).textContent;
        let productos=RecuperarLs();
        let json=JSON.stringify(productos);
        $.post('../controlador/CompraController.php',{funcion,total,nombre,dni,json},(response)=>{
            
        })
    }
})