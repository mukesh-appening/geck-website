"use client";

import { useState, useEffect } from "react";
import WelcomePopup from "./WelcomePopup";

export default function WelcomePopupWrapper() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasSeen = localStorage.getItem("geck-welcome-popup");
      if (!hasSeen) {
        setShowPopup(true);
      //  localStorage.setItem("geck-welcome-popup", "1");
      }
    }
  }, []);

  return (
    <WelcomePopup isOpen={showPopup} onClose={() => setShowPopup(false)} />
  );
} 