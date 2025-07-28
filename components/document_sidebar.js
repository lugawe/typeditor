import React from 'react';
import styles from '../styles/editor.module.css';

export default function DocumentSidebar({ docs, selected, onSelect }) {
    return (
        <aside className={styles.sidebar}>
            <h2>Files</h2>
            <ul className={styles.fileList}>
                {docs.map((d, i) => (
                    <li key={i}>
                        <button
                            className={d === selected ? styles.fileItemSelected : styles.fileItem}
                            onClick={() => onSelect(d)}
                        >
                            {d}
                        </button>
                    </li>
                ))}
            </ul>
        </aside>
    );
}