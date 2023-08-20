"use client";

import { useState } from "react";
import axios from "axios";
import { Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface SubscriptionButtonProps {
    isPro: boolean;
}

const SubscriptionButton: React.FC<SubscriptionButtonProps> = ({
    isPro = false
}) => {
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const onClick = async () => {
        try {
            setLoading(true);

            const response = await axios.get("/api/stripe");

            window.location.href = response.data.url;
        } catch (error) {
            toast({
                variant: "destructive",
                description: "Something went wrong."
            });
        } finally {
            setLoading(false);
        }
    }
    return (
        <Button
            size="sm"
            disabled={loading}
            variant={isPro ? "default" : "premium"}
            onClick={onClick}
        >
            {isPro ? "Manage Subscription" : "Upgrade"}
            {!isPro && <Sparkles className="h-4 w-4 ml-2 fill-white" />}
        </Button>
    );
}

export default SubscriptionButton;
