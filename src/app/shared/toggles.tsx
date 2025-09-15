"use client";
import React from "react";
import { Sun, Moon } from "lucide-react";

export interface ToggleSwitchProps {
  /** Current state of the toggle */
  isOn: boolean;
  /** Handler fired when toggled */
  onToggle: (value: boolean) => void;
  /** Disable interaction */
  disabled?: boolean;
  /** Show Sun/Moon icons inside thumb */
  withIcons?: boolean;
  /** Extra className for styling */
  className?: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  isOn,
  onToggle,
  disabled = false,
  withIcons = false,
  className = "",
}) => {
  return (
    <button
      type="button"
      onClick={() => !disabled && onToggle(!isOn)}
      disabled={disabled}
      className={`
        relative inline-flex items-center rounded-full transition-colors duration-300
        ${isOn ? "bg-[#EFFC76]" : "bg-[#EFFC76]"}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        w-16 h-9 px-1
        ${className}
      `}
    >
      <span
        className={`
          flex items-center justify-center w-7 h-7 rounded-full bg-black shadow-md transform transition-transform duration-300
          ${isOn ? "translate-x-7" : "translate-x-0"}
        `}
      >
        {withIcons &&
          (isOn ? (
            <Sun className="w-4 h-4 text-yellow-500" />
          ) : (
            <Moon className="w-4 h-4 text-gray-600" />
          ))}
      </span>
    </button>
  );
};

export default ToggleSwitch;
