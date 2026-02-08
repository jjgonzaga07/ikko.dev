"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  name: string;
  description: string;
  image: string;
  url?: string;
}

export default function Projects() {
  const projects: Project[] = [
    {
      name: "LOOPWORK",
      description: "Enterprise SaaS web platform for project management and team collaboration. Streamlines workflows and boosts productivity.",
      image: "/projects/LOOPWORK.svg",
      url: "https://inspire-loopwork.com",
    },
    {
      name: "INSPIRE-ADMIN",
      description: "Comprehensive administrative dashboard for managing the Inspire ecosystem, users, and platform analytics.",
      image: "/projects/INSPIRE-ADMIN.svg",
      url: "https://inspireadmin-three.vercel.app/",
    },
    {
      name: "IKKO-QR",
      description: "A comprehensive QR code management system allowing users to generate, track, and manage dynamic QR codes with advanced analytics.",
      image: "/projects/IKKO-QR.svg",
      url: "https://ikko-qr.vercel.app",
    },
    {
      name: "INSPIRE-WALLET",
      description: "Secure digital wallet for iOS and Android. Features crypto assets management, P2P transfers, and bank integration.",
      image: "/projects/INSPIRE-WALLET.svg",
      url: "https://apps.apple.com/ph/app/inspire-wallet/id6642689775",
    },
    {
      name: "IKKO-WEATHER",
      description: "Real-time weather forecasting application ensuring users stay informed with accurate local and global weather updates.",
      image: "/projects/IKKO-WEATHER.svg",
      url: "https://ikko-weather.vercel.app",
    },
    {
      name: "LOOPWORK-MOBILE",
      description: "The mobile companion application for Loopwork SaaS, optimized for productivity on the go with seamless synchronization.",
      image: "/projects/LOOPWORK-MOBILE.svg",
    },
  ];

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const projectsGridRef = useRef<HTMLDivElement>(null);

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

      // Project cards animation with stagger
      const projectCards = projectsGridRef.current?.children;
      if (projectCards) {
        gsap.from(projectCards, {
          y: 80,
          opacity: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: projectsGridRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="projects" 
      className="w-full bg-[#C1DBE8] py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20 border-b-2 border-[#43302E]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-8 sm:mb-12">
          <h2 className="text-[#43302E] text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-2">
            My Projects
          </h2>
          <p className="text-[#43302E] text-base sm:text-lg md:text-xl italic">
            these are all my projects
          </p>
        </div>

        {/* Projects Grid */}
        <div 
          ref={projectsGridRef}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-x-12 md:gap-y-12 lg:gap-y-16"
        >
          {projects.map((project) => (
            <div key={project.name} className="flex flex-col">
              {/* Project Image */}
              <div className="relative w-full aspect-video mb-3 sm:mb-4 border-2 border-[#43302E] rounded-lg sm:rounded-xl overflow-hidden bg-white shadow-md">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover"
                />
              </div>
              {/* Project Info */}
              {project.url ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#43302E] text-xl sm:text-2xl md:text-3xl mb-1 sm:mb-2 inline-block hover:underline hover:text-[#5a4240] transition-all cursor-pointer"
                >
                  {project.name}
                </a>
              ) : (
                <h3 className="text-[#43302E] text-xl sm:text-2xl md:text-3xl mb-1 sm:mb-2">
                  {project.name}
                </h3>
              )}
              <p className="text-[#43302E] text-sm sm:text-base md:text-lg lg:text-xl">
                {project.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
