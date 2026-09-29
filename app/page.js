
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

import DashboardCards from "@/components/DashboardCards";
import EmployeePage from "@/components/EmployeePage";


export default function Home() {
  return (
    <>
      <Navbar />

       <div className="flex" >
        {/* <div className="w-64 ">
           <Sidebar />
        </div> */}
       
         <main className="flex-1">
        
       
          <div className="flex gap-5 mb-5">
              <DashboardCards
                title="Employees"
                value={120}
                bgColor="bg-blue-100"
              />
        
              <DashboardCards
                title="Departments"
                value={8}
                bgColor="bg-green-100"
              />
        
              <DashboardCards
                title="Active Users"
                value={95}
                bgColor="bg-orange-100"
              />
            </div>
               <EmployeePage />
        </main>
       
      </div>
    </>
  );
}