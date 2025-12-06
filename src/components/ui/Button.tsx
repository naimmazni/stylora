'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import styles from './Button.module.scss';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  loading = false,
  icon,
  iconRight,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const buttonClasses = [
    styles.button,
    styles[variant],
    size !== 'medium' && styles[size],
    fullWidth && styles['full-width'],
    loading && styles.loading,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <motion.button
      className={buttonClasses}
      disabled={disabled || loading}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      {...props}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
      {iconRight && <span className={styles['icon-right']}>{iconRight}</span>}
    </motion.button>
  );
}
