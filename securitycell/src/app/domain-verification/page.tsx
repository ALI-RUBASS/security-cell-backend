'use client'
import Footer from "@/components/Footer";
import HeaderHome from "@/components/HeaderHome";
import React, { useEffect, useState } from "react";


export default function DomainVerificationPage() {

    const websitePrefix = 'www.securitycell.themavennest.shop';


  const [domain, setDomain] = useState("");
  const [key, setKey] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Generate a random alphanumeric string

    useEffect(() => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let result = "";
        for (let i = 0; i < 32; i++) {
          result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setKey(result);
  }, []);

  const user_id = localStorage.getItem(`${websitePrefix}-user-userID`);

  const generateKey = (length = 32) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 32; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setKey(result);
  };

  const handleVerify = async () => {
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/verify-domain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ domain, key, user_id }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadKey = () => {
    const fileContent = key;
    const blob = new Blob([fileContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    // Create a temporary anchor element to download the file
    const a = document.createElement("a");
    a.href = url;
    a.download = "verification.txt";
    a.click();

    // Clean up the object URL
    URL.revokeObjectURL(url);
  };


  const [name, setName] = useState("VBZ");
  const [email, setEmail] = useState("vbz@gmail.com");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value); // Update the name state
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value); // Update the email state
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Name updated to:", name);
    // Add your logic to handle name update here
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email updated to:", email);
    // Add your logic to handle email update here
  };


  return (
    <div style={{ textAlign: "center"}} className="bg-white">

        <HeaderHome />

      



        <div className="flex flex-col justify-center items-center bg-white min-h-[100vh] mb-20">
      <div className="mx-auto flex w-full mt-20 flex-col justify-center px-5 pt-0 md:h-[unset] max-w-[700px] lg:px-6 xl:pl-0">
        <div className="relative flex w-full flex-col pt-[20px] md:pt-0">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm mb-5 h-min max-w-full pt-8 pb-6 px-6 dark:border-zinc-800">

            <div className="mb-10">

            <div className="relative isolate flex items-center gap-x-6 overflow-hidden bg-gray-50 px-6 py-2.5 sm:px-3.5 sm:before:flex-1 mx-4 rounded-lg mb-10 mt-6">
    <div className="block md:hidden absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl" aria-hidden="true">
        <div className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30" style={{ clipPath: 'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)' }}></div>
    </div>
    <div className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl" aria-hidden="true">
        <div className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30" style={{ clipPath: 'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)' }}></div>
    </div>
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className="text-sm leading-6 text-gray-900">
            <strong className="font-semibold">© securitycell.com</strong><svg viewBox="0 0 2 2" className="mx-2 inline h-0.5 w-0.5 fill-current" aria-hidden="true"><circle cx="1" cy="1" r="1" /></svg>Verify your Domain
        </p>
        <button
            className="flex-none rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
            disabled={loading}
        >
            {loading ? 'Verifying...' : 'Status'} <span aria-hidden="true">&rarr;</span>
        </button>                    </div>
    <div className="flex flex-1 justify-end">
        <button type="button" className="-m-3 p-3 focus-visible:outline-offset-[-4px]">
            <span className="sr-only">Dismiss</span>
            <svg className="h-5 w-5 text-gray-900" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
        </button>
    </div>
</div>
        
       
            </div>


            <p className="text-xl font-extrabold text-zinc-950 dark:text-white md:text-3xl">
              Domain Verification
            </p>


<div className="flex justify-center items-center mb-16">
    <div className="max-w-[720px] mx-auto">
   

        <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-full">
            <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-auto">
                <img
                    src="https://wallpapercave.com/wp/wp10792922.jpg"
                    alt="card-image" className="object-cover w-full h-full" />
            </div>
            <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                <div className="flex justify-start items-start text-start flex-col text-gray-900">


<div
              className="relative flex w-full max-w-full md:pt-[unset] mb-6"
            >
              <div className="w-2 h-2 mt-2.5 me-4 rounded-full bg-blue-500"></div>
              <div className="text-sm">
                <p className="text-zinc-950 dark:text-white font-medium text-lg mb-1">
                  Instructions
                </p>
                <p className="text-zinc-500 dark:text-zinc-400 font-medium">
                <p className="border-gray-500 border-b-2 mb-4 pb-4 mt-4">
            Please upload a file named <code>verification.txt</code> to your
            domain root <code>public_html</code>
          </p>
          <p>For example, the file should be accessible at</p>
          <code>http://your-domain.com/verification.txt</code>
                </p>
              </div>
            </div>




</div>
                </div>
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
                    Verify the domain to ensure the system is ready to provide you all the services considering the domain belongs to you.
                </p>
            </div>
         
        </div>
    </div>
</div>





{message && <p style={{ color: "green", marginTop: "20px" }}>{message}</p>}
      {error && <p style={{ color: "red", marginTop: "20px" }}>{error}</p>}


            <p className="mb-6 mt-1 text-sm font-medium text-zinc-500 dark:text-zinc-400 md:mt-4 md:text-base">
            
            <label className="mb-3 mt-16 flex cursor-pointer px-2.5 font-bold leading-none text-zinc-950 dark:text-white">
            <div className="w-2 h-2 mt-1 me-4 rounded-full bg-blue-500"></div>
              Domain
              <p className="ml-1 mt-[1px] text-sm font-medium leading-none text-zinc-500 dark:text-zinc-400">
                (e.g securitycell.com)
              </p>
            </label>
            <div className="mb-8 flex flex-col md:flex-row">
              <form className="w-full" id="nameForm" onSubmit={handleNameSubmit}>
                <input
                  placeholder="securitycell.com"
                  className="text-gray-600 mb-2 mr-4 flex h-full w-full items-center justify-center rounded-lg border border-zinc-200 bg-white/0 px-4 py-4 outline-none dark:!border-white/10 dark:text-white md:mb-0"
                  type="text"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  name="fullName"
                />
              </form>
              <button
                className="text-white bg-gray-900 whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 flex h-full max-h-full w-full items-center justify-center rounded-lg px-4 py-4 text-base font-medium md:ms-4 md:w-[300px]"
                form="nameForm"
                onClick={() => handleVerify()}
              >
                Verify
              </button>
              <div className="mt-8 h-px w-full max-w-[90%] self-center bg-zinc-200 dark:bg-white/10 md:mt-0 md:hidden"></div>
            </div>
            <p className="mb-5 px-2.5 text-red-500 md:px-9 hidden"></p>
            <label className="mb-3 flex cursor-pointer px-2.5 font-bold leading-none text-zinc-950 dark:text-white">
            <div className="w-2 h-2 mt-1 me-4 rounded-full bg-blue-500"></div>
               Secret Verification Key
              {/* <p className="ml-1 mt-[1px] text-sm font-medium leading-none text-zinc-500 dark:text-zinc-400">
                (We will email you to verify the change)
              </p> */}
            </label>
            <div className="mb-8 flex flex-col md:flex-row">
              <form className="w-full" id="emailForm" onSubmit={handleEmailSubmit}>
                <input
                  placeholder="Please enter your email"
                  className="text-gray-600 mr-4 flex h-full max-w-full w-full items-center justify-center rounded-lg border border-zinc-200 bg-white/0 px-4 py-4 outline-none dark:!border-white/10 dark:text-white"
                  type="text"
                  value={key}
                  onChange={handleEmailChange}
                  name="newEmail"
                />
              </form>
              <button
                className="text-white bg-gray-900 whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 flex h-full max-h-full w-full items-center justify-center rounded-lg px-4 py-4 text-base md:ms-4 font-medium md:w-[300px]"
                type="submit"
                form="emailForm"
                onClick={() => generateKey()}
              >
                Generate
              </button>

             
            </div>

           


            </p>

            <div className="flex flex-col">
              <button
            onClick={handleDownloadKey}
            style={{
              marginTop: "10px",
              padding: "10px 20px",
              backgroundColor: "#000000",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Download verification.txt
          </button>
          
              </div>

              

          </div>


          


        </div>
      </div>
    </div>


<Footer />

    </div>
  );
}
