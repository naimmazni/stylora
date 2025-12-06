import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerLogo}>
          <img 
            src="/favicon.ico" 
            alt="Stylora logo" 
            className={styles.logoIcon}
            width={32}
            height={32}
          />
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
