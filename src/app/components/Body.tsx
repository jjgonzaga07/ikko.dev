"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

export default function Body() {
  const [isFlipped, setIsFlipped] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const coinRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP Timeline for body animation
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Set initial states
    gsap.set(coinRef.current, { scale: 0, opacity: 0, rotation: -180 });
    gsap.set(nameRef.current, { y: 50, opacity: 0 });
    gsap.set(titleRef.current, { y: 30, opacity: 0 });
    gsap.set(taglineRef.current, { y: 30, opacity: 0 });
    gsap.set(ctaRef.current, { y: 30, opacity: 0 });

    // Animate in sequence with smooth easing
    tl.to(coinRef.current, { 
      scale: 1, 
      opacity: 1, 
      rotation: 0, 
      duration: 0.8, 
      delay: 0.5,
      ease: "back.out(1.7)" 
    })
      .to(nameRef.current, { 
        y: 0, 
        opacity: 1, 
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.3")
      .to(titleRef.current, { 
        y: 0, 
        opacity: 1, 
        duration: 0.5,
        ease: "power2.out"
      }, "-=0.2")
      .to(taglineRef.current, { 
        y: 0, 
        opacity: 1, 
        duration: 0.5,
        ease: "power2.out"
      }, "-=0.2")
      .to(ctaRef.current, { 
        y: 0, 
        opacity: 1, 
        duration: 0.5,
        ease: "power2.out"
      }, "-=0.2");

  }, []);

  const handleFlip = () => {
    if (!isFlipped) {
      // Animate the coin flip with GSAP
      gsap.to(coinRef.current?.querySelector('.coin-inner'), {
        rotateY: 180,
        duration: 0.7,
        ease: "power2.inOut"
      });
      setIsFlipped(true);
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="body" 
      className="w-full bg-[#C1DBE8] min-h-[calc(100vh-56px)] sm:min-h-[calc(100vh-60px)] flex items-center justify-center px-4 sm:px-6 md:px-12 lg:px-20 py-8 sm:py-12 border-b-2 border-[#43302E]"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Profile Picture - Coin Flip */}
        <div 
          ref={coinRef}
          className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 mb-6 sm:mb-8 cursor-pointer"
          onClick={handleFlip}
          style={{ perspective: "1000px" }}
        >
          <div 
            className="coin-inner relative w-full h-full"
            style={{ 
              transformStyle: "preserve-3d",
              transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
              transition: "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)"
            }}
          >
            {/* Back of coin (shown first) */}
            <div 
              className="absolute w-full h-full rounded-full bg-[#FFF1B5] border-4 border-[#43302E] flex items-center justify-center p-3 sm:p-4"
              style={{ 
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden"
              }}
            >
              <div className="text-center">
                <p className="text-[#43302E] text-xs sm:text-sm md:text-base lg:text-lg leading-tight">
                  Click to see the image of the developer
                </p>
              </div>
            </div>

            {/* Front of coin (profile picture) */}
            <div 
              className="absolute w-full h-full rounded-full"
              style={{ 
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(180deg)"
              }}
            >
              <Image
                src="/PICTURE.svg"
                alt="Jericho James Gonzaga"
                fill
                className="rounded-full object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Name */}
        <h1 
          ref={nameRef}
          className="text-[#43302E] text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl tracking-wider mb-2 sm:mb-4 px-2"
        >
          JERICHO JAMES GONZAGA
        </h1>

        {/* Title */}
        <p 
          ref={titleRef}
          className="text-[#43302E] text-lg sm:text-xl md:text-2xl lg:text-3xl italic mb-4 sm:mb-6"
        >
          full stack developer
        </p>

        {/* Tagline */}
        <h2 
          ref={taglineRef}
          className="text-[#43302E] text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-6 sm:mb-10"
        >
          Code. Build. Scale.
        </h2>

        {/* CTA Button and Text */}
        <div 
          ref={ctaRef}
          className="flex flex-col items-center gap-4 sm:gap-6 md:flex-row md:gap-10"
        >
          <a
            href="#"
            className="px-6 sm:px-8 py-2 sm:py-3 bg-[#FFF1B5] border-2 border-[#43302E] text-[#43302E] text-lg sm:text-xl md:text-2xl rounded-full hover:bg-[#43302E] hover:text-[#FFF1B5] transition-all"
          >
            download resume
          </a>
          <span className="text-[#43302E] text-lg sm:text-xl md:text-2xl italic">
            from concept to code.
          </span>
        </div>
      </div>
    </section>
  );
}
