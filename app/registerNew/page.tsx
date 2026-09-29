"use client"

import React from "react"

import { registerSchema } from "@/schemas/auth"
import { useState,useEffect } from "react"


export default function RegisterPage (){
  

    
const [formData,setFormData]=useState({
    name:"",
    email:"",
    password:"",
    confirmPassword:"",
})

const [errors,setErrors]= useState();
const [serverMessage, setServerMessage] = useState('');
const [isSuccess, setIsSuccess] = useState(false);


function handleChnage(e:any){
     
  const {value,name}=e.target
  console.log(e.target)
  console.log(name,value)
  // setFormData((pre)=>{    
  //   return {...formData,
  //     [name]:value
  //     }

  // })
  setFormData((pre)=>({...pre,[name]:value}));

  setErrors((prev) =>({...prev, [name]: undefined }));

}

async function handleSubmit(e:any){
  e.preventDefault();
  const validation=registerSchema.safeParse(formData);

  if(!validation.success){
   const fieldError=validation.error.flatten().fieldErrors
    
    setErrors(fieldError);
  
    return;

  }   

 // Call API Route Handler

 try{
 
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data=await res.json();
       

        if (!res.ok) {
        setServerMessage(data.error || 'Registration failed');
      } else {
        setServerMessage('Registration successful! Ab aap login kar sakte hain.');
      }

      }catch(e){

        
      }


}



   return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Register Account</h2>

        {serverMessage && (
          <div
            className={`mb-4 p-3 rounded text-sm ${
              isSuccess ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            }`}
          >
            {serverMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              value={formData.name}
              onChange={handleChnage}
              name="name"
            />
            
            {errors?.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              value={formData.email}
              onChange={handleChnage}
              name="email"
             
            />
            {errors?.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              value={formData.password}
             
              onChange={handleChnage}
              name="password"

            />
            {errors?.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>


           <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              value={formData.confirmPassword}
               onChange={handleChnage}
               name="confirmPassword"

            />
            {errors?.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition font-medium"
          >
            Register (via API Route)
          </button>
        </form>
      </div>
    </div>
  );
}


