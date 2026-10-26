 
"use client"

import {react,useState} from 'react';
export default function Searching(){

    const [value,setvalue]=useState('');
   

    console.log('value',value)

     const array=['ajay','vijay','anil']

     const fileter= array.filter((v,i)=>{

      return v.toLowerCase().trim().includes(value.toLowerCase().trim());

     })

  

     return (<>

     <input type="text" name="search" onChange={(e)=>(setvalue(e.target.value))}/>

        <ul>
            {fileter.map((val,index)=>(
                <li key={index}>{val}</li>
            ))}
        </ul>
     
       <h1>hello</h1>
     </>)
}