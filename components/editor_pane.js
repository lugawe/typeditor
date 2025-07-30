import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import styles from "../styles/editor.module.css";
import { typstMonarch } from "../grammars/typst_monarch";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

export default function EditorPane({ content = "", onChange, selectedFile }) {
  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;

    monaco.languages.register({ id: "typst" });
    monaco.languages.setMonarchTokensProvider("typst", typstMonarch);
    monaco.editor.setModelLanguage(editor.getModel(), "typst");
    monaco.languages.setLanguageConfiguration("typst", {
      comments: {
        lineComment: "//",
        blockComment: ["/*", "*/"],
      },
      brackets: [
        ["{", "}"],
        ["[", "]"],
        ["(", ")"],
      ],
      autoClosingPairs: [
        { open: "{", close: "}" },
        { open: "[", close: "]" },
        { open: "(", close: ")" },
        { open: '"', close: '"' },
        { open: "`", close: "`" },
      ],
    });
  }

  const ext = selectedFile?.name?.split(".").pop()?.toLowerCase();
  const isTextFile = ext === "typ" || ext === "txt";
  const isImageFile = ["png", "jpg", "jpeg"].includes(ext);

  return (
    <div className={styles.editorPane}>
      {isTextFile && (
        <MonacoEditor
          height="100%"
          defaultLanguage="typst"
          value={content}
          onChange={onChange}
          onMount={handleEditorDidMount}
          options={{
            lineNumbers: "on",
            minimap: { enabled: false },
            automaticLayout: true,
          }}
        />
      )}
      {isImageFile && (
        <img
          src={`/${selectedFile.name}`}
          alt={selectedFile.name}
          className={styles.imagePreview}
        />
      )}

      {!isTextFile && !isImageFile && <div>Unsupported file type</div>}
    </div>
  );
}
