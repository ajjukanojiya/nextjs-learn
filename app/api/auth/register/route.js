
import { registerSchema } from "@/schemas/auth"
import { success } from "zod";

import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
export async function POST(request) {


    const body=await request.json();
        console.log("API working",body);

      const validateData=registerSchema.safeParse(body)

      if(!validateData.success){
        return response.json({
          success:false,
          errors:validateData.error.flatten().fieldErrors
        },
      { status: 400 }
      )
      }

     const data= validateData.data
      const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
    },
  });


     return Response.json(
    {
      success: true,
      message: "User registered successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    },
    { status: 201 }
  );
}
