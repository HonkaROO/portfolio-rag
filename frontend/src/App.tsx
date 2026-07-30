import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import ChatWidget from "@/components/ChatWidget";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <ChatWidget />
        <ContactForm />
        <Footer />
      </main>
    </>
  );
}
