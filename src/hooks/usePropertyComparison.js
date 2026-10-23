import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'ipb_kost_finder_compare';
const MAX_COMPARISON_ITEMS = 4;
const MIN_COMPARISON_ITEMS = 2;

/**
 * Safely parse comparison IDs from localStorage
 */
function getStoredComparisonIds() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return Array.from(new Set(parsed.filter((id) => typeof id === 'string' && id.trim().length > 0))).slice(0, MAX_COMPARISON_ITEMS);
  } catch (e) {
    console.error('Failed reading compare list from localStorage:', e);
    return [];
  }
}

/**
 * Custom hook to manage comparison state with localStorage persistence.
 */
export function usePropertyComparison() {
  const [comparisonIds, setComparisonIds] = useState(() => getStoredComparisonIds());
  const [warningMessage, setWarningMessage] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(comparisonIds));
    } catch (e) {
      console.error('Failed storing compare list to localStorage:', e);
    }
  }, [comparisonIds]);

  // Clear warning after 3.5s
  useEffect(() => {
    if (warningMessage) {
      const timer = setTimeout(() => setWarningMessage(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [warningMessage]);

  const addToComparison = useCallback((propertyId) => {
    if (!propertyId) return false;
    const idStr = String(propertyId);

    setComparisonIds((prev) => {
      if (prev.includes(idStr)) return prev;
      if (prev.length >= MAX_COMPARISON_ITEMS) {
        setWarningMessage('Kamu bisa membandingkan maksimal 4 kos sekaligus.');
        return prev;
      }
      setWarningMessage(null);
      return [...prev, idStr];
    });
    return true;
  }, []);

  const removeFromComparison = useCallback((propertyId) => {
    if (!propertyId) return;
    const idStr = String(propertyId);
    setComparisonIds((prev) => prev.filter((id) => id !== idStr));
    setWarningMessage(null);
  }, []);

  const toggleComparison = useCallback((propertyId) => {
    if (!propertyId) return;
    const idStr = String(propertyId);
    setComparisonIds((prev) => {
      if (prev.includes(idStr)) {
        return prev.filter((id) => id !== idStr);
      }
      if (prev.length >= MAX_COMPARISON_ITEMS) {
        setWarningMessage('Kamu bisa membandingkan maksimal 4 kos sekaligus.');
        return prev;
      }
      setWarningMessage(null);
      return [...prev, idStr];
    });
  }, []);

  const clearComparison = useCallback(() => {
    setComparisonIds([]);
    setWarningMessage(null);
  }, []);

  const isCompared = useCallback((propertyId) => {
    if (!propertyId) return false;
    return comparisonIds.includes(String(propertyId));
  }, [comparisonIds]);

  /**
   * Filter comparison list against available properties dataset
   * to gracefully clean up missing IDs without crashing.
   */
  const reconcileWithProperties = useCallback((availableProperties = []) => {
    if (!availableProperties || availableProperties.length === 0) return;
    const availableIds = new Set(availableProperties.map((p) => String(p.id)));
    setComparisonIds((prev) => {
      const filtered = prev.filter((id) => availableIds.has(id));
      if (filtered.length !== prev.length) {
        return filtered;
      }
      return prev;
    });
  }, []);

  return {
    comparisonIds,
    addToComparison,
    removeFromComparison,
    toggleComparison,
    clearComparison,
    isCompared,
    reconcileWithProperties,
    count: comparisonIds.length,
    canCompare: comparisonIds.length >= MIN_COMPARISON_ITEMS,
    warningMessage,
    clearWarning: () => setWarningMessage(null),
    maxLimit: MAX_COMPARISON_ITEMS,
    minLimit: MIN_COMPARISON_ITEMS
  };
}
