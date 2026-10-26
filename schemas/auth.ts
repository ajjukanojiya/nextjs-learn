import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Name is required")
      .min(3, "Name must be at least 3 characters"),

    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),

    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters"),

    confirmPassword: z
      .string()
      .min(1, "Please confirm your password"),

      image: z.any().optional(), // FileList object
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

  export const LoginSchema = z.object({
  email: z.string().email({ message: "Valid email address daalein" }),
  password: z.string().min(1, { message: "Password required hai" }),
  });

  
  export type RegisterInput = z.infer<typeof registerSchema>;
  export type LoginInput = z.infer<typeof LoginSchema>;