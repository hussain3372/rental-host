// "use client";
// import React, { useMemo, useState } from "react";
// import Image from "next/image";
// import { Table } from "@/app/shared/tables/Tables";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { Modal } from '@/app/shared/modals';

// interface CustomDateInputProps {
//   value?: string;
//   onClick?: () => void;
//   onChange?: () => void;
// }

// interface CertificationData {
//   id: number;
//   "Property Name": string;
//   Address: string;
//   Ownership: string;
//   "Submitted Date": string;
//   Status: string;
// }

// export default function Applications() {
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 6; 
  
//   // Modal and delete states
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedRows, setSelectedRows] = useState<any[]>([]);
//   const [singleRowToDelete, setSingleRowToDelete] = useState<{row: any, index: number} | null>(null);
//   const [modalType, setModalType] = useState<'single' | 'multiple'>('multiple');
  
//   const [certificationFilters, setCertificationFilters] = useState({
//     ownership: "",
//     property: "",
//     status: "",
//     submittedDate: "",
//   });

//   // State for date picker
//   const [submittedDate, setSubmittedDate] = useState<Date | null>(null);

//   const [allCertificationData, setAllCertificationData] = useState<CertificationData[]>([
//     {
//       id:1,
//       "Property Name": "Coastal Hillside Estate",
//       Address: "762 Evergreen Terrace",
//       Ownership: "Owner",
//       "Submitted Date": "Aug 12, 2025",
//       Status: "Approved",
//     },
//     {
//       id:2,
//       "Property Name": "Coastal Hillside Estate",
//       Address: "762 Evergreen Terrace",
//       Ownership: "Manager",
//       "Submitted Date": "Aug 12, 2025",
//       Status: "Pending",
//     },
//     {
//       id:3,
//       "Property Name": "Coastal Hillside Estate",
//       Address: "762 Evergreen Terrace",
//       Ownership: "Owner",
//       "Submitted Date": "Aug 12, 2025",
//       Status: "Approved",
//     },
//     {
//       id:4,
//       "Property Name": "Coastal Hillside Estate",
//       Address: "762 Evergreen Terrace",
//       Ownership: "Manager",
//       "Submitted Date": "Aug 12, 2025",
//       Status: "Pending",
//     },
//     {
//       id:5,
//       "Property Name": "Coastal Hillside Estate",
//       Address: "762 Evergreen Terrace",
//       Ownership: "Agent",
//       "Submitted Date": "Aug 12, 2025",
//       Status: "Rejected",
//     },
//     {
//       id:6,
//       "Property Name": "Coastal Hillside Estate",
//       Address: "762 Evergreen Terrace",
//       Ownership: "Agent",
//       "Submitted Date": "Aug 12, 2025",
//       Status: "Approved",
//     },
//     {
//       id:7,
//       "Property Name": "Mountain View Complex",
//       Address: "123 Highland Road",
//       Ownership: "Owner",
//       "Submitted Date": "Sep 15, 2025",
//       Status: "Pending",
//     },
//     {
//       id:8,
//       "Property Name": "Skyline Residences",
//       Address: "456 Tower Street",
//       Ownership: "Manager",
//       "Submitted Date": "Oct 1, 2025",
//       Status: "Approved",
//     },
//     {
//       id:9,
//       "Property Name": "Coastal Hillside Estate",
//       Address: "762 Evergreen Terrace",
//       Ownership: "Owner",
//       "Submitted Date": "Aug 12, 2025",
//       Status: "Approved",
//     },
//     {
//       id:10,
//       "Property Name": "Coastal Hillside Estate",
//       Address: "762 Evergreen Terrace",
//       Ownership: "Manager",
//       "Submitted Date": "Aug 12, 2025",
//       Status: "Pending",
//     },
//     {
//       id:11,
//       "Property Name": "Coastal Hillside Estate",
//       Address: "762 Evergreen Terrace",
//       Ownership: "Agent",
//       "Submitted Date": "Aug 12, 2025",
//       Status: "Rejected",
//     },
//     {
//       id:12,
//       "Property Name": "Coastal Hillside Estate",
//       Address: "762 Evergreen Terrace",
//       Ownership: "Agent",
//       "Submitted Date": "Aug 12, 2025",
//       Status: "Approved",
//     },
//     {
//       id:13,
//       "Property Name": "Mountain View Complex",
//       Address: "123 Highland Road",
//       Ownership: "Owner",
//       "Submitted Date": "Sep 15, 2025",
//       Status: "Pending",
//     },
//     {
//       id:14,
//       "Property Name": "Skyline Residences",
//       Address: "456 Tower Street",
//       Ownership: "Manager",
//       "Submitted Date": "Oct 1, 2025",
//       Status: "Approved",
//     },
//     {
//       id:15,
//       "Property Name": "Coastal Hillside Estate",
//       Address: "762 Evergreen Terrace",
//       Ownership: "Owner",
//       "Submitted Date": "Aug 12, 2025",
//       Status: "Approved",
//     },
//     {
//       id:16,
//       "Property Name": "Coastal Hillside Estate",
//       Address: "762 Evergreen Terrace",
//       Ownership: "Manager",
//       "Submitted Date": "Aug 12, 2025",
//       Status: "Pending",
//     },
//     {
//       id:17,
//       "Property Name": "Coastal Hillside Estate",
//       Address: "762 Evergreen Terrace",
//       Ownership: "Agent",
//       "Submitted Date": "Aug 12, 2025",
//       Status: "Rejected",
//     },
//     {
//       id:18,
//       "Property Name": "Coastal Hillside Estate",
//       Address: "762 Evergreen Terrace",
//       Ownership: "Agent",
//       "Submitted Date": "Aug 12, 2025",
//       Status: "Approved",
//     },
//     {
//       id:19,
//       "Property Name": "Mountain View Complex",
//       Address: "123 Highland Road",
//       Ownership: "Owner",
//       "Submitted Date": "Sep 15, 2025",
//       Status: "Pending",
//     },
//     {
//       id:20,
//       "Property Name": "Skyline Residences",
//       Address: "456 Tower Street",
//       Ownership: "Manager",
//       "Submitted Date": "Oct 1, 2025",
//       Status: "Approved",
//     },
//     {
//       id:21,
//       "Property Name": "Coastal Hillside Estate",
//       Address: "762 Evergreen Terrace",
//       Ownership: "Owner",
//       "Submitted Date": "Aug 12, 2025",
//       Status: "Approved",
//     },
//     {
//       id:22,
//       "Property Name": "Coastal Hillside Estate",
//       Address: "762 Evergreen Terrace",
//       Ownership: "Owner",
//       "Submitted Date": "Aug 12, 2025",
//       Status: "Approved",
//     },
//     {
//       id:23,
//       "Property Name": "Coastal Hillside Estate",
//       Address: "762 Evergreen Terrace",
//       Ownership: "Owner",
//       "Submitted Date": "Aug 12, 2025",
//       Status: "Approved",
//     },
//     {
//       id:24,
//       "Property Name": "Coastal Hillside Estate",
//       Address: "762 Evergreen Terrace",
//       Ownership: "Owner",
//       "Submitted Date": "Aug 12, 2025",
//       Status: "Approved",
//     },
//     {
//       id:25,
//       "Property Name": "Coastal Hillside Estate",
//       Address: "762 Evergreen Terrace",
//       Ownership: "Owner",
//       "Submitted Date": "Aug 12, 2025",
//       Status: "Approved",
//     },
//   ]);

