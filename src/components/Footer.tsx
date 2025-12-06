import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerLogo}>
          <svg className={styles.logoIcon} fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" fill="currentColor" />
          </svg>
          <h2 className={styles.logoText}>Stylora</h2>
        </div>
        <nav className={styles.footerLinks}>
          <Link href="/about" className={styles.footerLink}>About</Link>
          <Link href="/privacy" className={styles.footerLink}>Privacy Policy</Link>
          <Link href="/terms" className={styles.footerLink}>Terms of Service</Link>
          <Link href="/contact" className={styles.footerLink}>Contact</Link>
        </nav>
        <div className={styles.copyright}>
          © {new Date().getFullYear()} Stylora. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
