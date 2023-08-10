"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useCompletion } from "ai/react";
import { Friend, Message } from "@prisma/client";

import ChatHeader from "@/components/chat-header";
import ChatForm from "@/components/chat-form";
import ChatMessages from "@/components/chat-messages";
import { ChatMessageProps } from "@/components/chat-message";

interface ChatClientProps {
    friend: Friend & {
        messages: Message[],
        _count: {
            messages: number;
        };
    };
};

const ChatClient = ({ friend }: ChatClientProps) => {
    const router = useRouter();
    const [messages, setMessages] = useState<ChatMessageProps[]>(friend.messages as ChatMessageProps[]);

    const {
        input,
        isLoading,
        handleInputChange,
        handleSubmit,
        setInput
    } = useCompletion({
        api: `/api/chat/${friend.id}`,
        onFinish(prompt, completion) {
            const systemMessage: ChatMessageProps = {
                role: "system",
                content: completion,
            };

            setMessages((current) => [...current, systemMessage]);
            setInput("");

            router.refresh();
        },
    });

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        const userMessage: ChatMessageProps = {
            role: "user",
            content: input,
        };

        setMessages((current) => [...current, userMessage]);

        handleSubmit(e);
    }

    return (
        <div className="flex flex-col h-full p-4 space-y-2">
            <ChatHeader friend={friend} />
            <ChatMessages
                friend={friend}
                isLoading={isLoading}
                messages={messages}
            />
            <ChatForm
                isLoading={isLoading}
                input={input}
                handleInputChange={handleInputChange}
                onSubmit={onSubmit}
            />
        </div>
    );
}

export default ChatClient;
