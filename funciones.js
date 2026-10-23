// ── 1. COERCIÓN Y TIPOS ─────────────────────────────────────────────────
console.log("5" + 3);
console.log("5" - 3);
console.log(Number("5") + 3);

// ── 2. VALORES FALSY ────────────────────────────────────────────────────
console.log(Boolean(0), Boolean(""), Boolean("0"), Boolean([]));

// ── 3. CONTROL DE FLUJO ─────────────────────────────────────────────────
let stock = 12;
const estado = stock > 0 ? "disponible" : "agotado";
console.log("Estado inicial:", estado);

const precios = [15.00, 17.00, 12.00];

// ── 4. FUNCIONES: TRES FORMAS DE DECLARACIÓN ────────────────────────────
function totalDeclarada(precio, cantidad) { 
  return precio * cantidad;
}

const totalExpresion = function (precio, cantidad) {
  return precio * cantidad;
};

const calcularTotal = (precio, cantidad) => precio * cantidad;

console.log("Totales calculados:", totalDeclarada(17, 2), totalExpresion(17, 2), calcularTotal(17, 2));

// ── 5. ARROW FUNCTIONS ──────────────────────────────────────────────────
const doble = (n) => n * 2;

const aplicarDescuento = (total, porcentaje) => {
  const descuento = total * (porcentaje / 100);
  return total - descuento;
};

const conImpuesto = (monto, tasa = 13) => monto * (1 + tasa / 100);

console.log("Descuento Bs 100 - 20%:", aplicarDescuento(100, 20));
console.log("Con IVA (13%):", conImpuesto(100).toFixed(2));

// ── 6. SCOPE Y CLOSURE ────────────────────────────────────────────────── 
function crearContador() {
  let cuenta = 0;
  return () => {
    cuenta = cuenta + 1;
    return cuenta;
  };
}

const pollosVendidos = crearContador();
const combosVendidos = crearContador();

console.log("Ventas registradas:", pollosVendidos(), pollosVendidos());

// ── 7. UTILIDADES AVANZADAS DE JQUERY ───────────────────────────────────
// jQuery no solo manipula el DOM, también ofrece funciones utilitarias globales:

// $.type: Detección precisa de tipos
console.log("Tipo detectado con jQuery:", $.type(precios), $.type(calcularTotal), $.type("Pollos Liam"));

// $.map: Transformación de colecciones
const preciosFormateados = $.map(precios, function (val) {
  return `Bs ${val.toFixed(2)}`;
});
console.log("Precios formateados con jQuery $.map:", preciosFormateados);

// $.grep: Filtrado de arreglos similar a Array.filter
const preciosAltos = $.grep(precios, function (val) {
  return val >= 15;
});
console.log("Precios >= 15 con jQuery $.grep:", preciosAltos);

// $.trim: Limpieza de espacios en blanco
const entradaUsuario = "   broaster especial   ";
console.log("Texto limpio con jQuery $.trim:", `'${$.trim(entradaUsuario)}'`);

// $.extend: Fusión y clonación profunda de objetos
const configuracionDefecto = { entrega: "inmediata", delivery: true, propina: 0 };
const pedidoCliente = { propina: 5, notas: "Salsa tártara extra" };
const pedidoFinal = $.extend({}, configuracionDefecto, pedidoCliente);
console.log("Objeto fusionado con jQuery $.extend:", pedidoFinal);
