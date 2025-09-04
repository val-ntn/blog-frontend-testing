// src/components/Admin/AdminLayout.jsx
import React from "react";

export default function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      {/* You can add an optional admin header here if needed */}
      <main className="admin-content">{children}</main>
    </div>
  );
}
