"use client";
import React, { useMemo, useState, useEffect } from "react";
import { Table } from "@/app/admin/tables-essentials/Tables";
import { Modal } from "@/app/shared/Modal";
import FilterDrawer from "../../tables-essentials/Filter";

interface CertificationData {
  id: number;
  "Application ID" :string
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [singleRowToDelete, setSingleRowToDelete] = useState<{
    row: Record<string, string>;
    id: number;
  } | null>(null);
  const [modalType, setModalType] = useState<"single" | "multiple">("multiple");

  const [showOwnershipDropdown, setShowOwnershipDropdown] = useState(false);
  const [showPropertyDropdown, setShowPropertyDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  const [certificationFilters, setCertificationFilters] = useState({
    ownership: "",
    property: "",
    status: "",
    submittedDate: "",
  });

  const [submittedDate, setSubmittedDate] = useState<Date | null>(null);

  const [allCertificationData, setAllCertificationData] = useState<CertificationData[]>([
    {
      id: 1,
      "Application ID" :"TAQ - 65432",
      "Property Name": "Coastal Hillside Estate",
      Address: "762 Evergreen Terrace",
      Ownership: "Owner",
      "Submitted Date": "Aug 12, 2025",
      Status: "Approved",
    },
    {
      id: 2,
            "Application ID" :"TAQ - 65432",

      "Property Name": "Coastal Hillside Estate",
      Address: "762 Evergreen Terrace",
      Ownership: "Manager",
      "Submitted Date": "Aug 12, 2025",
      Status: "Pending",
    },
    {
      id: 3,
            "Application ID" :"TAQ - 65432",

      "Property Name": "Coastal Hillside Estate",
      Address: "762 Evergreen Terrace",
      Ownership: "Owner",
      "Submitted Date": "Aug 12, 2025",
      Status: "Approved",
    },
    {
      id: 4,
            "Application ID" :"TAQ - 65432",

      "Property Name": "Coastal Hillside Estate",
      Address: "762 Evergreen Terrace",
      Ownership: "Manager",
      "Submitted Date": "Aug 12, 2025",
      Status: "Pending",
    },
    {
      id: 5,
            "Application ID" :"TAQ - 65432",

      "Property Name": "Coastal Hillside Estate",
      Address: "762 Evergreen Terrace",
      Ownership: "Agent",
      "Submitted Date": "Aug 12, 2025",
      Status: "Rejected",
    },
    {
      id: 6,
            "Application ID" :"TAQ - 65432",

      "Property Name": "Coastal Hillside Estate",
      Address: "762 Evergreen Terrace",
      Ownership: "Agent",
      "Submitted Date": "Aug 12, 2025",
      Status: "Approved",
    },
    {
      id: 7,
            "Application ID" :"TAQ - 65432",

      "Property Name": "Mountain View Complex",
      Address: "123 Highland Road",
      Ownership: "Owner",
      "Submitted Date": "Sep 15, 2025",
      Status: "Pending",
    },
    {
      id: 8,
            "Application ID" :"TAQ - 65432",

      "Property Name": "Skyline Residences",
      Address: "456 Tower Street",
      Ownership: "Manager",
      "Submitted Date": "Oct 1, 2025",
      Status: "Approved",
    },
    {
      id: 9,
            "Application ID" :"TAQ - 65432",

      "Property Name": "Coastal Hillside Estate",
      Address: "762 Evergreen Terrace",
      Ownership: "Owner",
      "Submitted Date": "Aug 12, 2025",
      Status: "Approved",
    },
    {
      id: 10,
            "Application ID" :"TAQ - 65432",

      "Property Name": "Coastal Hillside Estate",
      Address: "762 Evergreen Terrace",
      Ownership: "Manager",
      "Submitted Date": "Aug 12, 2025",
      Status: "Pending",
    },
    {
      id: 11,
            "Application ID" :"TAQ - 65432",

      "Property Name": "Coastal Hillside Estate",
      Address: "762 Evergreen Terrace",
      Ownership: "Agent",
      "Submitted Date": "Aug 12, 2025",
      Status: "Rejected",
    },
    {
      id: 12,
            "Application ID" :"TAQ - 65432",

      "Property Name": "Coastal Hillside Estate",
      Address: "762 Evergreen Terrace",
      Ownership: "Agent",
      "Submitted Date": "Aug 12, 2025",
      Status: "Approved",
    },
    {
      id: 13,
            "Application ID" :"TAQ - 65432",

      "Property Name": "Mountain View Complex",
      Address: "123 Highland Road",
      Ownership: "Owner",
      "Submitted Date": "Sep 15, 2025",
      Status: "Pending",
    },

  ]);

  const filteredCertificationData = useMemo(() => {
    let filtered = allCertificationData;

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item["Property Name"].toLowerCase().includes(searchTerm.toLowerCase()) ||
          item["Address"].toLowerCase().includes(searchTerm.toLowerCase()) ||
          item["Ownership"].toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (certificationFilters.property) {
      filtered = filtered.filter((item) => item["Property Name"] === certificationFilters.property);
    }

    if (certificationFilters.status) {
      filtered = filtered.filter((item) => item["Status"] === certificationFilters.status);
    }

    if (certificationFilters.ownership) {
      filtered = filtered.filter((item) => item["Ownership"] === certificationFilters.ownership);
    }

    if (certificationFilters.submittedDate) {
      filtered = filtered.filter((item) =>
        item["Submitted Date"].includes(certificationFilters.submittedDate)
      );
    }

    return filtered;
  }, [searchTerm, certificationFilters, allCertificationData]);

  const handleSelectAll = (checked: boolean) => {
    const newSelected = new Set(selectedRows);
    if (checked) {
      filteredCertificationData.forEach((item) => newSelected.add(item.id));
    } else {
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

  const handleDeleteApplications = (selectedRowIds: Set<number>) => {
    const idsToDelete = Array.from(selectedRowIds);
    const updatedData = allCertificationData.filter((item) => !idsToDelete.includes(item.id));
    setAllCertificationData(updatedData);
    setIsModalOpen(false);
    setSelectedRows(new Set());
  };

  const handleDeleteSingleApplication = (row: Record<string, string>, id: number) => {
    const updatedData = allCertificationData.filter((item) => item.id !== id);
    setAllCertificationData(updatedData);
    setIsModalOpen(false);
    setSingleRowToDelete(null);

    const newSelected = new Set(selectedRows);
    newSelected.delete(id);
    setSelectedRows(newSelected);

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
      handleDeleteSingleApplication(singleRowToDelete.row, singleRowToDelete.id);
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

  const uniqueProperties = [...new Set(allCertificationData.map((item) => item["Property Name"]))];
  const uniqueStatuses = [...new Set(allCertificationData.map((item) => item["Status"]))];
  const uniqueOwnerships = [...new Set(allCertificationData.map((item) => item["Ownership"]))];

  const displayData = useMemo(() => {
    return filteredCertificationData.map(({ id, ...rest }) => {
      console.log(id);
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
        window.location.href = `/admin/dashboard/application/detail/${originalRow.id}`;
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

      <div>
        <h2 className="font-semibold text-[20px] leading-[20px]">Review Applications</h2>
        <p className="font-regular text-[16px] leading-5 mb-[22px] pt-2 text-[#FFFFFF99]">
          Review and manage all submitted property certification applications in one place.
        </p>
      </div>

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
          // showModal={true}
          showPagination={true}
          clickable={true}
          // modalTitle="Property Details"
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
          // isFilterOpen={isFilterOpen}
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
          // dateValue={submittedDate}
          // onDateChange={setSubmittedDate}
        dropdownStates={{
          ownership: showOwnershipDropdown,
          status: showStatusDropdown,
        }}
        onDropdownToggle={(key, value) => {
          if (key === "ownership") setShowOwnershipDropdown(value);
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
            label: "Status",
            key: "status",
            type: "dropdown",
            placeholder: "Select status",
            options: uniqueStatuses,
          },
          {
            label: "Submitted On",
            key: "submittedDate",
            type: "date",
            placeholder: "Select date",
          },
        ]}
      />
    </>
  );
}