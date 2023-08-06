"use client";

import { cn } from "@/lib/utils";

interface CategoryItemProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> { }

const CategoryItem: React.FC<CategoryItemProps> = ({ className, ...props }) => {
    return (
        <button
            className={cn(`
                flex
                items-center
                text-center
                text-xs
                md:text-sm
                px-2
                md:px-4
                py-2
                md:py-3
                rounded-md 
                bg-primary/10
                hover:opacity-70
                transition
            `, className)}
            {...props}
        />
    );
}

export default CategoryItem;
