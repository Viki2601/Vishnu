'use client';
import About from "@/components/About";
import Landing from "@/components/Landing";
import Contact from "@/components/Contact";
import Timeline from "@/components/Timeline";
import Certificates from "@/components/Certificates";
import Project from "@/components/Project";
import FooterName from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Cursor from "@/common/Cursor";

export default function Home() {
  return (
    <>
      <Cursor />
      <main>
        <section id="hero">
          <Landing />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="journey">
          <Timeline />
        </section>
        <section id="certificates">
          <Certificates />
        </section>
        <section id="projects">
          <Project />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>
      <FooterName />
    </>
  );
}