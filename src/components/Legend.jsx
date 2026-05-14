import { LEGEND_GRADIENT } from '../utils/colorUtils';

export default function Legend({ maxCount, activeTab }) {
  const displayMax = Math.max(maxCount, 4);

  const gradientStops = LEGEND_GRADIENT.map(
    (color, i) => `${color} ${Math.round((i / (LEGEND_GRADIENT.length - 1)) * 100)}%`
  ).join(', ');

  const labels = [0, Math.round(displayMax * 0.25), Math.round(displayMax * 0.5),
    Math.round(displayMax * 0.75), displayMax];

  return (
    <div style={{ padding: '10px 16px 12px', borderTop: '1px solid #eaeaea', background: '#fff' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: '#aaa', whiteSpace: 'nowrap' }}>
          {activeTab === 'city' ? 'Educators / City' : 'Educators / State'}
        </span>
        <div style={{ flex: 1 }}>
          <div style={{ height: 8, borderRadius: 999, background: `linear-gradient(to right, ${gradientStops})` }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
            {labels.map((n, i) => (
              <span key={i} style={{ fontSize: 9, color: '#bbb' }}>
                {i === labels.length - 1 ? `${n}+` : n}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
