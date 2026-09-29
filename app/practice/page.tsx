"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { employeeSchema } from "@/schemas/employeeSchema";

interface FormData {
    name: string;
    email: string;
}
export default function PracticePage() {

    const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
} = useForm<FormData>({
    defaultValues: {
        name: "",
        email: "",
    },
     resolver: zodResolver(employeeSchema),
});


                const onSubmit = (data: FormData) => {
                    console.log(data);
                    reset();
                };


    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-5">
                React Hook Form Practice
            </h1>

           <form onSubmit={handleSubmit(onSubmit)}>

                <input {...register('name',{required: "Name is required"})}
                    type="text"
                    placeholder="Enter Name"
                    className="w-full border p-2 rounded mb-4"
                />
                {errors.name && (
                <p className="text-red-500">
                    {errors.name.message}
                </p>
            )}

                <input {...register('email',
                
                {
                    required: "Email is required",
                    pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid Email",
                },

                }
            
            )}
                    type="email"
                    placeholder="Enter Email"
                    className="w-full border p-2 rounded mb-4"
                />
                 {errors.email && (
                    <p className="text-red-500">
                        {errors.email.message}
                    </p>
                )}

                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Submit
                </button>

            </form>
        </div>
    );
}