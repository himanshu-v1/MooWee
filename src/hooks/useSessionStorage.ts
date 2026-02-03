"use client";

import { useState, useEffect } from "react";

export function useSessionStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // Sync with sessionStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const item = window.sessionStorage.getItem(key);
        if (item) {
          try {
            setStoredValue(JSON.parse(item));
          } catch {
            setStoredValue(item as unknown as T);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [key]);

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem(key, typeof valueToStore === 'string' ? valueToStore : JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue] as const;
}

export function getSessionItem(key: string, defaultValue: string | null = null): string | null {
    if (typeof window === "undefined") {
        return defaultValue;
    }
    return window.sessionStorage.getItem(key) || defaultValue;
}
