import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";
import { checkSubscription } from "@/lib/subscription";

export async function PATCH(
    req: Request,
    { params }: { params: { friendId: string } }
) {
    try {
        const body = await req.json();
        const user = await currentUser();
        const { src, name, description, instructions, seed, categoryId } = body;

        if (!params.friendId) {
            return new NextResponse("Friend ID is required", { status: 400 });
        }

        if (!user || !user.id || !user.firstName) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!src || !name || !description || !instructions || !seed || !categoryId) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        const isPro = await checkSubscription();

        if (!isPro) {
            return new NextResponse("Pro subscription required", { status: 403 });
        }

        const friend = await prismadb.friend.update({
            where: {
                id: params.friendId,
                userId: user.id,
            },
            data: {
                categoryId,
                userId: user.id,
                userName: user.firstName,
                src,
                name,
                description,
                instructions,
                seed,
            }
        });

        return NextResponse.json(friend);
    } catch (error) {
        console.log("[FRIEND_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
};

export async function DELETE(
    req: Request,
    { params }: { params: { friendId: string } }
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const friend = await prismadb.friend.delete({
            where: {
                userId,
                id: params.friendId,
            },
        });

        return NextResponse.json(friend);
    } catch (error) {
        console.log("[FRIEND_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}