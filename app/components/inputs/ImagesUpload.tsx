"use client";

import React, {
  ChangeEventHandler,
  DragEventHandler,
  useRef,
  useState,
} from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import Image from "next/image";
import { TbPhotoPlus } from "react-icons/tb";
import { toast } from "react-hot-toast";
import { ChangeHandler } from "react-hook-form";

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  onChange: (value: File) => void;
  value: File | null;
}

const validateFile = (file: File) => {
  if (!file.type.includes("image")) {
    toast.error("Available only images");
    return false;
  }

  return true;
};

const ImagesUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const [drag, setIsDrag] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onDragStart: DragEventHandler = (e) => {
    e.preventDefault();
    setIsDrag(true);
  };
  const onDragLeave: DragEventHandler = (e) => {
    e.preventDefault();
    setIsDrag(false);
  };
  const onDrop: DragEventHandler = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length && validateFile(files[0])) {
      onChange(files[0]);
    }
    setIsDrag(false);
  };
  const onFileInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = e.target.files;
    if (files && files.length && validateFile(files[0])) {
      onChange(files[0]);
    }
  };

  return (
    <div>
      <div
        onClick={() => inputRef.current?.click()}
        onDragStart={onDragStart}
        onDragLeave={onDragLeave}
        onDragOver={onDragStart}
        onDrop={onDrop}
        className={`relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 flex flex-col justify-center items-center gap-4 
            ${drag ? "border-red-300" : "border-neutral-300"}
            ${drag ? "text-red-600" : "text-neutral-600"}
            `}
      >
        <input
          ref={inputRef}
          type="file"
          multiple={false}
          onChange={onFileInputChange}
          style={{ display: "none" }}
        />
        {!value && (
          <>
            <TbPhotoPlus size={50} />
            <div className="font-semibold text-lg">Click to upload</div>
          </>
        )}
        {value && (
          <div className="absolute inset-0 w-full h-full">
            <Image
              alt={value.name}
              fill
              style={{ objectFit: "cover" }}
              decoding="sync"
              src={URL.createObjectURL(value)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImagesUpload;
