"use client";

import React, { useState, useRef } from "react";
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react";

interface ImageUploadProps {
  onUploadSuccess: (url: string) => void;
  onUploadError: (error: string) => void;
  disabled?: boolean;
}

export default function ImageUpload({
  onUploadSuccess,
  onUploadError,
  disabled = false,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      onUploadError("Please select an image file");
      return;
    }

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      onUploadError("File size must be less than 10MB");
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload file
    uploadFile(file);
  };

  const uploadFile = async (file: File) => {
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Upload failed");
      }

      if (result.success) {
        onUploadSuccess(result.url);
      } else {
        throw new Error(result.error || "Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      onUploadError(error instanceof Error ? error.message : "Upload failed");
      setPreview(null);
    } finally {
      setUploading(false);
    }
  };

  const clearPreview = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4">
      {/* Upload Button */}
      <div className="relative">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          disabled={disabled || uploading}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled || uploading}
          className="w-full flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-zinc-700 bg-zinc-900/50 p-6 text-zinc-400 hover:border-indigo-500 hover:text-indigo-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-sm font-medium">Uploading...</span>
            </>
          ) : (
            <>
              <Upload className="h-5 w-5" />
              <span className="text-sm font-medium">
                Click to upload payment screenshot
              </span>
            </>
          )}
        </button>
      </div>

      {/* Preview */}
      {preview && (
        <div className="relative rounded-xl border border-zinc-800 bg-zinc-950 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4 text-indigo-400" />
              <span className="text-sm font-medium text-zinc-300">
                Payment Screenshot Preview
              </span>
            </div>
            <button
              type="button"
              onClick={clearPreview}
              className="text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="relative max-w-sm mx-auto">
            <img
              src={preview}
              alt="Payment screenshot preview"
              className="w-full h-auto rounded-lg border border-zinc-800"
            />
            {uploading && (
              <div className="absolute inset-0 bg-zinc-950/80 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Loader2 className="h-6 w-6 animate-spin text-indigo-400 mx-auto mb-2" />
                  <span className="text-xs text-zinc-400">Uploading...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <p className="text-xs text-zinc-500 text-center">
        Supported formats: JPG, PNG, WebP • Max size: 10MB
      </p>
    </div>
  );
}
