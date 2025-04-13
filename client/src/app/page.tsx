"use client";

import Output from "@/components/Output";
import TextArea from "@/components/TextArea";
import { type ChatOutput } from "@/types";
import { useState } from "react";

export default function Home() {
  const [currentQuery, setCurrentQuery] = useState("");
  const [history, setHistory] = useState([])

  const handleSubmit = async (e: React.FormEvent, query: string) => {
    e.preventDefault()
    setCurrentQuery("");

    try {
      const response = await fetch(`http://localhost:8000/invoke`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: query,
          thread_id: "234"
        }),
      });

      if (!response.ok) {
        throw new Error("Error");
      }

      const data = await response.json()
      const { answer } = data || {};


    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  return (
    <div
      className={`container pt-10 pb-32 min-h-screen ${history.length === 0 && "flex items-center justify-center"
        }`}
    >
      <div className="w-full">
        {history.length === 0 && (
          <h1 className="text-4xl text-center mb-5">
            Ask me a Question!
          </h1>
        )}

        <TextArea
          onSubmit={handleSubmit}
          currentQuery={currentQuery}
          setCurrentQuery={setCurrentQuery}
        />

        {history.map((item, i) => {
          return <Output key={i} output={item} />;
        })}
      </div>
    </div>
  );
}
