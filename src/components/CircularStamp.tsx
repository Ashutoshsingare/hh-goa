export default function CircularStamp({ size = 90, color = '#F5ECD7', className = '' }: { size?: number; color?: string; className?: string }) {
  const r = size / 2;
  const trackR = r - 12;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={`circular-stamp ${className}`}>
      <defs>
        <path
          id="cs-path"
          d={`M ${r},${r} m -${trackR},0 a ${trackR},${trackR} 0 1,1 ${trackR * 2},0 a ${trackR},${trackR} 0 1,1 -${trackR * 2},0`}
        />
      </defs>
      {/* Outer ring */}
      <circle cx={r} cy={r} r={r - 2} fill="none" stroke={color} strokeWidth="1.5" />
      {/* Inner ring */}
      <circle cx={r} cy={r} r={r - 8} fill="none" stroke={color} strokeWidth="0.5" />
      {/* Centre HH monogram */}
      <text x={r} y={r + 5} textAnchor="middle" fill={color} fontSize="12" fontWeight="700" fontFamily="'Barlow Condensed', sans-serif" letterSpacing="1">HH</text>
      <text x={r} y={r - 3} textAnchor="middle" fill={color} fontSize="6" fontFamily="'Barlow Condensed', sans-serif" letterSpacing="1">◆</text>
      {/* Circular text */}
      <text fontSize="6" fill={color} fontFamily="'Barlow Condensed', sans-serif" letterSpacing="2.5" fontWeight="600">
        <textPath href="#cs-path" startOffset="0%">HACKER HOUSE ◆ GOA 2026 ◆</textPath>
      </text>
    </svg>
  );
}
