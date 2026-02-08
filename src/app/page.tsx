import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import Projects from "./components/Projects";
import Contacts from "./components/Contacts";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Body />
      <About />
      <Projects />
      <Contacts />
      <Footer />
    </div>
  );
}
