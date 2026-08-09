import { useCallback, useRef } from 'react';
import { useCredential } from '../context/CredentialContext';

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export default function PhotoUploader() {
  const { credential, setPhoto } = useCredential();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File) => {
      if (!ACCEPTED_TYPES.includes(file.type)) {
        alert('Please upload a JPEG, PNG, or WebP image.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === 'string') setPhoto(result);
      };
      reader.readAsDataURL(file);
    },
    [setPhoto]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleRemove = () => {
    setPhoto(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="photo-uploader">
      <label className="photo-uploader__label">
        Photo <span className="required">*</span>
      </label>

      {credential.photo ? (
        <div className="photo-uploader__preview">
          <img
            src={credential.photo}
            alt="Uploaded preview"
            className="photo-uploader__img"
          />
          <button
            type="button"
            className="photo-uploader__remove"
            onClick={handleRemove}
          >
            Remove
          </button>
        </div>
      ) : (
        <div
          className="photo-uploader__dropzone"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
        >
          <span className="photo-uploader__icon">[ ↑ ]</span>
          <p className="photo-uploader__hint">Click or drag a photo here</p>
          <p className="photo-uploader__types">JPEG · PNG · WEBP</p>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleChange}
        style={{ display: 'none' }}
        aria-label="Upload photo"
      />
    </div>
  );
}
