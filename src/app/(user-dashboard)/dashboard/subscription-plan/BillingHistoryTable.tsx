"use client";
import React, { useMemo, useState } from "react";
import Image from "next/image";
import { Table } from "@/app/shared/tables/Tables";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Modal } from "@/app/shared/Modal";

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
        className="w-full bg-gradient-to-b placeholder:text-white/40 from-[#202020] to-[#101010] border rounded-xl text-white/40 px-4 py-3 text-sm border-[#404040] focus:border-[#EFFC76] focus:outline-none cursor-pointer"
        placeholder="Select date"
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
        // <Modal
        //   type="confirm"
        //   title={getModalTitle()}
        //   onClose={() => {
        //     setIsModalOpen(false);
        //     setSelectedRows(new Set());
        //     setSingleRowToDelete(null);
        //   }}
        //   isOpen={isModalOpen}
        //   onConfirm={handleModalConfirm}
        // />
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedRows(new Set()); // ✅ Fixed: Use new Set() instead of []
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
        <div className=" bg-[#121315] rounded-lg relative z-[10] overflow-hidden  ">
          {/* Header */}
          <div className="flex flex-col h-full sm:flex-row justify-between lg:items-center pt-5 px-5 ">
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

          {/* Table */}
          <div className="p-0 max-w-none ">
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
              <div>
                <label className="text-white text-sm font-medium mb-3 block">
                  Plan Name
                </label>
                <select
                  value={certificationFilters.planName}
                  onChange={(e) =>
                    setCertificationFilters((prev) => ({
                      ...prev,
                      planName: e.target.value,
                    }))
                  }
                  className="w-full bg-gradient-to-b from-[#202020] to-[#101010] border rounded-xl text-white/40 px-4 py-3 text-sm border-[#404040] focus:border-[#EFFC76] focus:outline-none appearance-none"
                >
                  <option className="text-black" value="">
                    Select plan
                  </option>
                  {uniquePlanNames.map((plan) => (
                    <option key={plan} className="text-black" value={plan}>
                      {plan}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="text-white text-sm font-medium mb-3 block">
                  Status
                </label>
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
                    <option key={status} className="text-black" value={status}>
                      {status}
                    </option>
                  ))}
                </select>
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