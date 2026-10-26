 
"use client"

import {react,useState,useEffect} from 'react';
import useDebounce from "@/hooks/useDebouncing"
import { useSearchStore } from '../stores/useSearchStore';
export default function SearchingZustand(){

   // const [value,setvalue]=useState('');
  // const [products, setProducts] = useState([]);
  const { searchTerm, products, loading, setSearchTerm, setProducts, setLoading } = useSearchStore();
   
        const debouncedQuery = useDebounce(searchTerm, 500);  

        
  

     useEffect(()=>{

    

       const serchProduct=async()=>{

          const res=await fetch(`https://dummyjson.com/products/search?q=${debouncedQuery}`)
          const   result=await res.json();
          setProducts(result.products)
          
            console.log('11111',result);

       }

           
       serchProduct();


     
 


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

     <input type="text" name="search" onChange={(e)=>(setSearchTerm(e.target.value))}/>

        <ul>
            {products.map((val,index)=>(
                <li key={index}>{val.title  }</li>
            ))}
        </ul>
     
       <h1>hello</h1>
     </>)
}