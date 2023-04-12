import Image from 'next/image';
import React, { useState } from 'react';

import MenuIcon from '../../assets/images/menu.png';
import CloseIcon from '../../assets/images/close.png';
import BlackLogo from '../../assets/images/Logo-black.png';
import Button from '../Button/Button';

const navbarLinks = [
  { title: 'Home' },
  { title: 'Surfing' },
  { title: 'Hula' },
  { title: 'Vulcano' },
];

const initialState = {
  navbarPopupOpen: false,
};
export default function Navbar() {
  const [{ navbarPopupOpen }, setState] = useState(initialState);
  return (
    <>
      <div className="fixed 300px:top-0 500px:top-[20px] left-[50%] -translate-x-[50%] w-screen">
        <div className="px-2 wrapper">
          <div className="hidden md:flex items-center justify-between rounded-lg bg-white px-6 py-3.5">
            <div className="flex items-center">
              <Image src={BlackLogo} alt="banner" />
              <div className="hidden 500px:flex items-center font-normal text-[16px] ml-10 leading-[30px] -mb-[3px] ">
                {navbarLinks.map(({ title }, index) => (
                  <div className="px-6 py-1" key={index}>
                    {title}
                  </div>
                ))}
              </div>
            </div>
            <Button type="primary" classNames="">
              Book a trip
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-white md:hidden py-3.5 px-3 fixed top-0 w-screen flex justify-between items-center z-50">
        <Image src={BlackLogo} alt="banner" />
        <div
          onClick={() => {
            setState(prevData => ({
              ...prevData,
              navbarPopupOpen: !navbarPopupOpen,
            }));
          }}
        >
          <Image
            src={MenuIcon}
            alt="menuIcon"
            className=" animate-TopToBottom"
          />
        </div>

        <div
          className={`fixed top-0 left-0 w-screen h-screen bg-[#000000b7] ${
            navbarPopupOpen ? '' : 'hidden'
          }`}
        >
          <div
            className={`bg-white h-screen flex  flex-col md:hidden w-[90vw] fixed right-0 `}
          >
            <div
              onClick={() => {
                setState(prevData => ({
                  ...prevData,
                  navbarPopupOpen: !navbarPopupOpen,
                }));
              }}
              className="flex justify-end p-[30px]"
            >
              <Image
                src={CloseIcon}
                alt="closeIcon"
                className="z-50 animate-TopToBottom"
              />
            </div>
            <div className="p-6">
              {navbarLinks.map(({ title }, index) => (
                <div key={index} className="px-6 py-4 text-[20px] font-normal">
                  {title}
                </div>
              ))}
            </div>
            <div className="p-6 ml-5 w-fit ">
              <Button type="primary" classNames="min-w-[169px]">
                Book a trip
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
