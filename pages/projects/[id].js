import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/editor.module.css";
import { getProjectFiles as apiGetProjectFiles } from "@/lib/api/project_file";

import DocumentSidebar from "@/components/document_sidebar";
import EditorSplit from "@/components/editor_split";
import EditorPane from "@/components/editor_pane";
import PreviewPane from "@/components/preview_pane";
import Breadcrumbs from "@/components/breadcrumbs";

export default function Editor() {
  // ...
  const router = useRouter();

  const [projectFiles, setProjectFiles] = useState([]);
  const [selectedProjectFile, setSelectedProjectFile] = useState({});

  const getProjectFiles = async () => {
    const data = await apiGetProjectFiles();
    setProjectFiles(data);
    if (data.length > 0) {
      setSelectedProjectFile(data[0]);
    }
  };

  useEffect(() => {
    getProjectFiles();
  }, []);

  useEffect(() => {
    setProjectFiles((prevProjectFiles) =>
      prevProjectFiles.map((file) =>
        file.id === selectedProjectFile.id ? selectedProjectFile : file
      )
    );
  }, [selectedProjectFile]);

  const breadcrumbs = [
    { label: "Project Overview", href: "/projects" },
    { label: router.query.id, href: "/projects/" + router.query.id },
    { label: selectedProjectFile.name }
  ];

  return (
    <div className={styles.page}>
      <Breadcrumbs items={breadcrumbs} showBack={true} />
      <div className={styles.container}>
        <DocumentSidebar
          files={projectFiles}
          selectedFile={selectedProjectFile}
          onSelect={setSelectedProjectFile}
        />

        <EditorSplit>
          <EditorPane
            content={selectedProjectFile.content}
            onChange={(c) =>
              setSelectedProjectFile({ ...selectedProjectFile, content: c })
            }
          />
          <PreviewPane
            pdfUrl={`/_next/static/${selectedProjectFile.name?.replace(
              /\..*/,
              ".pdf"
            )}`}
          />
        </EditorSplit>
      </div>
    </div>
  );
}
