
"use client"
import react from "react"
import { useState,useRef } from "react"
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

export default function SearchInput(){

    const searchParams = useSearchParams();  //current url ke readonly mode mian parmetter deta hain 
    const pathname = usePathname();   // doamin ke badh jo path ya url use karte hiuan vo get karne ke liye 
    const { replace } = useRouter();  
    const timerRef = useRef(null);


    const handleInput=(e)=>{
       
      const term = e.target.value;
     
      if(timerRef.current)
        clearTimeout(timerRef.current)
    
    timerRef.current=setTimeout(()=>{
        const params=new URLSearchParams(searchParams)
     
       if(term){
        params.set('q',term)
        
       }else{
         params.delete('q')
       }
    
     replace(`${pathname}?${params.toString()}`)

    },500)
}


return(<>
 
 <input
      type="text"
      placeholder="Search from server API..."
      defaultValue={searchParams.get('q')?.toString() || ''}
      onChange={handleInput}
    />

</>)

}