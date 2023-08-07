"use client";

import { Friend, Message } from "@prisma/client";

import ChatHeader from "@/components/chat-header";

interface ChatClientProps {
    friend: Friend & {
        messages: Message[],
        _count: {
            messages: number;
        };
    };
};

const ChatClient = ({ friend }: ChatClientProps) => {
    return (
        <div className="flex flex-col h-full p-4 space-y-2">
            <ChatHeader friend={friend} />
        </div>
    );
}

export default ChatClient;
