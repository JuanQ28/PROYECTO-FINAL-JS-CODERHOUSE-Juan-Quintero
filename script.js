//funciones

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

function sumarCarrito(precio){
    return carritoPrecio + precio
}

function concatenarCarrito(producto){
    return carrito + producto
}

function validarDescuento(descuento){
    if(descuento === "amolosgatitos" || descuento === "javanoesjs" || descuento === "juancaprofe"){
        return true
    }else{
        return false
    }
}

function Aplicardescuento(codigo) {
    if(codigo === "amolosgatitos"){
        descuentoMostrado = "amolosgatitos brinda un 10% de descuento\n"
        return (carritoPrecio*10)/100 
    }else if(codigo === "javanoesjs"){
        descuentoMostrado = "javanoesjs brinda un 20% de descuento\n"
        return (carritoPrecio*20)/100
    }else if(codigo === "juancaprofe"){
        descuentoMostrado = "juancaprofe brinda un 30% de descuento\n"
        return (carritoPrecio*30)/100
    }
}

//

//Variables
let categorias = "1.Proteína\n2.Creatina\n3.Pre-enteno\n4.Aminoácidos\n5.Multivitaminicos\n\n6.Proceso de pago\n10.Ver carrito de compra\n8.Salir",
carrito = "",
carritoPrecio = 0,
carritoPrecioAux = 0,
bandera1 = undefined, //Bandera principal
bandera2 = undefined, //Bandera de fases
bandera3 = undefined, //Bandera de subfases
bandera4 = false,
romper = undefined,
codigo = undefined,
contadorCarrito = 0,
banderaCarrito = undefined, //Bandera del carrito
descuentoMostrado = ""

//Códigos autorizados
let codigo1 = "amolosgatitos",
codigo2 = "javanoesjs",
codigo3 = "juancaprofe"

let categoriasProteina = `Proteínas\n\n1.Proteína KingKong 13lb: 250.000$\n2.Master Protein 13lb: 270.000$\n3.Master Protein 5lb: 140.000$\n4.Lite protein 13lb: 310.000$\n5.Lite protein 3lb: 95.000$\n\n10.Ver carrito de compra\n0.Regresar al menú principal`, 
categoriasCreatina = `Creatina\n\n1.CreaMaster 500gr: 230.000$\n2. KingCreatine 300gr: 150.000$\n3.Creatina 100% 300gr: 160.000$\n4.Creatina Lite 300gr: 200.000$\n5.Best Creatine 200gr: 70.000$\n\n10.Ver carrito de compra\n0.Regresar al menú principal`,
categoriasPreentreno = `Pre-entrenos\n\n1.Psychotic 200gr: 170.000$\n2.LionBlood 300gr: 200.000$\n3.CoffeMaster 300gr: 180.000$\n4.PowerUltra 310gr: 220.000$\n\n10.Ver carrito de compra\n0.Regresar al principal`,
categoriasAminoacidos = `Aminoácidos\n\n1.BodyFuel 500gr: 210.000$\n2.ScienseTrain 500gr: 250.000%\n3.AminoUltra 400gr: 150.000$\n\n10.Ver carrito de compra\n0.Regresar al menú principal`,
categoriasMultivitaminicos = `Multivitaminicos\n\n1.100Vitamin 500gr: 200.000$\n2.NitroBodyVitamin 500gr:220.000$0\n3.BrainVitaminPure 300gr: 150.000$\n\n10.Ver carrito de compra\n0.Regresar al menú principal`

//


alert("Bienvenido a HardWorkoutSuplementación\nDe las mejores tiendas del mercado")


bienvenida()

