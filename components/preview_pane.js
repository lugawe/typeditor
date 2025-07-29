import React from 'react';
import styles from '../styles/editor.module.css';

export default function PreviewPane({ pdfUrl }) {
    return (
        <div className={styles.previewPane}>
            <div className={styles.examplepdf}>
                <iframe
                    src={pdfUrl}
                    width="100%"
                    height="100%"
                    style={{ border: "none" }}
                    title="PDF Preview"
                />
            </div>
        </div>
    );
}