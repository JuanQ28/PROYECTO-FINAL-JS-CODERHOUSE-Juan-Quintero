//funciones

function menuDeProductos(){
    let bandera = 0 
    let menuListado = menuEnlistar(productosAux)
    
    do{

        bandera = Number(prompt(menuListado))
        
        if(typeof bandera !== "number") return alert("Dato incorrecto, ingresar sólo números")
        
        let buscarProducto = productosAux.find((producto => producto.id === bandera))
        
        if(buscarProducto){
            let posicionDelProducto = carrito.findIndex(producto => producto.id === buscarProducto.id),indiceParaStock = productos.findIndex(producto => producto.id === buscarProducto.id )

            if(productos[indiceParaStock].stock > 0){
                if(posicionDelProducto != -1){
                    productos[indiceParaStock].stock--
                    carrito[posicionDelProducto].unidades++
                    carrito[posicionDelProducto].subtotal = carrito[posicionDelProducto].unidades * carrito[posicionDelProducto].precioUnidad
                    contadorCarrito++
                    alert("producto agregado con éxito")
                }else{
                    productos[indiceParaStock].stock--

                    carrito.push({
                        id: buscarProducto.id,
                        nombre: buscarProducto.nombre,
                        precioUnidad: buscarProducto.precio,
                        unidades: 1,
                        subtotal: buscarProducto.precio
                    })
                    contadorCarrito++
                    alert("producto agregado con éxito")
                }
                
            }else{
                alert("El producto no cuenta con stock :(")
            }
        }else if(bandera == 90){
            productosAux = productosParaDesordenar.sort((a,b) => a.precio - b.precio)
            menuListado = menuEnlistar(productosAux)
        }else if(bandera == 91){
            productosAux = productosParaDesordenar.sort((a,b) => b.precio - a.precio)
            menuListado = menuEnlistar(productosAux)
        }else if(bandera == 92){
            let ciclo = 0
            let categoria
            while(ciclo == 0){
                categoria = Number(prompt("Ingresa la categoría por número para filtrar\n\nCategorías disponibles:\n1. Proteína\n2. Creatina\n3. Preentreno\n4. Aminoácidos\n5. Multivitaminicos"))
                switch (categoria) {
                    case 1:
                        categoria = "proteina"
                        ciclo = "romper"
                        break;
                        case 2:
                            categoria = "creatina"
                            ciclo = "romper"
                        break;    
                    case 3:
                        categoria = "preentreno"
                        ciclo = "romper"
                        break;
                    case 4:
                        categoria = "aminoacidos"
                        ciclo = "romper" 
                        break;
                    case 5:
                        categoria = "multivitaminicos"
                        ciclo = "romper"
                        break;
                    default:
                        alert("Valor incorrecto para cateogorias")
                        break;
                }
            }
            productosAux = productos.filter(producto => producto.categoria === categoria)
            menuListado = menuEnlistar(productosAux)
        }else if(bandera == 93){
            let rangoMenor, rangoMayor
            while(typeof rangoMenor !== "number" && typeof rangoMayor !== "number"){
                rangoMenor = Number(prompt("Ingresa el precio mínimo, ingresa 0 en caso de ignorar este valor"))
                rangoMayor = Number(prompt("Ingresa el precio máximo, ingresa 0 en caso de ignorar este valor"))
                if(typeof rangoMenor !== "number" || typeof rangoMayor !== "number"){
                    alert("Ingresa los valores de los rangos como NÚMEROS")
                }
            }
            if(rangoMayor === 0){
                productosAux = productos.filter(producto => producto.precio >= rangoMenor)
            }else{
                productosAux = productos.filter(producto => producto.precio >= rangoMenor && producto.precio <= rangoMayor)
            }
            menuListado = menuEnlistar(productosAux)
        }else if(bandera == 94){
            productosAux = productos
            menuListado = menuEnlistar(productosAux)
        }else if(bandera !== 0){
            alert("Dato incorrecto o fuera de los parámetros")
        }
    }while(bandera !== 0);
}

    
function menuEnlistar(listadoAEvaluar) {
    return `0. regresar al menú principal\n90. Ordenar precios de forma ascendente\n91. Ordenar precios de forma desdendente\n92. Mostrar por categorías\n93. Mostrar por rangos de precio\n94. Quitar filtros aplicados\n\n${(listadoAEvaluar.map(producto => `${producto.id}. ${producto.nombre}  ${producto.precio}$`)).join("\n")}`
}

