import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SavedKostProvider } from './context/SavedKostContext';
import { StudentProfileProvider } from './context/StudentProfileContext';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/Home/HomePage';
import FindKostPage from './pages/FindKost/FindKostPage';
import RecommendationsPage from './pages/Recommendations/RecommendationsPage';
import KostListingPage from './pages/KostListing/KostListingPage';
import KostDetailPage from './pages/KostDetail/KostDetailPage';
import SavedPage from './pages/Saved/SavedPage';
import AboutPage from './pages/About/AboutPage';
import NotFoundPage from './pages/NotFound/NotFoundPage';

import ComparePage from './pages/Compare/ComparePage';
import AuthDevelopmentPage from './pages/Auth/AuthDevelopmentPage';

export default function App() {
  return (
    <SavedKostProvider>
      <StudentProfileProvider>
        <Router>
          <MainLayout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/find" element={<FindKostPage />} />
              <Route path="/recommendations" element={<RecommendationsPage />} />
              <Route path="/kost" element={<KostListingPage />} />
              <Route path="/kost/:slug" element={<KostDetailPage />} />
              <Route path="/saved" element={<SavedPage />} />
              <Route path="/compare" element={<ComparePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/auth" element={<AuthDevelopmentPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </MainLayout>
        </Router>
      </StudentProfileProvider>
    </SavedKostProvider>
  );
}
