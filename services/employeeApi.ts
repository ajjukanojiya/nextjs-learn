import api from "./api";
import { Employee } from "@/types/employee";

export async function getEmployees() {
    return await api.get<Employee[]>("/employees");
}

export async function createEmployee(employee: Omit<Employee, "id">) {   // id ko remove kar dega omit 
    return await api.post("/employees", employee);
}

export async function updateEmployee(id:number, employee :Omit<Employee,"id">) {
    return await api.put(`/employees/${id}`, employee);
}

export async function deleteEmployee(id:number) {
   
    return await api.delete(`/employees/${id}`);
}