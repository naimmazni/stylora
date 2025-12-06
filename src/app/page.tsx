'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, Users, Trophy, Upload, Lightbulb } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './page.module.scss';

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className={styles.landing}>
      <Navbar showAuthButtons={true} />

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
                <h3 className={styles.featureTitle}>Shop with Ease</h3>
                <p className={styles.featureDescription}>
                  Every outfit comes with direct Shopee links. Browse curated items, compare prices, and shop your perfect look instantly.
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
                  <h3 className={styles.stepTitle}>1. Share Your Style</h3>
                  <p className={styles.stepDescription}>
                    Tell us your preferences - from skin tone to event type and style choices.
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
                  <h3 className={styles.stepTitle}>2. Get AI Outfit</h3>
                  <p className={styles.stepDescription}>
                    Our AI creates personalized outfits with color palettes, style tips, and direct Shopee shopping links.
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
                  <h3 className={styles.stepTitle}>3. Shop & Share</h3>
                  <p className={styles.stepDescription}>
                    Shop each item directly on Shopee, save your favorite looks, and share your style with friends.
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

        <Footer />
    </div>
  );
}

