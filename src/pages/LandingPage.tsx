import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type ColorTheme = 'yellow' | 'cream' | 'white' | 'pink';

export default function LandingPage() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState<ColorTheme>('yellow');

  return (
    <div className="landing">
      {/* Top strip */}
      <div className="landing__topstrip">
        <span>HACKER HOUSE GOA — INDIA</span>
        <span>BUILD · BREAK · BUILD BETTER</span>
        <span className="landing__topstrip-tag">#HHG26 &nbsp; #FRAMEINGOA</span>
      </div>

      {/* Hero grid */}
      <div className="landing__hero">
        {/* Left sidebar */}
        <aside className="landing__sidebar">
          <div className="landing__sidebar-dot" />
          <span className="landing__sidebar-text">BUILD NOW. THE NEXT THING.</span>
          <div className="landing__sidebar-dot" />
        </aside>

        {/* Main content */}
        <div className="landing__content">
          <div className="landing__header-row">
            <p className="landing__hashtag">#FRAMEINGOA</p>

            {/* Theme switcher */}
            <div className="landing__theme-picker">
              <span className="landing__theme-label">THEME:</span>
              <button
                type="button"
                className={`theme-dot theme-dot--yellow ${theme === 'yellow' ? 'active' : ''}`}
                onClick={() => setTheme('yellow')}
                title="Vibrant Yellow Theme"
              />
              <button
                type="button"
                className={`theme-dot theme-dot--cream ${theme === 'cream' ? 'active' : ''}`}
                onClick={() => setTheme('cream')}
                title="Warm Cream Theme"
              />
              <button
                type="button"
                className={`theme-dot theme-dot--white ${theme === 'white' ? 'active' : ''}`}
                onClick={() => setTheme('white')}
                title="Pure White Theme"
              />
              <button
                type="button"
                className={`theme-dot theme-dot--pink ${theme === 'pink' ? 'active' : ''}`}
                onClick={() => setTheme('pink')}
                title="Hot Pink Accent Theme"
              />
            </div>
          </div>

          {/* Wordmark with dynamic theme class */}
          <div className={`landing__wordmark-wrap landing__wordmark-wrap--${theme}`}>
            <img
              src="/assets/asset 12.svg"
              alt="HACKER HOUSE GOA"
              className="landing__wordmark"
            />
          </div>

          {/* Meta info */}
          <div className="landing__meta">
            <span>GOA, INDIA</span>
            <span className="landing__meta-sep">·</span>
            <span className="landing__meta-date">28 — 31 OCT 2026</span>
            <span className="landing__meta-sep">·</span>
            <span>2:47 PM STUDIO</span>
          </div>

          {/* CTA */}
          <div className="landing__cta">
            <button
              id="create-credential-btn"
              className="btn btn--primary btn--large"
              onClick={() => navigate('/create')}
            >
              Create Your Builder ID →
            </button>
            <span style={{ fontSize: '0.7rem', color: 'rgba(245,236,215,0.35)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>
              EXCLUSIVE ACCESS BUILDER ID
            </span>
          </div>
        </div>
      </div>

      {/* Bottom illustration */}
      <div className="landing__illustration">
        <img src="/assets/asset 0.png" alt="Goa Beach" />
      </div>

      {/* Bottom meta strip */}
      <div className="landing__footstrip">
        <span>4 DAYS. ONE RHYTHM. EVERYTHING INTENTIONAL.</span>
        <span>15.2993° N, 74.1240° E</span>
        <span>LESS NOISE. MORE SIGNAL. REAL IMPACT.</span>
      </div>
    </div>
  );
}
