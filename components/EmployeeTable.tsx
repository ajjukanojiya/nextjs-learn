"use client";
import { Employee } from "@/types/employee";
interface EmployeeTableProps {
    employees: Employee[];
    onDelete: (id: number) => void;
    onEdit: (employee: Employee) => void;
}

export default function EmployeeTable({employees,onDelete,onEdit}:EmployeeTableProps) {
         

    return (

        <div>
           
           <table className="border w-full" >
            <thead className="bg-gray-100 ">
            <tr>
            <th className="p-2 border bg-gray-100 text-left" >id</th>
            <th className="p-2 border bg-gray-100 text-left">Name</th>
            <th className="p-2 border bg-gray-100 text-left">Email </th>
            <th className="p-2 border bg-gray-100 text-left">Action</th>
            </tr>
            
            </thead>
            <tbody>
             { employees.length > 0 ? employees.map((emp)=>{
                
                      
                 return  (  
               
                <tr key={emp.id}>
                    <td  className="p-2 border" >{emp.id}  </td>
                    <td  className="p-2 border">{emp.name}  </td>
                    <td  className="p-2 border">{emp.email}  </td>
                    <td  className="p-2 border space-x-2"> 
                       <button className="" onClick={()=>onEdit(emp)} >Edit</button> 
                    <button className="" onClick={() => onDelete(emp.id)}>Delete</button>
                      </td>
               </tr>  

                )}):<tr> <td colSpan={4}>No Employees Found</td></tr>}

               
            </tbody>
           </table>

        </div>
    );
}