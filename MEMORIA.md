# Memoria Técnica del Proyecto: Pollos Liam

---

## 1. Ficha Técnica del Proyecto

| Campo | Detalle |
| :--- | :--- |
| **Nombre del Proyecto** | Sistema Web Interactivo y Catálogo Digital "Pollos Liam" |
| **Desarrollador / Estudiante** | Jose Noel Condori Fernandez |
| **Cliente / Beneficiario** | Restaurante y Broastería "Pollos Liam" |
| **Ubicación** | Av. La Paz, Colquencha |
| **Contacto del Negocio** | Tel. 63050938 |
| **Año de Fundación** | 1998 |
| **Versión del Documento** | 1.2 (27 de Octubre de 2026) |
| **Tecnologías Principales** | HTML5 Semántico, CSS3 (Grid & Flexbox), JavaScript ES6+, jQuery 3.7.1 |

---

## 2. Introducción y Justificación

### 2.1. Contexto del Problema
El restaurante de comida rápida "Pollos Liam", ubicado en el municipio de Colquencha, presentaba desafíos constantes en su atención al público:
1. **Falta de visibilidad del menú diario:** Los clientes no disponían de un canal visual actualizado para consultar los platos del día, porciones, guarniciones y precios.
2. **Inconsistencias y demoras en los pedidos:** La toma de órdenes se realizaba de manera desordenada, requiriendo un canal interactivo claro con selección de ítems, cantidades, fechas y horarios de entrega.
3. **Comunicación de disponibilidad de stock:** Existía desconexión entre el inventario disponible en vitrina y lo que los comensales solicitaban.

### 2.2. Solución Planteada
Se desarrolló una aplicación web interactiva, moderna y 100% responsiva que:
- Digitaliza el menú completo clasificado por categorías (Platos, Snacks, Guarniciones y Bebidas).
- Muestra el stock y disponibilidad en tiempo real con distintivos dinámicos.
- Ofrece búsqueda instantánea por texto y filtrado por categoría sin recargas de página.
- Permite seleccionar un producto directamente desde su tarjeta para cargarlo automáticamente en el formulario de pedidos.
- Aplica la librería **jQuery 3.7.1** de forma integral a todos los módulos (manipulación DOM, animaciones, navegación fluida, eventos y utilidades).
- Incluye una sección de catálogo del proveedor que consulta datos JSON mediante `fetch` o jQuery e informa los estados de carga y error.
- Cuenta con un formulario con validación estricta de fechas y campos requeridos.

---

## 3. Arquitectura y Stack Tecnológico

```mermaid
graph TD
    A[Usuario / Navegador] --> B[index.html - Marcado Semántico]
    B --> C[estilos.css - Variables, Grid & Interactividad]
    B --> D[Lógica de la Aplicación]
    
    subgraph Capa Lógica (jQuery 3.7.1 + ES6)
        D --> E[jquery.min.js - Librería Núcleo DOM]
        D --> F[datos.js - Catálogo de Productos & Clases POO]
        D --> G[funciones.js - Lógica, Closures & Utilidades jQuery]
        D --> H[app.js - Estado Global, Aviso Animado & Navegación Suave]
        D --> I[render.js - Construcción Pura de Tarjetas con jQuery]
        D --> J[eventos.js - Búsqueda, Filtros Reactivos & Submit Serializado]
        D --> K[remoto.js - Peticiones fetch y jQuery]
        K --> L[datos.json - Catálogo JSON del proveedor]
    end
```

