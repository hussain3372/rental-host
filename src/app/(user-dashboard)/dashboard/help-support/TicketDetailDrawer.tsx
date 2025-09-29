"use client";

import React from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface Attachment {
    name: string;
    size: string;
    url: string;
}

interface Ticket {
    id: string;
    ticketId: string;
    issueType: string;
    subject: string;
    description?: string;
    createdOn: string;
    status: string;
    attachment?: Attachment;
}

interface TicketDetailDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    ticket: Ticket | null;
}

export default function TicketDetailDrawer({
    isOpen,
    onClose,
    ticket,
}: TicketDetailDrawerProps) {
    if (!isOpen || !ticket) return null;

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex justify-between items-center px-4 py-3">
                <h2 className="text-lg font-semibold">
                    TIK - {ticket.ticketId || ticket.id || "0001"}
                </h2>
                <button
                    onClick={onClose}
                    className="p-1 text-gray-400 hover:text-yellow-300"
                >
                    <X size={20} />
                </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5">
                <p className="text-sm text-gray-400">
                    Submitted on {ticket.createdOn} • Status:{" "}
                    <span className="text-yellow-300 font-medium">{ticket.status}</span>
                </p>

                {/* Combined Card */}
                <div className="bg-[#121315] p-4 rounded-lg space-y-4">
                    {/* Subject */}
                    <div className=" ">
                        <h3 className="text-sm text-gray-300 font-semibold mb-1">Subject</h3>
                        <p className="text-sm text-gray-200">
                            {ticket.subject || "View management request - Need assistance with ticket view."}
                        </p>
                    </div>

                    {/* Description */}
                    <div>
                        <h3 className="text-sm text-gray-300 font-semibold mb-1">
                            Description
                        </h3>
                        <p className="text-sm text-gray-200">
                            {ticket.description ||
                                "This is a sample description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
                        </p>
                    </div>

                    {/* Attachment (Static Card Fallback) */}
                    <div className="flex items-center gap-5 bg-[#2D2D2D] p-3 rounded-lg">
                        <Image
                            src={ticket.attachment?.url || "/images/id.png"}
                            alt={ticket.attachment?.name || "ID"}
                            width={100}
                            height={60}
                            className="rounded object-cover"
                        />
                        <div>
                            <h3 className="font-medium text-[12px] sm:text-[18px] leading-[16px] sm:leading-[22px] text-white xl:w-[353px]">
                                {ticket.attachment?.name || "Government-issued ID"}
                            </h3>
                            <h4 className="text-white/60 font-medium text-[14px] leading-[20px] pt-2">
                                {ticket.attachment?.size || "12.3kb"}
                            </h4>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="p-4">
                <button
                    onClick={onClose}
                    className="w-full bg-[#EFFC76] text-black font-medium py-3 rounded-lg hover:bg-[#e8f566] transition"
                >
                    Go Back
                </button>
            </div>
        </div>
    );
}
