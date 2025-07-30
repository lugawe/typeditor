import styles from "@/styles/editor.module.css";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";

import DocumentSidebar from "@/components/document_sidebar";
import EditorSplit from "@/components/editor_split";
import EditorPane from "@/components/editor_pane";
import EditorToolbar from '@/components/editor_toolbar';
import PreviewPane from "@/components/preview_pane";
import Breadcrumbs from "@/components/breadcrumbs";
import { createPDF } from "@/lib/api/project";
import { getProjectFiles as apiGetProjectFiles } from "@/lib/api/project_file";

export default function Editor() {
  const router = useRouter();

  const [projectFiles, setProjectFiles] = useState([]);
  const [selectedProjectFile, setSelectedProjectFile] = useState({});
  const [blobPdfUrl, setBlobPdfUrl] = useState({});
  const editorRef = useRef(null)

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

  function handleBold() {
    const ed = editorRef.current;
    const sel = ed.getSelection();
    const txt = ed.getModel().getValueInRange(sel);
    ed.executeEdits('toolbar', [{
      range: sel,
      text: `**${txt || 'bold'}**`,
      forceMoveMarkers: true
    }]);
  }

  function handleItalic() {
    const ed = editorRef.current;
    const sel = ed.getSelection();
    const txt = ed.getModel().getValueInRange(sel);
    ed.executeEdits('toolbar', [{
      range: sel,
      text: `*${txt || 'italic'}*`,
      forceMoveMarkers: true
    }]);
  }

  function handleUnderline() {
    const ed = editorRef.current;
    const sel = ed.getSelection();
    const txt = ed.getModel().getValueInRange(sel);
    ed.executeEdits('toolbar', [{
      range: sel,
      text: `_${txt || 'underline'}_`,
      forceMoveMarkers: true
    }]);
  }

  function handleHeading() {
    const ed = editorRef.current;
    const sel = ed.getSelection();
    const line = sel.startLineNumber;
    ed.executeEdits('toolbar', [{
      range: ed.getModel()
        .getFullModelRange()
        .setStartPosition(line, 1)
        .setEndPosition(line, 1),
      text: '= ',
      forceMoveMarkers: true
    }]);
  }

  function handleBulletList() {
    const ed = editorRef.current;
    const sel = ed.getSelection();
    const model = ed.getModel();
    const start = sel.startLineNumber;
    const end = sel.endLineNumber;
    const edits = [];
    for (let ln = start; ln <= end; ln++) {
      edits.push({
        range: model.getFullModelRange()
          .setStartPosition(ln, 1)
          .setEndPosition(ln, 1),
        text: '- ',
        forceMoveMarkers: true
      });
    }
    ed.executeEdits('toolbar', edits);
  }

  function handleNumberList() {
    const ed = editorRef.current;
    const sel = ed.getSelection();
    const model = ed.getModel();
    const start = sel.startLineNumber;
    const end = sel.endLineNumber;
    const edits = [];
    for (let i = 0; i <= end - start; i++) {
      const ln = start + i;
      edits.push({
        range: model.getFullModelRange()
          .setStartPosition(ln, 1)
          .setEndPosition(ln, 1),
        text: `${i + 1}. `,
        forceMoveMarkers: true
      });
    }
    ed.executeEdits('toolbar', edits);
  }

  function handleMath() {
    const ed = editorRef.current;
    const sel = ed.getSelection();
    const txt = ed.getModel().getValueInRange(sel);
    ed.executeEdits('toolbar', [{
      range: sel,
      text: `$${txt || 'expr'}$`,
      forceMoveMarkers: true
    }]);
  }

  function handleCode() {
    const ed = editorRef.current;
    const sel = ed.getSelection();
    const txt = ed.getModel().getValueInRange(sel);
    const block = '```typst\n' + (txt || '') + '\n```';
    ed.executeEdits('toolbar', [{
      range: sel,
      text: block + '\n',
      forceMoveMarkers: true
    }]);
  }

  function handleTable() {
    const ed = editorRef.current;
    const sel = ed.getSelection();
    const table = `#table(
row! => ["Col 1", "Col 2"],
row! => ["", ""],
+)`;
    ed.executeEdits('toolbar', [{
      range: sel,
      text: table + '\n',
      forceMoveMarkers: true
    }]);
  }

  function handleUndo() {
    editorRef.current.trigger('', 'undo', null);
  }
  function handleRedo() {
    editorRef.current.trigger('', 'redo', null);
  }

  const breadcrumbs = [
    { label: "Project Overview", href: "/projects" },
    { label: projectId, href: "/projects/" + projectId },
    { label: selectedProjectFile.name },
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

        <div className={styles.mainArea}>
          <div className={styles.shortcutsArea}>
            <EditorToolbar
              onBold={handleBold}
              onItalic={handleItalic}
              onUnderline={handleUnderline}
              onHeading={handleHeading}
              onBulletList={handleBulletList}
              onNumberList={handleNumberList}
              onMath={handleMath}
              onCode={handleCode}
              onTable={handleTable}
              onUndo={handleUndo}
              onRedo={handleRedo}
              onExport={compilePDF}
            />
          </div>

          <EditorSplit>
            <EditorPane
              content={selectedProjectFile.content}
              selectedFile={selectedProjectFile}
              onChange={(c) =>
                setSelectedProjectFile({ ...selectedProjectFile, content: c })
              }
              editorRef={editorRef}
            />
            <PreviewPane pdfUrl={blobPdfUrl} onExport={compilePDF} />
          </EditorSplit>
        </div>
      </div>
    </div>
  )
}
