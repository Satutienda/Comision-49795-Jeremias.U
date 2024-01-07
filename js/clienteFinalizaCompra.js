

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
    finalizarCompraBoton.textContent = "Listoo!! ahora voy a Finalizar !!";
    finalizarCompraCel.appendChild(finalizarCompraBoton);


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
            title: '¿Es tu primera compra aqui? 🧐🧐🧐',
            input: 'select',
            inputOptions: {
                "si" : 'Sí',
                "no" : 'No'
            },
            inputPlaceholder: 'Cuentanos!!',
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('¡Gracias por volver!', '¡Finalizaste tu compra!', 'success');
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Ok revisa y vuelve', '', 'error');
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



































