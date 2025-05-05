# Prueba Técnica: API REST de Servicios Financieros

<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

Este proyecto es una API RESTful construida con **Laravel**, Docker y PostgreSQL, diseñada para gestionar **cuentas bancarias y transacciones**. Cumple con prácticas modernas como Clean Architecture, JWT para autenticación, Swagger para documentación y generación de datos con Seeders.

---

## 📐 Arquitectura

El proyecto sigue una **arquitectura Clean** organizada en _Dominios_:

```
app/
├── Domains/
│   ├── Account/
│   │   ├── Controllers/
│   │   ├── Models/
│   │   ├── Requests/
│   └── Transaction/
│       ├── Controllers/
│       ├── Models/
│       ├── Requests/
├── Http/
│   ├── Controllers/
│   ├── Middleware/
│   └── Responses/
database/
├── factories/
├── migrations/
└── seeders/
```

---

## 🚀 Instalación y ejecución local (Docker + Sail)

### 1. Clonar el repositorio

```bash
git clone
cd Laravel
cd prueba-tecnica
```

### 2. Instalar dependencias

```bash
composer install
cp .env.example .env
php artisan key:generate
```

### 3. Configurar `.env`

tener estas variables:

```env
DB_CONNECTION=pgsql
DB_HOST=pgsql
DB_PORT=5432
DB_DATABASE=banco_db
DB_USERNAME=banco_user
DB_PASSWORD=banco_pass
APP_PORT=8080
FORWARD_DB_PORT=5441
VITE_PORT=5174
```

### 4. Ejecutar contenedores

```bash
./vendor/bin/sail up -d
```

### 5. Migraciones y seeders

```bash
./vendor/bin/sail artisan migrate
./vendor/bin/sail artisan db:seed
```

---

## 🔐 Autenticación con JWT

Se usa JWT para proteger las rutas. Un usuario debe autenticarse con:

```
POST /api/auth/login
{
  "email": "usuario@example.com",
  "password": "password123"
}
```

Rutas protegidas requieren token `Authorization: Bearer`.

---

## 📚 Documentación Swagger

Accede a la documentación de la API generada automáticamente en:

```
http://localhost:8080/api/documentation
```

---

## ✨ Características destacadas

-   Gestión de cuentas bancarias y transacciones
-   Arquitectura Clean por dominios
-   Autenticación JWT
-   Seeders y Faker para datos de prueba
-   Documentación automática con Swagger (l5-swagger)
-   Entorno Dockerizado con Laravel Sail + PostgreSQL

---

## 🐳 Docker (docker-compose.yml)

```yaml
services:
    laravel.test:
        ports:
            - "${APP_PORT:-8080}:80"
            - "${VITE_PORT:-5174}:${VITE_PORT:-5174}"
        depends_on:
            - pgsql
    pgsql:
        image: postgres:17
        ports:
            - "${FORWARD_DB_PORT:-5441}:5432"
```

---

## 👤 Autor

jhosepsamuel23@gmail.com
