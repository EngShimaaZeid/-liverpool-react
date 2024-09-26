import React, { useEffect, useState } from 'react';
import './css/FloatingBox.css';

const FloatingBox = () => {
  const [scrollY, setScrollY] = useState(0);
  const [boxPosition, setBoxPosition] = useState(window.innerHeight / 2 - 50); // Start in the middle
  const [isVisible, setIsVisible] = useState(false); // State to control visibility

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    // Calculate 50% of the homepage height
    const halfPageHeight = document.documentElement.scrollHeight / 2;

    // Check if we've scrolled past the middle of the homepage
    if (currentScrollY > halfPageHeight / 2) {
      setIsVisible(true); // Show the box when scrolling past the middle
    } else {
      setIsVisible(false); // Hide it when above the middle
    }

    // Determine new position based on scroll direction
    if (isVisible) {
      if (currentScrollY > scrollY) {
        // Scrolling down
        setBoxPosition(prev => Math.max(prev - 5, 0)); // Move up
      } else {
        // Scrolling up
        setBoxPosition(prev => Math.min(prev + 5, halfPageHeight - 100)); // Move down, stop at 50% of homepage
      }
    }

    setScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollY, isVisible]);

  return (
    <>
      {isVisible && (
        <div className="floating-box" style={{ top: `${boxPosition}px` }}>
          <h2>Welcome to Liverpool FC!</h2>
          <p>Join us for the latest updates and news.</p>
        </div>
      )}
    </>
  );
};

export default FloatingBox;
