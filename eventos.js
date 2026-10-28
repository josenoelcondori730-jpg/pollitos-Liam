// ── 1. SELECCIÓN DE ELEMENTOS CON JQUERY ────────────────────────────────
const $buscador = $("#buscador");
const $filtros = $("#filtros");
const $resultado = $("#resultado");
const $formulario = $("form");

let categoriaActiva = "todos";
let textoBuscado = "";

// ── 2. FUNCIÓN REACTIVA DE FILTRADO CON JQUERY ($.grep) ─────────────────
function actualizar() {
  const visibles = $.grep(productos, function (p) {
    const coincideCategoria = (categoriaActiva === "todos" || p.categoria === categoriaActiva);
    const coincideTexto = p.nombre.toLowerCase().indexOf(textoBuscado.toLowerCase()) !== -1;
    return coincideCategoria && coincideTexto;
  });

  if (typeof preferencias !== "undefined" && preferencias.orden === "precio") {
    visibles.sort((a, b) => a.precio - b.precio || a.nombre.localeCompare(b.nombre));
  } else {
    visibles.sort((a, b) => a.nombre.localeCompare(b.nombre));
  }

  render(visibles);

  // Mensaje accesible y contador con jQuery
  $resultado.text(`Mostrando ${visibles.length} de ${productos.length} productos`);
}

// ── 3. FUNCIÓN DE PEDIDO DIRECTO DESDE TARJETAS CON JQUERY ──────────────
function seleccionarProductoEnFormulario(nombreProducto) {
  const $select = $("#producto");
  let encontrado = false;

  // Recorrer las opciones con el método .each() de jQuery
  $select.find("option").each(function () {
    const textoOpcion = $(this).text().toLowerCase();
    const valOpcion = $(this).val().toLowerCase();
    const busqueda = nombreProducto.toLowerCase();

    if (textoOpcion.includes(busqueda) || busqueda.includes(textoOpcion) || valOpcion.includes(busqueda)) {
      $(this).prop("selected", true);
      encontrado = true;
      return false; // Break del bucle $.each
    }
  });

  // Si no estaba en el select estático, jQuery crea y agrega la opción dinámicamente
  if (!encontrado) {
    $("<option>")
      .val(nombreProducto)
      .text(nombreProducto)
      .prop("selected", true)
      .appendTo($select);
  }

  // Desplazamiento suave con animación jQuery hacia el formulario
  $("html, body").stop().animate({
    scrollTop: $("#pedido").offset().top - 20
  }, 500);

  // Efecto visual de resaltado temporal con jQuery
  $select
    .css({ outline: "3px solid var(--color-principal)", transition: "outline 0.3s ease" })
    .delay(1000)
    .queue(function (next) {
      $(this).css("outline", "");
      next();
    });
}

// ── 4. EVENTOS DE BÚSQUEDA Y FILTRADO CON JQUERY ────────────────────────
$(function () {
  // Render inicial al cargar el DOM
  actualizar();

  // Escuchar entrada en tiempo real en el buscador con .on("input")
  $buscador.on("input", function () {
    textoBuscado = $.trim($(this).val());
    actualizar();
  });

  // Delegación de eventos ágil en la botonera de categorías
  $filtros.on("click", "button", function () {
    const $boton = $(this);
    categoriaActiva = $boton.data("categoria");

    // Alternar clases activas usando encadenamiento de jQuery
    $filtros.find("button").removeClass("activo");
    $boton.addClass("activo");

    actualizar();
  });

  // ── 5. PROCESAMIENTO Y VALIDACIÓN DEL FORMULARIO CON JQUERY ───────────
  $formulario.on("submit", function (event) {
    event.preventDefault();

    const formElement = this;
    if (!formElement.reportValidity()) {
      return;
    }

    // Validación de fecha no anterior a hoy con jQuery
    const $fecha = $("#fecha");
    const fechaElement = $fecha[0];
    if (fechaElement) {
      const hoy = new Date().toISOString().slice(0, 10);
      if ($fecha.val() < hoy) {
        fechaElement.setCustomValidity("La fecha de entrega no puede ser anterior a hoy.");
        fechaElement.reportValidity();

        // Escuchar una sola vez con .one() para limpiar el error
        $fecha.one("input", function () {
          fechaElement.setCustomValidity("");
        });
        return;
      }
    }

    // Serialización limpia de campos mediante jQuery .serializeArray()
    const arrayCampos = $(this).serializeArray();
    const datos = {};
    $.each(arrayCampos, function (_, campo) {
      datos[campo.name] = campo.value;
    });

    console.log("Pedido procesado y enviado con jQuery:", datos);

    // Notificación animada de éxito con jQuery (.hide() y .fadeIn())
    $resultado
      .hide()
      .html(`✅ <strong>¡Pedido registrado!</strong> Gracias <em>${datos.nombre || "cliente"}</em>, tu orden de <strong>${datos.cantidad}x ${datos.producto}</strong> está en preparación. Nos comunicaremos al teléfono indicado.`)
      .css({ color: "#2d6a4f", backgroundColor: "#d8f3dc", padding: "0.8rem", borderRadius: "4px" })
      .fadeIn(500);

    // Limpieza de campos del formulario
    formElement.reset();
  });
});

// ── 6. VALIDACIONES COMPLEMENTARIAS CON EXPRESIONES REGULARES ───────────
const PATRONES = {
  telefono: /^[0-9]{7,8}$/,
  correo: /^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i,
  ci: /^[0-9]{5,10}(-[0-9A-Za-z]{1,3})?$/,
};

console.log("Validación de teléfono local:", PATRONES.telefono.test("63050938"));
