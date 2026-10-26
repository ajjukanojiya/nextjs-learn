"use client"

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { registerSchema,RegisterInput,} from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";



export default function Register(){
  

    const [serverError, setServerError] = useState("");
const {register,handleSubmit,setError,formState:{errors}}=useForm({
   resolver:zodResolver(registerSchema)
  
})  


const submitForm=async(data)=>{

   setServerError(""); // Purana general error reset karein
  console.log('data',data.confirmPassword);
   // console.log('submitForm',data);
    const formData=new FormData()

    formData.append('name',data.name);
    formData.append('email',data.email);
    formData.append('password',data.password);
    formData.append('confirmpassword',data.confirmpassword);
   formData.append("confirmPassword", data.confirmPassword || ""); //

   console.log('data',data);

    if(data.image && data.image[0]){
    formData.append('image',data.image[0]);
    }
      const res=await fetch("/api/auth/register",{
          method: "POST",
         body: formData,
      })
    const result = await res.json();
   //alert(111);

   if (res.ok) {
     alert(result.message || "User Registered Successfully!");
    } else {
        if(result.errors){
        Object.keys(result.errors).forEach((field)=>{
            setError(field, {
          type: "server",
          message: result.errors[field][0], // Array ka pehla message
        });

        })
  
    }else if(result.error){
        setServerError(result.error);
    }
}

}


     return (
            <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
                <form onSubmit={handleSubmit(submitForm)}>
    
                <div className="bg-white p-6 rounded-lg w-96">
    
                    <h2 className="text-xl font-semibold mb-4">
                       {serverError}
                    </h2>
    
                    <input {...register("name")} className="w-full border border-gray-300 rounded p-2 mb-4" placeholder="enter name " />
                    {errors.name && (
                        <p className="text-red-500 text-sm">{errors.name.message}</p>
                    )}
                    <input {...register("email")} className="w-full border border-gray-300 rounded p-2 mb-4" placeholder="enter email" />
                    {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email.message}</p>
                    )}

                    <input type="password" {...register("password")} className="w-full border border-gray-300 rounded p-2 mb-4" placeholder="enter Password" />
                    {errors.password && (
                        <p className="text-red-500 text-sm">{errors.password.message}</p>
                    )}


                       <input type="password"  {...register("confirmPassword")} className="w-full border border-gray-300 rounded p-2 mb-4" placeholder="enter confirmPassword" />
                    {errors.confirmPassword && (
                        <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
                    )}

               
                     <input  type="file" {...register("image")} className="w-full border border-gray-300 rounded p-2 mb-4"  />
                    {errors.image && (
                        <p className="text-red-500 text-sm">{errors.message.message}</p>
                    )}

                    <div className="flex justify-end gap-2">

                      <input type="submit"  className="bg-blue-500"/>  
    
                        {/* <Button
                             type="submit"
                            disabled={isSaving}
                            className="bg-blue-500"
                        >
                            {isSaving
                                ? "Saving..."
                                : employee.id === 0
                                    ? "Create"
                                    : "Update"}
                        </Button> */}
    
                        {/* <Button
                            type="button"
                            onClick={onClose}   
                            disabled={isSaving}
                            className="bg-gray-500"
                        >
    
                            Cancel
                        </Button> */}
                    </div>
                </div>
                </form>
            </div>
        );


}