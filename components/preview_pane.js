import React from "react";
import styles from "../styles/editor.module.css";

export function ExportButton({ onClick }) {
  return (
    <button onClick={onClick} className={styles.exportButton}>
      Export
    </button>
  );
}

export default function PreviewPane({ pdfUrl }) {
  return (
    <div className={styles.previewPane}>
      <div className={styles.examplepdf}>
        <iframe
          src={pdfUrl}
          width="100%"
          height="100%"
          style={{ border: "none", flex: 1 }}
          title="PDF Preview"
        />
      </div>
    </div>
  );
}
