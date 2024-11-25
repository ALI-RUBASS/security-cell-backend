import React, { useState } from 'react';

const ChatSupport = () => {

    const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(prevState => !prevState);
  };

  return (
    
    <>
    <button
      className={`z-10 fixed bottom-4 right-4 inline-flex items-center justify-center text-sm font-medium disabled:pointer-events-none disabled:opacity-50 border rounded-full w-16 h-16 bg-black px-3 pt-1 hover:bg-gray-700 m-0 cursor-pointer border-gray-200 bg-none normal-case leading-5 hover:text-gray-900 `}
      type="button" aria-haspopup="dialog" aria-expanded="false" data-state="closed"
      onClick={toggleChat}
    >
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="-5.0 -10.0 110.0 135.0">
 <g>
  <path fill="#fff" d="m93.285 65h-3.3516c-0.42578 6.3242-3.2383 12.25-7.8672 16.582s-10.727 6.7461-17.066 6.75h-3.5508c0.28906 1.0938 0.28906 2.2422 0 3.3359h3.5508c7.2227-0.011719 14.168-2.7773 19.426-7.7305 5.2539-4.957 8.4219-11.727 8.8594-18.938z"/>
  <path fill="#fff" d="m95 45h-8.332v16.668h8.332c0.44141 0 0.86719-0.17578 1.1797-0.48828s0.48828-0.73828 0.48828-1.1797v-13.332c0-0.44141-0.17578-0.86719-0.48828-1.1797s-0.73828-0.48828-1.1797-0.48828z"/>
  <path fill="#fff" d="m23.367 75.758c-0.074219 0.24609-0.007813 0.51563 0.17578 0.69922 0.18359 0.18359 0.44922 0.25 0.69922 0.17578l11.734-3.3672c0.42188-0.12109 0.87891-0.070313 1.2617 0.14453 7.5703 4.1172 16.66 4.3242 24.406 0.55078 7.7461-3.7695 13.188-11.055 14.613-19.551 1.4258-8.4961-1.3477-17.156-7.4375-23.25-6.0898-6.0898-14.754-8.8594-23.25-7.4375-8.4961 1.4258-15.777 6.8711-19.551 14.617-3.7695 7.7422-3.5625 16.836 0.55469 24.402 0.21094 0.38281 0.26172 0.83594 0.14062 1.2578zm11.633-37.426h30c0.92188 0 1.668 0.74609 1.668 1.668s-0.74609 1.668-1.668 1.668h-30c-0.92188 0-1.668-0.74609-1.668-1.668s0.74609-1.668 1.668-1.668zm0 10h30c0.92188 0 1.668 0.74609 1.668 1.668s-0.74609 1.668-1.668 1.668h-30c-0.92188 0-1.668-0.74609-1.668-1.668s0.74609-1.668 1.668-1.668zm0 10h21.668c0.91797 0 1.6641 0.74609 1.6641 1.668s-0.74609 1.668-1.6641 1.668h-21.668c-0.92188 0-1.668-0.74609-1.668-1.668s0.74609-1.668 1.668-1.668z"/>
  <path fill="#fff" d="m92.477 41.668c-2.582-13.246-11.195-24.527-23.293-30.512-12.094-5.9844-26.289-5.9844-38.383 0-12.098 5.9844-20.707 17.266-23.293 30.512h3.4062c2.5508-12.035 10.504-22.227 21.559-27.621 11.059-5.3945 23.984-5.3945 35.039 0 11.055 5.3945 19.008 15.586 21.559 27.621z"/>
  <path fill="#fff" d="m45 86.668c-1.8398 0-3.332 1.4922-3.332 3.332s1.4922 3.332 3.332 3.332h10c1.8398 0 3.332-1.4922 3.332-3.332s-1.4922-3.332-3.332-3.332z"/>
  <path fill="#fff" d="m5 61.668h8.332v-16.668h-8.332c-0.92188 0-1.668 0.74609-1.668 1.668v13.332c0 0.44141 0.17578 0.86719 0.48828 1.1797s0.73828 0.48828 1.1797 0.48828z"/>
 </g></svg>
    </button>

    <div 
      className={`transition-all duration-300 ease-in-out fixed bottom-10 right-7 bg-white p-6 rounded-lg border border-[#e5e7eb] w-[440px] h-[634px] transform-gpu ${isOpen ? 'scale-100' : 'scale-0'}`}
      style={{ boxShadow: '0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgb(0 0 0 / 0.05)', transformOrigin: 'bottom right' }}
    >
     

     <div className="flex h-[550px] overflow-y-auto ">
     

      {/* Chat Container */}
      <div className="pr-4 h-[474px]" style={{ minWidth: '100%', display: 'table' }}>
        {/* Chat Message AI */}
        <div className="flex gap-3 my-4 text-gray-600 text-sm flex-1">
          <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
            <div className="rounded-full bg-gray-100 border p-1">
              <svg stroke="none" fill="black" strokeWidth="1.5"
                viewBox="0 0 24 24" aria-hidden="true" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
              </svg>
            </div>
          </span>
          <p className="leading-relaxed">
            <span className="block font-bold text-gray-700">Support </span>Hi, how can I help you today?
          </p>
        </div>

        {/* User Chat Message */}
        <div className="flex gap-3 my-4 text-gray-600 text-sm flex-1">
          <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
            <div className="rounded-full bg-gray-100 border p-1">
              <svg stroke="none" fill="black" strokeWidth="0"
                viewBox="0 0 16 16" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
              </svg>
            </div>
          </span>
          <p className="leading-relaxed">
            <span className="block font-bold text-gray-700">You </span>fewafef
          </p>
        </div>

        <div className="flex gap-3 my-4 text-gray-600 text-sm flex-1">
          <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
            <div className="rounded-full bg-gray-100 border p-1">
              <svg stroke="none" fill="black" strokeWidth="0"
                viewBox="0 0 16 16" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
              </svg>
            </div>
          </span>
          <p className="leading-relaxed">
            <span className="block font-bold text-gray-700">You </span>fewafef
          </p>
        </div>

        <div className="flex gap-3 my-4 text-gray-600 text-sm flex-1">
          <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
            <div className="rounded-full bg-gray-100 border p-1">
              <svg stroke="none" fill="black" strokeWidth="0"
                viewBox="0 0 16 16" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
              </svg>
            </div>
          </span>
          <p className="leading-relaxed">
            <span className="block font-bold text-gray-700">You </span>fewafef
          </p>
        </div>

        <div className="flex gap-3 my-4 text-gray-600 text-sm flex-1">
          <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
            <div className="rounded-full bg-gray-100 border p-1">
              <svg stroke="none" fill="black" strokeWidth="0"
                viewBox="0 0 16 16" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
              </svg>
            </div>
          </span>
          <p className="leading-relaxed">
            <span className="block font-bold text-gray-700">You </span>fewafef
          </p>
        </div>
        <div className="flex gap-3 my-4 text-gray-600 text-sm flex-1">
          <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
            <div className="rounded-full bg-gray-100 border p-1">
              <svg stroke="none" fill="black" strokeWidth="0"
                viewBox="0 0 16 16" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
              </svg>
            </div>
          </span>
          <p className="leading-relaxed">
            <span className="block font-bold text-gray-700">You </span>fewafef
          </p>
        </div>

        <div className="flex gap-3 my-4 text-gray-600 text-sm flex-1">
          <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
            <div className="rounded-full bg-gray-100 border p-1">
              <svg stroke="none" fill="black" strokeWidth="0"
                viewBox="0 0 16 16" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
              </svg>
            </div>
          </span>
          <p className="leading-relaxed">
            <span className="block font-bold text-gray-700">You </span>fewafef
          </p>
        </div>


        <div className="flex gap-3 my-4 text-gray-600 text-sm flex-1">
          <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
            <div className="rounded-full bg-gray-100 border p-1">
              <svg stroke="none" fill="black" strokeWidth="0"
                viewBox="0 0 16 16" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
              </svg>
            </div>
          </span>
          <p className="leading-relaxed">
            <span className="block font-bold text-gray-700">You </span>fewafef
          </p>
        </div>

        <div className="flex gap-3 my-4 text-gray-600 text-sm flex-1">
          <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
            <div className="rounded-full bg-gray-100 border p-1">
              <svg stroke="none" fill="black" strokeWidth="0"
                viewBox="0 0 16 16" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
              </svg>
            </div>
          </span>
          <p className="leading-relaxed">
            <span className="block font-bold text-gray-700">You </span>fewafef
          </p>
        </div>

        {/* Ai Chat Message */}
        <div className="flex gap-3 my-4 text-gray-600 text-sm flex-1">
          <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
            <div className="rounded-full bg-gray-100 border p-1">
              <svg stroke="none" fill="black" strokeWidth="1.5"
                viewBox="0 0 24 24" aria-hidden="true" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
              </svg>
            </div>
          </span>
          <p className="leading-relaxed">
            <span className="block font-bold text-gray-700">AI </span>Sorry, I couldn't find any
            information in the documentation about that. Expect answer to be less accurateI could not find the answer to
            this in the verified sources.
          </p>
        </div>
      </div>

      </div>

      {/* Input box */}
      <div className="flex items-center pt-0 fixed">
        <form className="flex items-center justify-center w-full space-x-2">
          <input
            className="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] disabled:cursor-not-allowed disabled:opacity-50 text-[#030712] focus-visible:ring-offset-2"
            placeholder="Type your message" value="" />
          <button
            className="inline-flex items-center justify-center rounded-md text-sm font-medium text-[#f9fafb] disabled:pointer-events-none disabled:opacity-50 bg-black hover:bg-[#111827E6] h-10 px-4 py-2">
            Send
          </button>
        </form>
      </div>

     

    </div>
  </>
  )
};

export default ChatSupport;
