import React from 'react';
import styles from '../styles/login.module.css';

export default function Signup() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.leftPanel}>
          <h1 className={styles.logo}>Typeditor</h1>
          <p className={styles.tagline}>
            Start building beautiful docs
            in seconds
          </p>
        </div>
        <div className={styles.rightPanel}>
          <input
            className={styles.input}
            type="text"
            placeholder="ID"
          />
          <input
            className={styles.input}
            type="password"
            placeholder="Password"
          />
          <input
            className={styles.input}
            type="password"
            placeholder="Confirm password"
          />
          <button className={styles.button}>Sign up</button>
          <a className={styles.link} href="login">
            Login
          </a>
        </div>
      </div>
    </div>
  );
}
