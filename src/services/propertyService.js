import { PROPERTIES } from '../data/properties';
import { calculateMatchScore, matchPropertyToProfile } from '../utils/matching';

/**
 * Service abstraction for Property API operations.
 */
export const propertyService = {
  /**
   * Get filtered & sorted list of properties
   */
  async getProperties(filters = {}) {
    await new Promise((resolve) => setTimeout(resolve, 100));

    let results = [...PROPERTIES];

    // Filter by Query
    if (filters.query && filters.query.trim() !== '') {
      const q = filters.query.toLowerCase().trim();
      results = results.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.location.areaName.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Filter by Area / Location
    if (filters.location && filters.location !== 'all') {
      results = results.filter(
        (p) =>
          p.location.area === filters.location ||
          p.location.areaName.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Filter by Gender
    if (filters.gender && filters.gender !== 'all') {
      results = results.filter((p) => p.gender === filters.gender || p.gender === 'campur');
    }

    // Filter by Min Price
    if (filters.minPrice) {
      const minP = Number(filters.minPrice);
      results = results.filter((p) => p.priceMin >= minP || p.priceMax >= minP);
    }

    // Filter by Max Price
    if (filters.maxPrice) {
      const maxP = Number(filters.maxPrice);
      results = results.filter((p) => p.priceMin <= maxP);
    }

    // Filter by Max Distance
    if (filters.maxDistance) {
      const maxD = Number(filters.maxDistance);
      results = results.filter((p) => p.distanceFromIPB <= maxD);
    }

    // Facility flags
    if (filters.ac) results = results.filter((p) => p.facilities.includes('ac'));
    if (filters.wifi) results = results.filter((p) => p.facilities.includes('wifi'));
    if (filters.bathroomInside) results = results.filter((p) => p.facilities.includes('bathroom_inside'));
    if (filters.parking) results = results.filter((p) => p.facilities.includes('parking_motor') || p.facilities.includes('parking_car'));
    if (filters.laundry) results = results.filter((p) => p.facilities.includes('laundry'));
    if (filters.furnished) results = results.filter((p) => p.facilities.includes('furnished'));

    // Filter by Environment / Suasana
    if (filters.environment && filters.environment !== 'all') {
      results = results.filter((p) => p.environment?.noiseLevel === filters.environment);
    }

    // Sort Results
    const sortBy = filters.sortBy || 'recommended';
    switch (sortBy) {
      case 'lowest_price':
        results.sort((a, b) => a.priceMin - b.priceMin);
        break;
      case 'closest':
        results.sort((a, b) => a.distanceFromIPB - b.distanceFromIPB);
        break;
      case 'highest_rated':
        results.sort((a, b) => b.rating - a.rating);
        break;
      case 'recommended':
      default:
        results.sort((a, b) => (b.rating * 2 - b.distanceFromIPB) - (a.rating * 2 - a.distanceFromIPB));
        break;
    }

    return results;
  },

  /**
   * Get single property by ID or Slug
   */
  async getPropertyBySlug(slugOrId) {
    await new Promise((resolve) => setTimeout(resolve, 80));
    return PROPERTIES.find((p) => p.slug === slugOrId || p.id === slugOrId) || null;
  },

  /**
   * Get similar properties based on area & gender
   */
  async getSimilarProperties(currentId, limit = 3) {
    await new Promise((resolve) => setTimeout(resolve, 80));
    const current = PROPERTIES.find((p) => p.id === currentId || p.slug === currentId);
    if (!current) return PROPERTIES.slice(0, limit);

    return PROPERTIES.filter((p) => p.id !== current.id)
      .sort((a, b) => {
        let scoreA = 0;
        let scoreB = 0;
        if (a.gender === current.gender) scoreA += 3;
        if (b.gender === current.gender) scoreB += 3;
        if (a.location.area === current.location.area) scoreA += 4;
        if (b.location.area === current.location.area) scoreB += 4;
        return scoreB - scoreA;
      })
      .slice(0, limit);
  },

  /**
   * Calculate profile-matched properties with score and reasons
   */
  async getRecommendedProperties(studentProfile) {
    await new Promise((resolve) => setTimeout(resolve, 150));

    const prefs = studentProfile?.preferences || studentProfile || {};

    const scoredProperties = PROPERTIES.map((prop) => {
      const match = matchPropertyToProfile(prop, prefs);
      return {
        ...prop,
        matchScore: match.score,
        matchReasons: match.reasons,
        matchTradeoffs: match.tradeoffs
      };
    });

    scoredProperties.sort((a, b) => b.matchScore - a.matchScore);
    return scoredProperties;
  }
};
