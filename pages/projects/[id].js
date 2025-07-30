import styles from "@/styles/editor.module.css";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import DocumentSidebar from "@/components/document_sidebar";
import EditorSplit from "@/components/editor_split";
import EditorPane from "@/components/editor_pane";
import PreviewPane from "@/components/preview_pane";
import Breadcrumbs from "@/components/breadcrumbs";
import { createPDF } from "@/lib/api/project";
import { getProjectFiles as apiGetProjectFiles } from "@/lib/api/project_file";

export default function Editor() {
  // ...
  const router = useRouter();

  const [projectFiles, setProjectFiles] = useState([]); 
  const [selectedProjectFile, setSelectedProjectFile] = useState({});
  const [blobPdfUrl, setBlobPdfUrl] = useState({});


  const projectId = router.query.id;

  const getProjectFiles = async () => {
    const data = await apiGetProjectFiles(projectId);
    setProjectFiles(data);
    if (data.length > 0) {
      setSelectedProjectFile(data[0]);
    }
  };

  const compilePDF = async () => {
    const blob = await createPDF(projectId);
    setBlobPdfUrl(blob);
  };

  useEffect(() => {
    getProjectFiles();
    compilePDF();
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
    { label: projectId, href: "/projects/" + projectId },
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
          <PreviewPane pdfUrl={blobPdfUrl} onExport={compilePDF} />
        </EditorSplit>
      </div>
    </div>
  );
}
