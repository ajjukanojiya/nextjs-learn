
import ProductList from "./_components/ProductList"
import SearchInput from "./_components/SearchInput"
import { Suspense } from 'react';
export default async function About({searchParams}:{ searchParams: Promise<{ q?: string }> }){
   
//   let result=null;
const resolvedParams = await searchParams;   

    const query = resolvedParams?.q || '';
//     console.log('query',query);
//     try{

//       const res = await fetch(`https://dummyjson.com/products/search?q=${query}`, {
//         cache: 'no-store'
//       });

//       // const product=await fetch("https://dummyjson.com/products")
//          result= await res.json();     
   
//       console.log(result);

//     }catch(e){
//       console.error(e);
//       return <h1>api failed</h1>
//     }
  

    return(

       <main style={{ padding: '20px' }}>
      <h1>About Catalog</h1>
      
      {/* 1. Search input UI hamesha active rahega */}
      <SearchInput />

      {/* 2. Jab tak server API data fetch kar raha hai, tab tak fallback dikhega */}
   
      <Suspense key={query} fallback={<p style={{ color: 'orange' }}>⏳ Loading products for "{query}"...</p>}>
        <ProductDataFetcher query={query} />
      </Suspense>
    </main>
    );
     
}

// Data Fetching Component (Streaming Component)
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  async function ProductDataFetcher({ query }: { query: string }) {


  await delay(3000);

  const res = await fetch(`https://dummyjson.com/products/search?q=${query}`, {
    next: { revalidate: 60 },
  });
  const result = await res.json();

  return <ProductList products={result.products || []} />;
}

// Simple Skeleton Loading Component
function ProductSkeleton() {
  return (
    <div style={{ opacity: 0.6 }}>
      <p>🌀 Searching server database...</p>
      <div style={{ height: '40px', background: '#eee', marginBottom: '8px' }} />
      <div style={{ height: '40px', background: '#eee', marginBottom: '8px' }} />
    </div>
  );
}