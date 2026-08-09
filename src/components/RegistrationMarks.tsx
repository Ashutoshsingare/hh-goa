import React from 'react';

export default function RegistrationMarks({ color = 'rgba(245,236,215,0.4)', size = 12 }: { color?: string; size?: number }) {
  const Mark = ({ style }: { style: React.CSSProperties }) => (
    <svg
      width={size * 2}
      height={size * 2}
      style={{ position: 'absolute', ...style }}
      viewBox={`0 0 ${size * 2} ${size * 2}`}
    >
      <line x1={0} y1={size} x2={size * 2} y2={size} stroke={color} strokeWidth="0.75" />
      <line x1={size} y1={0} x2={size} y2={size * 2} stroke={color} strokeWidth="0.75" />
      <circle cx={size} cy={size} r={size * 0.4} fill="none" stroke={color} strokeWidth="0.75" />
    </svg>
  );

  return (
    <>
      <Mark style={{ top: 6, left: 6 }} />
      <Mark style={{ top: 6, right: 6 }} />
      <Mark style={{ bottom: 6, left: 6 }} />
      <Mark style={{ bottom: 6, right: 6 }} />
    </>
  );
}
