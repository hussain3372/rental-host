"use client";
import React, { useMemo, useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Table } from "@/app/shared/tables/Tables";
import FilterDrawer from "../../../shared/tables/Filter";
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
  const [singleRowToDelete, setSingleRowToDelete] = useState<{
    row: Record<string, string>;
    id: number;
  } | null>(null);
  const [modalType, setModalType] = useState<"single" | "multiple">("multiple");

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

  const [allCertificationData, setAllCertificationData] = useState<
    CertificationData[]
  >([
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

  // Handle select all for ALL filtered data
  const handleSelectAll = (checked: boolean) => {
    const newSelected = new Set(selectedRows);

    if (checked) {
      // Add ALL filtered data IDs
      filteredCertificationData.forEach((item) => newSelected.add(item.id));
    } else {
      // Remove ALL filtered data IDs
      filteredCertificationData.forEach((item) => newSelected.delete(item.id));
    }

    setSelectedRows(newSelected);
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    const newSelected = new Set(selectedRows);
    const numericId = parseInt(id);

    if (checked) {
      newSelected.add(numericId);
    } else {
      newSelected.delete(numericId);
    }
    setSelectedRows(newSelected);
  };

  // Fix selection state calculations for ALL filtered data
  const isAllDisplayedSelected = useMemo(() => {
    return (
      filteredCertificationData.length > 0 &&
      filteredCertificationData.every((item) => selectedRows.has(item.id))
    );
  }, [filteredCertificationData, selectedRows]);

  const isSomeDisplayedSelected = useMemo(() => {
    return (
      filteredCertificationData.some((item) => selectedRows.has(item.id)) &&
      !isAllDisplayedSelected
    );
  }, [filteredCertificationData, selectedRows, isAllDisplayedSelected]);

  // Delete handlers
  const handleDeleteApplications = (selectedRowIds: Set<number>) => {
    const idsToDelete = Array.from(selectedRowIds);

    const updatedData = allCertificationData.filter(
      (item) => !idsToDelete.includes(item.id)
    );
    setAllCertificationData(updatedData);
    setIsModalOpen(false);
    setSelectedRows(new Set());
  };

  const handleDeleteSingleApplication = (
    row: Record<string, string>,
    id: number
  ) => {
    const updatedData = allCertificationData.filter((item) => item.id !== id);
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
    setModalType("single");
    setIsModalOpen(true);
  };

  const handleDeleteSelected = () => {
    if (selectedRows.size > 0) {
      setModalType("multiple");
      setIsModalOpen(true);
    }
  };

  const handleModalConfirm = () => {
    if (modalType === "multiple" && selectedRows.size > 0) {
      handleDeleteApplications(selectedRows);
    } else if (modalType === "single" && singleRowToDelete) {
      handleDeleteSingleApplication(
        singleRowToDelete.row,
        singleRowToDelete.id
      );
    }
  };

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

  const displayData = useMemo(() => {
    return filteredCertificationData.map(({ id, ...rest }) => {
      return rest;
    });
  }, [filteredCertificationData]);

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
      setCertificationFilters((prev) => ({
        ...prev,
        submittedDate: submittedDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      }));
    }

    setIsFilterOpen(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const dropdownItems = [
    {
      label: "View Details",
      onClick: (row: Record<string, string>, index: number) => {
        const globalIndex = (currentPage - 1) * itemsPerPage + index;
        const originalRow = filteredCertificationData[globalIndex];
        window.location.href = `/dashboard/application/detail/${originalRow.id}`;
      },
    },
    {
      label: "Delete Application",
      onClick: (row: Record<string, string>, index: number) => {
        const globalIndex = (currentPage - 1) * itemsPerPage + index;
        const originalRow = filteredCertificationData[globalIndex];
        openDeleteSingleModal(row, originalRow.id);
      },
    },
  ];

  // Custom input component for date picker
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
        className="w-full bg-gradient-to-b from-[#202020] to-[#101010] border rounded-xl px-4 py-3 text-sm border-[#404040] focus:border-[#EFFC76] focus:outline-none cursor-pointer text-white placeholder-white/40"
        placeholder="Select date"
      />
      <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
        <Image
          src="/images/calender.svg"
          alt="Pick date"
          width={20}
          height={20}
        />
      </div>
    </div>
  ));

  CustomDateInput.displayName = "CustomDateInput";

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
        <Table
          data={displayData}
          title="Applications"
          control={tableControl}
          showDeleteButton={true}
          onDeleteSingle={(row, index) => {
            const globalIndex = (currentPage - 1) * itemsPerPage + index;
            const originalRow = filteredCertificationData[globalIndex];
            openDeleteSingleModal(row, originalRow.id);
          }}
          showPagination={true}
          clickable={true}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          onSelectAll={handleSelectAll}
          onSelectRow={handleSelectRow}
          isAllSelected={isAllDisplayedSelected}
          isSomeSelected={isSomeDisplayedSelected}
          rowIds={filteredCertificationData.map((item) => item.id.toString())}
          dropdownItems={dropdownItems}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          itemsPerPage={itemsPerPage}
          totalItems={filteredCertificationData.length}
          showFilter={true}
          onFilterToggle={setIsFilterOpen}
          onDeleteAll={handleDeleteSelected}
          isDeleteAllDisabled={selectedRows.size === 0 || selectedRows.size < displayData.length}
        />
      </div>

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
        onFilterChange={(filters) => {
          setCertificationFilters(prev => ({
            ...prev,
            ...filters
          }));
        }}
        dropdownStates={{
          ownership: showOwnershipDropdown,
          property: showPropertyDropdown,
          status: showStatusDropdown,
        }}
        onDropdownToggle={(key, value) => {
          if (key === "ownership") setShowOwnershipDropdown(value);
          if (key === "property") setShowPropertyDropdown(value);
          if (key === "status") setShowStatusDropdown(value);
        }}
        fields={[
          {
            label: "Ownership",
            key: "ownership",
            type: "dropdown",
            placeholder: "Select ownership",
            options: uniqueOwnerships,
          },
          {
            label: "Property",
            key: "property",
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
            label: "Submitted date",
            key: "submittedDate",
            type: "date",
            placeholder: "Select date",
          },
        ]}
      />
    </>
  );
}