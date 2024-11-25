"use client"

import type { NextPage } from "next";
import '@fortawesome/fontawesome-free/css/all.css';
import { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import Email from "next-auth/providers/email";
import Advertisement from "@/components/advertisement";
import ChatSupport from "@/components/ChatSupport";


const SignupPage: NextPage = () => {


  const websitePrefix = 'www.securitycell.themavennest.shop';

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
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirm-password') as string;
    const email = formData.get('email') as string;


    // Check if any required field is empty
    const requiredFields = ['first-name', 'last-name', 'email', 'password', 'confirm-password'];
    for (const field of requiredFields) {
      if (!formData.get(field)) {
        setError(`${capitalizeFirstLetter(field.replace('-', ' '))} is Required.`);
        return;
      }
    }

    if (password !== confirmPassword) {
      setError("Password and confirm password don't match.");
      return;
    }

    try {
      const response = await fetch('https://securitycell.themavennest.shop/securitycell/database/signup.php', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {


        const data = await response.json(); // Read response as text
        if (data.message.includes('Email already registered using')) { // Check if response is 'successful'
          setError(data.message);
        }
        else if (data.message.includes('Email already registered')) { // Check if response is 'successful'
          setError(data.message);
        } else if (data.message == 'User registered successfully') {
          localStorage.setItem(`${websitePrefix}-temp-email`, email);
          localStorage.setItem(`${websitePrefix}-temp-password`, password);

          window.location.href = '/login'; // Redirect to home page

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




  // localStorage.setItem(`${websitePrefix}-signup-type`,'');



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
    <div className="min-h-screen flex flex-col items-center justify-center [background:radial-gradient(50%_50%_at_50%_50%,_#002aaa_19.83%,_#002242)] px-6">


      <Advertisement />

      <section class="absolute -z-5 isolate overflow-hidden bg-gray-100 w-screen h-screen">
        <div class="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20"></div>
        <div class="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-45deg] bg-gray-100 shadow-2xl shadow-gray-300 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center"></div>


        <div class="absolute z-50 inset-y-1/2 left-0 right-0 transform -translate-y-1/2 w-[580px] mx-auto">
          <div className="flex flex-row items-center">
            <div class="w-6 h-6 rounded-full transform -translate-x-1/2 border-2 border-pink-500"></div>
            <div class="bg-gradient-to-r from-pink-500 to-pink-500 w-full h-px"></div>
            <div class="w-6 h-6 rounded-full transform translate-x-1/2 border-2 border-pink-500"></div>
          </div>

        </div>
      </section>

      <div className="z-30 flex flex-col bg-white shadow-md px-8 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-lg">
        <div className="text-3xl font-bold font-Edane">
          <span className=" text-green-500">SECURITY</span>
          <span className="text-gray-600">CELL</span>
        </div>


        <div className="mt-10">
          <form action="#" onSubmit={handleSubmit}>




            <div className="flex space-x-6">
              <div className="flex mb-6 items-center required">
                {/* <label for="email" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">E-Mail Address:</label> */}
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400 opacity-50 p-2">
                    <svg width="800px" height="800px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" stroke-width="3" stroke="#000000" fill="none"><circle cx="32" cy="18.14" r="11.14" /><path d="M54.55,56.85A22.55,22.55,0,0,0,32,34.3h0A22.55,22.55,0,0,0,9.45,56.85Z" /></svg>
                  </div>

                  <input id="first-name" type="text" name="first-name" className="text-sm sm:text-base placeholder-gray-500 placeholder-opacity-50 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 text-gray-500" placeholder="First Name" />

                </div>
              </div>


              <div className="flex mb-6 items-center required">

                {/* <label for="email" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">E-Mail Address:</label> */}
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400 opacity-50 p-2">
                    <svg width="800px" height="800px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" stroke-width="3" stroke="#000000" fill="none"><circle cx="32" cy="18.14" r="11.14" /><path d="M54.55,56.85A22.55,22.55,0,0,0,32,34.3h0A22.55,22.55,0,0,0,9.45,56.85Z" /></svg>
                  </div>

                  <input id="last-name" type="text" name="last-name" className="text-sm sm:text-base placeholder-gray-500 placeholder-opacity-50 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 text-gray-500" placeholder="Last Name" />
                </div>
              </div>
            </div>


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

                <input id="password" type="password" name="password" className="text-sm sm:text-base placeholder-gray-500 placeholder-opacity-50 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 text-gray-500" placeholder="Password" />
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

                <input id="confirm-password" type="password" name="confirm-password" className="text-sm sm:text-base placeholder-gray-500 placeholder-opacity-50 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 text-gray-500" placeholder="Confirm Password" />
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm mt-1 mb-6">{error}</div>
            )}



            <div className="flex w-full">
              <button type="submit" className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in">
                <span className="mr-2">Signup</span>
                <span>
                  <svg className="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
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
          <a href="/login" className="inline-flex items-center font-bold text-blue-500 hover:text-blue-700 text-xs text-center">


            <span>Already have an account?</span>

            <span>
              <svg className="h-6 w-6 ml-2" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
          </a>
        </div>
      </div>

      <ChatSupport />

    </div>
  );
};



export default SignupPage;




// 'use client'


// import { useEffect, useState } from 'react';
// import { Realtime } from 'ably';


// const Chat = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [ch, setCh] = useState('');

//   const [channel, setChannel] = useState(null);

//   const ably = new Realtime({ key: '3JTaGA.FBYHpQ:OoXJNe600CwfAl8-reBD2quO01KIjpaWZQx-LkGPJ2M' });


//   useEffect(() => {
//     // Initialize Ably

   

//     return () => {
//       // Unsubscribe from the channel when component unmounts
//       if (channel) {
//         channel.unsubscribe();
//       }
//     };
//   }, []);

//   const sendMessage = () => {
//     if (input.trim() !== '' && channel) {
//       channel.publish('message', input);
//       setInput('');
//     }
//   };

//   function setRoom () {
//     // Subscribe to the channel
//     const channel = ably.channels.get('ch');

//     // Event listener for messages
//     channel.subscribe('message', (message) => {
//       setMessages((prevMessages) => [...prevMessages, message.data]);
//     });

//     setChannel(channel);
//   };

//   return (
//     <div>
//       <h1>Real-time Chat App</h1>
//       <div>
//         {messages.map((message, index) => (
//           <div key={index}>{message}</div>
//         ))}
//       </div>
//       <div>
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           className="bg-black"
//         />
//         <button onClick={sendMessage}>Send</button>
//         <input
//           type="text"
//           value={ch}
//           onChange={(e) => setCh(e.target.value)}
//           className="bg-black"
//         />
//         <button onClick={setRoom}>Set</button>
//       </div>
//     </div>
//   );
// };

// export default Chat;
