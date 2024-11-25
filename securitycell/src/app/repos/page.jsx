"use client"

import React, { useState, useEffect } from 'react';
import { HiOutlineDownload } from 'react-icons/hi';
import { SiGoogledrive } from 'react-icons/si';
import Header from '../../components/HeaderHome';
import Footer from '../../components/Footer'
import Pagination from '../../components/Pagination';
import { SearchIcon } from '@heroicons/react/solid';
import { id } from 'date-fns/locale';
import { FaArrowRight, FaChessKing, FaCloudDownloadAlt, FaDownload, FaRegEye } from 'react-icons/fa';
import moment from 'moment';
import AliRubass from '../../assets/images/alirubass.jpeg';
import dotden from '../../assets/images/dotden.png'

import MainBackground from '../../assets/images/background_design_id_118.jpg'
import SecondaryBackground from '../../assets/images/background_design_id_116.jpg'

import background2 from '../../assets/images/background_design_id_170.jpg'

import Image from 'next/image';


const EmployeeData = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        fetchData();
    };



    // Total number of pages
    const [totalPages, setTotalPages] = useState(1);
    const [offset, setOffset] = useState(0);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                `https://gigadevden.com/webarticles.php?search=${encodeURIComponent(searchTerm)}&offset=${encodeURIComponent(offset)}&category=${encodeURIComponent(category)}&sortby=${encodeURIComponent(sortby)}&price=${encodeURIComponent(price)}`
            );
            const json = await response.json();

            if (Object.keys(json).length === 0) {
                setTotalPages(0);
            }
            else {

                if (json[0].totalrows % 12 === 0) {
                    setTotalPages((json[0].totalrows) / 12);
                }
                else {
                    setTotalPages(Math.floor(json[0].totalrows / 12) + 1);
                }

                setData(json);
                setLoading(false);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    const getFileIcon = (driveLink) => {
        const fileExtension = driveLink.split('.').pop().toLowerCase();

        if (fileExtension === 'pdf') {
            return <SiGoogledrive className="w-6 h-6 text-red-500" />;
        } else if (fileExtension === 'doc' || fileExtension === 'docx') {
            return <SiGoogledrive className="w-6 h-6 text-blue-500" />;
        } else if (fileExtension === 'xls' || fileExtension === 'xlsx') {
            return <SiGoogledrive className="w-6 h-6 text-green-500" />;
        } else {
            return <SiGoogledrive className="w-6 h-6 text-gray-500" />;
        }
    };

    const downloadFile = (driveLink) => {
        window.open(driveLink, '_blank');
    };

    const [currentPage, setCurrentPage] = useState(1);


    const handlePageChange = (page) => {

        if (page >= 1 && page <= totalPages) {
            setOffset((page - 1) * 12);
            setCurrentPage(page);
        }

        // Perform any other actions or fetch data based on the new page
    };

    const websitePrefix = 'www.gigadevden.com';

    function setCurrentProjectId(id, title) {
        const formattedTitle = title
            .toLowerCase() // Convert title to lowercase
            .replace(/[^a-zA-Z0-9\s]/g, ' ') // Remove special characters
            .trim()
            .replace(/\s+/g, '-'); // Replace spaces with dashes
        window.location.href = '/infodexeus/articles/' + id + '/' + formattedTitle;
    }





    // Filters
    const [showFilters, setShowfilters] = useState(false);

    const [check, setCheck] = useState({
        "All": true,
        "Programming/Software Development": false,
        "Art/Creative Design": false,
        "Business/Entrepreneurship": false,
        "Engineering/Technology": false,
        "Science/Research": false,
        "Education": false,
        "Health/Medicine": false,
        "Social Sciences": false,
        "Environment/Sustainability": false,
        "Gaming": false,
        "Entertainment": false,
        "Other": false,
    });

    const { "All": All, "Programming/Software Development": Programming, "Art/Creative Design": Art, "Business/Entrepreneurship": Business, "Engineering/Technology": Engineering, "Science/Research": Science, "Education": Education, "Health/Medicine": Health, "Social Sciences": Social, "Environment/Sustainability": Environment, "Gaming": Gaming, "Entertainment": Entertainment, "Other": Other } = check;



    const [category, setCategory] = useState('All');




    const [selectedButton, setSelectedButton] = useState("All");


    const changeHandler = (e) => {
        const { name } = e.target;
        setSelectedButton(e.target.name);
        setCategory(name);

    };



    const applyFilters = (e) => {
        setCheck({
            ...check,
            "All": All,
            "Programming/Software Development": false,
            "Art/Creative Design": false,
            "Business/Entrepreneurship": false,
            "Engineering/Technology": false,
            "Science/Research": false,
            "Education": false,
            "Health/Medicine": false,
            "Social Sciences": false,
            "Environment/Sustainability": false,
            "Gaming": false,
            "Entertainment": false,
            "Other": false,
        });
    };



    const [check2, setCheck2] = useState({
        "": true,
        "Upload date: New to Old": false,
        "Upload date: Old to New": false,
    });

    const { "": Relevance, "Upload date: New to Old": New, "Upload date: Old to New": Old } = check2;

    const [sortby, setSortby] = useState('');

    const changeHandler2 = (e) => {
        const { name, checked } = e.target;

        // If the checkbox is being checked, set its value to true and set all other checkboxes to false
        if (checked) {
            setCheck2((prevState) => ({
                ...Object.fromEntries(Object.keys(prevState).map((key) => [key, false])),

                [name]: true,
            }));

            setSortby(name);
        }
        // else {
        //   // If the checkbox is being unchecked, set its value to false
        //   setCheck3((prevState) => ({
        //     ...prevState,
        //     [name]: false,
        //   }));

        //   setPrice('');
        // }
    };


    const applyFilters2 = (e) => {
        setCheck({
            ...check2,
            "": true,
            "Upload date: New to Old": false,
            "Upload date: Old to New": false,
        });
    };



    const [check3, setCheck3] = useState({
        "": true,
        "Price: Low to High": false,
        "Price: High to Low": false,
        "Free": false,
    });

    const { "": All3, "Price: Low to High": Low, "Price: High to Low": High, "Free": Free } = check3;

    const [price, setPrice] = useState('');

    const changeHandler3 = (e) => {
        const { name, checked } = e.target;

        // If the checkbox is being checked, set its value to true and set all other checkboxes to false
        if (checked) {
            setCheck3((prevState) => ({
                ...Object.fromEntries(Object.keys(prevState).map((key) => [key, false])),

                [name]: true,
            }));

            setPrice(name);
        }
        // else {
        //   // If the checkbox is being unchecked, set its value to false
        //   setCheck3((prevState) => ({
        //     ...prevState,
        //     [name]: false,
        //   }));

        //   setPrice('');
        // }
    };


    const applyFilters3 = (e) => {
        setCheck({
            ...check3,
            "": false,
            "Price: Low to High": false,
            "Price: High to Low": false,
            "Free": false,
        });
    };


    // useEffect(() => {
    //   console.log("Category: " + category);
    //   console.log("Price: " + price);
    //   console.log("Sort by: " + sortby);
    // }, [category, price, sortby]);



    const apply = (e) => {
        fetchData();
    };



    // const getTimeDifference = (timestamp, time) => {
    //   const currentTime = moment(timestamp);
    //   const oldTime = moment(time);
    //   const duration = moment.duration(currentTime.diff(oldTime));

    //   if (duration.asMinutes() < 60) {
    //     return `${Math.round(duration.asMinutes())} min ago`;
    //   } else if (duration.asHours() < 24) {
    //     return `${Math.round(duration.asHours())} hour ago`;
    //   } else if (duration.asDays() < 7) {
    //     return `${Math.round(duration.asDays())}d ago`;
    //   } else if (duration.asMonths() < 1) {
    //     return `${Math.round(duration.asWeeks())}w ago`;
    //   } else if (duration.asYears() < 1) {
    //     return `${Math.round(duration.asMonths())} month ago`;
    //   } else {
    //     return `${Math.round(duration.asYears())} year ago`;
    //   }
    // };

    const getTimeDifference = (timestamp, time) => {
        const currentTime = moment.utc(timestamp);
        const oldTime = moment.utc(time, "YYYY-MM-DD HH:mm:ss");
        const duration = moment.duration(currentTime.diff(oldTime));

        if (duration.asMinutes() < 60) {
            return `${Math.round(duration.asMinutes())} min ago`;
        } else if (duration.asHours() < 24) {
            return `${Math.round(duration.asHours())} hour ago`;
        } else if (duration.asDays() < 7) {
            return `${Math.round(duration.asDays())}d ago`;
        } else if (duration.asMonths() < 1) {
            return `${Math.round(duration.asWeeks())}w ago`;
        } else if (duration.asYears() < 1) {
            return `${Math.round(duration.asMonths())} month ago`;
        } else {
            return `${Math.round(duration.asYears())} year ago`;
        }
    };


    useEffect(() => {
        fetchData();
    }, [searchTerm, offset, category]);



    return (
        // <div className="bg-black font-inter antialiased bg-black text-gray-200 tracking-tight">

        <div className="bg-white font-urbanist relative">




            <Image src={SecondaryBackground} className="w-full absolute opacity-5 pointer-events-none  hidden md:block" />


            <Header />









            {/* <div className="relative w-full opacity-20 rounded pointer-events-none z-10 -mt-16 md:-mt-0">
                <div className="relative">
                    <video className="w-full" controls autoPlay muted loop>
                        <source src={background} type="video/mp4" />
                    </video>
                    <img src={background} className="w-full" />
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-transparent to-transparent opacity-200"></div>

                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-200"></div>

                </div>
            </div> */}

            {/* <video src={background} className='absolute right-48 w-[600px] opacity-10 rounded pointer-events-none border animate-'/> */}
            <div className="relative container mx-auto min-h-screen px-4 z-20"
            >







                {/* Filters */}



                <div className="md:mt-16 mt-4 bg-white rounded-t-lg px-5 pb-48"
                    style={{
                        boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
                        position: 'relative', // Add position relative to allow the image to be correctly displayed
                    }}>

                    <div className="absolute inset-0">
                        <Image
                            src={MainBackground}
                            alt="Background"
                            layout="fill" // Fills the parent container
                            objectFit="cover" // Covers the container while maintaining aspect ratio
                            className="rounded-t-lg"
                        />
                    </div>


                    <div className=" md:py-12 lg:px-20 md:px-6 py-4 px-4 relative z-10">







                        {/* <p className=" text-sm leading-3 text-gray-600 font-normal mb-4 md:mb-2">Home - Content - Articles</p> */}

                        <div class="flex space-x-4 text-gray-900 mb-4 text-lg bg-white py-2 px-4 rounded-full bg-opacity-40 w-fit justify-center items-center">

                            <span class="rounded-full bg-sky-500 px-1 py-1 h-10 w-10 text-3xl text-white sm:flex justify-center items-center">✑</span>

                            <svg aria-hidden="true" width="24" height="24" fill="none" class="flex-none text-gray-400">
                                <path d="M10.75 8.75l3.5 3.25-3.5 3.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                            <span class="block w-max text-gray-900 border-b-2 border-cyan-400">Infodexeus</span>
                        </div>

                        <div className=" flex justify-between items-center">
                            <h2 className=" lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-800 font-semibold hidden md:block font-Poppins">REPOS</h2>
                            <h1 className="text-red-600 text-5xl md:text-5xl font-bold leading-none rounded-full hidden md:block">☉ Infodexeus</h1>








                            {/*  filters Button (md and plus Screen) */}
                            <button onClick={() => setShowfilters(!showFilters)} className=" cursor-pointer sm:flex hidden hover:bg-gray-700 focus:ring focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-4 px-6 bg-gray-800 rounded-full flex text-base leading-4 font-normal text-white justify-center items-center ">
                                <svg className=" mr-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 12C7.10457 12 8 11.1046 8 10C8 8.89543 7.10457 8 6 8C4.89543 8 4 8.89543 4 10C4 11.1046 4.89543 12 6 12Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M6 4V8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M6 12V20" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 18C13.1046 18 14 17.1046 14 16C14 14.8954 13.1046 14 12 14C10.8954 14 10 14.8954 10 16C10 17.1046 10.8954 18 12 18Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 4V14" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 18V20" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M18 9C19.1046 9 20 8.10457 20 7C20 5.89543 19.1046 5 18 5C16.8954 5 16 5.89543 16 7C16 8.10457 16.8954 9 18 9Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M18 4V5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M18 9V20" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Filters
                            </button>
                        </div>







                        <div className="flex flex-col w-full items-center justify-center opacity-95 md:hidden">
                            <nav className="flex mt-10 z-50">
                                {/* other navbar content */}
                                <form onSubmit={handleSearchSubmit} className="flex items-center">
                                    <SearchIcon className="h-4 w-4 text-gray-500" />
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                        className="ml-2 pl-3 pr-28 mr-12 py-2 rounded-full border-6 border-white bg-white opacity-100 text-gray-800 focus:border-white focus:outline-none"
                                    />

                                    <button onClick={() => setShowfilters(!showFilters)} className="-ml-20 z-10 cursor-pointer block sm:hidden py-2 leading-4 rounded text-xs text-white justify-center items-center">
                                        <svg className=" mr-2" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6 12C7.10457 12 8 11.1046 8 10C8 8.89543 7.10457 8 6 8C4.89543 8 4 8.89543 4 10C4 11.1046 4.89543 12 6 12Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M6 4V8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M6 12V20" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M12 18C13.1046 18 14 17.1046 14 16C14 14.8954 13.1046 14 12 14C10.8954 14 10 14.8954 10 16C10 17.1046 10.8954 18 12 18Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M12 4V14" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M12 18V20" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M18 9C19.1046 9 20 8.10457 20 7C20 5.89543 19.1046 5 18 5C16.8954 5 16 5.89543 16 7C16 8.10457 16.8954 9 18 9Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M18 4V5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M18 9V20" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>

                                    </button>
                                </form>

                            </nav>




                            <div id="filterSection" className={"relative md:py-5 lg:px-20 md:px-6 py-4 px-4 bg-gray-50 rounded w-full " + (showFilters ? "block" : "hidden")}>
                                {/* Cross button Code  */}
                                <div onClick={() => setShowfilters(false)} className=" cursor-pointer absolute right-0 top-0 md:py-10 lg:px-20 md:px-6 py-9 px-4">
                                    <svg className=" lg:w-6 lg:h-6 w-4 h-4" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M25 1L1 25" stroke="#1F2937" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M1 1L25 25" stroke="#27272A" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>







                                <hr className="bg-gray-200 lg:w-6/12 w-full" />


                                <div>
                                    <div className=" flex space-x-2">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3 5H14" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M12 7L14 5L12 3" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M5 3L3 5L5 7" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M19 10V21" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M17 19L19 21L21 19" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M21 12L19 10L17 12" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M12 10H5C3.89543 10 3 10.8954 3 12V19C3 20.1046 3.89543 21 5 21H12C13.1046 21 14 20.1046 14 19V12C14 10.8954 13.1046 10 12 10Z" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <p className="  lg:text-2xl text-xl lg:leading-6 leading-5 font-medium text-gray-800 ">Order by</p>
                                    </div>
                                    <div className=" md:flex md:space-x-6 mt-8 grid grid-cols-3 gap-y-8 flex-wrap">
                                        <div className=" flex md:justify-center md:items-center items-center justify-start ">
                                            <input className="w-4 h-4 mr-2" type="checkbox" id="" name="" value="" checked={Relevance} onChange={changeHandler2} />
                                            <div className=" inline-block">
                                                <div className=" flex space-x-6 justify-center items-center">
                                                    <label className=" mr-2 text-sm leading-3 font-normal text-gray-600" htmlFor="Relevance">
                                                        Relevance
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" flex justify-center items-center ">
                                            <input className="w-4 h-4 mr-2" type="checkbox" id="Upload date: New to Old" name="Upload date: New to Old" value="Upload date: New to Old" checked={New} onChange={changeHandler2} />
                                            <div className=" inline-block">
                                                <div className=" flex space-x-6 justify-center items-center">
                                                    <label className=" mr-2 text-sm leading-3 font-normal text-gray-600" htmlFor="Upload date: New to Old">
                                                        New to Old
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" flex md:justify-center md:items-center items-center justify-end ">
                                            <input className="w-4 h-4 mr-2" type="checkbox" id="Upload date: Old to New" name="Upload date: Old to New" value="Upload date: Old to New" checked={Old} onChange={changeHandler2} />
                                            <div className=" inline-block">
                                                <div className=" flex space-x-6 justify-center items-center">
                                                    <label className=" mr-2 text-sm leading-3 font-normal text-gray-600" htmlFor="Upload date: Old to New">
                                                        Old to New
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <hr className=" bg-gray-200 lg:w-6/12 w-full md:my-10 my-8" />



                                {/* Collection Section */}

                                <div>
                                    <div className=" flex space-x-2">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g opacity="0.8">
                                                <path d="M9 4H5C4.44772 4 4 4.44772 4 5V9C4 9.55228 4.44772 10 5 10H9C9.55228 10 10 9.55228 10 9V5C10 4.44772 9.55228 4 9 4Z" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M9 14H5C4.44772 14 4 14.4477 4 15V19C4 19.5523 4.44772 20 5 20H9C9.55228 20 10 19.5523 10 19V15C10 14.4477 9.55228 14 9 14Z" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M19 14H15C14.4477 14 14 14.4477 14 15V19C14 19.5523 14.4477 20 15 20H19C19.5523 20 20 19.5523 20 19V15C20 14.4477 19.5523 14 19 14Z" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M14 7H20" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M17 4V10" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </g>
                                        </svg>
                                        <p className=" lg:text-2xl text-xl lg:leading-6 leading-5 font-medium text-gray-800 ">Collection</p>
                                    </div>
                                    <div className=" flex mt-8 space-x-7">
                                        <div className=" flex justify-center items-center">
                                            <input className="w-4 h-4 mr-2" type="checkbox" id="" name="" checked={All3} onChange={changeHandler3} value="" />
                                            <div className=" inline-block">
                                                <div className=" flex space-x-6 justify-center items-center">
                                                    <label className=" mr-2 text-sm leading-3 font-normal text-gray-600" htmlFor="All">
                                                        All
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" flex justify-center items-center">
                                            <input className="w-4 h-4 mr-2" type="checkbox" id="Free" name="Free" value="Free" checked={Free} onChange={changeHandler3} />
                                            <div className=" inline-block">
                                                <div className=" flex space-x-6 justify-center items-center">
                                                    <label className=" mr-2 text-sm leading-3 font-normal text-gray-600" htmlFor="Free">
                                                        Free
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" flex justify-center items-center">
                                            <input className="w-4 h-4 mr-2" type="checkbox" id="Price: Low to High" name="Price: Low to High" checked={Low} onChange={changeHandler3} value="Price: Low to High" />
                                            <div className=" inline-block">
                                                <div className=" flex space-x-6 justify-center items-center">
                                                    <label className=" mr-2 text-sm leading-3 font-normal text-gray-600" htmlFor="Price: Low to High">
                                                        Price ↑
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" flex justify-center items-center">
                                            <input className="w-4 h-4 mr-2" type="checkbox" id="Price: High to Low" name="Price: High to Low" checked={High} onChange={changeHandler3} value="Price: High to Low" />
                                            <div className=" inline-block">
                                                <div className=" flex space-x-6 justify-center items-center">
                                                    <label className=" mr-2 text-sm leading-3 font-normal text-gray-600" htmlFor="Price: High to Low">
                                                        Price ↓
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="px-0 mt-10 w-full md:w-auto md:mt-0 md:absolute md:right-0 md:bottom-0 md:py-10 lg:px-20 md:px-6">
                                    <button onClick={() => { setShowfilters(!showFilters); apply(); }} className="w-full hover:bg-gray-700 focus:ring focus:ring-offset-2 focus:ring-gray-800 text-base leading-4 font-medium py-4 px-10 text-white bg-gray-800 rounded">

                                        Apply Filter
                                    </button>
                                </div>
                            </div>





                        </div>








                        <p className="hidden lg:block text-sm mt-2 md:mt-0 md:text-md leading-5 text-gray-900 font-medium">
                            {data[0]?.totalrows ? (
                                data[0].totalrows < 10 ? '0' + data[0].totalrows.toString() : data[0].totalrows.toString()
                            ) : null} Result<b className="text-sm">(s)</b></p>


                    </div>



                    <div id="filterSection" className={"relative md:py-5 lg:px-20 md:px-6 py-4 px-4 bg-gray-50 rounded w-full " + (showFilters ? "hidden md:block" : "hidden")}>
                        {/* Cross button Code  */}
                        <div onClick={() => setShowfilters(false)} className=" cursor-pointer absolute right-0 top-0 md:py-10 lg:px-20 md:px-6 py-9 px-4">
                            <svg className=" lg:w-6 lg:h-6 w-4 h-4" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M25 1L1 25" stroke="#1F2937" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M1 1L25 25" stroke="#27272A" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>







                        <hr className="bg-gray-200 lg:w-6/12 w-full" />


                        <div>
                            <div className=" flex space-x-2">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 5H14" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 7L14 5L12 3" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M5 3L3 5L5 7" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M19 10V21" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M17 19L19 21L21 19" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M21 12L19 10L17 12" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 10H5C3.89543 10 3 10.8954 3 12V19C3 20.1046 3.89543 21 5 21H12C13.1046 21 14 20.1046 14 19V12C14 10.8954 13.1046 10 12 10Z" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <p className="  lg:text-2xl text-xl lg:leading-6 leading-5 font-medium text-gray-800 ">Order by</p>
                            </div>
                            <div className=" md:flex md:space-x-6 mt-8 grid grid-cols-3 gap-y-8 flex-wrap">
                                <div className=" flex md:justify-center md:items-center items-center justify-start ">
                                    <input className="w-4 h-4 mr-2" type="checkbox" id="" name="" value="" checked={Relevance} onChange={changeHandler2} />
                                    <div className=" inline-block">
                                        <div className=" flex space-x-6 justify-center items-center">
                                            <label className=" mr-2 text-sm leading-3 font-normal text-gray-600" htmlFor="Relevance">
                                                Relevance
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className=" flex justify-center items-center ">
                                    <input className="w-4 h-4 mr-2" type="checkbox" id="Upload date: New to Old" name="Upload date: New to Old" value="Upload date: New to Old" checked={New} onChange={changeHandler2} />
                                    <div className=" inline-block">
                                        <div className=" flex space-x-6 justify-center items-center">
                                            <label className=" mr-2 text-sm leading-3 font-normal text-gray-600" htmlFor="Upload date: New to Old">
                                                New to Old
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className=" flex md:justify-center md:items-center items-center justify-end ">
                                    <input className="w-4 h-4 mr-2" type="checkbox" id="Upload date: Old to New" name="Upload date: Old to New" value="Upload date: Old to New" checked={Old} onChange={changeHandler2} />
                                    <div className=" inline-block">
                                        <div className=" flex space-x-6 justify-center items-center">
                                            <label className=" mr-2 text-sm leading-3 font-normal text-gray-600" htmlFor="Upload date: Old to New">
                                                Old to New
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr className=" bg-gray-200 lg:w-6/12 w-full md:my-10 my-8" />



                        {/* Collection Section */}

                        <div>
                            <div className=" flex space-x-2">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g opacity="0.8">
                                        <path d="M9 4H5C4.44772 4 4 4.44772 4 5V9C4 9.55228 4.44772 10 5 10H9C9.55228 10 10 9.55228 10 9V5C10 4.44772 9.55228 4 9 4Z" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M9 14H5C4.44772 14 4 14.4477 4 15V19C4 19.5523 4.44772 20 5 20H9C9.55228 20 10 19.5523 10 19V15C10 14.4477 9.55228 14 9 14Z" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M19 14H15C14.4477 14 14 14.4477 14 15V19C14 19.5523 14.4477 20 15 20H19C19.5523 20 20 19.5523 20 19V15C20 14.4477 19.5523 14 19 14Z" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M14 7H20" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M17 4V10" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </g>
                                </svg>
                                <p className=" lg:text-2xl text-xl lg:leading-6 leading-5 font-medium text-gray-800 ">Collection</p>
                            </div>
                            <div className=" flex mt-8 space-x-7">
                                <div className=" flex justify-center items-center">
                                    <input className="w-4 h-4 mr-2" type="checkbox" id="" name="" checked={All3} onChange={changeHandler3} value="" />
                                    <div className=" inline-block">
                                        <div className=" flex space-x-6 justify-center items-center">
                                            <label className=" mr-2 text-sm leading-3 font-normal text-gray-600" htmlFor="All">
                                                All
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className=" flex justify-center items-center">
                                    <input className="w-4 h-4 mr-2" type="checkbox" id="Free" name="Free" value="Free" checked={Free} onChange={changeHandler3} />
                                    <div className=" inline-block">
                                        <div className=" flex space-x-6 justify-center items-center">
                                            <label className=" mr-2 text-sm leading-3 font-normal text-gray-600" htmlFor="Free">
                                                Free
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className=" flex justify-center items-center">
                                    <input className="w-4 h-4 mr-2" type="checkbox" id="Price: Low to High" name="Price: Low to High" checked={Low} onChange={changeHandler3} value="Price: Low to High" />
                                    <div className=" inline-block">
                                        <div className=" flex space-x-6 justify-center items-center">
                                            <label className=" mr-2 text-sm leading-3 font-normal text-gray-600" htmlFor="Price: Low to High">
                                                Price ↑
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className=" flex justify-center items-center">
                                    <input className="w-4 h-4 mr-2" type="checkbox" id="Price: High to Low" name="Price: High to Low" checked={High} onChange={changeHandler3} value="Price: High to Low" />
                                    <div className=" inline-block">
                                        <div className=" flex space-x-6 justify-center items-center">
                                            <label className=" mr-2 text-sm leading-3 font-normal text-gray-600" htmlFor="Price: High to Low">
                                                Price ↓
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="px-0 mt-10 w-full md:w-auto md:mt-0 md:absolute md:right-0 md:bottom-0 md:py-10 lg:px-20 md:px-6">
                            <button onClick={() => { setShowfilters(!showFilters); apply(); }} className="w-full hover:bg-gray-700 focus:ring focus:ring-offset-2 focus:ring-gray-800 text-base leading-4 font-medium py-4 px-10 text-white bg-gray-800 rounded">

                                Apply Filter
                            </button>
                        </div>
                    </div>
                </div>


                <div class="md:flex md:items-center md:justify-between md:space-x-8 mb-16 md:mb-20 bg-white  bg-opacity-50 rounded-b-lg pb-6 px-5"
                    style={{ boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)' }}>


                    <div id="journal-scroll" className="text-sm scrollable-container flex items-center space-x-4 overflow-y-auto whitespace-nowrap">
                        <button
                            name="All"
                            onClick={changeHandler}
                            className={`duration-300 px-3 py-1.5 hover:bg-gray-100 rounded-lg capitalize ${selectedButton === "All" ? "text-gray-900 bg-gray-100" : "text-gray-600"
                                }`}
                        >
                            All
                        </button>
                        <button
                            title="Tailwind Grid"
                            name="Programming/Software Development"
                            onClick={changeHandler}
                            className={`duration-300 px-3 py-1.5 capitalize hover:bg-gray-100 rounded-lg ${selectedButton === "Programming/Software Development" ? "text-gray-900 bg-gray-100" : "text-gray-600"
                                }`}
                        >
                            Programming / Software Development
                        </button>
                        <button
                            title="Tailwind Menu"
                            name="Art/Creative Design"
                            onClick={changeHandler}
                            className={`duration-300 px-3 py-1.5 capitalize hover:bg-gray-100 rounded-lg ${selectedButton === "Art/Creative Design" ? "text-gray-900 bg-gray-100" : "text-gray-600"
                                }`}
                        >
                            Art / Creative Design
                        </button>
                        <button
                            title="Tailwind Tabs"
                            name="Business/Entrepreneurship"
                            onClick={changeHandler}
                            className={`duration-300 px-3 py-1.5 capitalize hover:bg-gray-100 rounded-lg ${selectedButton === "Business/Entrepreneurship" ? "text-gray-900 bg-gray-100" : "text-gray-600"
                                }`}
                        >
                            Business / Entrepreneurship
                        </button>
                        <button
                            title="Tailwind Images"
                            name="Engineering/Technology"
                            onClick={changeHandler}
                            className={`duration-300 px-3 py-1.5 rounded-lg capitalize hover:bg-gray-100 ${selectedButton === "Engineering/Technology" ? "text-gray-900 bg-gray-100" : "text-gray-600"
                                }`}
                        >
                            Engineering / Technology
                        </button>
                        <button
                            title="Tailwind Tables"
                            name="Science/Research"
                            onClick={changeHandler}
                            className={`duration-300 px-3 py-1.5 rounded-lg capitalize hover:bg-gray-100 ${selectedButton === "Science/Research" ? "text-gray-900 bg-gray-100" : "text-gray-600"
                                }`}
                        >
                            Science / Research
                        </button>
                        <button
                            title="Tailwind Modals"
                            name="Education"
                            onClick={changeHandler}
                            className={`duration-300 px-3 py-1.5 capitalize hover:bg-gray-100 rounded-lg ${selectedButton === "Education" ? "text-gray-900 bg-gray-100" : "text-gray-600"
                                }`}
                        >
                            Education
                        </button>
                        <button
                            title="Tailwind Badges"
                            name="Health/Medicine"
                            onClick={changeHandler}
                            className={`duration-300 px-3 py-1.5 capitalize hover:bg-gray-100 rounded-lg ${selectedButton === "Health/Medicine" ? "text-gray-900 bg-gray-100" : "text-gray-600"
                                }`}
                        >
                            Health / Medicine
                        </button>
                        <button
                            title="Tailwind Widget"
                            name="Social Sciences"
                            onClick={changeHandler}
                            className={`duration-300 px-3 py-1.5 capitalize hover:bg-gray-100 rounded-lg ${selectedButton === "Social Sciences" ? "text-gray-900 bg-gray-100" : "text-gray-600"
                                }`}
                        >
                            Social Sciences
                        </button>
                        <button
                            title="Tailwind Alerts"
                            name="Environment/Sustainability"
                            onClick={changeHandler}
                            className={`duration-300 px-3 py-1.5 capitalize hover:bg-gray-100 rounded-lg ${selectedButton === "Environment/Sustainability" ? "text-gray-900 bg-gray-100" : "text-gray-600"
                                }`}
                        >
                            Environment / Sustainability
                        </button>
                        <button
                            title="Tailwind Logins"
                            name="Gaming"
                            onClick={changeHandler}
                            className={`duration-300 px-3 py-1.5 capitalize hover:bg-gray-100 rounded-lg ${selectedButton === "Gaming" ? "text-gray-900 bg-gray-100" : "text-gray-600"
                                }`}
                        >
                            Gaming
                        </button>
                        <button
                            title="Tailwind Inputs"
                            name="Entertainment"
                            onClick={changeHandler}
                            className={`duration-300 px-3 py-1.5 capitalize hover:bg-gray-100 rounded-lg ${selectedButton === "Entertainment" ? "text-gray-900 bg-gray-100" : "text-gray-600"
                                }`}
                        >
                            Entertainment
                        </button>
                        <button
                            title="Tailwind Cursor"
                            name="Other"
                            onClick={changeHandler}
                            className={`duration-300 px-3 py-1.5 capitalize hover:bg-gray-100 rounded-lg ${selectedButton === "Other" ? "text-gray-900 bg-gray-100" : "text-gray-600"
                                }`}
                        >
                            Other
                        </button>
                    </div>

                    <nav className="mt-8 md:mt-0 hidden md:flex">
                        {/* other navbar content */}
                        <form onSubmit={handleSearchSubmit} className="flex items-center">
                            <SearchIcon className="h-4 w-4 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="ml-2 pl-3 pr-14 py-1 rounded-full border border-gray-300"
                            />
                        </form>
                    </nav>

                    {/* 
                    <div className="relative inline-block w-auto mb-16 mt-8">
                        <div>
                            <button
                                type="button"
                                className="flex items-center justify-center px-4 py-2 mt-4 space-x-3 text-gray-600 transition-colors duration-300 transform border rounded-lg md:mt-0 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-primary dark:focus:border-primary focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-20"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="w-4 h-4"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                                <span>All version</span>
                            </button>
                        </div>
                        <div className="absolute left-0 z-20 py-1 mt-2 bg-yellow-500 border border-gray-100 rounded-md shadow-xl xl:left-auto xl:right-0" style={{ display: "none" }}>
                            <div className="w-32">
                                <a href="https://tailwindcomponents.com/components/grid" className="block px-4 py-2 text-sm text-gray-700 capitalize transition-colors duration-300 transform hover:text-primary">
                                    All version
                                </a>
                                <a href="https://tailwindcomponents.com/components/grid?version=3" className="block px-4 py-2 text-sm text-gray-700 capitalize transition-colors duration-300 transform hover:text-primary">
                                    version 3
                                </a>
                                <a href="https://tailwindcomponents.com/components/grid?version=2" className="block px-4 py-2 text-sm text-gray-700 capitalize transition-colors duration-300 transform hover:text-primary">
                                    version 2
                                </a>
                                <a href="https://tailwindcomponents.com/components/grid?version=1" className="block px-4 py-2 text-sm text-gray-700 capitalize transition-colors duration-300 transform hover:text-primary">
                                    version 1
                                </a>
                                <a href="https://tailwindcomponents.com/components/grid?version=0" className="block px-4 py-2 text-sm text-gray-700 capitalize transition-colors duration-300 transform hover:text-primary">
                                    Beta version
                                </a>
                                <div id="extwaiokist" style={{ display: "none" }} v="dbhdf" q="36f0aeaa" c="53.89" i="64" u="12.90" s="06182305" sg="svr_undefined-ga_06182305-bai_06032321" d="1" w="false" e="" a="2" m="BMe=" vn="9zsmd">
                                    <div id="extwaigglbit" style={{ display: "none" }} v="dbhdf" q="36f0aeaa" c="53.89" i="64" u="12.90" s="06182305" sg="svr_undefined-ga_06182305-bai_06032321" d="1" w="false" e="" a="2" m="BMe="></div>
                                </div>
                            </div>
                        </div>
                    </div> */}


                </div>

                <style>
                    {`
  #journal-scroll {
    height: 75px;
    overflow-y: auto;
  }

  #journal-scroll::-webkit-scrollbar {
    height: 2px;
    width: 16px;
  }

  #journal-scroll::-webkit-scrollbar-thumb {
    background: black;
    border-radius: 41px;
  }

  #journal-scroll:hover::-webkit-scrollbar-thumb {
    background: ; /* Change the scrollbar color to red on hover */
  }

  #journal-scroll::-webkit-scrollbar-track {
    background: transparent;
  }
`}
                </style>


                {/* <div class="relative hide-with-banner"><a href="https://material-tailwind.com?ref=tailwindcomponents" target="_blank" class="flex flex-col w-full h-full py-5"><div class="z-10 flex-col items-start justify-center w-1/2 px-6 xl:px-8"><img src="/images/ap/react-html.png" class="w-20 mb-4"/> <p class="text-xs text-white">React Components Library</p> <p class="mb-5 font-sans text-2xl font-bold text-white">
                    Material Tailwind
                </p> <div class="mb-3"><span class="h-8 px-4 py-3 font-sans text-xs font-bold text-white bg-blue-500 rounded-lg shadow-md">Get Started</span></div></div> <img src={AiBackground} class="absolute bottom-0 left-0 object-cover w-full h-full overflow-hidden rounded-md"/>
                </a>
                <div className='absolute bottom-0 bg-gradient-to-r from-fuchsia-700/30 to-violet-700'></div>

                </div> */}




                <div className="flex flex-row justify-between">



                    <div className="lg:flex-col hidden lg:flex  bg-white p-4 rounded-lg relative"

                    >
                        <div class="mb-8">
                            <h2 class="text-lg font-semibold text-gray-800 md:text-2xl">
                                Search Precisely
                                <span class="text-gray-800"> AI Assistance</span>
                            </h2>
                            <p className="block antialiased font-sans mb-6 text-md font-light text-gray-900 lg:pr-12">
                                Looking to find what you need? Ask
                                <b className="text-gray-900 text-md font-poppins">
                                    <b className="text-red-600"> .</b>
                                    den</b>
                                , our AI-powered chatbot, for assistance!
                            </p>


                            <div class="gap-6 flex">
                                <a href="/chat.den.ai" title="customize" aria-label="customize" class="w-max relative flex gap-2 h-9 items-center px-4 before:absolute before:inset-0 before:rounded-full before:bg-gray-900 before:transition-transform before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95">
                                    {/* <svg class="relative w-4" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path class="fill-white" opacity="0.3" d="M6 14C6 13.45 5.55 13 5 13C4.45 13 4 13.45 4 14C4 14.74 3.81 15.4 3.5 15.95C3.67 15.98 3.83 16 4 16C5.1 16 6 15.1 6 14Z" fill="currentColor"></path>
                                        <path class="fill-white" d="M9.75 12L18.71.55 13 6 13.45 6 14C6 15.1 5.1 16 4 16C3.83 16 3.67 15.98 3.5 15.95C3.81 15.4 4 14.74 4 14Z" fill="currentColor"></path>
                                    </svg> */}
                                    <span class="w-max relative text-sm font-semibold text-white">
                                        AI ChatBot
                                    </span>
                                </a>
                                <button class="block-switcher group relative flex h-9 w-9 rounded-full before:absolute before:inset-0 before:rounded-full before:border before:transition-transform before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 before:border-gray-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="sun relative transistion m-auto h-5 w-5 duration-300 group-hover:rotate-180 fill-gray-300 group-hover:fill-yellow-400 hidden" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"></path>
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="moon relative transistion m-auto h-5 w-5 duration-300 group-hover:-rotate-90 fill-gray-300 group-hover:fill-white block" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>




                        <div class="relative hide-with-banner mt-auto pb-16"><a href="/console-home" target="_blank" class="flex flex-col w-full h-full py-12"><img src={background2} alt="" class="absolute bottom-0 left-0 object-cover w-full h-full overflow-hidden rounded-md"
                            style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.4)' }} />
                            <div class="z-10 flex-col items-start justify-center w-2/3 px-6 xl:px-8">
                                {/* <img src="/images/ap/tailwind-logo.png" alt="tailwind-logo" class="h-8"/> */}

                                <p class="mt-3 text-sm tracking-wide text-gray-100">Low Effort</p> <p class="mb-1 text-base font-bold tracking-wide text-white md:text-xl">Get your articles published <br />on DevDen Console</p> <button class="px-5 py-2 mt-2 text-xs font-bold text-white rounded-lg shadow-md bg-gradient-to-tl from-purple-700 to-pink-500 uppercase">
                                    Console
                                </button>


                            </div>
                            {/* <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-500 rounded-md"></div> */}

                        </a></div>

                    </div>





                    <div class="items-center justify-center bg-neutral-900 bg-opacity-70 font-poppins rounded-lg hidden md:flex"
                        style={{ backgroundImage: `url('https://png.pngtree.com/thumb_back/fh260/background/20210816/pngtree-torn-paper-yellow-and-black-abstract-image_764054.jpg')`, backgroundSize: 'auto 325%', boxShadow: '0 0 10px rgba(0, 0, 0, 0.4)' }}>

                        {/* <!-- Card --> */}
                        <card class=" text-white p-8 lg:w-[32rem] rounded-lg">

                            {/* <!-- Header --> */}
                            <header class="flex font-light text-sm">
                                {/* <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 rotate-90 -ml-2" viewBox="0 0 24 24" stroke="#b91c1c">
                                    <path stroke-linecap="round" stroke-linejoin="round" sctroke-width="2" d="M20 12H4" />
                                </svg>
                                <p>Human Rights</p> */}

                                <div class="flex space-x-4 text-gray-900 mb-4 text-lg bg-white py-2 px-4 rounded-full bg-opacity-20 w-fit justify-center items-center">

                                    <span class="rounded-full bg-sky-500 px-1 py-1 h-10 w-10 text-3xl text-white sm:flex justify-center items-center">✑</span>

                                    <svg aria-hidden="true" width="24" height="24" fill="none" class="flex-none text-gray-400">
                                        <path d="M10.75 8.75l3.5 3.25-3.5 3.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                    </svg>
                                    <span class="block w-max text-white font-bold border-b-2 border-cyan-400">Human Rights</span>
                                </div>
                            </header>

                            {/* <!-- Title --> */}
                            <h2 class="font-extrabold text-2xl mt-2">
                                Minorities and Extremism in Pakistan: A Critical and Historical Review
                            </h2>

                            {/* <!-- Tags --> */}
                            <p class="mt-5">
                                By:
                                <a href="/developers/profile/4/dr-hiba-imran" class="text-red-500"> Hiba Imran </a>,
                                <a href="/developers/profile/4/dr-hiba-imran" class="text-red-500"> Doctor of Physiotherapy </a>
                            </p>

                            <p>
                                Additional credits:
                                <a href="#" class="text-red-500"> DevDen Editorial Team </a>,
                                <a href="#" class="text-red-500"> Ali R. </a>
                            </p>

                            {/* <!-- Description --> */}
                            <h3 class="font-bold text-xl mt-8"> Intro </h3>
                            <p class="font-light"> Pakistan is replete with sectarianism, caste discrimination, religious oppression and apartheid and has roots in its foundational ideology. </p>

                            {/* <!-- Button --> */}
                            <button onClick={() => window.location.href = '/infodexeus/articles/10/minorities-and-extremism-in-pakistan-a-critical-and-historical-review'}
                                class="bg-red-500 text-white font-semibold py-2 px-5 text-sm mt-6 inline-flex items-center group rounded-lg">
                                <p> READ MORE </p>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1 group-hover:translate-x-2 delay-100 duration-200 ease-in-out" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>

                        </card>

                    </div>


                </div>












                {/* <HomeTeam /> */}


                {loading ? (
                    <div className="flex justify-center items-center h-screen">
                        {/* <div className="w-8 h-8 border-2 border-t-2 border-gray-300 rounded-full animate-spin"></div> */}
                        <>
                            <div className="bg-transparent">
                                <div className="px-4 py-12 bg-transparent">
                                    <div className="mx-auto flex justify-center">
                                        <div className="relative">
                                            <div className="w-[160px] h-[160px] border border-sky-500 rounded-full" />
                                            <div className="w-[140px] h-[140px] border border-sky-500 rounded-full absolute top-2.5 right-2.5" />
                                            <div>
                                                <svg
                                                    className="absolute top-[22px] right-[26px] animate-spin infinite"
                                                    width={113}
                                                    height={113}
                                                    viewBox="0 0 113 113"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M56.7631 110.374C46.061 110.374 35.5993 107.2 26.7008 101.255C17.8023 95.3088 10.8668 86.8579 6.77128 76.9704C2.67576 67.083 1.60419 56.2031 3.69207 45.7066C5.77994 35.2102 10.9335 25.5686 18.501 18.001C26.0686 10.4335 35.7102 5.27994 46.2066 3.19207C56.7031 1.10419 67.583 2.17576 77.4704 6.27128C87.3579 10.3668 95.8088 17.3023 101.755 26.2008C107.7 35.0993 110.874 45.561 110.874 56.2631"
                                                        stroke="#0ea5e9"
                                                        strokeWidth={2}
                                                        strokeLinecap="round"
                                                        strokeDasharray="16 16"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <p className="text-center text-gray-600 text-base mt-4">
                Your Request Is Being Loaded, Please Wait
              </p> */}
                                </div>
                            </div>
                        </>
                    </div>



                ) : (
                    <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2 xl:grid-cols-3 md:mt-24 mb-16">

                        {data.map((item, index) => (

                            <React.Fragment key={index}>
                                {index === 0 && (
                                    <div className="col-span-1 hidden lg:block">

                                        {/* Gig Card */}
                                        <div onClick={() => window.location.href = "/chat.den.ai"}
                                            className="flex relative items-center justify-center cursor-pointer">
                                            <div className="relative h-96  w-full rounded-lg">
                                                {/* Background Image */}
                                                <Image
                                                    src="https://th.bing.com/th/id/R.615c76ccfe6b71c9027216abc5e3e8d9?rik=M2WnKZEDRnqO1g&pid=ImgRaw&r=0"
                                                    width="100"
                                                    height="100"
                                                    className="object-cover w-full h-full rounded-lg"
                                                    alt="Background"
                                                />

                                                {/* Content */}
                                                <div className="absolute w-full h-full bottom-0 bg-gradient-to-r from-fuchsia-700/30 to-violet-700 rounded-lg flex flex-col items-center justify-center text-center">
                                                    {/* Company Logo */}
                                                    <Image src={dotden} className="w-1/2 md:w-1/4" alt="Company Logo" width="100"
                                                        height="100" />
                                                    <h3 className="text-lg font-bold font-poppins text-gray-100 hover:underline">AI ChatBot</h3>


                                                    {/* Quotes */}
                                                    <p className="text-lg px-14 text-gray-300 mt-2">
                                                        Looking to find what you need? Ask <b>.den</b>, our AI-powered chatbot, for assistance!
                                                    </p>

                                                    {/* Photo */}
                                                    <Image src={AliRubass} className="rounded-full w-16 h-16 border-2 mt-4" alt="Photo" width="100"
                                                        height="100" />

                                                    {/* Title */}
                                                    <p className="text-base font-bold px-14 text-gray-300 mt-3">
                                                        Chief Executive Officer (CEO)
                                                    </p>

                                                    <p className="text-sm font-light px-14 text-gray-300 mb-4">
                                                        Ali Rubass
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="absolute right-12 md:right-20 top-12 items-center flex">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center justify-center rounded-full h-8 w-8 transition duration-200 ease-in-out text-white bg-purple-500 hover:bg-purple-600 focus:outline-none hover:-translate-y-1"
                                                >
                                                    {/* <i className="mdi mdi-arrow-right text-xl leading-none"></i> */}
                                                    <FaArrowRight />
                                                </button>
                                            </div>

                                        </div>

                                    </div>
                                )}


                                <div class="relative group overflow-hidden p-8 rounded-xl bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-900">
                               
                                <div className="absolute z-10 top-1 right-1 mt-4 mr-2 bg-transparent border-gray-800 border-[1px] border-opacity-35 opacity-50 text-black rounded-full w-auto p-2 h-6 flex items-center justify-center">
                                                    <a className="text-xs font-bold text-black">{getTimeDifference(item.timestamp, item.time)}</a>
                                                </div>
                                   
                                    <div aria-hidden="true" class="inset-0 absolute aspect-video border rounded-full -translate-y-1/2 group-hover:-translate-y-1/4 duration-300 bg-gradient-to-b from-pink-500 to-white dark:from-white dark:to-white blur-2xl opacity-25 dark:opacity-5 dark:group-hover:opacity-10"></div>
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
                                            <p class="leading-5 text-gray-600 text-sm">  {item.title}</p>
                                        </div>

                                        <div className="flex items-center justify-between space-x-4 mb-4">

                                                    <button
                                                        onClick={() => {
                                                            const formattedName =
                                                                data[0].devname.toLowerCase() // Convert title to lowercase
                                                                    .replace(/[^a-zA-Z0-9\s]/g, ' ') // Remove special characters
                                                                    .trim()
                                                                    .replace(/\s+/g, '-'); // Replace spaces with dashes
                                                            window.location.href = '/developers/profile/' + data[0].devid + '/' + formattedName;
                                                        }}
                                                        className="flex-shrink-0 w-10 h-10 overflow-hidden rounded-full shadow-md">
                                                        <Image
                                                            src={`https://gigadevden.com${item.devimage}`}
                                                            alt={item.devname}
                                                            className="bg-white object-cover w-full h-full"
                                                            width="100"
                                                            height="100"
                                                        />
                                                    </button>


                                                    <div className="flex flex-col space-y-1">

                                                        <button
                                                            onClick={() => {
                                                                const formattedName =
                                                                    data[0].devname.toLowerCase() // Convert title to lowercase
                                                                        .replace(/[^a-zA-Z0-9\s]/g, ' ') // Remove special characters
                                                                        .trim()
                                                                        .replace(/\s+/g, '-'); // Replace spaces with dashes
                                                                window.location.href = '/developers/profile/' + data[0].devid + '/' + formattedName;
                                                            }}
                                                            className="text-sm text-gray-300 hover:underline">
                                                            {item.devname}
                                                        </button>

                                                    </div>
                                                </div>

                                        <div class="flex gap-3 -mb-8 py-4 border-t border-gray-200 dark:border-gray-800">
                                            <a href="#" download="/" class="group rounded-xl disabled:border *:select-none [&>*:not(.sr-only)]:relative *:disabled:opacity-20 disabled:text-gray-950 disabled:border-gray-200 disabled:bg-gray-100 dark:disabled:border-gray-800/50 disabled:dark:bg-gray-900 dark:*:disabled:!text-white text-gray-950 bg-gray-100 hover:bg-gray-200/75 active:bg-gray-100 dark:text-white dark:bg-gray-500/10 dark:hover:bg-gray-500/15 dark:active:bg-gray-500/10 flex gap-1.5 items-center text-sm h-8 px-3.5 justify-center">

                                                <button
                                                onClick={() => setCurrentProjectId(item.id, item.title)}
                                                className="flex items-center space-x-1 0 px-4 py-1 rounded-full">
                                                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                            <path
                                                fillRule="evenodd"
                                                d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg> */}
                                                open

                                            </button>
                                                <svg className="-rotate-90" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m17 13l-5 5m0 0l-5-5m5 5V6"></path></svg>
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







                                <div className="duration-300 hover:-translate-y-2 -translate-y-1 rounded-lg shadow-xl pb-4"
                                    style={{
                                        backgroundImage: `url(https://cafepiala.shop${item.image})`,
                                        backgroundSize: 'contain',
                                        backgroundPosition: 'top',
                                        backgroundSize: '70%',
                                        backgroundRepeat: 'no-repeat'

                                    }}>





                                    <div>



                                        <div class="relative mx-4 mt-4 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">


                                            <div className="relative">

                                                <Image
                                                    className='w-full h-60 object-cover'
                                                    src={`https://gigadevden.com${item.image}`}
                                                    alt="ui/ux review check"
                                                    width="100"
                                                    height="100"
                                                />




                                                <div className="absolute z-0 inset-0 bg-gradient-to-t from-black to-transparent opacity-100"></div>

                                                <div className="absolute z-10 top-1 right-1 mt-4 mr-2 bg-yellow-300 text-black rounded-full w-auto p-2 h-6 flex items-center justify-center">
                                                    <a className="text-xs font-bold text-black">{getTimeDifference(item.timestamp, item.time)}</a>
                                                </div>


                                            </div>

                                            <div className="flex items-center justify-between absolute bottom-3 left-4 ml-2">
                                                <div className="flex items-center justify-between space-x-4">

                                                    <button
                                                        onClick={() => {
                                                            const formattedName =
                                                                data[0].devname.toLowerCase() // Convert title to lowercase
                                                                    .replace(/[^a-zA-Z0-9\s]/g, ' ') // Remove special characters
                                                                    .trim()
                                                                    .replace(/\s+/g, '-'); // Replace spaces with dashes
                                                            window.location.href = '/developers/profile/' + data[0].devid + '/' + formattedName;
                                                        }}
                                                        className="flex-shrink-0 w-10 h-10 overflow-hidden rounded-full shadow-md">
                                                        <Image
                                                            src={`https://gigadevden.com${item.devimage}`}
                                                            alt={item.devname}
                                                            className="bg-white object-cover w-full h-full"
                                                            width="100"
                                                            height="100"
                                                        />
                                                    </button>


                                                    <div className="flex flex-col space-y-1">

                                                        <button
                                                            onClick={() => {
                                                                const formattedName =
                                                                    data[0].devname.toLowerCase() // Convert title to lowercase
                                                                        .replace(/[^a-zA-Z0-9\s]/g, ' ') // Remove special characters
                                                                        .trim()
                                                                        .replace(/\s+/g, '-'); // Replace spaces with dashes
                                                                window.location.href = '/developers/profile/' + data[0].devid + '/' + formattedName;
                                                            }}
                                                            className="text-sm text-gray-300 hover:underline">
                                                            {item.devname}
                                                        </button>

                                                    </div>
                                                </div>

                                            </div>

                                            <div class="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60"></div>
                                            {/* <button
class="!absolute top-4 right-4 h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-red-500 transition-all hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
type="button"
data-ripple-dark="true"
>
<span class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 transform">
<svg
xmlns="http://www.w3.org/2000/svg"
viewBox="0 0 24 24"
fill="currentColor"
aria-hidden="true"
class="h-6 w-6"
>
<path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"></path>
</svg>
</span>
</button> */}
                                        </div>







                                    </div>
                                    <div onClick={() => setCurrentProjectId(item.id, item.title)} className="px-6 pb-4 cursor-pointer bg-transparent rounded-b-lg"
                                        style={{
                                            // backdropFilter: 'blur(3px)', // Adjust the blur amount as needed
                                            backgroundColor: 'transparent', // Adjust the background color and opacity as needed
                                        }}>




                                        <div className="flex flex-row justify-between">
                                            <h3 className="text-gray-800 w-1/2 text-md font-bold tracking-widest pb-2 mb-6 pt-8 border-b border-red-500">

                                                {item.category ? (
                                                    item.category.toUpperCase()
                                                ) : (
                                                    <div className="flex flex-col mb-2">
                                                        <div className="animate-pulse bg-gray-300 h-5 w-32 rounded" />
                                                    </div>

                                                )}

                                            </h3>

                                            <div className="flex items-center space-x-1 text-gray-600">
                                                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z"
                                                    clipRule="evenodd"
                                                ></path>
                                            </svg> */}
                                                <FaRegEye />
                                                <span className="text-xs font-medium">{item.views}</span>
                                            </div>

                                        </div>


                                        <a

                                            className="font-semibold text-gray-700 transition-colors duration-300 text-4xl hover:text-primary hover:text-primary"
                                        >
                                            {item.topic}
                                        </a>

                                        <br></br>


                                        <div className="mt-2 mb-2">
                                            <small className="leading-5 text-gray-600 text-md">
                                                {/* {
                                            ((<Markup content={item.description.replace(/\\/g, '')} />).props.content).length > 242
                                                ? <Markup content={((<Markup content={item.description.replace(/\\/g, '')} />).props.content).substring(0, 242).split(' ').slice(0, -1).join(' ') + ' ...'} />
                                                : <Markup content={item.description.replace(/\\/g, '')} />
                                        } */}
                                                {item.title}
                                            </small>
                                        </div>




                                        <div className="flex items-center space-x-2 text-gray-900 absolute bottom-4 right-5">
                                            <button
                                                onClick={() => setCurrentProjectId(item.id, item.title)}
                                                className="flex items-center space-x-1 bg-yellow-500 px-4 py-1 rounded-full">
                                                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                            <path
                                                fillRule="evenodd"
                                                d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg> */}
                                                Read

                                            </button>
                                            {/* <div className="flex items-center space-x-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                                    clipRule="evenodd"
                                                ></path>
                                            </svg>
                                            <span className="text-sm font-medium">{item.downloads}</span>
                                        </div> */}
                                        </div>




                                    </div>


                                </div>














                            </React.Fragment>

                            // <div

                            //     className="my-8 rounded shadow-lg shadow-gray-200 dark:shadow-gray-900 bg-gray-900 duration-300 hover:-translate-y-1"
                            // >
                            //     <a href="#" className="cursor-pointer">
                            //         <figure>
                            //             <img
                            //                 src={`https://www.gigadevden.com${item.image}`}
                            //                 className="rounded-t h-48 w-full object-cover"
                            //                 alt="Post"
                            //             />
                            //             <figcaption className="p-4">
                            //                 <div>

                            //                     <div className="-mt-14 mb-16 mr-2 text-white rounded-full w-auto p-2 h-6 flex">
                            //                         <div className="rounded-full bg-white shadow w-16 h-16 flex items-center justify-center relative ml-4 shadow-8">
                            //                             {/* Add your avatar image or icon here */}
                            //                             <img
                            //                                 className="rounded-full object-cover object-center"
                            //                                 src={`https://www.gigadevden.com${item.image}`}
                            //                                 alt="public-profile-icon"
                            //                                 style={{ width: '100%', height: '100%' }}
                            //                             />
                            //                         </div>
                            //                     </div>

                            //                     <p className="text-lg mb-4 font-bold leading-relaxed text-gray-300">
                            //                         {item.title}

                            //                     </p>
                            //                     <small className="leading-5 text-gray-400">
                            //                         {
                            //                             ((<Markup content={item.description.replace(/\\/g, '')} />).props.content).length > 242
                            //                                 ? <Markup content={((<Markup content={item.description.replace(/\\/g, '')} />).props.content).substring(0, 242).split(' ').slice(0, -1).join(' ') + ' ...'} />
                            //                                 : <Markup content={item.description.replace(/\\/g, '')} />
                            //                         }
                            //                     </small>


                            //                 </div>


                            //             </figcaption>
                            //         </figure>
                            //     </a>



                            // </div>

                            //   <div key={item.id} className="border p-4 rounded-lg shadow relative mt-12 mb-12">
                            //     <div className="flex flex-col pt-8">
                            //       {/* Flex container */}
                            //       <div className="h-20p relative -mt-28">
                            //         {/* Divider one - 15% height */}
                            //         <div className="w-24 h-24 mx-auto">
                            //           <div className="w-full h-full rounded-full overflow-hidden shadow-lg">
                            //             <img
                            //               src={`https://www.gigadevden.com${item.image}`}
                            //               alt="Sample Image"
                            //               className="object-cover h-full w-full bg-white"
                            //             />
                            //           </div>
                            //         </div>
                            //       </div>

                            //       <div className="h-80p">
                            //         {/* Divider two - 85% height */}

                            //         <div onClick={() => setCurrentProjectId(item.id, item.title)}>
                            //           <div className="flex items-center text-xs text-gray-500 mt-8">
                            //             <div className="flex items-center mr-4">
                            //               <FaCloudDownloadAlt />
                            //               <p className="ml-2">{item.downloads} downloads</p>
                            //             </div>

                            //             <div className="flex items-center">
                            //               <FaRegEye />
                            //               <p className="ml-2">{item.views} views</p>
                            //             </div>
                            //           </div>

                            //           <button className="text-left">
                            //             <h2 className="text-l font-bold mb-2 hover:text-blue-500 hover:underline mt-4">{item.title}</h2>
                            //             <p className="mb-4 text-sm">

                            //               {
                            //                 ((<Markup content={item.description.replace(/\\/g, '')} />).props.content).length > 242
                            //                   ? <Markup content={((<Markup content={item.description.replace(/\\/g, '')} />).props.content).substring(0, 242).split(' ').slice(0, -1).join(' ') + ' ...'} />
                            //                   : <Markup content={item.description.replace(/\\/g, '')} />
                            //               }



                            //               {/* {item.description.replace(/\\r\\n|\\(?=("|\'))/g, '').replace(/\r\n/g, ' ').length > 242 ? item.description.replace(/\\r\\n|\\(?=("|\'))/g, '').replace(/\r\n/g, ' ').substring(0, 242).split(' ').slice(0, -1).join(' ') + ' ...' : item.description.replace(/\\r\\n|\\(?=("|\'))/g, '').replace(/\r\n/g, ' ')} */}
                            //             </p>
                            //           </button>

                            //           <div className="absolute top-1 right-1 mt-2 mr-2 bg-blue-500 text-white rounded-full w-auto p-2 h-6 flex items-center justify-center">
                            //             <p className="text-xs font-bold text-white">{getTimeDifference(item.timestamp, item.time)}</p>
                            //           </div>

                            //           {/* <div className="absolute top-1 left-3 mt-2 mr-2 bg-green-500 bg-opacity-50 text-white rounded-full w-auto p-2 h-6 flex items-center justify-center">
                            //             <p className="text-xs font-bold text-white">4.00 $</p>
                            //             <FaChessKing/>
                            //           </div> */}

                            //         </div>
                            //       </div>
                            //     </div>
                            //   </div>




                        ))}

                    </div>
                )}
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />

            <Footer />
        </div>
    );
};

export default EmployeeData;