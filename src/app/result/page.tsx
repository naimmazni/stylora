'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, Share2, Lightbulb } from 'lucide-react';
import { OutfitRecommendation, OnboardingData } from '@/types';
import styles from './page.module.scss';

export default function ResultPage() {
  const router = useRouter();
  const [outfit, setOutfit] = useState<OutfitRecommendation | null>(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
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
      
      // Save outfit to localStorage
      localStorage.setItem('currentOutfit', JSON.stringify(data.outfit));
    } catch (err) {
      setError('Failed to generate outfit. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveOutfit = () => {
    // Save to saved outfits in localStorage
    const savedOutfits = JSON.parse(localStorage.getItem('savedOutfits') || '[]');
    if (outfit && !savedOutfits.find((o: OutfitRecommendation) => o.id === outfit.id)) {
      savedOutfits.push(outfit);
      localStorage.setItem('savedOutfits', JSON.stringify(savedOutfits));
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const handleGenerateNew = () => {
    generateOutfit();
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <h2>Generating your perfect outfit...</h2>
        <p>Our AI stylist is working on personalized recommendations</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.loading}>
        <h2>Oops! Something went wrong</h2>
        <p>{error}</p>
        <button className={styles.generateBtn} onClick={generateOutfit}>
          Try Again
        </button>
      </div>
    );
  }

  if (!outfit) {
    return null;
  }

  // Extract data from outfit
  const outfitTitle = outfit.styleMatch ? outfit.styleMatch.charAt(0).toUpperCase() + outfit.styleMatch.slice(1) : "Your Look";
  const outfitDescription = "Our AI has curated this special look just for you. Explore the pieces, get style tips, and shop your new favorite outfit.";
  
  // Convert color palette to array format
  const colorStory = Object.entries(outfit.colorPalette).map(([key, color]) => ({
    color: color,
    label: color
  }));

  const proTips = outfit.styleTips || [
    "Tuck in the front of the sweater for a relaxed, 'French tuck' silhouette.",
    "Roll the cuffs of the jeans to showcase your ankle boots and add a casual touch.",
    "Add a delicate gold necklace to elevate the look from casual to chic.",
  ];

  // Map outfit items to shop items
  const shopItems = outfit.items.map((item, index) => ({
    id: item.id,
    category: item.category.toUpperCase(),
    name: item.name,
    image: item.shopeeImageUrl || 'https://via.placeholder.com/300',
    shopeeLink: item.shopeeLink,
  }));

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" fill="currentColor"/>
          </svg>
          <h2>Stylora</h2>
        </div>
        <div className={styles.nav}>
          <a href="/">Home</a>
          <a href="/dashboard">My Wardrobe</a>
          <a href="#">Inspiration</a>
          <a href="#">Community</a>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.generateBtn} onClick={handleGenerateNew}>
            Generate New Outfit
          </button>
          <div className={styles.avatar}></div>
        </div>
      </header>

      <main className={styles.main}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <a href="/">Home</a>
          <span>/</span>
          <a href="/result">Generator</a>
          <span>/</span>
          <span>Your Outfit</span>
        </div>

        {/* Title */}
        <div className={styles.titleSection}>
          <h1>Here's Your Stylora Look: {outfitTitle}</h1>
          <p>{outfitDescription}</p>
        </div>

        {/* Complete Outfit Card */}
        <div className={styles.outfitCard}>
          <div 
            className={styles.outfitImage}
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuD_OOllTLyLLPM-r9cIHTqLlCODDqnX2peTHY7qEksaKJwsn4Kstxw7p_3DR4Hmbp6Jv8l0-uyWgz1nq3PctfuoVl_ikklkrmB9SvsYGjog3ay6yGt1uJlP1dDhOMUOgbrgwVogteWFHW5jK39xzhBa9yEEmFen4SDBm3QjQ4cjE0fQzZmc9pq0nayrZ15Z1PoGgzkUqZPyRQ5Ze2VAZuS7FMq0pZ7p4jeZZuDVWY0miDyAPjwaB0iqwWOHc_wO9KEHGTmk268Tc-o_')`
            }}
          />
          <div className={styles.outfitDetails}>
            <h3>Complete Outfit</h3>
            <p>A stylish and comfortable outfit perfect for a weekend brunch or exploring the city. This combination balances casual comfort with a chic, put-together aesthetic.</p>
            <div className={styles.outfitActions}>
              <button className={styles.saveBtn} onClick={handleSaveOutfit}>
                {saved ? 'Saved!' : 'Save Outfit'}
              </button>
              <button className={styles.shareBtn}>Share</button>
            </div>
          </div>
        </div>

        {/* Color Story & Pro Tips */}
        <div className={styles.twoColumn}>
          {/* Color Story */}
          <div className={styles.colorStorySection}>
            <h2>Your Color Story</h2>
            <div className={styles.colorGrid}>
              {colorStory.map((item, index) => (
                <div key={index} className={styles.colorItem}>
                  <div 
                    className={styles.colorCircle}
                    style={{ backgroundColor: item.color }}
                  />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pro Tips */}
          <div className={styles.proTipsSection}>
            <h2>Stylora's Pro-Tips</h2>
            <div className={styles.tipsCard}>
              {proTips.map((tip, index) => (
                <div key={index} className={styles.tipItem}>
                  <Lightbulb className={styles.tipIcon} size={20} />
                  <p>{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Shop The Look */}
        <div className={styles.shopSection}>
          <h2>Shop The Look</h2>
          <div className={styles.shopGrid}>
            {shopItems.map((item) => (
              <div key={item.id} className={styles.shopCard}>
                <div className={styles.shopImageWrapper}>
                  <div 
                    className={styles.shopImage}
                    style={{ backgroundImage: `url('${item.image}')` }}
                  />
                  <button className={styles.favoriteBtn}>
                    <Heart size={18} />
                  </button>
                </div>
                <div className={styles.shopInfo}>
                  <p className={styles.category}>{item.category}</p>
                  <p className={styles.itemName}>{item.name}</p>
                </div>
                <button 
                  className={styles.viewBtn}
                  onClick={() => item.shopeeLink && window.open(item.shopeeLink, '_blank')}
                  disabled={!item.shopeeLink}
                >
                  View on Shopee
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Feedback Section */}
        <div className={styles.feedbackSection}>
          <p className={styles.feedbackQuestion}>What do you think of this look?</p>
          <div className={styles.feedbackButtons}>
            <button className={styles.thumbUp}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
              </svg>
            </button>
            <button className={styles.thumbDown}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/>
              </svg>
            </button>
          </div>
          <a href="#" className={styles.whyAsking}>Why are we asking?</a>
        </div>
      </main>
    </div>
  );
}
