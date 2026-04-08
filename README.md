# Secure Next.js Authentication System

Sistem autentikasi modern yang dibangun dengan Next.js, mengimplementasikan praktik keamanan terbaik termasuk JWT dalam HttpOnly cookies, hashing password dengan Bcrypt, dan pembatasan percobaan login (Rate Limiting).

## 🚀 Tech Stack

- **Framework**: [Next.js 15+ (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Database ORM**: [Prisma](https://www.prisma.io/)
- **Database**: MySQL (Host: Railway)
- **Authentication**: JWT (JsonWebToken) & HttpOnly Cookies
- **Theme Management**: [next-themes](https://github.com/pacocoursey/next-themes)
- **Validation**: [Zod](https://zod.dev/) integrated in logic
- **Security**: 
  - Password Hashing: `bcryptjs`
  - Rate Limiting: Custom In-memory implementation (5 attempts/minute)

## 🏗️ Arsitektur Sistem

Proyek ini mengikuti arsitektur modular Next.js App Router:

- **`/app`**: Direktori utama untuk routing dan komponen halaman.
  - **`/api/auth`**: Endpoint API untuk login, register, dan logout.
  - **`/dashboard`**: Rute terproteksi yang memverifikasi JWT melalui middleware/logic server.
- **`/components`**: Komponen UI yang dapat digunakan kembali (ThemeToggle, LoadingSpinner, dll).
- **`/lib`**: Logika inti aplikasi.
  - `auth.ts`: Utilitas untuk pembuatan dan verifikasi JWT.
  - `prisma.ts`: Inisialisasi Prisma Client.
  - `rateLimit.ts`: Logika pembatasan percobaan login per IP.
- **`/prisma`**: Skema database dan migrasi.

### Alur Autentikasi:
1. Pengguna memasukkan kredensial.
2. Server memverifikasi terhadap database dan membandingkan hash password.
3. Jika valid, server menghasilkan JWT dan menyimpannya dalam Cookie dengan flag `HttpOnly` (untuk mencegah serangan XSS).
4. Setiap permintaan berikutnya ke halaman terproteksi menyertakan cookie ini untuk divalidasi oleh server.

## 🛠️ Cara Menjalankan Project

### 1. Prasyarat
Pastikan Anda sudah menginstal [Node.js](https://nodejs.org/) (versi 18+) dan [MySQL](https://www.mysql.com/).

### 2. Kloning & Instalasi
```bash
# Instal dependensi
npm install
```

### 3. Konfigurasi Environment
Buat file atau pastikan file `.env` sudah sesuai:
```env
DATABASE_URL="mysql://root:password@host:port/dbname"
JWT_SECRET="masukkan-secret-key-anda-disini"
```

### 4. Setup Database
```bash
# Jalankan migrasi prisma untuk sinkronisasi schema
npx prisma db push
```

### 5. Jalankan Aplikasi
```bash
# Development mode
npm run dev
```
Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## 🛡️ Fitur Keamanan
- **Rate Limiting**: Maksimal 5 kali percobaan login per menit untuk mencegah Brute Force.
- **CSRF & XSS Protection**: Token disimpan dalam HttpOnly Cookie.
- **Password Safety**: Password tidak pernah disimpan dalam bentuk teks biasa (plain text).
- **Modern UI**: Dilengkapi Dark Mode, Glassmorphism, dan animasi loading yang modern.

---
Dikembangkan dengan ❤️ untuk sistem autentikasi yang aman dan estetik.
