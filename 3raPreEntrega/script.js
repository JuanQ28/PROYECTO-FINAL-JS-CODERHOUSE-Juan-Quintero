//1.IMPORTACIÓN DE MÓDULOS.


import {products} from "./products.js"
import {Producto} from "../class.js"


//2.DECLARACIÓN DE VARIABLES.

let productos = products.map( producto=>{
    return new Producto(producto.id,producto.nombre,producto.categoria,producto.precio,producto.stock,producto.img)
})

productos = JSON.parse(localStorage.getItem("productos")) || productos

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

logoPrincipal.addEventListener("click",() =>{
    mostrador.classList.remove("quitar")
    carritoHTML.classList.add("quitar")
    filtrador.classList.remove("quitar")
})
carritoLogo.addEventListener("click",() =>{
    mostrador.classList.toggle("quitar")
    carritoHTML.classList.toggle("quitar")
    filtrador.classList.toggle("quitar")
})

let finalizarCompra = document.getElementById("finalizarCompra")
//3.DECLARACIÓN DE FUNCIONES.


function renderizarProductos(arrayDeProductos){
    contenedorProductos.innerHTML = ""
    
    arrayDeProductos.forEach(({id,nombre,categoria,precio,stock,img}) => {
        let tarjeta = document.createElement("div")
        tarjeta.className="tarjetas"
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
        boton.addEventListener("click", agregarAlCarrito)
    }
}



function agregarAlCarrito(e){
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
            stocks.innerHTML=`Stock: ${productos[indiceProducto].stock}`
        }
    }
    
    let tarjetasHaOcultar = document.getElementsByClassName("tarjetas")
    for (let tarjetas of tarjetasHaOcultar) {
    
        if(tarjetas.children[4].innerText.slice(7) == 0){
            tarjetas.classList.add("noDisponible")
        }
    }
    


    let costoTotal = carritoContenedor.reduce((total,productoDelCarrito) => total + productoDelCarrito.precioTotal ,0)

    costoTotalDOM.innerText = costoTotal


    localStorage.setItem("carrito",JSON.stringify(carritoContenedor))
    localStorage.setItem("productos",JSON.stringify(productos))
    //renderizarProductos(productos)
    renderizarCarrito(carritoContenedor)
}

function renderizarCarrito(arrayCarrito) {
    productosAgregados.innerHTML = ""    

    arrayCarrito.forEach(({id,img,precio,precioTotal,nombre,unidades}) => {
        let tarjetaProducto = document.createElement("div")
        tarjetaProducto.className = "tarjetaCarrito"

        tarjetaProducto.innerHTML = `
        <img src="${img}"></img>
        <p>${nombre}</p>
        <p>precio: ${precio}</p>
        <p>unidades: ${unidades}</p>
        <p>total:${precioTotal}</p>
        <button  class="botonesDelete"><img src="../data/delete-1487-svgrepo-com.svg" style="width:50px; height:50px;" id="${id}"></button>
        `


        productosAgregados.append(tarjetaProducto)
    })

    let botonesDelete = document.getElementsByClassName("botonesDelete")
    for (const botones of botonesDelete) {
        botones.addEventListener("click", quitarDelCarrito)
    }

}

function quitarDelCarrito(e) {
    let indice = carritoContenedor.findIndex(producto => producto.id == e.target.id)
    let indiceEnProductos = productos.findIndex(producto => producto.id == e.target.id)
    
    productos[indiceEnProductos].stock += carritoContenedor[indice].unidades
    

    costoTotalDOM.innerText = Number(costoTotalDOM.innerText) - Number(carritoContenedor[indice].precioTotal)

    carritoContenedor.splice(indice,1)

    renderizarProductos(productos)
    renderizarCarrito(carritoContenedor)
    localStorage.setItem("carrito",JSON.stringify(carritoContenedor))
    localStorage.setItem("productos",JSON.stringify(productos))
    tostadita("Producto borrado","#FF2D00","#950000")
}


buscador.addEventListener("input",buscarProducto)

function buscarProducto(){
    let productosEncontrados = productos.filter(producto => producto.nombre.toLowerCase().includes(buscador.value))
    
    renderizarProductos(productosEncontrados)
}

for (const categoria of categorias) {
    categoria.addEventListener("click",filtrarCategoria)
}

function filtrarCategoria(){
    let categoriasAsignadas = []
    for (const categoria of categorias) {
        if(categoria.checked) categoriasAsignadas.push(categoria.id)
    }
    
    let productosFiltradosPorCategoria = productos.filter(producto => categoriasAsignadas.includes(producto.categoria))

    categoriasAsignadas.length>0 ?renderizarProductos(productosFiltradosPorCategoria):renderizarProductos(productos)
    
}

aplicarPrecioRango.addEventListener("click",aplicarRangos)

function aplicarRangos(){
    let productosARango
    if(rangoMinimo.value > 0 || rangoMaximo.value > 0){

        if(rangoMinimo.value > rangoMaximo.value){
            productosARango = productos.filter(producto => producto.precio >= rangoMaximo.value && producto.precio <= rangoMinimo.value)
        }else{
            productosARango = productos.filter(producto => producto.precio >= rangoMinimo.value && producto.precio <= rangoMaximo.value)
        }

    }

    renderizarProductos(productosARango)
}

quitarFiltros.addEventListener("click",quitarAllFiltros)

function quitarAllFiltros() {
    for (const categoria of categorias) {
        categoria.checked = false
    }

    rangoMinimo.value = 0
    rangoMaximo.value = 0

    renderizarProductos(productos)
}

finalizarCompra.addEventListener("click", () => console.log("Compra exitosa"))


function tostadita(mensaje,color1,color2) {
    Toastify({
        text: mensaje,
        className: "info",
        style: {
          background: `linear-gradient(to right, ${color1}, ${color2})`,
        }
      }).showToast();
}

function tostada(){
    Toastify({
        text: "This is a toast",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function(){} // Callback after click
      }).showToast();
}

//4.EJECUCIÓN DE CÓDIGO.

renderizarProductos(productos)
renderizarCarrito(carritoContenedor)

