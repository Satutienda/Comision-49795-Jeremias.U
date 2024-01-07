async function fetchData() {
    const url = 'https://weatherapi-com.p.rapidapi.com/current.json?q=-34.9011,-56.1915';
    const apiKey = '2551ee8410mshfa262de6b09cd9dp192857jsnf7469f51ad86';

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        displayData(data);
    } catch (error) {
        console.error(error);
    }
}

function displayData(data) {
    const regionElement = document.getElementById('region');
    const countryElement = document.getElementById('country');
    const tempCElement = document.getElementById('tempC');

    regionElement.textContent = data.location.region;
    countryElement.textContent = data.location.country;
    tempCElement.textContent = `${data.current.temp_c}°C`;
}
fetchData();

async function ListaProductosExiste() {
    const response = await fetch("https://satutienda.github.io/Comision-49795-Jeremias.U/productos.json");
    if (response.ok) {
        return await response.json();
    } else {
        console.log("Existe un error al consultar los datos código " + response.status);
        return [];
    }
}

function guardarLocal(clave, valor) {
    const productosGuardados = JSON.parse(localStorage.getItem(clave)) || [];
    productosGuardados.push(valor);
    localStorage.setItem(clave, JSON.stringify(productosGuardados));
}

function mostrarTabla() {
    const tablaProductos = document.getElementById("tablaProductos");
    tablaProductos.innerHTML = '';

    const productosGuardados = JSON.parse(localStorage.getItem("productosSeleccionados")) || [];

    let totalGeneral = 0;

    productosGuardados.forEach((producto, index) => {
        const fila = document.createElement("tr");
        const productoObj = JSON.parse(producto);

        const imagenCel = document.createElement("td");
        const imagen = document.createElement("img");
        imagen.src = productoObj.ImagPpal || '';
        imagen.alt = 'Imagen del producto';
        imagen.style.width = '50px';
        imagen.style.height = '50px';
        imagen.style.borderRadius = "50%";
        imagen.style.objectFit = "cover"
        imagenCel.appendChild(imagen);
        fila.appendChild(imagenCel);

        const nombreCel = document.createElement("td");
        nombreCel.textContent = productoObj.nombreSatu;
        fila.appendChild(nombreCel);

        const precioCel = document.createElement("td");
        precioCel.textContent = productoObj.precioLista || '';
        fila.appendChild(precioCel);

        const cantidadCel = document.createElement("td");
        cantidadCel.textContent = productoObj.cantidad || '';
        fila.appendChild(cantidadCel);

        const totalCel = document.createElement("td");
        const total = calcularTotal(productoObj.precioLista, productoObj.cantidad);
        totalCel.textContent = total || '';
        fila.appendChild(totalCel);

        const eliminarCel = document.createElement("td");
        const eliminarBoton = document.createElement("button");
        eliminarBoton.className = "btn btn-danger btn-sm";
        eliminarBoton.textContent = "Eliminar";
        eliminarCel.appendChild(eliminarBoton);
        fila.appendChild(eliminarCel);

        eliminarBoton.addEventListener("click", function () {
            eliminarFilaYLocalStorage(index);
        });

        if (total) {
            totalGeneral += parseFloat(total);
        }

        tablaProductos.appendChild(fila);
    });

    // Resumen con total general 
    const filaTotal = document.createElement("tr");
    const totalGeneralCel = document.createElement("td");
    totalGeneralCel.colSpan = 5;
    totalGeneralCel.style.textAlign = 'right';
    totalGeneralCel.textContent = 'Total General: ' + totalGeneral.toFixed(2);
    filaTotal.appendChild(totalGeneralCel);
    tablaProductos.appendChild(filaTotal);

    // Creo el boton filanizar compra
    const finalizarCompraCel = document.createElement("td");
    const finalizarCompraBoton = document.createElement("button");
    finalizarCompraBoton.className = "btn btn-info btn-lm";
    finalizarCompraBoton.textContent = "Listoo, hagamoslo!!";

    if (totalGeneral>0) {
        finalizarCompraCel.appendChild(finalizarCompraBoton);
    }

    finalizarCompraBoton.addEventListener("click", function () {
        mostrarSweetAlert();
    });

    const filaBoton = document.createElement("tr");
    const celdaVacia = document.createElement("td");
    celdaVacia.colSpan = 1;
    filaBoton.appendChild(celdaVacia);
    filaBoton.appendChild(finalizarCompraCel);

    tablaProductos.appendChild(filaBoton);


    function eliminarFilaYLocalStorage(index) {
        productosGuardados.splice(index, 1);
        localStorage.setItem("productosSeleccionados", JSON.stringify(productosGuardados));
        mostrarTabla();
    }

    function calcularTotal(precioLista, cantidad) {
        if (precioLista && cantidad) {
            return (parseFloat(precioLista) * parseInt(cantidad)).toFixed(2);
        }
        return '';
    }
    function mostrarSweetAlert() {
        Swal.fire({
            title: '¿Es tu primera compra aqui? \n 🧐🧐🧐',

            showCancelButton: true,
            buttonsStyling: false,
            confirmButtonText: 'Soy nuevo',
            cancelButtonText: 'Ya soy cliente',
            background: " url()",
            color: "#fafafc",
            customClass: {
                confirmButton: 'btn btn-success mr-2',
                cancelButton: 'btn btn-info mr-2'
            },
            allowOutsideClick: false
        }).then((result) => {
            console.log(result)
            if (result.isConfirmed) {
                Swal.fire({
                    title: `Bienvenido!!! 💪🎈🎉 para recibirte, te preparamos este gran descuento!! \n 
                       ahora pagaras: ${totalGeneral * 0.6} UYU `,
                    showCancelButton: true,
                    confirmButtonText: 'Ok, hagamoslo !!',
                    cancelButtonText: 'cancelar',
                    width: '70%',
                    padding: "3em",
                    color: "#fafafc",
                    background: " url()",
                    backdrop: `
                        rgba(0,0,123,0.5) 
                        url("https://media0.giphy.com/media/hy2Jy1wFR3j3xqigyO/giphy.gif")
                        center top 
                        no-repeat
                    `
                }).then((prepago) => {
                    console.log(prepago)
                    if (prepago.isConfirmed) {
                        Swal.fire({
                            title: `Confirmar el pago de: ${totalGeneral * 0.6} UYU `,
                            showCancelButton: true,
                            confirmButtonText: 'Confirmar',
                            cancelButtonText: 'Cancelar',
                            width: '70%',
                            padding: "3em",
                            color: "#fafafc",
                            background: " url()",

                        }).then((pagofinal) => {
                            console.log(pagofinal)
                            if (pagofinal.isConfirmed) {

                                localStorage.removeItem('productosSeleccionados');
                                mostrarTabla();
                                Swal.fire({
                                    title: `Gracias por tu compra !! te esperamos nuevamente`,

                                    confirmButtonText: 'Gracias',
                                    width: '70%',
                                    padding: "3em",
                                    color: "#fafafc",
                                    background: " url()",

                                })


                            }
                        }
                        )
                    }
                })
            } else {
                Swal.fire({
                    title: `Nos encanta que regreses ❤️🥰, este es un descuento para ti \n 
                    ahora pagaras: ${totalGeneral * 0.8} UYU `,
                    showCancelButton: true,
                    confirmButtonText: 'Ok, hagamoslo !!',
                    cancelButtonText: 'cancelar',
                    width: '70%',
                    padding: "3em",
                    color: "#fafafc",
                    background: " url()",
                    backdrop: `
                        rgba(0,0,123,0.5) 
                        url("https://media2.giphy.com/media/qofcu0xRAuNmJohZdk/giphy.gif")
                        center top 
                        no-repeat
                    `
                }).then((prepago) => {
                    console.log(prepago)
                    if (prepago.isConfirmed) {
                        Swal.fire({
                            title: `Confirmar el pago de: ${totalGeneral * 0.8} UYU `,
                            showCancelButton: true,
                            confirmButtonText: 'Confirmar',
                            cancelButtonText: 'Cancelar',
                            width: '70%',
                            padding: "3em",
                            color: "#fafafc",
                            background: " url()",

                        }).then((pagofinal) => {
                            console.log(pagofinal)
                            if (pagofinal.isConfirmed) {

                                localStorage.removeItem('productosSeleccionados');
                                mostrarTabla();
                                Swal.fire({
                                    title: `Gracias por tu compra !! te esperamos nuevamente`,

                                    confirmButtonText: 'Gracias',
                                    width: '70%',
                                    padding: "3em",
                                    color: "#fafafc",
                                    background: " url()",

                                })


                            }
                        }
                        )
                    }
                })

            }
        });
    }
}

