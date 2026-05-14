import { useEffect, useRef, useState } from 'react';

export default function Tooltip({ visible, x, y, data }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ left: 0, top: 0 });

  useEffect(() => {
    if (!visible || !ref.current) return;
    const el = ref.current;
    const w = el.offsetWidth;
    const h = el.offsetHeight;

    let left = x + 18;
    let top = y - h / 2;

    // Clamp to viewport
    if (left + w > window.innerWidth - 12) left = x - w - 18;
    if (left < 12) left = 12;
    if (top < 12) top = 12;
    if (top + h > window.innerHeight - 12) top = window.innerHeight - h - 12;

    setPos({ left, top });
  }, [x, y, visible]);

  if (!visible || !data) return null;

  const { stateName, stateAbbr, teachers, cityName } = data;
  const previewCount = cityName ? 4 : 3;
  const preview = teachers.slice(0, previewCount);
  const extra = teachers.length - previewCount;
  const displayName = cityName || stateName;

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        left: pos.left,
        top: pos.top,
        zIndex: 9999,
        pointerEvents: 'none',
        transition: 'left 0.05s ease, top 0.05s ease',
      }}
      className="tooltip-box"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2 gap-3">
        <span className="text-sm font-bold leading-tight" style={{ color: '#222244' }}>{displayName}</span>
        <span
          className="text-[10px] font-bold px-1.5 py-0.5 tracking-wide"
          style={{ background: '#F5501C', color: '#fff', borderRadius: '3px' }}
        >
          {stateAbbr}
        </span>
      </div>

      {/* Count */}
      <p className="text-xs mb-2" style={{ color: '#666' }}>
        {teachers.length === 0
          ? 'No educators yet'
          : `${teachers.length} Educator${teachers.length !== 1 ? 's' : ''}`}
      </p>

      {/* Preview list (state tooltips only — city tooltips show count only) */}
      {!cityName && preview.length > 0 && (
        <ul className="space-y-1 mb-2">
          {preview.map((t) => (
            <li key={t.id} className="flex items-center gap-1.5 text-xs" style={{ color: '#222244' }}>
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: '#F5501C' }}
              />
              {t.name}
            </li>
          ))}
          {extra > 0 && (
            <li className="text-[11px] pl-3" style={{ color: '#999' }}>
              +{extra} more
            </li>
          )}
        </ul>
      )}

    </div>
  );
}
