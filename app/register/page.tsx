"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import LoadingSpinner from "@/components/LoadingSpinner";

import { validateEmail, validatePassword } from "@/lib/utils";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: any) => {
    e.preventDefault();
    setError("");

    // Validasi
    if (!validateEmail(form.email)) {
      setError("Format email tidak valid");
      return;
    }

    if (!validatePassword(form.password)) {
      setError("Password minimal 6 karakter");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        return;
      }

      router.push("/login?success=Account created! Please login.");
    } catch (err) {
      setError("Terjadi kesalahan server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950 px-4 font-sans transition-colors duration-500">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 shadow-sm border border-gray-200 dark:border-slate-800 rounded-2xl p-8 transform transition-all duration-300">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 mb-2">
            Create Account
          </h1>
          <p className="text-gray-500 dark:text-gray-400">Join us to access the dashboard</p>
        </div>

        {error && (
          <div className="mb-6 text-sm text-red-500 bg-red-50 dark:bg-red-900/20 p-3 rounded-xl border border-red-100 dark:border-red-900/30">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
              Username
            </label>
            <input
              type="text"
              required
              className="w-full mt-1.5 px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:bg-gray-700 dark:text-white"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
              Email Address
            </label>
            <input
              type="email"
              required
              className="w-full mt-1.5 px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:bg-gray-700 dark:text-white"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full mt-1.5 px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:bg-gray-700 dark:text-white"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 active:scale-[0.98] text-white py-3.5 rounded-xl font-bold transition-all shadow-lg hover:shadow-blue-500/30 disabled:opacity-70 mt-4 flex items-center justify-center gap-2"
          >
            {loading ? <LoadingSpinner /> : "Register"}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
}
