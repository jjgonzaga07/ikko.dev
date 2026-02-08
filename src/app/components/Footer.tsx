"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Quote animation
      gsap.from(quoteRef.current, {
        x: -80,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          toggleActions: "play none none none"
        }
      });

      // Socials animation
      gsap.from(socialsRef.current, {
        x: 80,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          toggleActions: "play none none none"
        }
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer 
      ref={footerRef}
      className="w-full bg-[#43302E] py-6 sm:py-8 px-4 sm:px-6 md:px-12 lg:px-20 border-t-2 border-[#43302E]"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Quote */}
        <div ref={quoteRef} className="text-center md:text-left">
          <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl italic">
            &ldquo;If debugging is the process of removing software bugs,
          </p>
          <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl italic">
            then programming must be the process of putting them in.&rdquo;
          </p>
          <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl mt-1">
            - Edsger Dijkstra
          </p>
        </div>

        {/* Social Links */}
        <div ref={socialsRef} className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
          <span className="text-white text-base sm:text-lg md:text-xl tracking-wider">
            FOLLOW ME HERE.
          </span>
          <div className="flex items-center gap-4">
            <a
              href="https://web.facebook.com/jjameeess"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
            >
              <Image
                src="/socials/FACEBOOK.svg"
                alt="Facebook"
                width={28}
                height={28}
                className="w-7 h-7 sm:w-8 sm:h-8"
              />
            </a>
            <a
              href="https://www.instagram.com/_jjameees/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
            >
              <Image
                src="/socials/INSTAGRAM.svg"
                alt="Instagram"
                width={28}
                height={28}
                className="w-7 h-7 sm:w-8 sm:h-8"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