function entrarAlCarrito(condicion){
    while(condicion === "carrito"){
        let costoTotal = carrito.reduce((sumatoria, producto) => sumatoria + producto.subtotal, 0), carritoListado = ""
        
        for(const producto of carrito){
            carritoListado += `\n${producto.id}. ${producto.nombre} cantidades:${producto.unidades}\nSubtotal del producto:${producto.subtotal}\n`
        } 

        bandera3 = Number(prompt(`Lista de productos:\n${carritoListado}\nPrecio total: ${costoTotal}$\n\n1.Regresar\n2.Quitar producto por medio de su número/id`))
        switch (bandera3) {
            case 1:
                condicion = undefined 
                break;
            case 2:
                let borrarProducto = Number(prompt("Ingresa el producto para borrar por su número/id"))
                let posicionProductoBorrar = carrito.findIndex(producto => producto.id === borrarProducto)
                if(posicionProductoBorrar !== -1){
                    carrito[posicionProductoBorrar].unidades--
                    carrito[posicionProductoBorrar].subtotal -= carrito[posicionProductoBorrar].precioUnidad 
                    contadorCarrito--
                    if(carrito[posicionProductoBorrar].unidades === 0){
                        carrito.splice(posicionProductoBorrar,1)
                    }
                }else {
                    alert("Producto no encontrado dentro del carrito")
                }
                break;    
        
            default:
                alert("El valor ingresado es incorrecto")
                break;
        }
    }

}


function desarrolloDelPago(condicion){
    while(condicion === "proceso de pago"){
        
        let costoTotal = carrito.reduce((sumatoria, producto) => sumatoria + producto.subtotal, 0), carritoListado = ""
        
        for(const producto of carrito){
            carritoListado += `\n${producto.id}. ${producto.nombre} cantidades:${producto.unidades}\nSubtotal del prodcuto:${producto.subtotal}\n`
        }

        bandera3 = Number(prompt(`Lista de productos:\n${carritoListado}Precio total: ${costoTotal}$\n\n1.Ingresar código\n2.Pagar\n3.Regresar al menú principal`))
        
        switch (bandera3) {
            case 1:
                let bandera4 = false
                while(!bandera4){
                    codigo = prompt("Ingresa tu código")
                    if(bandera4 = validarDescuento(codigo)){
                        alert("Código válido")
                        condicion = undefined  
                        pagoConDescuento("proceso de pago descuento aplicado")
                    }else{
                        alert("Código incorrecto")
                    }
                }
                break;
        
            case 2:
                alert("Esta función podrá ser agregada en un futuro\nMuchas gracias!")
                bandera1 = 0
                condicion = undefined
                break;

            case 3:
                condicion = undefined
                break;

            default:
                alert("El valor ingresado es incorrecto")
                break;
        }
    }    
}

function pagoConDescuento(condicion){
    let costoTotal = carrito.reduce((sumatoria, producto) => sumatoria + producto.subtotal, 0), carritoListado = ""
        
        for(const producto of carrito){
            carritoListado += `\n${producto.id}. ${producto.nombre} cantidades:${producto.unidades}\nSubtotal del producto:${producto.subtotal}\n`
        }

    while(condicion === "proceso de pago descuento aplicado"){

        bandera3 = Number(prompt(`Lista de productos:\n${carritoListado}\n\nPrecio total: ${costoTotal - Aplicardescuento(codigo)}$\nDescuento: -${Aplicardescuento(codigo)}$\n${descuentoMostrado}\n\n1.Pagar\n`))

        switch (bandera3) {
            case 1:
                alert("Esta función podrá ser agregada en un futuro\nMuchas gracias!")
                bandera1 = 0
                condicion = undefined
                break;

            default:
                alert("El valor ingresado es incorrecto")
                break;
        }
    }
} 


function bienvenida(){
    for(let i = 0; i < 3; i++){
        switch (i) {
            case 0:
                alert(`Sólo por el día de hoy tendrás descuentos en todas nuestras presentaciones\nUtilizando los códigos autorizados. Desde el ${(i+1)*10}%`)            
                break;
        
            case 1:
                alert(`Inclusive del ${(i+1)*10}%`)
                break;
               
            case 2:
                alert(`¡HASTA DEL ${(i+1)*10}%!`)
                break;
    
        }
    
    }
}


function validarDescuento(descuento){
    return (codigos.some(codigo => codigo === descuento))
}

function Aplicardescuento(codigo) {
    let costoTotal = carrito.reduce((sumatoria, producto) => sumatoria + producto.subtotal, 0)

    if(codigo === "amolosgatitos"){
        descuentoMostrado = "amolosgatitos brinda un 10% de descuento\n"
        return (costoTotal*10)/100 
    }else if(codigo === "javanoesjs"){
        descuentoMostrado = "javanoesjs brinda un 20% de descuento\n"
        return (costoTotal*20)/100
    }else if(codigo === "juancaprofe"){
        descuentoMostrado = "juancaprofe brinda un 30% de descuento\n"
        return (costoTotal*30)/100
    }
}

