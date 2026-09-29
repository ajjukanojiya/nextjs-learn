"use client";
import EmployeeHeader from "@/components/EmployeeHeader";
import EmployeeTable from "@/components/EmployeeTable";
import AddEmployeeModal from "@/components/AddEmployeeModal"
import { useState } from "react";
import axios from "axios";
import { getEmployees,createEmployee,updateEmployee,  deleteEmployee as deleteEmployeeApi, } from "@/services/employeeApi";
import { useEffect } from "react";
import { Employee } from "@/types/employee";

export default function EmployeePage() {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [search, setSearch] = useState('');
    const [isEditMode, setIsEditMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [employee, setEmployee] = useState<Employee>({
        id: 0,
        name: '',
        email: ''

    });
    const [errors, setErrors] = useState({
        name: "",
        email: "",
    });
  

    const [employees, setEmployees] = useState<Employee[]>([]);


    const filteredEmployees = employees.filter((employee) => {
        return (
            employee.name.toLowerCase().includes(search.toLowerCase())
        )
    })



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


    async function handleSaveEmployee() {

        const newErrors = {
            name: "",
            email: ""
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (employee.name.trim() === "") {

            newErrors.name = "Name is required";
        }


        if (!emailRegex.test(employee.email)) {
            //  alert("Please enter a valid email");
            newErrors.email = "Please enter a valid email";

        }

        const isDuplicate = employees.some((emp) => {
            return (
                emp.email === employee.email && emp.id !== employee.id
            );


        });

        if (isDuplicate) {

            newErrors.email = "Email already exists";

        }

        setErrors(newErrors);

        if (newErrors.name || newErrors.email) {
            return;
        }

        if (isEditMode) {

            try {
                await updateEmployee(employee.id,
                    {
                        name: employee.name,
                        email: employee.email,
                    }
                );

                fetchEmployees()
                resetEmployeeForm()
                setIsEditMode(false);

            } catch (error) {
                //  setError("Something went wrong");

                if (axios.isAxiosError(error)) {
                    setError(error.message);
                }

            }



        } else {

            try {
                const response = await createEmployee( {
                        name: employee.name,
                        email: employee.email,
                    })            

                fetchEmployees()
               resetEmployeeForm()
            } catch (error) {
                setError("Something went wrong");
            }

        }



    }



    async function handleDeleteEmployee(id: number) {

         
        try {
            await deleteEmployeeApi(id);

            fetchEmployees();

        } catch (error) {
            console.log(error);
            setError("Something went wrong");
        }

    }


    function handleEditEmployee(emp: Employee) {

        setEmployee(emp);

        setIsModalOpen(true);
        setIsEditMode(true);

    }


    async function fetchEmployees() {
        try {
            setLoading(true);

            const response = await getEmployees();

            setEmployees(response.data);

        } catch (error) {
            console.log(error);
            setError("Something went wrong");

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchEmployees();
    }, []);

    if (error) {
        return <p>{error}</p>;
    }


    return (
        <>
            <main className="p-5">
                <div className="mb-5">
                    <EmployeeHeader search={search} setSearch={setSearch} onAddEmployeeClick={openModal} />
                </div>


                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <EmployeeTable employees={filteredEmployees} onDelete={handleDeleteEmployee} onEdit={handleEditEmployee} />
                )}



                {isModalOpen && <AddEmployeeModal employee={employee} setEmployee={setEmployee} onClose={closeModal} onSave={handleSaveEmployee} errors={errors} setErrors={setErrors} />}

            </main>


        </>
    );

}