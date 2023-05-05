//DECLARACIÓN DE VARIABLES Y FUNCIONES

fetch("./productos.json")
    .then(response => response.json())
    .then(productos => {
        renderizarProductos(productos)
        buscarProducto(productos)
        renderizarCarrito(carritoContenedor, productos)
        buscador.addEventListener("input",() => buscarProducto(productos))
        for (const categoria of categorias) {
            categoria.addEventListener("click",() => filtrarCategoria(productos))
        }
        quitarFiltros.addEventListener("click",() => quitarAllFiltros(productos))
        aplicarPrecioRango.addEventListener("click",() => aplicarRangos(productos))
        
    })

//VARIABLES PRINCIPALMENTE OBTENIDAS DEL DOM    
let contenedorProductos = document.getElementById("contenedorProductos")

let buscador = document.getElementById("buscador")

let categorias = document.getElementsByClassName("categorias")

let rangoMinimo = document.getElementById("inputMin"), rangoMaximo = document.getElementById("inputMax"), aplicarPrecioRango = document.getElementById("aplicarPrecios")

let quitarFiltros = document.getElementById("quitarFiltros")

let carritoContenedor = JSON.parse(localStorage.getItem("carrito")) ?JSON.parse(localStorage.getItem("carrito")):[]

let productosAgregados = document.getElementById("productosAgregados")

let logoPrincipal = document.getElementById("logoPrincipal"),carritoLogo = document.getElementById("carritoLogo")

let mostrador = document.getElementById("mostrador"), carritoHTML = document.getElementById("carrito"), filtrador = document.getElementById("filtrador")

let costoTotalDOM = document.getElementById("costoTotal")

let codigoAplicado = ""

let resumen = document.getElementById("resumenDeCompra")
let contenedorDeInfo = document.getElementById("informacionDeCompra")
let regresarInfo = document.getElementById("regresoInfo")

//ESPACIO PARA EL CAMBIO DE NAVEGACIÓN EN LA PÁGINA
regresarInfo.addEventListener("click", () => {
    mostrador.classList.remove("quitar")
    filtrador.classList.remove("quitar")
    carritoHTML.classList.add("quitar")
    resumen.classList.add("quitar")

    contenedorDeInfo.innerHTML = ""
}) 
logoPrincipal.addEventListener("click",() =>{
    mostrador.classList.remove("quitar")
    carritoHTML.classList.add("quitar")
    filtrador.classList.remove("quitar")
    resumen.classList.add("quitar")

    contenedorDeInfo.innerHTML = ""
})
carritoLogo.addEventListener("click",() =>{
    mostrador.classList.toggle("quitar")
    carritoHTML.classList.toggle("quitar")
    filtrador.classList.toggle("quitar")
    resumen.classList.add("quitar")

    contenedorDeInfo.innerHTML = ""
})

let finalizarCompra = document.getElementById("finalizarCompra")
//


//EJECUCIÓN DEL RENDERIZADO DE PRODUCTOS EN EL DOM
function renderizarProductos(arrayDeProductos){
    contenedorProductos.innerHTML = ""
    
    arrayDeProductos.forEach(({id,nombre,categoria,precio,stock,img}) => {
        let tarjeta = document.createElement("div")
        tarjeta.className = "tarjetas"
        tarjeta.innerHTML = `
            <p id="nombres"><b>${nombre}</b></p>
            <img style="display: block" src="${img}">
            <p>Categoría: ${categoria}</p>
            <p>${precio}$</p>
            <p id="stock${id}" class="stock">Stock: ${stock}</p>
            <button id="${id}" class="botones">AGREGAR AL CARRITO</button>
        `

        if (stock==0) {
            tarjeta.classList.add("noDisponible")
        }
        
        contenedorProductos.append(tarjeta)
        
        
    });
    let botonesCarrito = document.getElementsByClassName("botones")
    for (const boton of botonesCarrito) {
        boton.addEventListener("click", (e) => agregarAlCarrito(e, arrayDeProductos))
    }

}


