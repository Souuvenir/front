'use client'
import React, { useState, useEffect } from 'react';
import Employee from './Employee';


const EmployeeList = () => {
  const EMPLOYEE_API_BASE_URL = "http://localhost:8080/employee/all";
  const [employees,setEmployees] = useState(null);
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () =>{
      setLoading(true);
      try {
        const response = await fetch (EMPLOYEE_API_BASE_URL, {
          method: "GET",
          headers:{
            "Content-Type": "application/json",
          },
        });
        const employees = await response.json();
        setEmployees(employees);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
   };
   fetchData();
  },[]);
  
    return (
    <div className="flex-between w-full pt-3">
        <div className="w-full">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
            <table className="w-full text-left text-sm font-light">
                <thead className="border-b border-neutral-700 bg-neutral-800 text-neutral-50 dark:border-neutral-600 dark:bg-neutral-700">
                <tr>
                    <th scope="col" className="px-6 py-4">Name</th>
                    <th scope="col" className="px-6 py-4">Address</th>
                    <th scope="col" className="px-6 py-4">Rut</th>
                    <th scope="col" className="px-6 py-4">Actions</th>
                </tr>
                </thead>
                {!loading && (
                  <tbody className='bg-white'>
                    {employees?.map((employee) =>(
                      <Employee employee = {employee} key={employee.id}/>
                    ))}
                  </tbody>
                )}
            </table>
            </div>
        </div>
        </div>
    </div>
    )
}

export default EmployeeList