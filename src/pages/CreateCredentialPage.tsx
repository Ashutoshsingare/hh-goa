import { useNavigate } from 'react-router-dom';
import CredentialForm from '../components/CredentialForm';
import { useCredential } from '../context/CredentialContext';

export default function CreateCredentialPage() {
  const navigate = useNavigate();
  const { credential } = useCredential();

  return (
    <div className="create-page">
      <div className="create-page__left">
        <button
          type="button"
          className="btn btn--outline"
          style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', marginBottom: '2rem', alignSelf: 'flex-start' }}
          onClick={() => navigate('/')}
        >
          ← Back to Home
        </button>

        <span className="create-page__eyebrow">HACKER HOUSE GOA 2026 // BUILDER ID</span>
        <h1 className="create-page__title">
          MAKE YOUR <em>MARK.</em>
        </h1>
        <p className="create-page__subtitle">
          Create your official Hacker House Goa Builder ID.
        </p>

        <div className="create-page__id-preview">
          <span className="create-page__id-label">AUTO-ASSIGNED ID:</span>
          <span>{credential.hackerId}</span>
        </div>
      </div>

      <div className="create-page__right">
        <CredentialForm />
      </div>
    </div>
  );
}
