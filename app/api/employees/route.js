export async function GET() {
  const employees = [
    {
      id: 1,
      name: "Ajay",
      department: "IT"
    },
    {
      id: 2,
      name: "Rahul",
      department: "HR"
    }
  ];

  return Response.json(employees);
}