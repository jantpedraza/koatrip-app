'use client';

import { useState, useCallback } from 'react';
import { Trip } from '@/types/trip';

const STORAGE_KEY = 'koatrip_saved_trips';

function loadTripsFromStorage(): Trip[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function useTrips() {
  // Lazy initialization from localStorage
  const [trips, setTrips] = useState<Trip[]>(() => loadTripsFromStorage());

  const saveTrip = useCallback((trip: Omit<Trip, 'id' | 'createdAt'>) => {
    const newTrip: Trip = {
      ...trip,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };

    setTrips((prev) => {
      const updated = [newTrip, ...prev];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });

    return newTrip;
  }, []);

  const deleteTrip = useCallback((id: string) => {
    setTrips((prev) => {
      const updated = prev.filter((trip) => trip.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const getTripById = useCallback(
    (id: string) => trips.find((trip) => trip.id === id),
    [trips]
  );

  return {
    trips,
    isLoaded: true,
    saveTrip,
    deleteTrip,
    getTripById,
  };
}
