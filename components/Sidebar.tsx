"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {

    const pathname = usePathname();

    return (
        <aside className="w-64 min-h-screen bg-gray-900 text-white">

            <div className="h-16 flex items-center px-6 border-b border-gray-700">
                <h2 className="text-lg font-semibold">
                    Admin Panel
                </h2>
            </div>

            <nav className="p-4 space-y-2">

                <Link
                    href="/dashboard"
                    className={`block rounded-md px-4 py-3 ${
                        pathname === "/dashboard"
                            ? "bg-blue-600"
                            : "hover:bg-gray-800"
                    }`}
                >
                    Dashboard
                </Link>

                <Link
                    href="/employees"
                    className={`block rounded-md px-4 py-3 ${
                        pathname === "/employees"
                            ? "bg-blue-600"
                            : "hover:bg-gray-800"
                    }`}
                >
                    Employees
                </Link>

                <Link
                    href="/dashboard/users"
                    className={`block rounded-md px-4 py-3 ${
                        pathname === "/dashboard/users"
                            ? "bg-blue-600"
                            : "hover:bg-gray-800"
                    }`}
                >
                    Users
                </Link>

                <Link
                    href="/dashboard/products"
                    className={`block rounded-md px-4 py-3 ${
                        pathname === "/dashboard/products"
                            ? "bg-blue-600"
                            : "hover:bg-gray-800"
                    }`}
                >
                    Products
                </Link>

            </nav>

        </aside>
    );
}