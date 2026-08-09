import { useNavigate } from 'react-router-dom';
import { useCredential } from '../context/CredentialContext';
import PhotoUploader from './PhotoUploader';

export default function CredentialForm() {
  const { credential, setName, setRole } = useCredential();
  const navigate = useNavigate();

  const isValid =
    credential.name.trim().length > 0 &&
    credential.role.trim().length > 0 &&
    credential.photo !== null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) navigate('/preview');
  };

  return (
    <form className="credential-form" onSubmit={handleSubmit} noValidate>
      <div className="form-field">
        <label htmlFor="name" className="form-field__label">
          Name <span className="required">*</span>
        </label>
        <input
          id="name"
          type="text"
          className="form-field__input"
          placeholder="Your full name"
          value={credential.name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="off"
        />
      </div>

      <div className="form-field">
        <label htmlFor="role" className="form-field__label">
          Role <span className="required">*</span>
        </label>
        <input
          id="role"
          type="text"
          className="form-field__input"
          placeholder="Builder · Founder · Designer · Dev"
          value={credential.role}
          onChange={(e) => setRole(e.target.value)}
          autoComplete="off"
        />
      </div>

      <PhotoUploader />

      <div className="form-submit">
        <button
          id="generate-credential-btn"
          type="submit"
          className="btn btn--primary"
          disabled={!isValid}
        >
          Generate Builder ID →
        </button>
      </div>
    </form>
  );
}