//   // Delete handlers for application data - matching Tracking component style
//   const handleDeleteApplications = (selectedRows: any[]) => {
//     // Find the actual data items by matching the display data to full data
//     const idsToDelete = selectedRows.map(displayRow => {
//       // Find the matching full data item by comparing properties (excluding id)
//       const fullDataItem = filteredCertificationData.find(fullItem => {
//         const { id, ...fullWithoutId } = fullItem;
//         return JSON.stringify(fullWithoutId) === JSON.stringify(displayRow);
//       });
//       return fullDataItem?.id;
//     }).filter(id => id !== undefined);

//     // Remove the items from the main data
//     const updatedData = allCertificationData.filter(item => !idsToDelete.includes(item.id));
//     setAllCertificationData(updatedData);
    
//     // Close modal and reset selected rows
//     setIsModalOpen(false);
//     setSelectedRows([]);
    
//     // Optional: Show success message - removed alert to match Tracking component
//   };

//   const handleDeleteSingleApplication = (row: any, index: number) => {
//     // Find the actual item using the global index
//     const globalIndex = startIndex + index;
//     const itemToDelete = filteredCertificationData[globalIndex];
    
//     if (itemToDelete) {
//       // Remove the item from the main data
//       const updatedData = allCertificationData.filter(item => item.id !== itemToDelete.id);
//       setAllCertificationData(updatedData);
//     }
    
//     // Close modal and reset
//     setIsModalOpen(false);
//     setSingleRowToDelete(null);
    
//     // Optional: Show success message - removed alert to match Tracking component
//   };

//   // Functions to open modal for deletions
//   const openDeleteModal = (selectedRows: any[]) => {
//     setSelectedRows(selectedRows);
//     setModalType('multiple');
//     setIsModalOpen(true);
//   };

