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
  const [onboardingData, setOnboardingData] = useState<Partial<OnboardingData>>({
    stylePreferences: [],
    gender: undefined,
    hijabi: undefined,
  });
  const [uploadedPhoto, setUploadedPhoto] = useState<File | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const sectionRefs = {
    skinTone: React.useRef<HTMLDivElement>(null),
    gender: React.useRef<HTMLDivElement>(null),
    hijabi: React.useRef<HTMLDivElement>(null),
    eventType: React.useRef<HTMLDivElement>(null),
    stylePreferences: React.useRef<HTMLDivElement>(null),
  };

  // Auto-scroll to next section when current is completed
  React.useEffect(() => {
    if (currentStep === 1 && onboardingData.skinTone) {
      setCurrentStep(2);
      setTimeout(() => sectionRefs.gender.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 300);
    } else if (currentStep === 2 && onboardingData.gender) {
      if (onboardingData.gender === 'female') {
        setCurrentStep(3);
        setTimeout(() => sectionRefs.hijabi.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 300);
      } else {
        setCurrentStep(4);
        setTimeout(() => sectionRefs.eventType.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 300);
      }
    } else if (currentStep === 3 && onboardingData.hijabi !== undefined) {
      setCurrentStep(4);
      setTimeout(() => sectionRefs.eventType.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 300);
    } else if (currentStep === 4 && onboardingData.eventType) {
      setCurrentStep(5);
      setTimeout(() => sectionRefs.stylePreferences.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 300);
    }
  }, [onboardingData, currentStep]);

  const handleSubmit = () => {
    if (
      onboardingData.skinTone &&
      onboardingData.gender &&
      (onboardingData.gender !== 'female' || onboardingData.hijabi !== undefined) &&
      onboardingData.eventType &&
      onboardingData.stylePreferences && onboardingData.stylePreferences.length > 0
    ) {
      localStorage.setItem('onboardingData', JSON.stringify(onboardingData));
      router.push('/result');
    }
  };

  const isStepComplete = (step: number) => {
    if (step === 1) return !!onboardingData.skinTone;
    if (step === 2) return !!onboardingData.gender;
    if (step === 3) return onboardingData.hijabi !== undefined;
    if (step === 4) return !!onboardingData.eventType;
    if (step === 5) return onboardingData.stylePreferences && onboardingData.stylePreferences.length > 0;
    return false;
  };

  const getStepNumber = () => {
    let stepNum = 1;
    const steps: any[] = [];
    
    steps.push({ num: stepNum++, id: 'skinTone', label: 'Skin Tone' });
    steps.push({ num: stepNum++, id: 'gender', label: 'Gender' });
    
    if (onboardingData.gender === 'female') {
      steps.push({ num: stepNum++, id: 'hijabi', label: 'Hijabi' });
    }
    
    steps.push({ num: stepNum++, id: 'eventType', label: 'Occasion' });
    steps.push({ num: stepNum++, id: 'stylePreferences', label: 'Style' });
    
    return steps;
  };

  const steps = getStepNumber();

  return (
    <div className={styles.onboarding}>
      <div className={styles.container}>
        {/* Form Content */}
        <div className={styles['form-content']}>
          {/* Skin Tone Selection */}
          <div 
            ref={sectionRefs.skinTone}
            style={{ 
              marginBottom: 80, 
              opacity: currentStep === 1 ? 1 : 0.4,
              transform: currentStep === 1 ? 'scale(1)' : 'scale(0.95)',
              transition: 'all 0.3s ease',
              pointerEvents: currentStep >= 1 ? 'auto' : 'none'
            }}
            onClick={() => currentStep > 1 && setCurrentStep(1)}
          >
            <h2>{steps.find(s => s.id === 'skinTone')?.num}. Select your skin tone</h2>
            <div className={styles['skin-tone-options']}>
              {SKIN_TONES.map((tone) => (
                <div
                  key={tone.value}
                  className={`${styles['skin-tone-option']} ${onboardingData.skinTone === tone.value ? styles.selected : ''}`}
                  onClick={() => setOnboardingData({ ...onboardingData, skinTone: tone.value })}
                >
                  <div className={styles['tone-circle']} style={{ backgroundColor: tone.color }} />
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
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          ref={fileInputRef}
                          onChange={e => {
                            if (e.target.files && e.target.files[0]) {
                              setUploadedPhoto(e.target.files[0]);
                            }
                          }}
                        />
                        <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                          Upload Photo
                        </Button>
                        {uploadedPhoto && (
                          <div style={{ marginTop: 12 }}>
                            <img
                              src={URL.createObjectURL(uploadedPhoto)}
                              alt="Uploaded preview"
                              style={{ maxWidth: 120, maxHeight: 120, borderRadius: 8, margin: '0 auto' }}
                            />
                            <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>{uploadedPhoto.name}</div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Gender Selection */}
                    <div 
                      ref={sectionRefs.gender}
                      style={{ 
                        marginBottom: 80, 
                        opacity: currentStep === 2 ? 1 : isStepComplete(1) ? 0.4 : 0.2,
                        transform: currentStep === 2 ? 'scale(1)' : 'scale(0.95)',
                        transition: 'all 0.3s ease',
                        pointerEvents: isStepComplete(1) ? 'auto' : 'none'
                      }}
                      onClick={() => currentStep > 2 && setCurrentStep(2)}
                    >
                      <h2>{steps.find(s => s.id === 'gender')?.num}. Select your gender</h2>
                      <div style={{ display: 'flex', gap: 24 }}>
                        {['male', 'female', 'other'].map((gender) => (
                          <Button
                            key={gender}
                            variant={onboardingData.gender === gender ? 'primary' : 'outline'}
                            onClick={() => setOnboardingData({ ...onboardingData, gender: gender as 'male' | 'female' | 'other', hijabi: undefined })}
                          >
                            {gender.charAt(0).toUpperCase() + gender.slice(1)}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Hijabi Selection (if female) */}
                    {onboardingData.gender === 'female' && (
                      <div 
                        ref={sectionRefs.hijabi}
                        style={{ 
                          marginBottom: 80, 
                          opacity: currentStep === 3 ? 1 : isStepComplete(2) ? 0.4 : 0.2,
                          transform: currentStep === 3 ? 'scale(1)' : 'scale(0.95)',
                          transition: 'all 0.3s ease',
                          pointerEvents: isStepComplete(2) ? 'auto' : 'none'
                        }}
                        onClick={() => currentStep > 3 && setCurrentStep(3)}
                      >
                        <h2>{steps.find(s => s.id === 'hijabi')?.num}. Are you a hijabi?</h2>
                        <div style={{ display: 'flex', gap: 24 }}>
                          <Button
                            variant={onboardingData.hijabi === true ? 'primary' : 'outline'}
                            onClick={() => setOnboardingData({ ...onboardingData, hijabi: true })}
                          >
                            Hijabi
                          </Button>
                          <Button
                            variant={onboardingData.hijabi === false ? 'primary' : 'outline'}
                            onClick={() => setOnboardingData({ ...onboardingData, hijabi: false })}
                          >
                            Non-hijabi
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Event Type Selection */}
                    <div 
                      ref={sectionRefs.eventType}
                      style={{ 
                        marginBottom: 80, 
                        opacity: currentStep === 4 ? 1 : (isStepComplete(2) && (onboardingData.gender !== 'female' || isStepComplete(3))) ? 0.4 : 0.2,
                        transform: currentStep === 4 ? 'scale(1)' : 'scale(0.95)',
                        transition: 'all 0.3s ease',
                        pointerEvents: (isStepComplete(2) && (onboardingData.gender !== 'female' || isStepComplete(3))) ? 'auto' : 'none'
                      }}
                      onClick={() => currentStep > 4 && setCurrentStep(4)}
                    >
                      <h2>{steps.find(s => s.id === 'eventType')?.num}. What's the occasion?</h2>
                      <div className={styles['image-grid']}>
                        {EVENT_TYPES.map((event) => (
                          <div
                            key={event.value}
                            className={`${styles['image-card']} ${onboardingData.eventType === event.value ? styles.selected : ''}`}
                            onClick={() => setOnboardingData({ ...onboardingData, eventType: event.value })}
                          >
                            <div className={styles['card-overlay']} />
                            <div className={styles['check-badge']}>
                              <Check size={16} />
                            </div>
                            <div
                              className={styles['card-image']}
                              style={{
                                backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 40%), url(${EVENT_IMAGES[event.value]})`,
                              }}
                            >
                              <p className={styles['card-label']}>{event.label}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Style Preferences Selection */}
                    <div 
                      ref={sectionRefs.stylePreferences}
                      style={{ 
                        marginBottom: 80, 
                        opacity: currentStep === 5 ? 1 : isStepComplete(4) ? 0.4 : 0.2,
                        transform: currentStep === 5 ? 'scale(1)' : 'scale(0.95)',
                        transition: 'all 0.3s ease',
                        pointerEvents: isStepComplete(4) ? 'auto' : 'none'
                      }}
                      onClick={() => currentStep > 5 && setCurrentStep(5)}
                    >
                      <h2>{steps.find(s => s.id === 'stylePreferences')?.num}. Choose your style (select one or more)</h2>
                      <div className={styles['style-grid']}>
                        {STYLE_PREFERENCES.map((style) => {
                          const isSelected = onboardingData.stylePreferences?.includes(style.value);
                          return (
                            <div
                              key={style.value}
                              className={`${styles['style-card']} ${isSelected ? styles.selected : ''}`}
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

                    {/* Submit Button */}
                    {isStepComplete(5) && (
                      <div style={{ 
                        textAlign: 'center', 
                        marginTop: 40, 
                        marginBottom: 60,
                        animation: 'fadeIn 0.5s ease-in'
                      }}>
                        <Button 
                          variant="primary" 
                          onClick={handleSubmit}
                          style={{
                            padding: '16px 48px',
                            fontSize: '18px',
                            fontWeight: 600
                          }}
                        >
                          Generate My Perfect Outfit
                          <ArrowRight size={20} style={{ marginLeft: 8 }} />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
  );
}