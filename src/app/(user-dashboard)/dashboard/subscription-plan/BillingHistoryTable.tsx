"use client";
import React, { useMemo, useState } from "react";
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
  "Plan Name": string;
  Amount: string;
  "Purchase Date": string;
  "End Date": string;
  Status: string;
  [key: string]: unknown;
}

export default function Applications() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [selectedRowsModal, setSelectedRowsModal] = useState<CertificationData[]>([]);
  const [singleRowToDelete, setSingleRowToDelete] = useState<{ row: CertificationData, index: number } | null>(null);
  const [modalType, setModalType] = useState<'single' | 'multiple'>('multiple');

  const [certificationFilters, setCertificationFilters] = useState({
    planName: "",
    status: "",
    purchaseDate: "",
    endDate: "",
  });

  // State for date pickers
  const [purchaseDate, setPurchaseDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [certificationData, setCertificationData] = useState<CertificationData[]>([
    {
      "Plan Name": "Starter",
      Amount: "$12",
      "Purchase Date": "Aug 12, 2025",
      "End Date": "Aug 12, 2025",
      Status: "Active",
    },
    {
      "Plan Name": "Professional",
      Amount: "$24",
      "Purchase Date": "Aug 12, 2025",
      "End Date": "Aug 12, 2025",
      Status: "Inactive",
    },
    {
      "Plan Name": "Enterprise",
      Amount: "$200",
      "Purchase Date": "Aug 12, 2025",
      "End Date": "Aug 12, 2025",
      Status: "Active",
    },
    {
      "Plan Name": "Starter",
      Amount: "$12",
      "Purchase Date": "Aug 12, 2025",
      "End Date": "Aug 12, 2025",
      Status: "Inactive",
    },
    {
      "Plan Name": "Enterprise",
      Amount: "$200",
      "Purchase Date": "Aug 12, 2025",
      "End Date": "Aug 12, 2025",
      Status: "Active",
    },
  ]);

  // Delete handlers
  const handleDeleteCertifications = (selectedRows: CertificationData[]) => {
    const updatedData = certificationData.filter(item => !selectedRows.includes(item));
    setCertificationData(updatedData);
    setIsModalOpen(false);
    setSelectedRowsModal([]);
    setSelectedRows(new Set());
  };
const [planDropdownOpen, setPlanDropdownOpen] = useState(false);
const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);

  const handleDeleteSingleCertification = (row: CertificationData, index: number) => {
    const updatedData = certificationData.filter((_, idx) => idx !== index);
    setCertificationData(updatedData);
    setIsModalOpen(false);
    setSingleRowToDelete(null);

    const newSelected = new Set(selectedRows);
    newSelected.delete(index);
    setSelectedRows(newSelected);
  };

  // Function to open modal for multiple deletions
  const openDeleteModal = (selectedRowsData: CertificationData[]) => {
    setSelectedRowsModal(selectedRowsData);
    setModalType('multiple');
    setIsModalOpen(true);
  };

  // Function to open modal for single deletion
  const openDeleteSingleModal = (row: CertificationData, index: number) => {
    setSingleRowToDelete({ row, index });
    setModalType('single');
    setIsModalOpen(true);
  };

  // Handle confirmation from modal
  const handleModalConfirm = () => {
    if (modalType === 'multiple' && selectedRowsModal.length > 0) {
      handleDeleteCertifications(selectedRowsModal);
    } else if (modalType === 'single' && singleRowToDelete) {
      handleDeleteSingleCertification(singleRowToDelete.row, singleRowToDelete.index);
    }
  };

  // Handle delete selected button click
  const handleDeleteSelected = () => {
    if (selectedRows.size > 0) {
      const selectedData = Array.from(selectedRows).map(index => certificationData[index]);
      openDeleteModal(selectedData);
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
    hoverBgColor: "#2D2D2D",
    hoverTextColor: "#ffffff",
    fontSize: 13,
    textAlign: "left" as const,
    rowBorder: false,
    headerBorder: true,
    borderColor: "#374151",
    highlightRowOnHover: true,
    columns: [
      "Plan Name",
      "Amount",
      "Purchase Date",
      "End Date",
      "Status",
    ],
  };

  // ✅ Unique dropdown values
  const uniquePlanNames = [
    ...new Set(certificationData.map((item) => item["Plan Name"])),
  ];
  const uniqueStatuses = [
    ...new Set(certificationData.map((item) => item["Status"])),
  ];

  // ✅ Filter + search logic
  const filteredCertificationData = useMemo(() => {
    let filtered = certificationData;

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item["Plan Name"]
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          item["Amount"].toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (certificationFilters.planName) {
      filtered = filtered.filter(
        (item) => item["Plan Name"] === certificationFilters.planName
      );
    }
    if (certificationFilters.status) {
      filtered = filtered.filter(
        (item) => item["Status"] === certificationFilters.status
      );
    }
    if (certificationFilters.purchaseDate) {
      filtered = filtered.filter(
        (item) => item["Purchase Date"] === certificationFilters.purchaseDate
      );
    }
    if (certificationFilters.endDate) {
      filtered = filtered.filter(
        (item) => item["End Date"] === certificationFilters.endDate
      );
    }
    return filtered;
  }, [searchTerm, certificationFilters, certificationData]);

  // Get modal title based on deletion type
  // const getModalTitle = () => {
  //   if (modalType === 'multiple') {
  //     return `Delete ${selectedRowsModal.length} selected billing item${selectedRowsModal.length > 1 ? 's' : ''}?`;
  //   } else {
  //     return 'Delete this billing record?';
  //   }
  // };

  // Reset filters
  const handleResetFilter = () => {
    setCertificationFilters({
      planName: "",
      status: "",
      purchaseDate: "",
      endDate: "",
    });
    setSearchTerm("");
    setPurchaseDate(null);
    setEndDate(null);
  };

  // Apply filter
  const handleApplyFilter = () => {
    if (purchaseDate) {
      setCertificationFilters((prev) => ({
        ...prev,
        purchaseDate: purchaseDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      }));
    }

    if (endDate) {
      setCertificationFilters((prev) => ({
        ...prev,
        endDate: endDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      }));
    }

    setIsFilterOpen(false);
  };

  // Custom Date Input
  const CustomDateInput = React.forwardRef<
    HTMLInputElement,
    CustomDateInputProps
  >(({ value, onClick }, ref) => (
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
  `}        placeholder="Select date"
      />
      <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
        <Image src="/images/calender.svg" alt="select date" width={20} height={20} />
      </div>
    </div>
  ));
  CustomDateInput.displayName = "CustomDateInput";

  return (
    <>
      {/* Delete Confirmation Modal */}
      {isModalOpen && (
      
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedRows(new Set()); 
            setSingleRowToDelete(null);
          }}
          onConfirm={handleModalConfirm}
          title="Confirm  Deletion"
          description="Deleting this history means it will no longer appear in your requests."
          image="/images/delete-modal.png"
          confirmText="Delete"
        //   cancelText="Cancel"
        />
      )}
       <div className="bg-[#121315] rounded-lg relative z-[10] overflow-hidden">
  {/* Header */}
  <div className="flex flex-col h-full sm:flex-row justify-between lg:items-center pt-5 px-5">
    <h2 className="text-white text-[16px] font-semibold leading-[20px]">
      Billing History
    </h2>
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

  <div className="p-0 max-w-none">
    <div className="h-[400px]  overflow-auto  scrollbar-hide"> 
      <Table
        data={filteredCertificationData}
        control={tableControl}
        showDeleteButton={true}
        onDelete={openDeleteModal}
        onDeleteSingle={openDeleteSingleModal}
        showModal={false}
        modalTitle="Billing Details"
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        dropdownItems={[
          {
            label: "Delete History",
            onClick: (row, index) => openDeleteSingleModal(row, index),
          },
        ]}
      />
    </div>
  </div>
</div>
      {/* Overlay */}
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
              <h3 className="text-white text-[20px] font-medium">Apply Filter</h3>
              <button
                onClick={handleResetFilter}
                className="text-[#EFFC76] cursor-pointer text-[18px] font-medium underline"
              >
                Reset
              </button>
            </div>

            <div className="px-6 space-y-[20px]">
              {/* Plan Name */}
             <div className="relative">
  <label className="text-white text-sm font-medium mb-3 block">
    Plan Name
  </label>
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
    onClick={() => setPlanDropdownOpen(!planDropdownOpen)}
  >
    {certificationFilters.planName || "Select plan"}
    <Image
      src="/images/dropdown.svg"
      alt="dropdown"
      width={16}
      height={16}
                          className="absolute right-3 top-1/2 transform translate-y-3 cursor-pointer"

    />
  </div>

  {planDropdownOpen && (
    <div className="absolute z-50 w-full mt-1">
      <Dropdown
        items={uniquePlanNames.map((plan) => ({
          label: plan,
          onClick: () => {
            setCertificationFilters((prev) => ({
              ...prev,
              planName: plan,
            }));
            setPlanDropdownOpen(false);
          },
        }))}
      />
    </div>
  )}
</div>


              {/* Status */}
             <div className="relative">
  <label className="text-white text-sm font-medium mb-3 block">
    Status
  </label>
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
                                className="absolute right-3 top-1/2 transform translate-y-3 cursor-pointer"

    />
  </div>

  {statusDropdownOpen && (
    <div className="absolute z-50 w-full mt-1">
      <Dropdown
        items={uniqueStatuses.map((status) => ({
          label: status,
          onClick: () => {
            setCertificationFilters((prev) => ({
              ...prev,
              status: status,
            }));
            setStatusDropdownOpen(false);
          },
        }))}
      />
    </div>
  )}
</div>


              {/* Purchase Date */}
              <div>
                <label className="text-white text-sm font-medium mb-3 block">
                  Purchase Date
                </label>
                <DatePicker
                  selected={purchaseDate}
                  onChange={(date: Date | null) => setPurchaseDate(date)}
                  customInput={<CustomDateInput />}
                  dateFormat="MMM d, yyyy"
                />
              </div>

              {/* End Date */}
              <div>
                <label className="text-white text-sm font-medium mb-3 block">
                  End Date
                </label>
                <DatePicker
                  selected={endDate}
                  onChange={(date: Date | null) => setEndDate(date)}
                  customInput={<CustomDateInput />}
                  dateFormat="MMM d, yyyy"
                />
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