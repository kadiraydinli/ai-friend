"use client";

import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import { Category } from "@prisma/client";

import CategoryItem from "./category-item";

interface CategoriesProps {
    data: Category[];
}

const Categories: React.FC<CategoriesProps> = ({ data }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const categoryId = searchParams.get("categoryId");

    const onClick = (id: string | undefined) => {
        const query = { categoryId: id };

        const url = qs.stringifyUrl({
            url: window.location.href,
            query,
        }, { skipNull: true });

        router.push(url);
    }

    return (
        <div className="w-full overflow-x-auto space-x-2 flex p-1">
            <CategoryItem
                className={!categoryId ? "bg-primary/25" : "bg-primary/10"}
                onClick={() => onClick(undefined)}
            >
                Newest
            </CategoryItem>
            {data.map((item) => (
                <CategoryItem
                    key={item.id}
                    className={item.id === categoryId ? "bg-primary/25" : "bg-primary/10"}
                    onClick={() => onClick(item.id)}
                >
                    {item.name}
                </CategoryItem>
            ))}
        </div>
    );
}

export default Categories;
