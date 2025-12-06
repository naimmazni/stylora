'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Zap, Trophy, Star, Clock, CheckCircle, ArrowLeft } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import ProgressBar from '@/components/ui/ProgressBar';
import styles from './page.module.scss';

export default function ChallengesPage() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<'daily' | 'weekly' | 'mini'>('daily');

  // Mock challenges data
  const challenges = {
    daily: [
      {
        id: '1',
        title: 'Daily Style Quest',
        description: 'Create an outfit today',
        points: 50,
        progress: 0,
        requirement: 1,
        expiresIn: '12h',
        completed: false,
      },
      {
        id: '2',
        title: 'Color Master',
        description: 'Match colors perfectly in an outfit',
        points: 30,
        progress: 1,
        requirement: 1,
        expiresIn: '8h',
        completed: true,
      },
    ],
    weekly: [
      {
        id: '3',
        title: 'Style Explorer',
        description: 'Try 3 different styles this week',
        points: 100,
        progress: 1,
        requirement: 3,
        expiresIn: '5d',
        completed: false,
      },
      {
        id: '4',
        title: 'Fashion Curator',
        description: 'Create 10 outfits this week',
        points: 150,
        progress: 4,
        requirement: 10,
        expiresIn: '3d',
        completed: false,
      },
    ],
    mini: [
      {
        id: '5',
        title: 'Fashion Quiz: Colors',
        description: 'What colors go well with navy blue?',
        points: 20,
        completed: false,
      },
      {
        id: '6',
        title: 'Fashion Quiz: Occasions',
        description: 'Best outfit for a job interview?',
        points: 20,
        completed: false,
      },
      {
        id: '7',
        title: 'Style Match',
        description: 'Match the style to the occasion',
        points: 20,
        completed: true,
      },
    ],
  };

  const currentChallenges = challenges[selectedTab];

  return (
    <div className={styles.challenges}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Button
            variant="ghost"
            onClick={() => router.push('/dashboard')}
            icon={<ArrowLeft size={20} />}
          >
            Back to Dashboard
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.content}
        >
          <div className={styles['title-section']}>
            <h1>Challenges</h1>
            <p>Complete challenges to earn points and unlock badges</p>
          </div>

          {/* Tabs */}
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${selectedTab === 'daily' ? styles.active : ''}`}
              onClick={() => setSelectedTab('daily')}
            >
              <Zap size={20} />
              Daily
            </button>
            <button
              className={`${styles.tab} ${selectedTab === 'weekly' ? styles.active : ''}`}
              onClick={() => setSelectedTab('weekly')}
            >
              <Trophy size={20} />
              Weekly
            </button>
            <button
              className={`${styles.tab} ${selectedTab === 'mini' ? styles.active : ''}`}
              onClick={() => setSelectedTab('mini')}
            >
              <Star size={20} />
              Mini Challenges
            </button>
          </div>

          {/* Challenges List */}
          <div className={styles['challenges-list']}>
            {currentChallenges.map((challenge, index) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={challenge.completed ? styles.completed : ''} hover>
                  <CardContent>
                    <div className={styles['challenge-content']}>
                      <div className={styles['challenge-info']}>
                        <div className={styles['challenge-header']}>
                          <h3>{challenge.title}</h3>
                          {challenge.completed && (
                            <Badge variant="success">
                              <CheckCircle size={16} /> Completed
                            </Badge>
                          )}
                        </div>
                        <p className={styles['challenge-description']}>
                          {challenge.description}
                        </p>
                        {'expiresIn' in challenge && (
                          <div className={styles['challenge-meta']}>
                            <span className={styles.expires}>
                              <Clock size={16} />
                              Expires in {challenge.expiresIn}
                            </span>
                          </div>
                        )}
                        {'progress' in challenge && 'requirement' in challenge && (
                          <div className={styles['challenge-progress']}>
                            <ProgressBar
                              current={challenge.progress}
                              total={challenge.requirement}
                              showText={false}
                            />
                            <span className={styles['progress-label']}>
                              {challenge.progress} / {challenge.requirement}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className={styles['challenge-reward']}>
                        <div className={styles.points}>
                          <Star className={styles.icon} />
                          <span className={styles.value}>{challenge.points}</span>
                          <span className={styles.label}>points</span>
                        </div>
                        {!challenge.completed && (
                          <Button
                            variant="primary"
                            onClick={() => {
                              // Handle challenge start/completion
                              alert('Challenge started!');
                            }}
                          >
                            {selectedTab === 'mini' ? 'Start Quiz' : 'Start'}
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {currentChallenges.length === 0 && (
            <div className={styles['empty-state']}>
              <Trophy size={64} />
              <h3>No challenges available</h3>
              <p>Check back later for new challenges!</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
