"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import StatusPill from "@/app/shared/StatusPills";
// import BlackButton from "@/app/shared/BlackButton";

type Property = {
    id: number;
    title: string;
    author: string;
    images: string[];
    status: string;
    expiry: string;
};

// Static properties data based on the screenshot
const staticProperties: Property[] = [
    {
        id: 1,
        title: "Skyline Residences",
        author: "742 Evergreen Terrace",
        images: ["/images/property1.png"],
        status: "Verified",
        expiry: "Aug 12, 2025"
    },
    {
        id: 2,
        title: "Skyline Residences",
        author: "742 Evergreen Terrace",
        images: ["/images/property2.png"],
        status: "Verified",
        expiry: "Aug 12, 2025"
    },
    {
        id: 3,
        title: "Skyline Residences",
        author: "742 Evergreen Terrace",
        images: ["/images/property3.png"],
        status: "Verified",
        expiry: "Aug 12, 2025"
    },
    {
        id: 4,
        title: "Skyline Residences",
        author: "742 Evergreen Terrace",
        images: ["/images/property4.png"],
        status: "Verified",
        expiry: "Aug 12, 2025"
    },
    {
        id: 5,
        title: "Skyline Residences",
        author: "742 Evergreen Terrace",
        images: ["/images/property5.png"],
        status: "Verified",
        expiry: "Aug 12, 2025"
    },
    {
        id: 6,
        title: "Skyline Residences",
        author: "742 Evergreen Terrace",
        images: ["/images/property6.png"],
        status: "Verified",
        expiry: "Aug 12, 2025"
    }
];

const getVariantFromStatus = (
    status: string
): "success" | "error" | "warning" | "info" | "default" => {
    switch (status) {
        case "Verified":
            return "success";
        case "Expired":
            return "error";
        case "Near Expiry":
            return "warning";
        default:
            return "default";
    }
};

const Certificates: React.FC = () => {
    return (
        <div className=" text-white pb-5">
            {/* Header Section */}
            <div className="flex flex-col gap-3 sm:gap-0 sm:flex-row items-start justify-between mb-2">
                <div>
                    <h1 className="text-[20px] leading-[24px] font-semibold text-white mb-2">
                        Earned Certificates
                    </h1>
                    <p className="text-[16px] leading-[20px] text-[#FFFFFF99] font-regular max-w-[573px]">
                        Access the certificates you&apos;ve achieved. Download official copies or share them as proof of your accomplishments.
                    </p>
                </div>
                <button className="bg-[#EFFC76] text-black px-[20px] py-[12px] rounded-[8px] font-semibold text-[16px] leading-[20px] hover:bg-[#E5F266] transition-colors duration-300">
                    Apply Now
                </button>
            </div>

            {/* Properties Grid */}
            <div className="grid gap-x-4 gap-y-[16px] sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-[40px]">
                {staticProperties.map((property) => (
                    <Link href={`/dashboard/certificates/detail/${property.id}`} key={property.id}>
                        <div className="flex bg-[#121315] rounded-lg group flex-col cursor-pointer">
                            <div className=" shadow-md overflow-hidden ">
                                <div className="relative  w-full">
                                    <Image
                                        src={property.images[0]}
                                        alt={property.title}
                                        width={373}
                                        height={300}
                                        className="object-cover w-full"
                                    />
                                </div>
                            </div>
                            <div className="flex pb-4 px-4 flex-col ">
                                <div className="flex items-center justify-between mt-5">
                                    <h3 className="text-[18px] leading-[22px] text-white font-medium">{property.title}</h3>
                                    <StatusPill
                                        status={property.status}
                                        variant={getVariantFromStatus(property.status)}
                                    />
                                </div>
                                <p className="text-[14px] leading-[18px] text-white/60 mt-2 font-regular">
                                    {property.author}
                                </p>
                                <div className="flex items-center justify-between mt-[33px]">
                                    <p className="text-[14px] leading-[18px] text-white/80 font-normal">
                                        Expiry: {property.expiry}
                                    </p>
                                    <div className="relative w-[32px] h-[32px] ">
                                        <Image
                                            src="/images/white-arrow-right.svg"
                                            alt="arrow"
                                            width={32}
                                            height={32}
                                            className="cursor-pointer absolute top-0 left-0 transition-opacity duration-300 group-hover:opacity-0"
                                        />
                                        <Image
                                            src="/images/yellow-arrow-right.svg"
                                            alt="arrow-yellow"
                                            width={32}
                                            height={32}
                                            className="cursor-pointer absolute top-0 left-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Certificates;