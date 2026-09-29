"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginSchema } from "@/schemas/auth"

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string[] | undefined>>({});
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setServerError("");
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setServerError("");

    // Client-side Validation
    const validation = LoginSchema.safeParse(formData);
    if (!validation.success) {
      setErrors(validation.error.flatten().fieldErrors);
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerError(data.error || "Login failed");
      } else {
        // Redirect to protected dashboard after successful login
        router.push("/dashboard");
        router.refresh();
      }
    } catch {
      setServerError("Server error occurred!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Login</h2>

        {serverError && (
          <div className="mb-4 p-3 rounded text-sm bg-red-50 text-red-700 border border-red-200">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              value={formData.email}
              onChange={handleChange}
            />
            {errors?.email?.[0] && <p className="text-red-500 text-xs mt-1">{errors.email[0]}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              value={formData.password}
              onChange={handleChange}
            />
            {errors?.password?.[0] && <p className="text-red-500 text-xs mt-1">{errors.password[0]}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition font-medium disabled:bg-blue-300"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}