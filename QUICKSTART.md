# Quick Start Guide - DO THIS FIRST!

## ⚠️ IMPORTANT: Install Dependencies

The TypeScript errors you're seeing are because the dependencies haven't been installed yet.

### Step 1: Enable PowerShell Scripts (One-time setup)

Open PowerShell as **Administrator** and run:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Then close PowerShell.

### Step 2: Install Dependencies

Open a **new terminal** in VS Code and run:

```bash
npm install
```

This will install all required packages:
- Next.js & React
- Tailwind CSS
- shadcn/ui components (Radix UI)
- lucide-react (icons)
- TanStack Query
- React Hook Form & Zod
- Recharts
- axios, clsx, tailwind-merge, etc.

### Step 3: Run the Application

```bash
npm run dev
```

Open your browser to: **http://localhost:3000**

### Step 4: Login

- **Email**: Any email (e.g., `admin@ryderentals.com`)
- **Password**: Any password (mock authentication)

---

## 🔍 Quick Check

After installation, all TypeScript errors should disappear:
- ✓ `clsx` and `tailwind-merge` will be available
- ✓ `lucide-react` will provide all icons
- ✓ All Radix UI components will be installed
- ✓ Project will build successfully

---

## 📁 What's Included

✅ **9 Complete Pages**:
1. Dashboard - Analytics & metrics  
2. Cars - Fleet management
3. Bookings - Reservation tracking
4. Payments - Transaction management
5. Customers - Profile management
6. Offers - Discount codes
7. Maintenance - Service tracking
8. Reports - Analytics & charts
9. Notifications - Message center
10. Settings - Configuration

Plus Login page with mock authentication.

---

## 🐛 If You Still See Errors

1. **Restart VS Code** - Sometimes needed after installing packages
2. **Check TypeScript Server** - Click on TypeScript version in status bar > "Restart TS Server"
3. **Clear Cache**:
   ```bash
   npm run build
   ```

---

## 📚 More Information

See `README.md` for detailed documentation and `walkthrough.md` for a complete feature tour.
