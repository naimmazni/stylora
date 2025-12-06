'use client';

import React from 'react';
import { AlertCircle } from 'lucide-react';
import styles from './Input.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  multiline?: boolean;
  rows?: number;
}

export default function Input({
  label,
  error,
  helperText,
  multiline = false,
  rows = 4,
  required,
  className = '',
  ...props
}: InputProps) {
  const inputClasses = [styles.input, error && styles.error, className].filter(Boolean).join(' ');

  const InputElement = multiline ? 'textarea' : 'input';

  return (
    <div className={styles['input-wrapper']}>
      {label && (
        <label className={styles.label} htmlFor={props.id}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <InputElement
        className={inputClasses}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${props.id}-error` : undefined}
        {...(multiline ? { rows } : {})}
        {...(props as any)}
      />
      {error && (
        <div className={styles['error-message']} id={`${props.id}-error`} role="alert">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}
      {helperText && !error && <div className={styles['helper-text']}>{helperText}</div>}
    </div>
  );
}
