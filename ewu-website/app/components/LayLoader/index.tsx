// components/LazyLoader.jsx
"use client";

import { useEffect, useRef, useState } from 'react';

const LazyLoader = ({ children, height = "400px", threshold = 0.1 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { 
        threshold,
        rootMargin: '50px' // Start loading 50px before element enters viewport
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return (
    <div 
      ref={ref} 
      className="lazy-load-container"
      style={{ minHeight: isVisible ? 'auto' : height }}
    >
      {isVisible ? children : <div className="skeleton-card" />}
    </div>
  );
};

export default LazyLoader;