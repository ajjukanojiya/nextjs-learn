 
"use client"

import {react,useState,useEffect} from 'react';
import useDebounce from "@/hooks/useDebouncing"
export default function SearchingApi(){

    const [value,setvalue]=useState('');
   const [products, setProducts] = useState([]);
   
        const debouncedQuery = useDebounce(value, 500);  
        
  

     useEffect(()=>{
     
    //     if (!debouncedQuery.trim()) {
    //   setProducts([]);
    //   return;
    // }

       const fetchProduct=async()=>{

             const res=await fetch(`https://dummyjson.com/products/search?q=${debouncedQuery}`)
             const   result=await res.json();
             setProducts(result.products)

            console.log('11111',result);
        }

         fetchProduct()   
 


    },[debouncedQuery])


    //    const  fetchData=async()=>{

    //          const res=await fetch(`https://dummyjson.com/products/search?q=${value}`)
    //          const   result=await res.json();
    //          setProducts(result.products)

    //     console.log('11111',result);


    //     }
      


     const array=['ajay','vijay','anil']

     const fileter= array.filter((v,i)=>{

      return v.toLowerCase().trim().includes(value.toLowerCase().trim());

     })

  

     return (<>

     <input type="text" name="search" onChange={(e)=>(setvalue(e.target.value))}/>

        <ul>
            {products.map((val,index)=>(
                <li key={index}>{val.title  }</li>
            ))}
        </ul>
     
       <h1>hello</h1>
     </>)
}