function menuPrincipal() {
    return `HardWorkoutSuplementación\n\nIngresa una opción por medio de su número\n\n0. salir\n\n1. Ver el carrito (${contadorCarrito})productos\n\n2. Listar productos\n\n3. Proceso de pago`
}
//

//Variables
carrito = [],
bandera1 = 0, //Bandera principal
codigo = undefined,
contadorCarrito = 0,
descuentoMostrado = ""

//Códigos autorizados
let codigos = ["amolosgatitos","javanoesjs","juancaprofe"]

const products = [
    {
        id:1,
        nombre:"Proteína KingKong 13lb",
        categoria:"proteina",
        precio: 250000,
        stock: 3
    },
    {
        id:2,
        nombre:"Master Protein 13lb",
        categoria:"proteina",
        precio:270000,
        stock: 2
    },
    {
        id:3,
        nombre:"Master Protein 5lb",
        categoria:"proteina",
        precio:140000,
        stock: 10
    },
    {
        id:4,
        nombre:"Lite protein 3lb",
        categoria:"proteina",
        precio:95000,
        stock: 8
    },
    {
        id:5,
        nombre:"CreaMaster 500gr",
        categoria: "creatina",
        precio:230000,
        stock: 4 
    },                                     
    {
        id:6,
        nombre:"KingCreatine 300gr",
        categoria: "creatina",
        precio:150000,
        stock: 9
    },
    {
        id:7,
        nombre:"Creatina100% 300gr",
        categoria: "creatina",
        precio:160000,
        stock: 10
    },
    {
        id:8,
        nombre:"Best Creatine 200gr",
        categoria: "creatina",
        precio:70000,
        stock: 12 
    },
    {
        id:9,
        nombre:"Psychotic 200gr",
        categoria:"preentreno",
        precio:170000,
        stock: 5
    },
    {
        id:10,
        nombre:"CoffeMaster 300gr",
        categoria:"preentreno",
        precio:180000,
        stock: 6
    },
    {
        id:11,
        nombre:"PowerUltra 310gr",
        categoria:"preentreno",
        precio:220000,
        stock: 7
    },
    {
        id:12,
        nombre:"BodyFuel 500gr",
        categoria:"aminoacidos",
        precio:210000,
        stock: 3
    },
    {
        id:13,
        nombre:"ScienseTrain 500gr",
        categoria:"aminoacidos",
        precio:250000,
        stock: 4
    },
    {
        id:14,
        nombre:"AminoUltra 400gr",
        categoria:"aminoacidos",
        precio:150000,
        stock: 10
    },
    {
        id:15,
        nombre:"BrainVitaminPure 300gr",
        categoria:"multivitaminicos",
        precio:150000,
        stock: 9
    },
    {
        id:16,
        nombre:"NitroBodyVitamin 500gr",
        categoria:"multivitaminicos",
        precio:220000,
        stock: 4
    },
    {
        id:17,
        nombre:"100Vitamin 500gr",
        categoria:"multivitaminicos",
        precio:200000,
        stock: 7
    }
]

const productos = products.map(producto => {
    return new Producto(producto.id,producto.nombre,producto.categoria,producto.precio,producto.stock)
})

const productosParaDesordenar = [
    {
        id:1,
        nombre:"Proteína KingKong 13lb",
        categoria:"proteina",
        precio: 250000,
        stock: 3
    },
    {
        id:2,
        nombre:"Master Protein 13lb",
        categoria:"proteina",
        precio:270000,
        stock: 2
    },
    {
        id:3,
        nombre:"Master Protein 5lb",
        categoria:"proteina",
        precio:140000,
        stock: 10
    },
    {
        id:4,
        nombre:"Lite protein 3lb",
        categoria:"proteina",
        precio:95000,
        stock: 8
    },
    {
        id:5,
        nombre:"CreaMaster 500gr",
        categoria: "creatina",
        precio:230000,
        stock: 4 
    },                                     
    {
        id:6,
        nombre:"KingCreatine 300gr",
        categoria: "creatina",
        precio:150000,
        stock: 9
    },
    {
        id:7,
        nombre:"Creatina100% 300gr",
        categoria: "creatina",
        precio:160000,
        stock: 10
    },
    {
        id:8,
        nombre:"Best Creatine 200gr",
        categoria: "creatina",
        precio:70000,
        stock: 12 
    },
    {
        id:9,
        nombre:"Psychotic 200gr",
        categoria:"preentreno",
        precio:170000,
        stock: 5
    },
    {
        id:10,
        nombre:"CoffeMaster 300gr",
        categoria:"preentreno",
        precio:180000,
        stock: 6
    },
    {
        id:11,
        nombre:"PowerUltra 310gr",
        categoria:"preentreno",
        precio:220000,
        stock: 7
    },
    {
        id:12,
        nombre:"BodyFuel 500gr",
        categoria:"aminoacidos",
        precio:210000,
        stock: 3
    },
    {
        id:13,
        nombre:"ScienseTrain 500gr",
        categoria:"aminoacidos",
        precio:250000,
        stock: 4
    },
    {
        id:14,
        nombre:"AminoUltra 400gr",
        categoria:"aminoacidos",
        precio:150000,
        stock: 10
    },
    {
        id:15,
        nombre:"BrainVitaminPure 300gr",
        categoria:"multivitaminicos",
        precio:150000,
        stock: 9
    },
    {
        id:16,
        nombre:"NitroBodyVitamin 500gr",
        categoria:"multivitaminicos",
        precio:220000,
        stock: 4
    },
    {
        id:17,
        nombre:"100Vitamin 500gr",
        categoria:"multivitaminicos",
        precio:200000,
        stock: 7
    }
]

