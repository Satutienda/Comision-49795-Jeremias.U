
let productosApagar;
let descripcionProductoAPagar=[
    "Smartphone",
    "Vestido de verano",
    "Reloj de pared",
    "Reloj de mano para hombre"
]
let primeraCompraCliente=0;
let descuentoAaplicar=0;
let preciolista;
let mensajeDespedidaalert;
let productosDisp=[
    "1-Smartphone, UYU 1.090 c/u",
    "2-Vestido de verano, UYU 990 c/u",
    "3-Reloj de pared, UYU 490 c/u",
    "4-Reloj de mano para hombre, UYU 690 c/u"
    ];
let productosDispString=productosDisp.join("\n")
let precios=[
    1090,
    990,
    490,
    690,
]

let nombre= prompt("Cual es tu nombre o como te dicen?🧐🧐🧐")

primeraCompraCliente = +prompt(
    "Antes de finalizar tu compra, tenemos un oferta para ti 🤗🤩... "+ "\n" + "\n" 
    +"ingresa: 1, Si es la PRIMERA vez que compras"+ "\n"
    +"ingresa: 2, Si ya COMPRASTE ANTES "+ "\n" 

)

while (primeraCompraCliente !==1 && primeraCompraCliente  !== 2 ){
    primeraCompraCliente=+prompt("⚠️ Solo debes ingresar el número de la opción:"+ "\n"+ "\n"
    +"ingresa: 1, Si es la PRIMERA vez que compras"+ "\n"
    +"ingresa: 2, Si ya COMPRASTE ANTES "+ "\n" )

}   

if (primeraCompraCliente===1)
{
        alert("Gracias por elegirnos!!"+ "\n" + "\n" 
            +"te damos la bienvenida a Satu tienda  😎💪"+ "\n"+ "\n"
            +"nos pone contento tener clientes nuevos, por eso te damos un descuento del 12.3 % en esta compra🎉🎉🎉🎈🎈"          
        );
}
    else
{
        alert("Que bueno verte de nuevo!!"+ "\n" + "\n" 
            +"gracias por seguir confiando en nosotros 🥰☺️"+ "\n"+ "\n"
            +"aqui tu tienes tu descuento de 6.5 % 🎉🎉🎉🎈🎈 APROVECHALOO!!! "          
        );


}

let comprarOtroProducto=1

while (comprarOtroProducto==1) {
    let opcionesProductos = `${nombre}, cual de estos productos te gusta? ☺️☺️ .. ingresa el codigo: \n \n ${productosDispString}`;
    let productosApagar = +prompt(opcionesProductos);
    

 
 while (productosApagar > productosDisp.length | productosApagar < 1) {

        productosApagar= +prompt (`⚠️⚠️ ${nombre}  solo debes ingresar el codigo:  \n \n  ${productosDispString}`);  
    }  

    let indiceProducSelec = productosApagar-1;

    switch(primeraCompraCliente){
        case 1: descuentoAaplicar = 0.12; 
        break;
        case 2: descuentoAaplicar = 0.065;    
        default :0;
        break;
    }

    totalClienteAPagar= parseInt(precios[indiceProducSelec] * (1-descuentoAaplicar))

    alert(` ${nombre}!!\n \n solamente pagarás UYU ${totalClienteAPagar} por tu: \n ${descripcionProductoAPagar[indiceProducSelec]} 😎😎😎😎`);

    comprarOtroProducto = +prompt(
        "Aprovecha el descuento y comprate otro producto!! "+ "\n" + "\n" 
        +"Ingresa: 1-SI, vas a comprar Otro"+ "\n"
        +"Ingresa: 2-Si NO " 
    )

    while (comprarOtroProducto !==1 && comprarOtroProducto !== 2){
        comprarOtroProducto=+prompt(" ⚠️ Solo puedes ingresar las opciones (1) o (2)")

    }
};

mensajeDespedidaalert = alert(`${nombre }, gracias por tu compra 🤩🤗💪,\n te esperamos nuevamente!!`);










