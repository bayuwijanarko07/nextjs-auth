# Secure Next.js Authentication System

[![Deploy Link](https://img.shields.io/badge/Deploy-nextjs--auth--flame.vercel.app-blue)](https://nextjs-auth-flame.vercel.app)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-black?logo=github)](https://github.com/bayuwijanarko07/nextjs-auth)

Sistem autentikasi modern yang dibangun dengan **Next.js 15+**, mengimplementasikan praktik keamanan terbaik termasuk **JWT** dalam **HttpOnly cookies**, hashing password dengan **Bcrypt**, dan pembatasan percobaan login (**Rate Limiting**).

## 🔗 Live Preview
Akses aplikasi melalui tautan berikut:  
[ Live Preview ](https://nextjs-auth-flame.vercel.app)


Login Menggunakan:
- Username: testuser
- Password: password123

Atau 

Daftar Menggunakan:
- Email: 
- Username: 
- Password: 

## 📸 Screenshots UI

### Tampilan Desktop
<div align="center">
  <img src="./public/screenshots/desktop-login.avif" width="32%" alt="Desktop Login" />
  <img src="./public/screenshots/desktop-register.avif" width="32%" alt="Desktop Register" />
  <img src="./public/screenshots/desktop-dashboard.avif" width="32%" alt="Desktop Dashboard" />
</div>

### Tampilan Mobile
<div align="center">
  <img src="./public/screenshots/mobile-login.avif" width="200" alt="Mobile Login" />
  <img src="./public/screenshots/mobile-register.avif" width="200" alt="Mobile Register" />
</div>

## 🚀 Tech Stack

- **Framework**: [Next.js 15+ (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Database ORM**: [Prisma](https://www.prisma.io/)
- **Database**: MySQL (Host: Railway)
- **Authentication**: JWT (JsonWebToken) & HttpOnly Cookies
- **Theme Management**: [next-themes](https://github.com/pacocoursey/next-themes)
- **Validation**: [Zod](https://zod.dev/)
- **Security**: 
  - Password Hashing: `bcryptjs`
  - Rate Limiting: Custom In-memory (5 percobaan/menit)

## 🏗️ Arsitektur Sistem

Proyek ini menggunakan arsitektur modular **Next.js App Router**:

- **`/app`**: Routing dan Komponen Halaman.
  - **`/api/auth`**: Endpoint API (Login, Register, Logout).
  - **`/dashboard`**: Rute terproteksi dengan verifikasi server-side JWT.
- **`/components`**: UI Reusable (ThemeToggle, LoadingSpinner).
- **`/lib`**: Logika Inti (Auth utils, Prisma client, Rate limiter).
- **`/prisma`**: Skema Database & Migrasi.

### Alur Kerja Autentikasi:
1. **Submit**: Pengguna memasukkan kredensial (Email/Username).
2. **Verify**: Server memvalidasi dengan Zod, mengecek database, dan membandingkan hash password.
3. **Token**: Jika valid, JWT dibuat dan disimpan di **HttpOnly Cookie** (Aman dari XSS).
4. **Protect**: Middleware atau Server Logic memverifikasi cookie pada setiap akses rute terproteksi.

## 🛠️ Cara Menjalankan Project (Lokal)

### 1. Prasyarat
- Node.js 18+
- MySQL Database

### 2. Instalasi
```bash
git clone https://github.com/bayuwijanarko07/nextjs-auth.git
cd nextjs-auth
npm install
```

### 3. Konfigurasi Environment (`.env`)
```env
DATABASE_URL="mysql://user:pass@host:port/dbname"
JWT_SECRET="rahasia"
```

### 4. Setup & Run
```bash
npx prisma db push
npm run dev
```
Aplikasi akan berjalan di [http://localhost:3000](http://localhost:3000).

## 🛡️ Fitur Keamanan
- **Brute Force Protection**: Rate limiting 5x percobaan per menit.
- **Cookie-based Auth**: Token disimpan secara aman tanpa akses JavaScript di sisi client.
- **Password Hashing**: Menggunakan Bcrypt dengan salt 10.
- **Modern Responsive Design**: Dukungan Dark Mode dan Full Responsive (Mobile/Desktop).

---
*Dibuat oleh [Bayu Wijanarko](https://github.com/bayuwijanarko07)*
