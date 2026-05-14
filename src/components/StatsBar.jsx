const PROGRAM_COLORS = {
  Trailblazers: '#F5501C',
  'Spark the Future': '#0ea5e9',
  'Teaching for Tomorrow': '#15803d',
};

export default function StatsBar({ totalTeachers, totalStates, totalSchools, activeCount, alumniCount, programCounts }) {
  return (
    <div className="px-4 pb-3 flex gap-3 flex-wrap">
      {/* Educators — primary card with Active / Alumni sub-stats */}
      <div className="stat-card flex-[2] min-w-[220px]">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
          style={{
            background: '#F5501C15',
            border: '1px solid #F5501C35',
          }}
        >
          🎓
        </div>
        <div>
          <p
            className="text-2xl font-bold leading-none"
            style={{ color: '#F5501C' }}
          >
            {totalTeachers}
          </p>
          <p className="text-xs mt-0.5 font-bold" style={{ color: '#666' }}>
            Educators
          </p>
        </div>
      </div>

      {/* States Represented */}
      <div className="stat-card flex-1 min-w-[160px]">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
          style={{
            background: '#F5501C15',
            border: '1px solid #F5501C35',
          }}
        >
          🗺️
        </div>
        <div>
          <p
            className="text-2xl font-bold leading-none"
            style={{ color: '#F5501C' }}
          >
            {totalStates}
          </p>
          <p className="text-xs mt-0.5 font-bold" style={{ color: '#666' }}>
            States Represented
          </p>
        </div>
      </div>

    </div>
  );
}
