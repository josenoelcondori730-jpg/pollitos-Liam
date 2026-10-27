# [Pollos Liam]

**Estudiante:** [Jose Noel Condori Fernandez]

**Cliente:** [Negocio pollos Liam]

**URL publicada:** [DESPUES, PROXIMA SEMANA]

## Qué resuelve
[2-3 frases: 1.el cliente tiene problemas con los pedidios, este sitio ayuda a que los pedidos sean mucho mas faciles de realizar

2.los clientes de pollos Liam no saben el menu que tiene, entonces esta pagina muestra los menus del dia]

## Cómo está construido
- **Semántica:** [1-header: Para el encabezado,o barra de navegación.

2-main: Para el contenido principal.

3-section: Para secciones temáticas (por ejemplo, sección del menú del día, sección de contacto, seccion de horarios y seccion de direccion).

4-article: para el plato que se tiene.

5-aside: para poner una curiosidad sobre pollos Liam.
 
6-footer: Para mostrar los contactos y direccion.

7-div: se uso para agrupar elementos como texto e imagenes.

8-table: para mostrar el menu y relacionarlo con los precios.]

- **Layout:** [Se utilizó flexbox para alinear los bloques, imagenes para mandarlo a un costado, donde grid me permitio organizar elementos en filas y columnas al mismo tiempo.]
- **Diseño:** [Se utilizo una paleta de colores de rojo y amarillo ya que este es un color que se usa mucho en este tipo de negocios, en la tipografia se uso segoe ui debido a que este es formal y legible. ]

## Catálogo del proveedor
La sección **Catálogo del proveedor** carga los productos de `datos.json` usando `fetch` o jQuery. Para usar estas funciones, abre el proyecto mediante un servidor local (por ejemplo, la extensión Live Server de VS Code); abrir `index.html` directamente como archivo puede bloquear las solicitudes HTTP.

## Capturas
![Escritorio](cap1.png)
![Móvil 375px](ruta/a/captura-movil.png) DESPUES, PROXIMA SEMANA

## Lo más difícil
[El problema que tuve fue con el logo, este al insertarlo tenia un tamaño no adecuado y se reolvio con  un, width="400" height="300"]
## Laboratorio 2: Funcionalidades Añadidas (JavaScript y Multimedia)

A continuación se detallan las funcionalidades implementadas en el proyecto para convertirlo en una aplicación web interactiva y modular:

### 1. Catálogo Dinámico de Productos con Imágenes (`datos.js`)
Se estructuró un catálogo completo mediante un arreglo de 10 objetos que representan los productos del restaurante.
Cada objeto contiene atributos detallados como nombre, precio unitario, categoría, stock en inventario, disponibilidad, descripción y la ruta a su fotografía correspondiente.
### 2. Renderizado Automático del DOM e Integración Visual (`render.js`)
Se implementó un sistema de renderizado modular que genera el marcado de las tarjetas de forma 100% dinámica sin escribir código HTML manual.
La función `crearTarjeta` construye elementos `<article>` accesibles con la imagen optimizada del producto, su descripción, precio formateado y disponibilidad actual.
### 3. Buscador en Tiempo Real por Texto (`eventos.js`)
Se programó un escuchador para el evento `input` en el campo de búsqueda de productos que reacciona de manera instantánea a lo que escribe el usuario.
El texto ingresado se evalúa en minúsculas contra los nombres del catálogo, permitiendo coincidencias rápidas sin importar cómo esté escrita la palabra.
La vista del menú se actualiza al instante mientras se escribe, informando a través de un mensaje accesible la cantidad exacta de productos encontrados en cada momento.
### 4. Filtrado Interactivo por Categorías (`eventos.js`)
Se incorporó una botonera de categorías ("Todos", "Platos", "Snacks", "Guarniciones" y "Bebidas") gestionada mediante delegación de eventos.
Al hacer clic en cualquier categoría, el botón seleccionado adquiere un estilo activo distintivo y se filtran exclusivamente los platos correspondientes.
### 5. Validación y Confirmación Interactiva de Pedidos (`eventos.js`)
Se implementó la captura y control del evento `submit` del formulario de pedidos utilizando `event.preventDefault()` para evitar recargas innecesarias.
Se incluyó una validación lógica con la API de validación nativa (`reportValidity` y `setCustomValidity`) para impedir que se seleccionen fechas de entrega anteriores al día de hoy.
### 6. Control Dinámico de Inventario y Notificaciones (`app.js` y `funciones.js`)
Se diseñó la lógica para el cálculo y presentación dinámica del stock de pollos en vitrina reflejado directamente en el encabezado.
Se crearon funciones de orden superior, funciones flecha y closures contadores (`crearContador`) para registrar las ventas y pedidos de forma modular.

## Laboratorio 3: Integración de la Librería jQuery

Se incorporó la librería **jQuery** para simplificar y optimizar la manipulación del DOM, gestión de eventos y encadenamiento (chaining):

### 1. Inclusión de la Librería
- Se añadió la librería `jquery.min.js` (versión 3.7.1) al proyecto y se enlazó en `index.html` antes de los scripts de la aplicación.

### 2. Notificación de Stock (`app.js`)
- Se implementó la selección y modificación del texto de stock con `$(function() { $("#aviso-stock").text(...); });`.

### 3. Renderizado Dinámico de Tarjetas (`render.js`)
- Selección simplificada con `$contenedor = $("#lista-productos")` y `$titulos = $("h2")`.
- Creación de elementos con chaining: `$("<article>").addClass("tarjeta").toggleClass("agotado", !p.disponible).attr("data-nombre", p.nombre).html(...)`.
- Vaciado e inserción del catálogo con `$contenedor.empty()` y `$contenedor.append(...)`.

### 4. Búsqueda, Filtrado y Formulario (`eventos.js`)
- Búsqueda en tiempo real con `$buscador.on("input", ...)`.
- Delegación de eventos ágil en filtros con `$filtros.on("click", "button", ...)`.
- Control y validación del formulario con `$formulario.on("submit", ...)` y `$fecha.one("input", ...)`.

### 5. Demostración y Comparativa (`jquery-comparado.js`)
- Se implementó una sección interactiva en la página y se completaron los bloques de espera al DOM y manipulación de clases, comparando Vanilla JS contra jQuery.


 
