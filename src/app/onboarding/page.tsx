'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Check, ArrowRight, ArrowLeft, Upload } from 'lucide-react';
import Button from '@/components/ui/Button';
import { OnboardingData, SkinTone, EventType, StylePreference } from '@/types';
import { SKIN_TONES, EVENT_TYPES, STYLE_PREFERENCES } from '@/lib/constants';
import styles from './page.module.scss';

// Event type images mapping
const EVENT_IMAGES: Record<string, string> = {
  casual: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=400&h=600&fit=crop',
  work: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
  party: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=600&fit=crop',
  formal: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=600&fit=crop',
  date: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=600&fit=crop',
  wedding: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=400&h=600&fit=crop',
  sporty: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=600&fit=crop',
};

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState<Partial<OnboardingData>>({
    stylePreferences: [],
  });

  const totalSteps = 3;
  const progressPercentage = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding and navigate to generation page
      localStorage.setItem('onboardingData', JSON.stringify(onboardingData));
      router.push('/generate');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return !!onboardingData.skinTone;
      case 2:
        return !!onboardingData.eventType;
      case 3:
        return onboardingData.stylePreferences && onboardingData.stylePreferences.length > 0;
      default:
        return false;
    }
  };

  return (
    <div className={styles.onboarding}>
      <div className={styles.container}>
        {/* Progress Bar */}
        <div className={styles['progress-section']}>
          <div className={styles['progress-header']}>
            <p className={styles['step-text']}>Step {currentStep} of {totalSteps}</p>
          </div>
          <div className={styles['progress-bar-container']}>
            <div 
              className={styles['progress-bar']} 
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className={styles['progress-label']}>
            {currentStep === 1 ? 'Skin Tone Selection' : currentStep === 2 ? 'Event Type Selection' : 'Style Preference'}
          </p>
        </div>

        {/* Page Heading */}
        <div className={styles['page-heading']}>
          <h1>
            {currentStep === 1 && "Let's Start with You"}
            {currentStep === 2 && "What's the Occasion?"}
            {currentStep === 3 && "Choose Your Style"}
          </h1>
          <p>
            {currentStep === 1 && "Select your skin tone for personalized color recommendations"}
            {currentStep === 2 && "Select all that apply. This helps us tailor your style."}
            {currentStep === 3 && "Pick one or more styles that resonate with you"}
          </p>
        </div>

        {/* Form Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={styles['form-content']}
          >
            {currentStep === 1 && (
              <div>
                <div className={styles['skin-tone-options']}>
                  {SKIN_TONES.map((tone) => (
                    <div
                      key={tone.value}
                      className={`${styles['skin-tone-option']} ${
                        onboardingData.skinTone === tone.value ? styles.selected : ''
                      }`}
                      onClick={() =>
                        setOnboardingData({ ...onboardingData, skinTone: tone.value })
                      }
                    >
                      <div
                        className={styles['tone-circle']}
                        style={{ backgroundColor: tone.color }}
                      />
                      <span className={styles['tone-label']}>{tone.label}</span>
                      {onboardingData.skinTone === tone.value && (
                        <div className={styles['check-icon']}>
                          <Check size={16} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className={styles['upload-section']}>
                  <Upload className={styles['upload-icon']} />
                  <p>Or upload a photo for AI-powered skin tone detection</p>
                  <Button variant="outline">Upload Photo</Button>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <div className={styles['image-grid']}>
                  {EVENT_TYPES.map((event) => (
                    <div
                      key={event.value}
                      className={`${styles['image-card']} ${
                        onboardingData.eventType === event.value ? styles.selected : ''
                      }`}
                      onClick={() =>
                        setOnboardingData({ ...onboardingData, eventType: event.value })
                      }
                    >
                      <div className={styles['card-overlay']} />
                      <div className={styles['check-badge']}>
                        <Check size={16} />
                      </div>
                      <div 
                        className={styles['card-image']}
                        style={{ 
                          backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 40%), url(${EVENT_IMAGES[event.value]})` 
                        }}
                      >
                        <p className={styles['card-label']}>{event.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div>
                <div className={styles['style-grid']}>
                  {STYLE_PREFERENCES.map((style) => {
                    const isSelected = onboardingData.stylePreferences?.includes(
                      style.value
                    );
                    return (
                      <div
                        key={style.value}
                        className={`${styles['style-card']} ${
                          isSelected ? styles.selected : ''
                        }`}
                        onClick={() => {
                          const current = onboardingData.stylePreferences || [];
                          const updated = isSelected
                            ? current.filter((s) => s !== style.value)
                            : [...current, style.value];
                          setOnboardingData({
                            ...onboardingData,
                            stylePreferences: updated,
                          });
                        }}
                      >
                        <div className={styles['check-badge']}>
                          <Check size={16} />
                        </div>
                        <div className={styles['style-content']}>
                          <h3>{style.label}</h3>
                          <p>{style.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className={styles['button-group']}>
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={currentStep === 1}
            className={styles['back-button']}
          >
            Back
          </Button>
          <Button
            variant="primary"
            onClick={handleNext}
            disabled={!isStepValid()}
            className={styles['continue-button']}
          >
            {currentStep === totalSteps ? 'Complete' : 'Continue'}
          </Button>
        </div>
      </div>
    </div>
  );
}
