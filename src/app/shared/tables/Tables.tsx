"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  X,
  User,
  Briefcase,
  Calendar,
  Activity,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import Dropdown from "@/app/shared/Dropdown";
// ============================================
// TYPE DEFINITIONS
// ============================================

export type TableControl = {
  // BASIC VISUAL OPTIONS
  hover?: boolean;
  striped?: boolean;
  bordered?: boolean;
  shadow?: boolean;
  compact?: boolean;

  // BORDER CUSTOMIZATION
  borderStyle?: "solid" | "double" | "dashed" | "dotted";
  borderRadius?: number;
  borderColor?: string;

  // SPECIFIC BORDER CONTROLS
  rowBorder?: boolean;
  headerBorder?: boolean;

  // TEXT & LAYOUT
  fontSize?: number;
  textAlign?: "left" | "center" | "right";

  // COLOR SCHEME
  headerBgColor?: string;
  headerTextColor?: string;
  rowBgColor?: string;
  rowTextColor?: string;
  zebraColor?: string;
  hoverBgColor?: string;
  hoverTextColor?: string;

  // ADVANCED NTH-CHILD COLOR CYCLING
  nthChildColors?: string[];
  nthChildStart?: number;
  nthChildStep?: number;

  // ADDITIONAL INTERACTIONS
  highlightRowOnHover?: boolean;
};

interface TableProps<T> {
  title?: string;
  data: T[];
  control?: TableControl;
  onRowClick?: (row: T, index: number) => void;

  // 🔹 Dropdown items per row
  dropdownItems?: { label: string; onClick: (row: T, index: number) => void }[];

  // 🔹 Modal options
  showModal?: boolean;
  modalTitle?: string;
  clickable?: boolean;

  // 🔹 Delete options
  onDelete?: (rows: T[]) => void;
  onDeleteSingle?: (row: T, index: number) => void;
  showDeleteButton?: boolean;

  // 🔹 Row selection
  selectedRows: Set<number>;
  setSelectedRows: React.Dispatch<React.SetStateAction<Set<number>>>;
}

// Modal Component
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data: unknown;
  rowIndex: number;
}

// Sort dropdown component
interface SortDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onSort: (direction: "asc" | "desc") => void;
  column: string;
}

function SortDropdown({ isOpen, onClose, onSort, column }: SortDropdownProps) {
  if (!isOpen) return null;

  // Determine sort options based on column type
  const getSortOptions = () => {
    const columnLower = column.toLowerCase();

    // Date columns
    if (columnLower.includes("date") || columnLower.includes("expiry")) {
      return {
        asc: { label: "Oldest First", icon: <ChevronUp size={14} /> },
        desc: { label: "Newest First", icon: <ChevronDown size={14} /> },
      };
    }

    // Status columns
    if (columnLower.includes("status")) {
      return {
        asc: { label: "Approved First", icon: <ChevronUp size={14} /> },
        desc: { label: "Pending First", icon: <ChevronDown size={14} /> },
      };
    }

    // Ownership columns
    if (columnLower.includes("ownership")) {
      return {
        asc: { label: "Manager First", icon: <ChevronUp size={14} /> },
        desc: { label: "Owner First", icon: <ChevronDown size={14} /> },
      };
    }

    // Default alphabetical for text columns
    return {
      asc: { label: "A to Z", icon: <ChevronUp size={14} /> },
      desc: { label: "Z to A", icon: <ChevronDown size={14} /> },
    };
  };

  const sortOptions = getSortOptions();

  return (
    <div className="absolute top-full left-0 mt-1 bg-[#2d2d2d] border border-gray-600 rounded-lg shadow-lg z-50 min-w-[140px]">
      <div className="py-1">
        <button
          onClick={() => {
            onSort("asc");
            onClose();
          }}
          className="w-full px-3 py-2 text-left text-white hover:bg-gray-700 flex items-center gap-2 text-sm"
        >
          {sortOptions.asc.icon}
          {sortOptions.asc.label}
        </button>
        <button
          onClick={() => {
            onSort("desc");
            onClose();
          }}
          className="w-full px-3 py-2 text-left text-white hover:bg-gray-700 flex items-center gap-2 text-sm"
        >
          {sortOptions.desc.icon}
          {sortOptions.desc.label}
        </button>
      </div>
    </div>
  );
}

