import  { React, useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react'

const EditEmployee = ({ employeeId, setResponseEmployee }) => {
  const EMPLOYEEID_API_BASE_URL = "http://localhost:8080/employee/get-by-id";

  const [isOpen, setIsOpen] = useState(false);
  const [employee, setEmployee] = useState({
      name: "",
      rut:"",
      adress:"",
      gender:"",
      positionId:"",
      areaId:""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
          const response = await fetch(EMPLOYEEID_API_BASE_URL + "/" + employeeId, {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
              }
          });
          const _employee = await response.json();
          setEmployee(_employee);
          openModal(true);
      } catch (error) {
          console.log(error);
      }
      
    };
    if(employeeId) {
          fetchData();
      }
  }, [employeeId]);

  const handleInputChange = (field, value) => {
      setEmployee(prevEmployee => ({
          ...prevEmployee,
          [field]: value
      }));
  };
  
  function closeModal() {
    setIsOpen(false);
  }
  
  function openModal() {
    setIsOpen(true);
  }

  const POSITION_API_BASE_URL = "http://localhost:8080/position/all";
  const [positionList,setpositionList] = useState(null);

  useEffect(() => {
    const fetchData = async () =>{
      try {
        const response = await fetch (POSITION_API_BASE_URL, {
          method: "GET",
          headers:{
            "Content-Type": "application/json",
          },
        });
        const positions = await response.json();
        setpositionList(positions);
      } catch (error) {
        console.log(error);
      }
   };
   fetchData();
  },[]);

  const AREA_API_BASE_URL = "http://localhost:8080/area/all";
  const [areaList,setAreaList] = useState(null);

  useEffect(() => {
    const fetchData = async () =>{
      try {
        const response = await fetch (AREA_API_BASE_URL, {
          method: "GET",
          headers:{
            "Content-Type": "application/json",
          },
        });
        const areas = await response.json();
        setAreaList(areas);
      } catch (error) {
        console.log(error);
      }
   };
   fetchData();
  },[]);

  const reset = (e) =>{
    e.preventDefault();
    setIsOpen(false);
  };

  const EMPLOYEE_API_BASE_URL = "http://localhost:8080/employee/add";
  const updateEmployee = async (e) =>{
    e.preventDefault();
    const response = await fetch(EMPLOYEE_API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employee),
    });
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const _employee = await response.json();
    setResponseEmployee(_employee);
    reset(e);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className='fixed inset-0 z-10 overflow-y-auto' onClose={closeModal}>
      <div className='min-h-screen px-4 text-center'>
        <Transition.Child 
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95">
          <div className='inline-block w-full max-w-md 
          p-6 my-8 overflow-hidden text-left 
          align-middle transition-all transform-all
          transform bg-white shadow-xl rounded-md'>
            <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">Add New Employee</Dialog.Title>
            <div className='flex max-w-md max-auto'>
              <div className='py-2'>
                <div className='h-14 my-4'> 
                  <label className='block text-gray-600 text-sm font-normal'>Full Name</label>
                  <input 
                    type="text" 
                    value={employee.name} 
                    name='fullName' 
                    className='h-10 w-96 border mt-2 px-2 py-2' 
                    onChange={e => handleInputChange("name", e.target.value)}> 
                  </input>
                </div>
                <div className='h-14 my-4'> 
                  <label className='block text-gray-600 text-sm font-normal'>Address</label>
                  <input type="text" 
                    value={employee.adress} 
                    name='Adress' 
                    className='h-10 w-96 border mt-2 px-2 py-2' 
                    onChange={e => handleInputChange("adress", e.target.value)}>
                  </input>
                </div>
                <div className='h-14 my-4'> 
                  <label className='block text-gray-600 text-sm font-normal'>Rut</label>
                  <input 
                    type="text" 
                    value={employee.rut} 
                    name='Rut' 
                    className='h-10 w-96 border mt-2 px-2 py-2' 
                    onChange={e => handleInputChange("rut", e.target.value)}>
                  </input>
                </div>
                <div className="h-14 my-4">
                    <label className="block text-gray-600 text-sm font-normal">Gender</label>
                    <select
                      value={employee.gender}
                      name="gender"
                      onChange={(e) => setEmployee({ ...employee, gender: e.target.value })}
                      className="h-10 w-96 border mt-2 px-2 py-2"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="h-14 my-4">
                  <div className="h-14 my-4">
                      <label className="block text-gray-600 text-sm font-normal">Position</label>
                      <select
                        value={employee.positionId}
                        name="positionId"
                        onChange={e => handleInputChange("positionId", e.target.value)}
                        className="h-10 w-96 border mt-2 px-2 py-2"
                      >
                        <option value="" disabled>Select Position</option>
                        {positionList?.map(option => (
                          <option key={option.id} value={option.id}>{option.position}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="h-14 my-4">
                    <label className="block text-gray-600 text-sm font-normal">Area</label>
                    <select
                      value={employee.areaId}
                      name="areaId"
                      onChange={e => handleInputChange("areaId", e.target.value)}
                      className="h-10 w-96 border mt-2 px-2 py-2"
                    >
                      <option value="" disabled>Select Position</option>
                        {areaList?.map(option => (
                          <option key={option.id} value={option.id}>{option.area}</option>
                        ))}
                    </select>
                  </div>
                <div className='h-14 my-4 space-x-4 pt-4'>
                  <button onClick={updateEmployee} className='rounded text-white font-semibold bg-green-400 hover:bg-green-700 py-2 px-6'>Save</button>
                  <button onClick={reset} className='rounded text-white font-semibold bg-red-400 hover:bg-red-700 py-2 px-6'>Close</button>
                </div>
              </div>
            </div>
          </div>
        </Transition.Child>
      </div>
    </Dialog>
  </Transition>
  )
}

export default EditEmployee