import React from "react";
import styles from "@/styles/editor.module.css";

export default function DocumentSidebar({ files, selectedFile, onSelect }) {
  return (
    <aside className={styles.sidebar}>
      <h2>Files</h2>
      <ul className={styles.fileList}>
        {files.map((file) => (
          <li key={file.id}>
            <button
              className={
                file.name === selectedFile.name
                  ? styles.fileItemSelected
                  : styles.fileItem
              }
              onClick={() => onSelect(file)}
            >
              {file.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
