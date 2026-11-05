// ── 1. SELECCIÓN DE CONTENEDORES Y ELEMENTOS CON JQUERY ────────────────
const $contenedor = $("#lista-productos");
const $productosDots = $("#productos-dots");
const $titulos = $("h2");
let indiceProductoActivo = 0;

console.log("Contenedor de productos detectado por jQuery:", $contenedor.length > 0);
console.log("Cantidad de títulos h2 en la página:", $titulos.length);

// ── 2. CONSTRUCCIÓN PURA DE TARJETAS CON JQUERY Y CHAINING ──────────────
function crearTarjeta(producto) {
  // 1. Crear el contenedor <article> y asignar atributos y clases con jQuery
  const $articulo = $("<article>")
    .addClass("tarjeta")
    .toggleClass("agotado", !producto.disponible)
    .attr("data-nombre", producto.nombre)
    .attr("data-categoria", producto.categoria)
    .attr("role", "group")
    .attr("aria-roledescription", "diapositiva");

  // 2. Crear la imagen si existe
  if (producto.imagen) {
    $("<img>")
      .attr("src", producto.imagen)
      .attr("alt", producto.nombre)
      .attr("loading", "lazy")
      .attr("draggable", "false")
      .addClass("tarjeta-img")
      .appendTo($articulo);
  }

  // 3. Crear el contenedor de información
  const $info = $("<div>").addClass("tarjeta-info");

  // 4. Crear elementos de texto con jQuery (.text() previene XSS)
  $("<h3>").text(producto.nombre).appendTo($info);

  if (producto.descripcion) {
    $("<p>").addClass("descripcion").text(producto.descripcion).appendTo($info);
  }

  $("<p>")
    .addClass("precio")
    .text(`Bs ${producto.precio.toFixed(2)}`)
    .appendTo($info);

  $("<p>")
    .addClass("stock")
    .text(producto.disponible ? `${producto.stock} en stock` : "Agotado")
    .appendTo($info);

  // 5. Botón interactivo para ordenar con jQuery
  if (producto.disponible) {
    $("<button>")
      .attr("type", "button")
      .addClass("btn-seleccionar")
      .text("Pedir")
      .on("click", function (e) {
        e.stopPropagation();
        if (typeof seleccionarProductoEnFormulario === "function") {
          seleccionarProductoEnFormulario(producto.nombre);
        }
      })
      .appendTo($info);
  } else {
    $("<button>")
      .attr("type", "button")
      .addClass("btn-agotado")
      .attr("disabled", true)
      .text("Agotado")
      .appendTo($info);
  }

  $articulo.append($info);
  return $articulo;
}

function actualizarIndicadorProductos() {
  const tarjetas = $contenedor.children(".tarjeta");
  if (!tarjetas.length || !$contenedor[0].clientWidth) return;

  indiceProductoActivo = Math.max(
    0,
    Math.min(
      Math.round($contenedor[0].scrollLeft / $contenedor[0].clientWidth),
      tarjetas.length - 1
    )
  );
  $productosDots.children().attr("aria-current", "false")
    .eq(indiceProductoActivo).attr("aria-current", "true");
}

function irAProducto(indice) {
  const cantidad = $contenedor.children(".tarjeta").length;
  if (!cantidad) return;

  indiceProductoActivo = (indice + cantidad) % cantidad;
  $contenedor[0].scrollLeft = indiceProductoActivo * $contenedor[0].clientWidth;
  actualizarIndicadorProductos();
}

function actualizarCarruselProductos() {
  const tarjetas = $contenedor.children(".tarjeta");
  const cantidad = tarjetas.length;
  const mostrarControles = cantidad > 1;

  $productosDots.empty();
  $("#producto-anterior, #producto-siguiente, #productos-dots").prop("hidden", !mostrarControles);

  tarjetas.each(function (indice) {
    const nombre = $(this).attr("data-nombre");
    $(this).attr("aria-label", `Producto ${indice + 1} de ${cantidad}: ${nombre}`);
    $("<button>")
      .attr("type", "button")
      .addClass("productos-carrusel-dot")
      .attr("aria-label", `Ver ${nombre}`)
      .attr("aria-current", String(indice === 0))
      .attr("data-indice", indice)
      .appendTo($productosDots);
  });

  indiceProductoActivo = 0;
  $contenedor[0].scrollLeft = 0;
}

// ── 3. PATRÓN RENDER TOTALMENTE GESTIONADO POR JQUERY ───────────────────
function render(lista) {
  // Limpiar el contenedor con el método .empty() de jQuery
  $contenedor.empty();

  if (!lista || lista.length === 0) {
    $("<p>")
      .addClass("sin-productos")
      .text("No se encontraron productos disponibles con ese criterio.")
      .appendTo($contenedor);
    actualizarCarruselProductos();
    return;
  }

  // Iterar y montar las tarjetas usando $.each de jQuery
  $.each(lista, function (_, producto) {
    const $tarjeta = crearTarjeta(producto);
    $contenedor.append($tarjeta);
  });
  actualizarCarruselProductos();
}

// ── 4. RENDERIZADO INICIAL Y EXPLORACIÓN DEL ÁRBOL DOM ───────────────────
$(function () {
  render(productos);

  // Navegación en el árbol DOM con métodos de jQuery: .first(), .parent(), .attr()
  const $primera = $(".tarjeta").first();
  if ($primera.length) {
    console.log("Padre de la primera tarjeta:", $primera.parent().attr("id"));
    console.log("Primer producto renderizado:", $primera.attr("data-nombre"));
  }
});
