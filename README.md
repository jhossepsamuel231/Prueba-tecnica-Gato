
# 🏦 Prueba Técnica - API de Gestión Financiera

Este proyecto contiene dos implementaciones distintas de una API para la gestión de cuentas bancarias y transacciones financieras, desarrolladas con **Laravel** y **NestJS** respectivamente.

---

## 📂 Estructura del Proyecto

```
prueba-tecnica/
├── Laravel/       # Implementación en Laravel + Sail + PostgreSQL
├── nestjs/        # Implementación en NestJS + Docker + PostgreSQL
├── .gitignore
└── README.md      # Este archivo
```

Cada carpeta contiene su propio `README.md` con instrucciones específicas para ejecución, testing y detalles técnicos.

---

## ⚙️ Funcionalidades Implementadas

### 1. Gestión de Cuentas Bancarias (`/accounts`)
- Crear cuenta → `POST /accounts`
- Consultar cuenta → `GET /accounts/:id`
- Listar cuentas → `GET /accounts`

### 2. Transacciones Financieras (`/transactions`)
- Depositar fondos → `POST /transactions/deposit`
- Retirar fondos → `POST /transactions/withdraw`
- Transferir fondos → `POST /transactions/transfer`
- Ver historial de una cuenta → `GET /transactions/:accountId`

---

## 🔐 Seguridad y Autenticación

- Autenticación con JWT
- Roles `USER` y `ADMIN` (NestJS)
- Protección de rutas y validación de identidad

---

## 🧰 Tecnologías Utilizadas

- **Laravel** + Laravel Sail - con arquitectura Clean
- **NestJS** con arquitectura Clean
- **PostgreSQL**
- **Docker** (contenedores para base de datos y backend)
- **Swagger/OpenAPI** para documentación interactiva
- **JWT Auth** para seguridad de endpoints

---

## 🚀 ¿Cuál proyecto debo usar?

Puedes elegir cualquiera de las dos implementaciones según tu stack preferido:

- Si prefieres **Laravel + PHP**, entra al directorio `Laravel/`.
- Si prefieres **NestJS + TypeScript**, entra al directorio `nestjs/`.

Cada implementación es completamente funcional y contiene su propia base de datos, documentación Swagger y autenticación JWT.

---

## 👤 Autor

**Jhosep Samuel Llacctahuaman Cabrera**  
📧 jhossepsamuel23@gmail.com
