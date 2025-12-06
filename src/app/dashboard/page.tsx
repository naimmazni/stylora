'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Trophy, Zap, Shirt, Star, Award, TrendingUp } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/ui/Button';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import ProgressBar from '@/components/ui/ProgressBar';
import { Badge } from '@/components/ui/Badge';
import { BADGE_INFO, calculateLevel, getNextLevelPoints } from '@/lib/constants';
import styles from './page.module.scss';

export default function DashboardPage() {
  const router = useRouter();

  // Mock user data - in production, fetch from Supabase
  const userProgress = {
    level: 5,
    totalPoints: 1250,
    currentLevelPoints: 1250 - 1000, // Points in current level
    nextLevelPoints: 2000 - 1000, // Points needed for next level
    outfitsCreated: 15,
    challengesCompleted: 8,
    currentStreak: 3,
  };

  const earnedBadges = [
    { type: 'first-outfit', earnedAt: new Date() },
    { type: 'fashionista', earnedAt: new Date() },
    { type: 'week-warrior', earnedAt: new Date() },
  ];

  const recentOutfits = [
    {
      id: '1',
      occasion: 'Party',
      style: 'Bold',
      createdAt: new Date(),
      colors: ['#e74c3c', '#000000', '#f39c12'],
    },
    {
      id: '2',
      occasion: 'Work',
      style: 'Chic',
      createdAt: new Date(),
      colors: ['#2c3e50', '#ecf0f1', '#3498db'],
    },
  ];

  return (
    <div className={styles.dashboard}>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h1>My Dashboard</h1>
            <p>Track your style journey and achievements</p>
          </div>
          <Button
            variant="primary"
            onClick={() => router.push('/onboarding')}
            icon={<Shirt size={20} />}
          >
            Create New Outfit
          </Button>
        </div>

        {/* Stats Overview */}
        <div className={styles['stats-grid']}>
          <Card className={styles['stat-card']}>
            <div className={styles['stat-icon']} style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
              <Trophy size={24} />
            </div>
            <div className={styles['stat-content']}>
              <div className={styles['stat-value']}>{userProgress.totalPoints}</div>
              <div className={styles['stat-label']}>Total Points</div>
            </div>
          </Card>

          <Card className={styles['stat-card']}>
            <div className={styles['stat-icon']} style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
              <Shirt size={24} />
            </div>
            <div className={styles['stat-content']}>
              <div className={styles['stat-value']}>{userProgress.outfitsCreated}</div>
              <div className={styles['stat-label']}>Outfits Created</div>
            </div>
          </Card>

          <Card className={styles['stat-card']}>
            <div className={styles['stat-icon']} style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
              <Zap size={24} />
            </div>
            <div className={styles['stat-content']}>
              <div className={styles['stat-value']}>{userProgress.challengesCompleted}</div>
              <div className={styles['stat-label']}>Challenges Completed</div>
            </div>
          </Card>

          <Card className={styles['stat-card']}>
            <div className={styles['stat-icon']} style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}>
              <TrendingUp size={24} />
            </div>
            <div className={styles['stat-content']}>
              <div className={styles['stat-value']}>{userProgress.currentStreak}</div>
              <div className={styles['stat-label']}>Day Streak</div>
            </div>
          </Card>
        </div>

        <div className={styles['main-content']}>
          {/* Level Progress */}
          <Card>
            <CardHeader>
              <div className={styles['card-header']}>
                <h3>Level Progress</h3>
                <Badge variant="primary">Level {userProgress.level}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ProgressBar
                current={userProgress.currentLevelPoints}
                total={userProgress.nextLevelPoints}
              />
              <p className={styles['progress-text']}>
                {userProgress.nextLevelPoints - userProgress.currentLevelPoints} points to Level {userProgress.level + 1}
              </p>
            </CardContent>
          </Card>

          {/* Badges */}
          <Card>
            <CardHeader>
              <div className={styles['card-header']}>
                <h3>Badges</h3>
                <span className={styles['badge-count']}>
                  {earnedBadges.length} / {Object.keys(BADGE_INFO).length}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className={styles['badges-grid']}>
                {Object.entries(BADGE_INFO).map(([type, badge]) => {
                  const earned = earnedBadges.some((b) => b.type === type);
                  return (
                    <motion.div
                      key={type}
                      className={`${styles.badge} ${earned ? styles.earned : styles.locked}`}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className={styles['badge-icon']}>{badge.icon}</div>
                      <div className={styles['badge-name']}>{badge.name}</div>
                      <div className={styles['badge-description']}>
                        {badge.description}
                      </div>
                      {!earned && <div className={styles['locked-overlay']}>🔒</div>}
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Recent Outfits */}
          <Card>
            <CardHeader>
              <div className={styles['card-header']}>
                <h3>Recent Outfits</h3>
                <Button variant="ghost" onClick={() => router.push('/history')}>
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className={styles['outfits-list']}>
                {recentOutfits.map((outfit) => (
                  <motion.div
                    key={outfit.id}
                    className={styles['outfit-item']}
                    whileHover={{ x: 4 }}
                  >
                    <div className={styles['outfit-colors']}>
                      {outfit.colors.map((color, index) => (
                        <div
                          key={index}
                          className={styles['color-dot']}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    <div className={styles['outfit-info']}>
                      <div className={styles['outfit-title']}>
                        {outfit.occasion} - {outfit.style}
                      </div>
                      <div className={styles['outfit-date']}>2 days ago</div>
                    </div>
                    <Star size={20} className={styles['favorite-icon']} />
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className={styles['quick-actions']}>
            <Button
              variant="primary"
              size="large"
              fullWidth
              onClick={() => router.push('/challenges')}
              icon={<Zap size={20} />}
            >
              View Challenges
            </Button>
            <Button
              variant="secondary"
              size="large"
              fullWidth
              onClick={() => router.push('/onboarding')}
              icon={<Shirt size={20} />}
            >
              Create Outfit
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
