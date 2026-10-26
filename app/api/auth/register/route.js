
import { registerSchema } from "@/schemas/auth"
import { success } from "zod";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";
import { saveFileLocally } from "@/lib/uploadFile";
import bcrypt from "bcryptjs";

export async function POST(request) {

try{
  const formdata=await request.formData();
       console.log('formdata',formdata);


    //    const name=formdata.get('name')
    //    const email=formdata.get('email')
    //    const password=formdata.get('password')
    //  // 3. Image File Read Karein
    // const imageFile = formdata.get("image"); // Yeh ek 'File' object hoga

          const rawData = {
        name: formdata.get("name"),
        email: formdata.get("email"),
        password: formdata.get("password"),      
        confirmPassword: formdata.get("confirmPassword"),
        image: formdata.get("image"), // File object
      };

       const validateData=registerSchema.safeParse(rawData)

       if (!validateData.success) {
          // Validation Fail hone par Error Response bhejein
          return NextResponse.json(
            { errors: validateData.error.flatten().fieldErrors },
            { status: 400 }
          );
        }

        const { name, email, password, image } = validateData.data;

      

        const existingUser= await prisma.user.findUnique({
            where: { email },
          });
           
          if (existingUser) {
            return NextResponse.json(
              { errors: { email: ["Email pehle se registered hai!"] } },
              { status: 400 }
            );
          }

            const imagePath = await saveFileLocally(image);

       const hashedPassword = await bcrypt.hash(password, 10);
          const newUser=await prisma.user.create({
            data:{
              name:name,
              email:email,
              password:hashedPassword,
             image: imagePath,
            },
          })

   return NextResponse.json(
      {
        message: "User registered successfully!",
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          image: newUser.image,
          createdAt: newUser.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Prisma Save Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
    // const body=await request.json();
    //     console.log("API working",body);

    //   const validateData=registerSchema.safeParse(body)

    //   if(!validateData.success){
    //     return response.json({
    //       success:false,
    //       errors:validateData.error.flatten().fieldErrors
    //     },
    //   { status: 400 }
    //   )
    //   }

  //    const data= validateData.data
  //     const hashedPassword = await bcrypt.hash(data.password, 10);

  //       const user = await prisma.user.create({
  //   data: {
  //     name: data.name,
  //     email: data.email,
  //     password: hashedPassword,
  //   },
  // });


  //    return Response.json(
  //   {
  //     success: true,
  //     message: "User registered successfully",
  //     user: {
  //       id: user.id,
  //       name: user.name,
  //       email: user.email,
  //     },
  //   },
  //   { status: 201 }
  // );

   

}
