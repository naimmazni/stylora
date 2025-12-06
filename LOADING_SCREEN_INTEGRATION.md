# LoadingScreen Integration Guide

## Component Created

- `src/components/LoadingScreen.tsx`
- `src/components/LoadingScreen.module.scss`

## How to Use in Onboarding Page

### Example Integration in `src/app/onboarding/page.tsx`

```tsx
"use client";

import React, { useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
// ... other imports

export default function OnboardingPage() {
  const router = useRouter();
  const [showLoading, setShowLoading] = useState(false);
  // ... other state

  const handleSubmit = () => {
    if (
      onboardingData.skinTone &&
      onboardingData.gender &&
      (onboardingData.gender !== "female" ||
        onboardingData.hijabi !== undefined) &&
      onboardingData.eventType &&
      onboardingData.stylePreferences &&
      onboardingData.stylePreferences.length > 0
    ) {
      // Save data
      localStorage.setItem("onboardingData", JSON.stringify(onboardingData));

      // Show loading screen
      setShowLoading(true);
    }
  };

  const handleLoadingComplete = () => {
    // Navigate to result page after loading animation
    router.push("/result");
  };

  return (
    <>
      {/* Your existing onboarding content */}
      <div className={styles.container}>
        {/* ... all your onboarding steps ... */}
      </div>

      {/* Loading Screen Overlay */}
      {showLoading && (
        <LoadingScreen
          duration={3000} // 3 seconds
          onComplete={handleLoadingComplete}
        />
      )}
    </>
  );
}
```

## Component Props

```tsx
interface LoadingScreenProps {
  message?: string; // Single custom message
  messages?: string[]; // Array of rotating messages
  duration?: number; // Duration in ms (default: 3000)
  onComplete?: () => void; // Callback when loading completes
}
```

## Features

✅ **Smooth Animations**

- Rotating hanger icon with pulsing effect
- Orbiting particle effects
- Rotating loading messages
- Animated progress bar
- Floating gradient backgrounds

✅ **Customizable**

- Custom messages or use defaults
- Adjustable duration
- Completion callback for navigation

✅ **Accessible**

- Respects `prefers-reduced-motion`
- Proper ARIA labels
- Semantic HTML

✅ **Responsive**

- Works on mobile and desktop
- Fluid typography and spacing

## Default Messages

1. "Creating your perfect look..."
2. "Analyzing your style preferences..."
3. "Curating personalized recommendations..."
4. "Finding your signature style..."
5. "Building your wardrobe..."

## Styling

Uses your existing design tokens from `_variables.scss`:

- `$brand-green` - Background gradient
- `$brand-cream` - Text and icons
- `$accent` - Accents and particles
- `$font-family-heading` - Message typography
