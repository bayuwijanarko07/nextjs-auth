import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const payload = verifyToken(token);

  if (!payload) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Selamat datang! Anda berhasil login.
        </p>
        <form action="/api/auth/logout" method="POST">
          <button
            type="submit"
            className="cursor-pointer bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition"
          >
            Keluar
          </button>
        </form>
      </div>
    </div>
  );
}
