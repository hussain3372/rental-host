"use client";
import React, { useState, useEffect, useRef } from "react";
// import Image from "next/image";

type HelpSupportDrawerProps = {
  onClose: () => void;
  onNoteSubmit: (note: string) => void; // Add this prop to handle note submission
};

export default function TicketDrawer({ onClose, onNoteSubmit }: HelpSupportDrawerProps) {
  // const [issueType, setIssueType] = useState("");
  const [subject, setSubject] = useState("");
  // const [description, setDescription] = useState("");
  // const [, setImage] = useState<File | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Trigger animation after component mounts
    setIsVisible(true);
    
    const handleClickOutside = (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    // Prevent body scroll when drawer is open
    // document.body.style.overflow = 'hidden';
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300); // Match this with the transition duration
  };

  const handleSubmit = () => {
    if (subject.trim()) {
      onNoteSubmit(subject.trim()); // Pass the note content to parent
      handleClose(); // Close the drawer after submission
    }
  };

 

  return (
    <div className={`fixed inset-0 z-[9000] bg-black/80  transition-opacity duration-300 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      <div 
        ref={drawerRef}
        className={`prevent-scroller overflow-auto  absolute right-0 max-w-[608px] bg-[#0A0C0B] z-[8000] h-full p-[28px] top-0 flex flex-col justify-between text-white transition-transform duration-300 ${
          isVisible ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="space-y-5">
          <h2 className="text-[20px] leading-6 font-medium mb-3">Add a Note</h2>
          <p className="text-[16px] leading-5 font-normal mb-10 text-[#FFFFFF99] ">
            Share important details or instructions with the host. This note will help them better understand your requirements.
          </p>
          
          {/* Issue Type */}
         
          {/* Subject */}
          <div>
            <label className="block text-[14px] leading-[18px] font-medium mb-[10px]">Note</label>
            <textarea
              placeholder="Write down short description for the host..."
                value={subject}
                rows={4}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full p-3 rounded-[10px] resize-none placeholder:text-white/40 focus:outline-none bg-[radial-gradient(75%_81%_at_50%_18.4%,_#202020_0%,_#101010_100%)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]"
            />
          </div>

          {/* Description */}
         
        </div>

        {/* Submit button */}
        <div className="mt-6">
          <button
            onClick={handleSubmit}
            className="w-full py-3 bg-[#EFFC76] text-[#121315] rounded-lg font-semibold cursor-pointer disabled:opacity-50"
            disabled={!subject.trim()}
          >
            Submit Note
          </button>
          
        </div>
      </div>
    </div>
  );
}