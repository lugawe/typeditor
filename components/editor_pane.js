import React, { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import styles from '../styles/editor.module.css'
import { typstMonarch } from '../grammars/typst_monarch';

const MonacoEditor = dynamic(
    () => import('@monaco-editor/react'),
    { ssr: false }
)

export default function EditorPane({ content = '', onChange }) {
    const editorRef = useRef(null)

    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor

        monaco.languages.register({ id: 'typst' })
        monaco.languages.setMonarchTokensProvider('typst', typstMonarch)
        monaco.editor.setModelLanguage(editor.getModel(), 'typst')
        monaco.languages.setLanguageConfiguration('typst', {
            comments: {
                lineComment: '//',
                blockComment: ['/*', '*/']
            },
            brackets: [
                ['{', '}'], ['[', ']'], ['(', ')']
            ],
            autoClosingPairs: [
                { open: '{', close: '}' },
                { open: '[', close: ']' },
                { open: '(', close: ')' },
                { open: '"', close: '"' },
                { open: '`', close: '`' }
            ]
        })
    }

    return (
        <div className={styles.editorPane}>
            <MonacoEditor
                height="100%"
                defaultLanguage="typst"
                value={content}
                onChange={onChange}
                onMount={handleEditorDidMount}
                options={{
                    lineNumbers: 'on',
                    minimap: { enabled: false },
                    automaticLayout: true,
                }}
            />
        </div>
    )
}
