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
      <Link href="/" className='flex gap-2 flex-center ml-8'>
        <Image 
          src="/assets/images/employee.png"
          alt='Logo'
          width={50}
          height={50}
          className='object-contain'
        />
        <p className='logo_text mt-3 mr-8'>Employees Maintainer</p>
      </Link>
      <div className='flex gap-3 mr-8'>
        <div
          onClick={handleImageClick}
          style={{ cursor: 'pointer', position: 'relative' }}
        >
          <Image
            src='/assets/images/gear-fill.svg'
            width={30}
            height={30}
            className='rounded-full mb-2'
            alt='profile'
          />
          {toggleDropDown && (
            <div className='dropdown'>
              <Link
                href='#'
                className='dropdown_link'
                onClick={() => setToggleDropDown(false)}
              >
                TBD
              </Link>
              <Link
                href='#'
                className='dropdown_link'
                onClick={() => setToggleDropDown(false)}
              >
                TBD
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
