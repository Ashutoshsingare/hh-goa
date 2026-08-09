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

  const handleShareToX = useCallback(() => {
    const nameText = credential.name ? credential.name.trim() : 'Builder';
    const idText = credential.hackerId || 'HH-2026';

    const tweetText = `🚀 Builder mode: ON. Just got my HH Goa 2026 Builder Card 🌴\n👤 ${nameText}\n🪪 ${idText}\n⚡ Build. Ship. Connect. Make yours → https://hh-goacards.vercel.app/ See you in Goa. 🏝️ #FrameInGoa #HHGoa2026`;

    const url = `https://x.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }, [credential.name, credential.hackerId]);

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

        <button
          id="share-x-btn"
          className="btn btn--x-share btn--large"
          onClick={handleShareToX}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{ marginRight: '6px' }}
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          Share to 𝕏
        </button>

        <button className="btn btn--outline btn--large" onClick={handleCreateAnother}>
          Create Another
        </button>
      </div>
    </div>
  );
}
