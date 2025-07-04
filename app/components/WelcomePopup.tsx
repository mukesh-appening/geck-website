"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface WelcomePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 50,
    filter: "blur(10px)"
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring" as const,
      damping: 20,
      stiffness: 100,
      duration: 0.8,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: 50,
    filter: "blur(10px)",
    transition: {
      type: "spring" as const,
      damping: 20,
      stiffness: 100,
      duration: 0.5,
    },
  },
};

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

export default function WelcomePopup({ isOpen, onClose }: WelcomePopupProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-[600px] max-h-[80vh] overflow-y-auto bg-[#242424] backdrop-blur-xl rounded-3xl border border-white/20 p-8 shadow-2xl scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent hover:scrollbar-thumb-white/30"
            style={{
              boxShadow: "inset 3px 3px 44px rgba(0, 0, 0, 0.14), 0 25px 50px rgba(0, 0, 0, 0.5)",
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(255, 255, 255, 0.2) transparent"
            }}
            onClick={e => e.stopPropagation()}
          >
            <style jsx>{`
              .scrollbar-thin::-webkit-scrollbar {
                width: 8px;
              }
              .scrollbar-thin::-webkit-scrollbar-track {
                background: transparent;
                border-radius: 4px;
              }
              .scrollbar-thin::-webkit-scrollbar-thumb {
                background: rgba(255, 255, 255, 0.2);
                border-radius: 4px;
              }
              .scrollbar-thin::-webkit-scrollbar-thumb:hover {
                background: rgba(255, 255, 255, 0.3);
              }
            `}</style>
            <Image src="/circle1.svg" alt="Vector" className="absolute top-0 right-0 -z-[1]" width={700} height={700}  />

            {/* Close Button */}
            <motion.button
              variants={closeButtonVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center cursor-pointer group"
              aria-label="Close popup"
            >
              <svg
                width="20"
                height="20"
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
            {/* Logo */}
            <div className="flex justify-center mb-4">
              <Image src="/logo.svg" alt="Geck Logo" width={120} height={40} />
            </div>
            {/* Content */}
            <div className="text-white text-center space-y-6 ">
              <h2 className="text-2xl font-bold mb-2">Welcome to <span className="text-[#FE7743]">Geck</span> <span className="text-base font-normal text-white/60">(Pre-Release)</span></h2>
              <p className="text-white/80 text-base">Thanks for your interest in Geck! Before we give you access, here are a few important things we want you to know:</p>
              <div className="text-left space-y-4 text-sm leading-[28px]">
                <div className="flex items-start gap-2">
                  <span className="text-xl">🚧</span>
                  <div>
                    <b>This is a Pre-Release</b><br />
                    <span className="text-white/70">Geck.ai is still under active development. That means:<br />
                    • There will be bugs.<br />
                    • Features may break or change.<br />
                    • Some things might not work at all.</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-xl">🧪</span>
                  <div>
                    <b>You&apos;re Helping Us Test</b><br />
                    <span className="text-white/70">We&apos;re giving you early access so you can:<br />
                    • Try it out.<br />
                    • Tell us what&apos;s broken.<br />
                    • Share what you love and what you don&apos;t.<br />
                    Your feedback is gold, and it&apos;ll help us make this better for everyone.</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-xl">⚠️</span>
                  <div>
                    <b>Use With Caution</b><br />
                    <span className="text-white/70">You&apos;re welcome to try Geck.ai on real projects, but just a heads-up:<br />
                    • It&apos;s not fully reliable yet.<br />
                    • We don&apos;t recommend using it on critical work (yet).<br />
                    • If you do, it&apos;s at your own risk — Geck is a testing plugin so it doesn&apos;t edit any code but still please save your work elsewhere too.</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-xl">🎉</span>
                  <div>
                    <b>New Stuff Daily</b><br />
                    <span className="text-white/70">We&apos;re updating and improving the product every day. You may see new features, fixes, and changes regularly.</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-xl">🍪</span>
                  <div>
                    <b>Please Don&apos;t Share Publicly Yet</b><br />
                    <span className="text-white/70">We&apos;re not quite ready to go public. We&apos;d really appreciate it if you:<br />
                    • Don&apos;t post about Geck.ai publicly.<br />
                    • Don&apos;t share screenshots or links without checking with us first.<br />
                    • Let us fix more bugs, polish things up, and then we&apos;ll shout from the rooftops together.</span>
                  </div>
                </div>
              </div>
              <div className="text-xs text-white/60 pt-4">
                By continuing, you agree to use Geck.ai with kindness, patience, and the understanding that it&apos;s still a work in progress.<br />
                <span className="text-[#FE7743]">Thanks for being here 💛</span><br />
                <span className="text-white/40">— Team Geck</span>
              </div>
              <button
                onClick={onClose}
                className="mt-4 bg-[#FE7743] hover:bg-[#F03709] text-white font-semibold px-8 py-3 rounded-full shadow-lg transition-colors duration-200"
              >
                Geck(t) early access!
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 