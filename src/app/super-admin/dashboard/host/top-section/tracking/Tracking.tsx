"use client";
import React, { useMemo, useState } from "react";
import { Table } from "@/app/admin/tables-essentials/Tables";
import { Modal } from "@/app/shared/Modal";
import FilterDrawer from "@/app/admin/tables-essentials/Filter";

interface CertificationData {
  id: number;
  "Admin Name": string;
  "Email": string;
  "Properties Verified": string;
  "Pending Applications": string;
  "Rejected Applications": string;
  Status: string;
}

export default function Applications() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
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
    adminName: "",
    email: "",
    propertiesVerified: "",
    status: "",
  });

  const [allCertificationData, setAllCertificationData] = useState<CertificationData[]>([
    {
      id: 1,
      "Admin Name": "Sarah Kim",
      "Email": "jsarah@gmail.com",
      "Properties Verified": "45",
      "Pending Applications": "12",
      "Rejected Applications": "3",
      Status: "Active",
    },
    {
      id: 2,
      "Admin Name": "Sarah Kim",
      "Email": "sarah@gmail.com",
      "Properties Verified": "28",
      "Pending Applications": "8",
      "Rejected Applications": "5",
      Status: "Suspended",
    },
    {
      id: 3,
      "Admin Name": "Sarah Kim",
      "Email": "sarah@gmail.com",
      "Properties Verified": "67",
      "Pending Applications": "15",
      "Rejected Applications": "2",
      Status: "Active",
    },
    {
      id: 4,
      "Admin Name": "Sarah Kim",
      "Email": "sarah@gmail.com",
      "Properties Verified": "32",
      "Pending Applications": "6",
      "Rejected Applications": "7",
      Status: "Active",
    },
    {
      id: 5,
      "Admin Name": "Sarah Kim",
      "Email": "sarah@gmail.com",
      "Properties Verified": "32",
      "Pending Applications": "6",
      "Rejected Applications": "7",
      Status: "Active",
    },
    
  ]);

  // ✅ Filtering logic
  const filteredCertificationData = useMemo(() => {
    let filtered = allCertificationData;

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item["Admin Name"].toLowerCase().includes(searchTerm.toLowerCase()) ||
          item["Email"].toLowerCase().includes(searchTerm.toLowerCase()) ||
          item["Properties Verified"].toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (certificationFilters.adminName) {
      filtered = filtered.filter(
        (item) => item["Admin Name"] === certificationFilters.adminName
      );
    }

    if (certificationFilters.email) {
      filtered = filtered.filter(
        (item) => item["Email"] === certificationFilters.email
      );
    }

    if (certificationFilters.status) {
      filtered = filtered.filter(
        (item) => item["Status"] === certificationFilters.status
      );
    }

    if (certificationFilters.propertiesVerified) {
      filtered = filtered.filter(
        (item) => item["Properties Verified"] === certificationFilters.propertiesVerified
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

    const newSelected = new Set(selectedRows);
    newSelected.delete(id);
    setSelectedRows(newSelected);
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

  const uniqueAdminNames = [
    ...new Set(allCertificationData.map((item) => item["Admin Name"])),
  ];
  const uniqueEmails = [
    ...new Set(allCertificationData.map((item) => item["Email"])),
  ];
  const uniqueStatuses = [
    ...new Set(allCertificationData.map((item) => item["Status"])),
  ];
  const uniquePropertiesVerified = [
    ...new Set(allCertificationData.map((item) => item["Properties Verified"])),
  ];

  const displayData = useMemo(() => {
    return filteredCertificationData.map(({ id: _id, ...rest }) => rest); // eslint-disable-line @typescript-eslint/no-unused-vars
  }, [filteredCertificationData]);

  const handleResetFilter = () => {
    setCertificationFilters({
      adminName: "",
      email: "",
      propertiesVerified: "",
      status: "",
    });
    setSearchTerm("");
  };

  const handleApplyFilter = () => {
    setIsFilterOpen(false);
  };

  const dropdownItems = [
    {
      label: "View Details",
      onClick: (row: Record<string, string>, index: number) => {
        const originalRow = filteredCertificationData[index];
        window.location.href = `/admin/dashboard/application/detail/${originalRow.id}`;
      },
    },
    {
      label: "Delete Application",
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
          title="Confirm Admin Deletion"
          description="Deleting this admin means they will no longer have access to the system."
          image="/images/delete-modal.png"
          confirmText="Delete"
        />
      )}

      <div className="flex flex-col justify-between pt-5">
        <Table
          data={displayData}
          title="Registered Admins"
          control={tableControl}
          showDeleteButton={true}
          onDeleteSingle={(row, index) => {
            const originalRow = filteredCertificationData[index];
            openDeleteSingleModal(row, originalRow.id);
          }}
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
          totalItems={filteredCertificationData.length}
          showFilter={true}
          onFilterToggle={setIsFilterOpen}
          onDeleteAll={handleDeleteSelected}
          isDeleteAllDisabled={
            selectedRows.size === 0 || selectedRows.size < displayData.length
          }
        />
      </div>

      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        title="Apply Filter"
        description="Refine admin listings to find the right administrator faster."
        resetLabel="Reset"
        onReset={handleResetFilter}
        buttonLabel="Apply Filter"
        onApply={handleApplyFilter}
        filterValues={certificationFilters}
        onFilterChange={(filters) => {
          setCertificationFilters((prev) => ({
            ...prev,
            ...filters,
          }));
        }}
        
        dropdownStates={{
          adminName: showOwnershipDropdown,
          email: showPropertyDropdown,
          status: showStatusDropdown,
        }}
        onDropdownToggle={(key, value) => {
          if (key === "adminName") setShowOwnershipDropdown(value);
          if (key === "email") setShowPropertyDropdown(value);
          if (key === "status") setShowStatusDropdown(value);
        }}
        fields={[
          {
            label: "Admin Name",
            key: "adminName",
            type: "dropdown",
            placeholder: "Select admin name",
            options: uniqueAdminNames,
          },
          {
            label: "Email",
            key: "email",
            type: "dropdown",
            placeholder: "Select email",
            options: uniqueEmails,
          },
          {
            label: "Properties Verified",
            key: "propertiesVerified",
            type: "dropdown",
            placeholder: "Select properties verified",
            options: uniquePropertiesVerified,
          },
          {
            label: "Status",
            key: "status",
            type: "dropdown",
            placeholder: "Select status",
            options: uniqueStatuses,
          },
        ]}
      />
    </>
  );
}