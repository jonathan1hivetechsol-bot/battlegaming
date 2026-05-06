'use client';

import { useEffect, useRef, useState } from 'react';

interface Particle {
  id: string;
  x: number;
  y: number;
  opacity: number;
}

type HoverState = 'default' | 'hover' | 'click';

export default function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [displayPos, setDisplayPos] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [hoverState, setHoverState] = useState<HoverState>('default');
  const particleIdRef = useRef(0);
  const frameRef = useRef<number>();
  const targetPosRef = useRef({ x: 0, y: 0 });

  // Smooth cursor movement using lerp
  useEffect(() => {
    const updateCursorPosition = () => {
      setDisplayPos((prev) => {
        const dx = targetPosRef.current.x - prev.x;
        const dy = targetPosRef.current.y - prev.y;
        return {
          x: prev.x + dx * 0.25,
          y: prev.y + dy * 0.25,
        };
      });
      frameRef.current = requestAnimationFrame(updateCursorPosition);
    };

    frameRef.current = requestAnimationFrame(updateCursorPosition);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetPosRef.current = { x: e.clientX, y: e.clientY };
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      // Check if hovering over interactive element
      const element = document.elementFromPoint(e.clientX, e.clientY);
      if (element) {
        const isInteractive = 
          element.tagName === 'A' || 
          element.tagName === 'BUTTON' || 
          element.closest('button') || 
          element.closest('a') ||
          element.hasAttribute('data-interactive');
        
        setHoverState(isInteractive ? 'hover' : 'default');
      }

      // Create particle trail
      const newParticle: Particle = {
        id: `${Date.now()}-${particleIdRef.current++}`,
        x: e.clientX,
        y: e.clientY,
        opacity: 1,
      };

      setParticles((prev) => {
        const updated = [...prev, newParticle];
        return updated.slice(-25);
      });
    };

    const handleMouseDown = () => {
      setHoverState('click');
    };

    const handleMouseUp = () => {
      setHoverState('hover');
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setHoverState('default');
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Animate particles fade out
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({ ...p, opacity: p.opacity - 0.06 }))
          .filter((p) => p.opacity > 0)
      );
    }, 25);

    return () => clearInterval(interval);
  }, []);

  // Calculate cursor size based on hover state
  const getCursorSize = () => {
    if (hoverState === 'click') return { outer: 80, middle: 50, inner: 20 };
    if (hoverState === 'hover') return { outer: 70, middle: 45, inner: 18 };
    return { outer: 60, middle: 40, inner: 20 };
  };

  const sizes = getCursorSize();

  // Get glow intensity based on state
  const getGlowIntensity = () => {
    if (hoverState === 'click') return 1.2;
    if (hoverState === 'hover') return 1.1;
    return 1;
  };

  const glowIntensity = getGlowIntensity();

  return (
    <>
      {/* Main Cursor Glow - Ultra High Z-Index for Top Visibility */}
      {isVisible && (
        <div
          className="fixed pointer-events-none z-[9999] will-change-transform transition-all duration-100"
          style={{
            left: `${displayPos.x}px`,
            top: `${displayPos.y}px`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          {/* Animated outer ring - changes size on hover */}
          <div 
            className="absolute rounded-full animate-pulse"
            style={{
              width: `${sizes.outer}px`,
              height: `${sizes.outer}px`,
              left: `-${sizes.outer / 2}px`,
              top: `-${sizes.outer / 2}px`,
              border: hoverState === 'hover' ? '2px solid rgba(255, 120, 40, 0.8)' : '2px solid rgba(255, 120, 40, 0.3)',
              boxShadow: `0 0 ${30 * glowIntensity}px rgba(255, 120, 40, ${0.4 * glowIntensity}), inset 0 0 20px rgba(255, 120, 40, ${0.15 * glowIntensity})`,
              animation: hoverState === 'hover' ? 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite' : 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
              transition: 'all 0.2s ease-out',
            }}
          />

          {/* Middle glow ring - medium */}
          <div
            className="absolute rounded-full transition-all duration-200"
            style={{
              width: `${sizes.middle}px`,
              height: `${sizes.middle}px`,
              left: `-${sizes.middle / 2}px`,
              top: `-${sizes.middle / 2}px`,
              border: hoverState === 'hover' ? '1.5px solid rgba(255, 120, 40, 0.7)' : '1.5px solid rgba(255, 120, 40, 0.5)',
              boxShadow: `0 0 ${20 * glowIntensity}px rgba(255, 120, 40, ${0.6 * glowIntensity}), 0 0 10px rgba(255, 120, 40, ${0.3 * glowIntensity})`,
            }}
          />

          {/* Inner bright ring */}
          <div
            className="absolute rounded-full transition-all duration-200"
            style={{
              width: `${sizes.inner}px`,
              height: `${sizes.inner}px`,
              left: `-${sizes.inner / 2}px`,
              top: `-${sizes.inner / 2}px`,
              border: hoverState === 'hover' ? '2px solid rgba(255, 120, 40, 1)' : '1px solid rgba(255, 120, 40, 0.8)',
              boxShadow: `0 0 ${15 * glowIntensity}px rgba(255, 120, 40, ${0.8 * glowIntensity})`,
            }}
          />

          {/* Center core - bright orange dot */}
          <div
            className="w-3 h-3 rounded-full transition-all duration-200"
            style={{
              backgroundColor: hoverState === 'hover' ? '#FF6B00' : '#FF7828',
              boxShadow: `0 0 ${12 * glowIntensity}px rgba(255, 120, 40, ${1 * glowIntensity}), 0 0 ${24 * glowIntensity}px rgba(255, 120, 40, ${0.8 * glowIntensity}), 0 0 ${35 * glowIntensity}px rgba(255, 120, 40, ${0.5 * glowIntensity})`,
              transform: hoverState === 'click' ? 'scale(1.3)' : 'scale(1)',
            }}
          />

          {/* Horizontal crosshair line */}
          <div
            className="absolute transition-all duration-200"
            style={{
              width: hoverState === 'hover' ? '16px' : '12px',
              height: '1px',
              left: hoverState === 'hover' ? '-8px' : '-6px',
              top: '-0.5px',
              background: 'linear-gradient(to right, transparent, rgba(255, 120, 40, 0.7), transparent)',
              opacity: hoverState === 'default' ? 0.7 : 0.9,
            }}
          />

          {/* Vertical crosshair line */}
          <div
            className="absolute transition-all duration-200"
            style={{
              width: '1px',
              height: hoverState === 'hover' ? '16px' : '12px',
              left: '-0.5px',
              top: hoverState === 'hover' ? '-8px' : '-6px',
              background: 'linear-gradient(to bottom, transparent, rgba(255, 120, 40, 0.7), transparent)',
              opacity: hoverState === 'default' ? 0.7 : 0.9,
            }}
          />

          {/* Subtle corner accents - expand on hover */}
          {hoverState === 'hover' && (
            <>
              <div
                className="absolute animate-pulse"
                style={{
                  width: '5px',
                  height: '5px',
                  left: '-12px',
                  top: '-12px',
                  backgroundColor: '#FF7828',
                  opacity: 0.8,
                  borderRadius: '50%',
                }}
              />
              <div
                className="absolute animate-pulse"
                style={{
                  width: '5px',
                  height: '5px',
                  right: '-12px',
                  top: '-12px',
                  backgroundColor: '#FF7828',
                  opacity: 0.8,
                  borderRadius: '50%',
                }}
              />
              <div
                className="absolute animate-pulse"
                style={{
                  width: '5px',
                  height: '5px',
                  left: '-12px',
                  bottom: '-12px',
                  backgroundColor: '#FF7828',
                  opacity: 0.8,
                  borderRadius: '50%',
                }}
              />
              <div
                className="absolute animate-pulse"
                style={{
                  width: '5px',
                  height: '5px',
                  right: '-12px',
                  bottom: '-12px',
                  backgroundColor: '#FF7828',
                  opacity: 0.8,
                  borderRadius: '50%',
                }}
              />
            </>
          )}
        </div>
      )}

      {/* Enhanced Particle Trail */}
      {particles.map((particle) => {
        const scale = particle.opacity;
        const baseSize = hoverState === 'hover' ? 6 : 4;
        return (
          <div
            key={particle.id}
            className="fixed pointer-events-none rounded-full"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              transform: 'translate(-50%, -50%)',
              width: `${baseSize + baseSize * scale}px`,
              height: `${baseSize + baseSize * scale}px`,
              backgroundColor: hoverState === 'hover' ? '#FF6B00' : '#FF7828',
              opacity: particle.opacity * 0.7,
              boxShadow: `0 0 ${12 * scale}px rgba(255, 120, 40, ${0.8 * scale}), 0 0 ${20 * scale}px rgba(255, 120, 40, ${0.4 * scale})`,
              zIndex: 9998,
              willChange: 'transform, opacity',
            }}
          />
        );
      })}

      {/* Smooth hide default cursor with style tag */}
      <style>{`
        * {
          cursor: none !important;
        }
        body {
          cursor: none !important;
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.1); opacity: 0.3; }
        }
      `}</style>
    </>
  );
}
