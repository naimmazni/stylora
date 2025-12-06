'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import styles from './Navbar.module.scss';

interface NavbarProps {
  variant?: 'default' | 'minimal';
  showAuthButtons?: boolean;
  actionButton?: {
    label: string;
    onClick: () => void;
  };
}

export default function Navbar({ 
  variant = 'default', 
  showAuthButtons = false,
  actionButton 
}: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/generate', label: 'Generate' },
    { href: '/tips', label: 'Tips' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <header className={`${styles.navbar} ${variant === 'minimal' ? styles.minimal : ''}`}>
      <div className={styles.navbarContent}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <svg className={styles.logoIcon} fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" fill="currentColor" />
          </svg>
          <h2 className={styles.logoText}>Stylora</h2>
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${isActive(link.href) ? styles.active : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className={styles.navActions}>
          {actionButton && (
            <button className={styles.actionButton} onClick={actionButton.onClick}>
              {actionButton.label}
            </button>
          )}
          
          {showAuthButtons && (
            <div className={styles.authButtons}>
              <button className={styles.loginButton} onClick={() => router.push('/dashboard')}>
                Log In
              </button>
              <button className={styles.signupButton} onClick={() => router.push('/onboarding')}>
                Sign Up Free
              </button>
            </div>
          )}

          {!showAuthButtons && !actionButton && (
            <div className={styles.avatar} />
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className={styles.mobileMenuButton} 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className={styles.mobileNav}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.mobileNavLink} ${isActive(link.href) ? styles.active : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          
          {showAuthButtons && (
            <div className={styles.mobileAuthButtons}>
              <button 
                className={styles.loginButton} 
                onClick={() => { setMobileMenuOpen(false); router.push('/dashboard'); }}
              >
                Log In
              </button>
              <button 
                className={styles.signupButton} 
                onClick={() => { setMobileMenuOpen(false); router.push('/onboarding'); }}
              >
                Sign Up Free
              </button>
            </div>
          )}

          {actionButton && (
            <button 
              className={styles.mobileActionButton} 
              onClick={() => { setMobileMenuOpen(false); actionButton.onClick(); }}
            >
              {actionButton.label}
            </button>
          )}
        </nav>
      )}
    </header>
  );
}
