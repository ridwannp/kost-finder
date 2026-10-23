import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  getSavedProperties,
  saveProperty,
  removeProperty,
  toggleSavedProperty,
  isPropertySaved
} from '../services/savedPropertyService';

const SavedKostContext = createContext();

export function SavedKostProvider({ children }) {
  const [savedIds, setSavedIds] = useState(() => getSavedProperties());

  // Listen to cross-tab storage changes if any
  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key === 'ipb_kost_finder_saved') {
        setSavedIds(getSavedProperties());
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const toggleSave = useCallback((id) => {
    if (!id) return;
    const updated = toggleSavedProperty(id);
    setSavedIds(updated);
  }, []);

  const removeSaved = useCallback((id) => {
    if (!id) return;
    const updated = removeProperty(id);
    setSavedIds(updated);
  }, []);

  const addSaved = useCallback((id) => {
    if (!id) return;
    const updated = saveProperty(id);
    setSavedIds(updated);
  }, []);

  const isSaved = useCallback((id) => {
    if (!id) return false;
    return savedIds.includes(String(id));
  }, [savedIds]);

  return (
    <SavedKostContext.Provider
      value={{
        savedIds,
        toggleSave,
        removeSaved,
        addSaved,
        isSaved,
        count: savedIds.length
      }}
    >
      {children}
    </SavedKostContext.Provider>
  );
}

export function useSavedKost() {
  const context = useContext(SavedKostContext);
  if (!context) {
    throw new Error('useSavedKost must be used within SavedKostProvider');
  }
  return context;
}
