
let productosApagar;
let descripcionProductoAPagar;
let primeraCompraCliente=0;
let descuentoAaplicar=0;
let preciolista;
let mensajeDespedidaalert;


primeraCompraCliente = +prompt(
    "Ya casi finalizas tu compra y tenemos un regalo para ti 🤗🤩... "+ "\n" + "\n" 
    +"Ingresa: 1, Si es la PRIMERA vez que compras"+ "\n"
    +"Ingresa: 2, Si ya COMPRASTE ANTES "+ "\n" 

)

while (primeraCompraCliente !==1 && primeraCompraCliente  !== 2 ){
    primeraCompraCliente=+prompt("⚠️ Solo debes ingresar el número de la opción:"+ "\n"+ "\n"
    +"Ingresa: 1, Si es la PRIMERA vez que compras"+ "\n"
    +"Ingresa: 2, Si ya COMPRASTE ANTES "+ "\n" )

}   

if (primeraCompraCliente===1)
{
        alert("Gracias por elegirnos!!"+ "\n" + "\n" 
            +"Te damos la bienvenida a Satu tienda  😎💪"+ "\n"+ "\n"
            +"Nos pone contento tener clientes nuevos, por eso te damos un descuento del 12.3 % en esta compra🎉🎉🎉🎈🎈"          
        );
}
    else
{
        alert("Que bueno verte de nuevo!!"+ "\n" + "\n" 
            +"Gracias por seguir confiando en nosotros 🥰☺️"+ "\n"+ "\n"
            +"Aqui tu tienes tu descuento de 6.5 % 🎉🎉🎉🎈🎈 "          
        );


}


let comprarOtroProducto=1

while (comprarOtroProducto==1) {
    productosApagar = +prompt(
        "Selecciona los productos a pagar digitando el número correspondiente"+ "\n" + "\n" 
        +"1-Smartphone UYU 1.090 cada uno"+ "\n"
        +"2-Vestido de verano UYU 990 cada uno" + "\n" 
        +"3-Reloj de pared UYU 490 cada uno"+ "\n"
    )
    
    while (productosApagar !==1 && productosApagar  !== 2 && productosApagar  !== 3){
        productosApagar=+prompt("⚠️ Solo debes ingresar el Codigo:"+ "\n"+ "\n"
        +"1-Smartphone UYU 1.090 cada uno"+ "\n"
        +"2-Vestido de verano UYU 990 cada uno" + "\n" 
        +"3-Reloj de pared UYU 490 cada uno"+ "\n" )

    }   


    switch(productosApagar){
        case 1: preciolista=1090; 
        break;
        case 2: preciolista=990; 
        break;
        case 3: preciolista=490; 
        break;
        default : alert("No seleccionaste un producto a pagar");
        break;
    }

    switch(productosApagar){
        case 1: descripcionProductoAPagar="Smartphone"; 
        break;
        case 2: descripcionProductoAPagar="Vestido de verano"; 
        break;
        case 3: descripcionProductoAPagar="Reloj de pared"; 
        break;
        default : alert("No seleccionaste un producto a pagar");
        break;
    }
    
    switch(primeraCompraCliente){
        case 1: descuentoAaplicar = 0.12; 
        break;
        case 2: descuentoAaplicar = 0.065;    
        default :0;
        break;
    }

    totalClienteAPagar= parseFloat(preciolista * (1-descuentoAaplicar))


    alert("Solamente pagarás "+ " " + "UYU "+ totalClienteAPagar+ " por tu "+descripcionProductoAPagar+" 😎😎😎😎");

    comprarOtroProducto = +prompt(
        "Aprovecha el descuento y comprate otro producto!! "+ "\n" + "\n" 
        +"Ingresa: 1-SI, vas a comprar Otro"+ "\n"
        +"Ingresa: 2-Si NO " 
    )

    while (comprarOtroProducto !==1 && comprarOtroProducto !== 2){
        comprarOtroProducto=+prompt(" ⚠️ Solo puedes ingresar las opciones (1) o (2)")

    }


};

mensajeDespedidaalert = alert("Gracias por tu compra 🤩🤗💪, te esperamos nuevamente !");










