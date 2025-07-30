import React from 'react';
import {
    FaBold,
    FaItalic,
    FaUnderline,
    FaHeading,
    FaListUl,
    FaListOl,
    FaSuperscript,
    FaCode,
    FaTable,
    FaUndoAlt,
    FaRedoAlt,
} from 'react-icons/fa';
import { ExportButton } from './preview_pane';
import styles from '../styles/editor.module.css';

export default function EditorToolbar({
    onBold,
    onItalic,
    onUnderline,
    onHeading,
    onBulletList,
    onNumberList,
    onMath,
    onCode,
    onTable,
    onUndo,
    onRedo,
    onExport
}) {
    return (
        <div className={styles.toolbar}>
            <div className={styles.spacersmall} />
            <button onClick={onBold} title="Bold"><FaBold /></button>
            <button onClick={onItalic} title="Italic"><FaItalic /></button>
            <button onClick={onUnderline} title="Underline"><FaUnderline /></button>
            <div className={styles.spacersmall} />
            <button onClick={onHeading} title="Heading"><FaHeading /></button>
            <button onClick={onBulletList} title="Bulleted List"><FaListUl /></button>
            <button onClick={onNumberList} title="Numbered List"><FaListOl /></button>
            <button onClick={onMath} title="Math"><FaSuperscript /></button>
            <button onClick={onCode} title="Code Block"><FaCode /></button>
            <button onClick={onTable} title="Table"><FaTable /></button>
            <div className={styles.spacersmall} />
            <button onClick={onUndo} title="Undo"><FaUndoAlt /></button>
            <button onClick={onRedo} title="Redo"><FaRedoAlt /></button>
            <div className={styles.spacer} />
            <ExportButton onClick={onExport} />
        </div>
    );
}
