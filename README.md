# Ryde Rent A Car - Admin Dashboard

A modern, production-ready car rental management system built with Next.js 16, TypeScript, Tailwind CSS, and shadcn/ui.

![Ryde Rent A Car](https://img.shields.io/badge/Next.js-16.0-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Available Pages](#available-pages)
- [API Integration](#api-integration)
- [Development](#development)
- [Deployment](#deployment)

## ✨ Features

### Core Functionality
- 🚗 **Fleet Management** - Complete car inventory management with status tracking
- 📅 **Booking System** - Full booking lifecycle management (pending → confirmed → active → completed)
- 💳 **Payment Processing** - Payment tracking and invoice generation
- 👥 **Customer Management** - Customer profiles with document verification
- 🎟️ **Offers & Promotions** - Discount code management and usage tracking
- 🔧 **Maintenance Tracking** - Vehicle maintenance scheduling and history
- 📊 **Analytics & Reports** - Interactive charts and downloadable reports
- 🔔 **Notifications** - Multi-channel notification system

### UI/UX Features
- 🎨 Modern, clean design with glassmorphism effects
- 🌓 Light/Dark mode support (theme system ready)
- 📱 Fully responsive across all devices
- ♿ Accessible components (WCAG compliant)
- 🎭 Smooth animations and transitions
- 🔍 Advanced search and filtering
- 📈 Interactive data visualization with Recharts

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui (Radix UI)
- **Icons**: Lucide React
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod
- **State**: TanStack Query (React Query)
- **HTTP Client**: Axios

### Backend Integration
- Type-safe API clients
- Mock data for development
- Ready for microservices integration

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone or navigate to the project**
   ```bash
   cd "d:\projects\car rental\ryde-rent-a-car"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000/api
   NEXT_PUBLIC_APP_NAME="Ryde Rent A Car"
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Demo Login
Use any email and password to login (mock authentication):
- **Email**: `admin@ryderentals.com`
- **Password**: Any password

## 📁 Project Structure

```
ryde-rent-a-car/
├── app/                          # Next.js App Router
│   ├── dashboard/               # Main dashboard pages
│   │   ├── cars/               # Cars management
│   │   ├── bookings/           # Bookings management
│   │   ├── customers/          # Customers management
│   │   ├── payments/           # Payments & invoices
│   │   ├── offers/             # Offers & promotions
│   │   ├── maintenance/        # Maintenance tracking
│   │   ├── reports/            # Reports & analytics
│   │   ├── notifications/      # Notifications center
│   │   ├── settings/           # System settings
│   │   └── layout.tsx          # Dashboard layout
│   ├── login/                  # Login page
│   ├── globals.css             # Global styles
│   └── layout.tsx              # Root layout
│
├── components/
│   ├── ui/                     # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── table.tsx
│   │   └── ...
│   └── layout/                 # Layout components
│       ├── Header.tsx          # Top navigation
│       └── Sidebar.tsx         # Side navigation
│
├── lib/
│   ├── api/                    # API clients
│   │   ├── client.ts          # Axios instance
│   │   ├── auth.ts            # Auth API
│   │   ├── cars.ts            # Cars API
│   │   ├── bookings.ts        # Bookings API
│   │   └── ...
│   └── utils.ts               # Utility functions
│
├── types/                      # TypeScript definitions
│   ├── auth.ts
│   ├── car.ts
│   ├── booking.ts
│   ├── customer.ts
│   └── ...
│
├── data/
│   └── mockData.ts            # Mock data for development
│
├── hooks/
│   └── use-toast.ts           # Toast notifications hook
│
└── public/                    # Static assets
```

## 📄 Available Pages

### 1. Dashboard (`/dashboard`)
- **Overview statistics** (total cars, bookings, revenue, customers)
- **Revenue chart** (last 30 days)
- **Recent bookings** list
- Quick metrics with trend indicators

### 2. Cars Management (`/dashboard/cars`)
- Fleet inventory table with advanced filtering
- Status-based filtering (available, rented, maintenance)
- Search by brand, model, or license plate
- Fleet statistics by status
- CRUD operations (view, edit, delete)

### 3. Bookings Management (`/dashboard/bookings`)
- Complete booking lifecycle tracking
- Status filtering (pending, confirmed, active, completed, cancelled)
- Customer and vehicle details
- Rental period display
- Booking statistics

### 4. Customers Management (`/dashboard/customers`)
- Customer profiles with verification status
- Document verification management
- Booking history per customer
- Search and filter by verification status
- Customer lifetime value tracking

### 5. Payments & Invoices (`/dashboard/payments`)
- Payment transaction tracking
- Invoice generation and management
- Payment status updates
- Refund processing

### 6. Offers & Promotions (`/dashboard/offers`)
- Discount code management
- Usage tracking with progress bars
- Percentage and fixed discounts
- Campaign validity periods
- Active/expired status

### 7. Maintenance (`/dashboard/maintenance`)
- Service scheduling
- Maintenance type categorization
- Cost tracking
- Vendor management
- Status tracking (scheduled, in progress, completed)

### 8. Reports & Analytics (`/dashboard/reports`)
- **Revenue Analysis** - Bar chart by month
- **Fleet Distribution** - Pie chart by category
- **Key Metrics** - Revenue, bookings, utilization, retention
- **Quick Reports** - Pre-configured downloadable reports
- Chart visualizations with Recharts

### 9. Login (`/login`)
- Modern authentication UI
- Mock JWT authentication
- Toast notifications
- Loading states

## 🔌 API Integration

### Current Implementation
The app uses **mock data** for development. All API clients are fully typed and ready for backend integration.

### API Client Structure
```typescript
// Example: lib/api/cars.ts
export const carsApi = {
  list: async (filters?: CarFilters): Promise<Car[]> => {},
  getById: async (id: string): Promise<Car> => {},
  create: async (data: CarFormData): Promise<Car> => {},
  update: async (id: string, data: Partial<CarFormData>): Promise<Car> => {},
  delete: async (id: string): Promise<void> => {},
  uploadImages: async (id: string, files: File[]): Promise<{ images: string[] }> => {},
};
```

### Integration Steps
1. Update `NEXT_PUBLIC_API_URL` in `.env.local`
2. Implement backend microservices (Auth, Cars, Bookings, etc.)
3. API clients will automatically connect
4. Remove mock data imports from pages

## 📊 Data Models

### Key Entity Types
- **Car**: Vehicle information, pricing, availability
- **Booking**: Rental reservations with lifecycle states
- **Customer**: User profiles with verification
- **Payment**: Transaction tracking and invoices
- **Maintenance**: Service records and scheduling
- **Offer**: Promotional campaigns and discounts

All types are fully documented in the `types/` directory.

## 🎨 Customization

### Theme Colors
Edit `app/globals.css` to customize the color scheme:
```css
:root {
  --primary: 221.2 83.2% 53.3%;
  --secondary: 210 40% 96.1%;
  /* ... */
}
```

### Adding New Pages
1. Create page in `app/dashboard/[page-name]/page.tsx`
2. Add route to `components/layout/Sidebar.tsx`
3. Create types in `types/` if needed
4. Add API client in `lib/api/` if needed

## 🚢 Deployment

### Build for Production
```bash
npm run build
```

### Type Checking
```bash
npm run type-check
```

### Linting
```bash
npm run lint
```

### Deployment Platforms
- **Vercel** (Recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Docker** (see Docker configuration)

## 📝 Scripts

```json
{
  "dev": "next dev",              // Start development server
  "build": "next build",          // Build for production
  "start": "next start",          // Start production server
  "lint": "next lint",            // Run ESLint
  "type-check": "tsc --noEmit"   // TypeScript type checking
}
```

## 🔐 Authentication

Currently implements **mock authentication** for development:
- Any email/password combination works
- JWT token stored in localStorage
- Automatic redirect on login/logout
- Protected routes via middleware (ready for implementation)

For production, integrate with:
- Auth0
- NextAuth.js
- Custom JWT backend
- Firebase Auth

## 🐛 Known Limitations

- Mock data only (no real backend connection)
- No actual file uploads (S3 integration ready)
- No real payment processing (Stripe integration ready)
- No email/SMS sending (SendGrid/Twilio integration ready)

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [TanStack Query](https://tanstack.com/query)
- [Recharts](https://recharts.org/)

## 📄 License

This project is for demonstration purposes.

## 🤝 Support

For issues or questions:
1. Check the documentation
2. Review the mock data structure in `data/mockData.ts`
3. Inspect API client implementations in `lib/api/`

---

**Built with ❤️ using Next.js and TypeScript**
