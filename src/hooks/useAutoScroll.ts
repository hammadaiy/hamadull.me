import { useRef, useEffect, useState } from 'react';

interface UseAutoScrollProps {
  scrollSpeed?: number;
  pauseOnHover?: boolean;
}

export const useAutoScroll = ({ 
  scrollSpeed = 30, 
  pauseOnHover = true 
}: UseAutoScrollProps = {}) => {  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const requestRef = useRef<number | undefined>(undefined);
  const previousTimeRef = useRef<number | undefined>(undefined);
  const speedFactorRef = useRef<number>(scrollSpeed / 1000);

  const handleMouseEnter = () => {
    if (pauseOnHover) {
      setIsPaused(true);
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      setIsPaused(false);
    }
  };

  const animate = (time: number) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current;
      const container = scrollContainerRef.current;
      
      if (container && !isPaused) {
        container.scrollLeft += deltaTime * speedFactorRef.current;
        
        if (container.scrollLeft >= container.scrollWidth - container.clientWidth - 10) {
          container.scrollLeft = 0;
        }
      }
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isPaused, animate]);

  return {
    scrollContainerRef,
    handleMouseEnter,
    handleMouseLeave,
    isPaused,
    setIsPaused
  };
};
