'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './LoadingScreen.module.scss';

interface LoadingScreenProps {
  message?: string;
  messages?: string[];
  duration?: number;
  isComplete?: boolean;
  onComplete?: () => void;
}

const defaultMessages = [
  "Creating your perfect look...",
  "Analyzing your style preferences...",
  "Curating personalized recommendations...",
  "Finding your signature style...",
  "Building your wardrobe...",
];

export default function LoadingScreen({
  message,
  messages = defaultMessages,
  duration = 0,
  isComplete = false,
  onComplete,
}: LoadingScreenProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Rotate messages
  useEffect(() => {
    if (!message && messages.length > 1) {
      const interval = setInterval(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [message, messages]);

  // Handle completion when isComplete prop changes
  useEffect(() => {
    if (isComplete) {
      setIsVisible(false);
      setTimeout(() => {
        onComplete?.();
      }, 500); // Wait for exit animation
    }
  }, [isComplete, onComplete]);

  // Auto-complete after duration (fallback)
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          onComplete?.();
        }, 500);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onComplete]);

  const displayMessage = message || messages[currentMessageIndex];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={styles.loadingScreen}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.content}>
            {/* Animated Fashion Icons */}
            <div className={styles.iconContainer}>
              <motion.div
                className={styles.icon}
                animate={{
                  rotate: 360,
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  rotate: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  },
                  scale: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
              >
                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 80 80"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Hanger Icon */}
                  <path
                    d="M40 15C37.2386 15 35 17.2386 35 20C35 22.7614 37.2386 25 40 25C42.7614 25 45 22.7614 45 20C45 17.2386 42.7614 15 40 15Z"
                    fill="currentColor"
                  />
                  <path
                    d="M40 25V30M15 45L40 35L65 45V50C65 52.7614 62.7614 55 60 55H20C17.2386 55 15 52.7614 15 50V45Z"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>

              {/* Orbiting Particles */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className={styles.particle}
                  style={{
                    position: 'absolute',
                    width: '8px',
                    height: '8px',
                  }}
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.5,
                  }}
                >
                  <motion.div
                    className={styles.particleDot}
                    animate={{
                      scale: [0.5, 1, 0.5],
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.25,
                    }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Loading Message */}
            <AnimatePresence mode="wait">
              <motion.p
                key={displayMessage}
                className={styles.message}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {displayMessage}
              </motion.p>
            </AnimatePresence>

            {/* Progress Dots */}
            <div className={styles.dotsContainer}>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className={styles.dot}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>

            {/* Progress Bar */}
            <div className={styles.progressBar}>
              <motion.div
                className={styles.progressFill}
                initial={{ width: '0%' }}
                animate={{ width: duration > 0 ? '100%' : '70%' }}
                transition={{
                  duration: duration > 0 ? duration / 1000 : 2,
                  ease: duration > 0 ? "easeInOut" : "easeOut",
                  repeat: duration > 0 ? 0 : Infinity,
                  repeatType: duration > 0 ? undefined : "reverse",
                }}
              />
            </div>
          </div>

          {/* Background Gradient Animation */}
          <div className={styles.gradientOrb1} />
          <div className={styles.gradientOrb2} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
