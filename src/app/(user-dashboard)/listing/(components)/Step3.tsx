import React, { useState, useRef, ChangeEvent, DragEvent } from "react";
// import { Upload } from "lucide-react";
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

export default function Step3() {
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

  const [, setDragStates] = useState<Record<DocumentKey, boolean>>({
    governmentId: false,
    propertyOwnership: false,
    safetyPermits: false,
    insuranceCertificate: false,
  });

  const fileInputRefs: Record<DocumentKey, React.RefObject<HTMLInputElement | null>> = {
  governmentId: useRef<HTMLInputElement | null>(null),
  propertyOwnership: useRef<HTMLInputElement | null>(null),
  safetyPermits: useRef<HTMLInputElement | null>(null),
  insuranceCertificate: useRef<HTMLInputElement | null>(null),
};

  const documentTypes: DocumentInfo[] = [
    {
      key: "governmentId",
      title: "Government-issued ID",
      description:"Upload a valid ID (passport, national ID card, or driver’s license) of the property owner."
    },
    {
      key: "propertyOwnership",
      title: "Property Ownership Proof",
      description:
        "Submit legal proof of ownership (title deed, property tax receipt, or utility bill under your name)",
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

  const handleFileSelect = (docType: DocumentKey, file: File | undefined) => {
    if (!file) return;

    setFiles((prev) => ({
      ...prev,
      [docType]: { name: file.name, size: file.size, file },
    }));

    if (file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setPreviewUrls((prev) => ({
        ...prev,
        [docType]: url,
      }));
    } else {
      setPreviewUrls((prev) => ({
        ...prev,
        [docType]: null,
      }));
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>, docType: DocumentKey) => {
    e.preventDefault();
    setDragStates((prev) => ({ ...prev, [docType]: false }));
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileSelect(docType, droppedFile);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>, docType: DocumentKey) => {
    e.preventDefault();
    setDragStates((prev) => ({ ...prev, [docType]: true }));
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>, docType: DocumentKey) => {
    e.preventDefault();
    setDragStates((prev) => ({ ...prev, [docType]: false }));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const renderUploadCard = (doc: DocumentInfo) => {
    const file = files[doc.key];
    // const isDragging = dragStates[doc.key];
    const previewUrl = previewUrls[doc.key];

    if (file) {
      return (
        <div className="border-2  border-dashed border-[#effc76]  h-[200px] rounded-lg p-8 bg-gradient-to-b from-[#202020] to-[#101010]">
          <div className="text-center mb-4">
            {previewUrl ? (
              <div className="w-20 h-16 mx-auto mb-2 rounded overflow-hidden">
                <Image
                  src={previewUrl}
                  width={80}
                  height={52}
                  alt="Document preview"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-12 h-8 bg-red-100 rounded mx-auto mb-2 flex items-center justify-center">
                <div className="w-8 h-6 bg-red-500 rounded-sm flex items-center justify-center text-white text-xs">
                  PDF
                </div>
              </div>
            )}
          </div>
          <div className="text-center">
            <h4 className="text-white/80 font-regular text-[12px] mb-5">
              {doc.title} ({formatFileSize(file.size)})
            </h4>
            <button
              onClick={() => fileInputRefs[doc.key].current?.click()}
              className="text-[#EFFC76CC] underline cursor-pointer text-sm font-medium  transition-colors"
            >
              Replace File
            </button>
          </div>
          <input
            ref={fileInputRefs[doc.key]}
            type="file"
            className="hidden"
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleFileSelect(doc.key, e.target.files?.[0])
            }
          />
        </div>
      );
    }

    return (
      <div
        className={`border-2 border-dashed rounded-lg p-8 bg-gradient-to-b from-[#202020] to-[#101010] border-[#effc76] h-[200px] cursor-pointer transition-colors `}
        onDrop={(e) => handleDrop(e, doc.key)}
        onDragOver={(e) => handleDragOver(e, doc.key)}
        onDragLeave={(e) => handleDragLeave(e, doc.key)}
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
        <div className="text-center">
          <div className="w-12 h-12  mx-auto mb-4 flex items-center justify-center">
            <Image src="/images/upload2.svg" alt="Upload docs" width={40} height={40} />
          </div>
          <h4 className="text-white font-regular leading-[20px] text-[16px] mb-2">{doc.title}</h4>
          {doc.description && (
            <p className="text-white/60 text-xs font-regular leading-[16px] ">{doc.description}</p>
          )}
        </div>
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
          <div key={doc.key}>{renderUploadCard(doc)}</div>
        ))}
      </div>
    </div>
  );
}
