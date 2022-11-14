//e-Commerce Ferreteria

class herramienta {
  constructor(id, nombre, stock, precio) {
    this.id = id;
    this.nombre = nombre;
    this.stock = stock;
    this.precio = precio;
  }
}

//herramientas
const herramientas0 = new herramienta(0, "Alicate", 10, 2145);
const herramientas1 = new herramienta(1, "Tenaza", 10, 2856);
const herramientas2 = new herramienta(2, "Pelacables", 10, 6047);
const herramientas3 = new herramienta(3, "Pinza Punta Plana", 10, 2270);
const herramientas4 = new herramienta(4, "Pico de Loro", 10, 2972);
const herramientas5 = new herramienta(5, "Llave de Fuerza", 10, 2486);
const herramientas6 = new herramienta(6, "Arco de Sierra", 10, 4562);
const herramientas7 = new herramienta(7, "Cutter Reforzado", 10, 1565);
const herramientas8 = new herramienta(8, "Destornillador Philips", 10, 492);
const herramientas9 = new herramienta(9, "Llave para Caños", 10, 3877);

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

let productosOfrecidos =
  "Bienvenido! \nTenemos para ofrecerle las siguientes Herramientas: ";

const carrito = [];

let productosdeCarrito = `Los productos que seleccionaste son los siguientes: `;
let precioCarrito = 0;

function infoCarrito() {
  for (seleccion of carrito) {
    productosdeCarrito += `\n - ${seleccion.nombre} con un costo de $ ${seleccion.precio}`;
    precioCarrito += seleccion.precio;
  }

  alert(
    `\n${productosdeCarrito} \nEl total de su compra es de $ ${precioCarrito}`
  );
}

function agreCarrito() {
  for (articulo of herramientas) {
    productosOfrecidos += `\n ${articulo.id} - ${articulo.nombre} - ${articulo.precio} `;
  }
  productosOfrecidos += `\n Ingrese numero de articulo que desee`;

  let itemIngresado = parseInt(prompt(productosOfrecidos));

  if (itemIngresado >= herramientas.length) {
    alert(`Por favor Ingrese valores entre 0 y ${herramientas.length}`);
    agreCarrito();
  } else if (itemIngresado <= herramientas.length) {
    const producto = herramientas.find(
      (producto) => producto.id === itemIngresado
    );
    carrito.push(producto);
    let confirmacion = parseInt(
      prompt(
        `Se agrego al carrito de compra, el siguiente producto: \n${producto.nombre}, con un importe de $ ${producto.precio}. \nSi desea seguir comprando, digite numero 1, caso contrario 2`
      )
    );

    if (confirmacion == 1) {
      agreCarrito();
    } else if (confirmacion === 2) {
      alert(
        `Muchas Gracias por su compra. \nA continuacion, se les brindara un detalle de la compra realizada.`
      );
    }
  }
}
agreCarrito();
infoCarrito();
