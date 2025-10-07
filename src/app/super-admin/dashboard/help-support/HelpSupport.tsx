"use client";
import React, { useMemo, useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Table } from "@/app/shared/tables/Tables";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Modal } from "@/app/shared/Modal";
import TicketDetailDrawer from "./TicketDetailDrawer";
import HelpSupportDrawer from "./HelpSupportDrawer";

interface CustomDateInputProps {
    value?: string;
    onClick?: () => void;
    onChange?: () => void;
}

interface CertificationData {
    id: number;
    "Ticket Id": string;
    "Issue Type": string;
    Subject: string;
    "Created On": string;
    Status: string;
}

export default function HelpSupport() {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // Modal and delete states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
    const [singleRowToDelete, setSingleRowToDelete] = useState<{ row: Omit<CertificationData, "id">; index: number } | null>(null);
    const [modalType, setModalType] = useState<'single' | 'multiple'>('multiple');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // New state for selected ticket
    const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState<CertificationData | null>(null);

    const [certificationFilters, setCertificationFilters] = useState({
        subject: "",
        property: "",
        status: "",
        submittedDate: "",
    });

    // State for date picker
    const [submittedDate, setSubmittedDate] = useState<Date | null>(null);

    // Dropdown states
    const [subjectDropdownOpen, setSubjectDropdownOpen] = useState(false);
    const [propertyDropdownOpen, setPropertyDropdownOpen] = useState(false);
    const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);

    // Refs for dropdown containers
    const subjectDropdownRef = useRef<HTMLDivElement>(null);
    const propertyDropdownRef = useRef<HTMLDivElement>(null);
    const statusDropdownRef = useRef<HTMLDivElement>(null);

    const [allCertificationData, setAllCertificationData] = useState<CertificationData[]>([
        {
            id: 1,
            "Ticket Id": "TIK - 8765",
            "Issue Type": "Support Tickets",
            Subject: "View and man...",
            "Created On": "Aug 20, 2025",
            Status: "Resolved",
        },
        {
            id: 2,
            "Ticket Id": "TIK - 8765",
            "Issue Type": "Support Queries",
            Subject: "View and man...",
            "Created On": "Aug 12, 2025",
            Status: "Pending",
        },
        {
            id: 3,
            "Ticket Id": "TIK - 8765",
            "Issue Type": "Assistance Center",
            Subject: "View and man...",
            "Created On": "Aug 12, 2025",
            Status: "Approved",
        },
        {
            id: 4,
            "Ticket Id": "TIK - 8765",
            "Issue Type": "Support Tickets",
            Subject: "View and man...",
            "Created On": "Aug 20, 2025",
            Status: "Pending",
        },
        {
            id: 5,
            "Ticket Id": "TIK - 8765",
            "Issue Type": "Support Queries",
            Subject: "View and man...",
            "Created On": "Aug 12, 2025",
            Status: "Pending",
        },
        {
            id: 6,
            "Ticket Id": "TIK - 8765",
            "Issue Type": "Assistance Center",
            Subject: "View and man...",
            "Created On": "Aug 12, 2025",
            Status: "Approved",
        },
        {
            id: 7,
            "Ticket Id": "TIK - 8765",
            "Issue Type": "Support Queries",
            Subject: "View and man...",
            "Created On": "Aug 12, 2025",
            Status: "Pending",
        },
        {
            id: 8,
            "Ticket Id": "TIK - 8765",
            "Issue Type": "Support Tickets",
            Subject: "View and man...",
            "Created On": "Aug 12, 2025",
            Status: "Approved",
        },
        {
            id: 9,
            "Ticket Id": "TIK - 8765",
            "Issue Type": "Support Queries",
            Subject: "View and man...",
            "Created On": "Aug 12, 2025",
            Status: "Approved",
        },
        {
            id: 10,
            "Ticket Id": "TIK - 8765",
            "Issue Type": "Support Queries",
            Subject: "View and man...",
            "Created On": "Aug 12, 2025",
            Status: "Pending",
        },
    ]);

    // Unique dropdown values
    const uniqueProperties = [
        ...new Set(allCertificationData.map((item) => item["Ticket Id"])),
    ];
    const uniqueStatuses = [
        ...new Set(allCertificationData.map((item) => item["Status"])),
    ];
    const uniqueSubjects = [
        ...new Set(allCertificationData.map((item) => item["Subject"])),
    ];

    // Filter + search logic
    const filteredCertificationData = useMemo(() => {
        let filtered = allCertificationData;

        if (searchTerm) {
            filtered = filtered.filter(
                (item) =>
                    item["Ticket Id"]
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    item["Issue Type"].toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item["Subject"].toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (certificationFilters.property) {
            filtered = filtered.filter(
                (item) => item["Ticket Id"] === certificationFilters.property
            );
        }

        if (certificationFilters.status) {
            filtered = filtered.filter(
                (item) => item["Status"] === certificationFilters.status
            );
        }

        if (certificationFilters.subject) {
            filtered = filtered.filter(
                (item) => item["Subject"] === certificationFilters.subject
            );
        }

        if (certificationFilters.submittedDate) {
            filtered = filtered.filter((item) =>
                item["Created On"].includes(certificationFilters.submittedDate)
            );
        }

        return filtered;
    }, [searchTerm, certificationFilters, allCertificationData]);

    // Fix selection state calculations for ALL filtered data - MOVED AFTER filteredCertificationData definition
    const isAllDisplayedSelected = useMemo(() => {
        return filteredCertificationData.length > 0 &&
            filteredCertificationData.every(item => selectedRows.has(item.id));
    }, [filteredCertificationData, selectedRows]);

    const isSomeDisplayedSelected = useMemo(() => {
        return filteredCertificationData.some(item => selectedRows.has(item.id)) &&
            !isAllDisplayedSelected;
    }, [filteredCertificationData, selectedRows, isAllDisplayedSelected]);

    // Transform data to exclude ID from display but keep it for navigation
    const displayData = useMemo(() => {
  return filteredCertificationData.map(({ id, ...rest }) => {
    console.log(id); 
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

    // Close dropdowns on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                subjectDropdownRef.current &&
                !subjectDropdownRef.current.contains(event.target as Node)
            ) {
                setSubjectDropdownOpen(false);
            }
            if (
                propertyDropdownRef.current &&
                !propertyDropdownRef.current.contains(event.target as Node)
            ) {
                setPropertyDropdownOpen(false);
            }
            if (
                statusDropdownRef.current &&
                !statusDropdownRef.current.contains(event.target as Node)
            ) {
                setStatusDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Delete handlers for application data - matching Tracking component style
    const handleDeleteApplications = (selectedRows: Set<number>) => {
        const idsToDelete = Array.from(selectedRows);
        const updatedData = allCertificationData.filter(item => !idsToDelete.includes(item.id));
        setAllCertificationData(updatedData);
        setIsModalOpen(false);
        setSelectedRows(new Set());
    };

    const handleDeleteSingleApplication = (_row: Omit<CertificationData, "id">, index: number) => {
        const globalIndex = startIndex + index;
        const itemToDelete = filteredCertificationData[globalIndex];

        if (itemToDelete) {
            const updatedData = allCertificationData.filter(item => item.id !== itemToDelete.id);
            setAllCertificationData(updatedData);

            // Remove the deleted row from selection
            const newSelected = new Set(selectedRows);
            newSelected.delete(itemToDelete.id);
            setSelectedRows(newSelected);
        }

        setIsModalOpen(false);
        setSingleRowToDelete(null);
    };

    const openDeleteSingleModal = (row: Omit<CertificationData, "id">, index: number) => {
        setSingleRowToDelete({ row, index });
        setModalType('single');
        setIsModalOpen(true);
    };

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

    // Handle individual row selection
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

    // Handle confirmation from modal
    const handleModalConfirm = () => {
        if (modalType === 'multiple' && selectedRows.size > 0) {
            handleDeleteApplications(selectedRows);
        } else if (modalType === 'single' && singleRowToDelete) {
            handleDeleteSingleApplication(singleRowToDelete.row, singleRowToDelete.index);
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

    // Reset pagination when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, certificationFilters]);

    const handleResetFilter = () => {
        setCertificationFilters({
            subject: "",
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

    // Handle delete selected - opens modal for confirmation
    const handleDeleteSelected = () => {
        if (selectedRows.size > 0) {
            setModalType('multiple');
            setIsModalOpen(true);
        }
    };

    // Custom input component for date picker to match the design
    const CustomDateInput = React.forwardRef<HTMLInputElement, CustomDateInputProps>(
        ({ value, onClick }, ref) => (
            <div className="relative">
                <input
                    type="text"
                    value={value}
                    onClick={onClick}
                    ref={ref}
                    readOnly
                    className={`
    w-full p-3 pr-10 rounded-[10px]
    border border-[#404040]         
    hover:border-[#EFFC76]          
    focus:border-[#EFFC76]          
    bg-[radial-gradient(75%_81%_at_50%_18.4%,_#202020_0%,_#101010_100%)]
    text-white placeholder:text-white/40
    focus:outline-none
    transition duration-200 ease-in-out
  `} placeholder="Select date"
                />
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                    <Image src="/images/calender.svg" alt="select date" width={20} height={20} />
                </div>
            </div>
        )
    );

    CustomDateInput.displayName = 'CustomDateInput';

    const renderPaginationButtons = () => {
        const buttons = [];
        const maxVisiblePages = 5;

        // Previous button - always visible
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

        // Calculate which pages to show
        let startPage, endPage;

        if (currentPage <= maxVisiblePages) {
            // Show pages 1 to maxVisiblePages when on early pages
            startPage = 1;
            endPage = Math.min(maxVisiblePages, totalPages);
        } else {
            // For later pages, show pages ending with current page
            startPage = currentPage - maxVisiblePages + 1;
            endPage = currentPage;
        }

        // Page number buttons
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

        // Next button - always visible
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
            {/* Modal with proper onConfirm handler - matching Tracking component */}
            {isModalOpen &&
                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={handleModalConfirm}
                    title="Confirm Ticket Deletion"
                    description="Deleting this ticket means it will no longer appear in your requests."
                    image="/images/delete-modal.png"
                    confirmText="Delete"
                />
            }
            <div className="flex flex-col gap-3 sm:gap-0 sm:flex-row items-start justify-between mb-[22px]">
                <div>
                    <h1 className="text-[20px] leading-[24px] font-semibold text-white mb-2">
                        Help & Support
                    </h1>
                    <p className="text-[16px] leading-[20px] text-[#FFFFFF99] font-regular max-w-[573px]">
                        Manage your support tickets and stay informed with system announcements.
                    </p>
                </div>
                <button
                    onClick={() => setIsDrawerOpen(true)}
                    className="yellow-btn cursor-pointer text-black px-[20px] py-[12px] rounded-[8px] font-semibold text-[18px] leading-[22px] hover:bg-[#E5F266] transition-colors duration-300"
                >
                    Create Ticket
                </button>
            </div>
            <div className="flex flex-col justify-between custom-height">

                {/* Table Container */}
                <div className="bg-[#121315] h-full rounded-lg relative z-[10] overflow-hidden flex flex-col">

                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between lg:items-center pt-5 px-5 flex-shrink-0">

                        <h2>Tickets</h2>
                        <div className="flex flex-wrap sm:flex-row items-start sm:items-center pt-3 sm:pt-0 gap-3">
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
                                disabled={!isAllDisplayedSelected}
                                    onClick={handleDeleteSelected}
                                    className="flex cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 items-center gap-[6px] p-2 rounded-[8px] 
            border border-[rgba(239,252,118,0.32)] text-[#EFFC76] text-[12px] font-normal leading-[16px]
             transition-colors duration-300"
                                >
                                    <Image src="/images/delete-row.svg" alt='Delete selected' width={12} height={12} />
                                    Delete All
                                </button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-auto scrollbar-hide">
                        <Table
                            data={paginatedData}
                            control={tableControl}
                            showDeleteButton={true}
                            // showModal={true}
                            clickable={true}
                            // modalTitle="Ticket Details"
                            selectedRows={selectedRows}
                            setSelectedRows={setSelectedRows}
                            onSelectAll={handleSelectAll}
                            onSelectRow={handleSelectRow}
                            isAllSelected={isAllDisplayedSelected}
                            isSomeSelected={isSomeDisplayedSelected}
                            rowIds={filteredCertificationData.map(item => item.id.toString())}
                            dropdownItems={[
                                {
                                    label: "View Details",
                                    onClick: (row, index) => {
                                        const originalRow = filteredCertificationData[startIndex + index];
                                        setSelectedTicket(originalRow);
                                        setIsDetailDrawerOpen(true);
                                    },
                                },
                                {
                                    label: "Delete Ticket",
                                    onClick: (row, index) => openDeleteSingleModal(row, index),
                                },
                            ]}
                        />
                    </div>
                </div>

                <div className="flex justify-center mt-4">
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
                className={`fixed top-0 right-0 h-full bg-[#0A0C0B] z-[2000000000] transform transition-transform duration-300 ease-in-out ${isFilterOpen ? "translate-x-0" : "translate-x-full"
                    } w-[250px] sm:w-1/2 lg:w-2/5 xl:w-1/3`}
            >
                <div
                    className="h-full justify-between flex flex-col bg-[#0A0C0B] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div>
                        <div className="flex justify-between items-center px-6 pt-6 pb-3">
                            <h3 className="text-white text-[20px] font-medium">
                                Apply Filter
                            </h3>
                            <button
                                onClick={handleResetFilter}
                                className="text-[#EFFC76] cursor-pointer text-[18px] font-medium underline"
                            >
                                Reset
                            </button>
                        </div>

                        <div className="px-6">
                            <p className="text-white text-[16px] opacity-60 mb-10">
                                Refine listings to find the right property faster.
                            </p>

                            <div className="space-y-[20px]">
                                <div ref={subjectDropdownRef}>
                                    <label className="text-white text-sm font-medium mb-3 block">
                                        Subject
                                    </label>
                                    <div className="relative">
                                        <div
                                            className={`
    w-full p-3 pr-10 rounded-[10px]
    border border-[#404040]         
    hover:border-[#EFFC76]          
    focus:border-[#EFFC76]          
    bg-[radial-gradient(75%_81%_at_50%_18.4%,_#202020_0%,_#101010_100%)]
    text-white placeholder:text-white/40
    focus:outline-none
    transition duration-200 ease-in-out
  `}
                                            onClick={() => setSubjectDropdownOpen(!subjectDropdownOpen)}
                                        >
                                            {certificationFilters.subject || "Select subject"}
                                            <Image
                                                src="/images/dropdown.svg"
                                                alt="dropdown"
                                                width={16}
                                                height={16}
                                                className="absolute right-3 top-1/2 transform -translate-y-1 cursor-pointer"

                                            />
                                        </div>

                                        {subjectDropdownOpen && (
                                            <div className="absolute z-10 w-full mt-1 bg-[#1A1A1A] border border-[#404040] rounded-xl shadow-lg">
                                                {uniqueSubjects.map((subject) => (
                                                    <div
                                                        key={subject}
                                                        className="px-4 py-3 cursor-pointer hover:bg-[#2A2A2A] text-white"
                                                        onClick={() => {
                                                            setCertificationFilters((prev) => ({
                                                                ...prev,
                                                                subject: subject,
                                                            }));
                                                            setSubjectDropdownOpen(false);
                                                        }}
                                                    >
                                                        {subject}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Property */}
                                <div ref={propertyDropdownRef}>
                                    <label className="text-white text-sm font-medium mb-3 block">
                                        Property
                                    </label>
                                    <div className="relative">
                                        <div
                                            className={`
    w-full p-3 pr-10 rounded-[10px]
    border border-[#404040]         
    hover:border-[#EFFC76]          
    focus:border-[#EFFC76]          
    bg-[radial-gradient(75%_81%_at_50%_18.4%,_#202020_0%,_#101010_100%)]
    text-white placeholder:text-white/40
    focus:outline-none
    transition duration-200 ease-in-out
  `}
                                            onClick={() => setPropertyDropdownOpen(!propertyDropdownOpen)}
                                        >
                                            {certificationFilters.property || "Select property"}
                                            <Image
                                                src="/images/dropdown.svg"
                                                alt="dropdown"
                                                width={16}
                                                height={16}
                                                className="absolute right-3 top-1/2 transform -translate-y-1 cursor-pointer"

                                            />
                                        </div>

                                        {propertyDropdownOpen && (
                                            <div className="absolute z-10 w-full mt-1 bg-[#1A1A1A] border border-[#404040] rounded-xl shadow-lg">
                                                {uniqueProperties.map((property) => (
                                                    <div
                                                        key={property}
                                                        className="px-4 py-3 cursor-pointer hover:bg-[#2A2A2A] text-white"
                                                        onClick={() => {
                                                            setCertificationFilters((prev) => ({
                                                                ...prev,
                                                                property: property,
                                                            }));
                                                            setPropertyDropdownOpen(false);
                                                        }}
                                                    >
                                                        {property}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Status */}
                                <div ref={statusDropdownRef}>
                                    <label className="text-white text-sm font-medium mb-3 block">
                                        Status
                                    </label>
                                    <div className="relative">
                                        <div
                                            className={`
    w-full p-3 pr-10 rounded-[10px]
    border border-[#404040]         
    hover:border-[#EFFC76]          
    focus:border-[#EFFC76]          
    bg-[radial-gradient(75%_81%_at_50%_18.4%,_#202020_0%,_#101010_100%)]
    text-white placeholder:text-white/40
    focus:outline-none
    transition duration-200 ease-in-out
  `}
                                            onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
                                        >
                                            {certificationFilters.status || "Select status"}
                                            <Image
                                                src="/images/dropdown.svg"
                                                alt="dropdown"
                                                width={16}
                                                height={16}
                                                className="absolute right-3 top-1/2 transform -translate-y-1 cursor-pointer"
                                            />
                                        </div>

                                        {statusDropdownOpen && (
                                            <div className="absolute z-10 w-full mt-1 bg-[#1A1A1A] border border-[#404040] rounded-xl shadow-lg">
                                                {uniqueStatuses.map((status) => (
                                                    <div
                                                        key={status}
                                                        className="px-4 py-3 cursor-pointer hover:bg-[#2A2A2A] text-white"
                                                        onClick={() => {
                                                            setCertificationFilters((prev) => ({
                                                                ...prev,
                                                                status: status,
                                                            }));
                                                            setStatusDropdownOpen(false);
                                                        }}
                                                    >
                                                        {status}
                                                    </div>
                                                ))}
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
              className="yellow-btn cursor-pointer w-full text-black px-[40px] py-[16px] rounded-[8px] font-semibold text-[18px] leading-[22px] hover:bg-[#E5F266] transition-colors duration-300"
                        >
                            Apply Filter
                        </button>
                    </div>
                </div>
            </div>

            {/* Help Support Drawer */}
            <div
                className={`fixed inset-0 bg-[#121315CC] z-[3000000000] flex justify-end transition-opacity duration-300 ${isDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                onClick={() => setIsDrawerOpen(false)}
            >
                <div
                    className={`w-full lg:max-w-[608px] md:max-w-[500px] max-w-[280px] p-5 sm:p-7 bg-[#0A0C0B] h-full overflow-auto scrollbar-hide rounded-[12px] border border-[#FFFFFF1F] transform transition-transform duration-300 ease-in-out ${isDrawerOpen ? "translate-x-0" : "translate-x-full"
                        }`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <HelpSupportDrawer
                        isOpen={isDrawerOpen}
                        onClose={() => setIsDrawerOpen(false)}
                    />
                </div>
            </div>

            {/* Ticket Detail Drawer */}
            <div
                className={`fixed inset-0 bg-[#121315CC] z-[3000000001] flex justify-end transition-opacity duration-300 ${isDetailDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                onClick={() => setIsDetailDrawerOpen(false)}
            >
                <div
                    className={`w-full lg:max-w-[608px] md:max-w-[500px] max-w-[280px] bg-[#0A0C0B] h-full flex flex-col rounded-[12px] border border-[#FFFFFF1F] transform transition-transform duration-300 ease-in-out ${isDetailDrawerOpen ? "translate-x-0" : "translate-x-full"
                        }`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex-1 overflow-y-auto scrollbar-hide">
                        <TicketDetailDrawer
                            isOpen={isDetailDrawerOpen}
                            onClose={() => setIsDetailDrawerOpen(false)}
                            ticket={
                                selectedTicket
                                    ? {
                                        id: String(selectedTicket.id),
                                        ticketId: selectedTicket["Ticket Id"],
                                        issueType: selectedTicket["Issue Type"],
                                        subject: selectedTicket["Subject"],
                                        createdOn: selectedTicket["Created On"],
                                        status: selectedTicket["Status"],
                                    }
                                    : null
                            }
                        />
                    </div>
                </div>
            </div>
        </>
    );
}