// ── 1. SELECCIÓN DE CONTENEDORES Y ELEMENTOS CON JQUERY ────────────────
const $contenedor = $("#lista-productos");
const $titulos = $("h2");

console.log("Contenedor de productos detectado por jQuery:", $contenedor.length > 0);
console.log("Cantidad de títulos h2 en la página:", $titulos.length);

// ── 2. CONSTRUCCIÓN PURA DE TARJETAS CON JQUERY Y CHAINING ──────────────
function crearTarjeta(producto) {
  // 1. Crear el contenedor <article> y asignar atributos y clases con jQuery
  const $articulo = $("<article>")
    .addClass("tarjeta")
    .toggleClass("agotado", !producto.disponible)
    .attr("data-nombre", producto.nombre)
    .attr("data-categoria", producto.categoria);

  // 2. Crear la imagen si existe
  if (producto.imagen) {
    $("<img>")
      .attr("src", producto.imagen)
      .attr("alt", producto.nombre)
      .attr("loading", "lazy")
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
      .text("Pedir este plato")
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

// ── 3. PATRÓN RENDER TOTALMENTE GESTIONADO POR JQUERY ───────────────────
function render(lista) {
  // Limpiar el contenedor con el método .empty() de jQuery
  $contenedor.empty();

  if (!lista || lista.length === 0) {
    $("<p>")
      .addClass("sin-productos")
      .text("No se encontraron productos disponibles con ese criterio.")
      .appendTo($contenedor);
    return;
  }

  // Iterar y montar las tarjetas usando $.each de jQuery
  $.each(lista, function (_, producto) {
    const $tarjeta = crearTarjeta(producto);
    $contenedor.append($tarjeta);
  });
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
