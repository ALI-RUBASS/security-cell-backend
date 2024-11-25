"use client"

import type { NextPage } from "next";
import '@fortawesome/fontawesome-free/css/all.css';
import Image from 'next/image'
import { signIn, useSession } from 'next-auth/react';

import { useState, useEffect } from "react";
import { sign } from "crypto";

import ticketSvg from '../../assets/images/ticket.svg';
import { ImOpt } from "react-icons/im";

import Advertisement from "../../components/advertisement";
import ChatSupport from "../../components/ChatSupport";



const LoginPage: NextPage = () => {

  const websitePrefix = 'www.securitycell.themavennest.shop';

  const defaultEmail = localStorage.getItem(`${websitePrefix}-temp-email`) || '';
  const defaultPassword = localStorage.getItem(`${websitePrefix}-temp-password`) || '';


  const { data: session } = useSession();



  const [error, setError] = useState<string | null>(null);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission


    setError(null); // Reset error state

    const formData = new FormData(event.currentTarget);
    formData.set('type', "credentials");
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // Check if any required field is empty
    const requiredFields = ['email', 'password'];
    for (const field of requiredFields) {
      if (!formData.get(field)) {
        setError(`${capitalizeFirstLetter(field.replace('-', ' '))} is Required.`);
        return;
      }
    }

    try {
      const loginResponse = await fetch('https://securitycell.themavennest.shop/securitycell/database/login.php', {
        method: 'POST',
        body: formData
      });

      if (loginResponse.ok) {
        const userData = await loginResponse.json(); // Parse response JSON

        if (userData.message === "User found") {

          // Store each attribute separately in localStorage with website prefix
          localStorage.setItem(`${websitePrefix}-public-login`, '1');
          localStorage.setItem(`${websitePrefix}-user-email`, userData.email);
          localStorage.setItem(`${websitePrefix}-user-firstName`, userData.firstName);
          localStorage.setItem(`${websitePrefix}-user-lastName`, userData.lastName);
          localStorage.setItem(`${websitePrefix}-user-message`, userData.message);
          localStorage.setItem(`${websitePrefix}-user-password`, userData.password);
          localStorage.setItem(`${websitePrefix}-user-type`, userData.type);
          localStorage.setItem(`${websitePrefix}-user-userID`, userData.userID);
          localStorage.setItem(`${websitePrefix}-user-verified`, userData.verified);

          window.location.href = '/'; // Redirect to home page
        } else if (userData.message == "Invalid email or password") {
          setError('Invalid email or password');
        }


      } else {
        console.error('Login failed:', loginResponse.statusText);
        // Handle error here, such as showing an error message to the user
      }
    } catch (error) {
      console.error('An error occurred:', error);
      // Handle error here
    }
  };



  useEffect(() => {
    const applyValidationAndStyles = () => {
      // Add event listeners to input fields for validation
      document.querySelectorAll('input').forEach(input => {
        input.addEventListener('change', function (event) {
          if (event.target.value.trim() === '') {
            event.target.style.borderColor = ''; // Reset border color if input is not empty
          }
        });

        // Add event listener to reset border color on input change
        input.addEventListener('input', function (event) {
          event.target.style.borderColor = ''; // Reset border color on input change
        });
      });

      // Add event listener to the form for validation on submit
      document.querySelector('form').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission
        // Check each input for empty value and apply red border if necessary
        document.querySelectorAll('input').forEach(input => {
          if (input.value.trim() === '') {
            input.style.borderColor = 'red'; // Apply red border color if input is empty
          } else {
            input.style.borderColor = ''; // Reset border color if input is not empty
          }
        });
      });
    };

    // Call the function when the component mounts
    applyValidationAndStyles();

    // Cleanup function to remove event listeners when the component unmounts
    return () => {
      document.querySelectorAll('input').forEach(input => {
        input.removeEventListener('change', applyValidationAndStyles);
        input.removeEventListener('input', applyValidationAndStyles); // Remove input event listener
      });
      document.querySelector('form').removeEventListener('submit', applyValidationAndStyles);
    };
  }, []); // Empty dependency array ensures the effect runs only once after initial render



  useEffect(() => {
    console.log("outside");
    console.log(`${websitePrefix}-signup-type`);
    console.log(localStorage.getItem(`${websitePrefix}-signup-type`));
    if (session) {

      if (localStorage.getItem(`${websitePrefix}-signup-type`) == 'google' || localStorage.getItem(`${websitePrefix}-signup-type`) == 'facebook' || localStorage.getItem(`${websitePrefix}-signup-type`) == 'github') {
        console.log("inside");
        const postData = async () => {
          const type = localStorage.getItem(`${websitePrefix}-signup-type`);
          const email = session.user.email;
          const name = session.user.name;

          await localStorage.setItem(`${websitePrefix}-signup-type`, '');

          // Inside your component
          // const { data: session } = useSession();
          // console.log(session);

          // // Check if the session exists and user is signed in
          // // if (session) {
          // // Access user's email and name
          // const userEmail = session.user.email;
          // const userName = session.user.name;

          // Now you can use userEmail and userName as needed
          // console.log(type);
          // console.log('User Email:', userEmail);
          // console.log('User Name:', userName);
          // } else {
          //   // User is not signed in
          //   console.log('User is not signed in.');
          // }

          const formData = new FormData();
          formData.set('type', type);
          // Split the name into first name and last name
          const [firstName, lastName] = name.split(' ');

          // Set the first name and last name separately in the formData
          formData.set('first-name', firstName);
          formData.set('last-name', lastName);

          formData.set('email', email);
          formData.set('password', '');

          try {
            const response = await fetch('https://securitycell.themavennest.shop/securitycell/database/signup.php', {
              method: 'POST',
              body: formData
            });

            if (response.ok) {
              const loginResponse = await fetch('https://securitycell.themavennest.shop/securitycell/database/login.php', {
                method: 'POST',
                body: formData
              });

              if (loginResponse.ok) {
                const userData = await loginResponse.json(); // Parse response JSON

                console.log(userData);

                // Store each attribute separately in localStorage with website prefix
                localStorage.setItem(`${websitePrefix}-public-login`, '1');
                localStorage.setItem(`${websitePrefix}-user-email`, userData.email);
                localStorage.setItem(`${websitePrefix}-user-firstName`, userData.firstName);
                localStorage.setItem(`${websitePrefix}-user-lastName`, userData.lastName);
                localStorage.setItem(`${websitePrefix}-user-message`, userData.message);
                localStorage.setItem(`${websitePrefix}-user-password`, userData.password);
                localStorage.setItem(`${websitePrefix}-user-type`, userData.type);
                localStorage.setItem(`${websitePrefix}-user-userID`, userData.userID);
                localStorage.setItem(`${websitePrefix}-user-verified`, userData.verified);

                window.location.href = '/'; // Redirect to home page
              } else {
                console.error('Login failed:', loginResponse.statusText);
                // Handle error here, such as showing an error message to the user
              }
            } else {
              console.error('Signup failed:', response.statusText);
              // Handle error here, such as showing an error message to the user
            }
          } catch (error) {
            console.error('An error occurred:', error);
            // Handle error here
          }
        };

        postData();

      }
    }
  }, [session]);



  const googleSignup = async () => {
    await localStorage.setItem(`${websitePrefix}-signup-type`, 'google');
    await signIn('google');
  }

  const facebookSignup = async () => {
    await localStorage.setItem(`${websitePrefix}-signup-type`, 'facebook');
    await signIn('facebook');
  }

  const githubSignup = async () => {
    await localStorage.setItem(`${websitePrefix}-signup-type`, 'github');
    await signIn('github');
  }


  


  return (
    <div className="min-h-screen flex flex-col items-center justify-center dark:bg-black bg-gray-100 px-6">



<Advertisement />


<section class="absolute -z-5 isolate overflow-hidden bg-gray-100 w-screen h-screen">
  <div class="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20"></div>
  <div class="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-45deg] bg-gray-100 shadow-2xl shadow-gray-300 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center"></div>


  <div class="absolute z-50 inset-y-1/2 left-0 right-0 transform -translate-y-1/2 w-[530px] mx-auto">
    <div className="flex flex-row items-center">
    <div class="w-6 h-6 rounded-full transform -translate-x-1/2 border-2 border-pink-500"></div>
    <div class="bg-gradient-to-r from-pink-500 to-pink-500 w-full h-px"></div>
    <div class="w-6 h-6 rounded-full transform translate-x-1/2 border-2 border-pink-500"></div>
    </div>
    
</div>



</section>








      <div className="z-30 flex flex-col [background:radial-gradient(50%_50%_at_50%_50%,_#002aaa_19.83%,_#002242)] shadow-md rounded-md w-full max-w-md mb-2 font-Poppins shadow-lg hover:rotate-3 rotate-2">

        <div>
          <div class="font-Poppins group p-4 transition-all duration-300 hover:rotate-3 rotate-2 lg:p-8 rounded-md [background:radial-gradient(50%_50%_at_50%_50%,_#ff0066_19.83%,_#cc0099)]">


            <div className="flex-row flex justify-center items-center">
          

<button className="flex flex-row justify-center items-center hover:text-pink-500 hover:bg-white border border-solid border-pink-500 bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none ease-linear transition-all duration-150 rotate-6" type="button">
  <Image src={ticketSvg} alt="Heart" width={20} height={20} />
 <span className="ml-2">PASS</span>
</button>

              <div className="ml-4">
                <h3 class="text-2xl font-medium text-gray-200">DAIRA</h3>
                <div class="mt-2 text-[10px] text-gray-200">OLYMPYARD at FAST-NUCES</div>
              </div>

              {/* <div class="text-sm font-medium">
                <span class="m-1 ml-0 inline-block text-blue-500">HTML</span>
                <span class="m-1 ml-0 inline-block text-yellow-500">CSS</span>
                <span class="m-1 ml-0 inline-block text-pink-500">FIGMA</span>
                <span class="m-1 ml-0 inline-block text-lime-500">Ad. XD</span>
                <span class="m-1 ml-0 inline-block text-blue-500">Illustrator</span>
              </div> */}

            </div>
            <div class="flex items-center justify-between">
              {/* <a class="font-medium text-blue-500 transition-all duration-300 group-hover:text-blue-500/80">Apply Now</a> */}
            </div>
          </div>
        </div>


      </div>

      <div className="flex z-10 flex-col bg-white shadow-md px-8 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">



     

        <div className="text-3xl font-bold font-Edane">
          <span className=" text-green-500">SECURITY</span>
          <span className="text-gray-600">CELL</span>
        </div>
        <div className="mt-10">
          <form action="#" onSubmit={handleSubmit}>
            <div className="flex mb-6 items-center required">
              {/* <label for="email" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">E-Mail Address:</label> */}
              <div className="relative">
                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                  <svg className="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>

                <input id="email" type="email" name="email" defaultValue={defaultEmail} className="text-sm sm:text-base placeholder-gray-500 placeholder-opacity-50 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 text-gray-500" placeholder="E-Mail Address" />
              </div>
            </div>
            <div className="flex mb-6 items-center required">
              {/* <label for="password" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Password:</label> */}
              <div className="relative">
                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                  <span>
                    <svg className="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </span>
                </div>

                <input id="password" type="password" name="password" defaultValue={defaultPassword} className="text-sm sm:text-base placeholder-gray-500 placeholder-opacity-50 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 text-gray-500" placeholder="Password" />
              </div>
            </div>


            <div className="flex items-center mb-6 -mt-4">
              <div className="flex ml-auto">
                <a href="/password/reset" className="inline-flex text-xs sm:text-sm text-blue-500 hover:text-blue-700">Forgot Your Password?</a>
              </div>
            </div>


            {error && (
              <div className="text-red-500 text-sm mt-1 mb-6">{error}</div>
            )}

            <div className="flex w-full">
              <button type="submit" className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in">
                <span className="mr-2">Login</span>
                <span>
                  <svg className="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </button>
            </div>
          </form>
        </div>


        <div className="relative mt-10 h-px bg-gray-300">
          <div className="absolute left-0 top-0 flex justify-center w-full -mt-2">
            <span className="bg-white px-4 text-xs text-gray-500 uppercase">Or Continue With</span>
          </div>
        </div>








        <div className="flex space-x-6 justify-center h-16">
          <button className="relative mt-6 border rounded-md py-2 text-sm text-gray-800 bg-gray-100 hover:bg-gray-200" onClick={() => googleSignup()}>
            <span className="flex items-center justify-center h-full w-10 p-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
              </svg>
            </span>
          </button>
          <button className="relative mt-6 border rounded-md py-2 text-sm text-gray-800 bg-gray-100 hover:bg-gray-200" onClick={() => facebookSignup()}>
            <span className="flex items-center justify-center h-full w-10 p-2 text-blue-500 text-xl">
              <i className="fab fa-facebook-f"></i>
            </span>
          </button>
          <button className="relative mt-6 border rounded-md py-2 text-sm text-gray-800 bg-gray-100 hover:bg-gray-200" onClick={() => githubSignup()}>
            <span className="flex items-center justify-center h-full w-10 p-2 text-xl">
              <i className="fab fa-github"></i>
            </span>
          </button>
        </div>

        <div className="flex justify-center items-center mt-6">
          <a href="/signup" className="inline-flex items-center font-bold text-blue-500 hover:text-blue-700 text-xs text-center">
            <span>
              <svg className="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </span>

            <span className="ml-2">You don't have an account?</span>
          </a>
        </div>
      </div>


      


   <ChatSupport />


    </div>
  );
};

export default LoginPage;
