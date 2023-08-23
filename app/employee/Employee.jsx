import React from 'react'
import AddContract from '@app/contract/AddContract';

const formatRut = (rut) => {
    const cleanedRut = rut.replace(/[^\dKk]/g, ''); // formatea el rut con regex
    const digits = cleanedRut.slice(0, -1);
    const verifier = cleanedRut.slice(-1);
    
    const formattedDigits = digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  
    return `${formattedDigits}-${verifier}`;
  };

const Employee = ({ employee, deleteEmployee, editEmployee }) => {
  const formattedRut = formatRut(employee.rut);
  return (
    <tr className='border-b dark:border-neutral-500' key={employee.id}>
        <td className='border-b dark:border-neutral-500 px-6 py-4'>
        <div className='text-sm text-grey-500'>{employee.name}</div>
        </td>
        <td className='border-b dark:border-neutral-500 px-6 py-4'>
        <div className='text-sm text-grey-500'>{employee.adress}</div>
        </td>
        <td className='border-b dark:border-neutral-500 px-6 py-4'>
        <div className='text-sm text-grey-500'>{formattedRut}</div>
        </td>
        <td className='border-b dark:border-neutral-500 px-6 py-4'>
        <button onClick={(e, id) => editEmployee(e, employee.id)} 
        className='rounded bg-black text-white px-6 py-3 mr-3 hover:text-teal-500 font-semibold'>Edit</button>
        <button onClick={(e, id) => deleteEmployee(e, employee.id)} 
        className='rounded bg-black text-white px-6 py-3 mr-3 hover:text-red-900 font-semibold'>Delete</button>
        <AddContract employeeId={employee.id}/>
        </td>
    </tr>
  )
}

export default Employee