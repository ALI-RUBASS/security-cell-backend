"use client"

import React, { useState, useRef, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import SidebarMenu from './SidebarDark.jsx';
import { FaSignOutAlt } from 'react-icons/fa';
import Image from 'next/image';
import Policy from '../ui/Policy.jsx'
import { HoveredLink, Menu, MenuItem, ProductItem } from "../ui/navbar-menu.tsx";
import { cn } from "@/lib/utils";
import Link from 'next/link.js';


function HeaderHome() {

  const websitePrefix = 'www.securitycell.themavennest.shop';

  const [publicLogin, setPublicLogin] = useState('');
  const [image, setImage] = useState('');
  const [postUrl, setPostUrl] = useState('');

  // useEffect(() => {
  //   // async function fetchLatestPost() {
  //   //   const accessToken = 'YOUR_ACCESS_TOKEN';
  //   //   const userId = '3452633405';
  //   //   const response = await fetch(`https://graph.instagram.com/${userId}/media?access_token=${accessToken}`);
  //   //   const data = await response.json();
  //   //   const latestPostUrl = data.data[0].permalink;
  //   //   setPostUrl(latestPostUrl);
  //   // }

  //   // fetchLatestPost();
  // }, []);

  useEffect(() => {
    setPublicLogin(localStorage.getItem(`${websitePrefix}-public-login`));
    setImage(localStorage.getItem(`${websitePrefix}-user-firstName`));

  }, []);



  const [isOpen, setIsOpen] = useState(true);
  const [isOpen2, setIsOpen2] = useState(false);




  const handleDrawerButtonClick = () => {
    setIsOpen(!isOpen);

  };

  // useEffect(() => {
  //   console.log(isOpen);
  // }, [isOpen]);


  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // handle search submit here
    window.location.href = "/error";
  };

  const handleSignIn = (event) => {
    event.preventDefault();
    // handle sign in  here
    window.location.href = "/login";
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    // handle sign up here
    window.location.href = "/signup";
  };

  const openConsole = (event) => {
    event.preventDefault();
    window.location.href = "/console-home";
  };

  const [isLogoLoaded, setIsLogoLoaded] = useState(false);


  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    setMenuOpen(!isMenuOpen);
  };

  const closeOverlay = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handlePublicLogout = () => {

    localStorage.setItem(`${websitePrefix}-public-login`, null);
    localStorage.removeItem(`${websitePrefix}-user-email`);
    localStorage.removeItem(`${websitePrefix}-user-firstName`);
    localStorage.removeItem(`${websitePrefix}-user-lastName`);
    localStorage.removeItem(`${websitePrefix}-user-message`);
    localStorage.removeItem(`${websitePrefix}-user-password`);
    localStorage.removeItem(`${websitePrefix}-user-type`);
    localStorage.removeItem(`${websitePrefix}-user-userID`);
    localStorage.removeItem(`${websitePrefix}-user-verified`);

    closeOverlay();
    setPublicLogin(null);
  };


  const [active, setActive] = useState('');


  return (
    <header className="sticky pt-6 bg-transparent z-50  opacity-95 mx-6 md:mx-20 2xl:mx-20 md:px-4 pb-2 rounded-b-lg font-poppins font-light">



      {/* <div className="pt-12 md:pt-2.5 relative isolate flex items-center gap-x-6 overflow-hidden bg-black px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
  <div className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl" aria-hidden="true">
    <div className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30" style={{ clipPath: 'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)' }} />
  </div>
  <div className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl" aria-hidden="true">
    <div className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30" style={{ clipPath: 'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)' }} />
  </div>
  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
    <p className="text-sm leading-6 text-white">
      <strong className="font-semibold">GeneriCon 2023</strong>
      <svg viewBox="0 0 2 2" className="mx-2 inline h-0.5 w-0.5 fill-current" aria-hidden="true">
        <circle cx={1} cy={1} r={1} fill="white" />
      </svg>
      Join us in Denver from July 7 – 9 to see what’s coming next.
    </p>
    <a
      href="#"
      className="flex-none rounded-full bg-red-500 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
    >
      Register now <span aria-hidden="true">&rarr;</span>
    </a>
  </div>
  <div className="flex flex-1 justify-end">
  
  </div>
</div> */}




      <div className="flex justify-between items-center z-50">
        <div className="flex flex-row justify-between items-center z-50">
          {/* Three line drawer button
        <div className="block md:hidden">
          <button
            className="flex items-center px-3 py-2 border rounded text-black border-white hover:text-white hover:border-white"
            onClick={handleDrawerButtonClick}
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path
                d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"
              />
            </svg>
          </button>
        </div> */}

          <SidebarMenu />



          <Link href="/" className="text-xl font-Edane">
          <span className=" text-green-500">SECURITY</span>
          <span className="text-gray-600">CELL</span>
        </Link>


          {/* {!isLogoLoaded && (
            <div className="ml-5 pl-[5%] w-16 h-8 bg-gray-300 animate-pulse rounded-md" />
          )} */}


          {/* Cart logo */}
          {/* <img src="https://th.bing.com/th/id/R.75f19c3afe6e06bb699e9acb1e865059?rik=l8kpZ%2fT7akkNMQ&riu=http%3a%2f%2fwww.pngplay.com%2fwp-content%2fuploads%2f1%2fShopping-Cart-PNG-Royalty-Free-Photo.png&ehk=qt1C828QqIQVtzjrcjwuBWO3wWbRFeRu0%2fajPgNbz%2fw%3d&risl=&pid=ImgRaw&r=0" alt="Cart" className="w-auto h-[32px] pl-5" /> */}

          <nav className="pl-[5%] hidden sm:block">
            {/* other navbar content */}
            {/* <form onSubmit={handleSearchSubmit} className="flex items-center">
              <SearchIcon className="h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="search"
                value={searchTerm}
                onChange={handleSearchChange}
                className="ml-2 px-3 py-1 rounded-full border border-gray-300"
              />
            </form> */}
          </nav>

          {/* <ServicesBar /> */}

         

          {/* <a
            href="#"
            className="block px-3 py-2 text-sm text-gray-700 hover:text-blue-500 hidden lg:block"
            role="menuitem"
          >
            Services
          </a> */}


          {/* <Content /> */}

        


          <Menu setActive={setActive}>

          <MenuItem setActive={setActive} active={active} item="Tools">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/web-dev">Web Development</HoveredLink>
            <HoveredLink href="/interface-design">Interface Design</HoveredLink>
            <HoveredLink href="/seo">Search Engine Optimization</HoveredLink>
            <HoveredLink href="/branding">Branding</HoveredLink>
          </div>
        </MenuItem>


          <MenuItem setActive={setActive} active={active} item="Pentesting">
          <div className="  text-sm grid grid-cols-2 gap-10 p-4">
            <ProductItem
              title="Algochurn"
              href="https://algochurn.com"
              src="https://assets.aceternity.com/demos/algochurn.webp"
              description="Prepare for tech interviews like never before."
            />
            <ProductItem
              title="Tailwind Master Kit"
              href="https://tailwindmasterkit.com"
              src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
              description="Production ready Tailwind css components for your next project"
            />
            <ProductItem
              title="Moonbeam"
              href="https://gomoonbeam.com"
              src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
              description="Never write from scratch again. Go from idea to blog in minutes."
            />
            <ProductItem
              title="Rogue"
              href="https://userogue.com"
              src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
              description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
            />
          </div>
        </MenuItem>

<Link href="/pricing" className="text-gray-700 text-sm">
Pricing
{/* <MenuItem setActive={setActive} active={active} item="Pricing">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/hobby">Hobby</HoveredLink>
            <HoveredLink href="/individual">Individual</HoveredLink>
            <HoveredLink href="/team">Team</HoveredLink>
            <HoveredLink href="/enterprise">Enterprise</HoveredLink>
          </div>
        </MenuItem> */}
</Link>
      

</Menu>


         

          <a
            href="/chat.den.ai"
            className="whitespace-nowrap px-4 py-2 text-sm text-gray-600 duration-300 hidden lg:flex"
            role="menuitem"
          >
            AI Chatbot


            <div class="ml-2 hidden rounded-full bg-sky-500 px-1.5 py-0.5 text-xs text-white sm:block">Beta</div>

          </a>

        </div>




        {/* Brand name */}
        {/* <img src="https://th.bing.com/th/id/OIP.KmGbrY3kjNLZ_IdCLF5eMQHaB7?pid=ImgDet&rs=1" alt="Cart" className="w-auto h-auto w-1/6" /> */}

        {/* <h1 className="text-xl font-bold text-slate-900">The Barters Den</h1> */}





        {/* Sign in button */}
        {/* <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">Sign In</button> */}

        <div className="flex flex-row relative text-left p-1 m-1 right-5">
          {/* <a
            //  href="/barters"
            className="px-0 xl:px-4 py-3 text-sm text-red-500 hidden md:block"

            //  className="block px-4 py-2 text-sm text-red-500 hover:text-gray-700 hidden md:block"
            role="menuitem"
          >
            <a href="/infodexeus/articles" className="text-red-600 text-lg font-bold leading-none rounded-full">☉ Infodexeus</a>

          </a> */}
          <div className="hidden xl:block">
            <button
              type="button"
              className="inline-flex justify-center w-full rounded-md shadow-sm text-sm font-medium text-gray-600  duration-300 hover:text-white focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-white"
              id="options-menu"
              aria-haspopup="true"
              aria-expanded="true"
              //onClick={() => setIsOpen2(!isOpen2)}
              // onClick={openConsole}
            >
              <span>
                <p> <Policy /> </p>
              </span>

              {/* <svg
                className="-mr-1 ml-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                />
                <path
                  fillRule="evenodd"
                  d="M3 10a2 2 0 114 0 2 2 0 01-4 0zM10 10a2 2 0 114 0 2 2 0 01-4 0zM17 10a2 2 0 114 0 2 2 0 01-4 0z"
                />
              </svg> */}
            </button>
          </div>

          {/* <Transition
            show={isOpen2}
            enter="transition ease-out duration-100 transform"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75 transform"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div
                className="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  Account settings
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  Support
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  License
                </a>
                <form method="GET" action="/signin">
                  <button
                    type="submit"
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                  >
                    Sign In
                  </button>
                </form>
              </div>
            </div>
          </Transition> */}

          <div className="flex space-x-4">
            {publicLogin !== '1' ? (
              <div className="flex space-x-2">
                <button onClick={handleSignUp} className="ml-4 hidden md:block bg-transparent duration-300 text-sm text-sky-700 font-semibold py-2 px-4 hover:border-transparent rounded">
                  Sign Up
                </button>
                <button onClick={handleSignIn} className="duration-300 bg-neutral-950 text-xs text-white font-bold py-2 px-6 rounded-full">
                  Login
                </button>
              </div>

            ) : (

              <div className="container mx-auto flex items-center justify-between px-4">
                <div className="flex flex-row items-center justify-between">
                  {/* <div className="rounded-full bg-white shadow w-8 h-8 flex items-center justify-center relative ml-4">
                    <img
                      className="rounded-full object-cover object-center"
                      src={`https://securitycell.themavennest.shop${image}`}
                      alt="public-profile-icon"
                      style={{ width: '100%', height: '100%' }}
                    />
                  </div> */}

                  <Link href="/profile" className="rounded-full bg-black shadow w-8 h-8 flex items-center justify-center relative ml-4 text-white">
                    {/* Add your avatar image or icon here */}
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', color: 'white' }}>
                      {image ? image.charAt(0).toUpperCase() : ''}
                    </div>
                  </Link>

                  <button
                    className="flex items-center text-neutral-950 focus:outline-none ml-4 p-2 rounded"
                    onClick={handleLogout}
                  >
                    <div className="flex flex-row ">
                      {/* <div className="dots w-1 h-1 bg-black dark:bg-black rounded-full"></div>
                      <div className="dots w-1 h-1 bg-black dark:bg-black rounded-full ml-[2px]"></div>
                      <div className="dots w-1 h-1 bg-black dark:bg-black rounded-full ml-[2px]"></div> */}
                      <FaSignOutAlt className="text-neutral-950" />
                    </div>
                  </button>

                  {/* {isMenuOpen && (
                    <ul className="absolute right-0 top-full mt-2 w-48 bg-white rounded shadow-lg py-2">
                      <li className="py-1 px-4 hover:text-gray-700 text-gray-500 cursor-pointer">Profile</li>
                      <li className="py-1 px-4 hover:text-gray-700 text-gray-500 cursor-pointer">Settings</li>
                      <li className="py-1 px-4 hover:text-gray-700 text-gray-500 cursor-pointer">Logout</li>
                    </ul>
                  )} */}

                  {isMenuOpen && (
                    <div
                      className="overlay"
                      style={{
                        position: 'fixed',
                        top: 90,
                        right: 32,
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-end',
                        zIndex: 9998,
                        opacity: isMenuOpen ? 1 : 0,
                        transition: 'opacity 0.5s ease-in-out',
                      }}
                    >
                      <div
                        className="overlay-content"
                        style={{
                          backgroundColor: 'black',
                          padding: '20px',
                          borderRadius: '16px',
                          maxWidth: '400px'
                        }}
                      >
                        <div className="flex pb-3 items-center">
                          <div className="-ml-1 text-gray-600 dark:text-gray-400">
                            <FaSignOutAlt />
                          </div>
                          <p className="text-lg text-gray-100 font-semibold pl-2">Confirm logout</p>
                          <button
                            className="close-overlay"
                            onClick={closeOverlay}
                            style={{
                              marginLeft: 'auto',
                              cursor: 'pointer',
                              color: 'white'
                            }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                              <path stroke="none" d="M0 0h24v24H0z" />
                              <line x1="18" y1="6" x2="6" y2="18" />
                              <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                          </button>
                        </div>
                        <p className="text-sm text-gray-200 pb-3 font-normal mb-2">Do you really want to logout?</p>
                        <button
                          onClick={() => handlePublicLogout()}
                          className="delete-account-btn focus:outline-none bg-red-400 transition duration-150 ease-in-out hover:bg-red-500 rounded text-white px-3 py-2 text-xs"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}


                </div>
              </div>

            )}


          </div>


        </div>
      </div>

    </header>
  );
}

export default HeaderHome;
