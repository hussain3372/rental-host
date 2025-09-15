"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import BlackButton from "../../shared/BlackButton";

const properties = [
    {
        id: 1,
        title: "Skyline Residences",
        author: "Sarah Mitchell",
        image: "/images/certificate-property1.png",
    },
    {
        id: 2,
        title: "Urban Heights",
        author: "David Miller",
        image: "/images/certificate-property2.png",
    },
    {
        id: 3,
        title: "Ocean Villas",
        author: "James Carter",
        image: "/images/certificate-property3.png",
    },
    {
        id: 4,
        title: "Mountain Escape",
        author: "Emily Davis",
        image: "/images/certificate-property4.png",
    },
];

const CertifiedProperties = () => {
    return (
        <section className="bg-[#121315] max-w-[1440px] mx-auto text-white px-6 md:px-[90px] lg:px-[120px] py-20">
            {/* Header Section */}
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <BlackButton
                        text="Certified Properties"
                        iconSrc="/images/how-it-works.png"
                        iconWidth={32}
                        iconHeight={32}
                        className="w-[259px]"
                    />
                </div>
                <div className="flex justify-between items-start flex-col md:flex-row gap-6">
                    <div>
                        <h2 className="text-[20px] md:text-[30px] lg:text-[40px] font-medium leading-snug w-full">
                            Explore Our Collection of Officially Certified and Verified
                            Properties
                        </h2>
                        <p className="text-[#FFFFFF99] font-medium text-[18px] leading-[22px] max-[425px]:text-[14px] w-full max-w-[673px]">
                            Browse through a trusted selection of properties that meet the
                            highest standards of quality, authenticity, and reliability.
                        </p>
                    </div>
                    <Link
                        href="#"
                        className="text-[#EFFC76] font-normal underline whitespace-nowrap text-[20px] leading-[24px]"
                    >
                        Explore More
                    </Link>
                </div>
            </div>

            {/* Properties Section */}
            <div className="mt-16 space-y-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-[80px] items-start">
                    {/* Large Left (lg:8) */}
                    <div className="lg:col-span-7 group">
                                                                        <div className="overflow-hidden ">

                        <Image
                            src={properties[0].image}
                            alt={properties[0].title}
                            width={700}
                            height={700}
                            className="w-full object-cover transform transition-transform duration-400 ease-out group-hover:scale-[1.2]  
"
                        />
                        </div>
                        <CardFooter title={properties[0].title} author={properties[0].author} />
                    </div>

                    {/* Small Right (lg:4) */}
                    <div className="lg:col-span-5 group">
                                                                        <div className="overflow-hidden ">

                        <Image
                            src={properties[1].image}
                            alt={properties[1].title}
                            width={420}
                            height={420}
                            className="w-full object-cover transform transition-transform duration-400 ease-out  group-hover:scale-[1.2]  
"
                        />
                        </div>
                        <CardFooter title={properties[1].title} author={properties[1].author} />
                    </div>
                </div>

                {/* Row 2: Left lg:4, Right lg:8 */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-[80px] items-start mt-16">
                    {/* Small Left (lg:4) */}
                    <div className="lg:col-span-5 group">
                                                <div className="overflow-hidden ">

                        <Image
                            src={properties[2].image}
                            alt={properties[2].title}
                            width={420}
                            height={420}
                            className="w-full object-cover transform transition-transform duration-400 ease-out  group-hover:scale-[1.2]  
"
                        />
                        </div>
                        <CardFooter title={properties[2].title} author={properties[2].author} />
                    </div>

                    {/* Large Right (lg:8) */}
                    <div className="lg:col-span-7 group">
                        <div className="overflow-hidden ">
                            <Image
                                src={properties[1].image}
                                alt={properties[1].title}
                                width={420}
                                height={420}
                                className="w-full object-cover transform transition-transform duration-400 ease-out  group-hover:scale-[1.2]  
"
                            />
                        </div>
                        <CardFooter title={properties[3].title} author={properties[3].author} />
                    </div>
                </div>

            </div>
        </section>
    );
};

export default CertifiedProperties;

/* Footer under each image */
const CardFooter = ({ title, author }: { title: string; author: string }) => {
    return (
        <div className="flex justify-between items-center mt-4">
            <div>
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm text-gray-300">{author}</p>
            </div>

            {/* Arrow with smooth animation */}
            <div className="relative w-6 h-6 overflow-hidden">
                {/* First icon (white) */}
                <Image
                    src="/images/stash_arrow-up-light1.png"
                    alt="Arrow"
                    width={32}
                    height={32}
                    className="absolute inset-0 transition-all duration-500 ease-in-out group-hover:translate-x-6 group-hover:opacity-0"
                />
                {/* Second icon (yellow) */}
                <Image
                    src="/images/stash_arrow-up-light2.png"
                    alt="Arrow Hover"
                    width={32}
                    height={32}
                    className="absolute inset-0 -translate-x-6 opacity-0 transition-all duration-500 ease-in-out group-hover:translate-x-6 group-hover:opacity-100"
                />
            </div>
        </div>
    );
};

