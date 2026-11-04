const listaMenuPollitos = document.querySelector("#lista-menu-pollitos");
const listaMiMenu = document.querySelector("#lista-mi-menu");
const estadoMenuCliente = document.querySelector("#estado-menu-cliente");
const totalMiMenu = document.querySelector("#total-mi-menu");
const productosDeMiMenu = new Map();

function renderMenuCliente() {
  listaMenuPollitos.replaceChildren();
  listaMiMenu.replaceChildren();

  productos.forEach((producto) => {
    const item = document.createElement("li");
    item.className = "producto-menu";

    const detalle = document.createElement("div");
    detalle.className = "producto-menu-detalle";

    const nombre = document.createElement("strong");
    nombre.textContent = producto.nombre;

    const informacion = document.createElement("span");
    informacion.textContent =
      `${producto.categoria} · Bs ${producto.precio.toFixed(2)} · ${
        producto.disponible && producto.stock > 0
          ? `${producto.stock} disponibles`
          : "Agotado"
      }`;

    detalle.append(nombre, informacion);

    const boton = document.createElement("button");
    boton.type = "button";
    boton.dataset.accion = "agregar";
    boton.dataset.producto = producto.nombre;

    boton.textContent = "Agregar";
    boton.disabled = !producto.disponible || producto.stock <= 0;
    item.append(detalle, boton);
    listaMenuPollitos.append(item);
  });

  if (productosDeMiMenu.size === 0) {
    const mensaje = document.createElement("li");
    mensaje.className = "menu-vacio";
    mensaje.textContent = "Todavía no agregaste productos a tu menú.";
    listaMiMenu.append(mensaje);
  } else {
    productosDeMiMenu.forEach((cantidad, nombreProducto) => {
      const producto = productos.find((item) => item.nombre === nombreProducto);
      if (!producto) return;

      const item = document.createElement("li");
      item.className = "producto-menu";

      const detalle = document.createElement("div");
      detalle.className = "producto-menu-detalle";

      const nombre = document.createElement("strong");
      nombre.textContent = producto.nombre;

      const precio = document.createElement("span");
      precio.textContent =
        `${cantidad} × Bs ${producto.precio.toFixed(2)} = Bs ${(cantidad * producto.precio).toFixed(2)}`;
      detalle.append(nombre, precio);

      const acciones = document.createElement("div");
      acciones.className = "acciones-producto-menu";

      const botonReducir = document.createElement("button");
      botonReducir.type = "button";
      botonReducir.dataset.accion = "reducir";
      botonReducir.dataset.producto = producto.nombre;
      botonReducir.setAttribute("aria-label", `Restar una unidad de ${producto.nombre}`);
      botonReducir.textContent = "−";

      const boton = document.createElement("button");
      boton.type = "button";
      boton.className = "boton-quitar";
      boton.dataset.accion = "quitar";
      boton.dataset.producto = producto.nombre;
      boton.textContent = "Quitar";

      acciones.append(botonReducir, boton);
      item.append(detalle, acciones);
      listaMiMenu.append(item);
    });
  }

  let totalUnidades = 0;
  const total = [...productosDeMiMenu].reduce((suma, [nombreProducto, cantidad]) => {
    const producto = productos.find((item) => item.nombre === nombreProducto);
    totalUnidades += cantidad;
    return suma + (producto ? producto.precio * cantidad : 0);
  }, 0);

  totalMiMenu.textContent =
    `${totalUnidades} ${totalUnidades === 1 ? "unidad" : "unidades"} · Total: Bs ${total.toFixed(2)}`;
}

document.querySelector("#tablero").addEventListener("click", (event) => {
  const boton = event.target.closest("button[data-accion]");
  if (!boton) return;

  const nombreProducto = boton.dataset.producto;
  const producto = productos.find((item) => item.nombre === nombreProducto);
  if (!producto) return;

  if (boton.dataset.accion === "agregar") {
    if (!producto.disponible || producto.stock <= 0) {
      estadoMenuCliente.textContent = `${producto.nombre} no está disponible actualmente.`;
      return;
    }

    productosDeMiMenu.set(
      nombreProducto,
      (productosDeMiMenu.get(nombreProducto) || 0) + 1
    );
    estadoMenuCliente.textContent =
      `Se agregó una unidad de ${producto.nombre}.`;
  } else if (boton.dataset.accion === "reducir") {
    const cantidad = productosDeMiMenu.get(nombreProducto);
    if (!cantidad) return;

    if (cantidad === 1) {
      productosDeMiMenu.delete(nombreProducto);
    } else {
      productosDeMiMenu.set(nombreProducto, cantidad - 1);
    }
    estadoMenuCliente.textContent =
      `Se quitó una unidad de ${producto.nombre}.`;
  } else if (boton.dataset.accion === "quitar") {
    if (!productosDeMiMenu.has(nombreProducto)) return;

    productosDeMiMenu.delete(nombreProducto);
    estadoMenuCliente.textContent = `${producto.nombre} se quitó de Mi menú.`;
  }

  renderMenuCliente();
});

renderMenuCliente();