do {
    
     while (bandera1 !== 0){
        bandera1 = Number(prompt(`Carrito(${contadorCarrito})\n\n${categorias}`))
        switch (bandera1) {
            case 1:
                bandera1 = 0
                bandera2 = "proteina"
                break;
            
            case 2:
                bandera1 = 0
                bandera2 = "creatina"
                break;
            
            case 3:
                bandera1 = 0
                bandera2 = "preentreno"
                break;
            
            case 4:
                bandera1 = 0
                bandera2 = "aminoacidos"
                break;
            
            case 5:
                bandera1 = 0
                bandera2 = "multivitaminicos"
                break;
    
            case 6:
                bandera1 = 0
                bandera2 = "proceso de pago"
                break;
    
            case 10:
                bandera1 = 0
                banderaCarrito = undefined  
                bandera2 = "carrito"
                break;
                
            case 8:
                bandera1 = 0
                romper = 0
                break;    
    
                default:
                    alert("El valor ingresado es incorrecto")
            break; 
        }
    }
    
    
    while(bandera2 === "proteina"){
        bandera3 = Number(prompt(`Carrito(${contadorCarrito})\n\n${categoriasProteina}`))
        switch (bandera3) {
            case 1:
                carrito = concatenarCarrito("Proteína KingKong 13lb: 250.000$\n")
                carritoPrecio = sumarCarrito(250000)
                contadorCarrito++
                alert("Producto agregado con éxito!")
                break;
            
            case 2:
                carrito = concatenarCarrito("Master Protein 13lb: 270.000$\n")
                carritoPrecio = sumarCarrito (270000)
                contadorCarrito++
                alert("Producto agregado con éxito!")
                break;
            
            case 3:
                carrito = concatenarCarrito("Master Protein 5lb: 140.000$\n")
                carritoPrecio = sumarCarrito (140000)
                contadorCarrito++
                alert("Producto agregado con éxito!")
                break;
            
            case 4:
                carrito = concatenarCarrito("Lite protein 13lb: 310.000$\n")
                carritoPrecio = sumarCarrito (310000)
                contadorCarrito++
                alert("Producto agregado con éxito!")
                break;
    
            case 5:
                carrito = concatenarCarrito("Lite protein 3lb: 95.000$\n")
                carritoPrecio = sumarCarrito (95000)
                contadorCarrito++
                alert("Producto agregado con éxito!")
                break;
    
            case 0:
                bandera1 = undefined
                bandera2 = undefined
                break;

            case 10:
                banderaCarrito = bandera2
                bandera2 = "carrito"
                    break;    
    
            default:
                    alert("El valor ingresado es incorrecto")
            break; 
        }
    }
    
    while(bandera2 === "creatina"){
        bandera3 = Number(prompt(`Carrito(${contadorCarrito})\n\n${categoriasCreatina}`))
        switch (bandera3) {
            case 1:
                carrito = concatenarCarrito("CreaMaster 500gr: 230.000$\n")
                carritoPrecio = sumarCarrito (230000)
                contadorCarrito++
                alert("Producto agregado con éxito!")
                break;
        
            case 2:
                carrito = concatenarCarrito("KingCreatine 300gr: 150.000$\n")
                carritoPrecio = sumarCarrito (150000)
                contadorCarrito++
                alert("Producto agregado con éxito!")
                break;
    
            case 3:
                carrito = concatenarCarrito("Creatina 100% 300gr: 160.000$\n")
                carritoPrecio = sumarCarrito (160000)
                contadorCarrito++
                alert("Producto agregado con éxito!")
                break;
    
            case 4:
                carrito = concatenarCarrito("Creatina Lite 300gr: 200.000$\n")
                carritoPrecio = sumarCarrito (200000)
                contadorCarrito++
                alert("Producto agregado con éxito!")
                break;
            
            case 5:
                carrito = concatenarCarrito("Best Creatine 200gr: 70.000$\n")
                carritoPrecio = sumarCarrito (70000)
                contadorCarrito++
                alert("Producto agregado con éxito!")
                break;
        
            case 0:
                bandera1 = undefined
                bandera2 = undefined
                break;     
                
            case 10:
                banderaCarrito = bandera2
                bandera2 = "carrito"
                break;    
    
            default:
                    alert("El valor ingresado es incorrecto")
            break; 
        }
    }
    
    while(bandera2 === "preentreno"){
        bandera3 = Number(prompt(`Carrito(${contadorCarrito})\n\n${categoriasPreentreno}`))
        switch (bandera3) {
            case 1:
                carrito = concatenarCarrito("Psychotic 200gr: 170.000$\n")
                carritoPrecio = sumarCarrito (170000)
                contadorCarrito++
                alert("Producto agregado con éxito!")
                break;
        
            case 2:
                carrito = concatenarCarrito("LionBlood 300gr: 200.000$\n")
                carritoPrecio = sumarCarrito (200000)
                contadorCarrito++
                alert("Producto agregado con éxito!")
                break;
    
            case 3:
                carrito = concatenarCarrito("CoffeMaster 300gr: 180.000$\n")
                carritoPrecio = sumarCarrito (180000)
                contadorCarrito++
                alert("Producto agregado con éxito!")
                break;
    
            case 4:
                carrito = concatenarCarrito("PowerUltra 310gr: 220.000$\n")
                carritoPrecio = sumarCarrito (220000)
                contadorCarrito++
                alert("Producto agregado con éxito!")
                break;
        
            case 0:
                bandera1 = undefined
                bandera2 = undefined
                break;  
                
            case 10:
                banderaCarrito = bandera2
                bandera2 = "carrito"
                break;        
    
            default:
                    alert("El valor ingresado es incorrecto")
            break; 
            break; 
        }
    }
    
    while(bandera2 === "aminoacidos"){
        bandera3 = Number(prompt(`Carrito(${contadorCarrito})\n\n${categoriasAminoacidos}`))
        switch (bandera3) {
            case 1:
                carrito = concatenarCarrito("BodyFuel 500gr: 210.000$\n")
                carritoPrecio = sumarCarrito (210000)
                contadorCarrito++
                alert("Producto agregado con éxito!")
                break;
        
            case 2:
                carrito = concatenarCarrito("ScienseTrain 500gr: 250.000%\n")
                carritoPrecio = sumarCarrito (250000)
                contadorCarrito++
                alert("Producto agregado con éxito!")
                break;
    
            case 3:
                carrito = concatenarCarrito("AminoUltra 400gr: 150.000$\n")
                carritoPrecio = sumarCarrito (150000)
                contadorCarrito++
                alert("Producto agregado con éxito!")
                break;
        
            case 0:
                bandera1 = undefined
                bandera2 = undefined
                break;           
                
            case 10:
                banderaCarrito = bandera2
                bandera2 = "carrito"
                break;    
    
            default:
                    alert("El valor ingresado es incorrecto")
            break; 
        }
    }
    
    while(bandera2 === "multivitaminicos"){
        bandera3 = Number(prompt(`Carrito(${contadorCarrito})\n\n${categoriasMultivitaminicos}`))
        switch (bandera3) {
            case 1:
                carrito = concatenarCarrito("100Vitamin 500gr: 200.000$\n")
                carritoPrecio = sumarCarrito (200000)
                contadorCarrito++
                alert("Producto agregado con éxito!")
                break;
        
            case 2:
                carrito = concatenarCarrito("NitroBodyVitamin 500gr:220.000$\n")
                carritoPrecio = sumarCarrito (220000)
                contadorCarrito++
                alert("Producto agregado con éxito!")
                break;
    
            case 3:
                carrito = concatenarCarrito("BrainVitaminPure 300gr: 150.000$\n")
                carritoPrecio = sumarCarrito (150000)
                contadorCarrito++
                alert("Producto agregado con éxito!")
                break;
        
            case 0:
                bandera1 = undefined
                bandera2 = undefined
                break;   
                
            case 10:
                banderaCarrito = bandera2
                bandera2 = "carrito"
                break;    
    
            default:
                    alert("El valor ingresado es incorrecto")
            break; 
        }
    }
    
    while(bandera2 === "proceso de pago"){
        if(!bandera4){
            bandera3 = Number(prompt(`Lista de productos:\n${carrito}Precio total: ${carritoPrecio}$\n\n1.Ingresar código\n2.Pagar\n3.Regresar al menú principal`))
        }else{
            carritoPrecioAux = carritoPrecio
            carritoPrecio = Aplicardescuento(codigo)
            carritoPrecioAux = carritoPrecioAux - carritoPrecio
            bandera2 = "proceso de pago descuento aplicado"
        }
        switch (bandera3) {
            case 1:
                while(!bandera4){
                    codigo = prompt("Ingresa tu código")
                    if(bandera4 = validarDescuento(codigo)){
                        alert("Código válido")
                    }else{
                        alert("Código incorrecto")
                    }
                }
                break;
        
            case 2:
                alert("Esta función podrá ser agregada en un futuro\nMuchas gracias!")
                romper = 0
                bandera1 = "romper"
                bandera2 = "romper"
                break;

            case 3:
                bandera1 = undefined
                bandera2 = undefined
                break;

            default:
                alert("El valor ingresado es incorrecto")
                break;
        }
    }    

    while(bandera2 === "proceso de pago descuento aplicado"){

        bandera3 = Number(prompt(`Lista de productos:\n${carrito}Precio total: ${carritoPrecioAux}$\nDescuento: -${carritoPrecio}$\n${descuentoMostrado}\n\n1.Pagar\n`))

        switch (bandera3) {
            case 1:
                alert("Esta función podrá ser agregada en un futuro\nMuchas gracias!")
                romper = 0
                bandera1 = "romper"
                bandera2 = "romper"
                break;

            default:
                alert("El valor ingresado es incorrecto")
                break;
        }
    }

    while(bandera2 === "carrito"){
        bandera3 = Number(prompt(`Lista de productos:\n${carrito}Precio total: ${carritoPrecio}$\n\n1.Regresar`))
        switch (bandera3) {
            case 1:
                if(banderaCarrito == undefined){
                    bandera1 = undefined
                    bandera2 = undefined
                }else{
                    bandera2 = banderaCarrito
                }
                break;
        
            default:
                alert("El valor ingresado es incorrecto")
                break;
        }
    }


} while (romper !== 0);





alert("¡Que vuelvas pronto!")
