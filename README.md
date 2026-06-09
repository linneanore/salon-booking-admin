# Salon Booking Admin

A fullstack admin panel for managing bookings, customers, and staff at a hair salon.

Built as a portfolio project to demonstrate fullstack development with React and .NET.

## Tech Stack

**Frontend**
- React 19 + TypeScript
- Tailwind CSS + shadcn/ui
- React Hook Form + Zod
- React Router

**Backend**
- C# / ASP.NET Core (.NET 10)
- Entity Framework Core
- SQLite

## Features

- Booking management with status updates
- Customer registry with search
- Service management with categories and pricing
- Staff management with schedules
- Weekly calendar view
- Salon settings

## Getting Started

**Start the backend:**
```bash
cd salon-booking-api/SalonBookingApi
dotnet run
```

**Start the frontend:**
```bash
npm install
npm run dev
```

Open `http://localhost:5173`

## Security Notes

> ⚠️ This is a demo project. The following security features are intentionally omitted but would be required in a production environment:
>
> - **Authentication & Authorization** — All API endpoints are currently open. A production system would require JWT-based authentication and role-based access control (e.g. admin vs staff).
> - **HTTPS in production** — The API currently runs on HTTP locally. Production deployment would enforce HTTPS.
> - **Environment variables** — API URLs and connection strings would be stored in environment-specific config files, not hardcoded.

## Project Structure

```
salon-booking-admin/
├── src/                    # React frontend
│   ├── components/         # Reusable UI components
│   ├── context/            # Global state management
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # API client and utilities
│   ├── pages/              # Page components
│   └── types/              # TypeScript type definitions
└── salon-booking-api/      # .NET backend
    └── SalonBookingApi/
        ├── Controllers/    # API endpoints
        ├── Data/           # DbContext and seeder
        └── Models/         # Database models
```