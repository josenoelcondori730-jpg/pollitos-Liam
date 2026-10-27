const $estado = document.querySelector("#estado");
const listaRemota = document.querySelector("#lista-remota");

function validarCatalogo(datos) {
  if (
    !datos ||
    typeof datos !== "object" ||
    !datos.negocio ||
    typeof datos.negocio.nombre !== "string" ||
    !Array.isArray(datos.productos)
  ) {
    throw new Error("El catálogo recibido tiene un formato no válido.");
  }

  const productosValidos = datos.productos.every(producto =>
    producto &&
    typeof producto.nombre === "string" &&
    typeof producto.precio === "number" &&
    Number.isFinite(producto.precio) &&
    typeof producto.unidad === "string" &&
    typeof producto.disponible === "boolean" &&
    typeof producto.stock === "number" &&
    Number.isFinite(producto.stock)
  );

  if (!productosValidos) {
    throw new Error("Uno o más productos tienen datos no válidos.");
  }

  return datos.productos;
}

// ── 1. JSON ─────────────────────────────────────────────────────────────
const textoJson = '{"nombre":"Pan integral","precio":1.5,"disponible":true}';
const objeto = JSON.parse(textoJson);
console.log(objeto.precio, typeof objeto.precio);
console.log(JSON.stringify(objeto));

// ── 2. LOS TRES ESTADOS ─────────────────────────────────────────────────
function mostrarEstado(texto, tipo = "info") {
  $estado.textContent = texto;
  $estado.className = tipo;
}

function pintarRemoto(productos) {
  listaRemota.innerHTML = "";
  productos.forEach(producto => {
    const art = document.createElement("article");
    art.classList.add("tarjeta");
    if (!producto.disponible) art.classList.add("agotado");

    const titulo = document.createElement("h3");
    titulo.textContent = producto.nombre;

    const precio = document.createElement("p");
    precio.classList.add("precio");
    const unidad = producto.unidad ? ` / ${producto.unidad}` : "";
    precio.textContent = `Bs ${producto.precio.toFixed(2)}${unidad}`;

    const stock = document.createElement("p");
    stock.classList.add("stock");
    stock.textContent = producto.disponible ? `${producto.stock} en stock` : "Agotado";

    art.append(titulo, precio, stock);
    listaRemota.append(art);
  });
}

function mostrarCatalogoLocal(motivo) {
  if (!Array.isArray(productos) || productos.length === 0) {
    mostrarEstado(motivo, "error");
    listaRemota.innerHTML = "";
    return;
  }

  pintarRemoto(productos);
  mostrarEstado(`${motivo} Se muestra el menú local (${productos.length} productos).`, "error");
}

// ── 3. fetch Y async/await ──────────────────────────────────────────────
async function cargarConFetch(url = "datos.json") {
  mostrarEstado("Cargando...", "cargando");

  try {
    const respuesta = await fetch(new URL(url, document.baseURI));

    if (!respuesta.ok) {
      throw new Error(`El servidor respondió ${respuesta.status}`);
    }

    const datos = await respuesta.json();
    const productos = validarCatalogo(datos);
    pintarRemoto(productos);

    mostrarEstado(`${productos.length} productos de ${datos.negocio.nombre}`, "ok");

  } catch (error) {
    const mensaje = error instanceof Error ? error.message : "Error desconocido.";
    mostrarCatalogoLocal(`No se pudo cargar el catálogo del proveedor (${mensaje}).`);
  }
}

document.querySelector("#cargar-fetch")
  .addEventListener("click", () => cargarConFetch());

document.querySelector("#cargar-roto")
  .addEventListener("click", () => cargarConFetch("no-existe.json"));

// ── 4. LO MISMO CON jQUERY ──────────────────────────────────────────────
$("#cargar-jquery").on("click", function () {
  mostrarEstado("Cargando con jQuery...", "cargando");
  listaRemota.innerHTML = "";

  $.getJSON("datos.json")
    .done(function (datos) {
      try {
        const productos = validarCatalogo(datos);
        pintarRemoto(productos);
        mostrarEstado(`${productos.length} productos (vía jQuery)`, "ok");
      } catch (error) {
        const mensaje = error instanceof Error ? error.message : "Error desconocido.";
        mostrarCatalogoLocal(`El catálogo del proveedor tiene datos no válidos (${mensaje}).`);
      }
    })
    .fail(function (jqXHR) {
      mostrarCatalogoLocal(`Falló la carga del proveedor (HTTP ${jqXHR.status}).`);
    })
    .always(function () {
      console.log("La petición terminó, con éxito o sin él.");
    });
});

// Muestra el catálogo al abrir la página sin obligar al usuario a pulsar un botón.
cargarConFetch();

// ── 5. QUÉ ES UNA PROMESA ───────────────────────────────────────────────

// ── 6. LA PESTAÑA NETWORK ───────────────────────────────────────────────
