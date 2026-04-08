"use client";

import { useState, Suspense } from "react";
import { Icon } from "@iconify/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import LoadingSpinner from "@/components/LoadingSpinner";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const successMessage = searchParams.get("success");

  const [form, setForm] = useState({
    emailOrUsername: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setError("");

    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        return;
      }

      router.push("/dashboard");
    } catch (err) {
      setError("Terjadi kesalahan server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white dark:bg-slate-900 shadow-sm border border-gray-200 dark:border-slate-800 rounded-2xl p-8 transform transition-all duration-300">

      <div className="mb-8">
        <h1 className="mb-2 font-semibold text-gray-800 dark:text-gray-300 text-3xl">Login</h1>
        <p className="text-sm mt-3 text-gray-500 dark:text-gray-400"> Silakan masukkan detail Anda untuk masuk</p>
      </div>

      {successMessage && (
        <div className="mb-6 text-sm text-green-600 bg-green-50 dark:bg-green-900/20 p-3 rounded-xl border border-green-100 dark:border-green-900/30">
          {successMessage}
        </div>
      )}

      {error && (
        <div className="mb-6 text-sm text-red-500 bg-red-50 dark:bg-red-900/20 p-3 rounded-xl border border-red-100 dark:border-red-900/30">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin}>
        <fieldset disabled={loading} className="space-y-5">
          <div>
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
              Email / Nama Pengguna
            </label>
            <input
              type="text"
               autoComplete="username"
              required
              className="w-full mt-1.5 px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-1 focus:ring-blue-500 outline-none transition-all dark:bg-gray-700 dark:text-white"
              value={form.emailOrUsername}
              placeholder="Masukkan email atau nama pengguna"
              onChange={(e) =>
                setForm({ ...form, emailOrUsername: e.target.value })
              }
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
              Kata Sandi
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                className="w-full mt-1.5 px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-1 focus:ring-blue-500 outline-none transition-all dark:bg-gray-700 dark:text-white"
                value={form.password}
                placeholder="Masukkan kata sandi"
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-8 -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors"
              >
                {showPassword ? (
                  <Icon icon="lucide:eye-off" className="w-5 h-5" />
                ) : (
                  <Icon icon="lucide:eye" className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 active:scale-[0.98] text-white py-3.5 rounded-xl font-bold transition-all shadow-lg hover:shadow-blue-500/30 disabled:opacity-70 mt-4 flex items-center justify-center gap-2"
          >
            {loading ? <LoadingSpinner /> : "Masuk"}
          </button>
        </fieldset>
      </form>

      <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        Belum punya akun?{" "}
        <Link href="/register" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
          Daftar di sini
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="relative flex lg:flex-row w-full h-screen justify-center flex-col bg-slate-100 dark:bg-slate-950">
      <div className="lg:w-1/2 w-full h-full dark:bg-slate-900 lg:grid items-center justify-center hidden relative">
        <img src="/bg.avif" alt="bg" className="object-fill"></img>
      </div>
      <div className="items-center justify-center flex flex-col lg:w-1/2 bg-slate-50 dark:bg-slate-950 p-10">
        <Suspense fallback={<div className="text-gray-500 dark:text-gray-400 text-center py-10">Memuat...</div>}>
          <LoginContent />
        </Suspense>
      </div>
    </div>
  );
}