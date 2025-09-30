"use client";
import React, { useMemo, useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Table } from "@/app/shared/tables/Tables";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Modal } from "@/app/shared/Modal";
import Dropdown from "@/app/shared/InputDropDown";

interface CustomDateInputProps {
  value?: string;
  onClick?: () => void;
  onChange?: () => void;
}

interface CertificationData {
  id: number;
  
  "Property Name": string;
  Address: string;
  Ownership: string;
  "Submitted Date": string;
  Status: string;
}

export default function Applications() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Modal and delete states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [singleRowToDelete, setSingleRowToDelete] = useState<{ row: Record<string, string>, id: number } | null>(null);
  const [modalType, setModalType] = useState<'single' | 'multiple'>('multiple');

  // Dropdown states
  const [showOwnershipDropdown, setShowOwnershipDropdown] = useState(false);
  const [showPropertyDropdown, setShowPropertyDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  // Refs for dropdown containers
  const ownershipDropdownRef = useRef<HTMLDivElement>(null);
  const propertyDropdownRef = useRef<HTMLDivElement>(null);
  const statusDropdownRef = useRef<HTMLDivElement>(null);

  const [certificationFilters, setCertificationFilters] = useState({
    ownership: "",
    property: "",
    status: "",
    submittedDate: "",
  });

  // State for date picker
  const [submittedDate, setSubmittedDate] = useState<Date | null>(null);

  const [allCertificationData, setAllCertificationData] = useState<CertificationData[]>([
    {
      id: 1,
      "Property Name": "Coastal Hillside Estate",
      Address: "762 Evergreen Terrace",
      Ownership: "Owner",
      "Submitted Date": "Aug 12, 2025",
      Status: "Approved",
    },
    {
      id: 2,
      "Property Name": "Coastal Hillside Estate",
      Address: "762 Evergreen Terrace",
      Ownership: "Manager",
      "Submitted Date": "Aug 12, 2025",
      Status: "Pending",
    },
    {
      id: 3,
      "Property Name": "Coastal Hillside Estate",
      Address: "762 Evergreen Terrace",
      Ownership: "Owner",
      "Submitted Date": "Aug 12, 2025",
      Status: "Approved",
    },
    {
      id: 4,
      "Property Name": "Coastal Hillside Estate",
      Address: "762 Evergreen Terrace",
      Ownership: "Manager",
      "Submitted Date": "Aug 12, 2025",
      Status: "Pending",
    },
    {
      id: 5,
      "Property Name": "Coastal Hillside Estate",
      Address: "762 Evergreen Terrace",
      Ownership: "Agent",
      "Submitted Date": "Aug 12, 2025",
      Status: "Rejected",
    },
    {
      id: 6,
      "Property Name": "Coastal Hillside Estate",
      Address: "762 Evergreen Terrace",
      Ownership: "Agent",
      "Submitted Date": "Aug 12, 2025",
      Status: "Approved",
    },
    {
      id: 7,
      "Property Name": "Mountain View Complex",
      Address: "123 Highland Road",
      Ownership: "Owner",
      "Submitted Date": "Sep 15, 2025",
      Status: "Pending",
    },
    {
      id: 8,
      "Property Name": "Skyline Residences",
      Address: "456 Tower Street",
      Ownership: "Manager",
      "Submitted Date": "Oct 1, 2025",
      Status: "Approved",
    },
    {
      id: 9,
      "Property Name": "Coastal Hillside Estate",
      Address: "762 Evergreen Terrace",
      Ownership: "Owner",
      "Submitted Date": "Aug 12, 2025",
      Status: "Approved",
    },
    {
      id: 10,
      "Property Name": "Coastal Hillside Estate",
      Address: "762 Evergreen Terrace",
      Ownership: "Manager",
      "Submitted Date": "Aug 12, 2025",
      Status: "Pending",
    },
    {
      id: 11,
      "Property Name": "Coastal Hillside Estate",
      Address: "762 Evergreen Terrace",
      Ownership: "Agent",
      "Submitted Date": "Aug 12, 2025",
      Status: "Rejected",
    },
    {
      id: 12,
      "Property Name": "Coastal Hillside Estate",
      Address: "762 Evergreen Terrace",
      Ownership: "Agent",
      "Submitted Date": "Aug 12, 2025",
      Status: "Approved",
    },
    {
      id: 13,
      "Property Name": "Mountain View Complex",
      Address: "123 Highland Road",
      Ownership: "Owner",
      "Submitted Date": "Sep 15, 2025",
      Status: "Pending",
    },
    {
      id: 14,
      "Property Name": "Skyline Residences",
      Address: "456 Tower Street",
      Ownership: "Manager",
      "Submitted Date": "Oct 1, 2025",
      Status: "Approved",
    },
    {
      id: 15,
      "Property Name": "Coastal Hillside Estate",
      Address: "762 Evergreen Terrace",
      Ownership: "Owner",
      "Submitted Date": "Aug 12, 2025",
      Status: "Approved",
    },
    {
      id: 16,
      "Property Name": "Coastal Hillside Estate",
      Address: "762 Evergreen Terrace",
      Ownership: "Manager",
      "Submitted Date": "Aug 12, 2025",
      Status: "Pending",
    },
    {
      id: 17,
      "Property Name": "Coastal Hillside Estate",
      Address: "762 Evergreen Terrace",
      Ownership: "Agent",
      "Submitted Date": "Aug 12, 2025",
      Status: "Rejected",
    },
    {
      id: 18,
      "Property Name": "Coastal Hillside Estate",
      Address: "762 Evergreen Terrace",
      Ownership: "Agent",
      "Submitted Date": "Aug 12, 2025",
      Status: "Approved",
    },
    {
      id: 19,
      "Property Name": "Mountain View Complex",
      Address: "123 Highland Road",
      Ownership: "Owner",
      "Submitted Date": "Sep 15, 2025",
      Status: "Pending",
    },
    {
      id: 20,
      "Property Name": "Skyline Residences",
      Address: "456 Tower Street",
      Ownership: "Manager",
      "Submitted Date": "Oct 1, 2025",
      Status: "Approved",
    },
    {
      id: 21,
      "Property Name": "Coastal Hillside Estate",
      Address: "762 Evergreen Terrace",
      Ownership: "Owner",
      "Submitted Date": "Aug 12, 2025",
      Status: "Approved",
    },
    {
      id: 22,
      "Property Name": "Coastal Hillside Estate",
      Address: "762 Evergreen Terrace",
      Ownership: "Owner",
      "Submitted Date": "Aug 12, 2025",
      Status: "Approved",
    },
    {
      id: 23,
      "Property Name": "Coastal Hillside Estate",
      Address: "762 Evergreen Terrace",
      Ownership: "Owner",
      "Submitted Date": "Aug 12, 2025",
      Status: "Approved",
    },
    {
      id: 24,
      "Property Name": "Coastal Hillside Estate",
      Address: "762 Evergreen Terrace",
      Ownership: "Owner",
      "Submitted Date": "Aug 12, 2025",
      Status: "Approved",
    },
    {
      id: 25,
      "Property Name": "Coastal Hillside Estate",
      Address: "762 Evergreen Terrace",
      Ownership: "Owner",
      "Submitted Date": "Aug 12, 2025",
      Status: "Approved",
    },
  ]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ownershipDropdownRef.current &&
        !ownershipDropdownRef.current.contains(event.target as Node)
      ) {
        setShowOwnershipDropdown(false);
      }
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
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredCertificationData = useMemo(() => {
    let filtered = allCertificationData;

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item["Property Name"]
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          item["Address"].toLowerCase().includes(searchTerm.toLowerCase()) ||
          item["Ownership"].toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (certificationFilters.property) {
      filtered = filtered.filter(
        (item) => item["Property Name"] === certificationFilters.property
      );
    }

    if (certificationFilters.status) {
      filtered = filtered.filter(
        (item) => item["Status"] === certificationFilters.status
      );
    }

    if (certificationFilters.ownership) {
      filtered = filtered.filter(
        (item) => item["Ownership"] === certificationFilters.ownership
      );
    }

    if (certificationFilters.submittedDate) {
      filtered = filtered.filter((item) =>
        item["Submitted Date"].includes(certificationFilters.submittedDate)
      );
    }

    return filtered;
  }, [searchTerm, certificationFilters, allCertificationData]);

  // Get IDs of currently displayed items on the current page
  // const getDisplayedIds = useMemo(() => {
  //   const startIndex = (currentPage - 1) * itemsPerPage;
  //   return filteredCertificationData
  //     .slice(startIndex, startIndex + itemsPerPage)
  //     .map(item => item.id);
  // }, [filteredCertificationData, currentPage, itemsPerPage]);

  // Handle select all for current page
 // Handle select all for ALL filtered data (not just current page)
const handleSelectAll = (checked: boolean) => {
  const newSelected = new Set(selectedRows);
  
  if (checked) {
    // Add ALL filtered data IDs
    filteredCertificationData.forEach(item => newSelected.add(item.id));
  } else {
    // Remove ALL filtered data IDs
    filteredCertificationData.forEach(item => newSelected.delete(item.id));
  }
  
  setSelectedRows(newSelected);
};

  // Change this function in your Applications.tsx:
const handleSelectRow = (id: string, checked: boolean) => {
  const newSelected = new Set(selectedRows);
  const numericId = parseInt(id); // Convert string back to number
  
  if (checked) {
    newSelected.add(numericId);
  } else {
    newSelected.delete(numericId);
  }
  setSelectedRows(newSelected);
};

  // Fix selection state calculations
 // Fix selection state calculations for ALL filtered data
const isAllDisplayedSelected = useMemo(() => {
  return filteredCertificationData.length > 0 && 
         filteredCertificationData.every(item => selectedRows.has(item.id));
}, [filteredCertificationData, selectedRows]);

const isSomeDisplayedSelected = useMemo(() => {
  return filteredCertificationData.some(item => selectedRows.has(item.id)) && 
         !isAllDisplayedSelected;
}, [filteredCertificationData, selectedRows, isAllDisplayedSelected]);
  // Delete handlers
  const handleDeleteApplications = (selectedRowIds: Set<number>) => {
    const idsToDelete = Array.from(selectedRowIds);
    
    const updatedData = allCertificationData.filter(item => !idsToDelete.includes(item.id));
    setAllCertificationData(updatedData);
    setIsModalOpen(false);
    setSelectedRows(new Set());
  };

  const handleDeleteSingleApplication = (row: Record<string, string>, id: number) => {
  const updatedData = allCertificationData.filter(item => item.id !== id);
  setAllCertificationData(updatedData);
  setIsModalOpen(false);
  setSingleRowToDelete(null);
  
  // Only remove the deleted row from selection, keep others selected
  const newSelected = new Set(selectedRows);
  newSelected.delete(id);
  setSelectedRows(newSelected);
  
  // Reset to first page if current page has no data after deletion
  const remainingDataCount = updatedData.length;
  const maxPageAfterDeletion = Math.ceil(remainingDataCount / itemsPerPage);
  
  if (currentPage > maxPageAfterDeletion) {
    setCurrentPage(Math.max(1, maxPageAfterDeletion));
  }
};

  const openDeleteSingleModal = (row: Record<string, string>, id: number) => {
    setSingleRowToDelete({ row, id });
    setModalType('single');
    setIsModalOpen(true);
  };

  const handleDeleteSelected = () => {
    if (selectedRows.size > 0) {
      setModalType('multiple');
      setIsModalOpen(true);
    }
  };

  const handleModalConfirm = () => {
    if (modalType === 'multiple' && selectedRows.size > 0) {
      handleDeleteApplications(selectedRows);
    } else if (modalType === 'single' && singleRowToDelete) {
      handleDeleteSingleApplication(singleRowToDelete.row, singleRowToDelete.id);
    }
  };

  // Table control
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

  // Unique dropdown values
  const uniqueProperties = [
    ...new Set(allCertificationData.map((item) => item["Property Name"])),
  ];
  const uniqueStatuses = [
    ...new Set(allCertificationData.map((item) => item["Status"])),
  ];
  const uniqueOwnerships = [
    ...new Set(allCertificationData.map((item) => item["Ownership"])),
  ];

  // Transform data to exclude ID from display but keep it for navigation
 const displayData = useMemo(() => {
  return filteredCertificationData.map(({ id, ...rest }) => {
    // eslint-disable-line @typescript-eslint/no-unused-vars
    console.log(id); // "Uses" id but doesn't affect anything
    return rest;
  });
}, [filteredCertificationData]);
  
  // Pagination logic
  const totalPages = Math.ceil(displayData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = displayData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, certificationFilters]);

  const handleResetFilter = () => {
    setCertificationFilters({
      ownership: "",
      property: "",
      status: "",
      submittedDate: "",
    });
    setSearchTerm("");
    setSubmittedDate(null);
  };

  const handleApplyFilter = () => {
    if (submittedDate) {
      setCertificationFilters(prev => ({
        ...prev,
        submittedDate: submittedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      }));
    }

    setIsFilterOpen(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Dropdown items for table actions
  const dropdownItems = [
    {
      label: "View Details",
      onClick: (row: Record<string, string>, index: number) => {
        const globalIndex = startIndex + index;
        const originalRow = filteredCertificationData[globalIndex];
        window.location.href = `/dashboard/application/detail/${originalRow.id}`;
      }
    },
    {
      label: "Delete Application",
      onClick: (row: Record<string, string>, index: number) => {
        const globalIndex = startIndex + index;
        const originalRow = filteredCertificationData[globalIndex];
        openDeleteSingleModal(row, originalRow.id);
      },
    },
  ];

  // Custom input component for date picker
  const CustomDateInput = React.forwardRef<HTMLInputElement, CustomDateInputProps>(
    ({ value, onClick }, ref) => (
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
    )
  );

  CustomDateInput.displayName = 'CustomDateInput';

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;

    buttons.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-8 h-8 flex items-center p-[13px] justify-center text-gray-400 hover:text-white transition-colors border border-gray-600 rounded cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Image src="/images/arrow-left.svg" height={14} width={14} alt="Back" className="" />
      </button>
    );

    let startPage, endPage;

    if (totalPages <= maxVisiblePages) {
      startPage = 1;
      endPage = totalPages;
    } else if (currentPage <= maxVisiblePages) {
      startPage = 1;
      endPage = maxVisiblePages;
    } else {
      startPage = currentPage - Math.floor(maxVisiblePages / 2);
      endPage = currentPage + Math.floor(maxVisiblePages / 2);
      
      if (startPage < 1) {
        startPage = 1;
        endPage = maxVisiblePages;
      }
      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = totalPages - maxVisiblePages + 1;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`w-8 h-8 flex items-center justify-center rounded text-sm leading-[18px] p-[13px] transition-colors border cursor-pointer ${currentPage === i
            ? "bg-[#EFFC76] text-black font-medium border-[#EFFC76]"
            : "text-white opacity-60 border-gray-600"
            }`}
        >
          {i}
        </button>
      );
    }

    buttons.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors border border-gray-600 rounded cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 p-[13px]"
      >
        <Image src="/images/arrow-right.svg" height={14} width={14} alt="Back" className="" />
      </button>
    );

    return buttons;
  };

  return (
    <>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedRows(new Set());
            setSingleRowToDelete(null);
          }}
          onConfirm={handleModalConfirm}
          title="Confirm Application Deletion"
          description="Deleting this application means it will no longer appear in your requests."
          image="/images/delete-modal.png"
          confirmText="Delete"
        />
      )}

      <div className="flex flex-col justify-between"> 
        <div className="bg-[#121315] custom-height rounded-lg relative z-[10] overflow-hidden">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between lg:items-center pt-5 px-5">
            <h2 className="text-white text-[16px] font-semibold leading-[20px]">
              Applications
            </h2>
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
                disabled={selectedRows.size < allCertificationData.length || allCertificationData.length===0}
                className="flex cursor-pointer items-center  gap-[6px] p-2 rounded-[8px] 
                border border-[rgba(239,252,118,0.32)] text-[#EFFC76] text-[12px] font-normal leading-[16px]
                 disabled:bg-[transparent] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Image src="/images/delete-row.svg" alt='Delete selected' width={12} height={12} />
                Delete All
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="p-0 cursor-pointer">
           <Table
  data={paginatedData}
  control={tableControl}
  showDeleteButton={true}
  onDeleteSingle={(row, index) => {
    const globalIndex = startIndex + index;
    const originalRow = filteredCertificationData[globalIndex];
    openDeleteSingleModal(row, originalRow.id);
  }}
  showModal={true}
  clickable={true}
  modalTitle="Property Details"
  selectedRows={selectedRows}
  setSelectedRows={setSelectedRows}
  onSelectAll={handleSelectAll}
  onSelectRow={handleSelectRow}
  isAllSelected={isAllDisplayedSelected}
  isSomeSelected={isSomeDisplayedSelected}
  // Pass ALL IDs from filtered data, not just current page
  rowIds={filteredCertificationData.map(item => item.id.toString())} // Convert to string
  dropdownItems={dropdownItems}
/>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-[20px]">
          <div className="flex items-center gap-2">
            {renderPaginationButtons()}
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
      <div
        className={`fixed top-0 right-0 h-full bg-[#0A0C0B] z-[2000000000] transform transition-transform duration-300 ease-in-out ${
          isFilterOpen ? "translate-x-0" : "translate-x-full"
        } w-[250px] sm:w-1/2 lg:w-2/5 xl:w-1/3`}
      >
        <div
          className="h-full justify-between flex flex-col bg-[#0A0C0B] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div>
            <div className="flex justify-between items-center px-6 pt-6 pb-3">
              <h3 className="text-white text-[20px] leading-[24px] font-medium">
                Apply Filter
              </h3>
              <button
                onClick={handleResetFilter}
                className="text-[#EFFC76] cursor-pointer text-[18px] leading-[22px] font-medium underline"
              >
                Reset
              </button>
            </div>

            <div className="px-6">
              <p className="text-white text-[16px] opacity-60 mb-10">
                Refine listings to find the right property faster.
              </p>

              <div className="space-y-5">
                {/* Ownership Dropdown */}
                <div ref={ownershipDropdownRef}>
                  <label className="text-white leading-[18px] text-sm font-medium mb-3 block">
                    Ownership
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowOwnershipDropdown(prev => !prev)}
                      className={`
                        w-full px-4 py-3 pr-10 rounded-xl border border-[#404040]
                        bg-gradient-to-b from-[#202020] to-[#101010]
                        text-[14px] font-medium text-left
                        ${certificationFilters.ownership === "" ? "text-white/40" : "text-white"}
                        cursor-pointer transition duration-200 ease-in-out
                        hover:border-[#EFFC76]
                      `}
                    >
                      {certificationFilters.ownership || "Select ownership"}
                      <Image
                        src="/images/dropdown.svg"
                        alt="dropdown"
                        width={15}
                        height={8}
                        className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                      />
                    </button>

                    {showOwnershipDropdown && (
                      <div className="absolute z-10 mt-1 w-full">
                        <Dropdown
                          items={uniqueOwnerships.map(ownership => ({
                            label: ownership,
                            onClick: () => {
                              setCertificationFilters(prev => ({ ...prev, ownership: ownership }));
                              setShowOwnershipDropdown(false);
                            }
                          }))}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Property Dropdown */}
                <div ref={propertyDropdownRef}>
                  <label className="text-white leading-[18px] text-sm font-medium mb-3 block">
                    Property
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowPropertyDropdown(prev => !prev)}
                      className={`
                        w-full px-4 py-3 pr-10 rounded-xl border border-[#404040]
                        bg-gradient-to-b from-[#202020] to-[#101010]
                        text-[14px] font-medium text-left
                        ${certificationFilters.property === "" ? "text-white/40" : "text-white"}
                        cursor-pointer transition duration-200 ease-in-out
                        hover:border-[#EFFC76]
                      `}
                    >
                      {certificationFilters.property || "Select property"}
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
                              setCertificationFilters(prev => ({ ...prev, property: property }));
                              setShowPropertyDropdown(false);
                            }
                          }))}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Status Dropdown */}
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

                {/* Submitted Date */}
                <div>
                  <label className="text-white text-sm font-medium mb-3 block">
                    Submitted date
                  </label>
                  <DatePicker
                    selected={submittedDate}
                    onChange={(date: Date | null) => setSubmittedDate(date)}
                    customInput={<CustomDateInput />}
                    dateFormat="MMM d, yyyy"
                    placeholderText="Select date"
                    showMonthDropdown
                    showYearDropdown
                    className="text-white"
                    dropdownMode="select"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Apply Button */}
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