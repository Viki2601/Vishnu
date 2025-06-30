'use client';
import About from "@/components/About";
import Landing from "@/components/Landing";
import Contact from "@/components/Contact";
import Timeline from "@/components/Timeline";
import Certificates from "@/components/Certificates";
import Project from "@/components/Project";
import FooterName from "@/components/Footer";
import Cursor from "@/common/Cursor";
import Image from "next/image";
import profilePic from "@/assets/img/Banner.svg";
import { useRef, useState } from "react";

export default function Home() {
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);

  const handleClick = () => {
    setIsZoomed((prev) => !prev);
  };

  const handleMouseMove = (e) => {
    if (!isZoomed) return;
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    setPosition({ x, y });
  };
  return (
    <>
      <Cursor />
      <section className="flex flex-col items-center justify-center min-h-screen">
        <Landing />
      </section>
      <section className="flex flex-col items-center justify-center min-h-screen">
        <About />
      </section>
      <section className="flex flex-col items-center justify-center min-h-screen">
        <Timeline />
      </section>
      <section className="flex flex-col items-center justify-center min-h-screen">
        <Certificates />
      </section>
      <section className="flex flex-col items-center justify-center min-h-screen">
        <Project />
      </section>
      <section className="flex flex-col items-center justify-center min-h-screen">
        <Contact />
      </section>
      <FooterName />
      <div
        className="relative w-[400px] h-[400px] overflow-hidden cursor-zoom-in"
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        ref={imageRef}
      >
        <Image
          src={profilePic}
          alt="Astronaut"
          fill
          className={`object-contain select-none pointer-events-none transition-opacity duration-200 ${isZoomed ? 'opacity-0' : 'opacity-100'
            }`}
          priority
        />

        {isZoomed && (
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              backgroundImage: `url(${profilePic.src})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: '800px 800px',
              backgroundPosition: `${position.x}% ${position.y}%`,
              cursor: 'zoom-out',
            }}
          />
        )}
      </div>
    </>
  );
}