//   const openDeleteSingleModal = (row: any, index: number) => {
//     setSingleRowToDelete({row, index});
//     setModalType('single');
//     setIsModalOpen(true);
//   };

//   // Handle confirmation from modal
//   const handleModalConfirm = () => {
//     if (modalType === 'multiple' && selectedRows.length > 0) {
//       handleDeleteApplications(selectedRows);
//     } else if (modalType === 'single' && singleRowToDelete) {
//       handleDeleteSingleApplication(singleRowToDelete.row, singleRowToDelete.index);
//     }
//   };

//   // Table control
//   const tableControl = {
//     hover: true,
//     striped: false,
//     bordered: false,
//     shadow: false,
//     compact: false,
//     headerBgColor: "#252628",
//     headerTextColor: "white",
//     rowBgColor: "black",
//     rowTextColor: "#e5e7eb",
//     hoverBgColor: "black",
//     hoverTextColor: "#ffffff",
//     fontSize: 13,
//     textAlign: "left" as const,
//     rowBorder: false,
//     headerBorder: true,
//     borderColor: "#374151",
//     highlightRowOnHover: true,
//   };

//   // Unique dropdown values
//   const uniqueProperties = [
//     ...new Set(allCertificationData.map((item) => item["Property Name"])),
//   ];
//   const uniqueStatuses = [
//     ...new Set(allCertificationData.map((item) => item["Status"])),
//   ];
//   const uniqueOwnerships = [
//     ...new Set(allCertificationData.map((item) => item["Ownership"])),
//   ];

//   // Filter + search logic
//   const filteredCertificationData = useMemo(() => {
//     let filtered = allCertificationData;

//     if (searchTerm) {
//       filtered = filtered.filter(
//         (item) =>
//           item["Property Name"]
//             .toLowerCase()
//             .includes(searchTerm.toLowerCase()) ||
//           item["Address"].toLowerCase().includes(searchTerm.toLowerCase()) ||
//           item["Ownership"].toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     if (certificationFilters.property) {
//       filtered = filtered.filter(
//         (item) => item["Property Name"] === certificationFilters.property
//       );
//     }

//     if (certificationFilters.status) {
//       filtered = filtered.filter(
//         (item) => item["Status"] === certificationFilters.status
//       );
//     }

//     if (certificationFilters.ownership) {
//       filtered = filtered.filter(
//         (item) => item["Ownership"] === certificationFilters.ownership
//       );
//     }

//     if (certificationFilters.submittedDate) {
//       filtered = filtered.filter((item) =>
//         item["Submitted Date"].includes(certificationFilters.submittedDate)
//       );
//     }

//     return filtered;
//   }, [searchTerm, certificationFilters, allCertificationData]);

//   // Transform data to exclude ID from display but keep it for navigation
//   const displayData = useMemo(() => {
//     return filteredCertificationData.map(({ id, ...rest }) => rest);
//   }, [filteredCertificationData]);

//   // Pagination logic
//   const totalPages = Math.ceil(displayData.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedData = displayData.slice(
//     startIndex,
//     startIndex + itemsPerPage
//   );

//   // Reset pagination when filters change
//   React.useEffect(() => {
//     setCurrentPage(1);
//   }, [searchTerm, certificationFilters]);

//   const handleResetFilter = () => {
//     setCertificationFilters({
//       ownership: "",
//       property: "",
//       status: "",
//       submittedDate: "",
//     });
//     setSearchTerm("");
//     setSubmittedDate(null);
//   };

//   const handleApplyFilter = () => {
//     // Convert selected date to string format for filtering
//     if (submittedDate) {
//       setCertificationFilters(prev => ({
//         ...prev,
//         submittedDate: submittedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
//       }));
//     }
    
//     setIsFilterOpen(false);
//   };
  
//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//   };

//   // Custom input component for date picker to match the design
//   const CustomDateInput = React.forwardRef<HTMLInputElement, CustomDateInputProps>(
//     ({ value, onClick }, ref) => (
//       <div className="relative">
//         <input
//           type="text"
//           value={value}
//           onClick={onClick}
//           ref={ref}
//           readOnly
//           className="w-full bg-gradient-to-b placeholder:text-white/40 from-[#202020] to-[#101010] border rounded-xl text-white/40 px-4 py-3 text-sm border-[#404040] focus:border-[#EFFC76] focus:outline-none cursor-pointer"
//           placeholder="Select date"
//         />
//         <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
//           <Image src="/images/calender.svg" alt="select date" width={20} height={20} />
//         </div>
//       </div>
//     )
//   );

//   CustomDateInput.displayName = 'CustomDateInput';

//   const renderPaginationButtons = () => {
//     const buttons = [];
//     const maxVisiblePages = 5;

