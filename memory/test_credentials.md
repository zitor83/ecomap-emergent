# GoGoMap · Credenciales de prueba

Estos usuarios son sembrados automáticamente por `UserDataLoader.java`
al arrancar el backend (Spring Boot) si la tabla de usuarios está vacía.

## Admin
- Email: `admin@gogomap.com`
- Password: `admin1234`
- Roles: ADMIN, USER

## Usuario estándar
- Email: `user@gogomap.com`
- Password: `user1234`
- Roles: USER

## Notas
- Endpoint de login: `POST /api/v1/auth/login`
- El backend corre en PostgreSQL (no Mongo en este proyecto Java).
- Si los usuarios no existen, reinicia el backend o ejecuta el seed manualmente.
