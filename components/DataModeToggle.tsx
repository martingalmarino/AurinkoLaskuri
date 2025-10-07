'use client';

import React, { useState, useEffect } from 'react';
import { Database, Cloud, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

interface HealthStatus {
  status: string;
  timestamp: string;
  fmiAPI: boolean;
  nordPoolAPI: boolean;
  mode: 'real' | 'mock';
}

export default function DataModeToggle() {
  const [useRealAPIs, setUseRealAPIs] = useState<boolean | null>(null);
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [healthLoading, setHealthLoading] = useState(false);

  useEffect(() => {
    fetchDataMode();
    fetchHealthStatus();
  }, []);

  const fetchDataMode = async () => {
    try {
      const response = await fetch('/api/data-mode');
      const data = await response.json();
      setUseRealAPIs(data.useRealAPIs);
    } catch (error) {
      console.error('Failed to fetch data mode:', error);
    }
  };

  const fetchHealthStatus = async () => {
    setHealthLoading(true);
    try {
      const response = await fetch('/api/health');
      const data = await response.json();
      setHealth(data);
    } catch (error) {
      console.error('Failed to fetch health status:', error);
    } finally {
      setHealthLoading(false);
    }
  };

  const toggleDataMode = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/data-mode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ useRealAPIs: !useRealAPIs }),
      });

      if (response.ok) {
        await fetchDataMode();
        await fetchHealthStatus();
      }
    } catch (error) {
      console.error('Failed to toggle data mode:', error);
    } finally {
      setLoading(false);
    }
  };

  if (useRealAPIs === null) {
    return (
      <div className="fixed bottom-4 right-4 bg-white border border-gray-200 rounded-lg p-4 shadow-lg z-50">
        <Loader2 className="w-5 h-5 animate-spin" />
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-200 rounded-lg p-4 shadow-lg z-50 max-w-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-900">Data Mode</h3>
        <button
          onClick={toggleDataMode}
          disabled={loading}
          className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
            useRealAPIs
              ? 'bg-green-100 text-green-800 hover:bg-green-200'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          } ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          {loading ? (
            <Loader2 className="w-3 h-3 animate-spin" />
          ) : useRealAPIs ? (
            <Cloud className="w-3 h-3" />
          ) : (
            <Database className="w-3 h-3" />
          )}
          <span>{useRealAPIs ? 'Real APIs' : 'Mock Data'}</span>
        </button>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-600">FMI API:</span>
          <div className="flex items-center space-x-1">
            {healthLoading ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : health?.fmiAPI ? (
              <CheckCircle className="w-3 h-3 text-green-500" />
            ) : (
              <AlertCircle className="w-3 h-3 text-red-500" />
            )}
            <span className={health?.fmiAPI ? 'text-green-600' : 'text-red-600'}>
              {health?.fmiAPI ? 'Connected' : 'Failed'}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-600">Nord Pool API:</span>
          <div className="flex items-center space-x-1">
            {healthLoading ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : health?.nordPoolAPI ? (
              <CheckCircle className="w-3 h-3 text-green-500" />
            ) : (
              <AlertCircle className="w-3 h-3 text-red-500" />
            )}
            <span className={health?.nordPoolAPI ? 'text-green-600' : 'text-red-600'}>
              {health?.nordPoolAPI ? 'Connected' : 'Failed'}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-600">Mode:</span>
          <span className={`font-medium ${
            health?.mode === 'real' ? 'text-green-600' : 'text-gray-600'
          }`}>
            {health?.mode === 'real' ? 'Production' : 'Development'}
          </span>
        </div>
      </div>

      <button
        onClick={fetchHealthStatus}
        disabled={healthLoading}
        className="mt-3 w-full text-xs text-blue-600 hover:text-blue-800 disabled:opacity-50"
      >
        {healthLoading ? 'Checking...' : 'Refresh Status'}
      </button>
    </div>
  );
}
