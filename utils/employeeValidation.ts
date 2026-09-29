import { Employee, EmployeeErrors } from "@/types/employee";

export function validateEmployee(
    employee: Employee,
    employees: Employee[]
) {
    const errors: EmployeeErrors = {
        name: "",
        email: "",
    };

    

    // ⬅️ Ab yahan duplicate email check add kar rahe hain

     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (employee.name.trim() === "") {

            errors.name = "Name is required";
        }


        if (!emailRegex.test(employee.email)) {
            //  alert("Please enter a valid email");
            errors.email = "Please enter a valid email";

        }

        const isDuplicate = employees.some((emp) => {
            return (
                emp.email === employee.email && emp.id !== employee.id
            );


        });

        if (isDuplicate) {

            errors.email = "Email already exists";

        }
  return errors;
}