//FUNCIONES ENCARGADAS DE LA GESTIÓN DEL CARRITO
function agregarAlCarrito(e, productos){
    let productoBuscado = productos.find(producto => producto.id == e.target.id)
    let indiceProducto = productos.findIndex(producto => producto.id == e.target.id)

    if(productos[indiceProducto].stock>0){
            if(carritoContenedor.some(producto => producto.id == e.target.id )){
            let indiceCarrito = carritoContenedor.findIndex(producto => producto.id == e.target.id)
            productos[indiceProducto].stock--

            carritoContenedor[indiceCarrito].unidades++
            carritoContenedor[indiceCarrito].precioTotal = carritoContenedor[indiceCarrito].unidades * carritoContenedor[indiceCarrito].precio 

            tostadita("Producto agregado", "#0B8E00","#14FF00")
        }else{
            productos[indiceProducto].stock--
            carritoContenedor.push({
                id: productoBuscado.id,
                img : productoBuscado.img,
                precio : productoBuscado.precio,
                precioTotal: productoBuscado.precio,
                nombre: productoBuscado.nombre,
                unidades: 1 
            })
            tostadita("Producto agregado", "#0B8E00","#14FF00")
        }
    }else{
        tostadita("No hay stock disponible:(","#FF2D00","#950000")
    }
    
    let stockDeTarjetas = document.getElementsByClassName("stock")
    for (let stocks of stockDeTarjetas) {
        if(stocks.id.slice(5) == e.target.id){
            stocks.innerText=`Stock: ${productos[indiceProducto].stock}`
        }
    }
    
    let tarjetasHaOcultar = document.getElementsByClassName("tarjetas")
    for (let tarjetas of tarjetasHaOcultar) {
    
        if(tarjetas.children[4].innerText.slice(7) == 0){
            tarjetas.classList.add("noDisponible")
        }
    }
    


    let costoTotal = carritoContenedor.reduce((total,productoDelCarrito) => total + productoDelCarrito.precioTotal ,0)

    costoTotalDOM.innerText = costoTotal + "$"


    localStorage.setItem("carrito",JSON.stringify(carritoContenedor))
    renderizarCarrito(carritoContenedor, productos)
}

function renderizarCarrito(arrayCarrito, productos) {
    productosAgregados.innerHTML = ""    

    arrayCarrito.forEach(({id,img,precio,precioTotal,nombre,unidades}) => {
        let tarjetaProducto = document.createElement("div")
        tarjetaProducto.className = "tarjetaCarrito"

        tarjetaProducto.innerHTML = `
        <img src="${img}"></img>
        <p>${nombre}</p>
        <p>Precio: ${precio}$</p>
        <div class="subTarjetaCarrito">
        <button class="botonesCarrito"><img src="../data/minus.svg" style="width:inherit; height:inherit;" id="minus${id}"></button>
        <p style="margin:10px;">Unidades: ${unidades}</p>
        <button class="botonesCarrito"><img src="../data/plus.svg" style="width:inherit; height:inherit;" id="plus${id}"></button>
        </div>
        <p>Total:${precioTotal}$</p>
        <button  class="botonesDelete"><img src="../data/delete-1487-svgrepo-com.svg" style="width:50px; height:50px;" id="${id}"></button>
        `


        productosAgregados.append(tarjetaProducto)
    })

    let botonesDelete = document.getElementsByClassName("botonesDelete")
    for (const botones of botonesDelete) {
        botones.addEventListener("click", (e) => quitarDelCarrito(e, productos))
    }

    let plusAndMinus = document.getElementsByClassName("botonesCarrito")
    
    if(carritoContenedor.length > 0){
        plusAndMinus[1].addEventListener("click",(e) => plusClick(e,productos))
        plusAndMinus[0].addEventListener("click",(e) => minusClick(e,productos))
    }
}

