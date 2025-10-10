"use client";
import React, { useMemo, useState } from "react";
import { Table } from "@/app/shared/tables/Tables";
import { Modal } from "@/app/shared/Modal";
import FilterDrawer from "@/app/shared/tables/Filter";

interface CertificationData {
  id: number;
  "Plan Name": string;
  Amount: string;
  "Purchase Date": string;
  "End Date": string;
  Status: string;
}

export default function BillingHistory() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [singleRowToDelete, setSingleRowToDelete] = useState<{ 
    row: Record<string, string>, 
    id: number 
  } | null>(null);
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

  // Dropdown states
  const [planDropdownOpen, setPlanDropdownOpen] = useState(false);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);

  const [certificationData, setCertificationData] = useState<CertificationData[]>([
    {
      id: 1,
      "Plan Name": "Starter",
      Amount: "$12",
      "Purchase Date": "Aug 12, 2025",
      "End Date": "Aug 12, 2025",
      Status: "Active",
    },
    {
      id: 2,
      "Plan Name": "Professional",
      Amount: "$24",
      "Purchase Date": "Aug 12, 2025",
      "End Date": "Aug 12, 2025",
      Status: "Inactive",
    },
    {
      id: 3,
      "Plan Name": "Enterprise",
      Amount: "$200",
      "Purchase Date": "Aug 12, 2025",
      "End Date": "Aug 12, 2025",
      Status: "Active",
    },
    {
      id: 4,
      "Plan Name": "Starter",
      Amount: "$12",
      "Purchase Date": "Aug 12, 2025",
      "End Date": "Aug 12, 2025",
      Status: "Inactive",
    },
    {
      id: 5,
      "Plan Name": "Enterprise",
      Amount: "$200",
      "Purchase Date": "Aug 12, 2025",
      "End Date": "Aug 12, 2025",
      Status: "Active",
    },
  ]);

  // Unique dropdown values
  const uniquePlanNames = [
    ...new Set(certificationData.map((item) => item["Plan Name"])),
  ];
  const uniqueStatuses = [
    ...new Set(certificationData.map((item) => item["Status"])),
  ];

  // Filter + search logic
  const filteredCertificationData = useMemo(() => {
    let filtered = certificationData;

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item["Plan Name"].toLowerCase().includes(searchTerm.toLowerCase()) ||
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

  // Delete handlers
  const handleDeleteCertifications = (selectedRowIds: Set<number>) => {
    const idsToDelete = Array.from(selectedRowIds);
    const updatedData = certificationData.filter(item => !idsToDelete.includes(item.id));
    setCertificationData(updatedData);
    setIsModalOpen(false);
    setSelectedRows(new Set());
  };

  const handleDeleteSingleCertification = (row: Record<string, string>, id: number) => {
    const updatedData = certificationData.filter(item => item.id !== id);
    setCertificationData(updatedData);
    setIsModalOpen(false);
    setSingleRowToDelete(null);

    const newSelected = new Set(selectedRows);
    newSelected.delete(id);
    setSelectedRows(newSelected);
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
      handleDeleteCertifications(selectedRows);
    } else if (modalType === 'single' && singleRowToDelete) {
      handleDeleteSingleCertification(singleRowToDelete.row, singleRowToDelete.id);
    }
  };

  // Selection handlers
  const handleSelectAll = (checked: boolean) => {
    const newSelected = new Set(selectedRows);

    if (checked) {
      filteredCertificationData.forEach(item => newSelected.add(item.id));
    } else {
      filteredCertificationData.forEach(item => newSelected.delete(item.id));
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

  // Selection state calculations
  const isAllDisplayedSelected = useMemo(() => {
    return filteredCertificationData.length > 0 &&
      filteredCertificationData.every(item => selectedRows.has(item.id));
  }, [filteredCertificationData, selectedRows]);

  const isSomeDisplayedSelected = useMemo(() => {
    return filteredCertificationData.some(item => selectedRows.has(item.id)) &&
      !isAllDisplayedSelected;
  }, [filteredCertificationData, selectedRows, isAllDisplayedSelected]);

  // Transform data to exclude ID from display and ensure all values are strings
  const displayData = useMemo((): Record<string, string>[] => {
    return filteredCertificationData.map(({ id, ...rest }) => {
      const stringRow: Record<string, string> = {};
      Object.entries(rest).forEach(([key, value]) => {
        stringRow[key] = String(value);
              console.log(id);

      });
      return stringRow;
    });
  }, [filteredCertificationData]);

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
  };

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

  const dropdownItems = [
    {
      label: "View Details",
      onClick: (row: Record<string, string>, index: number) => {
        const originalRow = filteredCertificationData[index];
        window.location.href = `/dashboard/application/detail/${originalRow.id}`;
      },
    },
    {
      label: "Delete History",
      onClick: (row: Record<string, string>, index: number) => {
        const originalRow = filteredCertificationData[index];
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
          title="Confirm Deletion"
          description="Deleting this history means it will no longer appear in your requests."
          image="/images/delete-modal.png"
          confirmText="Delete"
        />
      )}

      <div className="flex flex-col justify-between">
        <Table
          data={displayData}
          title="Billing History"
          control={tableControl}
          showDeleteButton={true}
          onDeleteSingle={(row, index) => {
            const originalRow = filteredCertificationData[index];
            openDeleteSingleModal(row, originalRow.id);
          }}
          showPagination={false} // No pagination for billing history
          clickable={true}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          onSelectAll={handleSelectAll}
          onSelectRow={handleSelectRow}
          isAllSelected={isAllDisplayedSelected}
          isSomeSelected={isSomeDisplayedSelected}
          rowIds={filteredCertificationData.map(item => item.id.toString())}
          dropdownItems={dropdownItems}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
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
        description="Refine listings to find the right billing history faster."
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
          planName: planDropdownOpen,
          status: statusDropdownOpen,
        }}
        onDropdownToggle={(key, value) => {
          if (key === "planName") setPlanDropdownOpen(value);
          if (key === "status") setStatusDropdownOpen(value);
        }}
        fields={[
          {
            label: "Plan Name",
            key: "planName",
            type: "dropdown",
            placeholder: "Select plan",
            options: uniquePlanNames,
          },
          {
            label: "Status",
            key: "status",
            type: "dropdown",
            placeholder: "Select status",
            options: uniqueStatuses,
          },
          {
            label: "Purchase date",
            key: "purchaseDate",
            type: "date",
            placeholder: "Select date",
          },
          {
            label: "End date",
            key: "endDate",
            type: "date",
            placeholder: "Select date",
          },
        ]}
      />
    </>
  );
}