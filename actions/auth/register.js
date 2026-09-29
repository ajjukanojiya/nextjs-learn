"use server";

import { prisma } from "@/lib/db";
import { registerSchema}  from "../../schemas/auth";

export async function registerUser( prevState ,formData) {

  // const name = formData.get("name")?.toString().trim();
  // const email = formData.get("email")?.toString().trim();
  // const password = formData.get("password")?.toString();
  // const confirmPassword = formData
  //   .get("confirmPassword")
  //   ?.toString();

    const rawData = {
    name : formData.get("name")?.toString().trim(),
    email : formData.get("email")?.toString().trim(),
    password : formData.get("password")?.toString(),
    confirmPassword :formData.get("confirmPassword")?.toString()
    };

      const result = registerSchema.safeParse(rawData);

        if (!result.success) {
        const errors = result.error.flatten().fieldErrors;

        return {
          success: false,
          errors,
        };
      }


  const {
    name,
    email,
    password,
  } = result.data;


  // 3. Check existing user
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

  if (existingUser) {
    return {
      success: false,
      errors: {
        email: ["Email is already registered"],
      },
    };
  }

 return {
    success: true,
    message: "Registration successful",
  };
}