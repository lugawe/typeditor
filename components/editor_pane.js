import React from 'react';
import styles from '../styles/editor.module.css';

export default function EditorPane({ content }) {
    return (
        <div className={styles.editorPane}>
            <pre>{content}</pre>
        </div>
    );
}