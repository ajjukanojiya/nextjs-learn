
import { Employee, EmployeeErrors } from "@/types/employee";
import { Dispatch, SetStateAction } from "react";
import Input from "./Input";
import { useEffect, useState } from "react";

import Button from "./Button";


import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    employeeSchema,
    EmployeeFormData,
} from "@/schemas/employeeSchema";


interface AddEmployeeModalProps {
    employee: Employee;    
    onClose: () => Promise<void>;
    onSave: (data: EmployeeFormData) => Promise<{ success: boolean; message?: string }>;
    isSaving: boolean;   // ✅ Add this
}

export default function AddEmployeeModal({ employee, onClose, onSave, isSaving }: AddEmployeeModalProps) {

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setError,
    } = useForm<EmployeeFormData>({
        defaultValues: {
            name: "",
            email: "",
        },
        resolver: zodResolver(employeeSchema),
    });

    useEffect(() => {
        reset({
            name: employee.name,
            email: employee.email,
        });
    }, [employee, reset]);


   const submitForm = async (data: EmployeeFormData) => {

    const result = await onSave(data);

        if (result.success === false) {
            setError("email", {
                type: "manual",
                message: result.message
            });
        }

}

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
            <form onSubmit={handleSubmit(submitForm)}>

            <div className="bg-white p-6 rounded-lg w-96">

                <h2 className="text-xl font-semibold mb-4">
                    {employee.id === 0 ? "Add Employee" : "Edit Employee"}
                </h2>

                <input {...register("name")} className="w-full border border-gray-300 rounded p-2 mb-4" placeholder="enter name " />
                {errors.name && (
                    <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
                <input {...register("email")} className="w-full border border-gray-300 rounded p-2 mb-4" placeholder="enter email" />
                {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
                <div className="flex justify-end gap-2">

                    <Button
                         type="submit"
                        disabled={isSaving}
                        className="bg-blue-500"
                    >
                        {isSaving
                            ? "Saving..."
                            : employee.id === 0
                                ? "Create"
                                : "Update"}
                    </Button>

                    <Button
                        type="button"
                        onClick={onClose}   
                        disabled={isSaving}
                        className="bg-gray-500"
                    >

                        Cancel
                    </Button>
                </div>
            </div>
            </form>
        </div>
    );
}
              
    