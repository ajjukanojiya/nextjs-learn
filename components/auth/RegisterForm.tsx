"use client";

import React from "react";
import { useState,useActionState,useEffect  } from "react";
import { registerUser } from "@/actions/auth/register";



export default  function RegisterForm() {
    // const [formData,setFormData]=useState({
    //     name:"",
    //     email:"",
    //     password:"",
    //     confirmPassword:""
    // })


    const [state, formAction, isPending] = useActionState( registerUser, null);
    const [errors, setErrors] = useState({});

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
  const fieldName = e.target.name;

  setErrors((prev) => ({
    ...prev,
    [fieldName]: undefined,
  }));
};

useEffect(() => {
  if (state?.errors) {
    setErrors(state.errors);
  }
}, [state]);

    // const  handleChange=(e: React.ChangeEvent<HTMLInputElement>)=>{     
      
    //        const {name,value}= e.target;

    //        setFormData({
    //        ...formData,
    //         [name]:value
    //        })

    //        console.log(formData);    
           

    // }

    // const  handleSubmit=async (e)=>{
    //     e.preventDefault();
    // const form = new FormData();

    // form.append("name", formData.name);
    // form.append("email", formData.email);
    // form.append("password", formData.password);
    // form.append("confirmPassword",formData.confirmPassword);

    //    const result = await registerUser(form);

    //     console.log("RESULT:", result);

    // }





  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Create Account
        </h1>

        <p className="text-gray-500 mt-2">
          Register to create your account
        </p>
      </div>

          <form action={formAction} className="space-y-5">

        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Full Name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            //  value={formData.name}
             onChange={handleChange}
           
            placeholder="Enter your name"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

            {/* {state?.errors?.name && (
    <p className="text-sm text-red-600 mt-1">
      {state.errors.name[0]}
    </p>
  )} */}
 {errors?.name && (
  <p className="text-sm text-red-600 mt-1">
    {errors.name[0]}
  </p>
)}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email Address
          </label>

          <input
            id="email"
            name="email"
            type="email"
            // value={formData.email}
            onChange={handleChange}
          
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

            {/* {state?.errors?.email && (
    <p className="text-sm text-red-600 mt-1">
      {state.errors.email[0]}
    </p>
  )} */}
  {errors?.email && (
  <p className="text-sm text-red-600 mt-1">
    {errors.email[0]}
  </p>
)}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Password
          </label>

          <input
            id="password"
            name="password"
            type="password"
            // value={formData.password}
             onChange={handleChange}
            placeholder="Enter your password"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
{/* 
            {state?.errors?.password && (
    <p className="text-sm text-red-600 mt-1">
      {state.errors.password[0]}
    </p>
  )} */}
  {errors?.password && (
  <p className="text-sm text-red-600 mt-1">
    {errors.password[0]}
  </p>
)}
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Confirm Password
          </label>

          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            // value={formData.confirmPassword}
             onChange={handleChange}
          
            placeholder="Confirm your password"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* {state?.errors?.confirmPassword && (
    <p className="text-sm text-red-600 mt-1">
      {state.errors.confirmPassword[0]}
    </p>
  )} */}
        {errors?.confirmPassword && (
        <p className="text-sm text-red-600 mt-1">
          {errors.confirmPassword[0]}
        </p>
      )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Create Account
        </button>

      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        Already have an account?{" "}
        <a
          href="/login"
          className="text-blue-600 font-medium hover:underline"
        >
          Login
        </a>
      </p>

    </div>
  );
}

