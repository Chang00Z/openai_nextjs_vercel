"use client";
import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [sentence, setSentence] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/grammar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sentence }),
      });

      const data = await res.json();
      setResponse(data.result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>英文文法解釋器</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          className={styles.input}
          value={sentence}
          onChange={(e) => setSentence(e.target.value)}
          placeholder="貼入句子"
        />
        <button type="submit" className={styles.button} disabled={isLoading}>
          {isLoading ? "載入中..." : "送出"}
        </button>
      </form>
      {response && (
        <p className={styles.result}>
          {response.split("\n").map((text, idx) => (
            <div key={idx}>{text}</div>
          ))}
        </p>
      )}
    </div>
  );
}
