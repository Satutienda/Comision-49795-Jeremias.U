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
    this.precioImp = parseFloat(prod.precioUYU  * (1-IVA));
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
    const formularioAgregarProducto = document.getElementById('formularioProducto');

    formularioAgregarProducto.addEventListener('submit', function(event) {
        event.preventDefault();
        const nombreNuevoProducto = document.getElementById('nombreProducto').value;
        const precioNuevoProducto = parseFloat(document.getElementById('precioProducto').value);

        if (!isNaN(precioNuevoProducto)) {
            const nuevoProducto = {
                id: listaProdAlmacenada.length + 1,
                nombreProd: nombreNuevoProducto,
                precioUYU: precioNuevoProducto
            };

        listaProdAlmacenada.push(nuevoProducto);

        guardarLocal('listaArtLocal', JSON.stringify(listaProdAlmacenada));
        console.log(JSON.parse(localStorage.getItem('listaArtLocal')));
        actualizarTabla();
        formularioAgregarProducto.reset();
    }else {
        console.error("el precio no es un numero valido.");
    }
    });

    actualizarTabla();



function actualizarTabla() {
    const listaProdAlmacenada = JSON.parse(localStorage.getItem('listaArtLocal')) || [];
    console.log(listaProdAlmacenada);

    const listaProductos = listaProdAlmacenada.map((obj) => new Producto(obj));
    const tablaProductosElement = document.getElementById('tablaProductos');
    const tablaBootstrap = document.createElement('table');
        tablaBootstrap.classList.add('table');
        const cabecera = document.createElement('thead');
    cabecera.innerHTML = `
            <tr>
                <th>ID</th>
                <th>Nombre del Producto</th>
                <th>Precio S/Imp</th>
                <th>IVA 22% </th>
                <th>Precio C/Imp </th>
            </tr>
        `;
        tablaBootstrap.appendChild(cabecera);
        
        const cuerpo = document.createElement('tbody');
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
    tablaBootstrap.appendChild(cuerpo);
    tablaProductosElement.innerHTML = '';
    tablaProductosElement.appendChild(tablaBootstrap);
}
actualizarTabla();
});












