// pages/signin.js
import styles from "@/styles/login.module.css";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { generateAccessToken } from "@/lib/api/account";

export default function Signin() {
  // ...
  const router = useRouter();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();
    // const accessToken = await generateAccessToken(name, password);
    sessionStorage.removeItem("projects");
    await router.push("/projects");
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.leftPanel}>
          <h1 className={styles.logo}>Typeditor</h1>
          <p className={styles.tagline}>Typst at your Fingertips!</p>
          <p className={styles.tagline}>- Anyone, Anywhere, Anything!</p>
        </div>
        <form className={styles.rightPanel} onSubmit={submit}>
          <input
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
            required
          />
          <input
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            required
          />
          <button className={styles.button} type="submit">
            Sign in
          </button>
          <Link className={styles.link} href="/signup">
            Sign up
          </Link>
        </form>
      </div>
    </div>
  );
}
