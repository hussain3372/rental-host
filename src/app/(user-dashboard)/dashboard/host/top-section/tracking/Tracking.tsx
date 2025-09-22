'use client'
import Image from 'next/image';
import React, { useState, useMemo } from 'react';
import { Table } from '@/app/shared/tables/Tables';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface CustomDateInputProps {
  value?: string;
  onClick?: () => void;
}

export default function Tracking() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterType, setFilterType] = useState<"certification" | "application">(
    "certification"
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [certificationFilters, setCertificationFilters] = useState({
    listedProperty: "",
    status: "",
    expiryDate: "",
  });
  const [applicationFilters, setApplicationFilters] = useState({
    application: "",
    submissionDate: "",
  });

  // State for date pickers
  const [expiryDate, setExpiryDate] = useState<Date | null>(null);
  const [submissionDate, setSubmissionDate] = useState<Date | null>(null);

  const trackingdata = [
    {
      id: 1,
      title: "Skyline Residences",
      percentage: "76",
      bg: "#aae6ff",
      minibg: "#2185AF",
    },
    {
      id: 2,
      title: "Coastal Hillside City",
      percentage: "56",
      bg: "#f5ff94",
      minibg: "#BCCC29",
    },
    {
      id: 3,
      title: "Skyline Residences",
      percentage: "64",
      bg: "#CCFFA4",
      minibg: "#6BBE2B",
    },
    {
      id: 4,
      title: "Skyline Residences",
      percentage: "88",
      bg: "#EFC8FF",
      minibg: "#A745CE",
    },
  ];

  const allCertificationData = [
    {
      "Property Name": "Coastal Hillside Estate",
      Address: "762 Evergreen Terrace",
      "Certificate Expiry Date": "Aug 12, 2025",
      Status: "Verified",
    },
    {
      "Property Name": "Coastal Hillside Estate",
      Address: "762 Evergreen Terrace",
      "Certificate Expiry Date": "Aug 12, 2025",
      Status: "Near Expiry",
    },
    {
      "Property Name": "Coastal Hillside Estate",
      Address: "762 Evergreen Terrace",
      "Certificate Expiry Date": "Aug 12, 2025",
      Status: "Verified",
    },
    {
      "Property Name": "Coastal Hillside Estate",
      Address: "762 Evergreen Terrace",
      "Certificate Expiry Date": "Aug 12, 2025",
      Status: "Verified",
    },
    {
      "Property Name": "Coastal Hillside Estate",
      Address: "762 Evergreen Terrace",
      "Certificate Expiry Date": "Aug 12, 2025",
      Status: "Expired",
    },
  ];

  const allApplicationData = [
    {
      "Application ID": "APP-001",
      "Property Name": "Coastal Hillside Estate",
      "Submission Date": "Aug 01, 2024",
      Status: "In Progress",
    },
    {
      "Application ID": "APP-002",
      "Property Name": "Skyline Residences",
      "Submission Date": "Jul 15, 2024",
      Status: "Approved",
    },
    {
      "Application ID": "APP-003",
      "Property Name": "Urban Heights",
      "Submission Date": "Jun 20, 2024",
      Status: "Rejected",
    },
    {
      "Application ID": "APP-004",
      "Property Name": "Mountain View Complex",
      "Submission Date": "Sep 05, 2024",
      Status: "Pending Review",
    },
    {
      "Application ID": "APP-005",
      "Property Name": "Coastal Hillside Estate",
      "Submission Date": "Aug 25, 2024",
      Status: "In Progress",
    },
  ];

  // Filter and search logic for certifications
  const filteredCertificationData = useMemo(() => {
    let filtered = allCertificationData;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item["Property Name"]
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          item["Address"].toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply certification filters
    if (certificationFilters.listedProperty) {
      filtered = filtered.filter(
        (item) => item["Property Name"] === certificationFilters.listedProperty
      );
    }

    if (certificationFilters.status) {
      filtered = filtered.filter(
        (item) => item["Status"] === certificationFilters.status
      );
    }

    if (certificationFilters.expiryDate) {
      filtered = filtered.filter((item) =>
        item["Certificate Expiry Date"].includes(
          certificationFilters.expiryDate
        )
      );
    }

    return filtered;
  }, [searchTerm, certificationFilters, allCertificationData]);

  const tableControl = {
    hover: true,
    striped: false,
    bordered: false,
    shadow: false,
    compact: false,
    headerBgColor: "#252628",
    headerTextColor: "white",
    rowBgColor: "black",
    rowTextColor: "#e5e7eb",
    hoverBgColor: "black",
    hoverTextColor: "#ffffff",
    fontSize: 13,
    textAlign: "left" as const,
    rowBorder: false,
    headerBorder: true,
    borderColor: "#374151",
    highlightRowOnHover: true,
  };

  // Get unique values for dropdowns
  const uniqueProperties = [
    ...new Set(allCertificationData.map((item) => item["Property Name"])),
  ];
  const uniqueStatuses = [
    ...new Set(allCertificationData.map((item) => item["Status"])),
  ];
  const uniqueApplications = [
    ...new Set(allApplicationData.map((item) => item["Application ID"])),
  ];

  const openCertificationFilter = () => {
    setFilterType("certification");
    setIsFilterOpen(true);
  };

  const openApplicationFilter = () => {
    setFilterType("application");
    setIsFilterOpen(true);
  };

  const handleApplyFilter = () => {
    // Convert selected dates to string format for filtering
    if (filterType === "certification" && expiryDate) {
      setCertificationFilters(prev => ({
        ...prev,
        expiryDate: expiryDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      }));
    }
    
    if (filterType === "application" && submissionDate) {
      setApplicationFilters(prev => ({
        ...prev,
        submissionDate: submissionDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      }));
    }
    
    setIsFilterOpen(false);
  };

  const handleResetFilter = () => {
    setCertificationFilters({
      listedProperty: "",
      status: "",
      expiryDate: "",
    });
    setApplicationFilters({
      application: "",
      submissionDate: "",
    });
    setSearchTerm("");
    setExpiryDate(null);
    setSubmissionDate(null);
  };

  // Custom input component for date picker to match the design
  const CustomDateInput = React.forwardRef(({ value, onClick }: CustomDateInputProps, ref: React.Ref<HTMLInputElement>) => (
  <div className="relative">
    <input
      type="text"
      value={value}
      onClick={onClick}
      ref={ref}
      readOnly
      className="w-full bg-gradient-to-b from-[#202020] to-[#101010] border rounded-xl px-4 py-3 text-sm border-[#404040] focus:border-[#EFFC76] focus:outline-none cursor-pointer text-white/40 placeholder-white/40"
      placeholder="Select date"
    />
    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
      <Image src="/images/calender.svg" alt='Pick date' width={20} height={20} />
    </div>
  </div>
));
  CustomDateInput.displayName = 'CustomDateInput';

  return (
    <>
      <div className='py-[20px] flex flex-col xl:flex-row items-center '>
        {/* Left Panel - Application Tracker */}
        <div className="rounded-md w-full z-[100] bg-[#121315] md:w-[354px] p-5 ">
          <div className='flex justify-between items-center'>
            <p className='font-semibold text-[16px] leading-[20px] text-white'>Application Tracker</p>
            <Image 
              src="/images/filter.png" 
              alt='filter' 
              height={34} 
              width={34} 
              className='cursor-pointer'
              onClick={openApplicationFilter}
            />
          </div>
          <div className='pt-[37px] flex flex-col gap-2'>
            {trackingdata.map((item) => (
              <div className="flex items-center relative" key={item.id}>
                <div 
                  className='h-[76.25px] pl-2 pb-3 text-[#121315CC] opacity-80 text-[14px] leading-[18px] font-semibold flex flex-col justify-end rounded-xl' 
                  style={{ 
                    backgroundColor: item.bg, 
                    width: `${item.percentage}%`
                  }}
                >
                  <span>{item.title}</span>
                </div>
                <span 
                  className='w-10 h-[36px] z-[999] -ml-4 text-center flex items-center justify-center text-white text-[12px] leading-[16px] font-bold rounded-full' 
                  style={{ backgroundColor: item.minibg }}
                >
                  {item.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel - Certification Table */}
        <div className="flex-1 z-[100] max-w-[320px] sm:max-w-none px-5">
          <div className="bg-[#121315] z-[10000000] rounded-lg overflow-hidden">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-center pt-5 px-7">
              <h2 className="text-white text-[16px] font-semibold leading-[20px]">Certification</h2>
              <div className="flex items-center pt-3 sm:pt-0 gap-3">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-[#2e2f31] outline-none rounded-xl text-gray-300 placeholder-[#abacad] w-[204px] px-3 py-[9px] text-sm pl-8"
                  />
                  <div className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-500">
                    <Image src="/images/search.png" alt='search' width={16} height={16}/>
                  </div>
                </div>
                <button 
                  onClick={openCertificationFilter}
                  className="h-[34px] cursor-pointer rounded-md bg-[#2e2f31] py-2 px-3 flex items-center gap-1"
                >
                  <span className="text-sm leading-[18px] font-medium text-white opacity-60">Filter</span>
                  <Image src="/images/filter1.png" alt='filter' height={9} width={13}/>
                </button>
              </div>
            </div>

            {/* Table using your global component */}
            <div className="p-0 max-w-[300px] md:max-w-none">
              <Table
                data={filteredCertificationData}
                control={tableControl}
                showModal={false}
                modalTitle="Property Details"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Full Page Overlay */}
      {isFilterOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-[100000]"
          onClick={() => setIsFilterOpen(false)}
        />
      )}

      {/* Right Slide Panel Filter */}
      <div className={`fixed top-0 right-0 h-full bg-[#0A0C0B] z-[2000000000] transform transition-transform duration-300 ease-in-out ${
        isFilterOpen ? 'translate-x-0' : 'translate-x-full'
      } w-[250px] sm:w-1/2 lg:w-2/5 xl:w-1/3`}>
        
        <div className="h-full justify-between flex flex-col bg-[#0A0C0B] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div>
            <div className="flex justify-between items-center px-6 pt-6 pb-3 ">
              <h3 className="text-white text-[20px] leading-[24px] font-medium ">Apply Filter</h3>
              <button 
                onClick={handleResetFilter}
                className="text-[#EFFC76] cursor-pointer text-[18px] leading-[22px] font-regular font-medium underline"
              >
                Reset
              </button>
            </div>

            <div className="px-6">
              <p className="text-white text-[16px] opacity-60 mb-10">
                Refine listings to find the right property faster.
              </p>

              {/* Certification Filters */}
              {filterType === 'certification' && (
                <div className="space-y-5">
                  {/* Listed Property */}
                  <div>
                    <label className="text-white leading-[18px] text-sm font-medium mb-3 block">
                      Listed property
                    </label>
                    <div className="relative">
                      <select 
                        value={certificationFilters.listedProperty}
                        onChange={(e) => setCertificationFilters(prev => ({...prev, listedProperty: e.target.value}))}
                        className="w-full text-white/40 bg-gradient-to-b from-[#202020] to-[#101010] border rounded-xl px-4 py-3 text-sm border-[#404040] focus:border-[#EFFC76] focus:outline-none appearance-none"
                      >
                        <option className='text-black' value="">Select property</option>
                        {uniqueProperties.map((property) => (
                          <option className='text-black' key={property} value={property}>
                            {property}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <div>
                    <label className="text-white leading-[18px] text-sm font-medium mb-3 block">
                      Status
                    </label>
                    <div className="relative">
                      <select 
                        value={certificationFilters.status}
                        onChange={(e) => setCertificationFilters(prev => ({...prev, status: e.target.value}))}
                        className="w-full bg-gradient-to-b text-white/40 from-[#202020] to-[#101010] border rounded-xl px-4 py-3 text-sm border-[#404040] focus:border-[#EFFC76] focus:outline-none appearance-none"
                      >
                        <option className='text-black' value="">Select status</option>
                        {uniqueStatuses.map((status) => (
                          <option className='text-black' key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Expiry Date */}
                  <div>
                    <label className="text-white text-sm font-medium mb-3 block">
                      Expiry date
                    </label>
                    <DatePicker
                      selected={expiryDate}
                      onChange={(date: Date | null) => setExpiryDate(date)}
                      customInput={<CustomDateInput />}
                      dateFormat="MMM d, yyyy"
                      placeholderText="Select date"
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                    />
                  </div>
                </div>
              )}

              {/* Application Filters */}
              {filterType === 'application' && (
                <div className="space-y-6">
                  {/* Application */}
                  <div>
                    <label className="text-white text-sm font-medium mb-3 block">
                      Application
                    </label>
                    <div className="relative">
                      <select 
                        value={applicationFilters.application}
                        onChange={(e) => setApplicationFilters(prev => ({...prev, application: e.target.value}))}
                        className="w-full bg-gradient-to-b text-white/40 from-[#202020] to-[#101010] border rounded-xl px-4 py-3 text-sm border-[#404040] focus:border-[#EFFC76] focus:outline-none appearance-none"
                      >
                        <option className='text-black' value="">Select application</option>
                        {uniqueApplications.map((application) => (
                          <option className='text-black' key={application} value={application}>
                            {application}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Submission Date - Now matches Expiry Date with month/year navigation */}
                  <div>
                    <label className="text-white text-sm font-medium mb-3 block">
                      Submission date
                    </label>
                    <DatePicker
                      selected={submissionDate}
                      onChange={(date: Date | null) => setSubmissionDate(date)}
                      customInput={<CustomDateInput />}
                      dateFormat="MMM d, yyyy"
                      placeholderText="Select date"
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Apply Button - Fixed at bottom */}
          <div className="p-6">
            <button 
              onClick={handleApplyFilter}
              className="w-full yellow-btn cursor-pointer text-black font-semibold py-4 rounded-md transition-colors text-sm shadow-[inset_0_4px_6px_rgba(0,0,0,0.3)]"
            >
              Apply Filter
            </button>
          </div>
        </div>
      </div>
    </>
  );
}