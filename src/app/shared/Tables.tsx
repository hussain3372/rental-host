"use client";

import React, { useState, useEffect, useCallback } from "react";
import { X, User, Briefcase, Calendar, Activity } from "lucide-react";
import Image from "next/image";

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
  showModal?: boolean;
  modalTitle?: string;
  clickable?: boolean;
}

// Modal Component
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data: unknown;
  rowIndex: number;
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
// ENHANCED TABLE COMPONENT WITH HORIZONTAL SCROLLING
// ============================================

export function Table<T extends Record<string, unknown>>({
  title,
  data,
  control = {},
  onRowClick,
  showModal = true,
  modalTitle = "Row Details",
  clickable = true,
}: TableProps<T>) {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    data: T | null;
    index: number;
  }>({
    isOpen: false,
    data: null,
    index: -1,
  });

  // Generate unique table ID for CSS targeting
  const tableId = `table-${Math.random().toString(36).substr(2, 9)}`;

  // Function to render status badges
  const renderStatusBadge = (status: string) => {
    const statusLower = status.toLowerCase();
    let badgeClasses =
      "inline-flex px-2 py-1 rounded-full text-xs font-medium ";

    if (statusLower === "verified") {
      badgeClasses += "bg-[#2d2d2d] text-[#EFFC76] py-2 px-3";
      //   badgeClasses += " border border-green-700";
    } else if (statusLower === "near expiry") {
      badgeClasses += "bg-[#2d2d2d] text-[#FFB52B] py-2 px-3";
    } else if (statusLower === "expired") {
      badgeClasses += "bg-[#2d2d2d] text-[#FF5050] py-2 px-3";
    } else {
      badgeClasses += "bg-[#2d2d2d] text-[#EFFC76] py-2 px-3";
    }

    return (
      <span className={badgeClasses} style={{ fontWeight: "400" }}>
        {status}
      </span>
    );
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

  // Generate dynamic CSS for row colors
  const generateRowCSS = useCallback(() => {
    let css = "";

    // Generate CSS for each row with proper background colors
    data.forEach((_, idx) => {
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

      css += `
        #${tableId} tbody tr:nth-child(${idx + 1}) {
          background-color: ${bgColor} !important;
          color: ${control.rowTextColor || "#424242"} !important;
          transition: all 0.3s ease !important;
        }
      `;

      // Add hover effects
      if (control.hover || control.highlightRowOnHover) {
        css += `
          #${tableId} tbody tr:nth-child(${idx + 1}):hover {
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
  }, [data, control, tableId]);

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

  // Handle empty data
  if (!data || data.length === 0) {
    return (
      <div style={{ marginBottom: 40 }}>
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

  const keys = Object.keys(data[0]);
  const paddingSize = control.compact ? "8px 12px" : "12px 16px";

  const getBorderWidth = () => {
    if (control.borderStyle === "double") {
      return "3px";
    }
    return "2px";
  };

  const handleRowClick = (row: T, index: number) => {
    // Only process clicks if table is clickable
    if (!clickable) return;

    if (showModal) {
      setModalState({
        isOpen: true,
        data: row,
        index: index,
      });
    }

    if (onRowClick) {
      onRowClick(row, index);
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
    <div style={{ marginBottom: 40 }}>
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
            ? `${getBorderWidth()} ${control.borderStyle || "solid"} ${
                control.borderColor || "#e0e0e0"
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
              minWidth: "max-content", // Ensure table doesn't collapse on small screens
              borderCollapse: "collapse",
              fontSize: control.fontSize || 14,
              textAlign: control.textAlign || "left",
              backgroundColor: "black",
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: control.headerBgColor || "#333",
                }}
              >
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

                      // Rounded corners only on first and last header
                      borderTopLeftRadius:
                        index === 0 ? control.borderRadius || 8 : 0,
                      borderTopRightRadius:
                        index === keys.length - 1
                          ? control.borderRadius || 8
                          : 0,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
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
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {data.map((row, idx) => (
                <tr
                  className="rounded-md"
                  key={idx}
                  style={{
                    // Only show pointer cursor if table is clickable
                    //   cursor: clickable && (control.hover || onRowClick || showModal) ? "pointer" : "default",
                    backgroundColor: "black",
                  }}
                  onClick={() => handleRowClick(row, idx)}
                >
                  {keys.map((key) => (
                    <td
                      key={key}
                      // className="w-0"
                      style={{
                        padding: paddingSize,
                        fontWeight: 400,
                        fontSize: "14px",
                        lineHeight: "18px",
                        // width:"0px",
                        color: "#FFFFFF99",
                        whiteSpace: "nowrap", // Prevent cell content from wrapping
                      }}
                    >
                      {renderCellContent(key, row[key])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal - Only show if table is clickable */}
      {clickable && showModal && (
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
