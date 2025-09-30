'use client'
import Image from 'next/image';
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Table } from '@/app/shared/tables/Tables';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Modal } from "@/app/shared/Modal";
import Dropdown from "@/app/shared/InputDropDown";

interface CustomDateInputProps {
  value?: string;
  onClick?: () => void;
}

interface CertificationDataItem {
  "Property Name": string;
  Address: string;
  "Certificate Expiry Date": string;
  Status: string;
  [key: string]: unknown;
}

interface ApplicationDataItem {
  "Application ID": string;
  "Property Name": string;
  "Submission Date": string;
  Status: string;
  [key: string]: unknown;
}

export default function Tracking() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterType, setFilterType] = useState<"certification" | "application">("certification");
  const [searchTerm, setSearchTerm] = useState("");
  const [certificationFilters, setCertificationFilters] = useState({
    listedProperty: "",
    status: "",
    expiryDate: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [selectedRowsModal, setSelectedRowsModal] = useState<CertificationDataItem[]>([]);
  const [singleRowToDelete, setSingleRowToDelete] = useState<{ row: CertificationDataItem, index: number } | null>(null);
  const [modalType, setModalType] = useState<'single' | 'multiple'>('multiple');

  // Dropdown states
  const [showPropertyDropdown, setShowPropertyDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showApplicationDropdown, setShowApplicationDropdown] = useState(false);
  
  // Refs for dropdown containers
  const propertyDropdownRef = useRef<HTMLDivElement>(null);
  const statusDropdownRef = useRef<HTMLDivElement>(null);
  const applicationDropdownRef = useRef<HTMLDivElement>(null);

  const [applicationFilters, setApplicationFilters] = useState({
    application: "",
    submissionDate: "",
  });

  const [expiryDate, setExpiryDate] = useState<Date | null>(null);
  const [submissionDate, setSubmissionDate] = useState<Date | null>(null);

  const [certificationData, setCertificationData] = useState<CertificationDataItem[]>([
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
  ]);

  const [applicationData] = useState<ApplicationDataItem[]>([
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
  ]);

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

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        propertyDropdownRef.current &&
        !propertyDropdownRef.current.contains(event.target as Node)
      ) {
        setShowPropertyDropdown(false);
      }
      if (
        statusDropdownRef.current &&
        !statusDropdownRef.current.contains(event.target as Node)
      ) {
        setShowStatusDropdown(false);
      }
      if (
        applicationDropdownRef.current &&
        !applicationDropdownRef.current.contains(event.target as Node)
      ) {
        setShowApplicationDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDeleteCertifications = (selectedRows: CertificationDataItem[]) => {
    const updatedData = certificationData.filter(item => !selectedRows.includes(item));
    setCertificationData(updatedData);
    setIsModalOpen(false);
    setSelectedRowsModal([]);
    setSelectedRows(new Set());
  };

  const handleDeleteSingleCertification = (row: CertificationDataItem, index: number) => {
    const updatedData = certificationData.filter((_, idx) => idx !== index);
    setCertificationData(updatedData);
    setIsModalOpen(false);
    setSingleRowToDelete(null);
    const newSelected = new Set(selectedRows);
    newSelected.delete(index);
    setSelectedRows(newSelected);
  };

  const openDeleteModal = (selectedRowsData: CertificationDataItem[]) => {
    setSelectedRowsModal(selectedRowsData);
    setModalType('multiple');
    setIsModalOpen(true);
  };

  const openDeleteSingleModal = (row: CertificationDataItem, index: number) => {
    setSingleRowToDelete({ row, index });
    setModalType('single');
    setIsModalOpen(true);
  };

  const handleModalConfirm = () => {
    if (modalType === 'multiple' && selectedRowsModal.length > 0) {
      handleDeleteCertifications(selectedRowsModal);
    } else if (modalType === 'single' && singleRowToDelete) {
      handleDeleteSingleCertification(singleRowToDelete.row, singleRowToDelete.index);
    }
  };

  const handleDeleteSelected = () => {
    if (selectedRows.size > 0) {
      const selectedData = Array.from(selectedRows).map(index => certificationData[index]);
      openDeleteModal(selectedData);
    }
  };

  const filteredCertificationData = useMemo(() => {
    let filtered = certificationData;

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item["Property Name"].toLowerCase().includes(searchTerm.toLowerCase()) ||
          item["Address"].toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

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
        item["Certificate Expiry Date"].includes(certificationFilters.expiryDate)
      );
    }

    return filtered;
  }, [searchTerm, certificationFilters, certificationData]);

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

  const uniqueProperties = [...new Set(certificationData.map((item) => item["Property Name"]))];
  const uniqueStatuses = [...new Set(certificationData.map((item) => item["Status"]))];
  const uniqueApplications = [...new Set(applicationData.map((item) => item["Application ID"]))];

  const openApplicationFilter = () => {
    setFilterType("application");
    setIsFilterOpen(true);
  };

  const handleApplyFilter = () => {
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

  const CustomDateInput = React.forwardRef(({ value, onClick }: CustomDateInputProps, ref: React.Ref<HTMLInputElement>) => (
    <div className="relative">
      <input
        type="text"
        value={value}
        onClick={onClick}
        ref={ref}
        readOnly
        className="w-full bg-gradient-to-b from-[#202020] to-[#101010] border rounded-xl px-4 py-3 text-sm border-[#404040] focus:border-[#EFFC76] focus:outline-none cursor-pointer text-white placeholder-white/40"
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
      {/* Confirmation Modal */}
      {isModalOpen &&
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedRows(new Set());
            setSingleRowToDelete(null);
          }}
          onConfirm={handleModalConfirm}
          title="Confirm Ticket Deletion"
          description="Deleting this ticket means it will no longer appear in your requests."
          image="/images/delete-modal.png"
          confirmText="Delete"
        />
      }

      <div className='py-[20px] flex flex-col w-full gap-3 xl:flex-row items-center '>
        {/* Left Panel - Application Tracker */}
        <div className="rounded-md w-full bg-[#121315] p-5 ">
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
                  className='w-10 h-[36px] z-[43] -ml-4 text-center flex items-center justify-center text-white text-[12px] leading-[16px] font-bold rounded-full'
                  style={{ backgroundColor: item.minibg }}
                >
                  {item.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel - Certification Table */}
        <div className="flex-1 w-full xl:w-[70%] max-w-none ">
          <div className="bg-[#121315] h-full z-[10000000] rounded-lg overflow-hidden">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center pt-5 px-5">
              <h2 className="text-white text-[16px] font-semibold leading-[20px]">Certification</h2>
              <div className="flex flex-row items-start sm:items-center pt-3 sm:pt-0 gap-3">
                <div className="relative w-full sm:w-[204px]">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-white/12 border rounded-lg text-white/40 placeholder-white/60 w-full px-3 py-2 text-sm pl-8 border-none outline-none"
                  />
                  <div className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-500">
                    <Image
                      src="/images/search.png"
                      alt="search"
                      width={16}
                      height={16}
                    />
                  </div>
                </div>

                <button
                  onClick={() => setIsFilterOpen(true)}
                  className="h-[34px] cursor-pointer w-[86px] rounded-md bg-[#2e2f31] py-2 px-3 flex items-center gap-1"
                >
                  <span className="text-sm leading-[18px] font-medium text-white opacity-60">
                    Filter
                  </span>
                  <Image
                    src="/images/filter1.png"
                    alt="filter"
                    height={9}
                    width={13}
                  />
                </button>
                <button
                  onClick={handleDeleteSelected}
                  disabled={selectedRows.size === 0}
                  className="flex cursor-pointer items-center disabled:hidden gap-[6px] p-2 rounded-[8px] 
                    border border-[rgba(239,252,118,0.32)] text-[#EFFC76] text-[12px] font-normal leading-[16px]
                     disabled:bg-[transparent] disabled:cursor-not-allowed disabled:border-gray-600 disabled:text-gray-600"
                >
                  <Image src="/images/delete-row.svg" alt='Delete selected' width={12} height={12} />
                  Delete All
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="p-0 max-w-none h-full ">
              <Table
                data={filteredCertificationData}
                control={tableControl}
                showDeleteButton={true}
                onDelete={openDeleteModal}
                onDeleteSingle={openDeleteSingleModal}
                showModal={true}
                modalTitle="Property Details"
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
                dropdownItems={[
                  {
                    label: "Delete Certificate",
                    onClick: (row, index) => openDeleteSingleModal(row, index),
                  },
                ]}
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
      <div className={`fixed top-0 right-0 h-full bg-[#0A0C0B] z-[2000000000] transform transition-transform duration-300 ease-in-out ${isFilterOpen ? 'translate-x-0' : 'translate-x-full'
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
                  <div ref={propertyDropdownRef}>
                    <label className="text-white leading-[18px] text-sm font-medium mb-3 block">
                      Listed property
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowPropertyDropdown(prev => !prev)}
                        className={`
                          w-full px-4 py-3 pr-10 rounded-xl border border-[#404040]
                          bg-gradient-to-b from-[#202020] to-[#101010]
                          text-[14px] font-medium text-left
                          ${certificationFilters.listedProperty === "" ? "text-white/40" : "text-white"}
                          cursor-pointer transition duration-200 ease-in-out
                          hover:border-[#EFFC76]
                        `}
                      >
                        {certificationFilters.listedProperty || "Select property"}
                        <Image
                          src="/images/dropdown.svg"
                          alt="dropdown"
                          width={15}
                          height={8}
                          className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                        />
                      </button>

                      {showPropertyDropdown && (
                        <div className="absolute z-10 mt-1 w-full">
                          <Dropdown
                            items={uniqueProperties.map(property => ({
                              label: property,
                              onClick: () => {
                                setCertificationFilters(prev => ({ ...prev, listedProperty: property }));
                                setShowPropertyDropdown(false);
                              }
                            }))}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Status */}
                  <div ref={statusDropdownRef}>
                    <label className="text-white leading-[18px] text-sm font-medium mb-3 block">
                      Status
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowStatusDropdown(prev => !prev)}
                        className={`
                          w-full px-4 py-3 pr-10 rounded-xl border border-[#404040]
                          bg-gradient-to-b from-[#202020] to-[#101010]
                          text-[14px] font-medium text-left
                          ${certificationFilters.status === "" ? "text-white/40" : "text-white"}
                          cursor-pointer transition duration-200 ease-in-out
                          hover:border-[#EFFC76]
                        `}
                      >
                        {certificationFilters.status || "Select status"}
                        <Image
                          src="/images/dropdown.svg"
                          alt="dropdown"
                          width={15}
                          height={8}
                          className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                        />
                      </button>

                      {showStatusDropdown && (
                        <div className="absolute z-10 mt-1 w-full">
                          <Dropdown
                            items={uniqueStatuses.map(status => ({
                              label: status,
                              onClick: () => {
                                setCertificationFilters(prev => ({ ...prev, status: status }));
                                setShowStatusDropdown(false);
                              }
                            }))}
                          />
                        </div>
                      )}
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
                      className='text-white'
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
                  <div ref={applicationDropdownRef}>
                    <label className="text-white text-sm font-medium mb-3 block">
                      Application
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowApplicationDropdown(prev => !prev)}
                        className={`
                          w-full px-4 py-3 pr-10 rounded-xl border border-[#404040]
                          bg-gradient-to-b from-[#202020] to-[#101010]
                          text-[14px] font-medium text-left
                          ${applicationFilters.application === "" ? "text-white/40" : "text-white"}
                          cursor-pointer transition duration-200 ease-in-out
                          hover:border-[#EFFC76]
                        `}
                      >
                        {applicationFilters.application || "Select application"}
                        <Image
                          src="/images/dropdown.svg"
                          alt="dropdown"
                          width={15}
                          height={8}
                          className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                        />
                      </button>

                      {showApplicationDropdown && (
                        <div className="absolute z-10 mt-1 w-full">
                          <Dropdown
                            items={uniqueApplications.map(app => ({
                              label: app,
                              onClick: () => {
                                setApplicationFilters(prev => ({ ...prev, application: app }));
                                setShowApplicationDropdown(false);
                              }
                            }))}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Submission Date */}
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