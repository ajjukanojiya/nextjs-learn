import { NextResponse } from 'next/server';
// import { LoginSchema } from '@/lib/validations';
import { LoginSchema}  from "@/schemas/auth";
import { SignJWT } from 'jose';
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

// Production mein secret ko process.env.JWT_SECRET se lein
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'super-secret-key-change-this-in-env'
);

export async function POST(request) {
  try {
    
    const body=await request.json()
    const validateData=LoginSchema.safeParse(body)
      console.log(validateData);
         if (!validation.success) {

          return NextResponse.json(
        {
          success: false,
          error: 'Invalid input data',
          fieldErrors: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );

         }

           const { email, password } = validation.data;
           const user = await prisma.user.findUnique({
      where: { email },
    });

     if (!user) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      );
    }

  }
  catch(e){
       if (error instanceof Error) {
    console.error('❌ Error Name:', error.name);
    console.error('❌ Error Message:', error.message);
    console.error('📍 Error Stack Trace (Line Numbers & Files):');
    console.error(error.stack); // 👈 Isme exact file path aur line number hota hai
  } else {
    console.error('❌ Unknown Error:', error);
  }
   return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }

}