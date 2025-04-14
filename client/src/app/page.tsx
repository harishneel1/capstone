"use client";

import Output from "@/components/Output";
import TextArea from "@/components/TextArea";
import { type ChatOutput } from "@/types";
import { useState } from "react";
import MessageBubble, { Message } from "@/components/MessageBubble";
import ChatWindow from "@/components/ChatWindow";


export default function Home() {
  const [currentQuery, setCurrentQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent, query: string) => {
    e.preventDefault();

    if (!query.trim()) return;

    // Add user message to the chat
    const userMessage: Message = {
      role: "user",
      content: query,
    };

    setMessages((prev) => [...prev, userMessage]);
    setCurrentQuery("");
    setIsLoading(true);

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
        throw new Error("Error fetching response");
      }

      const data = await response.json();

      if (data && data.answer) {
        const aiMessage: Message = {
          role: "assistant",
          content: data.answer,
        };

        setMessages((prev) => [...prev, aiMessage]);
      } else {
        const errorMessage: Message = {
          role: "assistant",
          content: "Sorry, I couldn't process your request at this time.",
        };

        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error(error);

      // Add error message to chat
      const errorMessage: Message = {
        role: "assistant",
        content: "An error occurred while processing your request. Please try again.",
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`container pt-10 pb-32 min-h-screen ${messages.length === 0 && "flex items-center justify-center"
        }`}
    >
      <div className="w-full">
        {messages.length === 0 && (
          <h1 className="text-4xl text-center mb-5">
            Ask me a Question!
          </h1>
        )}

        <ChatWindow messages={messages} />

        <TextArea
          onSubmit={handleSubmit}
          currentQuery={currentQuery}
          setCurrentQuery={setCurrentQuery}
        />

      </div>
    </div>
  );
}