function quitarDelCarrito(e, productos) {
    let indice = carritoContenedor.findIndex(producto => producto.id == e.target.id)
    let indiceEnProductos = productos.findIndex(producto => producto.id == e.target.id)
    

    productos[indiceEnProductos].stock += carritoContenedor[indice].unidades


    costoTotalDOM.innerText = (Number(costoTotalDOM.innerText) - Number(carritoContenedor[indice].precioTotal)) + "$"

    carritoContenedor.splice(indice,1)

    tostadita("Producto borrado","#FF2D00","#950000")
    renderizarProductos(productos)
    renderizarCarrito(carritoContenedor, productos)
    localStorage.setItem("carrito",JSON.stringify(carritoContenedor))
}
//

//Funcionalidad de los botones de incremento y decremento de unidades en el carrito
function plusClick(e, productos){
    let indiceProducto = productos.findIndex(producto => producto.id == e.target.id.slice(4))

    if(productos[indiceProducto].stock>0){
            
        let indiceCarrito = carritoContenedor.findIndex(producto => producto.id == e.target.id.slice(4))
        productos[indiceProducto].stock--

        carritoContenedor[indiceCarrito].unidades++
        carritoContenedor[indiceCarrito].precioTotal = carritoContenedor[indiceCarrito].unidades * carritoContenedor[indiceCarrito].precio 

            tostadita("Producto sumado", "#0B8E00","#14FF00")
    }else{
        tostadita("No hay stock disponible:(","#FF2D00","#950000")
    }
    
    let stockDeTarjetas = document.getElementsByClassName("stock")
    for (let stocks of stockDeTarjetas) {
        if(stocks.id.slice(5) == e.target.id.slice(4)){
            stocks.innerText=`Stock: ${productos[indiceProducto].stock}`
        }
    }
    
    let tarjetasHaOcultar = document.getElementsByClassName("tarjetas")
    for (let tarjetas of tarjetasHaOcultar) {
    
        if(tarjetas.children[4].innerText.slice(7) == 0){
            tarjetas.classList.add("noDisponible")
        }
    }
    


    let costoTotal = carritoContenedor.reduce((total,productoDelCarrito) => total + productoDelCarrito.precioTotal ,0)

    costoTotalDOM.innerText = costoTotal + "$"


    localStorage.setItem("carrito",JSON.stringify(carritoContenedor))
    renderizarCarrito(carritoContenedor, productos)
}

function minusClick(e, productos){
    let productoEnCarrito = carritoContenedor.findIndex(producto => producto.id == e.target.id.slice(5))
    let indiceProducto = productos.findIndex(producto => producto.id == e.target.id.slice(5))

    if(carritoContenedor[productoEnCarrito].unidades > 1){
            
        let indiceCarrito = carritoContenedor.findIndex(producto => producto.id == e.target.id.slice(5))
        productos[indiceProducto].stock++

        carritoContenedor[productoEnCarrito].unidades--
        carritoContenedor[productoEnCarrito].precioTotal = carritoContenedor[indiceCarrito].unidades * carritoContenedor[productoEnCarrito].precio 

            tostadita("Producto restado", "#0B8E00","#14FF00")
    }else if(carritoContenedor[productoEnCarrito].unidades == 1){

        productos[indiceProducto].stock += carritoContenedor[productoEnCarrito].unidades


        costoTotalDOM.innerText = Number(costoTotalDOM.innerText) - Number(carritoContenedor[productoEnCarrito].precioTotal)
    
        carritoContenedor.splice(productoEnCarrito,1)

        tostadita("Producto borrado","#FF2D00","#950000")
    }
    
    let stockDeTarjetas = document.getElementsByClassName("stock")
    for (let stocks of stockDeTarjetas) {
        if(stocks.id.slice(5) == e.target.id.slice(5)){
            stocks.innerText=`Stock: ${productos[indiceProducto].stock}`
        }
    }
    
    let tarjetasHaOcultar = document.getElementsByClassName("tarjetas")
    for (let tarjetas of tarjetasHaOcultar) {
    
        if(tarjetas.children[4].innerText.slice(7) > 0){
            tarjetas.classList.remove("noDisponible")
        } 
    }
    


    let costoTotal = carritoContenedor.reduce((total,productoDelCarrito) => total + productoDelCarrito.precioTotal ,0)

    costoTotalDOM.innerText = costoTotal + "$"


    localStorage.setItem("carrito",JSON.stringify(carritoContenedor))
    //localStorage.setItem("productos",JSON.stringify(productos))
    //renderizarProductos(productos)
    renderizarCarrito(carritoContenedor, productos)
}
//


