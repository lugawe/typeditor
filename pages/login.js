// pages/login.js
import styles from "../styles/login.module.css";
import { useState } from "react";
import { generateAccessToken } from "@/lib/api/account";

export default function Login() {
  // ...
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  async function submit() {
    const accessToken = await generateAccessToken(name, password);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.leftPanel}>
          <h1 className={styles.logo}>Typeditor</h1>
          <p className={styles.tagline}>Typst at your Fingertips!</p>
          <p className={styles.tagline}>- Anyone, Anywhere, Anything!</p>
        </div>
        <div className={styles.rightPanel}>
          <input
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
          />
          <input
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <button className={styles.button} onClick={submit}>
            Sign in
          </button>
          <a className={styles.link} href="/signup">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}
