import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Certifications from "@/components/Certifications";
import Projects from "@/components/Projects";
// import AIStack from "@/components/AIStack";
import ChatWidget from "@/components/ChatWidget";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

// Page order is the narrative spine: who Christian is -> why he's
// different (experience + credentials) -> what he's built -> what he
// specializes in -> see it in action -> how to reach him.
export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Experience />
        <Certifications />
        <Projects />
        {/* <AIStack /> */}
        <ChatWidget />
        <ContactForm />
        <Footer />
      </main>
    </>
  );
}