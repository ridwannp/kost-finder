const STORAGE_KEY = 'ipb_kost_finder_leads';

/**
 * Service abstraction for Student Lead Management & Landlord Lead Generation.
 */
export const leadService = {
  /**
   * Save a student lead submission
   * @param {Object} leadData
   * @returns {Promise<Object>} Saved lead object
   */
  async createStudentLead(leadData) {
    await new Promise((resolve) => setTimeout(resolve, 250));

    const newLead = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      name: leadData.name || '',
      whatsapp: leadData.whatsapp || '',
      email: leadData.email || '',
      university: leadData.university || 'IPB University',
      studyProgram: leadData.studyProgram || '',
      budgetMin: leadData.budgetMin || 0,
      budgetMax: leadData.budgetMax || 0,
      genderPreference: leadData.genderPreference || 'all',
      facilities: leadData.facilities || [],
      maxDistance: leadData.maxDistance || 0,
      moveInDate: leadData.moveInDate || '',
      source: leadData.source || 'preference_flow',
      consent: leadData.consent !== undefined ? leadData.consent : true,
      createdAt: new Date().toISOString()
    };

    try {
      const existingLeads = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      existingLeads.unshift(newLead);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existingLeads));
    } catch (e) {
      console.warn('Failed to persist lead to localStorage:', e);
    }

    return newLead;
  },

  /**
   * Get all saved leads (for debug/analytics/dashboard demo)
   * @returns {Promise<Array>}
   */
  async getSavedLeads() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch (e) {
      return [];
    }
  }
};
