"use client";
import EmployeeHeader from "@/components/EmployeeHeader";
import EmployeeTable from "@/components/EmployeeTable";
import AddEmployeeModal from "@/components/AddEmployeeModal"
import { useState } from "react";

export default function EmployeePage() {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [search, setSearch] = useState('');
    const [isEditMode, setIsEditMode] = useState(false);
    const [employe, setEmploye] = useState({
        id: '',
        name: '',
        email: ''

    });
    const [errors, setErrors] = useState({
    name: "",
    email: "",
});
    const [employees, setEmployees] = useState([
        { id: 1, name: "Ajay", email: "ajay@test.com" },
        { id: 2, name: "Rahul", email: "rahul@test.com" }
    ]);


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


    function saveEmployee() {


       const newErrors ={
         name:"",
         email:""
       }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (employe.name.trim() === "") {
              
              newErrors.name = "Name is required";
         }


          if (!emailRegex.test(employe.email)) {
              //  alert("Please enter a valid email");
                  newErrors.email = "Please enter a valid email";
              
            }

            const isDuplicate = employees.some((emp) => {
                 return (
                emp.email === employe.email && emp.id !== employe.id
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

          const updatedEmployees= employees.map((emp) => {  //updatedEmployees ise arrya mian new and puri value agya hain

            if (emp.id === employe.id) {

                return employe;      //constion match hue to humne formwal data  updatedEmployees main set kiya match nhi huye to  emp wal set 

            }

            return emp;

        })

          setEmployees(updatedEmployees);
           setEmploye({
                id: "",
                name: "",
                email: "",
            });
            closeModal();
            setIsEditMode(false);

        } else {

            const newEmployee = {
                id: employees.length + 1,
                name: employe.name,
                email: employe.email,
            }
            setEmployees([...employees, newEmployee]);

            setEmploye({
                id: "",
                name: "",
                email: "",
            });
            closeModal();
        }



    }



    function deleteEmployee(id: any) {

        const updatedEmployees = employees.filter((employe) => {

            return employe.id != id;


        })

        setEmployees(updatedEmployees)

    }


    function editEmployee(emp: any) {

        setEmploye(emp);

        setIsModalOpen(true);
        setIsEditMode(true);

    }


    return (
        <>
            <main className="p-5">
                <div className="mb-5">
                    <EmployeeHeader search={search} setSearch={setSearch} onAddEmployeeClick={openModal} />
                </div>

                <EmployeeTable employees={filteredEmployees} onDelete={deleteEmployee} onEdit={editEmployee} />

                {isModalOpen && <AddEmployeeModal employee={employe} setEmployee={setEmploye} onClose={closeModal} onSave={saveEmployee} errors={errors} setErrors={setErrors} />}

            </main>


        </>
    );

}