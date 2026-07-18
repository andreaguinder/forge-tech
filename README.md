# Forge Tech - E-commerce de Hardware y Tecnología

## Descripción del Proyecto
**Forge Tech** es una Single Page Application (SPA) de e-commerce robusta y de alto rendimiento orientada a la comercialización de componentes de hardware y tecnología. Desarrollada con **React** y construida sobre **Vite**, la aplicación ofrece una experiencia fluida e interactiva, implementando un flujo completo de compra: desde la exploración dinámica de productos por categorías hasta un desglose de pagos y la confirmación final de la orden.

Este desarrollo cumple con el 100% de las consignas requeridas para el curso de **React JS en Coderhouse**, destacándose por su modularización, manejo avanzado del estado global y persistencia de datos en la nube.

---

## 🛠️ Tecnologías y Librerías Utilizadas
- **JavaScript (ES6+)** como lenguaje de programación base, utilizando lógica asíncrona (Async/Await), promesas y manipulación avanzada de arreglos y objetos.
- **React (v18+)** como librería core para la construcción de interfaces modulares basadas en componentes funcionales, Hooks y Context API.
- **Vite** como entorno de desarrollo rápido y empaquetador del proyecto.
- **Cloud Firestore (Firebase)** para la persistencia del catálogo de productos y el almacenamiento seguro de las órdenes de compra generadas.
- **React Router DOM** para la gestión del enrutamiento dinámico (catálogo, categorías, detalle y checkout) sin recargas del navegador.
- **SASS (SCSS)** como preprocesador para estructurar una arquitectura de estilos anidados.
- **Swiper** para el diseño interactivo de banners y carruseles dinámicos de productos.
- **Lucide React** para la implementación de un set de íconos vectoriales modernos y limpios.

---

## 📁 Estructura de Carpetas Principal
El código fuente del proyecto se organiza bajo una arquitectura limpia y basada en responsabilidades claras, siguiendo las convenciones vistas en el curso:

```text
forge-tech/
├── public/         # Recursos estáticos públicos accesibles desde la raíz del navegador
│   └── images/     # Banners de campañas y fotos de los productos organizadas por categoría
├── src/
│   ├── assets/     # Estilos globales, tipografías y vectores de la interfaz
│   ├── components/ # Componentes de presentación y modulares
│   │   ├── CartCheckout/
│   │   ├── CartInfo/   # Desglose evolutivo de cuotas y totales
│   │   ├── CartItems/
│   │   ├── CartWidget/ # Indicador de unidades en tiempo real para el NavBar
│   │   ├── Header/
│   │   ├── Item/       # Item.jsx, ItemCart.jsx e ItemCount.jsx (manejo de stock)
│   │   ├── ItemDetail/ # Vista detallada y control de UI al agregar al carrito
│   │   ├── ItemList/   # Renderizado de grillas de productos
│   │   ├── Loader/     # Animaciones de carga para la UX (Renderizado condicional)
│   │   ├── ModalLogin/
│   │   ├── ModalSuccessBuy/ # Pop-up con el ID de orden de Firestore generado
│   │   └── SwiperCarrusel/  # Carrusel dinámico e interactivo
│   ├── context/    # Administración de estados globales del ecosistema
│   │   ├── AuthContext.jsx    # Manejo de estado de la sesión de Firebase Auth
│   │   ├── CartContext.jsx    # Lógica del carrito, subtotales, totales y envíos
│   │   └── ProductContext.jsx # Proveedor global del estado de productos
│   ├── hooks/      # Custom Hooks personalizados para modularizar lógica (useProducts)
│   ├── pages/      # Páginas principales contenedoras (Smart Components)
│   │   ├── Cart.jsx
│   │   ├── Home.jsx
│   │   ├── ItemDetailContainer.jsx # Contenedor lógico de carga por ID
│   │   └── ItemListContainer.jsx   # Contenedor lógico filtrado por categoría
│   ├── services/   # Módulos encargados de las peticiones directas a Firestore
│   └── styles/     # Arquitectura SASS (_variables.scss y main.scss)
```

##  Funcionalidades Destacadas e Implementación Técnica

### 🌌 Firebase & Firestore
El catálogo se lee directamente de forma asíncrona desde una colección de Cloud Firestore.

Al finalizar una compra se valida el stock, impactando el inventario y generando de forma automática un documento único en la colección de órdenes que almacena la información detallada del comprador, ítems agregados, precios históricos y la fecha exacta del servidor.

###  🧭 Navegación con React Router
Flujo unificado y dinámico mediante parámetros (/:id, /category/:idCategory) que aíslan las vistas de productos, permitiendo compartir enlaces específicos de categorías de hardware sin romper el ciclo del estado global.

### 🛒 Gestión de Estado Global (React Context)
Un ecosistema de contexts que sincronizan en tiempo real el contador del CartWidget, los montos acumulados por pasarelas de pago y las variaciones complejas en la financiación si el usuario selecciona compras con tarjetas de crédito.

### 💎 UX / UI de Alto Impacto
Línea de tiempo de resúmenes: El desglose del carrito calcula de forma matricial las cuotas concurrentes si hay productos mezclados de diferentes planes (ej: 3 y 6 meses), mostrándole al cliente exactamente qué paga este mes frente al total diferido.

Renderizado condicional: Control estricto de loaders de carga, estados de "sin stock", validaciones numéricas en los contadores y avisos interactivos para desbloquear el umbral de Envío Gratis.

## ¿Te gustaría colaborar o tenés un desafío laboral?

¡Me encantaría conectar con vos! Estoy abierta a nuevas oportunidades, proyectos desafiantes o simplemente charlar sobre tecnología.

* **Email:** [andreabelen.guinder@gmail.com](mailto:andreabelen.guinder@gmail.com)
* **LinkedIn:** [https://www.linkedin.com/in/andrea-guinder/](https://www.linkedin.com/in/andrea-guinder/)
* **Portfolio:** [https://andreaguinder.com/](https://andreaguinder.com/)