function buscarProducto(productos){

    let productosEncontrados = productos.filter(producto => producto.nombre.toLowerCase().includes(buscador.value))
    
    renderizarProductos(productosEncontrados)
}


function filtrarCategoria(productos){
    let categoriasAsignadas = []
    for (const categoria of categorias) {
        if(categoria.checked) categoriasAsignadas.push(categoria.id)
    }
    
    let productosFiltradosPorCategoria = productos.filter(producto => categoriasAsignadas.includes(producto.categoria))

    categoriasAsignadas.length>0 ?renderizarProductos(productosFiltradosPorCategoria):renderizarProductos(productos)
    
}


function aplicarRangos(productos){
    let productosARango = productos
    if(rangoMinimo.value > 0 || rangoMaximo.value > 0){

        if(rangoMinimo.value > rangoMaximo.value){
            productosARango = productos.filter(producto => producto.precio >= rangoMaximo.value && producto.precio <= rangoMinimo.value)
        }else{
            productosARango = productos.filter(producto => producto.precio >= rangoMinimo.value && producto.precio <= rangoMaximo.value)
        }

    }

    renderizarProductos(productosARango)
}


function quitarAllFiltros(productos) {
    for (const categoria of categorias) {
        categoria.checked = false
    }

    rangoMinimo.value = 0
    rangoMaximo.value = 0

    renderizarProductos(productos)
}

//Finalización de la compra, en donde se tendrán validaciones a los datos ingresados por el usuario a la hora de implementar la compra
finalizarCompra.addEventListener("click", compraRealizada)

