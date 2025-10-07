'use client';

import { useEffect, useState } from 'react';

export default function CookiehubDebug() {
  const [debugInfo, setDebugInfo] = useState<string[]>([]);

  useEffect(() => {
    const logs: string[] = [];
    
    // Check if we're in development
    if (process.env.NODE_ENV === 'development') {
      logs.push('🔧 Development mode - Cookiehub debugging enabled');
      
      // Check if cookiehub script is loaded
      const cookiehubScript = document.querySelector('script[src*="cookiehub.eu"]');
      logs.push(`📜 Cookiehub script loaded: ${!!cookiehubScript}`);
      
      // Check window.cookiehub
      logs.push(`🌐 window.cookiehub available: ${typeof (window as any).cookiehub !== 'undefined'}`);
      
      // Check for cookiehub elements
      const cookiehubElements = document.querySelectorAll('[data-cookiehub], .cookiehub-banner, .cookiehub-widget');
      logs.push(`🎯 Cookiehub elements found: ${cookiehubElements.length}`);
      
      // Check console for cookiehub logs
      const originalLog = console.log;
      console.log = (...args) => {
        if (args.some(arg => typeof arg === 'string' && arg.includes('cookiehub'))) {
          logs.push(`📝 Console: ${args.join(' ')}`);
          setDebugInfo([...logs]);
        }
        originalLog(...args);
      };
      
      // Check after a delay
      setTimeout(() => {
        logs.push('⏰ Checking after 3 seconds...');
        logs.push(`🌐 window.cookiehub available: ${typeof (window as any).cookiehub !== 'undefined'}`);
        const elements = document.querySelectorAll('[data-cookiehub], .cookiehub-banner, .cookiehub-widget');
        logs.push(`🎯 Cookiehub elements found: ${elements.length}`);
        setDebugInfo([...logs]);
      }, 3000);
      
      setDebugInfo(logs);
    }
  }, []);

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/90 text-white p-4 rounded-lg max-w-md text-xs z-50">
      <h3 className="font-bold mb-2">🍪 Cookiehub Debug</h3>
      <div className="space-y-1">
        {debugInfo.map((info, index) => (
          <div key={index}>{info}</div>
        ))}
      </div>
    </div>
  );
}
