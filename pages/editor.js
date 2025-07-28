import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation'
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
    const [content, setContent] = useState(
        `// This is a line comment
/* 
   This is a 
   block comment 
*/

= Welcome to Typst

Hello,\nnew line • non-breaking space: ~•~  

- Unordered list item  
- Another item  

1. First numbered item  
2. Second numbered item  

**Bold text**, *italic text*, _underlined text_  

$\alpha + beta = \gamma$  // inline math  

#let radius = 5cm  
#def area(r) { π * r^2 }  
#show area(radius)  

:star: a symbol  

<figure1>  
See @figure1 for reference  

`);
    const params = useSearchParams()
    const search = params.get('project')

    const crumbs = [
        { label: 'Project Overview', href: '/projects_overview' },
        { label: search, href: '/projects_overview' },
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
                <EditorPane content={content} onChange={setContent} />
                <PreviewPane pdfUrl={`/_next/static/${selected.replace(/\..*/, '.pdf')}`} />
            </EditorSplit>
        </div>
    </div>);
}