import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CredentialPreview from '../components/CredentialPreview';
import { useCredential } from '../context/CredentialContext';
import { exportCredentialPng } from '../utils/exportHelper';

export default function PreviewPage() {
  const navigate = useNavigate();
  const { credential, resetCredential } = useCredential();
  const [isExporting, setIsExporting] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareText = `🚀 Builder mode: ON.

Just got my HH Goa 2026 Builder Card 🌴

👤 ${credential.name ? credential.name.toUpperCase() : 'BUILDER'}
🪪 ${credential.hackerId}
⚡ Build. Ship. Connect.

Create yours → https://hh-goacards.vercel.app/

See you in Goa. 🏝️

#FrameInGoa #HHGoa2026`;

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

  const handleCopyText = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy share text:', err);
    }
  }, [shareText]);

  const handleShareX = useCallback(() => {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(tweetUrl, '_blank', 'noopener,noreferrer');
  }, [shareText]);

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

      {/* SHARE CARD TEXT WIDGET */}
      <div className="share-box">
        <div className="share-box__header">
          <span className="share-box__title">📢 SHARE YOUR BUILDER CARD</span>
          <div className="share-box__buttons">
            <button
              type="button"
              className="btn btn--small btn--yellow"
              onClick={handleCopyText}
            >
              {copied ? '✓ COPIED!' : '📋 COPY POST TEXT'}
            </button>
            <button
              type="button"
              className="btn btn--small btn--outline"
              onClick={handleShareX}
            >
              𝕏 SHARE ON X
            </button>
          </div>
        </div>

        <pre className="share-box__text">{shareText}</pre>
      </div>
    </div>
  );
}
