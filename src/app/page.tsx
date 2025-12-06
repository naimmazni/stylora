'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, Users, Trophy, Upload, Lightbulb, Menu, X } from 'lucide-react';
import styles from './page.module.scss';

export default function LandingPage() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className={styles.landing}>
      <div className={styles.container}>
        {/* Navigation */}
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.logo}>
              <svg className={styles.logoIcon} fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" fill="currentColor"></path>
              </svg>
              <h2 className={styles.logoText}>Stylora</h2>
            </div>
            
            <nav className={styles.desktopNav}>
              <a href="#features" className={styles.navLink}>Features</a>
              <a href="#community" className={styles.navLink}>Community</a>
              <a href="#how-it-works" className={styles.navLink}>How it Works</a>
              <a href="/tips" className={styles.navLink}>Tips</a>
              <div className={styles.navButtons}>
                <button className={styles.loginButton} onClick={() => router.push('/dashboard')}>
                  Log In
                </button>
                <button className={styles.signupButton} onClick={() => router.push('/onboarding')}>
                  Sign Up Free
                </button>
              </div>
            </nav>

            <button className={styles.mobileMenuButton} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            {/* Mobile Navigation */}
            {mobileMenuOpen && (
              <nav className={styles.mobileNav}>
                <a href="#features" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>Features</a>
                <a href="#community" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>Community</a>
                <a href="#how-it-works" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>How it Works</a>
                <a href="/tips" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>Tips</a>
                <div className={styles.navButtons}>
                  <button className={styles.loginButton} onClick={() => { setMobileMenuOpen(false); router.push('/dashboard'); }}>
                    Log In
                  </button>
                  <button className={styles.signupButton} onClick={() => { setMobileMenuOpen(false); router.push('/onboarding'); }}>
                    Sign Up Free
                  </button>
                </div>
              </nav>
            )}
          </div>
        </header>

        <main className={styles.main}>
          {/* Hero Section */}
          <section className={styles.hero}>
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>
                Unlock Your Ultimate Wardrobe
              </h1>
              <p className={styles.heroSubtitle}>
                Experience the future of fashion with our AI stylist, fun challenges, and a vibrant community.
              </p>
              <button className={styles.ctaButton} onClick={() => router.push('/onboarding')}>
                Start Your Style Journey
              </button>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className={styles.features}>
            <div className={styles.featuresHeader}>
              <h2 className={styles.sectionTitle}>Discover Your Style Potential</h2>
              <p className={styles.sectionSubtitle}>
                Stylora combines cutting-edge AI, engaging gamification, and a social community to revolutionize your fashion experience.
              </p>
            </div>

            <div className={styles.featureGrid}>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <Sparkles size={32} />
                </div>
                <h3 className={styles.featureTitle}>AI Stylist</h3>
                <p className={styles.featureDescription}>
                  Get personalized outfit recommendations from your own wardrobe, curated by our intelligent AI.
                </p>
              </div>

              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <Trophy size={32} />
                </div>
                <h3 className={styles.featureTitle}>Gamification</h3>
                <p className={styles.featureDescription}>
                  Compete in style challenges, earn points, and level up your fashion game.
                </p>
              </div>

              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <Users size={32} />
                </div>
                <h3 className={styles.featureTitle}>Community Closet</h3>
                <p className={styles.featureDescription}>
                  Share your looks, discover new trends, and borrow inspiration from a global closet.
                </p>
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section id="how-it-works" className={styles.howItWorks}>
            <h2 className={styles.sectionTitle}>How It Works</h2>
            
            <div className={styles.steps}>
              <div className={styles.step}>
                <div className={styles.stepIconWrapper}>
                  <div className={styles.stepIcon}>
                    <Upload size={24} />
                  </div>
                  <div className={styles.stepLine}></div>
                </div>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>1. Upload Your Closet</h3>
                  <p className={styles.stepDescription}>
                    Easily digitize your wardrobe by snapping photos of your clothes.
                  </p>
                </div>
              </div>

              <div className={styles.step}>
                <div className={styles.stepIconWrapper}>
                  <div className={styles.stepLine}></div>
                  <div className={styles.stepIcon}>
                    <Lightbulb size={24} />
                  </div>
                  <div className={styles.stepLine}></div>
                </div>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>2. Get AI Recs</h3>
                  <p className={styles.stepDescription}>
                    Our AI analyzes your items to create unique, personalized outfits for any occasion.
                  </p>
                </div>
              </div>

              <div className={styles.step}>
                <div className={styles.stepIconWrapper}>
                  <div className={styles.stepLine}></div>
                  <div className={styles.stepIcon}>
                    <Trophy size={24} />
                  </div>
                </div>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>3. Share & Compete</h3>
                  <p className={styles.stepDescription}>
                    Join challenges, share your favorite looks with the community, and climb the leaderboard.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonial Section */}
          <section className={styles.testimonial}>
            <h2 className={styles.sectionTitle}>Loved by Stylists Everywhere</h2>
            
            <div className={styles.testimonialCard}>
              <div className={styles.quoteIcon}>"</div>
              <p className={styles.testimonialText}>
                "Stylora completely changed how I see my own closet. I'm discovering new combinations I never would have thought of. It's like having a personal stylist in my pocket!"
              </p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorAvatar}>
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica" alt="Jessica M." />
                </div>
                <div>
                  <p className={styles.authorName}>Jessica M.</p>
                  <p className={styles.authorTitle}>Fashion Enthusiast</p>
                </div>
              </div>
            </div>
          </section>

          {/* Final CTA Section */}
          <section className={styles.finalCta}>
            <h2 className={styles.finalCtaTitle}>Find Your Signature Style Today</h2>
            <p className={styles.finalCtaText}>
              Join the fashion revolution and let AI unleash your creativity. It's free to get started.
            </p>
            <button className={styles.ctaButton} onClick={() => router.push('/onboarding')}>
              Sign Up Now, It's Free
            </button>
          </section>
        </main>

        {/* Footer */}
        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <div className={styles.footerLogo}>
              <svg className={styles.logoIcon} fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" fill="currentColor"></path>
              </svg>
              <h2 className={styles.logoText}>Stylora</h2>
            </div>
            <div className={styles.footerLinks}>
              <a href="#" className={styles.footerLink}>About</a>
              <a href="#" className={styles.footerLink}>Privacy Policy</a>
              <a href="#" className={styles.footerLink}>Terms of Service</a>
              <a href="#" className={styles.footerLink}>Contact</a>
            </div>
            <div className={styles.copyright}>
              © 2024 Stylora. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

