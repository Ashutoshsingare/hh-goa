import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CredentialProvider } from './context/CredentialContext';
import LandingPage from './pages/LandingPage';
import CreateCredentialPage from './pages/CreateCredentialPage';
import PreviewPage from './pages/PreviewPage';
import './App.css';

export default function App() {
  return (
    <CredentialProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/create" element={<CreateCredentialPage />} />
          <Route path="/preview" element={<PreviewPage />} />
          {/* Catch-all → redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </CredentialProvider>
  );
}
