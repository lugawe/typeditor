import React from 'react';
import styles from '../styles/editor.module.css';

export default function PreviewPane({ pdfUrl }) {
    return (
        <div className={styles.previewPane}>
            <div className={styles.examplepdf}>

            </div>
        </div>
    );
}