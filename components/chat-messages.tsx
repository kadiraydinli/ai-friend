"use client";

import { ElementRef, useEffect, useRef, useState } from "react";
import { Friend } from "@prisma/client";

import ChatMessage, { ChatMessageProps } from "@/components/chat-message";

interface ChatMessagesProps {
    friend: Friend;
    isLoading: boolean;
    messages: ChatMessageProps[];
}

const ChatMessages: React.FC<ChatMessagesProps> = ({
    friend,
    isLoading,
    messages = []
}) => {
    const scrollRef = useRef<ElementRef<"div">>(null);
    const [fakeLoading, setFakeLoading] = useState(messages.length === 0);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setFakeLoading(false);
        }, 1000);

        return () => {
            clearTimeout(timeout);
        }
    }, []);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages.length]);

    return (
        <div className="flex-1 overflow-y-auto pr-4">
            <ChatMessage
                isLoading={fakeLoading}
                src={friend.src}
                role="system"
                content={`Hello, I am ${friend.name}, ${friend.description}`}
            />
            {messages.map((message, index) => (
                <ChatMessage
                    key={`${message.src}-${index}`}
                    isLoading={isLoading}
                    {...message}
                />
            ))}
            {isLoading && (
                <ChatMessage
                    role="system"
                    src={friend.src}
                    isLoading
                />
            )}
            <div ref={scrollRef} />
        </div>
    );
}

export default ChatMessages;
