"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "@emailjs/browser";

gsap.registerPlugin(ScrollTrigger);

// EmailJS Configuration from environment variables
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
const EMAILJS_RECEIVED_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_RECEIVED_TEMPLATE_ID!;
const EMAILJS_THANKYOU_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_THANKYOU_TEMPLATE_ID!;

export default function Contacts() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const services = ["Mobile Development", "Web Development", "UI/UX Design"];

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

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

      // Form container animation
      gsap.from(formRef.current, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });

      // Animate form children with stagger
      const formChildren = formRef.current?.querySelectorAll('.animate-item');
      if (formChildren) {
        gsap.from(formChildren, {
          y: 30,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.description) {
      alert("Please fill in all required fields (Name, Email, and Description)");
      return;
    }

    if (selectedServices.length === 0) {
      alert("Please select at least one service");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      company: formData.company || "Not specified",
      services: selectedServices.join(", "),
      message: formData.description,
    };

    try {
      // Send notification email to you (Received template)
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_RECEIVED_TEMPLATE_ID,
        templateParams
      );

      // Send thank you email to the sender
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_THANKYOU_TEMPLATE_ID,
        {
          ...templateParams,
          to_email: formData.email,
        }
      );

      setSubmitStatus("success");
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        company: "",
        description: "",
      });
      setSelectedServices([]);

    } catch (error) {
      console.error("EmailJS Error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="contacts" 
      className="w-full bg-[#FFF1B5] py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20 border-b-2 border-[#43302E]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-8 sm:mb-12">
          <h2 className="text-[#43302E] text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-2">
            Contact Me
          </h2>
          <p className="text-[#43302E] text-base sm:text-lg md:text-xl italic">
            If you want to collaborate with me,
          </p>
          <p className="text-[#43302E] text-base sm:text-lg md:text-xl italic">
            just fill up the form and send an email here.
          </p>
        </div>

        {/* Form Container */}
        <div 
          ref={formRef}
          className="border-2 border-[#43302E] rounded-xl p-4 sm:p-6 md:p-10 bg-[#FFF1B5]"
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 sm:gap-8">
            {/* Services */}
            <div className="text-center animate-item">
              <h3 className="text-[#43302E] text-xl sm:text-2xl md:text-3xl mb-2">
                Services
              </h3>
              <p className="text-[#43302E] text-sm sm:text-base md:text-lg italic mb-4 sm:mb-6">
                select what service do you need
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 md:gap-6">
                {services.map((service) => (
                  <button
                    key={service}
                    type="button"
                    onClick={() => toggleService(service)}
                    disabled={isSubmitting}
                    className={`px-4 sm:px-6 py-2 border-2 border-[#43302E] text-[#43302E] text-sm sm:text-base md:text-lg rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                      selectedServices.includes(service)
                        ? "bg-[#43302E] text-[#FFF1B5]"
                        : "bg-[#C1DBE8] hover:bg-[#a8cce0]"
                    }`}
                  >
                    {service}
                  </button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-[#43302E] animate-item"></div>

            {/* Your Details */}
            <div className="text-center animate-item">
              <h3 className="text-[#43302E] text-xl sm:text-2xl md:text-3xl mb-2">
                Your Details
              </h3>
              <p className="text-[#43302E] text-sm sm:text-base md:text-lg italic mb-4 sm:mb-6">
                Please, fill the up form
              </p>

              <div className="flex flex-col gap-3 sm:gap-4">
                {/* Name and Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <input
                    type="text"
                    placeholder="Enter your Name *"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    disabled={isSubmitting}
                    required
                    className="w-full px-4 sm:px-5 py-2.5 sm:py-3 border-2 border-[#43302E] rounded-full bg-[#C1DBE8] text-[#43302E] placeholder-[#43302E]/70 text-sm sm:text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-[#43302E] disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <input
                    type="email"
                    placeholder="Enter your Email *"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    disabled={isSubmitting}
                    required
                    className="w-full px-4 sm:px-5 py-2.5 sm:py-3 border-2 border-[#43302E] rounded-full bg-[#C1DBE8] text-[#43302E] placeholder-[#43302E]/70 text-sm sm:text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-[#43302E] disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Company/School Name */}
                <input
                  type="text"
                  placeholder="Enter your Company/School Name"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  disabled={isSubmitting}
                  className="w-full px-4 sm:px-5 py-2.5 sm:py-3 border-2 border-[#43302E] rounded-full bg-[#C1DBE8] text-[#43302E] placeholder-[#43302E]/70 text-sm sm:text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-[#43302E] disabled:opacity-50 disabled:cursor-not-allowed"
                />

                {/* Description */}
                <textarea
                  placeholder="Description *"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  disabled={isSubmitting}
                  required
                  rows={4}
                  className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-[#43302E] rounded-2xl bg-[#C1DBE8] text-[#43302E] placeholder-[#43302E]/70 text-sm sm:text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-[#43302E] resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {/* Status Messages */}
            {submitStatus === "success" && (
              <div className="animate-item text-center p-3 sm:p-4 bg-green-100 border-2 border-green-500 rounded-xl">
                <p className="text-green-700 text-sm sm:text-base md:text-lg lg:text-xl">
                  Thank you! Your message has been sent successfully. Check your email for confirmation!
                </p>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="animate-item text-center p-3 sm:p-4 bg-red-100 border-2 border-red-500 rounded-xl">
                <p className="text-red-700 text-sm sm:text-base md:text-lg lg:text-xl">
                  Oops! Something went wrong. Please try again later.
                </p>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-center sm:justify-end animate-item">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-6 sm:px-8 py-2 border-2 border-[#43302E] bg-[#C1DBE8] text-[#43302E] text-base sm:text-lg md:text-xl rounded-full hover:bg-[#43302E] hover:text-[#C1DBE8] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    SENDING...
                  </>
                ) : (
                  "SUBMIT"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