function Modal({ isOpen, onClose, title, data, rowIndex }: ModalProps) {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const formatValue = (value: unknown): string => {
    if (value === null || value === undefined) return "N/A";
    if (typeof value === "object") return JSON.stringify(value, null, 2);
    return String(value);
  };

  const getIconForKey = (key: string) => {
    const lowerKey = key.toLowerCase();
    if (lowerKey.includes("name") || lowerKey.includes("user"))
      return <User size={16} />;
    if (
      lowerKey.includes("role") ||
      lowerKey.includes("job") ||
      lowerKey.includes("position")
    )
      return <Briefcase size={16} />;
    if (
      lowerKey.includes("age") ||
      lowerKey.includes("date") ||
      lowerKey.includes("time")
    )
      return <Calendar size={16} />;
    if (lowerKey.includes("status") || lowerKey.includes("state"))
      return <Activity size={16} />;
    return null;
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(4px)",
        animation: "fadeIn 0.2s ease-out",
      }}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden"
        style={{
          animation: "slideIn 0.3s ease-out",
          border: "1px solid #e5e7eb",
        }}
      >
        {/* Header */}
        <div
          className="px-6 py-4 border-b border-gray-200 flex items-center justify-between"
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          }}
        >
          <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
            <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              #{rowIndex + 1}
            </div>
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
          {Object.entries(data as Record<string, unknown>).map(
            ([key, value]) => (
              <div
                key={key}
                className="border-b border-gray-100 pb-3 last:border-b-0"
              >
                <div className="flex items-center gap-2 mb-1">
                  {getIconForKey(key)}
                  <label className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                    {key}
                  </label>
                </div>
                <div
                  className="text-gray-900 bg-gray-50 rounded-lg px-3 py-2"
                  style={{
                    fontFamily:
                      typeof value === "object" ? "monospace" : "inherit",
                    whiteSpace:
                      typeof value === "object" ? "pre-wrap" : "normal",
                  }}
                >
                  {formatValue(value)}
                </div>
              </div>
            )
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 text-white"
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================
// ENHANCED TABLE COMPONENT WITH SORTING AND DELETE
// ============================================

export function Table<T extends Record<string, unknown>>({
  title,
  data,
  control = {},
  onRowClick,
  modalTitle = "Row Details",
  clickable = true,
  showDeleteButton = false,
  dropdownItems,
  selectedRows = new Set(),
  setSelectedRows = () => {},
}: TableProps<T>) {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    data: T | null;
    index: number;
  }>({ isOpen: false, data: null, index: -1 });
  
  const [displayData, setDisplayData] = useState<T[]>(data);
  const [activeSortDropdown, setActiveSortDropdown] = useState<string | null>(
    null
  );
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  // Ref for detecting outside clicks
  const sortDropdownRef = useRef<HTMLDivElement>(null);

  const handleDropdownToggle = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  // Update display data when original data changes
  useEffect(() => {
    setDisplayData([...data]);
  }, [data, setSelectedRows]);

  // Update selectAll checkbox when selectedRows changes
  const selectAll =
    selectedRows.size === displayData.length && displayData.length > 0;

  // Generate unique table ID for CSS targeting
  const tableId = `table-${Math.random().toString(36).substr(2, 9)}`;

  // Function to render status badges
  const renderStatusBadge = (status: string) => {
    const statusLower = status.toLowerCase();
    let badgeClasses =
      "inline-flex px-2 py-1 rounded-full text-xs font-medium ";

    if (
      statusLower === "verified" ||
      statusLower === "approved" ||
      statusLower === "active"
    ) {
      badgeClasses += "bg-[#2d2d2d] text-[#EFFC76] py-2 px-3";
    } else if (
      statusLower === "near expiry" ||
      statusLower === "pending" ||
      statusLower === "inactive"
    ) {
      badgeClasses += "bg-[#2d2d2d] text-[#FFB52B] py-2 px-3";
    } else if (statusLower === "expired" || statusLower === "rejected") {
      badgeClasses += "bg-[#2d2d2d] text-[#FF5050] py-2 px-3";
    } else {
      badgeClasses += "bg-[#2d2d2d] text-[#EFFC76] py-2 px-3";
    }

    return <span className={badgeClasses}>{status}</span>;
  };

  // Function to render cell content
  const renderCellContent = (key: string, value: unknown) => {
    if (key.toLowerCase() === "status" && typeof value === "string") {
      return renderStatusBadge(value);
    }

    if (typeof value === "object" && value !== null) {
      return JSON.stringify(value);
    }

    return String(value ?? "");
  };

  // Sorting function - sorts ALL data, not just visible data
  const handleSort = (column: string, direction: "asc" | "desc") => {
    const columnLower = column.toLowerCase();

    const sorted = [...displayData].sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];

      // Handle null/undefined values
      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return direction === "asc" ? 1 : -1;
      if (bValue == null) return direction === "asc" ? -1 : 1;

      // Date sorting
      if (columnLower.includes("date") || columnLower.includes("expiry")) {
        const dateA = new Date(String(aValue));
        const dateB = new Date(String(bValue));

        // If dates are invalid, fall back to string comparison
        if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
          const strA = String(aValue).toLowerCase();
          const strB = String(bValue).toLowerCase();
          return direction === "asc"
            ? strA.localeCompare(strB)
            : strB.localeCompare(strA);
        }

        return direction === "asc"
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      }

      // Status sorting - custom priority order
      if (columnLower.includes("status")) {
        const statusPriority: { [key: string]: number } = {
          approved: 1,
          verified: 1,
          pending: 2,
          "in progress": 2,
          "pending review": 2,
          "near expiry": 3,
          rejected: 4,
          expired: 4,
        };

        const aStatus = String(aValue).toLowerCase();
        const bStatus = String(bValue).toLowerCase();
        const aPriority = statusPriority[aStatus] || 5;
        const bPriority = statusPriority[bStatus] || 5;

        if (direction === "asc") {
          return aPriority - bPriority || aStatus.localeCompare(bStatus);
        } else {
          return bPriority - aPriority || bStatus.localeCompare(aStatus);
        }
      }

      // Ownership sorting - managers always at top when "Manager First" is selected
      if (columnLower.includes("ownership")) {
        const aOwnership = String(aValue).toLowerCase();
        const bOwnership = String(bValue).toLowerCase();

        // When Manager First (asc), managers always come first
        if (direction === "asc") {
          if (aOwnership === "manager" && bOwnership !== "manager") return -1;
          if (bOwnership === "manager" && aOwnership !== "manager") return 1;
          if (aOwnership === "manager" && bOwnership === "manager") return 0;

          // For non-managers: Owner comes before Agent
          const ownershipOrder = { owner: 1, agent: 2 };
          const aOrder =
            ownershipOrder[aOwnership as keyof typeof ownershipOrder] || 3;
          const bOrder =
            ownershipOrder[bOwnership as keyof typeof ownershipOrder] || 3;
          return aOrder - bOrder;
        } else {
          // When Owner First (desc), managers still come first, then Owner, then Agent
          if (aOwnership === "manager" && bOwnership !== "manager") return -1;
          if (bOwnership === "manager" && aOwnership !== "manager") return 1;
          if (aOwnership === "manager" && bOwnership === "manager") return 0;

          // For non-managers: Agent comes before Owner in desc
          const ownershipOrder = { agent: 1, owner: 2 };
          const aOrder =
            ownershipOrder[aOwnership as keyof typeof ownershipOrder] || 3;
          const bOrder =
            ownershipOrder[bOwnership as keyof typeof ownershipOrder] || 3;
          return aOrder - bOrder;
        }
      }

      // Default alphabetical sorting for other columns
      const aString = String(aValue).toLowerCase();
      const bString = String(bValue).toLowerCase();

      return direction === "asc"
        ? aString.localeCompare(bString)
        : bString.localeCompare(aString);
    });

    setDisplayData(sorted);
    // Clear selections when sorting
    setSelectedRows(new Set());
  };

  // Selection handlers
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(
        new Set(Array.from({ length: displayData.length }, (_, i) => i))
      );
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleSelectRow = (index: number, checked: boolean) => {
    const newSelected = new Set(selectedRows);
    if (checked) {
      newSelected.add(index);
    } else {
      newSelected.delete(index);
    }
    setSelectedRows(newSelected);
  };

  // Generate dynamic CSS for row colors
  const generateRowCSS = useCallback(() => {
    let css = "";

    // Generate CSS for each row with proper background colors
    displayData.forEach((_, idx) => {
      let bgColor = control.rowBgColor || "#ffffff";

      // Apply nth-child colors
      if (control.nthChildColors && control.nthChildColors.length > 0) {
        const nthColors = control.nthChildColors || [];
        const nthStart = control.nthChildStart || 1;
        const nthStep = control.nthChildStep || 1;

        const rowNumber = idx + 1;

        if (rowNumber < nthStart) {
          bgColor = control.rowBgColor || "#ffffff";
        } else {
          const adjustedPosition = rowNumber - nthStart;
          if (adjustedPosition % nthStep === 0) {
            const colorCyclePosition = Math.floor(adjustedPosition / nthStep);
            const colorIndex = colorCyclePosition % nthColors.length;
            bgColor = nthColors[colorIndex];
          } else {
            bgColor = control.rowBgColor || "#ffffff";
          }
        }
      }
      // Apply striped pattern if no nth-child colors
      else if (control.striped && idx % 2 === 1) {
        bgColor = control.zebraColor || "#f9f9f9";
      }

      // Row base style (still per-row if you need zebra/striped)
      css += `
  #${tableId} tbody tr:nth-child(${idx + 1}) {
    background-color: ${bgColor} !important;
    color: ${control.rowTextColor || "#424242"} !important;
    transition: all 0.3s ease !important;
  }
`;

      // ✅ Global hover rule (applies to all rows)
      if (control.hover || control.highlightRowOnHover) {
        css += `
    #${tableId} tbody tr:hover {
      background-color: ${control.hoverBgColor || "#f0f0f0"} !important;
      color: ${control.hoverTextColor || "#424242"} !important;
      box-shadow: 0 4px 8px rgba(0,0,0,0.15) !important;
      z-index: 1 !important;
      position: relative !important;
    }
  `;
      }
    });

    return css;
  }, [displayData, control, tableId]);

  // Use useEffect to inject CSS
  useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.textContent = generateRowCSS();
    document.head.appendChild(styleElement);

    return () => {
      if (document.head.contains(styleElement)) {
        document.head.removeChild(styleElement);
      }
    };
  }, [generateRowCSS]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close sort dropdown if click is outside
      if (
        activeSortDropdown &&
        sortDropdownRef.current &&
        !sortDropdownRef.current.contains(event.target as Node)
      ) {
        setActiveSortDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeSortDropdown]);

  // Handle empty data
  if (!data || data.length === 0) {
    return (
      <div>
        {title && (
          <h2
            style={{
              marginBottom: 10,
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            {title}
          </h2>
        )}
        <div style={{ padding: 20, textAlign: "center", color: "#666" }}>
          No data available
        </div>
      </div>
    );
  }

  const keys = displayData.length > 0 ? Object.keys(displayData[0]) : [];
  const paddingSize = control.compact ? "8px 12px" : "12px 16px";

  const getBorderWidth = () => {
    if (control.borderStyle === "double") {
      return "3px";
    }
    return "2px";
  };

  const handleRowClick = (row: T, index: number, e?: React.MouseEvent) => {
    // Only trigger row click if clickable and onRowClick exists
    if (clickable && onRowClick && e) {
      const target = e.target as HTMLElement;
      // Check if click was on checkbox, button, or inside actions dropdown
      if (
        !target.closest('input[type="checkbox"]') &&
        !target.closest('button') &&
        !target.closest('label')
      ) {
        onRowClick(row, index);
      }
    }
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      data: null,
      index: -1,
    });
  };

  return (
    <div style={{ marginBottom: 15 }}>
      {title && (
        <h2
          style={{
            marginBottom: 10,
            fontSize: 18,
            fontWeight: 600,
          }}
        >
          {title}
        </h2>
      )}

      {/* Wrapper div for horizontal scrolling */}
      <div
        style={{
          overflowX: "auto",
          width: "100%",
          borderRadius: control.borderRadius
            ? `${control.borderRadius}px`
            : "0",
          boxShadow: control.shadow ? "0 4px 6px rgba(0,0,0,0.1)" : "none",
          border: control.bordered
            ? `${getBorderWidth()} ${control.borderStyle || "solid"} ${control.borderColor || "#e0e0e0"
            }`
            : "none",
        }}
      >
        <div className="p-5">
          <table
            id={tableId}
            className="p-5"
            style={{
              width: "100%",
              minWidth: "max-content",
              borderCollapse: "collapse",
              backgroundColor: "transparent",
              fontSize: control.fontSize || 14,
              textAlign: control.textAlign || "left",
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: control.headerBgColor || "#333",
                }}
              >
                {/* Checkbox column for selection - only show if delete is enabled */}
                {showDeleteButton && (
                  <th
                    style={{
                      padding: paddingSize,
                      fontWeight: 700,
                      color: "white",
                      fontSize: "12px",
                      lineHeight: "16px",
                      whiteSpace: "nowrap",
                      width: "24px",
                      borderTopLeftRadius: control.borderRadius || 8,
                    }}
                  >
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                        className="peer hidden"
                      />

                      {/* Outer border */}
                      <span className="absolute inset-0 rounded-md border-2 border-[#FFFFFFCC] translate-x-1 translate-y-1 
                   peer-checked:border-[#EFFC76]"></span>

                      {/* Main box */}
                      <span className="relative w-5 h-5 rounded-md border-2 border-[#FFFFFFCC] bg-[#252628] 
                   flex items-center justify-center 
                   peer-checked:bg-[#EFFC76] peer-checked:border-[#EFFC76]
                   peer-checked:after:content-['✓'] peer-checked:after:text-black peer-checked:after:text-xs peer-checked:after:font-bold">
                      </span>
                    </label>
                  </th>
                )}

                {keys.map((key, index) => (
                  <th
                    key={key}
                    style={{
                      padding: paddingSize,
                      fontWeight: 700,
                      color: "white",
                      textAlign: control.textAlign || "left",
                      fontSize: "12px",
                      lineHeight: "16px",
                      whiteSpace: "nowrap",
                      position: "relative",
                      // Adjust border radius based on whether checkbox column exists
                      borderTopLeftRadius:
                        !showDeleteButton && index === 0
                          ? control.borderRadius || 8
                          : 0,
                      borderTopRightRadius:
                        index === keys.length - 1 && !showDeleteButton
                          ? control.borderRadius || 8
                          : 0,
                    }}
                  >
                    <div
                      ref={index === 0 ? sortDropdownRef : null}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        cursor: "pointer",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveSortDropdown(
                          activeSortDropdown === key ? null : key
                        );
                      }}
                    >
                      {key}
                      <Image
                        src="/images/menu.png"
                        alt="menu"
                        height={16}
                        width={16}
                      />
                    </div>
                    <SortDropdown
                      isOpen={activeSortDropdown === key}
                      onClose={() => setActiveSortDropdown(null)}
                      onSort={(direction) => handleSort(key, direction)}
                      column={key}
                    />
                  </th>
                ))}

                {/* Actions column - only show if delete is enabled */}
                {showDeleteButton && (
                  <th
                    style={{
                      padding: paddingSize,
                      fontWeight: 700,
                      color: "white",
                      fontSize: "12px",
                      lineHeight: "16px",
                      whiteSpace: "nowrap",
                      width: "80px",
                      borderTopRightRadius: control.borderRadius || 8,
                    }}
                  >
                    Actions
                  </th>
                )}
              </tr>
            </thead>

            <tbody className="!bg-transparent table-container">
              {displayData.map((row, idx) => (
                <tr
                  className="rounded-md !bg-transparent"
                  key={idx}
                  style={{
                    cursor: "default",
                  }}
                  onClick={() => handleRowClick(row, idx)}
                >
                  {/* Checkbox column - only show if delete is enabled */}
                  {showDeleteButton && (
                    <td
                      style={{
                        padding: paddingSize,
                        width: "40px",
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedRows.has(idx)}
                          onChange={(e) => handleSelectRow(idx, e.target.checked)}
                          className="peer hidden"
                        />

                        {/* Outer border */}
                        <span className="absolute inset-0 rounded-md border-2 border-[#FFFFFFCC] translate-x-1 translate-y-1 
                   peer-checked:border-[#EFFC76]"></span>

                        {/* Main box */}
                        <span className="relative w-5 h-5 rounded-md border-2 border-[#FFFFFFCC] bg-[#252628] 
                   flex items-center justify-center 
                   peer-checked:bg-[#EFFC76] peer-checked:border-[#EFFC76]
                   peer-checked:after:content-['✓'] peer-checked:after:text-black peer-checked:after:text-xs peer-checked:after:font-bold">
                        </span>
                      </label>
                    </td>
                  )}

                  {keys.map((key) => (
                    <td
                      key={key}
                      style={{
                        padding: paddingSize,
                        fontWeight: 400,
                        fontSize: "14px",
                        lineHeight: "18px",
                        color: "#FFFFFF99",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {renderCellContent(key, row[key])}
                    </td>
                  ))}

                  {(showDeleteButton || dropdownItems) && (
                    <td style={{ position: "relative" }}>
                      <button
                        onClick={(e) => {
                          // Only allow click if checkbox is checked (for individual delete)
                          if (selectedRows.has(idx)) {
                            handleDropdownToggle(idx, e);
                          }
                        }}
                        className={`px-7 py-1 text-white rounded ${
                          selectedRows.has(idx) 
                            ? "cursor-pointer" 
                            : "cursor-not-allowed opacity-50"
                        }`}
                        disabled={!selectedRows.has(idx)}
                      >
                        ⋮
                      </button>

                      {activeDropdown === idx && dropdownItems && (
                        <Dropdown
                          isOpen={true}
                          onClose={() => setActiveDropdown(null)}
                          items={dropdownItems.map((item) => ({
                            label: item.label,
                            onClick: () => {
                              item.onClick(row, idx);
                              setActiveDropdown(null);
                            },
                          }))}
                        />
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modalState.isOpen && modalState.data && (
        <Modal
          isOpen={modalState.isOpen}
          onClose={closeModal}
          title={modalTitle}
          data={modalState.data}
          rowIndex={modalState.index}
        />
      )}
    </div>
  );
}