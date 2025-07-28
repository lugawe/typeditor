import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import styles from '../styles/breadcrumbs.module.css';

export default function Breadcrumbs({
    items,
    showBack = true,
}) {
    const router = useRouter();

    return (
        <nav className={styles.breadcrumbs}>
            {showBack && (
                <button
                    className={styles.back}
                    onClick={() => router.back()}
                >
                    &lt;
                </button>
            )}

            <Link className={styles.mainlink} href='/'>
                Typeditor
            </Link>
            <ul className={styles.list}>
                {items.map((item, idx) => {
                    const isLast = idx === items.length - 1;
                    return (
                        <li key={idx} className={styles.item}>
                            {item.href && !isLast ? (
                                <Link href={item.href}>
                                    {item.label}
                                </Link>
                            ) : (
                                <span className={isLast ? styles.active : undefined}>
                                    {item.label}
                                </span>
                            )}
                            {!isLast && <span className={styles.sep}>/</span>}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}