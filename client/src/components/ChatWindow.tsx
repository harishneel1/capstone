import { useRef, useEffect } from "react";
import MessageBubble, { Message } from "./MessageBubble";

interface ChatWindowProps {
    messages: Message[];
}

const ChatWindow = ({ messages }: ChatWindowProps) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to the bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="w-full mb-6">
            {messages.length === 0 ? (
                <div className="text-center text-gray-500 my-10">
                    <p>No messages yet. Start a conversation!</p>
                </div>
            ) : (
                <div className="space-y-2">
                    {messages.map((message, index) => (
                        <MessageBubble key={index} message={message} />
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            )}
        </div>
    );
};

export default ChatWindow;