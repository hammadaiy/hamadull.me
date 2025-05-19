'use client';

import { useState, useEffect } from 'react';
import { FaChevronUp } from 'react-icons/fa';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-5 right-5 p-3 rounded-full bg-[var(--secondary)] text-[var(--primary)]
                    shadow-lg transition-all duration-300 hover:scale-110 z-50 group"
        >
          <FaChevronUp className="text-lg group-hover:animate-bounce-subtle" />
          <span className="absolute inset-0 rounded-full border border-[var(--primary)] opacity-0 group-hover:opacity-100 
                          group-hover:scale-110 transition-all duration-300"></span>
        </button>
      )}
    </>
  );
}
