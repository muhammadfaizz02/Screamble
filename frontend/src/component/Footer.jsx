import React from 'react';
import Whatsapp from "../assets/whatsapp.png"
import Shopee from "../assets/shopee.png"
import Email from "../assets/email.png"
import Map from "../assets/map.png"
import Instagram from "../assets/instagram-logo.png"

function Footer() {
    return (
        <section className="p-4 sm:p-4 md:p-6 lg:p-10 2xl:p-10 bg-white h-fit">
            <div className="flex justify-center text-md sm:text-md md:text-lg lg:text-lg">
                <div className="mr-4 lg:mr-20 2xl:mr-20">
                    <h3 className='text-sm md:text-md lg:text-md font-bold'>CONTACT US</h3>
                    <a className="flex cursor-pointer mb-2 mt-2" href="#">
                        <img className="w-6 h-6 mr-2" src={Whatsapp} alt="" />
                        <p className='text-sm md:text-md lg:text-md font-bold '>085861021076</p>
                    </a>
                    <a className="flex cursor-pointer mb-2" href="#">
                        <img className="w-6 h-6 mr-2" src={Email} alt="" />
                        <p className='text-sm md:text-md lg:text-md font-bold '>screamble@gmail.com</p>
                    </a>
                    <a className="flex cursor-pointer mb-2" href="#">
                        <img className="w-6 h-6 mr-2" src={Map} alt="" />
                        <p className='text-sm md:text-md lg:text-md font-bold '>screamble</p>
                    </a>
                </div>
                <div className="mr-4 lg:mr-20 2xl:mr-20">
                    <h3 className='text-sm md:text-md lg:text-md font-bold'>AVAILABLE ON</h3>
                    <a className="flex cursor-pointer mb-2 mt-2" href="#">
                        <img className="w-6 h-6 mr-2" src={Shopee} alt="" />
                        <p className='text-sm md:text-md lg:text-md font-bold '>Shopee</p>
                    </a>
                </div>
                <div>
                    <h3 className='text-sm md:text-md lg:text-md font-bold'>FOLLOW US</h3>
                    <a className="flex cursor-pointer mb-2 mt-2" href="#">
                        <img className="w-6 h-6 mr-2" src={Instagram} alt="" />
                        <p className='text-sm md:text-md lg:text-md font-bold '>Instagram</p>
                    </a>
                </div>
            </div>
        </section>
    );
}

export default Footer;