let productosAux = [
    {
        id:1,
        nombre:"Proteína KingKong 13lb",
        categoria:"proteinas",
        precio: 250000,
        stock: 3
    },
    {
        id:2,
        nombre:"Master Protein 13lb",
        categoria:"proteinas",
        precio:270000,
        stock: 2
    },
    {
        id:3,
        nombre:"Master Protein 5lb",
        categoria:"proteinas",
        precio:140000,
        stock: 10
    },
    {
        id:4,
        nombre:"Lite protein 3lb",
        categoria:"proteina",
        precio:95000,
        stock: 8
    },
    {
        id:5,
        nombre:"CreaMaster 500gr",
        categoria: "creatina",
        precio:230000,
        stock: 4 
    },                                     
    {
        id:6,
        nombre:"KingCreatine 300gr",
        categoria: "creatina",
        precio:150000,
        stock: 9
    },
    {
        id:7,
        nombre:"Creatina100% 300gr",
        categoria: "creatina",
        precio:160000,
        stock: 10
    },
    {
        id:8,
        nombre:"Best Creatine 200gr",
        categoria: "creatina",
        precio:70000,
        stock: 12 
    },
    {
        id:9,
        nombre:"Psychotic 200gr",
        categoria:"preentreno",
        precio:170000,
        stock: 5
    },
    {
        id:10,
        nombre:"CoffeMaster 300gr",
        categoria:"preentreno",
        precio:180000,
        stock: 6
    },
    {
        id:11,
        nombre:"PowerUltra 310gr",
        categoria:"preentreno",
        precio:220000,
        stock: 7
    },
    {
        id:12,
        nombre:"BodyFuel 500gr",
        categoria:"aminoacidos",
        precio:210000,
        stock: 3
    },
    {
        id:13,
        nombre:"ScienseTrain 500gr",
        categoria:"aminoacidos",
        precio:250000,
        stock: 4
    },
    {
        id:14,
        nombre:"AminoUltra 400gr",
        categoria:"aminoacidos",
        precio:150000,
        stock: 10
    },
    {
        id:15,
        nombre:"BrainVitaminPure 300gr",
        categoria:"multivitaminicos",
        precio:150000,
        stock: 9
    },
    {
        id:16,
        nombre:"NitroBodyVitamin 500gr",
        categoria:"multivitaminicos",
        precio:220000,
        stock: 4
    },
    {
        id:17,
        nombre:"100Vitamin 500gr",
        categoria:"multivitaminicos",
        precio:200000,
        stock: 7
    }
]  

//menuListado = `0. regresar al menú principal\n90. Ordenar precios de forma ascendente\n91. Ordenar precios de forma desdendente\n92. Mostrar por categorías\n93. Mostrar por rangos de precio\n94. Quitar filtros aplicados\n\n${productosListado.join("\n")}`
//

//           EJECUCIÓN           //

//

alert("Bienvenido a HardWorkoutSuplementación\nDe las mejores tiendas del mercado")


bienvenida()
    
do{
        bandera1 = Number(prompt(menuPrincipal()))
        switch (bandera1) {
            case 1:
                entrarAlCarrito("carrito")
                break;
            
            case 2:
                menuDeProductos()
                break;
            
            case 3:
                desarrolloDelPago("proceso de pago")
                break;   

            case 0:
                bandera1 = 0
            break;

                default:
                    alert("El valor ingresado es incorrecto")
            break; 
        }
}while (bandera1 !== 0);




alert("¡Que vuelvas pronto!")
