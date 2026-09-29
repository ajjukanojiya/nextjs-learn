import { useState } from "react";
import { Employee } from "@/types/employee";
// useEmployeeForm.ts

// import {
//     createEmployee,
//     updateEmployee,
// } from "@/services/employeeApi";

export function useEmployeeForm() {

    const [employee, setEmployee] = useState<Employee>({
        id: 0,
        name: "",
        email: "",
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
    });

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isEditMode, setIsEditMode] = useState(false);

      function openModal() {
        setIsModalOpen(true);
        setIsEditMode(false);
    }

    function closeModal() {
        // Extra logic
        setIsModalOpen(false);
    }

       function resetEmployeeForm() {
    setEmployee({
        id: "",
        name: "",
        email: "",
    });

    closeModal();
}


function handleEditEmployee(emp: Employee) {
    setEmployee(emp);
    setIsModalOpen(true);
    setIsEditMode(true);
}


async function createNewEmployee() {

       await createEmployee( {
                        name: employee.name,
                        email: employee.email,
                    })   
                    
                    
}

async function updateExistingEmployee() {

     await updateEmployee(employee.id,
                    {
                        name: employee.name,
                        email: employee.email,
                    }
                );

              

}

    return {
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
    };
}