'use client'
import { zodResolver } from '@hookform/resolvers/zod';
import react, { useState } from 'react'
import {useForm} from "react-hook-form";
import { LoginSchema } from '@/schemas/auth';

export default function Login(){

  const {register,handleSubmit,setError,formState:{errors}}=useForm({
    resolver:zodResolver(LoginSchema)
  });
  const [serverError,setServerError]=useState();

  
  const onSubmit=async(data)=>{

      const res=await fetch("api/auth/login",{
        method:"POST",
        body:JSON.stringify(data)

      })
     const result=await res.json();

     console.log(result);

     if(result.success){
       alert('user successfully login');

     }else{
      if(result.error){
      
        // Direct email field par error set kar do
        setError("email", {
          type: "manual",
          message: result.error,
        });
      }

     }

  }
  console.log('errors',errors);
  return(<>
  
   <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Login</h2>

        {/* {serverError && (
          <div className="mb-4 p-3 rounded text-sm bg-red-50 text-red-700 border border-red-200">
            {serverError}
          </div>
        )} */}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
               {...register('email')}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                         
            />
            {errors?.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
             {...register('password')}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            // disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition font-medium disabled:bg-blue-300"
          >
            {/* {isLoading ? "Logging in..." : "Login"} */}Login
          </button>
        </form>
      </div>
    </div>

  </>)



}