const PROGRAM_BADGE_STYLES = {
  Trailblazers: { bg: '#FFF1ED', color: '#F5501C', border: '#F5501C30' },
  'Spark the Future': { bg: '#EFF6FF', color: '#0ea5e9', border: '#0ea5e930' },
  'Teaching for Tomorrow': { bg: '#ECFDF5', color: '#15803d', border: '#15803d30' },
};

export default function TeacherCard({ teacher }) {
  const initials = teacher.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  // Brand-palette avatar gradients using Aqua, Mandarin, and complementary tones
  const avatarColors = [
    ['#007a77', '#00D9D3'],  // aqua family
    ['#0ea5e9', '#00D9D3'],  // sky → aqua
    ['#6d28d9', '#a78bfa'],  // purple
    ['#0f766e', '#00D9D3'],  // teal → aqua
    ['#b45309', '#F5A623'],  // amber
    ['#F5501C', '#F5A623'],  // mandarin → amber
    ['#15803d', '#4ade80'],  // green
    ['#c2410c', '#F5501C'],  // red → mandarin
  ];

  // Derive a stable numeric index from the ID (works with both string "recXXX" and numbers)
  const idStr = String(teacher.id);
  const colorIndex = idStr.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const colorPair = avatarColors[colorIndex % avatarColors.length];

  const programs = teacher.programs || [];

  return (
    <div className="teacher-card group">
      <div className="flex items-start gap-3">
        {/* Avatar — headshot photo or initials fallback */}
        {teacher.headshot ? (
          <img
            src={teacher.headshot}
            alt={teacher.name}
            className="w-14 h-16 flex-shrink-0 object-cover"
            style={{ borderRadius: '8px' }}
          />
        ) : (
          <div
            className="w-11 h-11 flex items-center justify-center text-sm font-bold flex-shrink-0 select-none"
            style={{
              background: `linear-gradient(135deg, ${colorPair[0]}, ${colorPair[1]})`,
              color: '#fff',
              borderRadius: '8px',
            }}
          >
            {initials}
          </div>
        )}

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold leading-snug truncate" style={{ color: '#222244' }}>
            {teacher.name}
          </h3>

          {/* Program badges */}
          {programs.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1">
              {programs.map((p) => {
                const style = PROGRAM_BADGE_STYLES[p] || { bg: '#f3f3f6', color: '#666', border: '#e0e0e0' };
                return (
                  <span
                    key={p}
                    className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                    style={{
                      background: style.bg,
                      color: style.color,
                      border: `1px solid ${style.border}`,
                    }}
                  >
                    {p}
                  </span>
                );
              })}
            </div>
          )}

          <div className="mt-2 space-y-1">
            <div className="flex items-center gap-1.5 text-xs" style={{ color: '#666' }}>
              <span className="text-[13px]">🏫</span>
              <span className="truncate">{teacher.school}</span>
            </div>
            {(teacher.city || teacher.state) && (
              <div className="flex items-center gap-1.5 text-xs" style={{ color: '#666' }}>
                <span className="text-[13px]">📍</span>
                <span>
                  {teacher.city ? `${teacher.city}, ${teacher.state}` : teacher.state}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
