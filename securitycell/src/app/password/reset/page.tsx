"use client"

import type { NextPage } from "next";
import '@fortawesome/fontawesome-free/css/all.css';
import Image from 'next/image'
import { signIn, useSession } from 'next-auth/react';

import { useState, useEffect } from "react";
import { sign } from "crypto";
import axios from "axios";
import crypto from 'crypto';


const LoginPage: NextPage = () => {

  const websitePrefix = 'www.gigadevden.com';

  const { data: session } = useSession();



  const [error, setError] = useState<string | null>(null);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };


  
  const [subject, setSubject] = useState('Account Password Reset');
  const [verificationCodeSent, setVerificationCodeSent] = useState<boolean>(false);
  const [verificationCode, setVerificationCode] = useState<string>(crypto.randomBytes(2).toString('hex'));

  const sendMail = async (to) => {
  
  
      try {
          const response = await axios.post('/api/reset', {
              to,
              subject,
              message: verificationCode
          });
  
          console.log(response.data);
          setVerificationCodeSent(true);
  
      } catch (error) {
          console.error('Error sending email:', error);
          // Handle error if necessary
          // For example, setLoading(false) to stop loading indicator
      }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission

    

    setError(null); // Reset error state

    const formData = new FormData(event.currentTarget);
    formData.set('type', "credentials");
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // Check if any required field is empty
    const requiredFields = ['email'];
    for (const field of requiredFields) {
      if (!formData.get(field)) {
        setError(`${capitalizeFirstLetter(field.replace('-', ' '))} is Required.`);
        return;
      }
    }

    sendMail(email);

    return;

    try {
      const loginResponse = await fetch('https://gigadevden.com/securitycell/database/login.php', {
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
        const form = document.querySelector('form');
        if (form) {
          form.addEventListener('submit', function (event) {
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
        }
      };

      applyValidationAndStyles();
      
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
            const response = await fetch('https://gigadevden.com/securitycell/database/signup.php', {
              method: 'POST',
              body: formData
            });

            if (response.ok) {
              const loginResponse = await fetch('https://gigadevden.com/securitycell/database/login.php', {
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
    <div className="min-h-screen flex flex-col items-center justify-center [background:radial-gradient(50%_50%_at_50%_50%,_#002aaa_19.83%,_#002242)] px-6">


{verificationCodeSent == false && (
      <div className="flex flex-col bg-white shadow-md px-8 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
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

                <input id="email" type="email" name="email" className="text-sm sm:text-base placeholder-gray-500 placeholder-opacity-50 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 text-gray-500" placeholder="E-Mail Address" />
              </div>
            </div>
            


       
            
            {error && (
              <div className="text-red-500 text-sm mt-1 mb-6">{error}</div>
            )}

            <div className="flex w-full">
              <button type="submit" className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in">
                <span className="mr-2">Send Verification Code</span>
                <span>
                  <svg className="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </button>
            </div>
          </form>
        </div>






        <div className="flex justify-center items-center mt-6 text-black text-sm">
          
           

            <span>Got the Password?<span></span><a href="/login" className="ml-2 inline-flex items-center font-bold text-blue-500 hover:text-blue-70 text-center">Login Here</a></span>
       
        </div>
      </div>

)}



{verificationCodeSent == true && (

<div className="flex flex-col bg-white shadow-md px-8 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
        <div className="text-3xl font-bold font-Edane">
          <span className=" text-green-500">SECURITY</span>
          <span className="text-gray-600">CELL</span>
        </div>
        <div className="mt-10">
          <form action="#" onSubmit={handleSubmit}>



<div className="flex flex-row space-x-4">

 
<div className="flex mb-6 items-center">
              {/* <label for="email" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">E-Mail Address:</label> */}
              <div className="relative">
              

                <input id="email" type="email" name="email" className="text-center text-4xl placeholder-gray-500 placeholder-opacity-50 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 text-gray-500" placeholder="*" />
              </div>
            </div>
            


 
            <div className="flex mb-6 items-center">
              {/* <label for="email" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">E-Mail Address:</label> */}
              <div className="relative">
               

                <input id="email" type="email" name="email" className="text-center text-4xl placeholder-gray-500 placeholder-opacity-50 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 text-gray-500" placeholder="*" />
              </div>
            </div>
            


 
            <div className="flex mb-6 items-center">
              {/* <label for="email" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">E-Mail Address:</label> */}
              <div className="relative">
               

                <input id="email" type="email" name="email" className="text-center text-4xl placeholder-gray-500 placeholder-opacity-50 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 text-gray-500" placeholder="*" />
              </div>
            </div>

             
            <div className="flex mb-6 items-center">
              {/* <label for="email" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">E-Mail Address:</label> */}
              <div className="relative">
                

                <input id="email" type="email" name="email" className="text-center text-4xl placeholder-gray-500 placeholder-opacity-50 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 text-gray-500" placeholder="*" />
              </div>
            </div>
            

            

</div>
           

       
            
            {error && (
              <div className="text-red-500 text-sm mt-1 mb-6">{error}</div>
            )}

            <div className="flex w-full">
              <button type="submit" className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in">
                <span className="mr-2">Send Verification Code</span>
                <span>
                  <svg className="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </button>
            </div>
          </form>
        </div>






        
      </div>


)}
    </div>
  );
};

export default LoginPage;
