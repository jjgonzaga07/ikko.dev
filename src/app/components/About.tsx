"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const frontendSkills = ["HTML", "TAILWINDCSS", "JAVASCRIPT", "REACT", "REACT NATIVE", "NEXTJS"];
  const backendSkills = ["TYPESCRIPT", "JAVA", "PYTHON", "PHP", "JAVASCRIPT", "C#"];
  const toolsSkills = ["GIT", "JIRA", "NOSQL", "POSTGRESQL", "MONGODB"];

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stickman1Ref = useRef<HTMLDivElement>(null);
  const stickman2Ref = useRef<HTMLDivElement>(null);
  const frontendRef = useRef<HTMLDivElement>(null);
  const backendRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(headerRef.current, {
        x: -100,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });

      // Stickman 1 animation
      gsap.from(stickman1Ref.current, {
        x: 100,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });

      // Stickman 2 animation
      gsap.from(stickman2Ref.current, {
        x: -100,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none none"
        }
      });

      // Skills containers animation
      gsap.from(frontendRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: frontendRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });

      gsap.from(backendRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: backendRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });

      gsap.from(toolsRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: toolsRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="w-full bg-[#FFF1B5] py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20 relative overflow-hidden border-b-2 border-[#43302E]"
    >
      {/* Stickman Top Right */}
      <div 
        ref={stickman1Ref}
        className="hidden lg:block absolute top-16 right-8 lg:right-16 xl:right-24"
      >
        <Image
          src="/stickman/STICKMAN-1.svg"
          alt="Stickman"
          width={120}
          height={180}
        />
      </div>

      {/* Stickman Bottom Left */}
      <div 
        ref={stickman2Ref}
        className="hidden lg:block absolute bottom-8 left-8 lg:left-16 xl:left-24"
      >
        <Image
          src="/stickman/STICKMAN-2.svg"
          alt="Stickman"
          width={100}
          height={150}
        />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-8 sm:mb-12">
          <h2 className="text-[#43302E] text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-2">
            A Little About Me
          </h2>
          <p className="text-[#43302E] text-base sm:text-lg md:text-xl italic">
            a freelance developer and
          </p>
          <p className="text-[#43302E] text-base sm:text-lg md:text-xl italic">
            full stack developer
          </p>
        </div>

        {/* Skills Section */}
        <div className="flex flex-col gap-6 sm:gap-8 items-center">
          {/* Front-end Technologies */}
          <div ref={frontendRef} className="text-center w-full">
            <h3 className="text-[#43302E] text-lg sm:text-xl md:text-2xl lg:text-3xl mb-3 sm:mb-4 tracking-wider">
              FRONT-END TECHNOLOGIES
            </h3>
            <div className="bg-[#C1DBE8] border-2 border-[#43302E] rounded-2xl sm:rounded-full py-3 sm:py-4 px-4 sm:px-8 md:px-12 inline-flex flex-wrap justify-center gap-x-4 sm:gap-x-6 md:gap-x-10 gap-y-1 sm:gap-y-2">
              {frontendSkills.map((skill) => (
                <span
                  key={skill}
                  className="text-[#43302E] text-sm sm:text-lg md:text-xl lg:text-2xl whitespace-nowrap"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Back-end Technologies */}
          <div ref={backendRef} className="text-center w-full">
            <h3 className="text-[#43302E] text-lg sm:text-xl md:text-2xl lg:text-3xl mb-3 sm:mb-4 tracking-wider">
              BACK-END TECHNOLOGIES
            </h3>
            <div className="bg-[#C1DBE8] border-2 border-[#43302E] rounded-2xl sm:rounded-full py-3 sm:py-4 px-4 sm:px-8 md:px-12 inline-flex flex-wrap justify-center gap-x-4 sm:gap-x-6 md:gap-x-10 gap-y-1 sm:gap-y-2">
              {backendSkills.map((skill) => (
                <span
                  key={skill}
                  className="text-[#43302E] text-sm sm:text-lg md:text-xl lg:text-2xl whitespace-nowrap"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Tools & Database */}
          <div ref={toolsRef} className="text-center w-full">
            <h3 className="text-[#43302E] text-lg sm:text-xl md:text-2xl lg:text-3xl mb-3 sm:mb-4 tracking-wider">
              TOOLS & DATABASE
            </h3>
            <div className="bg-[#C1DBE8] border-2 border-[#43302E] rounded-2xl sm:rounded-full py-3 sm:py-4 px-4 sm:px-8 md:px-12 inline-flex flex-wrap justify-center gap-x-4 sm:gap-x-6 md:gap-x-10 gap-y-1 sm:gap-y-2">
              {toolsSkills.map((skill) => (
                <span
                  key={skill}
                  className="text-[#43302E] text-sm sm:text-lg md:text-xl lg:text-2xl whitespace-nowrap"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
