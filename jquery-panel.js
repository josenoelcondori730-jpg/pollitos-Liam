// ── 1. .on() ES LA FORMA ÚNICA ──────────────────────────────────────────
$("#menu-toggle").on("click", function () {
  const $menu = $("#menu-movil");

  $menu.slideToggle(200);

  const abierto = $(this).attr("aria-expanded") === "true";
  $(this).attr("aria-expanded", !abierto);
});

// ── 2. DELEGACIÓN, EN UNA LÍNEA ─────────────────────────────────────────
$("#acordeon").on("click", ".titulo", function () {
  const $titulo = $(this);
  const $cuerpo = $titulo.next(".cuerpo");

  $cuerpo.stop(true, true).slideToggle(200);

  $titulo.attr("aria-expanded", $titulo.attr("aria-expanded") !== "true");

  $("#acordeon .cuerpo").not($cuerpo).stop(true, true).slideUp(200);
  $("#acordeon .titulo").not($titulo).attr("aria-expanded", "false");
});

// ── 3. LOS EFECTOS ──────────────────────────────────────────────────────

// ── 4. .each() Y EL ESCALONADO ──────────────────────────────────────────
let avisosVisibles = false;

$("#mostrar-avisos").on("click", function () {
  if (!avisosVisibles) {
    // Resetea y muestra escalonado
    $("#avisos li").stop(true, true).hide();
    $("#avisos li").each(function (indice) {
      $(this).delay(indice * 120).fadeIn(250);
    });
    $(this).text("Ocultar avisos");
    avisosVisibles = true;
  } else {
    $("#avisos li").stop(true, true).fadeOut(200);
    $(this).text("Mostrar avisos");
    avisosVisibles = false;
  }
});

// ── 5. .animate(), PARA LO QUE NO CUBRE UN EFECTO ───────────────────────

// ── 6. UNA FUNCIÓN PROPIA QUE DEVUELVE LA SELECCIÓN ─────────────────────
function resaltar($seleccion, milisegundos = 1200) {
  $seleccion.addClass("resaltado");
  setTimeout(() => $seleccion.removeClass("resaltado"), milisegundos);
  return $seleccion;
}

resaltar($("#panel h2")).css("letter-spacing", "0.5px");
