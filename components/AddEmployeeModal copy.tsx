
import { Employee, EmployeeErrors } from "@/types/employee";
import { Dispatch, SetStateAction } from "react";
import Input from "./Input";

import Button from "./Button";


interface AddEmployeeModalProps {
    employee: Employee;
    setEmployee: Dispatch<SetStateAction<Employee>>;
    onClose: () => void;
    onSave: () => void;
    errors: EmployeeErrors;
    setErrors: Dispatch<SetStateAction<EmployeeErrors>>;
     isSaving: boolean;   // ✅ Add this
}

export default function AddEmployeeModal({ employee,setEmployee,onClose,onSave,errors,setErrors,isSaving }:AddEmployeeModalProps) {
    return (
       <div className="fixed inset-0 bg-black/50 flex justify-center items-center">

    <div className="bg-white p-6 rounded-lg w-96">

      <h2 className="text-xl font-semibold mb-4">
    {employee.id === 0 ? "Add Employee" : "Edit Employee"}
</h2>

        <input name="name" value={employee.name} onChange={(e)=>{setEmployee({...employee,name:e.target.value}); setErrors({...errors,name: ""});}}  className="w-full border border-gray-300 rounded p-2 mb-4"  placeholder="enter name "/>
           {errors.name && (
            <p className="text-red-500 text-sm">{errors.name}</p>
        )}
        <input name="email" value={employee.email}  onChange={(e)=>{setEmployee({...employee,email:e.target.value});setErrors({...errors,email: ""});}} className="w-full border border-gray-300 rounded p-2 mb-4"  placeholder="enter email"  />
        {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
        )}
        <div className="flex justify-end gap-2">

          <Button
    onClick={onSave}
    disabled={isSaving}
    className="bg-blue-500"
>
    {isSaving
        ? "Saving..."
        : employee.id === 0
        ? "Create"
        : "Update"}
</Button>
 
        </div>

    </div>

</div>
    );
}