import { useEffect, useState } from "react";

const StarsAndMeteors = () => {
    const [meteors, setMeteors] = useState([]);

    useEffect(() => {
        const newMeteors = Array.from({ length: 10 }).map((_, index) => ({
            id: index,
            top: Math.random() * window.innerHeight,
            left: Math.random() * window.innerWidth,
            delay: Math.random() * 5,
            duration: Math.random() * 2 + 1,
        }));
        setMeteors(newMeteors);
    }, []);
    return (
        <svg
            className="absolute inset-0 w-full h-full z-10"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
        >
            {/* Stars */}
            {[...Array(80)].map((_, i) => (
                <circle
                    key={i}
                    cx={Math.random() * 100 + '%'}
                    cy={Math.random() * 100 + '%'}
                    r={Math.random() * 1.2 + 0.3}
                    fill="#ffffff88"
                >
                    <animate
                        attributeName="opacity"
                        values="0.2;1;0.2"
                        dur={`${Math.random() * 3 + 2}s`}
                        repeatCount="indefinite"
                        begin={`${Math.random() * 5}s`}
                    />
                </circle>
            ))}
        </svg>
    );
};
export default StarsAndMeteors;