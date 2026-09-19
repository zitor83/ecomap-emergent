# GoGoMap Frontend

Frontend web de **GoGoMap**, una aplicación para descubrir y localizar puntos relacionados con los **17 Objetivos de Desarrollo Sostenible (ODS)** en Málaga.

La aplicación permite explorar los puntos sobre un mapa interactivo, filtrarlos por ODS y distancia, consultar sus detalles, generar rutas y, para usuarios registrados, gestionar favoritos y participar en las funcionalidades de gamificación.

---

## 📋 Contenido

* [Descripción](#-descripción)
* [Funcionalidades](#-funcionalidades)
* [Stack tecnológico](#-stack-tecnológico)
* [Requisitos](#-requisitos)
* [Instalación y configuración](#-instalación-y-configuración)
* [Arquitectura](#-arquitectura)
* [Estructura del proyecto](#-estructura-del-proyecto)
* [Páginas principales](#-páginas-principales)
* [Integración con la API](#-integración-con-la-api)
* [Comandos disponibles](#-comandos-disponibles)
* [Build y despliegue](#-build-y-despliegue)
* [Solución de problemas](#-solución-de-problemas)

---

## 📖 Descripción

GoGoMap es una aplicación web centrada en la localización de iniciativas y puntos de interés relacionados con los **ODS de la Agenda 2030**.

El frontend está desarrollado con React y TypeScript y se comunica con una API REST desarrollada con Spring Boot.

### Funcionalidades principales

* 🗺️ **Mapa interactivo** con Leaflet.
* 🎯 **Filtrado de puntos** por ODS y distancia.
* 📍 **Geolocalización** del usuario.
* 🛣️ **Generación de rutas** mediante OSRM.
* ⭐ **Gestión de favoritos** para usuarios autenticados.
* 👤 **Perfil de usuario** con estadísticas.
* 🎮 **Gamificación** mediante karma, logros, recompensas y ruleta.
* 🔐 **Autenticación mediante JWT**.
* 📱 **Interfaz responsive** para diferentes tamaños de pantalla.
* ❌ **Páginas de error personalizadas**.

---

## 🛠️ Stack tecnológico

| Categoría            | Tecnología                           |
| -------------------- | ------------------------------------ |
| Framework UI         | React 19.2.5                         |
| Lenguaje             | TypeScript 6.0.2                     |
| Build tool           | Vite 8.0.10                          |
| Estilos              | Tailwind CSS 4.x                     |
| UI                   | Radix UI / componentes reutilizables |
| Mapas                | Leaflet 1.9.4                        |
| Integración de mapas | React-Leaflet 5.0.0                  |
| Clustering           | Leaflet.markercluster 1.5.3          |
| Enrutamiento         | React Router 7.15.1                  |
| Cliente HTTP         | Axios 1.16.1                         |
| Iconos               | Lucide React                         |
| Notificaciones       | Sonner                               |
| Animaciones          | React Confetti                       |
| Ruleta               | react-custom-roulette                |
| Utilidades           | use-debounce                         |
| Linting              | ESLint 10.2.1                        |
| Package manager      | pnpm 10.x                            |

---

## 📋 Requisitos

Para trabajar con el frontend se necesita:

* **Node.js** compatible con la versión actual de Vite.
* **pnpm 10.x**.
* Git.
* El backend de GoGoMap para las funcionalidades que requieren comunicación con la API.

Comprobar las versiones instaladas:

```bash
node --version
pnpm --version
git --version
```

El proyecto utiliza **pnpm** y mantiene sus dependencias mediante `pnpm-lock.yaml`.

---

## 🚀 Instalación y configuración

### 1. Acceder al frontend

Desde la raíz del proyecto:

```bash
cd frontend
```

### 2. Instalar dependencias

```bash
pnpm install
```

### 3. Configurar la API

El frontend utiliza la variable de entorno:

```env
VITE_API_BASE_URL=http://localhost:8080
```

La configuración de Axios añade automáticamente `/api` a esta URL.

Por tanto:

```text
VITE_API_BASE_URL=http://localhost:8080
        ↓
API utilizada por Axios
        ↓
http://localhost:8080/api
```

Para producción:

```env
VITE_API_BASE_URL=https://gogomap-backend.onrender.com
```

> Las variables `VITE_*` son variables de entorno de Vite y quedan incorporadas al frontend durante el proceso de build.

### 4. Ejecutar en desarrollo

```bash
pnpm dev
```

La aplicación estará disponible normalmente en:

```text
http://localhost:5173
```

---

## 🏗️ Arquitectura

El frontend sigue una organización basada en **componentes, páginas, contexto, hooks y servicios de API**.

El flujo principal de comunicación es:

```text
┌─────────────────────────────┐
│       Componentes React     │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│       Pages / Context       │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│       Hooks / Services      │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│       Axios Client          │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│   GoGoMap REST API          │
│      Spring Boot            │
└─────────────────────────────┘
```

### Autenticación

La autenticación utiliza JWT.

El token se almacena en `localStorage` y el cliente Axios incorpora automáticamente el token en las peticiones autenticadas mediante el interceptor configurado en `axiosConfig.ts`.

Las rutas que requieren autenticación están protegidas mediante los componentes de routing correspondientes.

---

## 📁 Estructura del proyecto

La estructura principal del frontend es:

```text
frontend/
├── src/
│   ├── api/
│   │   ├── services/
│   │   │   ├── authService.ts
│   │   │   ├── pointService.ts
│   │   │   └── userService.ts
│   │   ├── types/
│   │   └── axiosConfig.ts
│   │
│   ├── components/
│   │   ├── Auth/
│   │   ├── Footer/
│   │   ├── Map/
│   │   ├── Points/
│   │   ├── Profile/
│   │   ├── error/
│   │   ├── error404/
│   │   ├── onboarding/
│   │   ├── shared/
│   │   └── ui/
│   │
│   ├── context/
│   │   └── AuthContext.tsx
│   │
│   ├── hooks/
│   │
│   ├── pages/
│   │   ├── Auth/
│   │   ├── Favorites/
│   │   ├── Map/
│   │   └── User/
│   │
│   ├── routes/
│   │   ├── AppRouter.tsx
│   │   ├── ProtectedRoute.tsx
│   │   └── RedirectIfAuthenticated.tsx
│   │
│   ├── utils/
│   │
│   ├── App.tsx
│   ├── main.tsx
│   ├── App.css
│   └── index.css
│
├── public/
├── index.html
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
├── eslint.config.js
├── components.json
└── README.md
```

> `node_modules/` y `dist/` son directorios generados y no forman parte del código fuente del proyecto.

---

## 📄 Páginas principales

### `/onboarding`

Página inicial de presentación de GoGoMap.

Incluye la presentación de la aplicación y acceso a las opciones de autenticación.

### `/map`

Página principal de la aplicación.

Incluye:

* Mapa interactivo.
* Visualización de los puntos ODS.
* Clustering de marcadores.
* Filtrado por ODS.
* Filtrado por distancia.
* Geolocalización.
* Consulta de detalles de los puntos.
* Generación y eliminación de rutas.
* Gestión de favoritos para usuarios autenticados.

Los detalles de un punto se muestran mediante un modal dentro de la propia página del mapa.

### `/favorites`

Página de favoritos del usuario autenticado.

Permite consultar los puntos guardados y realizar acciones sobre ellos, incluyendo la eliminación de favoritos y la generación de rutas.

### `/user`

Página de perfil del usuario.

Incluye funcionalidades relacionadas con:

* Información del perfil.
* Estadísticas.
* Karma.
* Logros.
* Ranking.
* Ruleta.
* Recompensas.
* Cierre de sesión.

---

## 🔌 Integración con la API

La comunicación con el backend se centraliza mediante Axios.

La configuración principal se encuentra en:

```text
src/api/axiosConfig.ts
```

Los servicios se organizan por funcionalidad:

```text
src/api/services/
├── authService.ts
├── pointService.ts
└── userService.ts
```

### Principales grupos de endpoints utilizados

| Funcionalidad | Endpoint base                |
| ------------- | ---------------------------- |
| Autenticación | `/api/auth`                  |
| Puntos        | `/api/v1/points`             |
| Usuario       | `/api/v1/users/me`           |
| Ranking       | `/api/v1/users/ranking`      |
| Favoritos     | `/api/v1/users/me/favorites` |
| Gamificación  | `/api/v1/...`                |

Para obtener información detallada sobre los endpoints disponibles, consultar el README del backend.

---

## 🧩 Componentes principales

### `MapView`

Componente principal del mapa.

Gestiona la visualización de los puntos, clusters, posición del usuario y rutas.

### `PointDetailModal`

Muestra la información de un punto seleccionado y permite realizar acciones relacionadas con él.

### `FilterDrawer`

Panel de filtros utilizado para seleccionar ODS, distancia y otras opciones de visualización.

### `Weal`

Componente utilizado para la ruleta de gamificación.

### `AuthContext`

Gestiona el estado global relacionado con la autenticación y la sesión del usuario.

### `ProtectedRoute`

Controla el acceso a las rutas que requieren autenticación.

---

## 🛠️ Guía de desarrollo

### Crear un componente

Los componentes reutilizables se organizan dentro de `src/components/`.

Como regla general:

* Utilizar **PascalCase** para componentes.
* Utilizar **camelCase** para variables y funciones.
* Definir los tipos de las props mediante TypeScript.
* Utilizar Tailwind CSS para los estilos existentes en el proyecto.
* Evitar introducir complejidad innecesaria.

Ejemplo:

```tsx
interface ExampleProps {
  title: string;
}

export function Example({ title }: ExampleProps) {
  return <h2>{title}</h2>;
}
```

### Crear un servicio API

Los servicios relacionados con el backend se encuentran en:

```text
src/api/services/
```

Ejemplo:

```typescript
import api from '@/api/axiosConfig';

export const exampleService = {
  getAll: () => api.get('/example'),
  getById: (id: number) => api.get(`/example/${id}`),
};
```

### Añadir dependencias

Utilizar pnpm:

```bash
pnpm add nombre-paquete
```

Para una dependencia de desarrollo:

```bash
pnpm add -D nombre-paquete
```

Después de modificar dependencias, comprobar que `pnpm-lock.yaml` queda actualizado.

---

## 📦 Comandos disponibles

### Desarrollo

```bash
pnpm dev
```

Inicia el servidor de desarrollo de Vite.

### Lint

```bash
pnpm run lint
```

Ejecuta ESLint sobre el proyecto.

### Build

```bash
pnpm run build
```

Comprueba TypeScript y genera el build de producción en `dist/`.

### Preview

```bash
pnpm run preview
```

Sirve localmente el build generado.

---

## 🚀 Build y despliegue

### Build de producción

```bash
pnpm run build
```

El resultado se genera en:

```text
frontend/dist/
```

Actualmente el proyecto utiliza **Render** para el despliegue del frontend.

### Configuración de Render

El frontend está desplegado como **Static Site**.

Configuración principal:

```text
Repository: zitor83/ecomap-emergent
Branch: main
Root Directory: frontend

Build Command:
pnpm install --frozen-lockfile && pnpm run build

Publish Directory:
dist
```

Variable de entorno de producción:

```env
VITE_API_BASE_URL=https://gogomap-backend.onrender.com
```

La aplicación desplegada está disponible en:

```text
https://gogomap-frontend.onrender.com
```

### React Router y Render

Como la aplicación utiliza routing del lado del cliente, Render necesita una regla de rewrite para que las rutas como `/map`, `/favorites` o `/user` sean servidas mediante `index.html`.

Configuración utilizada:

```text
/*  →  /index.html
```

El backend se encuentra desplegado como un servicio independiente y utiliza MySQL alojado en Aiven.

```text
┌──────────────────────────┐
│   Render Static Site     │
│   GoGoMap Frontend       │
└────────────┬─────────────┘
             │ HTTPS
             ▼
┌──────────────────────────┐
│   Render Web Service     │
│   GoGoMap Backend        │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│      Aiven MySQL         │
└──────────────────────────┘
```

---

## 🐛 Solución de problemas

### El frontend no puede conectarse al backend

Comprobar `VITE_API_BASE_URL`.

En local:

```env
VITE_API_BASE_URL=http://localhost:8080
```

En producción:

```env
VITE_API_BASE_URL=https://gogomap-backend.onrender.com
```

Recordar que Axios añade `/api` automáticamente.

### Error de CORS

Si aparece un error de CORS:

1. Comprobar que el backend está ejecutándose.
2. Comprobar la URL configurada en `VITE_API_BASE_URL`.
3. Comprobar que el origen del frontend está permitido en la configuración CORS del backend.

### Error `401 Unauthorized`

Normalmente indica que la petición requiere autenticación y el JWT no es válido o ha expirado.

Se puede cerrar sesión y volver a iniciar sesión para obtener un nuevo token.

### Error al acceder directamente a `/map` en producción

Comprobar que Render tiene configurada la regla:

```text
/* → /index.html
```

Esta configuración es necesaria para el routing de React.

### El mapa no se muestra correctamente

Comprobar que Leaflet y sus estilos están cargados correctamente y revisar la consola del navegador para detectar errores de JavaScript.

---

## 📚 Documentación relacionada

* Documentación de React
* Documentación de TypeScript
* Documentación de Vite
* Documentación de Tailwind CSS
* Documentación de React Router
* Documentación de Leaflet
* Documentación de shadcn/ui

Para la API REST, autenticación, base de datos y despliegue del backend, consultar:

```text
../backend/README.md
```

---

## 📌 Estado del proyecto

El frontend está actualmente desplegado y conectado con el backend de GoGoMap en producción.

La aplicación utiliza:

* React + TypeScript.
* Vite.
* Leaflet.
* Axios.
* JWT.
* API REST de Spring Boot.
* Render para el frontend.
* Render + Aiven para el backend y la base de datos.

---

**GoGoMap — Explorando Málaga a través de los ODS.**
