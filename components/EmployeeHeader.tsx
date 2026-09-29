
"use client";
import { useState } from "react";
import { Dispatch, SetStateAction } from "react";

interface EmployeeHeaderProps {
    search: string;
    setSearch: Dispatch<SetStateAction<string>>;
    onAddEmployeeClick: () => void;
}

export default function EmployeeHeader({search,setSearch,onAddEmployeeClick }:any) {





    return(
        <div>
      <h2>Employees</h2>

      <div className="flex justify-between items-center"> 
        <input className="w-64 p-2 rounded border" type="text" value={search} name="search" placeholder="Search Employee" 
         onChange={(e)=>setSearch(e.target.value)}
        />
         <button className="bg-blue-500 text-white px-4 py-2 rounded"  onClick={onAddEmployeeClick}>+ Add Employee</button>
      </div>

     

        </div>
    );
}