//     // Previous button - always visible
//     buttons.push(
//       <button
//         key="prev"
//         onClick={() => handlePageChange(currentPage - 1)}
//         disabled={currentPage === 1}
//         className="w-8 h-8 flex items-center p-[13px] justify-center text-gray-400 hover:text-white transition-colors border border-gray-600 rounded cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
//       >
//         <Image src="/images/arrow-left.svg" height={14} width={14} alt="Back" className="" />
//       </button>
//     );

//     // Calculate which pages to show
//     let startPage, endPage;
    
//     if (currentPage <= maxVisiblePages) {
//       // Show pages 1 to maxVisiblePages when on early pages
//       startPage = 1;
//       endPage = Math.min(maxVisiblePages, totalPages);
//     } else {
//       // For later pages, show pages ending with current page
//       startPage = currentPage - maxVisiblePages + 1;
//       endPage = currentPage;
//     }

//     // Page number buttons
//     for (let i = startPage; i <= endPage; i++) {
//       buttons.push(
//         <button
//           key={i}
//           onClick={() => handlePageChange(i)}
//           className={`w-8 h-8 flex items-center justify-center rounded text-sm leading-[18px] p-[13px] transition-colors border cursor-pointer ${
//             currentPage === i
//               ? "bg-[#EFFC76] text-black font-medium border-[#EFFC76]"
//               : "text-white opacity-60 border-gray-600"
//           }`}
//         >
//           {i}
//         </button>
//       );
//     }

//     // Next button - always visible
//     buttons.push(
//       <button
//         key="next"
//         onClick={() => handlePageChange(currentPage + 1)}
//         disabled={currentPage === totalPages}
//         className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors border border-gray-600 rounded cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 p-[13px]"
//       >
//         <Image src="/images/arrow-right.svg" height={14} width={14} alt="Back" className="" />
//       </button>
//     );

//     return buttons;
//   };

//   return (
//     <>
//       {/* Modal with proper onConfirm handler - matching Tracking component */}
//       {isModalOpen && 
//         <Modal 
//           type='confirm' 
//           title='Do you want to delete this application'
//           onClose={() => {
//             setIsModalOpen(false);
//             setSelectedRows([]);
//             setSingleRowToDelete(null);
//           }} 
//           isOpen={isModalOpen} 
//           onConfirm={handleModalConfirm}
//         />
//       }

//       <div className="bg-[#121315] rounded-lg relative z-[10] overflow-hidden">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row justify-between lg:items-center pt-5 px-7">
//           <h2 className="text-white text-[16px] font-semibold leading-[20px]">
//             Applications
//           </h2>
//           <div className="inline-flex flex-col-reverse sm:flex-row item-start sm:items-center pt-3 sm:pt-0 gap-3">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="bg-white/12 border rounded-lg text-white/40 placeholder-white/60 w-[204px] px-3 py-2 text-sm pl-8 border-none outline-none"
//               />
//               <div className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-500">
//                 <Image
//                   src="/images/search.png"
//                   alt="search"
//                   width={16}
//                   height={16}
//                 />
//               </div>
//             </div>
//             <button
//               onClick={() => setIsFilterOpen(true)}
//               className="h-[34px] cursor-pointer w-[86px] rounded-md bg-[#2e2f31] py-2 px-3 flex items-center gap-1"
//             >
//               <span className="text-sm leading-[18px] font-medium text-white opacity-60">
//                 Filter
//               </span>
//               <Image
//                 src="/images/filter1.png"
//                 alt="filter"
//                 height={9}
//                 width={13}
//               />
//             </button>
//           </div>
//         </div>

//         {/* Table with delete functionality */}
//         <div className="p-0 cursor-pointer">
//           <Table
//             data={paginatedData}
//             control={tableControl}
//             showDeleteButton={true}
//             onDelete={openDeleteModal}
//             onDeleteSingle={openDeleteSingleModal}
//             showModal={true}
//             clickable={true}
//             onRowClick={(row, index) => {
//               console.log('Clicked row:', row);
//               // Get the original data with ID using the index
//               const originalRow = filteredCertificationData[startIndex + index];
//               window.location.href = `/dashboard/application/detail/${originalRow.id}`;
//             }}
//             modalTitle="Property Details"
//           />
//         </div>

//         {/* Pagination - Always visible */}
//       </div>
//         <div className="flex justify-center mt-[20px]">
//           <div className="flex items-center gap-2">
//             {renderPaginationButtons()}
//           </div>
//         </div>

//       {/* Full Page Overlay */}
//       {isFilterOpen && (
//         <div
//           className="fixed inset-0 bg-black/70 z-[100000]"
//           onClick={() => setIsFilterOpen(false)}
//         />
//       )}

