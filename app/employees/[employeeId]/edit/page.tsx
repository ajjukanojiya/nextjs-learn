
import EditEmployeeForm from "../../EditEmployeeForm";
import { notFound } from "next/navigation";


interface EditEmployeePageProps {
    params: Promise<{
        employeeId: string;
    }>;
}


export default async function EditEmployeePage({params,
}: EditEmployeePageProps) {

    const { employeeId } = await params;


     const response = await fetch(
        `http://127.0.0.1:8000/api/employees/${employeeId}`
    );

    if (response.status === 404) {
    notFound();
}

if (!response.ok) {
    throw new Error("Failed to fetch employee");
}

    console.log("Status:", response.status);

    if (!response.ok) {
        throw new Error("Failed to fetch employee");
    }

     const employee = await response.json();

    console.log("Employee:", employee);




   
      return (
        <div className="min-h-screen bg-gray-100 p-6">

             <EditEmployeeForm employee={employee} />

                  
        </div>
    );
}