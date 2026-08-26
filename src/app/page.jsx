import About from "@/components/About";
import Landing from "@/components/Landing";
import Contact from "@/components/Contact";
import Timeline from "@/components/Timeline";
import Certificates from "@/components/Certificates";
import Project from "@/components/Project";
import FooterName from "@/components/Footer";
import Cursor from "@/common/Cursor";
import Services from "@/components/Services";
import HorizontalScroll from "@/common/HorizontalScroll";

export default function Home() {
  return (
    <>
      <Cursor />
      <main>
        <HorizontalScroll revealLayer={<FooterName />}>
          <div className="horizontal-scroll__panel" id="hero"><Landing /></div>
          <div className="horizontal-scroll__panel p-4 md:p-12" id="about"><About /></div>
          <div className="horizontal-scroll__panel--extra-wide flex-shrink-0" id="journey"><Timeline /></div>
          <div className="horizontal-scroll__panel p-6 overflow-hidden" id="certificates"><Certificates /></div>
          <div className="horizontal-scroll__panel flex-shrink-0" id="projects"><Project /></div>
          <div className="horizontal-scroll__panel w-full md:w-[120vw] flex-shrink-0" id="services"><Services /></div>
          <div className="horizontal-scroll__panel rounded-r-[50px]" id="contact">
            <div className="relative z-10 w-full h-full bg-[var(--bg-accent)]"><Contact /></div>
          </div>
          <div className="horizontal-scroll__panel flex-shrink-0" id="reveal-spacer" style={{ width: '100vw' }} aria-hidden="true" />
        </HorizontalScroll>
      </main>
    </>
  );
}