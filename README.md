# ResaApp

A full-stack quote management application with .NET 10 backend and Angular 21 frontend.

## Architecture

```
ResaApp/
├── ResaBackend/          # .NET 10 ASP.NET Core Web API
│   ├── Controllers/      # REST API endpoints
│   ├── Models/           # Entity models
│   ├── Dto/              # Data Transfer Objects
│   └── Program.cs        # Application entry point
├── ResaFrontend/         # Angular 21 standalone components
│   ├── src/app/          # Application source code
│   │   ├── components/   # UI components (home, navbar)
│   │   ├── service/      # API services
│   │   └── models/       # TypeScript interfaces
│   └── package.json      # Dependencies
├── resaApp.sln           # Visual Studio solution
└── start-all.ps1         # Launch both apps script
```

## Features

- **Quote Management**: CRUD operations for managing quotes
- **Random Quote**: Generate random quotes with a single click
- **Bootstrap 5 UI**: Modern responsive interface
- **Signal-based State**: Angular Signals for reactive data management

## Backend API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/quote/get-quote` | Get first quote |
| GET | `/api/quote/get-random-quote` | Get random quote |
| GET | `/api/quote/get-all-quotes` | Get all quotes |
| POST | `/api/quote/add-quote` | Add new quote |
| PUT | `/api/quote/update-quote/{id}` | Update existing quote |
| DELETE | `/api/quote/delete-quote/{id}` | Delete quote by ID |

## Prerequisites

- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0)
- [Node.js 20+](https://nodejs.org/)
- [Angular CLI](https://angular.io/cli)

## Quick Start

### Option 1: Use the launch script (recommended)

```powershell
.\start-all.ps1
```

This will start both the backend and frontend automatically.

### Option 2: Manual startup

**Backend:**
```powershell
cd ResaBackend
dotnet run
```

The API will be available at `https://localhost:7261`

**Frontend:**
```powershell
cd ResaFrontend
npm install
ng serve --open
```

The app will open at `http://localhost:4200`

## Development

### Backend (.NET 10)

```powershell
cd ResaBackend
dotnet restore
dotnet build
dotnet run
```

### Frontend (Angular 21)

```powershell
cd ResaFrontend
npm install
ng serve
ng build
ng test
```

## Tech Stack

- **Backend**: .NET 10.0, ASP.NET Core Web API, in-memory storage
- **Frontend**: Angular 21.2.6, TypeScript, Bootstrap 5.3.0, Bootstrap Icons 1.11.0
- **State Management**: Angular Signals (signal() API)

## License

MIT
