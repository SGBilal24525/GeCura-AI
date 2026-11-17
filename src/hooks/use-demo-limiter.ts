'use client';

import { useState, useEffect, useCallback } from 'react';

const DEMO_LIMIT = 3;
const TWENTY_FOUR_HOURS_IN_MS = 24 * 60 * 60 * 1000;

type DemoState = {
  count: number;
  timestamp: number;
};

export function useDemoLimiter() {
  const [usageCount, setUsageCount] = useState(0);
  const [isLimitReached, setIsLimitReached] = useState(false);
  const [isGuest, setIsGuest] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // This effect runs on the client after hydration
    const plan = localStorage.getItem('userPlan');
    if (!plan) {
      setIsGuest(true);
      try {
        const storedState = localStorage.getItem('demoUsage');
        if (storedState) {
          const { count, timestamp }: DemoState = JSON.parse(storedState);
          const now = Date.now();
          if (now - timestamp > TWENTY_FOUR_HOURS_IN_MS) {
            localStorage.removeItem('demoUsage');
            setUsageCount(0);
            setIsLimitReached(false);
          } else {
            setUsageCount(count);
            setIsLimitReached(count >= DEMO_LIMIT);
          }
        }
      } catch (error) {
        console.error("Failed to parse demo usage from localStorage", error);
        localStorage.removeItem('demoUsage');
      }
    } else {
      setIsGuest(false);
    }
    setIsReady(true);
  }, []);

  const incrementUsage = useCallback(() => {
    if (!isGuest || isLimitReached) {
      return false;
    }
    
    const newCount = usageCount + 1;
    const newState: DemoState = { count: newCount, timestamp: Date.now() };
    
    try {
        localStorage.setItem('demoUsage', JSON.stringify(newState));
    } catch (error) {
        console.error("Failed to save demo usage to localStorage", error);
    }
    
    setUsageCount(newCount);
    if (newCount >= DEMO_LIMIT) {
        setIsLimitReached(true);
    }
    
    return true;
  }, [isGuest, isLimitReached, usageCount]);

  return { usageCount, isLimitReached, incrementUsage, isGuest, isReady };
}
