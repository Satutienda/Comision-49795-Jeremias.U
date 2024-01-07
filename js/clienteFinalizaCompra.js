

async function ListaProductosExiste() {
    const response = await fetch("../productos.json");
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

    productosGuardados.forEach(producto => {
        const fila = document.createElement("tr");

        const productoObj = JSON.parse(producto);

        // Celda para la imagen principal
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

        // Celda para el nombre
        const nombreCel = document.createElement("td");
        nombreCel.textContent = productoObj.nombreSatu;
        fila.appendChild(nombreCel);

        // Celda para el precio
        const precioCel = document.createElement("td");
        precioCel.textContent = productoObj.precioLista || '';
        fila.appendChild(precioCel);

        // Celda para la cantidad
        const cantidadCel = document.createElement("td");
        cantidadCel.textContent = productoObj.cantidad || '';
        fila.appendChild(cantidadCel);

        const totalCel = document.createElement("td");
        const total = calcularTotal(productoObj.precioLista, productoObj.cantidad);
        totalCel.textContent = total || '';
        fila.appendChild(totalCel);

        if (total) {
            totalGeneral += parseFloat(total);
        }

        tablaProductos.appendChild(fila);
    });

    function calcularTotal(precioLista, cantidad) {
        if (precioLista && cantidad) {
            return (parseFloat(precioLista) * parseInt(cantidad)).toFixed(2);
        }
        return '';
    }

    // agrego al fila con Total 
    const filaTotal = document.createElement("tr");
    const totalGeneralCel = document.createElement("td");
    totalGeneralCel.colSpan = 4; 
    totalGeneralCel.style.textAlign = 'right';
    totalGeneralCel.textContent = 'Total General: ' + totalGeneral.toFixed(2);
    filaTotal.appendChild(totalGeneralCel);

    tablaProductos.appendChild(filaTotal);
    
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
            alert("Producto y cantidad guardados en localStorage.");
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



































