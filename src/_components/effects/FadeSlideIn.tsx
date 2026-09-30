"use client";
import React, { useEffect, useRef, useState } from 'react';

type SlideDirection = 'up' | 'down' | 'left' | 'right';

interface FadeSlideInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  threshold?: number;
  slideDirection?: SlideDirection;
  slideDistance?: number;
  className?: string;
}

export default function FadeSlideIn({
  children,
  delay = 0,
  duration = 600,
  threshold = 0.1,
  slideDirection = 'up',
  slideDistance = 30,
  className = ''
}: FadeSlideInProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  const getInitialTransform = (): string => {
    switch (slideDirection) {
      case 'up':
        return `translateY(${slideDistance}px)`;
      case 'down':
        return `translateY(-${slideDistance}px)`;
      case 'left':
        return `translateX(${slideDistance}px)`;
      case 'right':
        return `translateX(-${slideDistance}px)`;
      default:
        return `translateY(${slideDistance}px)`;
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate(0, 0)' : getInitialTransform(),
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
}