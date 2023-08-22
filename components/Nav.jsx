'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const Nav = () => {
  const [toggleDropDown, setToggleDropDown] = useState(false);

  const handleImageClick = () => {
    setToggleDropDown(!toggleDropDown);
  };

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href="/" className='flex gap-2 flex-center'>
        <Image 
          src="/assets/images/logo.svg"
          alt='Logo'
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='logo_text'>Registro Empleados</p>
      </Link>
      <div className='flex gap-3'>
        <div
          onClick={handleImageClick}
          style={{ cursor: 'pointer', position: 'relative' }}
        >
          <Image
            src='/assets/images/logo.svg'
            width={37}
            height={37}
            className='rounded-full'
            alt='profile'
          />
          {toggleDropDown && (
            <div className='dropdown'>
              <Link
                href='/create-employee'
                className='dropdown_link'
                onClick={() => setToggleDropDown(false)}
              >
                New employee
              </Link>
              <Link
                href='/employee-list'
                className='dropdown_link'
                onClick={() => setToggleDropDown(false)}
              >
                New Contract
              </Link>
              <Link
                href='/employee-list'
                className='dropdown_link'
                onClick={() => setToggleDropDown(false)}
              >
                Employee list
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
