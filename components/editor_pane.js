import React from 'react';
import dynamic from 'next/dynamic';
import styles from '../styles/editor.module.css';

const MonacoEditor = dynamic(
    () => import('@monaco-editor/react'),
    { ssr: false }
);

export default function EditorPane({ content, onChange }) {
    return (
        <div className={styles.editorPane}>
            <MonacoEditor
                height="100%"
                defaultLanguage="typst"
                value={content}
                onChange={(v) => onChange(v)}
                options={{
                    lineNumbers: 'on',
                    selectOnLineNumbers: true,
                    automaticLayout: true,
                    minimap: { enabled: false },
                }}
            />
        </div>
    );
}
