import { ButtonDefault } from '@components/Button'
import React from 'react'

const formatRut = (rut) => {
    const cleanedRut = rut.replace(/[^\dKk]/g, ''); // Elimina caracteres no numéricos ni 'K'
    const digits = cleanedRut.slice(0, -1);
    const verifier = cleanedRut.slice(-1);
    
    const formattedDigits = digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  
    return `${formattedDigits}-${verifier}`;
  };

const Employee = ({ employee }) => {
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
        {<ButtonDefault buttonText = "Edit"/>}
        {<ButtonDefault buttonText = "Delete"/>}
        </td>
    </tr>
  )
}

export default Employee