'use client'


import react from "react"
import { useState,useRef } from "react"

export default  function ProductList({products}){

    const [visibleCount ,setVisibleCount]=useState(5)
   // const [search ,setSearch]=useState();
   // const [pro,setPro]=useState(products)
    const timerRef = useRef(null);

    // console.log('pro',pro);

    // console.log('search',search);





    const handleLoadMore=()=>{

        setVisibleCount((pre)=>(
            pre+5
        ))
    }

  

       

  return(<>
     
     {/* <input type="text" placeholder="search product" name="searchTerm" onChange={handleInput}/> */}

      <ul>
        {products.slice(0,visibleCount).map((v,i)=>(
            <li key={v.id}>{v.title}</li>
        ))}
      </ul>
      {products.length === 0 && <p>No products found!</p>}
     {/* Button tabhi dikhega jab baki items bache honge */}
      {visibleCount < products.length ? (
        <button 
          onClick={handleLoadMore}
          style={{
            padding: '10px 16px',
            backgroundColor: '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Load More Products
        </button>
      ) : (
        <p style={{ color: '#888' }}>All products loaded!</p>
      )}
  
  </>)
}