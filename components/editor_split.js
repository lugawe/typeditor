import React, { useRef, useState, useEffect } from 'react';
import styles from '../styles/editor.module.css';

export default function EditorSplit({ children }) {
    const containerRef = useRef(null);

    const [leftWidth, setLeftWidth] = useState(null);

    const draggingRef = useRef(false);
    const startXRef = useRef(0);
    const startWidthRef = useRef(0);

    useEffect(() => {
        if (containerRef.current) {
            setLeftWidth(containerRef.current.clientWidth / 2);
        }
    }, []);

    useEffect(() => {
        function onMouseMove(e) {
            if (!draggingRef.current) return;
            const delta = e.clientX - startXRef.current;
            const newWidth = startWidthRef.current + delta;
            const containerWidth = containerRef.current.clientWidth;
            const min = 500;
            const max = containerWidth - 500;
            if (newWidth > min && newWidth < max) {
                setLeftWidth(newWidth);
            }
        }

        function onMouseUp() {
            draggingRef.current = false;
            document.body.style.cursor = '';
        }

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };
    }, []);

    function onMouseDown(e) {
        draggingRef.current = true;
        startXRef.current = e.clientX;
        startWidthRef.current = leftWidth;
        document.body.style.cursor = 'col-resize';
        e.preventDefault();
    }

    return (
        <div className={styles.editorSplit} ref={containerRef}>
            <div
                className={styles.editorPane}
                style={{ width: leftWidth, flex: 'none' }}
            >
                {children[0]}
            </div>

            <div
                className={styles.divider}
                onMouseDown={onMouseDown}
            />

            <div
                className={styles.previewPane}
                style={{ flex: 1 }}
            >
                {children[1]}
            </div>
        </div>
    );
}