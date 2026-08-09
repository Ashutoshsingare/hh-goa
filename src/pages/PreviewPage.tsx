import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CredentialPreview from '../components/CredentialPreview';
import { useCredential } from '../context/CredentialContext';
import { exportCredentialPng } from '../utils/exportHelper';

export default function PreviewPage() {
  const navigate = useNavigate();
  const { credential, resetCredential } = useCredential();
  const [isExporting, setIsExporting] = useState(false);

  const handleDownload = useCallback(async () => {
    const cardEl = document.getElementById('credential-card');
    if (isExporting) return;

    try {
      setIsExporting(true);
      await exportCredentialPng(
        cardEl,
        credential.name,
        credential.role,
        credential.photo,
        credential.hackerId
      );
    } catch (err) {
      console.error('Download failed:', err);
      alert('Could not generate PNG. Please try again.');
    } finally {
      setIsExporting(false);
    }
  }, [credential.name, credential.role, credential.photo, credential.hackerId, isExporting]);

  const handleCreateAnother = useCallback(() => {
    resetCredential();
    navigate('/create');
  }, [resetCredential, navigate]);

  return (
    <div className="preview-page">
      <header className="preview-page__header">
        <span className="preview-page__title">HACKER HOUSE GOA 2026 // BUILDER ID PREVIEW</span>
        <button
          className="btn btn--outline"
          style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}
          onClick={() => navigate('/create')}
        >
          ← Edit Details
        </button>
      </header>

      <div className="card-scaler">
        <CredentialPreview />
      </div>

      <div className="preview-page__actions">
        <button
          id="download-credential-btn"
          className="btn btn--primary btn--large"
          onClick={handleDownload}
          disabled={isExporting}
        >
          {isExporting ? 'GENERATING PNG...' : 'DOWNLOAD BUILDER ID ↓'}
        </button>
        <button className="btn btn--outline btn--large" onClick={handleCreateAnother}>
          Create Another
        </button>
      </div>
    </div>
  );
}
