import { useState } from 'react';
import { useCredential } from '../context/CredentialContext';

export default function CredentialCanvas() {
  const { credential } = useCredential();
  const { name, role, photo, hackerId } = credential;
  const [loadError, setLoadError] = useState(false);

  return (
    <div className="credential-canvas" id="credential-card">
      {/* LAYER 1: FIXED BASE TEMPLATE */}
      <img
        src="/assets/cardtemplate.png"
        alt="Hacker House Goa 2026 Base Template"
        className="credential-canvas__base"
        onError={() => setLoadError(true)}
      />

      {loadError && (
        <div className="credential-canvas__error">
          <h3>TEMPLATE LOADING ERROR</h3>
          <p>Could not load /assets/cardtemplate.png</p>
        </div>
      )}

      {/* LAYER 2: DYNAMIC PHOTO LAYER */}
      <div className="credential-canvas__photo-layer">
        {photo ? (
          <img src={photo} alt="User Photo" className="credential-canvas__photo" />
        ) : (
          <div className="credential-canvas__photo-empty">
            <span>[ PHOTO ]</span>
          </div>
        )}
      </div>

      {/* LAYER 3: DYNAMIC NAME LAYER */}
      <div className="credential-canvas__name-layer">
        <span className="credential-canvas__text credential-canvas__text--name">
          {name ? name.toUpperCase() : ''}
        </span>
      </div>

      {/* LAYER 4: DYNAMIC ROLE LAYER */}
      <div className="credential-canvas__role-layer">
        <span className="credential-canvas__text credential-canvas__text--role">
          {role ? role.toUpperCase() : ''}
        </span>
      </div>

      {/* LAYER 5: DYNAMIC HACKER ID LAYER */}
      <div className="credential-canvas__id-layer">
        <span className="credential-canvas__text credential-canvas__text--id">
          {hackerId}
        </span>
      </div>
    </div>
  );
}
