'use client';
import { useState, useEffect } from 'react';
import SmoothScroll from "@/common/Smoothscroll";
import LoadingPage from "@/components/LoadingPage";

export default function LayoutClient({ children, fonts }) {
    const [showLoader, setShowLoader] = useState(false);
    const [loaderDone, setLoaderDone] = useState(false);

    useEffect(() => {
        const seen = sessionStorage.getItem('loadingPageShown');
        if (!seen) setShowLoader(true);
    }, []);

    const handleLoadingComplete = () => {
        setLoaderDone(true);
        sessionStorage.setItem('loadingPageShown', 'true');
        setTimeout(() => setShowLoader(false), 600);
    };

    return (
        <body className={fonts} style={{ fontFamily: 'var(--font-jura), system-ui, sans-serif' }}>
            <SmoothScroll>
                {children}
            </SmoothScroll>

            {showLoader && (
                <LoadingPage onLoadingComplete={handleLoadingComplete} done={loaderDone} />
            )}
        </body>
    );
}