function compraRealizada() {
    let nombreExp = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/
    let correoExp = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
    let nombreInput = document.getElementById("nombre")
    let correoInput = document.getElementById("correo")
    let localizacionInput = document.getElementById("localizacion")
    let direccionInput = document.getElementById("direccion")
    let codigoDescuentoInput = document.getElementById("codigoDescuento")
    
    let nombre = document.getElementById("validarNombre")
    let correo = document.getElementById("validarCorreo")
    let localizacion = document.getElementById("validarLocalizacion")
    let direccion = document.getElementById("validarDireccion")
    let codigo = document.getElementById("validarCodigo")
    //let informacionDeCompra = document.getElementById("InformacionDeCompra")


    if(carritoContenedor.length === 0){
        tostadita("No hay productos agregados en el carrito","#FF2D00","#950000")
    }else{
        if(nombreExp.test(nombreInput.value) && correoExp.test(correoInput.value) && localizacionInput.value.length > 0 && direccionInput.value.length > 0){
            //Este tramo es para evaluar el código de descuento aplicado, de forma de que el ingresarlo no sea un requisito necesario para efectuar la compra, en caso que si; se evaluará.

            if(codigoDescuentoInput.value.length > 0){
                if(codigoDescuentoInput.value === "JAVANOESJS" || codigoDescuentoInput.value === "VIVANLOSGATITOS" || codigoDescuentoInput.value === "JUANQUITA"){
                    codigoAplicado = codigoDescuentoInput.value

                    nombre.innerText = ""
                    nombre.style = ""
                    correo.innerText = ""
                    correo.style = ""
                    localizacion.innerText = ""
                    localizacion.style = ""
                    direccion.innerText = ""
                    localizacion.style = ""
                    codigo.innerText = "Código Válido"
                    codigo.style = "color:green;"
        
                    sweetAlert("¿Estás seguro?", "Realiza la compra aceptando.")
                }else{
                    codigo.innerText = "Código Inválido"
                    codigo.style = "color:red;"
        
                    direccion.innerText = ""
                    direccion.style = ""
                    nombre.innerText = ""
                    nombre.style = ""
                    correo.innerText = ""
                    correo.style = ""
                    localizacion.innerText = ""
                    localizacion.style = ""
                }
            }else{
                nombre.innerText = ""
                nombre.style = ""
                correo.innerText = ""
                correo.style = ""
                localizacion.innerText = ""
                localizacion.style = ""
                direccion.innerText = ""
                localizacion.style = ""
                codigo.innerText = ""
                codigo.style = ""
    
                sweetAlert("¿Estás seguro?", "Realiza la compra aceptando.")
            }

        }else if(!nombreExp.test(nombreInput.value)){
            nombre.innerText = "Nombre inválido"
            nombre.style = "color:red;"
    
            codigo.innerText = ""
            codigo.style = ""
            correo.innerText = ""
            correo.style = ""
            localizacion.innerText = ""
            localizacion.style = ""
            direccion.innerText = ""
            direccion.style = ""
        } else if(!correoExp.test(correoInput.value)){
            correo.innerText = "Formato de correo inválido"
            correo.style = "color:red;"
    
            codigo.innerText = ""
            codigo.style = ""
            nombre.innerText = ""
            nombre.style = ""
            localizacion.innerText = ""
            localizacion.style = ""
            direccion.innerText = ""
            direccion.style = ""
        }else if(localizacionInput.value.length == 0){
            localizacion.innerText = "Ingresa una localización"
            localizacion.style = "color:red;"

            codigo.innerText = ""
            codigo.style = ""
            nombre.innerText = ""
            nombre.style = ""
            correo.innerText = ""
            correo.style = ""
            direccion.innerText = ""
            direccion.style = ""
        }else if(direccionInput.value.length == 0){
            direccion.innerText = "Ingresa una dirección"
            direccion.style = "color:red;"
    
            codigo.innerText = ""
            codigo.style = ""
            nombre.innerText = ""
            nombre.style = ""
            correo.innerText = ""
            correo.style = ""
            localizacion.innerText = ""
            localizacion.style = ""
        }
    }

}
//

