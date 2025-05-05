# Prueba Técnica - Sistema de Gestión Bancaria 🏦

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

Este proyecto es una API RESTful desarrollada con **NestJS**, **PostgreSQL**, **Docker** y siguiendo la **arquitectura Clean**, que permite gestionar cuentas bancarias y transacciones. Se ha incluido autenticación con JWT, roles, protección de rutas, seeders, middleware de logging y documentación Swagger.

---

## 🧱 Estructura del Proyecto

```
src/
├── accounts/               # Módulo de cuentas (application, domain y infrastructure)
├── auth/                   # Módulo de autenticación (application, domain y infrastructure)
├── shared/
│   ├── auth/               # Decoradores, guards y estrategia JWT
│   ├── database/           # Configuración de TypeORM Postgres
│   ├── exceptions/         # Manejo global de errores
│   ├── interfaces/         # Interfaces pyaload
│   ├── middlewares/        # Middleware para logs de solicitudes
│   ├── seeder/             # Seeder para insertar cuentas y transacciones de prueba
│   └── utils/              # Fomato de respuestas (ApiResponseBuilder)
├── transactions/           # Módulo de transacciones (application, domain y infrastructure)
├── main.ts                 # Bootstrap principal
└── app.module.ts           # Módulo raíz
```

---

## 📦 Instalación

1. Clona el repositorio y entra al proyecto:

```bash
git clone...
cd NestJs
cd prueba_tecnica
```

2. Instala dependencias:

```bash
npm install
```

3. Asegúrate de tener Docker instalado y corre el sistema:

```bash
docker-compose up --build
```

---

## 📚 Documentación Swagger

Esta API está documentada con Swagger. Una vez la app esté corriendo, accede a:

```
http://localhost:3000/api
```

Desde ahí puedes probar endpoints como crear cuenta, login, realizar transferencias, etc.  
La documentación se genera con `@nestjs/swagger` y se configura desde `main.ts`.

---

## 🔐 Autenticación (JWT)

- Login por `documentNumber` y `password` (`POST /auth/login`)
- Se devuelve token JWT con: `sub`, `role`, `documentNumber`
- Se usa `@Auth()` para proteger rutas y `@ActiveUser()` para obtener el usuario autenticado

---

## 🧪 BONUS IMPLEMENTADOS

| Bonus                              | Estado ✅                                |
| ---------------------------------- | ---------------------------------------- |
| Seeders para cuentas/transacciones | ✅ Completado (`SeederService`)          |
| Middleware de logging              | ✅ Log de requests con método, ruta e IP |
| JWT para autorización              | ✅ Con roles y protección de rutas       |

---

## 🧪 Ejemplo de Login (POST `/auth/login`)

```json
{
  "documentNumber": "12345678",
  "password": "admin123"
}
```

> Respuesta:

```json
{
  "status": "success",
  "code": 200,
  "message": "Login exitoso",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...."
  }
}
```

---

## 🔒 Seguridad de Rutas

- Solo `ADMIN` puede listar todas las cuentas.
- Un `USER` solo puede:
  - Ver su propia cuenta
  - Ver sus transacciones
  - Realizar operaciones desde su cuenta
- Decoradores:
  - `@Auth(...roles)`
  - `@ActiveUser()` para acceder al usuario autenticado desde el token

---

## ⚙️ Variables de Entorno (.env)

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=banco_user
DATABASE_PASSWORD=banco_pass
DATABASE_NAME=banco_db

JWT_SECRET=jwt_secret_key
JWT_EXPIRES_IN=3600s
```

---

## 📬 Endpoints Principales

| Método | Ruta                     | Descripción                | Roles               |
| ------ | ------------------------ | -------------------------- | ------------------- |
| POST   | /accounts                | Crear cuenta bancaria      | Público             |
| GET    | /accounts                | Obtener todas las cuentas  | ADMIN               |
| GET    | /accounts/:id            | Obtener cuenta por ID      | ADMIN/USER (propia) |
| POST   | /transactions/deposit    | Realizar depósito          | USER (propia)       |
| POST   | /transactions/withdraw   | Realizar retiro            | USER (propia)       |
| POST   | /transactions/transfer   | Realizar transferencia     | USER (propia)       |
| GET    | /transactions/:accountId | Historial de transacciones | ADMIN/USER (propia) |

---

## ✅ Diseño

- Arquitectura basada en principios Clean Architecture 
- Estilo limpio y consistente con `ApiResponseBuilder`
- Middleware personalizado para log básico
- Seeder ejecutado automáticamente al iniciar si no existen cuentas
- Documentación Swagger disponible en `/api`

---

## 🚀 Autor

jhossepsamuel23@gmail.com
