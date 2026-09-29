import { z } from "zod";

export const employeeSchema = z.object({
    name: z
        .string()
        .min(1, "Name is required"),

    email: z
        .string()
        .email("Invalid Email"),
});



export type EmployeeFormData = z.infer<typeof employeeSchema>;