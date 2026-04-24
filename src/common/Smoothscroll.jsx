"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function SmoothScroll({ children }) {
    const pathname = usePathname();

    // Keep the behavior of resetting scroll on route change,
    // but rely on the browser's native scrolling for performance.
    useEffect(() => {
        if (typeof window !== "undefined") {
            window.scrollTo(0, 0);
        }
    }, [pathname]);

    return <>{children}</>;
}