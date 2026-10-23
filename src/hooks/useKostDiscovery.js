/**
 * useKostDiscovery.js
 * Custom hook managing the full student housing discovery flow state.
 * Responsibilities: step navigation, answers, validation, profile generation.
 */

import { useState, useCallback } from 'react';
import { DISCOVERY_QUESTIONS, TOTAL_STEPS } from '../data/discoveryQuestions';
import { generateProfile, answersToMatchCriteria } from '../utils/profileGenerator';

const INITIAL_ANSWERS = {
  environmentPref: null,
  afterClass: null,
  facilities: [],
  maxDistance: null,
  budgetMax: null,
  budgetMin: 0,
  moveInDate: null,
  // Contact (optional)
  name: '',
  whatsapp: '',
  email: '',
  consent: false
};

export function useKostDiscovery() {
  const [currentStep, setCurrentStep] = useState(0); // 0 = intro screen
  const [answers, setAnswers] = useState(INITIAL_ANSWERS);
  const [isComplete, setIsComplete] = useState(false);
  const [profile, setProfile] = useState(null);
  const [matchCriteria, setMatchCriteria] = useState(null);
  const [validationError, setValidationError] = useState(null);

  const totalContentSteps = DISCOVERY_QUESTIONS.length; // questions only
  const contactStep = totalContentSteps + 1; // last step = contact
  const totalSteps = contactStep; // questions + contact

  // Current question data (null on intro=0, null on contact step)
  const currentQuestion =
    currentStep >= 1 && currentStep <= totalContentSteps
      ? DISCOVERY_QUESTIONS[currentStep - 1]
      : null;

  const isIntroStep = currentStep === 0;
  const isContactStep = currentStep === contactStep;
  const isLastStep = currentStep === totalSteps;

  // Progress percentage
  const progressPercent = currentStep === 0 ? 0 : Math.round((currentStep / totalSteps) * 100);

  // ─── Answer Management ────────────────────────────────────────────────────

  const updateAnswer = useCallback((field, value) => {
    setValidationError(null);
    setAnswers(prev => ({ ...prev, [field]: value }));
  }, []);

  const toggleMultiAnswer = useCallback((field, optionId, maxSelect) => {
    setValidationError(null);
    setAnswers(prev => {
      const current = prev[field] || [];
      if (current.includes(optionId)) {
        return { ...prev, [field]: current.filter(id => id !== optionId) };
      }
      if (maxSelect && current.length >= maxSelect) {
        setValidationError(`Pilih maksimal ${maxSelect} yang paling penting buat kamu.`);
        return prev;
      }
      return { ...prev, [field]: [...current, optionId] };
    });
  }, []);

  // ─── Validation ───────────────────────────────────────────────────────────

  const validateCurrentStep = useCallback(() => {
    if (isIntroStep) return true;
    if (isContactStep) return true; // Contact is optional

    const question = currentQuestion;
    if (!question) return true;

    const value = answers[question.field];

    if (question.type === 'single') {
      if (value === null || value === undefined) {
        setValidationError('Pilih salah satu pilihan untuk melanjutkan.');
        return false;
      }
    }

    if (question.type === 'multi') {
      if (!value || value.length === 0) {
        setValidationError('Pilih setidaknya satu pilihan untuk melanjutkan.');
        return false;
      }
    }

    setValidationError(null);
    return true;
  }, [currentStep, currentQuestion, answers, isIntroStep, isContactStep]);

  // ─── Navigation ───────────────────────────────────────────────────────────

  const goNext = useCallback(() => {
    if (!validateCurrentStep()) return;

    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Complete the flow
      const generatedProfile = generateProfile(answers);
      const criteria = answersToMatchCriteria(answers);
      setProfile(generatedProfile);
      setMatchCriteria(criteria);
      setIsComplete(true);
    }
  }, [currentStep, totalSteps, validateCurrentStep, answers]);

  const goBack = useCallback(() => {
    if (currentStep > 0) {
      setValidationError(null);
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentStep]);

  const goToStep = useCallback((step) => {
    if (step >= 0 && step <= totalSteps) {
      setCurrentStep(step);
    }
  }, [totalSteps]);

  const restart = useCallback(() => {
    setCurrentStep(0);
    setAnswers(INITIAL_ANSWERS);
    setIsComplete(false);
    setProfile(null);
    setMatchCriteria(null);
    setValidationError(null);
  }, []);

  // Complete the flow manually (e.g. from final CTA)
  const complete = useCallback(() => {
    const generatedProfile = generateProfile(answers);
    const criteria = answersToMatchCriteria(answers);
    setProfile(generatedProfile);
    setMatchCriteria(criteria);
    setIsComplete(true);
  }, [answers]);

  return {
    // State
    currentStep,
    answers,
    isComplete,
    profile,
    matchCriteria,
    validationError,

    // Computed
    currentQuestion,
    totalSteps,
    totalContentSteps,
    contactStep,
    isIntroStep,
    isContactStep,
    isLastStep,
    progressPercent,

    // Actions
    updateAnswer,
    toggleMultiAnswer,
    goNext,
    goBack,
    goToStep,
    restart,
    complete,
    setValidationError
  };
}

export default useKostDiscovery;
