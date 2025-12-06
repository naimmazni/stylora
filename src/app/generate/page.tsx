'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Sparkles, ShoppingBag, Heart, Share2, ArrowLeft } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { LoadingSpinner } from '@/components/ui/Badge';
import { OutfitRecommendation, OnboardingData } from '@/types';
import { formatShopeePrice } from '@/lib/shopee';
import { getContrastColor } from '@/lib/utils';
import styles from './page.module.scss';

export default function GeneratePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [outfit, setOutfit] = useState<OutfitRecommendation | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    generateOutfit();
  }, []);

  const generateOutfit = async () => {
    setLoading(true);
    setError(null);

    try {
      // Get onboarding data from localStorage
      const onboardingDataStr = localStorage.getItem('onboardingData');
      if (!onboardingDataStr) {
        router.push('/onboarding');
        return;
      }

      const onboardingData: OnboardingData = JSON.parse(onboardingDataStr);

      const response = await fetch('/api/generate-outfit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          skinTone: onboardingData.skinTone,
          eventType: onboardingData.eventType,
          stylePreferences: onboardingData.stylePreferences,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate outfit');
      }

      const data = await response.json();
      setOutfit(data.outfit);
    } catch (err) {
      setError('Failed to generate outfit. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <LoadingSpinner size="large" />
        <h2>Generating your perfect outfit...</h2>
        <p>Our AI stylist is working on personalized recommendations</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <h2>Oops! Something went wrong</h2>
        <p>{error}</p>
        <Button onClick={generateOutfit} icon={<Sparkles size={20} />}>
          Try Again
        </Button>
      </div>
    );
  }

  if (!outfit) {
    return null;
  }

  return (
    <div className={styles.results}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Button
            variant="ghost"
            onClick={() => router.push('/dashboard')}
            icon={<ArrowLeft size={20} />}
          >
            Back
          </Button>
          <div className={styles.actions}>
            <Button variant="outline" icon={<Heart size={20} />}>
              Save
            </Button>
            <Button variant="outline" icon={<Share2 size={20} />}>
              Share
            </Button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.content}
        >
          <h1 className={styles.title}>Your Perfect Outfit</h1>

          {/* Color Palette */}
          <Card className={styles['color-palette-card']}>
            <CardHeader>
              <h3>Color Palette</h3>
            </CardHeader>
            <CardContent>
              <div className={styles['color-palette']}>
                {Object.entries(outfit.colorPalette).map(([name, color]) => (
                  <div key={name} className={styles['color-swatch']}>
                    <div
                      className={styles.swatch}
                      style={{
                        backgroundColor: color,
                        color: getContrastColor(color),
                      }}
                    >
                      {color}
                    </div>
                    <span className={styles['color-name']}>{name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Clothing Items */}
          <div className={styles['items-grid']}>
            {outfit.items.map((item) => (
              <Card key={item.id} className={styles['item-card']} hover>
                <div className={styles['item-image']}>
                  {item.shopeeImageUrl && (
                    <img src={item.shopeeImageUrl} alt={item.name} />
                  )}
                  <div
                    className={styles['color-badge']}
                    style={{ backgroundColor: item.color }}
                  />
                </div>
                <CardContent>
                  <div className={styles['item-category']}>{item.category}</div>
                  <h3 className={styles['item-name']}>{item.name}</h3>
                  <p className={styles['item-description']}>{item.description}</p>
                  {item.price && (
                    <div className={styles['item-price']}>
                      {formatShopeePrice(item.price)}
                    </div>
                  )}
                  {item.shopeeLink && (
                    <Button
                      fullWidth
                      variant="primary"
                      onClick={() => window.open(item.shopeeLink, '_blank')}
                      icon={<ShoppingBag size={18} />}
                    >
                      View on Shopee
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Style Tips */}
          <Card className={styles['tips-card']}>
            <CardHeader>
              <h3>Style Tips</h3>
            </CardHeader>
            <CardContent>
              <ul className={styles['tips-list']}>
                {outfit.styleTips.map((tip, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {tip}
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <div className={styles['cta-section']}>
            <Button
              variant="primary"
              size="large"
              onClick={generateOutfit}
              icon={<Sparkles size={20} />}
            >
              Generate New Outfit
            </Button>
            <Button
              variant="secondary"
              size="large"
              onClick={() => router.push('/challenges')}
            >
              Complete Challenges
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
