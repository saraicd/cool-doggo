"use client";
import { useState, useEffect } from 'react';

const ADMIN_KEY_STORAGE = 'coolStoryAdminKey';

export function useAdminAuth() {
  const [adminKey, setAdminKey] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Load from sessionStorage on mount
    const stored = sessionStorage.getItem(ADMIN_KEY_STORAGE);
    if (stored) {
      setAdminKey(stored);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (key: string) => {
    sessionStorage.setItem(ADMIN_KEY_STORAGE, key);
    setAdminKey(key);
    setIsAuthenticated(true);
  };

  const logout = () => {
    sessionStorage.removeItem(ADMIN_KEY_STORAGE);
    setAdminKey(null);
    setIsAuthenticated(false);
  };

  return { adminKey, isAuthenticated, login, logout };
}
