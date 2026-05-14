export default function FilterBar({
  programFilter, onProgramFilterChange, programCounts,
  startDateFrom, startDateTo, onStartDateFromChange, onStartDateToChange,
}) {
  const programFilters = [
    { key: 'All', label: 'All Programs' },
    { key: 'Trailblazers', label: 'Trailblazers' },
    { key: 'Spark the Future', label: 'Spark the Future' },
    { key: 'Teaching for Tomorrow', label: 'Teaching for Tomorrow' },
  ];

  const hasDateFilter = startDateFrom || startDateTo;

  return (
    <div className="flex items-center gap-4 px-4 pt-3 pb-2 flex-wrap" style={{ background: '#ffffff' }}>
      {/* Program filter */}
      <div className="flex items-center gap-1.5">
        {programFilters.map(({ key, label }) => {
          const isActive = programFilter === key;
          const count = key === 'All' ? null : (programCounts?.[key] ?? 0);
          return (
            <button
              key={key}
              onClick={() => onProgramFilterChange(key)}
              className="text-xs font-bold px-3.5 py-1.5 rounded-full transition-colors"
              style={{
                color: isActive ? '#ffffff' : '#888',
                background: isActive ? '#222244' : '#f3f3f6',
                border: isActive ? '1px solid #222244' : '1px solid #e0e0e0',
                cursor: isActive ? 'default' : 'pointer',
              }}
            >
              {label}{count != null ? ` (${count})` : ''}
            </button>
          );
        })}
      </div>

      {/* Divider */}
      <div style={{ width: 1, height: 20, background: '#e0e0e0' }} />

      {/* Date range filter */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold" style={{ color: '#888' }}>Cohort start:</span>
        <input
          type="date"
          value={startDateFrom || ''}
          onChange={e => onStartDateFromChange(e.target.value || null)}
          className="text-xs px-2 py-1 rounded"
          style={{
            border: '1px solid #e0e0e0',
            color: startDateFrom ? '#222244' : '#aaa',
            background: '#f3f3f6',
            outline: 'none',
          }}
        />
        <span className="text-xs" style={{ color: '#aaa' }}>–</span>
        <input
          type="date"
          value={startDateTo || ''}
          onChange={e => onStartDateToChange(e.target.value || null)}
          className="text-xs px-2 py-1 rounded"
          style={{
            border: '1px solid #e0e0e0',
            color: startDateTo ? '#222244' : '#aaa',
            background: '#f3f3f6',
            outline: 'none',
          }}
        />
        {hasDateFilter && (
          <button
            onClick={() => { onStartDateFromChange(null); onStartDateToChange(null); }}
            className="text-xs px-2 py-1 rounded-full"
            style={{ color: '#F5501C', background: '#fff0ec', border: '1px solid #F5501C', cursor: 'pointer' }}
          >
            ✕ Clear
          </button>
        )}
      </div>
    </div>
  );
}