//LIBRERÍAS EMPLEADAS EN EL PROYECTO
function tostadita(mensaje,color1,color2,posicion="top") {
    Toastify({
        text: mensaje,
        duration: 3000,
        newWindow: true,
        close: false,
        gravity: posicion, // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: false, // Prevents dismissing of toast on hover
        style: {
          background: `linear-gradient(to right, ${color1}, ${color2})`,
        }
      }).showToast();
}
//EL SWEET ALERT FUE SÓLO MODICADO PARA LA COMPRA FINAL
function sweetAlert(titulo = 'Are you sure?', texto = "You won't be able to revert this!", icono = 'question'){
    Swal.fire({
        title: titulo,
        text: texto,
        icon: icono,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, estoy seguro!'
      }).then((result) => {
        if (result.isConfirmed) {
            let codigo = document.getElementById("validarCodigo")
            let codigoDescuentoInput = document.getElementById("codigoDescuento")
          Swal.fire(
            'A entrenar duro!',
            'Tu compra ha sido realizada. Ya te mostraremos el resumen de tu compra.',
            'success'
          )
          
          mostrador.classList.add("quitar")
          filtrador.classList.add("quitar")
          carritoHTML.classList.add("quitar")
          resumen.classList.remove("quitar")
          
          let nombreInput = document.getElementById("nombre")
          let correoInput = document.getElementById("correo")
          let localizacionInput = document.getElementById("localizacion")
          let direccionInput = document.getElementById("direccion")
          

          carritoContenedor.forEach(({id,img,precio,precioTotal,nombre,unidades}) => {
              let tarjetaInfo = document.createElement("div")
              tarjetaInfo.className = "tarjetaInfo"
  
              tarjetaInfo.innerHTML += `
              <div class="subInfo">
                <img src="${img}">
                <p>${nombre}</p>
                <p>X${unidades}</p>
                <p>${precio}$</p>
              <div/>
              `

              contenedorDeInfo.append(tarjetaInfo)
          })

          let infoPersonal = document.createElement("div")
          infoPersonal.classname = "infoPersonal"

          let porcentaje = ""
          let porcentajeRestado = 0

          //Juanca o Ferrán, no entiendo porque costoTotalDOM.innerText.slice(1,-1) me rebota un resultado que no concuerda con el precio menos el $, tuve que recurrir a un replace muy rebuscado
          if(codigoAplicado){
                if(codigoAplicado === "JAVANOESJS"){
                        porcentajeRestado = (Number(costoTotalDOM.innerText.replace("$","")) * 10)/100

                        costoTotalDOM.innerText = Number(costoTotalDOM.innerText.replace("$","")) - porcentajeRestado + "$"
                        porcentaje = "10%"
                    
                }else if(codigoAplicado === "VIVANLOSGATITOS"){
                    porcentajeRestado = (Number(costoTotalDOM.innerText.replace("$","")) * 20)/100

                    costoTotalDOM.innerText = Number(costoTotalDOM.innerText.replace("$","")) - porcentajeRestado + "$"
                    porcentaje = "20%"
                }else if(codigoAplicado === "JUANQUITA"){
                    porcentajeRestado = (Number(costoTotalDOM.innerText.replace("$","")) * 30)/100

                    costoTotalDOM.innerText = Number(costoTotalDOM.innerText.replace("$","")) - porcentajeRestado + "$"
                    porcentaje = "30%"
                    }
                    infoPersonal.innerHTML = `
                    <p><b>Nombre:</b> ${nombreInput.value}</p>
                    <p><b>Correo:</b> ${correoInput.value}</p>
                    <p><b>Localización:</b> ${localizacionInput.value}</p>
                    <p><b>Dirección:</b> ${direccionInput.value}</p>
                    <p><b>Descuento aplicado:</b> ${porcentaje}</p>
                    <p><b>Costo Restado:</b> -${porcentajeRestado}$</p>
                    <p><b>Costo total:</b> ${costoTotalDOM.innerText}</p>
                    `
            }else{
                infoPersonal.innerHTML = `
                <p><b>Nombre:</b> ${nombreInput.value}</p>
                <p><b>Correo:</b> ${correoInput.value}</p>
                <p><b>Localización:</b> ${localizacionInput.value}</p>
                <p><b>Dirección:</b> ${direccionInput.value}</p>
                <p><b>Costo total:</b> ${costoTotalDOM.innerText}</p>
                `
                }

          contenedorDeInfo.append(infoPersonal)

          carritoContenedor = []
          costoTotalDOM.innerText = "0$"
          renderizarCarrito(carritoContenedor)
          localStorage.removeItem("carrito")

          nombreInput.value = ""
          correoInput.value = ""
          localizacionInput.value = ""
          direccionInput.value = ""

          codigoDescuentoInput.value = ""
          codigo.innerText = ""
          codigo.style = ""
        }else if (result.dismiss === Swal.DismissReason.cancel) {
            codigoDescuentoInput.value = ""
            codigo.innerText = ""
            codigo.style = ""

            //Este tramo es para desagregar el mensaje de validación de código, para cuando cancele el SweetAlert de confirmación de compra
          }
      })
}


//Ejecución para visualización del costo total en caso de que se refresque la página
let costoTotal = carritoContenedor.reduce((total,productoDelCarrito) => total + productoDelCarrito.precioTotal ,0)
costoTotalDOM.innerText = costoTotal + "$"