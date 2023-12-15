/*============================Trabajo Sobre el localStore ======================================================*/

const ListaProductosExiste = [
    { id: 1, nombreProd: "Smartphone", precioUYU: 1090 },
    { id: 2, nombreProd: "Vestido de verano", precioUYU: 990 },
    { id: 3, nombreProd: "Reloj de pared", precioUYU: 490 },
    { id: 4, nombreProd: "Reloj de mano para hombre", precioUYU: 690 }
];

 const guardarLocal = (clave, valor) => {
    localStorage.setItem(clave, valor);
};
for (const producto of ListaProductosExiste) {
    guardarLocal(producto.id, JSON.stringify(producto));
}
guardarLocal("listaArtLocal", JSON.stringify(ListaProductosExiste)); 
// Definino la Clase Producto

Dto=0
const IVA=0.22
class Producto {
constructor(prod) {
    this.id = prod.id;
    this.nombreProd = prod.nombreProd.toUpperCase();
    this.precioUYU = parseFloat(prod.precioUYU);
    this.Imp = parseFloat(prod.precioUYU  * IVA);
    this.precioImp = parseFloat(prod.precioUYU  * (1-Dto));
}

}
/*============================Trabajo Sobre el filter ======================================================*/


const selectElement = document.getElementById('IdprodStorage');
const listaProdAlmacenada = JSON.parse(localStorage.getItem('listaArtLocal')) || [];
const listaProductos = listaProdAlmacenada.map((obj) => new Producto(obj));

for (const producto of listaProdAlmacenada) {
    const option = document.createElement('option');
    option.value = producto.id; 
    option.text = producto.nombreProd;
    selectElement.appendChild(option);
    }     




/*============================Trabajo Sobre la Tabla======================================================*/

document.addEventListener('DOMContentLoaded', function() {
    // Obtener el formulario y agregar un evento de escucha para el envío
    const formularioAgregarProducto = document.getElementById('formularioAgregarProducto');
    formularioAgregarProducto.addEventListener('submit', function(event) {
        event.preventDefault();

        // Obtener valores del formulario
        const nombreNuevoProducto = document.getElementById('nombreNuevoProducto').value;
        const precioNuevoProducto = parseFloat(document.getElementById('precioNuevoProducto').value);

        // Crear un nuevo objeto del producto
        const nuevoProducto = {
            id: listaProdAlmacenada.length + 1, // Nuevo ID basado en la longitud actual de la lista
            nombreProd: nombreNuevoProducto,
            precioUYU: precioNuevoProducto
        };

        // Agregar el nuevo producto a la lista
        listaProdAlmacenada.push(nuevoProducto);

        // Almacenar la lista actualizada en localStorage
        guardarLocal('listaArtLocal', JSON.stringify(listaProdAlmacenada));

        // Actualizar la tabla en la página
        actualizarTabla();

        // Limpiar el formulario
        formularioAgregarProducto.reset();
    });

    // Función para actualizar la tabla con los productos actuales
    function actualizarTabla() {
        // Obtener la lista actualizada de productos desde localStorage
        const listaProdAlmacenada = JSON.parse(localStorage.getItem('listaArtLocal')) || [];

        // Crear una nueva lista de productos usando la clase Producto
        const listaProductos = listaProdAlmacenada.map((obj) => new Producto(obj));

        // Obtener la tabla y su cuerpo
        const tablaProductosElement = document.getElementById('tablaProductos');
        const cuerpo = document.createElement('tbody');

        // Agregar filas con los productos
        for (const producto of listaProductos) {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${producto.id}</td>
                <td>${producto.nombreProd}</td>
                <td>${producto.precioUYU.toFixed(2)}</td>
                <td>${producto.Imp.toFixed(2)}</td>
                <td>${producto.precioImp.toFixed(2)}</td>
            `;
            cuerpo.appendChild(fila);
        }

        // Limpiar la tabla y agregar el cuerpo actualizado
        tablaProductosElement.innerHTML = '';
        tablaProductosElement.appendChild(cuerpo);
    }

    // Llamar a la función para inicializar la tabla al cargar la página
    actualizarTabla();
});













