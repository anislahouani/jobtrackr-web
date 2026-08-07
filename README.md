<h1 align="center">JobTrackr</h1>

<p align="center">
A modern full-stack application for managing and tracking job applications.
</p>

<p align="center">

![Angular](https://img.shields.io/badge/Angular-20-DD0031?logo=angular&logoColor=white)
![ASP.NET Core](https://img.shields.io/badge/ASP.NET_Core-10-512BD4?logo=dotnet&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-4169E1?logo=postgresql&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Authentication-success)
![Vercel](https://img.shields.io/badge/Frontend-Vercel-black?logo=vercel)
![Render](https://img.shields.io/badge/API-Render-46E3B7)

</p>

---

## Overview

JobTrackr is a full-stack web application built to simplify the job search process.

Instead of tracking applications in spreadsheets or notes, users can centralize everything in one place, monitor their progress, and keep a clear overview of their recruitment pipeline.

The project was built from scratch using Angular and ASP.NET Core, with JWT authentication, PostgreSQL, and a cloud deployment architecture.

---

## Live Demo

**Application**

https://jobtrackr-web-navy.vercel.app

**REST API**

https://jobtrackr-api-gwkx.onrender.com

---

## Features

- User registration
- Secure authentication using JWT
- Password hashing with BCrypt
- Create, edit and delete job applications
- Search by company or position
- Filter applications by status
- Responsive dashboard
- Protected routes
- RESTful API

---

## Tech Stack

### Frontend

- Angular 20
- TypeScript
- SCSS
- Angular Signals
- Standalone Components
- RxJS

### Backend

- ASP.NET Core 10
- Entity Framework Core
- PostgreSQL
- JWT Authentication
- BCrypt

### Deployment

- Vercel
- Render
- Neon PostgreSQL

---

## Architecture

```text
                Angular
                    │
                    │ HTTPS
                    ▼
        ASP.NET Core REST API
                    │
        Entity Framework Core
                    │
                    ▼
          PostgreSQL (Neon)
```

---

## Screenshots

### Login

> Screenshot coming soon.

### Dashboard

> Screenshot coming soon.

### New Application

> Screenshot coming soon.

---

## Run Locally

### Clone the repositories

```bash
git clone https://github.com/anislahouani/jobtrackr-api.git
git clone https://github.com/anislahouani/jobtrackr-web.git
```

### Backend

```bash
cd JobTrackr.Api

dotnet restore

dotnet ef database update

dotnet run
```

The API will be available at:

```text
http://localhost:5159
```

### Frontend

```bash
cd JobTrackr.Web

npm install

ng serve
```

The application will be available at:

```text
http://localhost:4200
```

---

## Project Structure

### Backend

```text
Controllers/
Configurations/
DTOs/
Data/
Enums/
Interfaces/
Mappings/
Middleware/
Migrations/
Models/
Repositories/
Services/
```

### Frontend

```text
src/
 ├── app/
 │   ├── core/
 │   ├── features/
 │   ├── shared/
 │   └── app.routes.ts
 ├── public/
 └── styles.scss
```

---

## Roadmap

Planned improvements:

- Resume and cover letter upload
- Email notifications
- Calendar integration
- Analytics dashboard
- Unit testing
- Integration testing
- Docker support
- GitHub Actions CI/CD

---

## Author

**Anis Lahouani**

GitHub

https://github.com/anislahouani

---

## License

This project is licensed under the MIT License.
