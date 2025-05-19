'use client';

import { useEffect, useRef } from 'react';

export default function BackgroundGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const gradientCircles = Array(3).fill(0).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 150 + 100,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      hue: Math.random() * 20
    }));

    const animate = () => {
      ctx.fillStyle = 'rgba(17, 18, 13, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      gradientCircles.forEach(circle => {
        circle.x += circle.vx;
        circle.y += circle.vy;
        
        if (circle.x < 0 || circle.x > canvas.width) circle.vx *= -1;
        if (circle.y < 0 || circle.y > canvas.height) circle.vy *= -1;
        
        const gradient = ctx.createRadialGradient(
          circle.x, circle.y, 0,
          circle.x, circle.y, circle.radius
        );
        
        gradient.addColorStop(0, `rgba(86, 84, 73, 0.04)`);
        gradient.addColorStop(1, 'rgba(17, 18, 13, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-60"
    />
  );
}
