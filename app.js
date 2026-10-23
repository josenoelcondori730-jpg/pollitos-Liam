// ── 1. CONSTANTES Y CONFIGURACIÓN ───────────────────────────────────────
const negocio = "Pollos Liam";
const anioFundacion = 1998;

// ── 2. VARIABLES DE ESTADO ──────────────────────────────────────────────
let pollosEnVitrina = 40;
pollosEnVitrina = 35;

// ── 3. TIPOS Y PRECIOS BASE ─────────────────────────────────────────────
const precioPollo = 17;
const abiertoHoy = true;
const promocionDelDia = null;
let telefono = "63050938";

// ── 4. TEMPLATE LITERAL ─────────────────────────────────────────────────
const resumen = `${negocio} abrió en ${anioFundacion} y hoy quedan ${pollosEnVitrina} pollos.`;
console.log(resumen);

// ── 5. INTEGRACIÓN Y CONTROL TOTAL DEL DOM CON JQUERY ───────────────────
$(function () {
  console.log("jQuery inicializado correctamente. Versión:", $.fn.jquery);

  // 1. Inyección de aviso de stock dinámico con animación fadeIn
  $("#aviso-stock")
    .hide()
    .html(`🍗 <strong>Aviso:</strong> Hoy quedan <em>${pollosEnVitrina} pollos</em> disponibles en vitrina.`)
    .fadeIn(700);

  // 2. Desplazamiento suave (smooth scroll) en todos los enlaces de navegación
  $("nav a").on("click", function (event) {
    const destino = $(this).attr("href");
    if (destino && destino.startsWith("#")) {
      const $seccion = $(destino);
      if ($seccion.length) {
        event.preventDefault();
        $("html, body").stop().animate({
          scrollTop: $seccion.offset().top - 20
        }, 500);
      }
    }
  });

  // 3. Efectos interactivos con jQuery sobre la tabla de horarios y precios
  $("table tbody tr").hover(
    function () {
      $(this).addClass("fila-hover");
    },
    function () {
      $(this).removeClass("fila-hover");
    }
  );

  // 4. Efecto sutil sobre el bloque aside con jQuery
  $("aside")
    .css("cursor", "pointer")
    .on("mouseenter", function () {
      $(this).addClass("resaltado");
    })
    .on("mouseleave", function () {
      $(this).removeClass("resaltado");
    });
});
