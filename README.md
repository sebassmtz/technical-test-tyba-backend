# technical-test-huertax-backend

**Developed by:** Sebastian Felipe Martinez Samaca

**Date:** 2024-08-29

**Project:** Technical Test in Tyba

**Keywords:** NodeJS, Express.js, PostgreSQL, Google Cloud API Places, Docker, Railway

**Deployment Infrastructure:** Docker and Railway

> [!IMPORTANT]
> Link de la documentacion de los endpoints:

- [Introducción](#introducción)
- [Backend](#backend)
  - [Instalacion Local](#local-installation)
  - [Instalacion en Docker ](#docker-installation)
  - [Documentacion](#documentation)

## Introducción

> [!IMPORTANT]
> Credenciales en el tabla de abajo.

| Usuario              | Contraseña        |
| -------------------- | ----------------- |
| jhon.doe@example.com | stringPassword123 |

```json
-- User --
{
  "email": "jhon.doe@example.com",
  "password": "stringPassword123"
}
```

## Backend

El backend de la aplicación fue desarrollado en NodeJS con Express.js, se utilizo una base de datos PostgreSQL para almacenar la información de los ususarios

### Instalacion Local

Para instalar el backend de la aplicación de forma local, se debe seguir los siguientes pasos:

1. Instalar las dependencias

```bash
npm install
```

2. Crear el archivo `.env` en la ruta raiz del backend y agregar el contenido, puede usar `.env.template` como referencia.

3. Iniciar el servidor

```bash
npm run dev
```

4. Acceder a la documentación de la API en `http://localhost:3000/docs`

### Instalacion en Docker

1. Crear el archivo `.env` en la ruta raiz del backend y agregar el contenido, puede usar `.env.template` como referencia.
2. Ejecutar el docker-compose usando: ` docker-compose -f docker-compose.dev.yml up`

### Documentacion

El backend se realizo con una arquitectura n-capas, lo que facilita la escalabilidad y mantenimiento del código, a continuación se muestra la estructura de carpetas del backend:

```bash
backend
├── src
│   ├── controllers
│   ├── helpers
│   ├── interfaces
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   └── main.ts
├── .env
├── .env.template
├── .gitignore
├── docker-compose.dev.yml
├── Dockerfile
```