document.getElementById("guardarEnLocalStorage").addEventListener("click", async function () {
    guardarProductoEnLocalStorage();
});

document.getElementById("miFormulario").addEventListener("submit", function (event) {
    event.preventDefault();
    guardarProductoEnLocalStorage();
});

async function guardarProductoEnLocalStorage() {
    const selectProductos = document.getElementById("productosDisp");
    const cantidadInput = document.getElementById("cantidad");

    const selectedValue = selectProductos.value;
    const cantidad = cantidadInput.value;

    if (selectedValue && cantidad) {
        const productos = await ListaProductosExiste();
        const selectedProduct = productos.find(producto => producto.nombreSatu === selectedValue);

        if (selectedProduct) {

            selectedProduct.cantidad = cantidad;


            guardarLocal("productosSeleccionados", JSON.stringify(selectedProduct));
            Swal.fire({
                icon: 'success',
                title: '¡Bien hecho!',
                text: 'Agregaste un producto al carrito🎉❤️. ¡Vamos por otro!💪💪💪',
                timer: 1800, // El tiempo en milisegundos antes de cerrar automáticamente
                showConfirmButton: false // No mostrar el botón de confirmación
            });
            mostrarTabla();
        } else {
            alert("No se encontró información para el producto seleccionado.");
        }
    } else {
        alert("Por favor, selecciona un producto y especifica la cantidad.");
    }
}

ListaProductosExiste().then(productos => {
    const selectProductos = document.getElementById("productosDisp");

    productos.forEach(producto => {
        const option = document.createElement("option");
        option.value = producto.nombreSatu;
        option.text = producto.nombreSatu;
        selectProductos.appendChild(option);
    });
});

mostrarTabla();



































