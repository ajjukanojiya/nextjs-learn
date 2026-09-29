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
    const body = await request.json();

    // 1. Zod Safe Validation Check
    const validation = LoginSchema.safeParse(body);

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

 

    // 2. Auth Check (Demo Logic - Isko apne DB call se replace karein)
   const user = await prisma.user.findUnique({
      where: { email },
    });
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      );
    }
    // 3. Bcrypt: Hashed Password Compare Karein
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // 3. Create Signed JWT Payload using 'jose'
   const token = await new SignJWT({ userId: user.id, email: user.email })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('2h')
      .sign(JWT_SECRET);

    // 4. Create Response with HttpOnly Cookie
   // 5. Response with HttpOnly Cookie
    const response = NextResponse.json(
      {
        success: true,
        message: 'Login successful!',
        user: { id: user.id, name: user.name, email: user.email },
      },
      { status: 200 }
    );

    // Set secure HttpOnly cookie (Client side JS se access nahi ho sakta - XSS Protection)
    response.cookies.set({
      name: 'auth_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 2, // 2 Hours expiry
    });

    return response;
  } catch (error) {
  

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