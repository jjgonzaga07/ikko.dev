"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

export default function Header() {
  const [bgColor, setBgColor] = useState("#FFF1B5");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP Timeline for header animation
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Set initial states
    gsap.set(headerRef.current, { yPercent: -100, opacity: 0 });
    gsap.set(logoRef.current, { x: -50, opacity: 0 });
    gsap.set(navLinksRef.current?.children || [], { y: -20, opacity: 0 });
    gsap.set(socialsRef.current?.children || [], { x: 30, opacity: 0 });

    // Animate in sequence
    tl.to(headerRef.current, { yPercent: 0, opacity: 1, duration: 0.6, delay: 0.2 })
      .to(logoRef.current, { x: 0, opacity: 1, duration: 0.5 }, "-=0.3")
      .to(navLinksRef.current?.children || [], { 
        y: 0, 
        opacity: 1, 
        duration: 0.4, 
        stagger: 0.1 
      }, "-=0.2")
      .to(socialsRef.current?.children || [], { 
        x: 0, 
        opacity: 1, 
        duration: 0.4, 
        stagger: 0.1 
      }, "-=0.3");

  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      const aboutSection = document.getElementById("about");
      const projectsSection = document.getElementById("projects");
      const contactsSection = document.getElementById("contacts");

      if (contactsSection && scrollPosition >= contactsSection.offsetTop) {
        setBgColor("#C1DBE8");
      } else if (projectsSection && scrollPosition >= projectsSection.offsetTop) {
        setBgColor("#FFF1B5");
      } else if (aboutSection && scrollPosition >= aboutSection.offsetTop) {
        setBgColor("#C1DBE8");
      } else {
        setBgColor("#FFF1B5");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animate mobile menu
  useEffect(() => {
    if (mobileMenuRef.current) {
      if (isMobileMenuOpen) {
        gsap.to(mobileMenuRef.current, {
          height: "auto",
          opacity: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      } else {
        gsap.to(mobileMenuRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in"
        });
      }
    }
  }, [isMobileMenuOpen]);

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      ref={headerRef}
      className="w-full py-3 sm:py-4 px-4 sm:px-6 md:px-12 lg:px-20 border-b-2 border-[#43302E] sticky top-0 z-50 transition-colors duration-300"
      style={{ backgroundColor: bgColor }}
    >
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo/Name */}
        <div ref={logoRef} className="text-[#43302E] text-xl sm:text-2xl md:text-3xl">
          Hi! I&apos;m Ikko!
        </div>

        {/* Navigation Links - Desktop */}
        <div ref={navLinksRef} className="hidden md:flex items-center gap-6 lg:gap-8 text-[#43302E] text-lg lg:text-xl">
          <Link href="#about" className="hover:underline transition-all">
            About
          </Link>
          <Link href="#projects" className="hover:underline transition-all">
            Projects
          </Link>
          <Link href="#contacts" className="hover:underline transition-all">
            Contacts
          </Link>
        </div>

        {/* Social Icons - Desktop */}
        <div ref={socialsRef} className="hidden sm:flex items-center gap-3 md:gap-4">
          <a
            href="https://github.com/jjgonzaga07"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70 transition-opacity"
          >
            <Image
              src="/socials/GITHUB.svg"
              alt="GitHub"
              width={24}
              height={24}
              className="w-6 h-6 md:w-7 md:h-7"
            />
          </a>
          <a
            href="https://www.linkedin.com/in/jjgonzaga07/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70 transition-opacity"
          >
            <Image
              src="/socials/LINKEDIN.svg"
              alt="LinkedIn"
              width={24}
              height={24}
              className="w-6 h-6 md:w-7 md:h-7"
            />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-[#43302E] text-2xl p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div 
        ref={mobileMenuRef}
        className="md:hidden overflow-hidden"
        style={{ height: 0, opacity: 0 }}
      >
        <div className="flex flex-col items-center gap-4 py-4 border-t border-[#43302E] mt-3">
          <Link 
            href="#about" 
            className="text-[#43302E] text-xl hover:underline"
            onClick={handleNavClick}
          >
            About
          </Link>
          <Link 
            href="#projects" 
            className="text-[#43302E] text-xl hover:underline"
            onClick={handleNavClick}
          >
            Projects
          </Link>
          <Link 
            href="#contacts" 
            className="text-[#43302E] text-xl hover:underline"
            onClick={handleNavClick}
          >
            Contacts
          </Link>
          
          {/* Mobile Social Icons */}
          <div className="flex items-center gap-4 pt-2">
            <a
              href="https://github.com/jjgonzaga07"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
            >
              <Image
                src="/socials/GITHUB.svg"
                alt="GitHub"
                width={28}
                height={28}
              />
            </a>
            <a
              href="https://www.linkedin.com/in/jjgonzaga07/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
            >
              <Image
                src="/socials/LINKEDIN.svg"
                alt="LinkedIn"
                width={28}
                height={28}
              />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
