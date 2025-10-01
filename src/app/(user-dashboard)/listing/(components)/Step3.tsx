import React, { useState, useRef, ChangeEvent, DragEvent } from "react";
import Image from "next/image";

type DocumentKey =
  | "governmentId"
  | "propertyOwnership"
  | "safetyPermits"
  | "insuranceCertificate";

interface FileData {
  name: string;
  size: number;
  file: File;
}

interface DocumentInfo {
  key: DocumentKey;
  title: string;
  subtitle?: string;
  description?: string;
}

interface Step3Props {
  formData: {
    photos: File[];
  };
  errors: { [key: string]: string };
  onFieldChange: (field: string, value: File[]) => void;
}

export default function Step3({ errors, onFieldChange }: Step3Props) {
  const [files, setFiles] = useState<Record<DocumentKey, FileData | null>>({
    governmentId: null,
    propertyOwnership: null,
    safetyPermits: null,
    insuranceCertificate: null,
  });

  const [previewUrls, setPreviewUrls] = useState<Record<DocumentKey, string | null>>({
    governmentId: null,
    propertyOwnership: null,
    safetyPermits: null,
    insuranceCertificate: null,
  });

  const fileInputRefs: Record<DocumentKey, React.RefObject<HTMLInputElement | null>> = {
    governmentId: useRef<HTMLInputElement>(null),
    propertyOwnership: useRef<HTMLInputElement>(null),
    safetyPermits: useRef<HTMLInputElement>(null),
    insuranceCertificate: useRef<HTMLInputElement>(null),
  };

  const documentTypes: DocumentInfo[] = [
    {
      key: "governmentId",
      title: "Government-issued ID",
      description: "Upload a valid ID (passport, national ID card, or driver's license) of the property owner.",
    },
    {
      key: "propertyOwnership",
      title: "Property Ownership Proof",
      description: "Submit legal proof of ownership (title deed, property tax receipt, or utility bill under your name)",
    },
    {
      key: "safetyPermits",
      title: "Safety Permits",
      description: "Provide any required local safety approvals or compliance certificates.",
    },
    {
      key: "insuranceCertificate",
      title: "Insurance Certificate",
      description: "Upload proof of active property insurance covering liability or damage.",
    },
  ];

  const handleFileSelect = (docType: DocumentKey, selectedFile: File | undefined) => {
    if (!selectedFile) return;

    const fileData: FileData = {
      name: selectedFile.name,
      size: selectedFile.size,
      file: selectedFile,
    };

    setFiles(prev => ({
      ...prev,
      [docType]: fileData,
    }));

    if (selectedFile.type.startsWith("image/")) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrls(prev => ({
        ...prev,
        [docType]: url,
      }));
    } else {
      setPreviewUrls(prev => ({
        ...prev,
        [docType]: null,
      }));
    }

    // Update parent form data with all current files
    const updatedFiles = { ...files, [docType]: fileData };
    const allFiles = Object.values(updatedFiles).filter(Boolean).map(f => f!.file);
    onFieldChange("photos", allFiles);
  };


  const handleDrop = (e: DragEvent<HTMLDivElement>, docType: DocumentKey) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileSelect(docType, droppedFile);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // const formatFileSize = (bytes: number): string => {
  //   if (bytes === 0) return "0 Bytes";
  //   const k = 1024;
  //   const sizes = ["Bytes", "KB", "MB", "GB"];
  //   const i = Math.floor(Math.log(bytes) / Math.log(k));
  //   return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  // };

  const renderUploadCard = (doc: DocumentInfo) => {
    const file = files[doc.key];
    const previewUrl = previewUrls[doc.key];
    const hasError = errors.photos && !file;

    return (
      <div>
       <div
  className={`border-2 border-dashed rounded-lg bg-gradient-to-b from-[#202020] to-[#101010] h-[200px] cursor-pointer transition-colors
    ${hasError ? "border-red-500" : file ? "border-[#effc76]" : "border-[#effc76]"}
    ${file ? "p-0" : "p-8"}`}
  onDrop={(e) => handleDrop(e, doc.key)}
  onDragOver={handleDragOver}
  onClick={() => fileInputRefs[doc.key].current?.click()}
>
  <input
    ref={fileInputRefs[doc.key]}
    type="file"
    className="hidden"
    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
    onChange={(e: ChangeEvent<HTMLInputElement>) =>
      handleFileSelect(doc.key, e.target.files?.[0])
    }
  />

  {file ? (
    <div className="relative w-full h-full">
      {previewUrl ? (
        <Image
          src={previewUrl}
          alt="Document preview"
          className="w-full h-full object-cover rounded"
          fill
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-700 rounded">
          <span className="text-white text-sm font-bold">PDF</span>
        </div>
      )}

      {/* Overlay for replace */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition">
        <button
          onClick={(e) => {
            e.stopPropagation();
            fileInputRefs[doc.key].current?.click();
          }}
          className="text-[#EFFC76] text-[14px] font-medium underline"
        >
          Replace Document
        </button>
      </div>
    </div>
  ) : (
    // original upload UI
    <div className="text-center h-full flex flex-col justify-center">
      <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
        <Image src="/images/upload2.svg" alt="Upload docs" width={40} height={40} />
      </div>
      <h4 className="text-white font-regular leading-[20px] text-[16px] mb-2">
        {doc.title}
      </h4>
      {doc.description && (
        <p className="text-white/60 text-xs font-regular leading-[16px]">
          {doc.description}
        </p>
      )}
    </div>
  )}
</div>


        {hasError && (
          <p className="text-red-500 text-xs mt-2">
            {doc.title} is required
          </p>
        )}
      </div>
    );
  };

  return (
    <div>
      <h3 className="font-bold text-[20px] sm:text-[28px] sm:leading-[32px] mb-3">
        Upload Required Documents
      </h3>
      <p className="font-regular text-[12px] sm:text-[16px] sm:leading-[20px] max-w-[573px] text-white/60">
        Provide the necessary documents for verification. All files must be clear and
        legible.
      </p>



      <div className="pt-10"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {documentTypes.map((doc) => (
          <div key={doc.key}>
            {renderUploadCard(doc)}
          </div>
        ))}
      </div>
    </div>
  );
}