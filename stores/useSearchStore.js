import {create} from "zustand"

// export const useSearchStore=create((set,get)=>({
  
//     searchTerm:"",
//     products:[],
//     loading:false,
//     setSearchTerm:(term)=>{
//         set({searchTerm:term})
//     },
//     setProducts:(prouds)=>{
//       set({product:prouds})
//     },
//     setLoading: (isLoading) => set({ loading: isLoading }),



// }));


export const useSearchStore = create((set) => ({
  searchTerm: "",
  products: [],
  loading: false,

  // 👉 Yeh ek hi function sabhi fields ke liye kaam karega!
  updateState: (field, value) => set({ [field]: value }),
}));
