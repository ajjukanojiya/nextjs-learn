<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Employee;

class EmployeeController extends Controller
{
    public function index(){



          $employees = Employee::all();

            return response()->json($employees);

    }


   public function store(Request $request)
    {

        $request->validate([
        'name' => 'required',
        'email' => 'required|email|unique:employees,email',
    ]);
      
        $employee = Employee::create([
            'name' => $request->name,
            'email' => $request->email,
        ]);

        return response()->json([
            'message' => 'Employee created successfully',
            'data' => $employee
        ], 201);
    }



    public function show($id)
{
    $employee = Employee::findOrFail($id);

    return response()->json($employee);
}


      public function update(Request $request, $id)
{
    $employee = Employee::find($id);

   

    if (!$employee) {
        return response()->json([
            'message' => 'Employee not found'
        ], 404);
    }

    $request->validate([
        'name' => 'required',
        'email' => 'required|email|unique:employees,email,' . $id,
    ]);

    $employee->update([
        'name' => $request->name,
        'email' => $request->email,
    ]);

    return response()->json([
        'message' => 'Employee updated successfully',
        'data' => $employee
    ], 200);
}


public function destroy($id)
{
    $employee = Employee::find($id);

    if (!$employee) {
        return response()->json([
            'message' => 'Employee not found'
        ], 404);
    }

    $employee->delete();

    return response()->json([
        'message' => 'Employee deleted successfully'
    ], 200);
}


}