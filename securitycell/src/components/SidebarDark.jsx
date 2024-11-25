"use client"


import { useState } from 'react';
import Link from 'next/link';

function SidebarMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const [isOpen2, setIsOpen2] = useState(false);

    const openConsole = (event) => {
        event.preventDefault();
        window.location.href = "/console-home";
      };

    return (
        <div className="block relative z-50 lg:hidden">
            
            <button className="flex items-center px-2 py-2 text-gray-900 border-teal-400 hover:text-red-500 lg:hidden" onClick={handleToggle}>
                <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <title>Menu</title>
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-6z" />
                </svg>
            </button>
            {isOpen && (
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <Link href="/" className="block px-4 py-2 text-md border text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                            <b>Home</b>
                        </Link>
                       
                        {/* <p className="block px-4 py-2 text-sm text-gray-700" role="menuitem">
                            Services
                        </p>
                        <ul>
                            <li>
                            <a href="#" className="ml-5 rounded-tl-lg bg-red-500 block px-4 py-2 text-sm text-white hover:bg-gray-100 hover:text-gray-900 hover:ml-10" role="menuitem">
                            GameDen
                           </a>
                           <a href="#" className="ml-5 bg-red-500 block px-4 py-2 text-sm text-white hover:bg-gray-100 hover:text-gray-900 hover:ml-10" role="menuitem">
                            Edulabour
                           </a>
                           <a href="#" className="ml-5 rounded-bl-lg bg-red-500 block px-4 py-2 text-sm text-white hover:bg-gray-100 hover:text-gray-900 hover:ml-10" role="menuitem">
                            Piclet
                           </a>
                            </li>
                        </ul> */}
                 
                        <ul>
                            <li>
                            <Link href="/Menu" className="ml-5 rounded-tl-lg  block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 duration-300" role="menuitem">
                            Ideas
                           </Link>
                           <Link href="/about" className="ml-5 rounded-bl-lg  block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 duration-300" role="menuitem">
                            Contact
                           </Link>
                           <Link href="/about" className="ml-5 rounded-bl-lg  block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 duration-300" role="menuitem">
                            About
                           </Link>
                           {/* <a href="#" className="ml-5 bg-red-500 block px-4 py-2 text-sm text-white hover:bg-gray-100 hover:text-gray-900 hover:ml-10" role="menuitem">
                            Articles
                           </a>
                           <a href="#" className="ml-5 bg-red-500 block px-4 py-2 text-sm text-white hover:bg-gray-100 hover:text-gray-900 hover:ml-10" role="menuitem">
                            Research
                           </a>
                           <a href="#" className="ml-5 rounded-bl-lg bg-red-500 block px-4 py-2 text-sm text-white hover:bg-gray-100 hover:text-gray-900 hover:ml-10" role="menuitem">
                            Downloads
                           </a> */}
                            </li>
                        </ul>
                      

                        
                        {/* <a
                            href="/barters"
                            className="mt-5 mr-10 rounded-tr-md rounded-br-md bg-black block px-4 py-2 text-sm text-white hover:bg-red-500 md:hidden"
                            role="menuitem"
                        >
                            Barters
                        </a> */}
                        {/* <form method="POST" action="#">
                            <button type="submit" className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                                Sign in
                            </button>
                        </form> */}
                        
                    </div>
                </div>
            )}
        </div>
    );
}

export default SidebarMenu;