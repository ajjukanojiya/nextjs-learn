"use client";
import EmployeeHeader from "@/components/EmployeeHeader";
import EmployeeTable from "@/components/EmployeeTable";
import AddEmployeeModal from "@/components/AddEmployeeModal";
import { useState } from "react";
import axios from "axios";
import { getEmployees, createEmployee, updateEmployee, deleteEmployee as deleteEmployeeApi, } from "@/services/employeeApi";
import { useEffect } from "react";
import { Employee, EmployeeErrors } from "@/types/employee";

import { useEmployees } from "@/hooks/useEmployees"
import { useEmployeeForm } from "@/hooks/useEmployeeForm"
import { validateEmployee } from "@/utils/employeeValidation";
import toast from "react-hot-toast";
import { EmployeeFormData } from "@/schemas/employeeSchema";



export default function EmployeePage() {

    const [search, setSearch] = useState('');
    const {
        employees,
        loading,
        error,
        fetchEmployees,
    } = useEmployees();


    const {
        employee,
        setEmployee,
        errors,
        setErrors,
        isModalOpen,
        setIsModalOpen,
        isEditMode,
        setIsEditMode,
        openModal,
        closeModal,
        resetEmployeeForm,
        handleEditEmployee,
        createNewEmployee,
        updateExistingEmployee,
    } = useEmployeeForm();

    const [isSaving, setIsSaving] = useState(false);





    const filteredEmployees = employees.filter((employee) => {
        return (
            employee.name.toLowerCase().includes(search.toLowerCase())
        )
    })



    async function handleSaveEmployee(data: EmployeeFormData) {

   
        setIsSaving(true);


        try {

            if (isEditMode) {

                await updateEmployee(employee.id, {
                    name: data.name,
                    email: data.email,
                });

                toast.success("Employee  updated  successfully");

            } else {

                await createEmployee({
                    name: data.name,
                    email: data.email,
                });

                toast.success("Employee created successfully");

            }

            await fetchEmployees();

            resetEmployeeForm();

            setIsEditMode(false);
            return {
                success: true
            }

        } catch (error) {

            return {
                success: false,
                 message: "Something went wrong"
            }

          

        } finally {

            setIsSaving(false);

        }
    }



    async function handleDeleteEmployee(id: number) {



        const confirmed = window.confirm(
            "Are you sure you want to delete this employee?"
        );
        if (!confirmed) {
            return;
        }


        try {


            await deleteEmployeeApi(id);

            await fetchEmployees();

            toast.success("Employee deleted successfully");

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }

    }







    return (
        <>
            <main className="p-5">
                <div className="mb-5">
                    <EmployeeHeader search={search} setSearch={setSearch} onAddEmployeeClick={openModal} />
                </div>


                {loading ? (
                    <p>Loading...</p>
                ) : filteredEmployees.length === 0 ? (
                    <div className="text-center py-10">
                        <h2 className="text-xl font-semibold">
                            No Employees Found
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Click "Add Employee" to create one.
                        </p>
                    </div>
                ) : (
                    <EmployeeTable
                        employees={filteredEmployees}
                        onDelete={handleDeleteEmployee}
                        onEdit={handleEditEmployee}
                    />
                )}



                {isModalOpen && <AddEmployeeModal employee={employee} onClose={closeModal} onSave={handleSaveEmployee} isSaving={isSaving} />}

            </main>


        </>
    );

}