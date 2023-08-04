import { useEffect, useState } from "react";

const DELAY = 500;

function useDebounce<T>(value: T, delay?: number): T {
    const [debounceValue, setDebounceValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebounceValue(value), delay || DELAY);

        return () => {
            clearTimeout(timer);
        }
    }, [value, delay]);

    return debounceValue;
};

export default useDebounce;
