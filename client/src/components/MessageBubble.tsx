import MarkdownRenderer from "@/components/MarkdownRenderer";

export interface Message {
    role: "user" | "assistant";
    content: string;
}

interface MessageBubbleProps {
    message: Message;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
    const isUser = message.role === "user";

    return (
        <div
            className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}
        >
            <div
                className={`max-w-[80%] p-4 rounded-lg ${isUser
                    ? "bg-blue-600 text-white rounded-tr-none"
                    : "bg-gray-800 rounded-tl-none"
                    }`}
            >
                {isUser ? (
                    <p className="whitespace-pre-wrap">{message.content}</p>
                ) : (
                    <div
                        className="prose dark:prose-invert prose-pre:whitespace-pre-wrap"
                        style={{ overflowWrap: "anywhere" }}
                    >
                        <MarkdownRenderer content={message.content} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default MessageBubble;