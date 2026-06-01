# PRD · GoGoMap

> Plataforma de mapeo de puntos de interés ligados a los ODS en Málaga,
> con un sistema integral de gamificación (karma, ruleta diaria,
> favoritos, logros y tienda de recompensas).

---

## 1. Stack

- **Frontend**: React 19 + TypeScript (Vite), Tailwind CSS, React Router,
  Leaflet, Lucide Icons, react-confetti.
- **Backend**: Spring Boot (Java 21), PostgreSQL, JPA/Hibernate, JWT.
- **DevOps**: supervisor (frontend en `vite --host 0.0.0.0 --port 3000`),
  Mongo no se usa (el proyecto Java usa Postgres).

## 2. Principios de producto

1. **Mobile-First estricto**.
2. Tipado estricto (prohibido `any`).
3. Clean Code · SOLID · KISS · DRY.
4. Validación cruzada Spring ↔ Axios.
5. Gestión de errores robusta.
6. Respuestas breves y concisas en español.

## 3. Roadmap general (Tareas 1 → 25)

✅ **Tareas 1-24.5** completadas en sesiones previas (ver handoff):
- Filtro ODS 1 por defecto, Visit/Report, ruleta diaria con toast,
  sanitización backend, mapping ODS, rutas/footer condicional,
  multi-select de filtros, favoritos interactivos, mobile-first responsive,
  micro-animaciones, ruleta con confetti, drawer de filtros,
  "solo favoritos", controles de mapa, leaderboard top 10,
  dashboard de perfil, sistema de logros, Karma Shop completo.

✅ **Tarea 25 — Multi-theme + Header redesign** *(2026-02 · esta sesión)*:
- 3 temas vía `[data-theme]` en `<html>`: `light`, `dark`, `malagueno`
  (paleta Biznaga: verde `#14532D` + morado `#7E22CE`).
- `ThemeContext` con `localStorage` + `prefers-color-scheme`.
- `Header` rediseñado: logo izq. + selector pill (Sol/Luna/Flower2) +
  botón Info a la derecha enlazando a `/about` (onboarding).
- `tailwind.config.js` extendido con `themeBg`, `themeSurface`,
  `themePrimary`, etc.
- Tokens aplicados a: `MapPage`, `FavoritesPage`, `UserPage`,
  `FilterDrawer`, `Footer`, `MapAlerts`, `PointDetailModal`,
  `PointModel`, `EditProfileModal`, `AchievementsModal`,
  `KarmaShopModal`, `Leaderboard`, `FavoriteCard`, `FavoritesTitle`,
  `FavoritesList`.
- `body`/`html` reaccionan al tema (`background-color: var(--theme-bg)`).
- **Iconos ODS y colores ODS_COLORS preservados** sin tocar.
- Validado visualmente con `data-theme` aplicado en MapPage (dark),
  UserPage (malagueño) y FilterDrawer (malagueño).

### Cambios infra de esta sesión

- Añadido `"start": "vite --host 0.0.0.0 --port 3000"` en
  `package.json` (el supervisor llamaba `yarn start` y no existía).
- Creado `/app/memory/test_credentials.md` con credenciales seed.

## 4. Arquitectura

### Frontend (`/app/frontend/src`)
- `context/`: `AuthContext.tsx`, `ThemeContext.tsx`.
- `pages/`: `Map`, `Favorites`, `User`.
- `components/`: `Header`, `Footer`, `Map`, `Profile`, `Points`,
  `onboarding`, `error`.
- `routes/`: `AppRouter`, `ProtectedRoute`, `RedirectIfAuthenticated`.
- `api/`: services Axios + tipos.
- `utils/`: helpers (`Distance`, `odsMapping`, `OdsColors`, `map`).

### Backend (`/app/backend/...`)
- `controllers`, `services`, `repositories`, `models/{entities,dtos,enums}`,
  `init` (DataLoaders), `config` (Security, JWT).

### Endpoints clave
- `POST /api/v1/auth/login`
- `GET /api/v1/users/ranking`
- `PUT /api/v1/users/me`
- `GET /api/v1/users/me/achievements`
- `GET|POST /api/v1/users/me/rewards`
- `GET /api/v1/points` y `/api/v1/points/{id}`
- `POST /api/v1/points/{id}/actions` (VISIT/REPORT)

## 5. Backlog priorizado

### P0 — Próximos pasos
- **Pruebas E2E** del selector de tema y de los flujos de protección de
  ruta con `testing_agent_v3_fork` cuando el backend Spring Boot esté
  arrancado en el entorno (actualmente offline).
- Revisar **Onboarding** (`GoGomapOnboarding`) y `Login`/`Register` para
  alinear tokens cuando proceda (pendiente de petición explícita del
  usuario).

### P1 — Calidad y refactor
- Extraer `useMapFilters` desde `MapPage.tsx` (>260 líneas).
- Suite Vitest para `ThemeContext` (carga inicial, persistencia,
  reacción a `prefers-color-scheme`).

### P2 — Mejoras futuras (a confirmar con el usuario)
- Modo de alto contraste / accesibilidad (WCAG AA).
- Animación de transición entre temas con `view-transitions` API.
- Sincronización del tema entre pestañas vía `storage` event.

## 6. Credenciales de prueba

Ver `/app/memory/test_credentials.md`.
