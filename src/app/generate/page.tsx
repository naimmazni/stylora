'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * DEPRECATED: This page is no longer used.
 * 
 * The proper flow is:
 * 1. User completes onboarding (/onboarding)
 * 2. User is redirected to result page (/result)
 * 3. Result page generates and displays the outfit
 * 4. "Generate New Outfit" redirects back to onboarding
 * 
 * This page now redirects to onboarding for a fresh start.
 */
export default function GeneratePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to onboarding to start fresh
    router.push('/onboarding');
  }, [router]);

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: 'Source Sans 3, sans-serif'
    }}>
      <p>Redirecting to onboarding...</p>
    </div>
  );
}
