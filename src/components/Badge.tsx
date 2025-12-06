'use client';

import React from 'react';
import styles from './Badge.module.scss';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'gray';
  className?: string;
}

export function Badge({ children, variant = 'primary', className = '' }: BadgeProps) {
  return <span className={`${styles.badge} ${styles[variant]} ${className}`}>{children}</span>;
}

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export function LoadingSpinner({ size = 'medium', className = '' }: LoadingSpinnerProps) {
  return (
    <div className={`${styles['loading-spinner']} ${size !== 'medium' ? styles[size] : ''} ${className}`}>
      <div className={styles.spinner} />
    </div>
  );
}
