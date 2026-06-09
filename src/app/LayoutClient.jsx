'use client';
import { useState, useEffect } from 'react';
import SmoothScroll from "@/common/Smoothscroll";
import Navbar from "@/components/Navbar";
import LoadingPage from "@/components/LoadingPage";

export default function LayoutClient({ children, fonts }) {
    const [isLoadingComplete, setIsLoadingComplete] = useState(false);

    useEffect(() => {
        const hasSeenLoading = sessionStorage.getItem('loadingPageShown');
        if (hasSeenLoading) {
            setIsLoadingComplete(true);
        }
    }, []);

    const handleLoadingComplete = () => {
        setIsLoadingComplete(true);
        sessionStorage.setItem('loadingPageShown', 'true');
    };

    return (
        <body className={fonts} style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}>
            <LoadingPage onLoadingComplete={handleLoadingComplete} />
            {isLoadingComplete && (
                <SmoothScroll>
                    <Navbar />
                    {children}
                </SmoothScroll>
            )}
        </body>
    );
}
