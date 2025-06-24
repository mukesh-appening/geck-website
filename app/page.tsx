"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import WaitlistModal from "./components/WaitlistModal";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "How it works", href: "#how" },
  { name: "Contact", href: "#contact" },
  { name: "Blog", href: "#blog" },
];

// Text animation variants for character-by-character reveal
const textVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3,
    },
  },
};

const characterVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    rotateX: -90,
    filter: "blur(10px)"
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring" as const,
      damping: 12,
      stiffness: 100,
      duration: 1.0,
    },
  },
};

// Enhanced paragraph animation
const paragraphVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
    filter: "blur(4px)"
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring" as const,
      damping: 15,
      stiffness: 100,
      duration: 1.2,
      delay: 2.5,
    },
  },
};

// Close button animation variants
const closeButtonVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    rotate: -90
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring" as const,
      damping: 15,
      stiffness: 200,
      duration: 0.6,
    },
  },
  hover: {
    scale: 1.1,
    rotate: 90,
    transition: {
      type: "spring" as const,
      damping: 10,
      stiffness: 300,
    },
  },
  tap: {
    scale: 0.95,
    transition: {
      type: "spring" as const,
      damping: 20,
      stiffness: 400,
    },
  },
};


export default function Main() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  // Add state for showing 'Coming Soon' popup
  const [comingSoon, setComingSoon] = useState("");

  // Split text into characters for animation
  const titleText = "We break it,\nbefore your users do.";
  const lines = titleText.split("\n");

  // Handler for nav links
  const handleNavClick = (name: string) => {
    setComingSoon(`${name} — Coming Soon!`);
    setTimeout(() => setComingSoon(""), 2000);
  };

  return (
    <div className="flex flex-col h-screen bg-[#F03709] font-sans">
      {/* Animated Gradient Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="fixed inset-0 w-full h-full"
        style={{
          background: "linear-gradient(180deg, #FFFFFF -11.06%, #F03709 8.53%, #E00E0E 20.14%, #000000 64.89%)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <Image src="/circle.svg" alt="background circles" width={1728} height={1208} className="w-full h-full object-cover fixed top-0 left-0 pointer-events-none" />

      <main className="flex-1 min-h-0 flex flex-col w-full max-w-[1432px] mx-auto">
        <div className="w-full px-2 md:px-8 flex flex-col min-h-screen">

          {/* Header */}
          <header className="fixed top-0 left-0 w-full z-20 flex justify-center">
            <div className="w-full max-w-[1432px] mx-auto px-4 md:px-8">
              <nav className="mt-6 mx-auto w-full flex items-center justify-between rounded-full px-6 py-4 border border-white/20" style={{
                background: "rgba(0, 0, 0, 0.2)",
                boxShadow: "inset 3px 3px 44px rgba(0, 0, 0, 0.14)"
              }}>
                {/* Logo */}
                <div className="flex items-center gap-2">
                  <span className="">
                    <Image src="/logo.svg" alt="Geck" width={140} height={30} />
                  </span>
                </div>
                {/* Desktop Nav */}
                <ul className="hidden md:flex gap-5 lg:gap-8 xl:gap-20 text-white text-base font-medium 2xl:gap-[80px]">
                  {navLinks.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="hover:text-[#FE7743] transition-colors duration-200 cursor-pointer"
                        onClick={e => { e.preventDefault(); handleNavClick(link.name); }}
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
                {/* CTA Button */}
                <button
                  onClick={() => setWaitlistOpen(true)}
                  className="hidden md:inline-block bg-white text-black font-semibold px-5 py-2 rounded-full shadow hover:bg-[#FE7743] hover:text-white transition-colors duration-200"
                >
                  Join the waitlist
                </button>
                {/* Mobile Hamburger */}
                <button
                  className="md:hidden flex flex-col gap-1.5 group cursor-pointer"
                  onClick={() => setMenuOpen((v) => !v)}
                  aria-label="Open menu"
                >
                  <span className={`block h-0.5 w-6 bg-white rounded transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                  <span className={`block h-0.5 w-6 bg-white rounded transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
                  <span className={`block h-0.5 w-6 bg-white rounded transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </button>
              </nav>
              {/* Mobile Menu */}
              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="fixed inset-0 z-30 bg-black/80 backdrop-blur flex flex-col items-center justify-center md:hidden"
                  >
                    {/* Close Button */}
                    <motion.button
                      variants={closeButtonVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                      whileTap="tap"
                      onClick={() => setMenuOpen(false)}
                      className="absolute top-8 right-8 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center cursor-pointer group"
                      aria-label="Close menu"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-white group-hover:text-[#FE7743] transition-colors duration-200"
                      >
                        <path
                          d="M18 6L6 18M6 6L18 18"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.button>

                    <ul className="flex flex-col gap-8 text-white text-2xl font-semibold">
                      {navLinks.map((link, index) => (
                        <motion.li
                          key={link.name}
                          initial={{ opacity: 0, x: -50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: index * 0.1 + 0.3,
                            type: "spring" as const,
                            damping: 15,
                            stiffness: 100
                          }}
                        >
                          <a
                            href={link.href}
                            className="hover:text-[#FE7743] transition-colors duration-200 cursor-pointer relative group"
                            onClick={e => { e.preventDefault(); handleNavClick(link.name); setMenuOpen(false); }}
                          >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FE7743] transition-all duration-300 group-hover:w-full"></span>
                          </a>
                        </motion.li>
                      ))}
                    </ul>
                    <motion.button
                      onClick={() => {
                        setMenuOpen(false);
                        setWaitlistOpen(true);
                      }}
                      className="mt-10 bg-white text-black font-semibold px-8 py-3 rounded-full shadow hover:bg-[#FE7743] hover:text-white transition-colors duration-200 cursor-pointer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.8,
                        type: "spring" as const,
                        damping: 15,
                        stiffness: 100
                      }}
                      whileHover={{
                        scale: 1.05,
                        transition: { type: "spring" as const, damping: 10, stiffness: 300 }
                      }}
                      whileTap={{
                        scale: 0.95,
                        transition: { type: "spring" as const, damping: 20, stiffness: 400 }
                      }}
                    >
                      Join the waitlist
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </header>

          {/* Hero Section */}
          <div className="flex-1 flex flex-col justify-center items-start text-left pt-32 md:pt-44 relative w-full">
            {/* Central Video with Overlay Text */}
            <div className="w-full flex justify-center items-center  relative">
              <div className="relative w-full">
                <video
                  src="https://storage.googleapis.com/gweb-gemini-cdn/gemini/uploads/218d986f36a819d574c7d3a1cff9fb23081f74c5.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="rounded-3xl shadow-2xl bg-black object-cover w-full h-[280px] md:h-[350px] lg:h-[400px] xl:h-[500px] border border-black/60"
                  style={{ background: "#000" }}
                />
                
                {/* Overlay Text on Video */}
                <div className="sm:absolute bottom-0 left-0 z-10 sm:pl-8">
                  <motion.h1
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-4xl mt-12 sm:mt-0 lg:text-6xl xl:text-7xl 2xl:text-[96px] font-extrabold text-white mb-0 !leading-[1.2]"
                  >
                    {lines[0].split(" ").map((word, wordIndex) => (
                      <span key={wordIndex} className="inline-block mr-4">
                        {word.split("").map((char, charIndex) => (
                          <motion.span
                            key={charIndex}
                            variants={characterVariants}
                            className={`inline-block ${word === "break" ? "text-[#FE7743]" : ""
                              }`}
                          >
                            {char === " " ? "\u00A0" : char}
                          </motion.span>
                        ))}
                      </span>
                    ))}
                  </motion.h1>
                </div>
              </div>
            </div>

            {/* Second Line of Heading Below Video */}
            <div className="sm:pl-8 w-full">
              <div className="w-full mb-3 ">
                <motion.h1
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  className="text-4xl lg:text-6xl xl:text-7xl 2xl:text-[96px] font-extrabold text-white mb-4 !leading-[1.2]"
                >
                  {lines[1].split(" ").map((word, wordIndex) => (
                    <span key={wordIndex} className="inline-block mr-4">
                      {word.split("").map((char, charIndex) => (
                        <motion.span
                          key={charIndex}
                          variants={characterVariants}
                          className={`inline-block`}
                        >
                          {char === " " ? "\u00A0" : char}
                        </motion.span>
                      ))}
                    </span>
                  ))}
                </motion.h1>
              </div>

              {/* Enhanced Paragraph Animation */}
              <div className="grid grid-cols-12 md:grid-cols-12 gap-4 w-full">
                <div className="col-span-12 md:col-span-10">
                  <motion.p
                    variants={paragraphVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-white/80 text-sm md:text-base mb-8 font-medium leading-relaxed"
                  >
                    Geck is your AI-powered QA engineer that never misses a beat.
                  </motion.p>
                </div>

                <div className="col-span-12 md:col-span-2 text-xs md:text-base text-white/60  md:block text-left md:text-right">
                  help@geck.com
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Waitlist Modal */}
      <WaitlistModal isOpen={waitlistOpen} onClose={() => setWaitlistOpen(false)} />

      {/* Coming Soon Popup */}
      <AnimatePresence>
        {comingSoon && (
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.3 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#FE7743] to-[#F03709] text-white px-8 py-4 rounded-2xl shadow-2xl z-50 text-lg font-bold border border-white/20 backdrop-blur-xl"
            style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.25)' }}
          >
            {comingSoon}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}