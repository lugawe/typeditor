import React, { useState } from 'react';
import { useRouter } from "next/router";
import styles from '@/styles/editor.module.css';

import DocumentSidebar from '@/components/document_sidebar';
import EditorSplit from '@/components/editor_split';
import EditorPane from '@/components/editor_pane';
import PreviewPane from '@/components/preview_pane';
import Breadcrumbs from '@/components/breadcrumbs';

export default function EditorPage() {
    const router = useRouter();

    const docs = [
        'sources_and_notes.typ',
        'test.typ',
        'main.typ',
        'subtext.typ',
        'description.png',
        'example_01.png',
        'header.jpg'
    ];

    const [selected, setSelected] = useState(docs[0]);
    const [content, setContent] = useState();

    const crumbs = [
        { label: 'Project Overview', href: '/projects_overview' },
        { label: 'Project 1', href: '/projects_overview' },
        { label: selected }
    ];

    return (<div className={styles.page}>
        <Breadcrumbs items={crumbs} showBack={true} />
        <div className={styles.container}>
            <DocumentSidebar
                docs={docs}
                selected={selected}
                onSelect={setSelected}
            />

            <EditorSplit>
                <EditorPane content={content} />
                <PreviewPane pdfUrl={`/_next/static/${selected.replace(/\..*/, '.pdf')}`} />
            </EditorSplit>
        </div>
    </div>);
}