//e-Commerce Ferreteria

const cuerpoProductos = document.querySelector("#cuerpoProductos");

const consultarProductos = async () => {
  const response = await fetch("./pages/productos.json");
  const productos = await response.json();
  return productos;
};

consultarProductos().then((productos) => {
  productos.forEach((prodArray) => {
    cuerpoProductos.innerHTML += `
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
  const contenedorCarrito = document.querySelector("#contenedorCarrito");
  const contadorCarrito = document.querySelector("#contadorCarrito");
  const compraTotal = document.querySelector("#totalCompra");
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  function visualizarCarrito() {
    contenedorCarrito.innerHTML = " ";
    carrito.forEach((productos) => {
      const carritoContent = document.createElement("div");
      carritoContent.className = "modal-content";
      carritoContent.innerHTML = `
                <p class="numero"> ${productos.cantidad} </p>
                <p class="producto"> ${productos.nombre}</p>
                <p class="precio"> $ ${productos.precio}</p>
                <button class="btn btn-danger" type="button" id="${productos.id}">Eliminar</button>
            `;
      contenedorCarrito.append(carritoContent);

      function totalCompra() {
        const total = carrito.reduce(
          (acum, prod) => acum + prod.precio * prod.cantidad,
          0
        );

        compraTotal.innerHTML = `${total}`;
      }

      totalCompra();

      //numero de articulos agregados
      const contador = carrito.reduce((a, b) => a + b.cantidad, 0);

      contadorCarrito.innerHTML = `${contador}`;

      //boton Eliminar producto
      const botonRemove = document.querySelectorAll(".btn-danger");
      botonRemove.forEach((eliminar) => {
        eliminar.onclick = () => {
          Swal.fire({
            title: "Esta seguro que desea eliminar el articulo seleccionado?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, borralo!",
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire("Articulo Borrado!");

              const productoBorrar = carrito.find(
                (p) => p.id === parseInt(eliminar.id)
              );

              carrito = carrito.filter((carritoId) => {
                return carritoId !== productoBorrar;
              });

              visualizarCarrito();
              totalCompra();

              localStorage.setItem("carrito", JSON.stringify(carrito));
              location.reload();
            }
          });
        };
      });
    });
  }

  visualizarCarrito();

  botonComprar.forEach((boton) => {
    boton.onclick = () => {
      const producto = productos.find((p) => p.id === parseInt(boton.id));

      const productoCarrito = { ...producto, cantidad: 1 };

      const indexCarrito = carrito.findIndex(
        (prod) => prod.id === productoCarrito.id
      );

      if (indexCarrito === -1) {
        carrito.push(productoCarrito);
      } else {
        carrito[indexCarrito].cantidad++;
      }

      Swal.fire({
        position: "top",
        icon: "success",
        title: `Se agrego al carrito de compra, el siguiente producto: \n${producto.nombre}, con un importe de $ ${producto.precio}.`,
        showConfirmButton: true,
        timer: 3500,
      });

      visualizarCarrito();

      localStorage.setItem("carrito", JSON.stringify(carrito));
    };
  });

  const vaciarCarrito = document.querySelector("#vaciarCarrito");

  vaciarCarrito.onclick = () => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Carrito Vaciado",
      showConfirmButton: false,
      timer: 1500,
    });

    setTimeout(() => {
      localStorage.clear();
      location.reload();
    }, 1530);
  };

  const botonFinalizarCompra = document.querySelector("#finalizarCompra");

  botonFinalizarCompra.onclick = () => {
    Swal.fire({
      title: "Compra Finalizada. Muchas gracias por elegirnos",
      icon: "success",
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmado",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        location.reload();
      }
    });
  };
  //informacion de carrito vacio al pasar el mouse por "ver carrito"
  let botonVerCarrito = document.querySelector("#botonCarrito");
  let infoCarrito = document.querySelector("#infoCarrito");

  botonVerCarrito.onmouseover = () => {
    infoCarrito.style.display = "block";

    const infoContador = carrito.map((e) => {
      if (e.id === 0) {
        infoCarrito.innerHTML = `Este carrito se encuentra vacio`;
      } else if (e.id >= 1) {
        infoCarrito.innerHTML = ` `;
        infoCarrito.style.display = "none";
      }
    });
  };

  botonVerCarrito.onmouseout = () => {
    infoCarrito.style.display = "none";
  };
});
