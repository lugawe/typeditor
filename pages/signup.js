// pages/signup.js
import styles from "@/styles/login.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import { createAccount } from "@/lib/api/account";

export default function Signup() {
  // ...
  const router = useRouter();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function submit(e) {
    e.preventDefault();
    // const account = await createAccount(name, password);
    await router.push("/projects");
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.leftPanel}>
          <h1 className={styles.logo}>Typeditor</h1>
          <p className={styles.tagline}>
            Start building beautiful docs in seconds
          </p>
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
          <input
            className={styles.input}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="Confirm password"
            required
          />
          <button className={styles.button} type="submit">
            Sign up
          </button>
          <Link className={styles.link} href="/signin">
            Sign in
          </Link>
        </form>
      </div>
    </div>
  );
}
