# Lalo Servicios - Página Web

Sitio web estático para **Lalo Servicios**, una empresa dedicada a la venta y alquiler de maquinaria para la construcción. Esta página forma parte de un proyecto de portafolio personal, simulando funcionalidades típicas de una aplicación con administración de contenido, sin utilizar backend real.

---

## 🛠️ Tecnologías utilizadas

- **HTML5 / CSS3**
- **JavaScript**
- **Bootstrap 5.3**
- **SweetAlert2** (alertas modernas)
- **FontAwesome** (iconos)
- **LocalStorage / SessionStorage** (simulación de backend)
- **Fetch API** (carga de datos desde JSON)

---

## 📁 Estructura del Proyecto

```
LaloServicios/
│
├── index.html             # Página principal
├── login.html             # Página de inicio de sesión
│
├── data/
│   ├── maquinarias.json   # Catálogo inicial de maquinaria
│   ├── imagenes.json      # Lista de imágenes disponibles
│   └── usuarios.json      # Usuarios válidos (simulado)
│
├── js/
│   ├── main.js            # Lógica principal del sitio
│   ├── login.js           # Lógica para el login
│   └── admin.js           # Funcionalidades administrativas
│
├── css/
│   └── styles.css         # Estilos personalizados
│
├── img/
│   └── ...                # Imágenes de las maquinarias y logos
│
└── README.md              # Documentación del proyecto
```

---

## ✨ Funcionalidades implementadas

### 👷 Página principal (`index.html`)
- **Sección de bienvenida** con título y descripción.
- **Carrusel de maquinarias**, agrupadas de a 3 (o 1 en dispositivos móviles).
- **Vista responsive adaptada** para celulares y tablets.
- **Modo oscuro** opcional.
- **Botón "Volver arriba"** flotante con scroll suave.
- **Sección "Sobre nosotros"** con descripción y logo.
- **Mapa embebido de Google Maps**.
- **Formulario de contacto** con validación y alertas de éxito/error.

---

### 🔒 Sistema de autenticación (simulado)
- Página de **login** con validación de usuario y contraseña contra un archivo `usuarios.json`.
- Al iniciar sesión, se muestra el saludo personalizado en la barra de navegación.
- El botón cambia dinámicamente a "Cerrar Sesión".
- Mensajes de bienvenida y cierre de sesión con **SweetAlert** (sin botón, con auto cierre).

---

### 🛠️ Panel de administración (modo admin)
Solo accesible si hay sesión iniciada:

- ✅ **Mensaje destacado** indicando que el modo administrador está activo.
- ✅ **Botones para agregar y editar maquinaria**, insertados justo debajo del título del carrusel.
- ✅ **Editor de maquinaria** con:
  - Inputs para descripción.
  - Select de estado (Disponible, Alquilada, Vendida, En reparación).
  - Vista previa de imagen (select basado en `imagenes.json`).
  - Guardado en `localStorage` (persistencia simulada).
- ✅ **Agregar nueva maquinaria** con formulario dinámico:
  - Campos: nombre, descripción, imagen, tipo, estado y modo (venta/alquiler).
  - Vista previa de imagen seleccionada.
- ✅ **Eliminar maquinaria** (desde el editor).
- ✅ Cambios persistidos en `localStorage` y reflejados automáticamente en el carrusel.

---

## 📲 Responsividad

Adaptado a distintos dispositivos:
- En pantallas pequeñas, el carrusel muestra **una sola tarjeta por slide**.
- En pantallas grandes, se agrupan de a **tres maquinarias por slide**.
- Todos los botones están correctamente posicionados y adaptados según el tamaño de pantalla.

---

## ⚙️ Simulación de backend

- **LocalStorage**:
  - Se usa para almacenar las maquinarias editadas o agregadas.
- **SessionStorage**:
  - Para mantener la sesión activa (usuario logueado).
- **Fetch**:
  - Se cargan los datos desde archivos `.json` simulando un backend.

---

## 🔐 Usuario de prueba

Para simular el login en `login.html`, usá algún usuario definido en `data/usuarios.json`, por ejemplo:

```json
{
  "usuario": "admin",
  "password": "1234"
}
```

---

## 📌 Notas

- Todo el sitio es estático y no requiere servidor.
- Está pensado para ser desplegado fácilmente en servicios como GitHub Pages, Netlify o Vercel.
- El archivo `maquinarias.json` actúa como punto de partida, pero los cambios se mantienen en el navegador.

---

## © 2025 - Lalo Servicios
Desarrollado como práctica personal y parte de portafolio web.