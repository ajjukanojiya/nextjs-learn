"use client";

import { Employee } from "@/types/employee";

import {updateEmployee} from "@/services/employeeApi"
import { useState } from "react";

import { useRouter } from "next/navigation";

interface EditEmployeeFormProps {
    employee: Employee;
}

export default function EditEmployeeForm({
    employee,
}: EditEmployeeFormProps) {


     const router = useRouter();

    const [name, setName] = useState(employee.name);
    const [email, setEmail] = useState(employee.email);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {

        e.preventDefault();

        try {

            setLoading(true);

            await updateEmployee(employee.id, {
                name,
                email,
            });

            console.log("Employee updated successfully",name,email);

            router.push("/employees");

            router.refresh();

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }
    }



    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <div className="mx-auto max-w-2xl">

                <div className="rounded-lg bg-white p-6 shadow-md">

                    <h1 className="mb-6 text-2xl font-semibold text-gray-800">
                        Edit Employee
                    </h1>

                    <form className="space-y-5" onSubmit={handleSubmit}>

                        {/* Name */}
                        <div>
                            <label
                                htmlFor="name"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Name
                            </label>

                            <input
                                id="name"
                                type="text"  onChange={(e)=>(setName(e.target.value))}
                                defaultValue={employee.name}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Email
                            </label>

                            <input
                                id="email"
                                type="email" onChange={(e)=>(setEmail(e.target.value))}
                                defaultValue={employee.email}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                        </div>

                        {/* Button */}
                        <div className="pt-2">

                            <button
                                type="submit"
                                className="rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
                            >
                                Update Employee
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
}