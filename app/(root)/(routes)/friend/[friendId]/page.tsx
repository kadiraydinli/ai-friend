import prismadb from "@/lib/prismadb";

import FriendForm from "./components/friend-form";

interface FriendIdPageProps {
    params: {
        friendId: string;
    };
};

const FriendIdPage = async ({ params }: FriendIdPageProps) => {
    // TODO: Check subscription

    const friend = await prismadb.friend.findUnique({
        where: {
            id: params.friendId,
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
