import React from 'react';
import { motion } from 'framer-motion';

export const HangingHearts = ({ count = 8 }) => {
  const hearts = Array.from({ length: count }, (_, i) => i);

  return (
    <div className="fixed top-0 left-0 w-full h-1/2 pointer-events-none z-0 overflow-hidden">
      {hearts.map((index) => {
        const delay = index * 0.15;
        const position = (index / count) * 100;
        const size = 40 + Math.random() * 40; // 40-80px
        const duration = 3 + Math.random() * 2; // 3-5 seconds

        return (
          <motion.div
            key={index}
            initial={{
              x: `calc(${position}% - ${size / 2}px)`,
              y: -100,
              opacity: 0,
              scale: 0,
            }}
            animate={{
              y: [0, 15, 0], // Gentle swinging
              opacity: [0, 1, 1, 0],
              scale: 1,
            }}
            transition={{
              delay: delay,
              duration: duration,
              repeat: Infinity,
              repeatDelay: 0.5,
            }}
            className="absolute"
            style={{
              left: `${position}%`,
              top: `${30 + Math.random() * 40}px`,
            }}
          >
            {/* 3D Heart with shadow */}
            <motion.svg
              width={size}
              height={size}
              viewBox="0 0 100 100"
              animate={{
                rotateZ: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2 + Math.random(),
                repeat: Infinity,
              }}
            >
              {/* Shadow */}
              <defs>
                <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow
                    dx="4"
                    dy="8"
                    stdDeviation="6"
                    floodOpacity="0.3"
                  />
                </filter>
                <linearGradient id={`grad-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#ff1493', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#c71585', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              {/* Heart shape */}
              <path
                d="M50,95 C25,75 5,60 5,40 C5,25 15,15 25,15 C35,15 45,22 50,30 C55,22 65,15 75,15 C85,15 95,25 95,40 C95,60 75,75 50,95 Z"
                fill={`url(#grad-${index})`}
                filter="url(#shadow)"
                style={{
                  filter: `drop-shadow(0 8px 12px rgba(0,0,0,0.15))`,
                }}
              />
              {/* Highlight for 3D effect */}
              <ellipse
                cx="35"
                cy="35"
                rx="12"
                ry="15"
                fill="white"
                opacity="0.3"
              />
            </motion.svg>

            {/* Hanging string */}
            <div
              className="absolute w-0.5 bg-gradient-to-b from-red-300 to-transparent"
              style={{
                height: '30px',
                left: '50%',
                top: '-30px',
                transform: 'translateX(-50%)',
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

export default HangingHearts;
