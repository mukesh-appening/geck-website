"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

// Modal animation variants
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

// Form field animation variants
const formFieldVariants = {
  hidden: {
    opacity: 0,
    x: -30,
    filter: "blur(4px)"
  },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring" as const,
      damping: 15,
      stiffness: 100,
    },
  },
};

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after showing success
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
      setFormData({ name: "", email: "", company: "", role: "" });
    }, 3000);
  };

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
            className="relative w-full max-w-md bg-gradient-to-br from-black/90 to-[#F03709]/20 backdrop-blur-xl rounded-3xl border border-white/20 p-8 shadow-2xl"
            style={{
              boxShadow: "inset 3px 3px 44px rgba(0, 0, 0, 0.14), 0 25px 50px rgba(0, 0, 0, 0.5)"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <motion.button
              variants={closeButtonVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center cursor-pointer group"
              aria-label="Close modal"
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

            {/* Success State */}
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", damping: 15, stiffness: 200 }}
                  className="w-16 h-16 bg-[#FE7743] rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-white">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-2">Welcome aboard!</h3>
                <p className="text-white/80">You've been added to our waitlist. We'll notify you when Geck is ready for you.</p>
              </motion.div>
            ) : (
              <>
                {/* Header */}
                <div className="text-center mb-8">
                  <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-3xl font-bold text-white mb-2"
                  >
                    Join the Waitlist
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-white/70 text-sm"
                  >
                    Be among the first to experience AI-powered QA testing
                  </motion.p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <motion.div
                    variants={formFieldVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.3 }}
                  >
                    <label htmlFor="name" className="block text-white/90 text-sm font-medium mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#FE7743] focus:border-transparent transition-all duration-200"
                      placeholder="Enter your full name"
                    />
                  </motion.div>

                  <motion.div
                    variants={formFieldVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.4 }}
                  >
                    <label htmlFor="email" className="block text-white/90 text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#FE7743] focus:border-transparent transition-all duration-200"
                      placeholder="Enter your email address"
                    />
                  </motion.div>

                  <motion.div
                    variants={formFieldVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.5 }}
                  >
                    <label htmlFor="company" className="block text-white/90 text-sm font-medium mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#FE7743] focus:border-transparent transition-all duration-200"
                      placeholder="Where do you work? (optional)"
                    />
                  </motion.div>

                  <motion.div
                    variants={formFieldVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.6 }}
                  >
                    <label htmlFor="role" className="block text-white/90 text-sm font-medium mb-2">
                      Role
                    </label>
                    <select
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#FE7743] focus:border-transparent transition-all duration-200"
                    >
                      <option value="" className="bg-black text-white">Select your role</option>
                      <option value="developer" className="bg-black text-white">Developer</option>
                      <option value="qa-engineer" className="bg-black text-white">QA Engineer</option>
                      <option value="product-manager" className="bg-black text-white">Product Manager</option>
                      <option value="engineering-manager" className="bg-black text-white">Engineering Manager</option>
                      <option value="other" className="bg-black text-white">Other</option>
                    </select>
                  </motion.div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    whileHover={{
                      scale: 1.02,
                      transition: { type: "spring", damping: 10, stiffness: 300 }
                    }}
                    whileTap={{
                      scale: 0.98,
                      transition: { type: "spring", damping: 20, stiffness: 400 }
                    }}
                    className="w-full bg-gradient-to-r from-[#FE7743] to-[#F03709] text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Joining waitlist...
                      </div>
                    ) : (
                      "Join Waitlist"
                    )}
                  </motion.button>
                </form>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-center text-white/50 text-xs mt-6"
                >
                  By joining, you agree to receive updates about Geck's launch.
                </motion.p>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 