'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './Card.module.scss';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
  gradient?: boolean;
  noPadding?: boolean;
  onClick?: () => void;
}

export function Card({
  children,
  className = '',
  hover = false,
  glass = false,
  gradient = false,
  noPadding = false,
  onClick,
}: CardProps) {
  const cardClasses = [
    styles.card,
    hover && styles.hover,
    glass && styles.glass,
    gradient && styles.gradient,
    noPadding && styles['no-padding'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <motion.div
      className={cardClasses}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

export function CardHeader({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`${styles['card-header']} ${className}`}>{children}</div>;
}

export function CardContent({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`${styles['card-content']} ${className}`}>{children}</div>;
}

export function CardFooter({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`${styles['card-footer']} ${className}`}>{children}</div>;
}
