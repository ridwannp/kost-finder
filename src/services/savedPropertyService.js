/**
 * Utility service for managing saved properties in localStorage.
 * Single source of truth for saved property IDs.
 */

const STORAGE_KEY = 'ipb_kost_finder_saved';

/**
 * Safely parse saved IDs from localStorage.
 * Returns unique array of string IDs.
 */
export function getSavedProperties() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];
    // Filter to valid non-empty string IDs and remove duplicates
    return Array.from(new Set(parsed.filter((id) => typeof id === 'string' && id.trim().length > 0)));
  } catch (e) {
    console.error('Failed to get saved properties from localStorage:', e);
    return [];
  }
}

/**
 * Check if a property ID is saved
 */
export function isPropertySaved(propertyId) {
  if (!propertyId) return false;
  const saved = getSavedProperties();
  return saved.includes(String(propertyId));
}

/**
 * Save a property ID
 */
export function saveProperty(propertyId) {
  if (!propertyId) return getSavedProperties();
  const idStr = String(propertyId);
  try {
    const saved = getSavedProperties();
    if (!saved.includes(idStr)) {
      const updated = [...saved, idStr];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    }
    return saved;
  } catch (e) {
    console.error('Failed to save property to localStorage:', e);
    return getSavedProperties();
  }
}

/**
 * Remove a property ID from saved
 */
export function removeProperty(propertyId) {
  if (!propertyId) return getSavedProperties();
  const idStr = String(propertyId);
  try {
    const saved = getSavedProperties();
    const updated = saved.filter((id) => id !== idStr);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to remove property from localStorage:', e);
    return getSavedProperties();
  }
}

// Backward-compatible alias
export const removeSavedProperty = removeProperty;

/**
 * Toggle saved status of a property
 */
export function toggleSavedProperty(propertyId) {
  if (!propertyId) return getSavedProperties();
  if (isPropertySaved(propertyId)) {
    return removeProperty(propertyId);
  } else {
    return saveProperty(propertyId);
  }
}
