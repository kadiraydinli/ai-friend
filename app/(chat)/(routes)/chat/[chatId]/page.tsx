import { redirect } from "next/navigation";
import { auth, redirectToSignIn } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

import ChatClient from "./components/client";

interface ChatIdPageProps {
    params: {
        chatId: string;
    };
}

const ChatIdPage = async ({ params }: ChatIdPageProps) => {
    const { userId } = auth();

    if (!userId) {
        return redirectToSignIn();
    }

    const friend = await prismadb.friend.findUnique({
        where: {
            id: params.chatId,
        },
        include: {
            messages: {
                orderBy: {
                    createdAt: "asc",
                },
                where: {
                    userId,
                },
            },
            _count: {
                select: {
                    messages: true,
                },
            },
        },
    });

    if (!friend) {
        return redirect("/");
    }

    return (
        <ChatClient friend={friend} />
    );
}

export default ChatIdPage;