//       {/* Right Slide Panel Filter */}
//       <div
//         className={`fixed top-0 right-0 h-full bg-[#0A0C0B] z-[2000000000] transform transition-transform duration-300 ease-in-out ${
//           isFilterOpen ? "translate-x-0" : "translate-x-full"
//         } w-[250px] sm:w-1/2 lg:w-2/5 xl:w-1/3`}
//       >
//         <div
//           className="h-full justify-between flex flex-col bg-[#0A0C0B] overflow-y-auto"
//           onClick={(e) => e.stopPropagation()}
//         >
//           {/* Header */}
//           <div>
//             <div className="flex justify-between items-center px-6 pt-6 pb-3">
//               <h3 className="text-white text-[20px] font-medium">
//                 Apply Filter
//               </h3>
//               <button
//                 onClick={handleResetFilter}
//                 className="text-[#EFFC76] cursor-pointer text-[18px] font-medium underline"
//               >
//                 Reset
//               </button>
//             </div>

//             <div className="px-6">
//               <p className="text-white text-[16px] opacity-60 mb-10">
//                 Refine listings to find the right property faster.
//               </p>

//               <div className="space-y-[20px]">
//                 {/* Ownership */}
//                 <div>
//                   <label className="text-white text-sm font-medium mb-3 block">
//                     Ownership
//                   </label>
//                   <div className="relative">
//                     <select
//                       value={certificationFilters.ownership}
//                       onChange={(e) =>
//                         setCertificationFilters((prev) => ({
//                           ...prev,
//                           ownership: e.target.value,
//                         }))
//                       }
//                       className="w-full bg-gradient-to-b from-[#202020] to-[#101010] border rounded-xl text-white/40 px-4 py-3 text-sm border-[#404040] focus:border-[#EFFC76] focus:outline-none appearance-none"
//                     >
//                       <option className="text-black" value="">
//                         Select ownership
//                       </option>
//                       {uniqueOwnerships.map((ownership) => (
//                         <option
//                           className="text-black"
//                           key={ownership}
//                           value={ownership}
//                         >
//                           {ownership}
//                         </option>
//                       ))}
//                     </select>
//                     <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
//                       <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                       </svg>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Property */}
//                 <div>
//                   <label className="text-white text-sm font-medium mb-3 block">
//                     Property
//                   </label>
//                   <div className="relative">
//                     <select
//                       value={certificationFilters.property}
//                       onChange={(e) =>
//                         setCertificationFilters((prev) => ({
//                           ...prev,
//                           property: e.target.value,
//                         }))
//                       }
//                       className="w-full bg-gradient-to-b from-[#202020] to-[#101010] border rounded-xl text-white/40 px-4 py-3 text-sm border-[#404040] focus:border-[#EFFC76] focus:outline-none appearance-none"
//                     >
//                       <option className="text-black" value="">
//                         Select property
//                       </option>
//                       {uniqueProperties.map((property) => (
//                         <option
//                           className="text-black"
//                           key={property}
//                           value={property}
//                         >
//                           {property}
//                         </option>
//                       ))}
//                     </select>
//                     <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
//                       <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                       </svg>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Status */}
//                 <div>
//                   <label className="text-white text-sm font-medium mb-3 block">
//                     Status
//                   </label>
//                   <div className="relative">
//                     <select
//                       value={certificationFilters.status}
//                       onChange={(e) =>
//                         setCertificationFilters((prev) => ({
//                           ...prev,
//                           status: e.target.value,
//                         }))
//                       }
//                       className="w-full bg-gradient-to-b from-[#202020] to-[#101010] border rounded-xl text-white/40 px-4 py-3 text-sm border-[#404040] focus:border-[#EFFC76] focus:outline-none appearance-none"
//                     >
//                       <option className="text-black" value="">
//                         Select status
//                       </option>
//                       {uniqueStatuses.map((status) => (
//                         <option
//                           className="text-black"
//                           key={status}
//                           value={status}
//                         >
//                           {status}
//                         </option>
//                       ))}
//                     </select>
//                     <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
//                       <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                       </svg>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Submitted Date */}
//                 <div>
//                   <label className="text-white text-sm font-medium mb-3 block">
//                     Submitted date
//                   </label>
//                   <DatePicker
//                     selected={submittedDate}
//                     onChange={(date: Date | null) => setSubmittedDate(date)}
//                     customInput={<CustomDateInput />}
//                     dateFormat="MMM d, yyyy"
//                     placeholderText="Select date"
//                     showMonthDropdown
//                     showYearDropdown
//                     dropdownMode="select"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Apply Button */}
//           <div className="p-6">
//             <button
//               onClick={handleApplyFilter}
//               className="w-full bg-[#EFFC76] cursor-pointer text-black font-semibold py-4 rounded-xl hover:bg-[#e8f566] transition-colors text-sm"
//             >
//               Apply Filter
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }



