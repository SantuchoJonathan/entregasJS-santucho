//e-Commerce Ferreteria

class herramienta {
    constructor(id, nombre, precio, image) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.image = image;
    }
}

//herramientas
const herramientas0 = new herramienta(0, "Alicate", 2145, "./image/Alicate.jpg");
const herramientas1 = new herramienta(1, "Tenaza", 2856, "./image/Tenaza.jpg");
const herramientas2 = new herramienta(2, "Pelacables", 6047, "./image/Pelacable.jpg");
const herramientas3 = new herramienta(3, "Pinza Punta Plana", 2270, "./image/PinzaPuntaPlana.jpg");
const herramientas4 = new herramienta(4, "Pico de Loro", 2972, "./image/PicoLoro.jpg");
const herramientas5 = new herramienta(5, "Llave de Fuerza", 2486, "./image/LlavedeFuerza.jpg");
const herramientas6 = new herramienta(6, "Arco de Sierra", 4562, "./image/ArcodeSierra.jpg");
const herramientas7 = new herramienta(7, "Cutter Reforzado", 1565, "./image/CutterReforzado.jpg");
const herramientas8 = new herramienta(8, "Destornillador Philips", 492, "./image/Destornillador.jpg");
const herramientas9 = new herramienta(9, "Llave para Caños", 3877, "./image/Llaveparacaños.png");

const herramientas = [
    herramientas0,
    herramientas1,
    herramientas2,
    herramientas3,
    herramientas4,
    herramientas5,
    herramientas6,
    herramientas7,
    herramientas8,
    herramientas9,
];

const parrafo1 = document.querySelector("#parrafos1");

herramientas.forEach((prodArray) => {
    parrafo1.innerHTML += `
             <div class="card divProductos text-center" >
                 <img src=${prodArray.image} class="card-img-top" alt="Imagen de ${prodArray.nombre}">
                    <div class="card-body">
                         <h5 class="card-title">Producto: ${prodArray.nombre}</h5>
                         <p class="card-text">Precio: $ ${prodArray.precio}</p>
                         <button class="btn btn-primary" id=${prodArray.id}>Comprar</button>
                    </div>
             </div>
        `;

});

const botonComprar = document.querySelectorAll(".btn-primary");
const compraTotal = document.querySelector("#totalCompra");
const botonCarrito = document.querySelector("#botonCarrito");
const contenedorCarrito = document.querySelector("#contenedorCarrito");
const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

botonComprar.forEach(boton => {
    boton.onclick = () => {

        const producto = herramientas.find((producto) => producto.id === parseInt(boton.id));

        const productoCarrito = { ...producto, cantidad: 1 }

        const indexCarrito = carrito.findIndex(prod => prod.id === productoCarrito.id)

        if (indexCarrito === -1) {
            carrito.push(productoCarrito)
        } else {
            carrito[indexCarrito].cantidad++
        }

        alert(`Se agrego al carrito de compra, el siguiente producto: \n${producto.nombre}, con un importe de $ ${producto.precio}.`)

        localStorage.setItem('carrito', JSON.stringify(carrito))
        location.reload()
    }

})

carrito.forEach((productos) => {

    let carritoContent = document.createElement("div")
    carritoContent.className = "modal-content";
    carritoContent.innerHTML = `
            <p> ${productos.cantidad}</p>
            <p> ${productos.nombre}</p>
            <p> $ ${productos.precio}</p>
            
            `
    contenedorCarrito.append(carritoContent)

    const total = carrito.reduce((acum, prod) => acum + prod.precio * prod.cantidad, 0)

    compraTotal.innerHTML = `${total}`

})

const vaciarCarrito = document.querySelector("#vaciarCarrito")

vaciarCarrito.onclick = () => {
    localStorage.clear()
    location.reload()

}

const botonFinalizarCompra = document.querySelector("#finalizarCompra")

botonFinalizarCompra.onclick = () => {
    alert("Compra Finalizada. Muchas gracias por elegirnos")
    localStorage.clear()
    location.reload()
}
