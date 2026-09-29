import EmployeeTableNext from "@/components/EmployeeTableNext";
export default async function EmployeesPage() {

    // throw new Error("Employee API failed");

  //  await new Promise((resolve) => setTimeout(resolve, 3000));

   const res = await fetch("http://127.0.0.1:8000/api/employees", {
        cache: "no-store",
    });

  const employees = await res.json();

  return (
    <div>
      <h1>Employees</h1>


       <EmployeeTableNext
            employees={employees}
        />

      {/* {employees.map((emp) => (
        <div key={emp.id}>
          <p>{emp.name}</p>
          <p>{emp.department}</p>
          <hr />
        </div>
      ))} */}
    </div>
  );
}