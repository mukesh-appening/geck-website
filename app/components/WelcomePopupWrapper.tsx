"use client";

import { useState, useEffect } from "react";
import WelcomePopup from "./WelcomePopup";
import WaitlistModal from "./WaitlistModal";

export default function WelcomePopupWrapper() {
  const [showPopup, setShowPopup] = useState(false);
  const [showWaitlist, setShowWaitlist] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasSeen = localStorage.getItem("geck-welcome-popup");
      if (!hasSeen) {
        setShowPopup(true);
        localStorage.setItem("geck-welcome-popup", "1");
      }
    }
  }, []);

  const handleOpenWaitlist = () => {
    setShowPopup(false);
    // Small delay to allow the welcome popup to close smoothly before opening the waitlist
    setTimeout(() => {
      setShowWaitlist(true);
    }, 300);
  };

  return (
    <>
      <WelcomePopup 
        isOpen={showPopup} 
        onClose={() => setShowPopup(false)} 
        onOpenWaitlist={handleOpenWaitlist}
      />
      <WaitlistModal 
        isOpen={showWaitlist} 
        onClose={() => setShowWaitlist(false)} 
      />
    </>
  );
} 