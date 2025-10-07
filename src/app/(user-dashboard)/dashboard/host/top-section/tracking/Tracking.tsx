'use client'
import Image from 'next/image';
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Table } from '@/app/shared/tables/Tables';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Modal } from "@/app/shared/Modal";
import Dropdown from "@/app/shared/InputDropDown";
import FilterDrawer from "@/app/shared/tables/Filter"

interface CustomDateInputProps {
  value?: string;
  onClick?: () => void;
}

interface CertificationDataItem {
  id: number;
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Modal and delete states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [singleRowToDelete, setSingleRowToDelete] = useState<{ row: Record<string, string>, id: number } | null>(null);
  const [modalType, setModalType] = useState<'single' | 'multiple'>('multiple');

  const [certificationFilters, setCertificationFilters] = useState({
    listedProperty: "",
    status: "",
    expiryDate: "",
  });

  // Dropdown states for filter drawer
  const [showPropertyDropdown, setShowPropertyDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  const [applicationFilters, setApplicationFilters] = useState({
    application: "",
    submissionDate: "",
  });

  const [expiryDate, setExpiryDate] = useState<Date | null>(null);
  const [submissionDate, setSubmissionDate] = useState<Date | null>(null);

  const [certificationData, setCertificationData] = useState<CertificationDataItem[]>([
    {
      id: 1,
      "Property Name": "Coastal Hillside Estate",
      Address: "762 Evergreen Terrace",
      "Certificate Expiry Date": "Aug 12, 2025",
      Status: "Verified",
    },
    {
      id: 2,
      "Property Name": "Coastal Hillside Estate",
      Address: "762 Evergreen Terrace",
      "Certificate Expiry Date": "Aug 12, 2025",
      Status: "Near Expiry",
    },
    {
      id: 3,
      "Property Name": "Coastal Hillside Estate",
      Address: "762 Evergreen Terrace",
      "Certificate Expiry Date": "Aug 12, 2025",
      Status: "Verified",
    },
    {
      id: 4,
      "Property Name": "Coastal Hillside Estate",
      Address: "762 Evergreen Terrace",
      "Certificate Expiry Date": "Aug 12, 2025",
      Status: "Verified",
    },
    {
      id: 5,
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

  // Filtered data - using the same global pattern as Applications
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

  // Table control - same as before
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

  // Transform data for table display
  const displayData = useMemo(() => {
    return filteredCertificationData.map(({ id, ...rest }) => rest);
  }, [filteredCertificationData]);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, certificationFilters]);

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

  // Handle dropdown selection properly
  const handleFilterChange = (filters: Record<string, string | Date | null>) => {
    setCertificationFilters(prev => ({
      ...prev,
      ...filters
    }));
  };

  // Handle dropdown toggle
  const handleDropdownToggle = (key: string, value: boolean) => {
    if (key === "listedProperty") {
      setShowPropertyDropdown(value);
    } else if (key === "status") {
      setShowStatusDropdown(value);
    }
  };

  // Dropdown items for table actions
  const dropdownItems = [
    {
      label: "View Detail",
      onClick: () => { location.href = '/dashboard/application/detail/1' }
    },
  ];

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
      <div className='py-[20px] flex flex-col w-full gap-3 xl:flex-row items-center '>
        {/* Left Panel - Application Tracker */}
        <div className="rounded-md w-full lg:max-w-[50%] bg-[#121315] p-5 ">
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
        <div className="flex-1 w-full xl:w-[70%] max-w-none">
          <div className="bg-[#121315] min-w-[50vw] home-table z-[10000000] rounded-lg overflow-hidden">
            {/* Using Table component with global props like Applications */}
            <Table
              data={displayData}
              title="Certification"
              control={tableControl}
              showDeleteButton={false}
              showPagination={false}
              clickable={true}
              dropdownItems={dropdownItems}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              showFilter={true}
              onFilterToggle={setIsFilterOpen}
              selectedRows={new Set()}
              setSelectedRows={() => { }}
              onSelectAll={() => { }}
              onSelectRow={() => { }}
              isAllSelected={false}
              isSomeSelected={false}
              rowIds={[]}
            />
          </div>
        </div>
      </div>

      {/* Filter Drawer - Using the same component as Applications */}
      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        title="Apply Filter"
        description="Refine listings to find the right property faster."
        resetLabel="Reset"
        onReset={handleResetFilter}
        buttonLabel="Apply Filter"
        onApply={handleApplyFilter}
        filterValues={certificationFilters}
        onFilterChange={handleFilterChange}
        dropdownStates={{
          listedProperty: showPropertyDropdown,
          status: showStatusDropdown,
        }}
        onDropdownToggle={handleDropdownToggle}
        fields={[
          {
            label: "Listed property",
            key: "listedProperty",
            type: "dropdown",
            placeholder: "Select property",
            options: uniqueProperties,
          },
          {
            label: "Status",
            key: "status",
            type: "dropdown",
            placeholder: "Select status",
            options: uniqueStatuses,
          },
          {
            label: "Expiry date",
            key: "expiryDate",
            type: "date",
            placeholder: "Select date",
            value: expiryDate,
            onChange: setExpiryDate,
          },
        ]}
      />
    </>
  );
}