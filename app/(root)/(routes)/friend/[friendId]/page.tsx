import { auth, redirectToSignIn } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

import FriendForm from "./components/friend-form";

interface FriendIdPageProps {
    params: {
        friendId: string;
    };
};

const FriendIdPage = async ({ params }: FriendIdPageProps) => {
    const { userId } = auth();
    // TODO: Check subscription

    if (!userId) {
        return redirectToSignIn();
    }

    const friend = await prismadb.friend.findUnique({
        where: {
            id: params.friendId,
            userId,
        }
    });

    const categories = await prismadb.category.findMany();

    return (
        <FriendForm
            initialData={friend}
            categories={categories}
        />
    );
}

export default FriendIdPage;
