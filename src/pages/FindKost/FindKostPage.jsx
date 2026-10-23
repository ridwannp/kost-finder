import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowLeft,
  Check,
  CheckCircle2,
  Sparkles,
  X
} from 'lucide-react';
import SEO from '../../components/common/SEO';
import { useStudentProfile } from '../../context/StudentProfileContext';
import { leadService } from '../../services/leadService';
import { useKostDiscovery } from '../../hooks/useKostDiscovery';
import { DISCOVERY_QUESTIONS } from '../../data/discoveryQuestions';

export default function FindKostPage() {
  const navigate = useNavigate();
  const { saveProfile } = useStudentProfile();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactData, setContactData] = useState({
    name: '',
    whatsapp: '',
    email: '',
    consent: false
  });

  const {
    currentStep,
    answers,
    profile,
    validationError,
    currentQuestion,
    totalSteps,
    totalContentSteps,
    contactStep,
    isIntroStep,
    isContactStep,
    progressPercent,
    updateAnswer,
    toggleMultiAnswer,
    goNext,
    goBack,
    restart,
    complete
  } = useKostDiscovery();

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const fullAnswers = { ...answers, ...contactData };
      const savedProf = saveProfile(fullAnswers);
      await leadService.createStudentLead({
        studentProfile: savedProf,
        consent: contactData.consent,
        source: 'discovery_flow'
      });
      navigate('/recommendations');
    } catch (err) {
      console.error('Error submitting discovery flow:', err);
      // Navigate anyway — lead submission is optional
      navigate('/recommendations');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFinalStep = () => {
    if (isContactStep) {
      handleSubmit();
    } else {
      goNext();
    }
  };

  // ── Intro Screen ──────────────────────────────────────────────────────────
  if (isIntroStep) {
    return (
      <>
        <SEO
          title="Kenali Kebutuhan Kosku – Ngekost"
          description="Jawab beberapa pertanyaan sederhana dan kami carikan kos yang paling cocok buat kamu."
        />
        <div className="min-h-screen bg-gradient-to-br from-[#EAF4EF] via-white to-slate-50 flex items-center justify-center px-4 py-12">
          <div className="max-w-lg w-full text-center space-y-8">
            {/* Brand badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-[#2D5A47]/20 rounded-full text-xs font-bold text-[#2D5A47] shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Ngekost · Personality-driven student housing
            </div>

            {/* Main headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
                Biar kami cari yang cocok buat kamu.
              </h1>
              <p className="text-slate-600 text-lg leading-relaxed">
                Nggak perlu tahu nama kosnya. Ceritakan dulu tempat seperti apa yang kamu butuhkan.
              </p>
              <p className="text-slate-400 text-sm">
                Cuma beberapa pertanyaan, sekitar 1–2 menit.
              </p>
            </div>

            {/* CTA */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={goNext}
                className="w-full py-4 bg-[#2D5A47] hover:bg-[#1e3d30] text-white font-extrabold text-base rounded-2xl transition-all shadow-xl shadow-[#2D5A47]/20 hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                Mulai
                <ArrowRight className="w-5 h-5" />
              </button>
              <Link
                to="/kost"
                className="block text-sm text-slate-400 hover:text-slate-600 transition-colors"
              >
                Atau langsung lihat semua kos →
              </Link>
            </div>

            {/* Trust signals */}
            <div className="flex items-center justify-center gap-6 text-xs text-slate-400 pt-4">
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#2D5A47]" />
                Gratis sepenuhnya
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#2D5A47]" />
                Data tidak dijual
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#2D5A47]" />
                Tanpa login
              </span>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ── Contact Step ──────────────────────────────────────────────────────────
  if (isContactStep) {
    return (
      <>
        <SEO title="Langkah Terakhir – Ngekost" description="Masukkan kontak untuk rekomendasi kos yang lebih personal." />
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
          <div className="max-w-lg w-full space-y-6">
            {/* Progress */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                <span>Langkah {currentStep} dari {totalSteps}</span>
                <button
                  type="button"
                  onClick={goBack}
                  className="flex items-center gap-1 text-slate-400 hover:text-slate-700 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Kembali
                </button>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#2D5A47] h-full transition-all duration-500 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-extrabold text-slate-900">
                  Mau kami bantu sampai ketemu kosnya?
                </h2>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Masukkan WhatsApp kalau kamu ingin rekomendasi yang lebih personal atau dihubungi ketika ada kos yang sesuai.
                </p>
              </div>

              <div className="p-3.5 bg-[#EAF4EF] rounded-2xl border border-[#2D5A47]/20 text-xs text-[#2D5A47] font-medium">
                Opsional — kamu bisa langsung lihat rekomendasi tanpa mengisi ini.
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">Nama</label>
                  <input
                    type="text"
                    value={contactData.name}
                    onChange={(e) => setContactData(p => ({ ...p, name: e.target.value }))}
                    placeholder="Contoh: Ahmad / Siti"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2D5A47]/30 focus:border-[#2D5A47] transition-all"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    Nomor WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={contactData.whatsapp}
                    onChange={(e) => setContactData(p => ({ ...p, whatsapp: e.target.value }))}
                    placeholder="08123456789"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2D5A47]/30 focus:border-[#2D5A47] transition-all"
                  />
                </div>

                <label className="flex items-start gap-3 cursor-pointer group">
                  <div
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${contactData.consent ? 'bg-[#2D5A47] border-[#2D5A47] text-white' : 'border-slate-300 group-hover:border-[#2D5A47]/50'}`}
                    onClick={() => setContactData(p => ({ ...p, consent: !p.consent }))}
                  >
                    {contactData.consent && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span className="text-xs text-slate-500 leading-relaxed">
                    Saya setuju menerima rekomendasi kos yang sesuai dengan kebutuhan saya.
                  </span>
                </label>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#2D5A47] hover:bg-[#1e3d30] text-white font-extrabold text-sm rounded-2xl transition-all shadow-lg shadow-[#2D5A47]/20 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? 'Mencari kos...' : (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      Lihat rekomendasi kos aku
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full py-3 text-sm text-slate-500 hover:text-slate-700 font-medium transition-colors"
                >
                  Lewati, langsung lihat rekomendasi →
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ── Question Steps ────────────────────────────────────────────────────────
  const question = currentQuestion;
  if (!question) return null;

  const isMulti = question.type === 'multi';
  const currentValue = answers[question.field];

  return (
    <>
      <SEO
        title={`Pertanyaan ${currentStep} – Ngekost`}
        description="Jawab pertanyaan untuk menemukan kos yang paling cocok buat kamu."
      />
      <div className="min-h-screen bg-slate-50 px-4 py-8 sm:py-12">
        <div className="max-w-xl mx-auto space-y-6">

          {/* Top navigation */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={goBack}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors px-3 py-2 rounded-xl hover:bg-slate-100"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali
            </button>

            <Link
              to="/"
              className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors px-3 py-2 rounded-xl hover:bg-slate-100"
            >
              Keluar
            </Link>
          </div>

          {/* Progress */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold text-slate-400">
              <span>{currentStep} dari {totalContentSteps} pertanyaan</span>
              <span>{progressPercent}%</span>
            </div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#2D5A47] h-full transition-all duration-500 ease-out rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Question card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-extrabold text-[#2D5A47] uppercase tracking-widest block">
                Pertanyaan {currentStep}
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                {question.question}
              </h2>
              {question.hint && (
                <p className="text-sm text-slate-500">{question.hint}</p>
              )}
            </div>

            {/* Options */}
            <div className={`space-y-3 ${isMulti ? 'grid grid-cols-1 sm:grid-cols-2 gap-3 space-y-0' : ''}`}>
              {question.options.map((opt) => {
                const isSelected = isMulti
                  ? (currentValue || []).includes(opt.id)
                  : currentValue === opt.id || currentValue === opt.value;

                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      if (isMulti) {
                        toggleMultiAnswer(question.field, opt.id, question.maxSelect);
                      } else {
                        // Single select: store value or id
                        updateAnswer(question.field, opt.value !== undefined ? opt.value : opt.id);
                      }
                    }}
                    className={`w-full p-4 rounded-2xl border text-left transition-all duration-150 flex items-center justify-between group ${isSelected
                      ? 'bg-[#EAF4EF] border-[#2D5A47] text-[#2D5A47] shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {opt.emoji && (
                        <span className="text-lg shrink-0 mt-0.5">{opt.emoji}</span>
                      )}
                      <div>
                        <div className={`text-sm font-bold ${isSelected ? 'text-[#2D5A47]' : 'text-slate-800'}`}>
                          {opt.label}
                          {opt.hint && (
                            <span className="ml-1.5 text-xs font-normal text-slate-400">({opt.hint})</span>
                          )}
                        </div>
                        {opt.description && (
                          <div className="text-xs text-slate-500 font-normal mt-0.5 leading-relaxed">
                            {opt.description}
                          </div>
                        )}
                      </div>
                    </div>

                    {isMulti ? (
                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 ml-2 transition-all ${isSelected ? 'bg-[#2D5A47] border-[#2D5A47]' : 'border-slate-300 group-hover:border-[#2D5A47]/40'}`}>
                        {isSelected && <Check className="w-3 h-3 text-white stroke-[3]" />}
                      </div>
                    ) : (
                      isSelected && <CheckCircle2 className="w-5 h-5 text-[#2D5A47] shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Max select hint */}
            {isMulti && question.maxSelectNote && (
              <div className="text-xs text-slate-400 text-center">
                {question.maxSelectNote}
                {currentValue && currentValue.length > 0 && (
                  <span className="ml-1 text-[#2D5A47] font-bold">
                    ({currentValue.length} dipilih)
                  </span>
                )}
              </div>
            )}

            {/* Validation error */}
            {validationError && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-xl text-xs text-red-600 font-medium">
                <X className="w-4 h-4 shrink-0" />
                {validationError}
              </div>
            )}
          </div>

          {/* Navigation CTA */}
          <button
            type="button"
            onClick={goNext}
            className="w-full py-4 bg-[#2D5A47] hover:bg-[#1e3d30] text-white font-extrabold text-sm rounded-2xl transition-all shadow-lg shadow-[#2D5A47]/20 hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            {currentStep === totalContentSteps ? (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                Lanjut ke langkah terakhir
              </>
            ) : (
              <>
                Lanjut
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/* Skip optional */}
          {isMulti && (
            <button
              type="button"
              onClick={goNext}
              className="w-full text-sm text-slate-400 hover:text-slate-600 font-medium transition-colors py-2"
            >
              Lewati pertanyaan ini →
            </button>
          )}
        </div>
      </div>
    </>
  );
}
