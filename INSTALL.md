# Installation and Setup Instructions

## Prerequisites
- Node.js 18+ installed
- npm package manager

## PowerShell Execution Policy Error Fix

If you see this error:
```
cannot be loaded because running scripts is disabled on this system
```

**Solution**:
1. Open PowerShell as Administrator
2. Run: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`
3. Press 'Y' to confirm
4. Close and reopen your terminal

## Installation Steps

1. Navigate to project:
   ```bash
   cd "d:\projects\car rental\ryde-rent-a-car"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Open browser to: http://localhost:3000

## Login Credentials (Mock Auth)
- Email: any valid email
- Password: any password

## Available Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

## Environment Variables (Optional)

Create `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_APP_NAME="Ryde Rent A Car"
```

## Troubleshooting

### TypeScript Errors
- Install dependencies first: `npm install`
- Restart VS Code
- Restart TypeScript Server: Cmd/Ctrl + Shift + P > "TypeScript: Restart TS Server"

### Build Errors
- Clear cache: `rm -rf .next` or `rmdir /s .next` (Windows)
- Reinstall: `rm -rf node_modules package-lock.json && npm install`

### Port Already in Use
- Kill process on port 3000
- Or use different port: `npm run dev -- -p 3001`

## Project Structure

```
app/
├── dashboard/           # All admin pages
│   ├── cars/           # Fleet management
│   ├── bookings/       # Reservations
│   ├── customers/      # Customer management
│   ├── payments/       # Transactions
│   ├── offers/         # Promotions
│   ├── maintenance/    # Service tracking
│   ├── reports/        # Analytics
│   ├── notifications/  # Notification center
│   └── settings/       # Configuration
└── login/              # Authentication

components/
├── ui/                 # shadcn/ui components
└── layout/             # Header, Sidebar

lib/
├── api/                # API clients
└── utils.ts            # Utilities

types/                  # TypeScript types
data/                   # Mock data
```

## Next Steps

1. ✅ Install dependencies (`npm install`)
2. ✅ Run dev server (`npm run dev`)
3. ✅ Explore all dashboard pages
4. ⏭️ Connect to real backend API (when ready)
5. ⏭️ Deploy to production

See `README.md` and `walkthrough.md` for more details.