"use client";
import React, { useMemo, useState } from "react";
import Image from "next/image";
import { Table } from "@/app/shared/tables/Tables";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Modal } from '@/app/shared/modals';

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

// Define proper types for table rows and delete operations
type TableRowData = Omit<CertificationData, "id">;
// type DeleteRowHandler = (selectedRows: TableRowData[]) => void;
// type DeleteSingleRowHandler = (row: TableRowData, index: number) => void;

export default function Applications() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; 
  
  // Modal and delete states with proper typing
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState<TableRowData[]>([]);
  const [singleRowToDelete, setSingleRowToDelete] = useState<{row: TableRowData, index: number} | null>(null);
  const [modalType, ] = useState<'single' | 'multiple'>('multiple');
  
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
      id:1,
      "Property Name": "Coastal Hillside Estate",
      Address: "762 Evergreen Terrace",
      Ownership: "Owner",
      "Submitted Date": "Aug 12, 2025",
      Status: "Approved",
    },
    {
      id:2,
      "Property Name": "Coastal Hillside Estate",
      Address: "762 Evergreen Terrace",
      Ownership: "Manager",
      "Submitted Date": "Aug 12, 2025",
      Status: "Pending",
    },
    {
      id:3,
      "Property Name": "Coastal Hillside Estate",
      Address: "762 Evergreen Terrace",
      Ownership: "Owner",
      "Submitted Date": "Aug 12, 2025",
      Status: "Approved",
    },
    {
      id:4,
      "Property Name": "Coastal Hillside Estate",
      Address: "762 Evergreen Terrace",
      Ownership: "Manager",
      "Submitted Date": "Aug 12, 2025",
      Status: "Pending",
    },
    {
      id:5,
      "Property Name": "Coastal Hillside Estate",
      Address: "762 Evergreen Terrace",
      Ownership: "Agent",
      "Submitted Date": "Aug 12, 2025",
      Status: "Rejected",
    },
    {
      id:6,
      "Property Name": "Coastal Hillside Estate",
      Address: "762 Evergreen Terrace",
      Ownership: "Agent",
      "Submitted Date": "Aug 12, 2025",
      Status: "Approved",
    },
    {
      id:7,
      "Property Name": "Mountain View Complex",
      Address: "123 Highland Road",
      Ownership: "Owner",
      "Submitted Date": "Sep 15, 2025",
      Status: "Pending",
    },
    {
      id:8,
      "Property Name": "Skyline Residences",
      Address: "456 Tower Street",
      Ownership: "Manager",
      "Submitted Date": "Oct 1, 2025",
      Status: "Approved",
    },
    {
      id:9,
      "Property Name": "Coastal Hillside Estate",
      Address: "762 Evergreen Terrace",
      Ownership: "Owner",
      "Submitted Date": "Aug 12, 2025",
      Status: "Approved",
    },
    {
      id:10,
      "Property Name": "Coastal Hillside Estate",
      Address: "762 Evergreen Terrace",
      Ownership: "Manager",
      "Submitted Date": "Aug 12, 2025",
      Status: "Pending",
    },
    {
      id:11,
      "Property Name": "Coastal Hillside Estate",
      Address: "762 Evergreen Terrace",
      Ownership: "Agent",
      "Submitted Date": "Aug 12, 2025",
      Status: "Rejected",
    },
    {
      id:12,
      "Property Name": "Coastal Hillside Estate",
      Address: "762 Evergreen Terrace",
      Ownership: "Agent",
      "Submitted Date": "Aug 12, 2025",
      Status: "Approved",
    },
    {
      id:13,
      "Property Name": "Mountain View Complex",
      Address: "123 Highland Road",
      Ownership: "Owner",
      "Submitted Date": "Sep 15, 2025",
      Status: "Pending",
    },
    {
      id:14,
      "Property Name": "Skyline Residences",
      Address: "456 Tower Street",
      Ownership: "Manager",
      "Submitted Date": "Oct 1, 2025",
      Status: "Approved",
    },
    {
      id:15,
      "Property Name": "Coastal Hillside Estate",
      Address: "762 Evergreen Terrace",
      Ownership: "Owner",
      "Submitted Date": "Aug 12, 2025",
      Status: "Approved",
    },
    {
      id:16,
      "Property Name": "Coastal Hillside Estate",
      Address: "762 Evergreen Terrace",
      Ownership: "Manager",
      "Submitted Date": "Aug 12, 2025",
      Status: "Pending",
    },
    {
      id:17,
      "Property Name": "Coastal Hillside Estate",
      Address: "762 Evergreen Terrace",
      Ownership: "Agent",
      "Submitted Date": "Aug 12, 2025",
      Status: "Rejected",
    },
    {
      id:18,
      "Property Name": "Coastal Hillside Estate",
      Address: "762 Evergreen Terrace",
      Ownership: "Agent",
      "Submitted Date": "Aug 12, 2025",
      Status: "Approved",
    },
    {
      id:19,
      "Property Name": "Mountain View Complex",
      Address: "123 Highland Road",
      Ownership: "Owner",
      "Submitted Date": "Sep 15, 2025",
      Status: "Pending",
    },
    {
      id:20,
      "Property Name": "Skyline Residences",
      Address: "456 Tower Street",
      Ownership: "Manager",
      "Submitted Date": "Oct 1, 2025",
      Status: "Approved",
    },
    {
      id:21,
      "Property Name": "Coastal Hillside Estate",
      Address: "762 Evergreen Terrace",
      Ownership: "Owner",
      "Submitted Date": "Aug 12, 2025",
      Status: "Approved",
    },
    {
      id:22,
      "Property Name": "Coastal Hillside Estate",
      Address: "762 Evergreen Terrace",
      Ownership: "Owner",
      "Submitted Date": "Aug 12, 2025",
      Status: "Approved",
    },
    {
      id:23,
      "Property Name": "Coastal Hillside Estate",
      Address: "762 Evergreen Terrace",
      Ownership: "Owner",
      "Submitted Date": "Aug 12, 2025",
      Status: "Approved",
    },
    {
      id:24,
      "Property Name": "Coastal Hillside Estate",
      Address: "762 Evergreen Terrace",
      Ownership: "Owner",
      "Submitted Date": "Aug 12, 2025",
      Status: "Approved",
    },
    {
      id:25,
      "Property Name": "Coastal Hillside Estate",
      Address: "762 Evergreen Terrace",
      Ownership: "Owner",
      "Submitted Date": "Aug 12, 2025",
      Status: "Approved",
    },
  ]);

  // Delete handlers for application data - matching Tracking component style
  const handleDeleteApplications = (selectedRows: TableRowData[]) => {
    // Find the actual data items by matching the display data to full data
    const idsToDelete = selectedRows.map(displayRow => {
      // Find the matching full data item by comparing properties (excluding id)
      const fullDataItem = filteredCertificationData.find(fullItem => {
        const { id, ...fullWithoutId } = fullItem;
        console.log(id);
        return JSON.stringify(fullWithoutId) === JSON.stringify(displayRow);
      });
      return fullDataItem?.id;
    }).filter(id => id !== undefined);

    // Remove the items from the main data
    const updatedData = allCertificationData.filter(item => !idsToDelete.includes(item.id));
    setAllCertificationData(updatedData);
    
    // Close modal and reset selected rows
    setIsModalOpen(false);
    setSelectedRows([]);
  };

  const handleDeleteSingleApplication = (row: TableRowData, index: number) => {
    // Find the actual item using the global index
    const globalIndex = startIndex + index;
    const itemToDelete = filteredCertificationData[globalIndex];
    
    if (itemToDelete) {
      // Remove the item from the main data
      const updatedData = allCertificationData.filter(item => item.id !== itemToDelete.id);
      setAllCertificationData(updatedData);
    }
    
    // Close modal and reset
    setIsModalOpen(false);
    setSingleRowToDelete(null);
  };

  // Functions to open modal for deletions with proper typing
  // const openDeleteModal = (selectedRows: TableRowData[]) => {
  //   setSelectedRows(selectedRows);
  //   setModalType('multiple');
  //   setIsModalOpen(true);
  // };

  // const openDeleteSingleModal = (row: TableRowData, index: number) => {
  //   setSingleRowToDelete({row, index});
  //   setModalType('single');
  //   setIsModalOpen(true);
  // };

  // Handle confirmation from modal
  const handleModalConfirm = () => {
    if (modalType === 'multiple' && selectedRows.length > 0) {
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

  // Filter + search logic
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

  // Transform data to exclude ID from display but keep it for navigation
  const displayData = useMemo(() => {
  return filteredCertificationData.map(({ id, ...rest }) => {
    console.log("ID:", id); // Use id here
    return rest;            // Still return data without id
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
  React.useEffect(() => {
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
    // Convert selected date to string format for filtering
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
          className="w-full bg-gradient-to-b placeholder:text-white/40 from-[#202020] to-[#101010] border rounded-xl text-white/40 px-4 py-3 text-sm border-[#404040] focus:border-[#EFFC76] focus:outline-none cursor-pointer"
          placeholder="Select date"
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
          className={`w-8 h-8 flex items-center justify-center rounded text-sm leading-[18px] p-[13px] transition-colors border cursor-pointer ${
            currentPage === i
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
          type='confirm' 
          title='Do you want to delete this application'
          onClose={() => {
            setIsModalOpen(false);
            setSelectedRows([]);
            setSingleRowToDelete(null);
          }} 
          isOpen={isModalOpen} 
          onConfirm={handleModalConfirm}
        />
      }

      <div className="bg-[#121315] rounded-lg relative z-[10] overflow-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between lg:items-center pt-5 px-7">
          <h2 className="text-white text-[16px] font-semibold leading-[20px]">
            Applications
          </h2>
          <div className="inline-flex flex-col-reverse sm:flex-row item-start sm:items-center pt-3 sm:pt-0 gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white/12 border rounded-lg text-white/40 placeholder-white/60 w-[204px] px-3 py-2 text-sm pl-8 border-none outline-none"
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
          </div>
        </div>

        {/* Table with delete functionality */}
        <div className="p-0 cursor-pointer">
          <Table
            data={paginatedData}
            control={tableControl}
            // showDeleteButton={true}
            // onDelete={openDeleteModal as DeleteRowHandler}
            // onDeleteSingle={openDeleteSingleModal as DeleteSingleRowHandler}
            showModal={true}
            clickable={true}
            onRowClick={(row: TableRowData, index: number) => {
              console.log('Clicked row:', row);
              // Get the original data with ID using the index
              const originalRow = filteredCertificationData[startIndex + index];
              window.location.href = `/dashboard/application/detail/${originalRow.id}`;
            }}
            modalTitle="Property Details"
          />
        </div>

        {/* Pagination - Always visible */}
      </div>
        <div className="flex justify-center mt-[20px]">
          <div className="flex items-center gap-2">
            {renderPaginationButtons()}
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
                {/* Ownership */}
                <div>
                  <label className="text-white text-sm font-medium mb-3 block">
                    Ownership
                  </label>
                  <div className="relative">
                    <select
                      value={certificationFilters.ownership}
                      onChange={(e) =>
                        setCertificationFilters((prev) => ({
                          ...prev,
                          ownership: e.target.value,
                        }))
                      }
                      className="w-full bg-gradient-to-b from-[#202020] to-[#101010] border rounded-xl text-white/40 px-4 py-3 text-sm border-[#404040] focus:border-[#EFFC76] focus:outline-none appearance-none"
                    >
                      <option className="text-black" value="">
                        Select ownership
                      </option>
                      {uniqueOwnerships.map((ownership) => (
                        <option
                          className="text-black"
                          key={ownership}
                          value={ownership}
                        >
                          {ownership}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Property */}
                <div>
                  <label className="text-white text-sm font-medium mb-3 block">
                    Property
                  </label>
                  <div className="relative">
                    <select
                      value={certificationFilters.property}
                      onChange={(e) =>
                        setCertificationFilters((prev) => ({
                          ...prev,
                          property: e.target.value,
                        }))
                      }
                      className="w-full bg-gradient-to-b from-[#202020] to-[#101010] border rounded-xl text-white/40 px-4 py-3 text-sm border-[#404040] focus:border-[#EFFC76] focus:outline-none appearance-none"
                    >
                      <option className="text-black" value="">
                        Select property
                      </option>
                      {uniqueProperties.map((property) => (
                        <option
                          className="text-black"
                          key={property}
                          value={property}
                        >
                          {property}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div>
                  <label className="text-white text-sm font-medium mb-3 block">
                    Status
                  </label>
                  <div className="relative">
                    <select
                      value={certificationFilters.status}
                      onChange={(e) =>
                        setCertificationFilters((prev) => ({
                          ...prev,
                          status: e.target.value,
                        }))
                      }
                      className="w-full bg-gradient-to-b from-[#202020] to-[#101010] border rounded-xl text-white/40 px-4 py-3 text-sm border-[#404040] focus:border-[#EFFC76] focus:outline-none appearance-none"
                    >
                      <option className="text-black" value="">
                        Select status
                      </option>
                      {uniqueStatuses.map((status) => (
                        <option
                          className="text-black"
                          key={status}
                          value={status}
                        >
                          {status}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
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
              className="w-full bg-[#EFFC76] cursor-pointer text-black font-semibold py-4 rounded-xl hover:bg-[#e8f566] transition-colors text-sm"
            >
              Apply Filter
            </button>
          </div>
        </div>
      </div>
    </>
  );
}