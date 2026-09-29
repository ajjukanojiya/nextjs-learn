import { useEffect, useState } from "react";
import { Employee } from "@/types/employee";
import { getEmployees } from "@/services/employeeApi";

export function useEmployees() {

    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

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

    return {
        employees,
        loading,
        error,
        fetchEmployees,
    };
}