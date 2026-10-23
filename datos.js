// ── 1. OBJETO LITERAL ───────────────────────────────────────────────────
const platosDelDia = {
  nombre: "Platos del dia",
  precio: 17,
  categoria: "platos",
  stock: 40,
  disponible: true,
};

console.log(platosDelDia.nombre);

const propiedad = "precio";
console.log(platosDelDia[propiedad]);

platosDelDia.stock = 35;
platosDelDia.integral = false;
delete platosDelDia.integral;

// ── 2. DESTRUCTURING ────────────────────────────────────────────────────
const { nombre, precio } = platosDelDia;
console.log(`${nombre} cuesta Bs ${precio}`);

const panDeAyer = { ...platosDelDia, precio: 0.3, nombre: "Menu De Ayer" };
console.log(platosDelDia);

// ── 3. ARREGLO DE OBJETOS ───────────────────────────────────────────────
const productos = [
  { nombre: "Pollo a la broaster", precio: 17.00, categoria: "platos", stock: 40, disponible: true,
    descripcion: "Cuarto de pollo a elección, con 2 guarniciones.", imagen: "imagenes/pollo-broaster.jpg" },
  { nombre: "Pollo spiedo",        precio: 17.00, categoria: "platos", stock: 25, disponible: true,
    descripcion: "Pollo entero o por presa.", imagen: "imagenes/pollo-spiedo.jpg" },
  { nombre: "Milanesa de pollo",   precio: 15.00, categoria: "platos", stock: 8,  disponible: true,
    descripcion: "Platos de milanesa.", imagen: "imagenes/milanesa-pollo.jpg" },
  { nombre: "Alitas de pollo",     precio: 10.00, categoria: "snacks",       stock: 0,  disponible: false,
    imagen: "imagenes/alitas-pollo.jpg" },
  { nombre: "Nuggets de pollo",    precio: 10.00, categoria: "snacks",       stock: 30, disponible: true,
    imagen: "imagenes/nuggets-pollo.jpg" },
  { nombre: "Papas fritas extra",  precio: 10.00, categoria: "guarniciones", stock: 2,  disponible: true,
    imagen: "imagenes/papas-fritas.jpg" },
  { nombre: "Arroz chaufa",        precio: 12.00, categoria: "guarniciones", stock: 50, disponible: true,
    imagen: "imagenes/arroz-chaufa.jpg" },
  { nombre: "Fideo tallarín",      precio: 12.00, categoria: "guarniciones", stock: 0,  disponible: false,
    imagen: "imagenes/fideo-tallarin.jpg" },
  { nombre: "Coca-Cola 2 L",       precio: 15.00, categoria: "bebidas",      stock: 50, disponible: true,
    imagen: "imagenes/coca-cola.jpg" },
  { nombre: "Cocaquina 2 L",       precio: 11.00, categoria: "bebidas",      stock: 0,  disponible: false,
    imagen: "imagenes/cocaquina.jpg" },
];

// ── 4. LOS MÉTODOS QUE IMPORTAN ─────────────────────────────────────────
productos.forEach(p => console.log(p.nombre));

const nombres = productos.map(p => p.nombre);
console.log(nombres);

const disponibles = productos.filter(p => p.disponible);
console.log(disponibles.length, "de", productos.length, "disponibles");

const categorias = productos.filter(p => p.categoria);
console.log(categorias.length, "de", productos.length, "categorias");

const caro = productos.find(p => p.precio > 40);
console.log(caro);

console.log(nombres.includes("Alitas de pollo"));
console.log(productos.some(p => p.stock === 0));
console.log(productos.every(p => p.precio > 0));

const porPrecio = [...productos].sort((a, b) => a.precio - b.precio);
console.log(porPrecio.map(p => p.nombre));

const valorInventario = productos.reduce((acumulador, p) => acumulador + p.precio * p.stock, 0);
console.log("Valor del inventario: Bs", valorInventario.toFixed(2));

// ── 5. ENCADENAR ────────────────────────────────────────────────────────
const nombresDisponibles = productos
  .filter(p => p.disponible)
  .map(p => p.nombre);
console.log(nombresDisponibles);

const totalDulcesEnStock = productos
  .filter(p => p.categoria === "dulces" && p.disponible)
  .reduce((total, p) => total + p.precio * p.stock, 0);
console.log("Dulces en stock: Bs", totalDulcesEnStock.toFixed(2));

const porCategoria = productos.reduce((grupos, p) => {
  if (!grupos[p.categoria]) grupos[p.categoria] = [];
  grupos[p.categoria].push(p.nombre);
  return grupos;
}, {});
console.log(porCategoria);

// ── 6. CLASES ───────────────────────────────────────────────────────────
class Producto {
  constructor(nombre, precio, stock) {
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
  }

  estaDisponible() {
    return this.stock > 0;
  }

  valorEnStock() {
    return this.precio * this.stock;
  }
}

const platanofrito = new Producto("PlatanoFrito", 5.0, 50);
console.log(platanofrito.nombre, platanofrito.estaDisponible(), platanofrito.valorEnStock());

class ProductoConDescuento extends Producto {
  constructor(nombre, precio, stock, descuento) {
    super(nombre, precio, stock);
    this.descuento = descuento;
  }

  precioFinal() {
    return this.precio * (1 - this.descuento / 100);
  }
}

const frescodedurazno = new ProductoConDescuento("FrescoDeDurazno", 3, 20, 25);
console.log(frescodedurazno.precioFinal(), frescodedurazno.estaDisponible());
