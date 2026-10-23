import React, { createContext, useContext, useState, useEffect } from 'react';
import { calculateMatchScore, determineStudentArchetype } from '../utils/matching';

const StudentProfileContext = createContext();

const STORAGE_KEY = 'ngekost_student_profile';

export function StudentProfileProvider({ children }) {
  const [profile, setProfile] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    if (profile) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      } catch (e) {
        console.error('Failed to save profile to localStorage', e);
      }
    }
  }, [profile]);

  const saveProfile = (discoveryData) => {
    const archetype = determineStudentArchetype(discoveryData);

    const newProfile = {
      id: `profile_${Date.now()}`,
      name: discoveryData.name || '',
      contact: {
        whatsapp: discoveryData.whatsapp || '',
        email: discoveryData.email || ''
      },
      university: 'IPB University',
      studyProgram: discoveryData.studyProgram || '',
      preferences: {
        budgetMin: discoveryData.budgetMin || 0,
        budgetMax: discoveryData.budgetMax || 2000000,
        maxDistance: discoveryData.maxDistance || 2.0,
        gender: discoveryData.genderPreference || 'all',
        facilities: discoveryData.facilities || [],
        lifestyle: {
          environmentPref: discoveryData.environmentPref || 'quiet',
          afterClass: discoveryData.afterClass || 'rest',
          quiet: discoveryData.environmentPref === 'quiet' ? 5 : 3,
          social: discoveryData.environmentPref === 'social' ? 5 : 3,
          privacy: discoveryData.facilities?.includes('bathroom_inside') ? 5 : 3,
          community: discoveryData.environmentPref === 'social' ? 4 : 3
        }
      },
      moveInDate: discoveryData.moveInDate || 'Bulan Depan',
      archetype,
      consent: discoveryData.consent !== undefined ? discoveryData.consent : true,
      source: 'discovery_flow',
      createdAt: new Date().toISOString()
    };

    setProfile(newProfile);
    return newProfile;
  };

  const clearProfile = () => {
    setProfile(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
  };

  const getMatchForProperty = (property) => {
    return calculateMatchScore(profile, property);
  };

  return (
    <StudentProfileContext.Provider
      value={{
        profile,
        saveProfile,
        clearProfile,
        getMatchForProperty
      }}
    >
      {children}
    </StudentProfileContext.Provider>
  );
}

export function useStudentProfile() {
  const context = useContext(StudentProfileContext);
  if (!context) {
    throw new Error('useStudentProfile must be used within StudentProfileProvider');
  }
  return context;
}
