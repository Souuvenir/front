'use client'
import React, { useState, useEffect } from 'react';
import Employee from './Employee';
import EditEmployee from './EditEmployee';


const EmployeeList = ({ employee, filterId, filterField }) => {
  const EMPLOYEE_API_BASE_URL = "http://localhost:8080/employee/all";
  const [employees,setEmployees] = useState(null);
  const [loading,setLoading] = useState(true);
  const [employeeId, setEmployeeId] = useState(null);
  const [responseEmployee, setResponseEmployee] = useState(null);
  const [originalEmployees, setOriginalEmployees] = useState([]);
  
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
        setOriginalEmployees(employees)
        setEmployees(employees);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
   };
   fetchData();
  },[employee, responseEmployee]);

  useEffect(() => {
    if(filterField == 'filterAreaId') {
      setEmployees(originalEmployees?.filter(employee => employee.areaId === parseInt(filterId)));
    }
    if(filterField == 'filterPositionId') {
      setEmployees(originalEmployees?.filter(employee => employee.positionId === parseInt(filterId)));
    }
  },[filterId, filterField]);
  
  const DELETE_EMPLOYEE_API_BASE_URL = "http://localhost:8080/employee/delete";
  const deleteEmployee = (e, id) => {
    e.preventDefault();
    fetch(DELETE_EMPLOYEE_API_BASE_URL + "/" + id, {
      method: "DELETE",
    }).then((res) => {
      if(employees) {
        setEmployees((prevElement) => {
          return prevElement.filter((employee) => employee.id !== id);
        });
      }
    });
  };

  const editEmployee = (e, id) => {
    e.preventDefault();
    setEmployeeId(id);
  };

    return (
    <>
      <div className="flex-between w-full pt-3 pb-4">
          <div className="w-full">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
              <table className="w-full text-left text-sm font-light">
                  <thead className="border-b border-neutral-700 bg-neutral-800 text-neutral-50 dark:border-neutral-600 dark:bg-neutral-700">
                  <tr>
                      <th scope="col" className="px-6 py-4">Name</th>
                      <th scope="col" className="px-6 py-4">Address</th>
                      <th scope="col" className="px-6 py-4">Rut</th>
                      <th scope="col" className="px-6 py-4 text-center">Actions</th>
                  </tr>
                  </thead>
                  {!loading && (
                    <tbody className='bg-white'>
                      {employees?.map((employee) =>(
                        <Employee employee = {employee} 
                        key={employee.id} 
                        deleteEmployee={deleteEmployee} 
                        editEmployee={editEmployee}/>
                      ))}
                    </tbody>
                  )}
              </table>
              </div>
          </div>
        </div>
      </div>
      <EditEmployee employeeId={employeeId} setResponseEmployee ={setResponseEmployee}/>
    </>
  );
};

export default EmployeeList