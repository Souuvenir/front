import React from 'react'

const Employee = ({ employee }) => {
  return (
    <tr key={employee.id}>
        <td className='text-left px-6 py-4 whitespace-nowrap'>
        <div className='text-sm text-grey-500'>{employee.name}</div>
        </td>
        <td className='text-left px-6 py-4 whitespace-nowrap'>
        <div className='text-sm text-grey-500'>{employee.adress}</div>
        </td>
        <td className='text-left px-6 py-4 whitespace-nowrap'>
        <div className='text-sm text-grey-500'>{employee.rut}</div>
        </td>
        <td className='text-left px-6 py-4 whitespace-nowrap'>
        <a href="#" className='text-indigo-500 hover:text-indigo-800 hover:cursor-pointer'> Edit</a>
        <a href="#" className='text-red-500 hover:text-red-800 hover:cursor-pointer px-4'> Delete</a>
        </td>
    </tr>
  )
}

export default Employee