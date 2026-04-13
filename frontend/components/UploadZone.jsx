"use client";

import { useRef } from "react";

export default function UploadZone({ file, setFile }) {
  const inputRef = useRef(null);

  function handleDrop(e) {
    e.preventDefault();
    const dropped = e.dataTransfer.files[0];
    if (dropped && dropped.type === "application/pdf") {
      setFile(dropped);
    }
  }

  function handleChange(e) {
    const selected = e.target.files[0];
    if (selected) setFile(selected);
  }

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      onClick={() => inputRef.current.click()}
      className="border-2 border-dashed border-blue-300 rounded-xl p-8 text-center cursor-pointer hover:bg-blue-50 transition"
    >
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        onChange={handleChange}
        className="hidden"
      />
      {file ? (
        <div>
          <p className="text-blue-600 font-medium">📄 {file.name}</p>
          <p className="text-gray-400 text-xs mt-1">Click to change file</p>
        </div>
      ) : (
        <div>
          <p className="text-4xl mb-2">📂</p>
          <p className="text-gray-600 font-medium">Drag & drop your PDF here</p>
          <p className="text-gray-400 text-xs mt-1">or click to browse</p>
        </div>
      )}
    </div>
  );
}
