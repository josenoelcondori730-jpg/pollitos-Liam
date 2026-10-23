// ── 1. COMPROBAR QUE CARGÓ ──────────────────────────────────────────────
console.log("jQuery versión:", typeof $ !== "undefined" ? $.fn.jquery : "No cargó jQuery");

// ── 2. ESPERAR AL DOM ───────────────────────────────────────────────────
// En Vanilla JS:
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM listo con Vanilla JS (DOMContentLoaded)");
});

// En jQuery:
$(document).ready(function () {
  console.log("DOM listo con jQuery ($(document).ready)");
});
// Forma equivalente abreviada en jQuery: $(function () { ... });

// ── 3. SELECCIONAR ──────────────────────────────────────────────────────
const vanillaP = document.querySelector("#salida-vanilla");
const jqueryP = $("#salida-jquery");

console.log("vanilla es un elemento:", vanillaP instanceof HTMLElement);
console.log("jQuery es una colección de", jqueryP.length);

if (vanillaP) {
  console.log("mismo elemento:", $(vanillaP)[0] === vanillaP);
}

// ── 4. LEER Y ESCRIBIR CONTENIDO ────────────────────────────────────────
if (vanillaP) {
  vanillaP.textContent = "Cambiado con vanilla: document.querySelector + textContent";
}
jqueryP.text("Cambiado con jQuery: $() + .text()");

// ── 5. CLASES ───────────────────────────────────────────────────────────
// En Vanilla JS: .classList.add(), .remove(), .toggle(), .contains()
if (vanillaP) {
  vanillaP.classList.add("prueba-clase");
  vanillaP.classList.remove("prueba-clase");
}

// En jQuery: .addClass(), .removeClass(), .toggleClass(), .hasClass()
jqueryP.addClass("prueba-clase").removeClass("prueba-clase");

// ── 6. EVENTOS ──────────────────────────────────────────────────────────
const botonVanilla = document.querySelector("#boton-vanilla");
if (botonVanilla && vanillaP) {
  botonVanilla.addEventListener("click", () => {
    vanillaP.classList.toggle("resaltado");
  });
}

$("#boton-jquery").on("click", function () {
  $(this).closest("section").find("#salida-jquery").toggleClass("resaltado");
});

// ── 7. CHAINING ─────────────────────────────────────────────────────────
$("#salida-jquery")
  .addClass("destacado")
  .attr("data-origen", "jquery")
  .css("cursor", "pointer");

if (vanillaP) {
  vanillaP.classList.add("destacado");
  vanillaP.setAttribute("data-origen", "vanilla");
  vanillaP.style.cursor = "pointer";
}

// ── 8. LA COMPARACIÓN QUE IMPORTA ───────────────────────────────────────
console.log("Tarjetas que ve jQuery:", $(".tarjeta").length);
console.log("Tarjetas que ve vanilla:", document.querySelectorAll(".tarjeta").length);
