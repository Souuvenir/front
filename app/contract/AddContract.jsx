import  { React, useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react'

const AddContract = ({employeeId}) => {
    const ADDCONTRACT_API_BASE_URL = "http://localhost:8080/contract/add";
    const CONTRACT_TYPE_API_BASE_URL = "http://localhost:8080/contract-type/all";
    const EMPLOYEEID_API_BASE_URL = "http://localhost:8080/employee/get-by-id";

    const [isOpen, setIsOpen] = useState(false);

    const [contract, setContract] = useState({
      description: "",
      startDate:"",
      finishDate:"",
      contractTypeId:0,
      employeeId: employeeId
    });

    const [employee, setEmployee] = useState({
      name: "",
      rut:"",
      adress:"",
      gender:"",
      positionId:"",
      areaId:"",
  });

    const saveContract = async (e) =>{
    e.preventDefault();
    console.log(contract);
    const response = await fetch(ADDCONTRACT_API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contract),
    });
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    alert('contrato guardado');
    reset(e);
  };


    const handleInputChange = (field, value) => {
        setContract(prevContract => ({
        ...prevContract,
        [field]: value
        }));
    };

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    const reset = (e) =>{
    e.preventDefault();
    setIsOpen(false);

  };

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
      } catch (error) {
          console.log(error);
      }
      
    };
    if(employeeId) {
          fetchData();
      }
  }, [employeeId]);

  const [contractTypeList,setContractTypeList] = useState(null);

  useEffect(() => {
    const fetchDataContract = async () => {
      try {
          const response = await fetch(CONTRACT_TYPE_API_BASE_URL, {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
              }
          });
          const contractType = await response.json();
          setContractTypeList(contractType);
      } catch (error) {
          console.log(error);
      }
      
    };
    fetchDataContract();
  }, []);

  return (
    <>
    <button onClick={openModal}className='rounded bg-black text-white px-6 py-3 hover:text-yellow-400 font-semibold'>Add Contract</button>
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
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">Add New Contract</Dialog.Title>
                <div className='flex max-w-md max-auto'>
                <div className='py-2'>
                    <div className='h-14 my-4'> 
                    <label className='block text-gray-600 text-sm font-normal'>Description</label>
                    <input 
                        type="text" 
                        name='description' 
                        className='h-10 w-96 border mt-2 px-2 py-2' 
                        onChange={e => handleInputChange("description", e.target.value)}> 
                    </input>
                    </div>
                    <div className='h-14 my-4'> 
                    <label className='block text-gray-600 text-sm font-normal'>Start Date</label>
                    <input type="text"
                        name='startDate' 
                        className='h-10 w-96 border mt-2 px-2 py-2' 
                        onChange={e => handleInputChange("startDate", e.target.value)}>
                    </input>
                    </div>
                    <div className='h-14 my-4'> 
                    <label className='block text-gray-600 text-sm font-normal'>Finish Date</label>
                    <input 
                        type="text" 
                        name='finishDate' 
                        className='h-10 w-96 border mt-2 px-2 py-2' 
                        onChange={e => handleInputChange("finishDate", e.target.value)}>
                    </input>
                    </div>
                    <div className='h-14 my-4'> 
                        <label className='block text-gray-600 text-sm font-normal'>Employee Name</label>
                            <input disabled type="text"
                            value={employee.name}
                            name='Employee Name' 
                            className='h-10 w-96 border mt-2 px-2 py-2'>
                        </input>
                    </div>
                    <div className='h-14 my-4'>
                        <label className='block text-gray-600 text-sm font-normal'>Contract Type</label>
                        <select
                          name="contractTypeId"
                          onChange={e => handleInputChange("contractTypeId", e.target.value)}
                          className="h-10 w-96 border mt-2 px-2 py-2"
                        >
                          <option value="">Select Contract Type</option>
                          {contractTypeList?.map(option => (
                            <option key={option.id} value={option.id}>{option.name}</option>
                          ))}
                        </select>
                    </div>
                    <div className='h-14 my-4 space-x-4 pt-4'>
                    <button onClick={saveContract} className='rounded text-white font-semibold bg-green-400 hover:bg-green-700 py-2 px-6'>Save</button>
                    <button  onClick={reset} className='rounded text-white font-semibold bg-red-400 hover:bg-red-700 py-2 px-6'>Close</button>
                    </div>
                </div>
                </div>
            </div>
            </Transition.Child>
        </div>
    </Dialog>
  </Transition>
</>
  )
}

export default AddContract