'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './ProgressBar.module.scss';

interface ProgressBarProps {
  current: number;
  total: number;
  showText?: boolean;
  className?: string;
}

export default function ProgressBar({
  current,
  total,
  showText = true,
  className = '',
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((current / total) * 100, 0), 100);

  return (
    <div className={className}>
      <div className={styles['progress-bar']}>
        <motion.div
          className={styles['progress-fill']}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
      {showText && (
        <div className={styles['progress-text']}>
          {current} / {total} ({Math.round(percentage)}%)
        </div>
      )}
    </div>
  );
}
