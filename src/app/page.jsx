'use client';
import About from "@/components/About";
import Landing from "@/components/Landing";
import Contact from "@/components/Contact";
import Timeline from "@/components/Timeline";
import Certificates from "@/components/Certificates";
import Project from "@/components/Project";
import { motion } from "framer-motion";
import FooterName from "@/components/Footer";

export default function Home() {
  return (
    <>
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
    </>
  );
}
