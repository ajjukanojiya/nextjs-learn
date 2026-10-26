import {create} from "zustand"


export const ajay=create((set,get)=>({

      count: 0,

      increment:()=>{
        set((state)=>({count:state.count+1}))
      },

         decrement:()=>{
        set((state)=>({count:state.count-1}))
      }

}))

// export const useCounterStore=create((set)=>{
//   return (
// {

//    count:0,
//    increment:()=>set((state)=>({count:state.count+1})),
// })
// })

// export const useCounterStore = create((set) => ({
//   count: 0,
//   increment: () => set((state) => ({ count: state.count + 1 })),
// }));