### 3.1. Tecnologías Empleadas
- **HTML5:** Marcado semántico estructurado (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<figure>`, `<table>`, `<form>`, `<aside>`, `<footer>`).
- **CSS3:** Sistema de diseño con variables personalizadas (`:root`), modelo de caja estandarizado (`box-sizing: border-box`), maquetación con **Flexbox** y **CSS Grid**, media queries adaptables y estilos para estados de interacción (`.btn-seleccionar`, `.fila-hover`, `.resaltado`).
- **JavaScript (ES6+):** Programación funcional, destructuración, funciones flecha, closures y programación orientada a objetos (clases con herencia).
- **jQuery 3.7.1:** Adopción plena en toda la aplicación para manipulación fluida del DOM, encadenamiento (*chaining*), delegación de eventos, animaciones de transición (`fadeIn`, `animate`) y funciones utilitarias globales (`$.grep`, `$.each`, `$.map`, `$.trim`, `$.type`, `$.extend`).

---

## 4. Estructura y Descripción de Módulos

### 4.1. Árbol de Archivos del Proyecto
```
proyect_1_NOEL_1/
├── index.html                   # Documento principal y estructura semántica limpia
├── estilos.css                  # Estilos responsivos, variables CSS e interactividad
├── datos.js                     # Base de datos local (10 productos), métodos funcionales y POO
├── funciones.js                 # Lógica de cálculo, closures y utilidades globales de jQuery
├── app.js                       # Estado global, aviso animado de stock y navegación fluida
├── render.js                    # Generación pura de elementos DOM y tarjetas con jQuery
├── eventos.js                   # Búsqueda reactiva, filtros, pedido asistido y submit serializado
├── remoto.js                    # Carga el catálogo externo con fetch y jQuery
├── datos.json                   # Datos JSON del catálogo del proveedor
├── jquery.min.js                # Librería jQuery versión 3.7.1 (distribución local)
├── logo-pollos-liam.png         # Logotipo oficial del restaurante
├── pollitos.jpg / pollitos-2.jpg# Fotografías de presentación y catálogo
├── imagenes/                    # Directorio de recursos gráficos de los productos
├── ERRORES Y ARREGLOS...txt     # Bitácora histórica de resolución de problemas
├── MEMORIA.md                   # Memoria técnica completa y actualizada
└── README.md                    # Documentación introductoria del repositorio
```

---

## 5. Descripción Detallada de los Módulos de Código

### 5.1. `datos.js` (Estructura de Datos y Modelado)
- **Catálogo de Productos:** Arreglo de 10 productos con atributos completos: `nombre`, `precio`, `categoria`, `stock`, `disponible`, `descripcion` e `imagen`.
- **Métodos Funcionales Modernos:** `map()`, `filter()`, `reduce()`, `sort()`, `some()`, `every()` y `find()`.
- **Programación Orientada a Objetos:**
  - Clase `Producto`: Métodos `estaDisponible()` y `valorEnStock()`.
  - Clase `ProductoConDescuento` (Herencia): Atributo `descuento` y método `precioFinal()`.

### 5.2. `funciones.js` (Lógica de Negocio y Utilidades jQuery)
- **Fundamentos de JavaScript:** Declaración de funciones (declaradas, expresiones y funciones flecha), coerción y control de flujo.
- **Closures:** Implementación de `crearContador()` para registrar ventas independientes (`pollosVendidos`, `combosVendidos`).
- **Utilidades Globales de jQuery Integradas:**
  - `$.type()`: Identificación exacta del tipo de datos.
  - `$.map()`: Transformación y mapeo rápido de colecciones.
  - `$.grep()`: Filtrado funcional de arreglos.
  - `$.trim()`: Saneamiento y limpieza de cadenas de texto.
  - `$.extend()`: Fusión y clonación profunda de configuraciones y objetos de pedidos.

### 5.3. `app.js` (Configuración, Navegación y Aviso de Stock)
- **Ciclo de Vida:** Controlado íntegramente mediante el manejador DOM Ready de jQuery `$(function () { ... })`.
- **Aviso de Stock con Animación:** Inyección y visualización fluida mediante `.hide().html(...).fadeIn(700)`.
- **Desplazamiento Suave (*Smooth Scroll*):** Intercepta los enlaces del menú de navegación (`$("nav a")`) y realiza una transición animada suave con `$("html, body").stop().animate({ scrollTop: ... }, 500)`.
- **Efectos Interactivos Adicionales:** Resaltado de filas en la tabla de horarios con `.hover()` y efecto visual en el bloque `<aside>`.

### 5.4. `render.js` (Motor de Renderizado Puro con jQuery)
- **Construcción Pura con jQuery:** Las tarjetas de producto ya no concatenan cadenas HTML desprotegidas; se crean mediante llamadas nativas de jQuery:
  ```javascript
  const $articulo = $("<article>")
    .addClass("tarjeta")
    .toggleClass("agotado", !producto.disponible)
    .attr("data-nombre", producto.nombre)
    .attr("data-categoria", producto.categoria);
  ```
- **Botón de Pedido Asistido:** Cada producto disponible genera un botón `<button class="btn-seleccionar">Pedir este plato</button>` que activa la selección automática en el formulario de compras.
- **Renderizado Eficiente:** Limpieza del contenedor con `$contenedor.empty()` y montaje secuencial con `$.each()`.

### 5.5. `eventos.js` (Interactividad, Filtrado y Formulario)
- **Buscador en Tiempo Real:** Filtra mediante `$.grep()` de jQuery mientras el usuario escribe en el campo de texto (`#buscador.on("input")`).
- **Delegación de Eventos en Categorías:** Botonera gestionada con `$filtros.on("click", "button", ...)` y alternancia de clases activas mediante encadenamiento.
- **Función `seleccionarProductoEnFormulario(nombreProducto)`:**
  - Busca la opción coincidente en el `<select id="producto">` utilizando `$select.find("option").each(...)`.
  - Si el producto no figuraba previamente en el select, jQuery lo crea e inserta dinámicamente con `$("<option>").appendTo(...)`.
  - Realiza desplazamiento suave al formulario y resalta el campo temporalmente.
- **Validación y Envío del Formulario:**
  - Prevención de recarga (`event.preventDefault()`).
  - Validación de fecha mínima (bloquea fechas pasadas) mediante `.one("input", ...)` y la API de validez.
  - Serialización estructurada de todos los campos con `$(this).serializeArray()`.
  - Notificación animada de confirmación con `.hide().html(...).fadeIn(500)`.

### 5.6. Retiro de los Botones de Comparación y Consolidación de jQuery
En versiones previas del laboratorio existía una sección comparativa que contrastaba Vanilla JS con jQuery. Siguiendo las directrices del proyecto:
- Se retiró la sección `#comparacion-jquery` y sus botones de prueba de [index.html](file:///c:/Users/WINDOWS%2011%20PRO/OneDrive/Desktop/proyect_1_NOEL_1/index.html).
- Se eliminó el enlace correspondiente en la barra de navegación.
- Se eliminaron las reglas CSS obsoletas y se añadieron estilos de interacción real (`.btn-seleccionar`, `.btn-agotado`, `.fila-hover`).
- Se adoptó jQuery en el 100% de los componentes visuales y funcionales de la aplicación.

### 5.7. `remoto.js` y catálogo del proveedor
- `index.html` incluye la sección `#remoto` dentro del contenido principal, con controles para probar `fetch`, jQuery y una respuesta de error.
- `remoto.js` consulta `datos.json`, valida la estructura recibida y presenta los productos y el estado de cada solicitud.
- Las tarjetas remotas se construyen con elementos DOM y `textContent` para tratar los nombres recibidos como texto, no como marcado HTML.
- `datos.json` contiene los diez productos del catálogo y los campos requeridos: nombre del negocio, nombre, precio, unidad, stock y disponibilidad.
- La carga requiere servir el proyecto por HTTP, por ejemplo, con Live Server; abrir `index.html` directamente puede impedir las solicitudes `fetch`.

---

## 6. Evolución del Proyecto (Fases y Laboratorios)

| Fase / Laboratorio | Enfoque Principal | Hitos Técnicos |
| :--- | :--- | :--- |
| **Lab 1: Maquetación y CSS** | Estructura y diseño visual | Marcado semántico HTML5, tabla de precios, Flexbox, CSS Grid y paleta de colores. |
| **Lab 2: JavaScript Dinámico** | Interactividad y datos | Catálogo estructurado en `datos.js`, render dinámico, búsqueda y validación de formulario. |
| **Lab 3: Introducción a jQuery** | Comparativa de librerías | Integración de `jquery.min.js`, scripts híbridos y sección de contraste. |
| **Lab 4: Adopción Integral (Actual)** | Homogeneización y UX | Retiro de botones de prueba, aplicación de jQuery a todo el sistema, scroll suave y pedido asistido. |

---

## 7. Control de Calidad y Resolución de Incidencias

1. **Fallo de Renderizado por Contenedor Inexistente:** Se reemplazaron artículos estáticos por el contenedor `<div id="lista-productos"></div>`.
2. **Llave sin cerrar en CSS:** Se subsanó la regla `.logo-header` que bloqueaba el modelo de cuadrícula de las tarjetas.
3. **Jerarquía y Duplicidad de IDs:** Se eliminó la duplicidad de `id="contactos"` y se corrigió el cierre del `<main>`.
4. **Tipos de Input no Estándar:** Corrección de `<input type="hora">` a `<input type="time">`.
5. **Nombres de Archivos:** Estandarización sin espacios para compatibilidad multiplataforma.
6. **Consolidación de Librería (23 de Octubre de 2026):** Homogeneización de la sintaxis y ciclo de vida de la aplicación usando jQuery 3.7.1 de extremo a extremo.

---

## 8. Guía de Ejecución y Despliegue

### 8.1. Requisitos
- Navegador web estándar (Chrome, Edge, Firefox, Safari).
- Visual Studio Code con extensión **Live Server** (opcional pero recomendado).

### 8.2. Ejecución Local
```bash
# Abrir el directorio del proyecto
cd "proyect_1_NOEL_1"

# Iniciar Live Server desde VS Code para que funcionen las solicitudes a datos.json
# Alternativamente, ejecutar: python -m http.server 8000
```

---

## 9. Historial de Commits y Registro de Cambios (23 de Octubre de 2026)

- **Commit:** `feat: consolidar jquery en toda la app y retirar botones de comparacion`
- **Archivos modificados:**
  - `index.html`: Eliminación de la sección `#comparacion-jquery`, botones y enlace de navegación.
  - `estilos.css`: Limpieza de estilos de comparativa e incorporación de clases interactivas (`.btn-seleccionar`, `.fila-hover`, `.sin-productos`).
  - `app.js`: Inclusión de DOM Ready con jQuery, aviso de stock animado, navegación suave y hover en tablas.
  - `render.js`: Construcción de tarjetas 100% con jQuery, chaining y botón de pedido directo.
  - `eventos.js`: Filtrado reactivo con `$.grep`, serialización con `serializeArray` y función de preselección asistida.
  - `funciones.js`: Incorporación de utilidades funcionales globales de jQuery (`$.type`, `$.map`, `$.grep`, `$.trim`, `$.extend`).
  - `.gitignore`: Inclusión de `.vscode/`.
  - `MEMORIA.md`: Actualización integral de la documentación técnica.

- **Integración del catálogo remoto (27 de Octubre de 2026):** Se conectó la sección de `index.html` con `remoto.js`, se añadió `datos.json` y se documentó la ejecución mediante servidor local.
