"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/studio";

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push(redirect);
      } else {
        setError(data.error || "Invalid password");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <div className="bg-white/80 backdrop-blur-md p-10 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] w-full max-w-md border border-gray-200">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800 tracking-tight">
          Admin Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Admin Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black shadow-sm"
              placeholder="Enter admin password"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm font-medium bg-red-50 p-2 rounded-lg border border-red-200">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 transition-all shadow-md hover:shadow-lg"
          >
            {loading ? "Logging in..." : "Login to Studio"}
          </button>
        </form>

        <p className="mt-5 text-sm text-gray-600 text-center">
          After login, you'll need to authenticate with Sanity
        </p>
      </div>
    </div>
  );
}
