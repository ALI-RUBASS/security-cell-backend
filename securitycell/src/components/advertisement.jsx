import React from 'react';

const Advertisement = () => {
    return (
        <div className="absolute top-2 left-2 z-20">
            <section>
                <div class="py-0">
                    <div class="mx-auto px-6 max-w-md text-gray-500">
                        {/* <div class="text-center">
                    <h2 class="text-3xl text-gray-950 dark:text-white font-semibold">Quickstart with boilerplates</h2>
                    <p class="mt-6 text-gray-700 dark:text-gray-300">Harum quae dolore inventore repudiandae? orrupti aut temporibus ariatur.</p>
                </div> */}
                        <div class="mt-12 grid sm:grid-cols-1 gap-3">
                            <div class="relative group overflow-hidden p-8 rounded-xl bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-900">
                                <div aria-hidden="true" class="inset-0 absolute aspect-video border rounded-full -translate-y-1/2 group-hover:-translate-y-1/4 duration-300 bg-gradient-to-b from-blue-500 to-white dark:from-white dark:to-white blur-2xl opacity-25 dark:opacity-5 dark:group-hover:opacity-10"></div>
                                <div class="relative">
                                    <div class="border border-blue-500/10 flex relative *:relative *:size-6 *:m-auto size-12 rounded-lg dark:bg-gray-900 dark:border-white/15 before:rounded-[7px] before:absolute before:inset-0 before:border-t before:border-white before:from-blue-100 dark:before:border-white/20 before:bg-gradient-to-b dark:before:from-white/10 dark:before:to-transparent before:shadow dark:before:shadow-gray-950">
                                        <svg class="text-[#000014] dark:text-white" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 128 128">
                                            <defs>
                                                <linearGradient id="deviconAstro0" x1="882.997" x2="638.955" y1="27.113" y2="866.902" gradientTransform="scale(.1)" gradientUnits="userSpaceOnUse">
                                                    <stop offset="0" stop-color="currentColor"></stop>
                                                    <stop offset="1" stop-color="currentColor"></stop>
                                                </linearGradient>
                                                <linearGradient id="deviconAstro1" x1="1001.68" x2="790.326" y1="652.45" y2="1094.91" gradientTransform="scale(.1)" gradientUnits="userSpaceOnUse">
                                                    <stop offset="0" stop-color="#ff1639"></stop>
                                                    <stop offset="1" stop-color="#ff1639" stop-opacity="0"></stop>
                                                </linearGradient>
                                            </defs>
                                            <path fill="url(#deviconAstro0)" d="M81.504 9.465c.973 1.207 1.469 2.836 2.457 6.09l21.656 71.136a90.079 90.079 0 0 0-25.89-8.765L65.629 30.28a1.833 1.833 0 0 0-3.52.004L48.18 77.902a90.104 90.104 0 0 0-26.003 8.778l21.758-71.14c.996-3.25 1.492-4.876 2.464-6.083a8.023 8.023 0 0 1 3.243-2.398c1.433-.575 3.136-.575 6.535-.575H71.72c3.402 0 5.105 0 6.543.579a7.988 7.988 0 0 1 3.242 2.402Zm0 0"></path>
                                            <path fill="#ff5d01" d="M84.094 90.074c-3.57 3.055-10.696 5.137-18.903 5.137c-10.07 0-18.515-3.137-20.754-7.356c-.8 2.418-.98 5.184-.98 6.954c0 0-.527 8.675 5.508 14.71a5.671 5.671 0 0 1 5.672-5.671c5.37 0 5.367 4.683 5.363 8.488v.336c0 5.773 3.527 10.719 8.543 12.805a11.62 11.62 0 0 1-1.172-5.098c0-5.508 3.23-7.555 6.988-9.938c2.989-1.894 6.309-4 8.594-8.222a15.513 15.513 0 0 0 1.875-7.41a15.55 15.55 0 0 0-.734-4.735m0 0"></path>
                                            <path fill="url(#deviconAstro1)" d="M84.094 90.074c-3.57 3.055-10.696 5.137-18.903 5.137c-10.07 0-18.515-3.137-20.754-7.356c-.8 2.418-.98 5.184-.98 6.954c0 0-.527 8.675 5.508 14.71a5.671 5.671 0 0 1 5.672-5.671c5.37 0 5.367 4.683 5.363 8.488v.336c0 5.773 3.527 10.719 8.543 12.805a11.62 11.62 0 0 1-1.172-5.098c0-5.508 3.23-7.555 6.988-9.938c2.989-1.894 6.309-4 8.594-8.222a15.513 15.513 0 0 0 1.875-7.41a15.55 15.55 0 0 0-.734-4.735m0 0"></path>
                                        </svg>
                                    </div>

                                    <div class="mt-6 pb-6 rounded-b-[--card-border-radius]">
                                        <p class="text-gray-700 dark:text-gray-300">Articles, exciting projects, and groundbreaking research on Gigadevden</p>
                                    </div>

                                    <div class="flex gap-3 -mb-8 py-4 border-t border-gray-200 dark:border-gray-800">
                                        <a href="#" download="/" class="group rounded-xl disabled:border *:select-none [&>*:not(.sr-only)]:relative *:disabled:opacity-20 disabled:text-gray-950 disabled:border-gray-200 disabled:bg-gray-100 dark:disabled:border-gray-800/50 disabled:dark:bg-gray-900 dark:*:disabled:!text-white text-gray-950 bg-gray-100 hover:bg-gray-200/75 active:bg-gray-100 dark:text-white dark:bg-gray-500/10 dark:hover:bg-gray-500/15 dark:active:bg-gray-500/10 flex gap-1.5 items-center text-sm h-8 px-3.5 justify-center">
                                            <span>Download</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m17 13l-5 5m0 0l-5-5m5 5V6"></path></svg>
                                        </a>
                                        <a href="#" class="p-1 group flex items-center rounded-xl disabled:border *:select-none [&>*:not(.sr-only)]:relative *:disabled:opacity-20 disabled:text-gray-950 disabled:border-gray-200 disabled:bg-gray-100 dark:disabled:border-gray-800/50 disabled:dark:bg-gray-900 dark:*:disabled:!text-white text-gray-950 bg-gray-100 hover:bg-gray-200/75 active:bg-gray-100 dark:text-white dark:bg-gray-500/10 dark:hover:bg-gray-500/15 dark:active:bg-gray-500/10 size-8 justify-center">
                                            <span class="sr-only">Source Code</span>
                                            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                                width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000"
                                                preserveAspectRatio="xMidYMid meet">

                                                <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                                                    fill="#000000" stroke="none">
                                                    <path d="M2322 4750 c-130 -11 -196 -24 -422 -81 -19 -4 -60 -18 -90 -29 -30
-12 -75 -28 -100 -36 -60 -21 -238 -111 -325 -164 -285 -174 -560 -449 -735
-735 -48 -77 -149 -284 -175 -355 -79 -222 -115 -383 -135 -594 -42 -451 59
-897 294 -1311 129 -227 368 -489 606 -666 106 -79 313 -194 435 -243 39 -16
79 -32 90 -37 73 -31 280 -85 415 -109 222 -38 592 -28 800 22 25 6 63 14 85
19 99 21 307 98 443 164 60 29 248 144 302 184 440 328 735 773 855 1288 39
168 49 268 49 493 1 241 -10 331 -60 540 -148 606 -575 1140 -1141 1424 -209
105 -359 155 -625 206 -136 27 -379 35 -566 20z m448 -571 c108 -14 130 -19
130 -31 0 -5 -77 -113 -172 -239 -112 -151 -177 -229 -187 -227 -18 4 -351
443 -351 463 0 16 20 21 130 34 165 21 292 21 450 0z m-498 -314 c104 -137
198 -264 209 -282 18 -29 19 -46 17 -235 l-3 -203 -189 -3 c-130 -2 -193 1
-202 9 -11 9 -14 64 -14 280 0 313 10 293 -116 229 -97 -50 -101 -53 -189
-116 -230 -168 -395 -415 -470 -704 -12 -47 -13 -65 -4 -76 9 -12 109 -14 598
-16 l586 -3 3 -594 c2 -576 2 -594 -18 -625 -10 -17 -104 -143 -208 -281 -148
-196 -193 -251 -213 -253 -25 -3 -201 63 -296 111 -187 95 -425 300 -564 487
-81 108 -199 321 -199 359 0 21 3 21 213 21 l214 0 50 -77 c126 -193 298 -344
514 -453 109 -55 100 -94 100 435 -1 253 -1 463 -1 468 0 4 -265 7 -589 7
l-590 0 -15 22 c-13 18 -16 53 -16 173 1 442 153 818 460 1138 190 199 390
325 680 430 49 18 60 7 252 -248z m898 209 c110 -44 257 -125 359 -199 82 -59
236 -202 306 -285 101 -120 270 -419 248 -441 -6 -6 -92 -8 -218 -7 l-209 3
-57 84 c-96 143 -230 276 -365 363 -66 42 -202 108 -224 108 -20 0 -20 -1 -18
-1142 3 -1070 4 -1143 20 -1146 22 -4 161 66 253 127 97 64 258 228 331 336
l60 90 218 3 218 2 -7 -27 c-11 -47 -93 -201 -154 -292 -119 -175 -272 -329
-445 -445 -88 -59 -256 -151 -303 -166 -15 -5 -53 -18 -83 -29 -96 -37 -50
-83 -472 483 l-38 50 0 1009 0 1009 22 31 c56 80 382 513 392 520 17 12 71 -1
166 -39z m-442 -2873 c95 -126 172 -234 172 -239 0 -15 -18 -19 -175 -38 -146
-17 -255 -15 -440 9 -68 9 -91 16 -93 28 -1 9 68 110 154 225 178 238 183 244
199 244 6 0 89 -103 183 -229z"/>
                                                </g>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div class="relative group overflow-hidden p-8 rounded-xl bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-900">
                                <div aria-hidden="true" class="inset-0 absolute aspect-video border rounded-full -translate-y-1/2 group-hover:-translate-y-1/4 duration-300 bg-gradient-to-b from-red-500 to-white dark:from-white dark:to-white blur-2xl opacity-25 dark:opacity-5 dark:group-hover:opacity-10"></div>
                                <div class="relative">
                                    <div class="border border-red-500/10 flex relative *:relative *:size-6 *:m-auto size-12 rounded-lg dark:bg-gray-900 dark:border-white/15 before:rounded-[7px] before:absolute before:inset-0 before:border-t before:border-white before:from-red-100 dark:before:border-white/20 before:bg-gradient-to-b dark:before:from-white/10 dark:before:to-transparent before:shadow dark:before:shadow-gray-950">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="0.95em" height="1em" viewBox="0 0 256 271"><defs><linearGradient id="logosAngularIcon0" x1="25.071%" x2="96.132%" y1="90.929%" y2="55.184%"><stop offset="0%" stop-color="#e40035"></stop><stop offset="24%" stop-color="#f60a48"></stop><stop offset="35.2%" stop-color="#f20755"></stop><stop offset="49.4%" stop-color="#dc087d"></stop><stop offset="74.5%" stop-color="#9717e7"></stop><stop offset="100%" stop-color="#6c00f5"></stop></linearGradient><linearGradient id="logosAngularIcon1" x1="21.863%" x2="68.367%" y1="12.058%" y2="68.21%"><stop offset="0%" stop-color="#ff31d9"></stop><stop offset="100%" stop-color="#ff5be1" stop-opacity="0"></stop></linearGradient></defs><path fill="url(#logosAngularIcon0)" d="m256 45.179l-9.244 145.158L158.373 0zm-61.217 187.697l-66.782 38.105l-66.784-38.105L74.8 199.958h106.4zM128.001 72.249l34.994 85.076h-69.99zM9.149 190.337L0 45.179L97.627 0z"></path><path fill="url(#logosAngularIcon1)" d="m256 45.179l-9.244 145.158L158.373 0zm-61.217 187.697l-66.782 38.105l-66.784-38.105L74.8 199.958h106.4zM128.001 72.249l34.994 85.076h-69.99zM9.149 190.337L0 45.179L97.627 0z"></path></svg>
                                    </div>

                                    <div class="mt-6 pb-6 rounded-b-[--card-border-radius]">
                                        <p class="text-gray-700 dark:text-gray-300">Open-Source Projects for the startup at Gigadevden.</p>
                                    </div>
                                    <div class="flex gap-3 -mb-8 py-4 border-t border-gray-200 dark:border-gray-800">
                                        <a href="#" download="/" class="group rounded-xl disabled:border *:select-none [&>*:not(.sr-only)]:relative *:disabled:opacity-20 disabled:text-gray-950 disabled:border-gray-200 disabled:bg-gray-100 dark:disabled:border-gray-800/50 disabled:dark:bg-gray-900 dark:*:disabled:!text-white text-gray-950 bg-gray-100 hover:bg-gray-200/75 active:bg-gray-100 dark:text-white dark:bg-gray-500/10 dark:hover:bg-gray-500/15 dark:active:bg-gray-500/10 flex gap-1.5 items-center text-sm h-8 px-3.5 justify-center">
                                            <span>Download</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m17 13l-5 5m0 0l-5-5m5 5V6"></path></svg>
                                        </a>
                                        <a href="#" class="p-1 group flex items-center rounded-xl disabled:border *:select-none [&>*:not(.sr-only)]:relative *:disabled:opacity-20 disabled:text-gray-950 disabled:border-gray-200 disabled:bg-gray-100 dark:disabled:border-gray-800/50 disabled:dark:bg-gray-900 dark:*:disabled:!text-white text-gray-950 bg-gray-100 hover:bg-gray-200/75 active:bg-gray-100 dark:text-white dark:bg-gray-500/10 dark:hover:bg-gray-500/15 dark:active:bg-gray-500/10 size-8 justify-center">
                                            <span class="sr-only">Source Code</span>
                                            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                                width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000"
                                                preserveAspectRatio="xMidYMid meet">

                                                <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                                                    fill="#000000" stroke="none">
                                                    <path d="M2322 4750 c-130 -11 -196 -24 -422 -81 -19 -4 -60 -18 -90 -29 -30
-12 -75 -28 -100 -36 -60 -21 -238 -111 -325 -164 -285 -174 -560 -449 -735
-735 -48 -77 -149 -284 -175 -355 -79 -222 -115 -383 -135 -594 -42 -451 59
-897 294 -1311 129 -227 368 -489 606 -666 106 -79 313 -194 435 -243 39 -16
79 -32 90 -37 73 -31 280 -85 415 -109 222 -38 592 -28 800 22 25 6 63 14 85
19 99 21 307 98 443 164 60 29 248 144 302 184 440 328 735 773 855 1288 39
168 49 268 49 493 1 241 -10 331 -60 540 -148 606 -575 1140 -1141 1424 -209
105 -359 155 -625 206 -136 27 -379 35 -566 20z m448 -571 c108 -14 130 -19
130 -31 0 -5 -77 -113 -172 -239 -112 -151 -177 -229 -187 -227 -18 4 -351
443 -351 463 0 16 20 21 130 34 165 21 292 21 450 0z m-498 -314 c104 -137
198 -264 209 -282 18 -29 19 -46 17 -235 l-3 -203 -189 -3 c-130 -2 -193 1
-202 9 -11 9 -14 64 -14 280 0 313 10 293 -116 229 -97 -50 -101 -53 -189
-116 -230 -168 -395 -415 -470 -704 -12 -47 -13 -65 -4 -76 9 -12 109 -14 598
-16 l586 -3 3 -594 c2 -576 2 -594 -18 -625 -10 -17 -104 -143 -208 -281 -148
-196 -193 -251 -213 -253 -25 -3 -201 63 -296 111 -187 95 -425 300 -564 487
-81 108 -199 321 -199 359 0 21 3 21 213 21 l214 0 50 -77 c126 -193 298 -344
514 -453 109 -55 100 -94 100 435 -1 253 -1 463 -1 468 0 4 -265 7 -589 7
l-590 0 -15 22 c-13 18 -16 53 -16 173 1 442 153 818 460 1138 190 199 390
325 680 430 49 18 60 7 252 -248z m898 209 c110 -44 257 -125 359 -199 82 -59
236 -202 306 -285 101 -120 270 -419 248 -441 -6 -6 -92 -8 -218 -7 l-209 3
-57 84 c-96 143 -230 276 -365 363 -66 42 -202 108 -224 108 -20 0 -20 -1 -18
-1142 3 -1070 4 -1143 20 -1146 22 -4 161 66 253 127 97 64 258 228 331 336
l60 90 218 3 218 2 -7 -27 c-11 -47 -93 -201 -154 -292 -119 -175 -272 -329
-445 -445 -88 -59 -256 -151 -303 -166 -15 -5 -53 -18 -83 -29 -96 -37 -50
-83 -472 483 l-38 50 0 1009 0 1009 22 31 c56 80 382 513 392 520 17 12 71 -1
166 -39z m-442 -2873 c95 -126 172 -234 172 -239 0 -15 -18 -19 -175 -38 -146
-17 -255 -15 -440 9 -68 9 -91 16 -93 28 -1 9 68 110 154 225 178 238 183 244
199 244 6 0 89 -103 183 -229z"/>
                                                </g>
                                            </svg>

                                        </a>
                                    </div>
                                </div>
                            </div>



                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
};

export default Advertisement;
