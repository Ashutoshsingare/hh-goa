import { useMemo } from 'react';

interface BarcodeProps {
  value: string;
  vertical?: boolean;
  color?: string;
  bgColor?: string;
  className?: string;
}

export default function Barcode({ value, vertical = false, color = '#1a1a1a', bgColor = 'transparent', className = '' }: BarcodeProps) {
  const bars = useMemo(() => {
    // Generate deterministic bar pattern from string
    const result: { width: number; isBar: boolean }[] = [];
    const seed = value.split('').reduce((acc, c, i) => acc + c.charCodeAt(0) * (i + 1), 0);
    let state = seed;
    for (let i = 0; i < 48; i++) {
      state = (state * 1664525 + 1013904223) & 0xffffffff;
      const w = (Math.abs(state) % 3) + 1;
      result.push({ width: w, isBar: i % 2 === 0 });
    }
    // Always start and end with wide guard bars
    result[0] = { width: 3, isBar: true };
    result[result.length - 1] = { width: 3, isBar: true };
    return result;
  }, [value]);

  const totalUnits = bars.reduce((s, b) => s + b.width, 0);
  void totalUnits;

  if (vertical) {
    return (
      <div className={`barcode barcode--vertical ${className}`} style={{ display: 'flex', flexDirection: 'column', gap: 0, background: bgColor }}>
        {bars.map((b, i) =>
          b.isBar ? (
            <div key={i} style={{ height: b.width * 3 + 'px', background: color, width: '100%' }} />
          ) : (
            <div key={i} style={{ height: b.width * 2 + 'px', background: bgColor, width: '100%' }} />
          )
        )}
      </div>
    );
  }

  return (
    <div className={`barcode ${className}`} style={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch', height: '100%', background: bgColor }}>
      {bars.map((b, i) =>
        b.isBar ? (
          <div key={i} style={{ width: b.width * 2 + 'px', background: color, flexShrink: 0 }} />
        ) : (
          <div key={i} style={{ width: b.width + 'px', background: bgColor, flexShrink: 0 }} />
        )
      )}
    </div>
  );
}
