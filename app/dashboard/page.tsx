import DashboardCard from "@/components/DashboardCards";


export default function Dashboard(){


return(

    <div className="flex gap-5">
      <DashboardCard
        title="Employees"
        value={120}
        bgColor="bg-blue-100"
      />

      <DashboardCard
        title="Departments"
        value={8}
        bgColor="bg-green-100"
      />

      <DashboardCard
        title="Active Users"
        value={95}
        bgColor="bg-orange-100"
      />
    </div>

);

}