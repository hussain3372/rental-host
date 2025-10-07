"use client";
import React, { useMemo, useState, useEffect } from "react";
import { Table } from "@/app/admin/tables-essentials/Tables";
import { Modal } from "@/app/shared/Modal";
import FilterDrawer from "@/app/admin/tables-essentials/Filter";
import TicketDrawer from "./Drawer"; 

interface CertificationData {
  id: number;
  "Host Name": string;
  Email: string;
  "Listed Properties": number;
  "Certified Properties": number;
  "Account Created": string;
  Status: string;
}

interface AdminData {
  id: number;
  "Admin Name": string;
  Email: string;
  "Properties Verified": number;
  "Pending Applications": number;
  "Rejected Applications": number;
  Status: string;
}

type ViewMode = "hosts" | "admins";

export default function Applications() {
  const [viewMode, setViewMode] = useState<ViewMode>("hosts");
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

  // Add Admin Drawer State
  const [isAddAdminDrawerOpen, setIsAddAdminDrawerOpen] = useState(false);

  const [showOwnershipDropdown, setShowOwnershipDropdown] = useState(false);
  const [showPropertyDropdown, setShowPropertyDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showPermissionsDropdown, setShowPermissionsDropdown] = useState(false);

  // Host filters
  const [certificationFilters, setCertificationFilters] = useState({
    "Certified Properties": "",
    "Listed Properties": "",
    status: "",
    submittedDate: "",
  });

  // Admin filters
  const [adminFilters, setAdminFilters] = useState({
    role: "",
    status: "",
    permissions: "",
    lastLogin: "",
    "Properties verified": "",
    "Pending applications": "",
    "Rejected applications": "",
  });

  const [submittedDate, setSubmittedDate] = useState<Date | null>(null);
  const [lastLoginDate, setLastLoginDate] = useState<Date | null>(null);

  const [allCertificationData, setAllCertificationData] = useState<CertificationData[]>([
    {
      id: 1,
      "Host Name": "Sarah Kim",
      Email: "sarah.kim@example.com",
      "Listed Properties": 15,
      "Certified Properties": 12,
      "Account Created": "Aug 12, 2025",
      Status: "Active",
    },
    {
      id: 2,
      "Host Name": "Mike Johnson",
      Email: "mike.j@example.com",
      "Listed Properties": 8,
      "Certified Properties": 7,
      "Account Created": "Aug 12, 2025",
      Status: "Active",
    },
    {
      id: 3,
      "Host Name": "Emily Chen",
      Email: "emily.chen@example.com",
      "Listed Properties": 22,
      "Certified Properties": 10,
      "Account Created": "Aug 12, 2025",
      Status: "Active",
    },
    {
      id: 4,
      "Host Name": "David Wilson",
      Email: "david.w@example.com",
      "Listed Properties": 5,
      "Certified Properties": 10,
      "Account Created": "Aug 12, 2025",
      Status: "Active",
    },
    {
      id: 5,
      "Host Name": "Lisa Brown",
      Email: "lisa.b@example.com",
      "Listed Properties": 18,
      "Certified Properties": 10,
      "Account Created": "Aug 12, 2025",
      Status: "Suspended",
    },
    {
      id: 6,
      "Host Name": "Alex Garcia",
      Email: "alex.g@example.com",
      "Listed Properties": 12,
      "Certified Properties": 10,
      "Account Created": "Aug 12, 2025",
      Status: "Active",
    },
    {
      id: 7,
      "Host Name": "Sarah Kim",
      Email: "sarah.kim@example.com",
      "Listed Properties": 15,
      "Certified Properties": 12,
      "Account Created": "Aug 12, 2025",
      Status: "Active",
    },
    {
      id: 8,
      "Host Name": "Mike Johnson",
      Email: "mike.j@example.com",
      "Listed Properties": 8,
      "Certified Properties": 7,
      "Account Created": "Aug 12, 2025",
      Status: "Active",
    },
    {
      id: 9,
      "Host Name": "Emily Chen",
      Email: "emily.chen@example.com",
      "Listed Properties": 22,
      "Certified Properties": 10,
      "Account Created": "Aug 12, 2025",
      Status: "Active",
    },
    {
      id: 10,
      "Host Name": "David Wilson",
      Email: "david.w@example.com",
      "Listed Properties": 5,
      "Certified Properties": 10,
      "Account Created": "Aug 12, 2025",
      Status: "Active",
    },
    {
      id: 11,
      "Host Name": "Lisa Brown",
      Email: "lisa.b@example.com",
      "Listed Properties": 18,
      "Certified Properties": 10,
      "Account Created": "Aug 12, 2025",
      Status: "Suspended",
    },
    {
      id: 12,
      "Host Name": "Alex Garcia",
      Email: "alex.g@example.com",
      "Listed Properties": 12,
      "Certified Properties": 10,
      "Account Created": "Aug 12, 2025",
      Status: "Active",
    },
  ]);

  const [allAdminData, setAllAdminData] = useState<AdminData[]>([
    {
      id: 1,
      "Admin Name": "John Smith",
      Email: "john.smith@company.com",
      "Properties Verified": 123,
      "Pending Applications": 15,
      "Rejected Applications": 20,
      Status: "Active",
    },
    {
      id: 2,
      "Admin Name": "Maria Rodriguez",
      Email: "maria.r@company.com",
      "Properties Verified": 89,
      "Pending Applications": 8,
      "Rejected Applications": 12,
      Status: "Active",
    },
    {
      id: 3,
      "Admin Name": "Robert Chen",
      Email: "robert.c@company.com",
      "Properties Verified": 45,
      "Pending Applications": 25,
      "Rejected Applications": 5,
      Status: "Suspended",
    },
    {
      id: 4,
      "Admin Name": "Sarah Williams",
      Email: "sarah.w@company.com",
      "Properties Verified": 167,
      "Pending Applications": 3,
      "Rejected Applications": 30,
      Status: "Active",
    },
    {
      id: 5,
      "Admin Name": "James Wilson",
      Email: "james.w@company.com",
      "Properties Verified": 78,
      "Pending Applications": 18,
      "Rejected Applications": 7,
      Status: "Active",
    },
    {
      id: 6,
      "Admin Name": "Emma Thompson",
      Email: "emma.t@company.com",
      "Properties Verified": 200,
      "Pending Applications": 2,
      "Rejected Applications": 45,
      Status: "Suspended",
    },
  ]);

  // Handle Add Admin Note Submission
  const handleAddAdminNote = (note: string) => {
    // Generate a new admin with the note
    const newAdmin: AdminData = {
      id: allAdminData.length + 1,
      "Admin Name": `New Admin ${allAdminData.length + 1}`,
      Email: `newadmin${allAdminData.length + 1}@company.com`,
      "Properties Verified": 0,
      "Pending Applications": 0,
      "Rejected Applications": 0,
      Status: "Active",
    };
    
    setAllAdminData(prev => [...prev, newAdmin]);
    
    // You can handle the note as needed (store in database, etc.)
    console.log("New admin added with note:", note);
  };

  const filteredCertificationData = useMemo(() => {
    let filtered = allCertificationData;

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item["Host Name"].toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.Email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.Status.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (certificationFilters["Listed Properties"]) {
      const range = certificationFilters["Listed Properties"].split("-");
      if (range.length === 2) {
        const min = parseInt(range[0]);
        const max = parseInt(range[1]);
        filtered = filtered.filter(
          (item) =>
            item["Listed Properties"] >= min && item["Listed Properties"] <= max
        );
      }
    }

    if (certificationFilters["Certified Properties"]) {
      const range = certificationFilters["Certified Properties"].split("-");
      if (range.length === 2) {
        const min = parseInt(range[0]);
        const max = parseInt(range[1]);
        filtered = filtered.filter(
          (item) =>
            item["Certified Properties"] >= min &&
            item["Certified Properties"] <= max
        );
      }
    }

    if (certificationFilters.status) {
      filtered = filtered.filter(
        (item) => item.Status === certificationFilters.status
      );
    }

    if (certificationFilters.submittedDate) {
      filtered = filtered.filter((item) =>
        item["Account Created"].includes(certificationFilters.submittedDate)
      );
    }

    return filtered;
  }, [searchTerm, certificationFilters, allCertificationData]);

  const filteredAdminData = useMemo(() => {
    let filtered = allAdminData;

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item["Admin Name"].toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.Email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.Status.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (adminFilters.status) {
      filtered = filtered.filter((item) => item.Status === adminFilters.status);
    }

    if (adminFilters["Properties verified"]) {
      const range = adminFilters["Properties verified"].split("-");
      if (range.length === 2) {
        const min = parseInt(range[0]);
        const max = parseInt(range[1]);
        filtered = filtered.filter(
          (item) =>
            item["Properties Verified"] >= min &&
            item["Properties Verified"] <= max
        );
      }
    }

    if (adminFilters["Pending applications"]) {
      const value = parseInt(adminFilters["Pending applications"]);
      filtered = filtered.filter(
        (item) => item["Pending Applications"] === value
      );
    }

    if (adminFilters["Rejected applications"]) {
      const value = parseInt(adminFilters["Rejected applications"]);
      filtered = filtered.filter(
        (item) => item["Rejected Applications"] === value
      );
    }

    return filtered;
  }, [searchTerm, adminFilters, allAdminData]);

  const currentData =
    viewMode === "hosts" ? filteredCertificationData : filteredAdminData;
    
 const displayData = useMemo(() => {
  return currentData.map((item) => {
    const { id, ...rest } = item;
    console.log(id)
    const stringified = Object.fromEntries(
      Object.entries(rest).map(([key, value]) => [key, String(value)])
    );
    return stringified as Record<string, string>;
  });
}, [currentData]);



  const handleSelectAll = (checked: boolean) => {
    const newSelected = new Set(selectedRows);
    if (checked) {
      currentData.forEach((item) => newSelected.add(item.id));
    } else {
      currentData.forEach((item) => newSelected.delete(item.id));
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
      currentData.length > 0 &&
      currentData.every((item) => selectedRows.has(item.id))
    );
  }, [currentData, selectedRows]);

  const isSomeDisplayedSelected = useMemo(() => {
    return (
      currentData.some((item) => selectedRows.has(item.id)) &&
      !isAllDisplayedSelected
    );
  }, [currentData, selectedRows, isAllDisplayedSelected]);

  const handleDeleteApplications = (selectedRowIds: Set<number>) => {
    const idsToDelete = Array.from(selectedRowIds);
    if (viewMode === "hosts") {
      const updatedData = allCertificationData.filter(
        (item) => !idsToDelete.includes(item.id)
      );
      setAllCertificationData(updatedData);
    } else {
      const updatedData = allAdminData.filter(
        (item) => !idsToDelete.includes(item.id)
      );
      setAllAdminData(updatedData);
    }
    setIsModalOpen(false);
    setSelectedRows(new Set());
  };

  const handleDeleteSingleApplication = (
    row: Record<string, string>,
    id: number
  ) => {
    if (viewMode === "hosts") {
      const updatedData = allCertificationData.filter((item) => item.id !== id);
      setAllCertificationData(updatedData);
    } else {
      const updatedData = allAdminData.filter((item) => item.id !== id);
      setAllAdminData(updatedData);
    }
    setIsModalOpen(false);
    setSingleRowToDelete(null);

    const newSelected = new Set(selectedRows);
    newSelected.delete(id);
    setSelectedRows(newSelected);

    const remainingDataCount = currentData.length - 1;
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

  const uniqueStatuses = [
    ...new Set(allCertificationData.map((item) => item.Status)),
  ];

  useEffect(() => {
    setCurrentPage(1);
    setSelectedRows(new Set());
  }, [searchTerm, certificationFilters, adminFilters, viewMode]);

  const handleResetFilter = () => {
    if (viewMode === "hosts") {
      setCertificationFilters({
        "Certified Properties": "",
        "Listed Properties": "",
        status: "",
        submittedDate: "",
      });
    } else {
      setAdminFilters({
        role: "",
        status: "",
        permissions: "",
        lastLogin: "",
        "Properties verified": "",
        "Pending applications": "",
        "Rejected applications": "",
      });
    }
    setSearchTerm("");
    setSubmittedDate(null);
    setLastLoginDate(null);
  };

  const handleApplyFilter = () => {
    if (viewMode === "hosts" && submittedDate) {
      setCertificationFilters((prev) => ({
        ...prev,
        submittedDate: submittedDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      }));
    } else if (viewMode === "admins" && lastLoginDate) {
      setAdminFilters((prev) => ({
        ...prev,
        lastLogin: lastLoginDate.toLocaleDateString("en-US", {
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

  const getDropdownItems = () => {
    if (viewMode === "hosts") {
      return [
        {
          label: "View Details",
          onClick: (row: Record<string, string>, index: number) => {
            const globalIndex = (currentPage - 1) * itemsPerPage + index;
            const originalRow = filteredCertificationData[globalIndex];
            window.location.href = `/super-admin/dashboard/user-management/host/detail/${originalRow.id}`;
          },
        },
        {
          label: "Delete Host",
          onClick: (row: Record<string, string>, index: number) => {
            const globalIndex = (currentPage - 1) * itemsPerPage + index;
            const originalRow = filteredCertificationData[globalIndex];
            openDeleteSingleModal(row, originalRow.id);
          },
        },
      ];
    } else {
      return [
        {
          label: "View details",
          onClick: (row: Record<string, string>, index: number) => {
            const globalIndex = (currentPage - 1) * itemsPerPage + index;
            const originalRow = filteredCertificationData[globalIndex];
            window.location.href = `/super-admin/dashboard/user-management/admin/detail/${originalRow.id}`;
          },
        },
        {
          label: "Delete Admin",
          onClick: (row: Record<string, string>, index: number) => {
            const globalIndex = (currentPage - 1) * itemsPerPage + index;
            const originalRow = filteredAdminData[globalIndex];
            openDeleteSingleModal(row, originalRow.id);
          },
        },
      ];
    }
  };

const getFilterFields = () => {
  if (viewMode === "hosts") {
    return [
      {
        label: "Listed Properties",
        key: "Listed Properties",
        type: "dropdown" as const, // Add 'as const'
        placeholder: "Select Properties",
        options: ["0-50", "50-100", "100-200"],
      },
      {
        label: "Certified Properties",
        key: "Certified Properties",
        type: "dropdown" as const, // Add 'as const'
        placeholder: "Select Applications",
        options: ["0-5", "5-10", "10-15", "15-20"],
      },
      {
        label: "Status",
        key: "status",
        type: "dropdown" as const, // Add 'as const'
        placeholder: "Select status",
        options: uniqueStatuses,
      },
    ];
  } else {
    return [
      {
        label: "Properties verified",
        key: "Properties verified",
        type: "dropdown" as const, // Add 'as const'
        placeholder: "Select Properties",
        options: ["0-50", "50-100", "100-200"],
      },
      {
        label: "Pending applications",
        key: "Pending applications",
        type: "dropdown" as const, // Add 'as const'
        placeholder: "Select applications",
        options: ["3", "8", "15", "18", "25"],
      },
      {
        label: "Rejected applications",
        key: "Rejected applications",
        type: "dropdown" as const, // Add 'as const'
        placeholder: "Select applications",
        options: ["5", "7", "12", "20", "30", "45"],
      },
      {
        label: "Status",
        key: "status",
        type: "dropdown" as const, // Add 'as const'
        placeholder: "Select status",
        options: ["Active", "Suspended"],
      },
    ];
  }
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
          title={`Confirm ${viewMode === "hosts" ? "Host" : "Admin"} Deletion`}
          description={`Deleting this ${
            viewMode === "hosts" ? "Host" : "Admin"
          } means it will no longer appear in your ${viewMode}.`}
          image="/images/delete-modal.png"
          confirmText="Delete"
        />
      )}

      {/* Add Admin Drawer */}
      {isAddAdminDrawerOpen && (
        <TicketDrawer
          onClose={() => setIsAddAdminDrawerOpen(false)}
          onNoteSubmit={handleAddAdminNote}
        />
      )}

      <div>
        <div className="flex flex-col sm:flex-row mb-6 sm:mb-0 justify-center sm:justify-between items-start">
          <div>
            <h2 className="font-semibold text-[20px] leading-[20px]">
              User Management
            </h2>
            <p className="font-regular text-[16px] leading-5 mb-[22px] pt-2 text-[#FFFFFF99]">
              View, manage, and control all hosts and admins on the platform
              with ease.
            </p>
          </div>
          {viewMode === "admins" && (
            <button 
              onClick={() => setIsAddAdminDrawerOpen(true)}
              className="text-[16px] font-semibold leading-5 py-3 px-5 yellow-btn text-[#121315] cursor-pointer"
            >
              Add Admin
            </button>
          )}
        </div>

        {/* Toggle Buttons */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setViewMode("hosts")}
            className={`px-4 py-2 rounded-lg text-[14px] cursor-pointer font-medium transition-colors ${
              viewMode === "hosts"
                ? "bg-[#EFFC761F] text-[#EFFC76]"
                : " text-[#FFFFFFCC] "
            }`}
          >
            Hosts
          </button>
          <button
            onClick={() => setViewMode("admins")}
            className={`px-4 py-2 rounded-lg text-[14px] cursor-pointer font-medium transition-colors ${
              viewMode === "admins"
                ? "bg-[#EFFC761F] text-[#EFFC76]"
                : " text-[#FFFFFFCC] "
            }`}
          >
            Admins
          </button>
        </div>
      </div>

      <div className="flex flex-col justify-between">
        <Table
          data={displayData}
          title={
            viewMode === "hosts" ? "Registered Hosts" : "Registered Admins"
          }
          showDeleteButton={true}
          onDeleteSingle={(row, index) => {
            const globalIndex = (currentPage - 1) * itemsPerPage + index;
            const originalRow = currentData[globalIndex];
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
          rowIds={currentData.map((item) => item.id.toString())}
          dropdownItems={getDropdownItems()}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          itemsPerPage={itemsPerPage}
          totalItems={currentData.length}
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
        description={`Refine ${viewMode} listings to find the right ${viewMode.slice(
          0,
          -1
        )} faster.`}
        resetLabel="Reset"
        onReset={handleResetFilter}
        buttonLabel="Apply Filter"
        onApply={handleApplyFilter}
        filterValues={
          viewMode === "hosts" ? certificationFilters : adminFilters
        }
        onFilterChange={(filters) => {
          if (viewMode === "hosts") {
            setCertificationFilters((prev) => ({
              ...prev,
              ...filters,
            }));
          } else {
            setAdminFilters((prev) => ({
              ...prev,
              ...filters,
            }));
          }
        }}
        // dateValue={viewMode === "hosts" ? submittedDate : lastLoginDate}
        // onDateChange={
        //   viewMode === "hosts" ? setSubmittedDate : setLastLoginDate
        // }
        // dateLabel={
        //   viewMode === "hosts" ? "Account Created" : "Last Login"
        // }
        dropdownStates={
          viewMode === "hosts"
            ? {
                "Listed Properties": showPropertyDropdown,
                "Certified Properties": showOwnershipDropdown,
                status: showStatusDropdown,
              }
            : {
                "Properties verified": showPropertyDropdown,
                "Pending applications": showPermissionsDropdown,
                "Rejected applications": showOwnershipDropdown,
                status: showStatusDropdown,
              }
        }
        onDropdownToggle={(key, value) => {
          if (viewMode === "hosts") {
            if (key === "Listed Properties") setShowPropertyDropdown(value);
            if (key === "Certified Properties") setShowOwnershipDropdown(value);
            if (key === "status") setShowStatusDropdown(value);
          } else {
            if (key === "Properties verified") setShowPropertyDropdown(value);
            if (key === "Pending applications") setShowPermissionsDropdown(value);
            if (key === "Rejected applications") setShowOwnershipDropdown(value);
            if (key === "status") setShowStatusDropdown(value);
          }
        }}
        fields={getFilterFields()}
      />
    </>
  );
}