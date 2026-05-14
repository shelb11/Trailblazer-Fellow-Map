import { useState, useEffect, useCallback, useMemo } from 'react';
import USMap from './components/USMap';
import CityBubbleMap from './components/CityBubbleMap';
import SidePanel from './components/SidePanel';
import Legend from './components/Legend';
import LoginGate from './components/LoginGate';

const PROGRAM_META = [
  { key: 'Trailblazers',          label: 'Trailblazers',          color: '#F5501C' },
  { key: 'Spark the Future',      label: 'Spark the Future',      color: '#0ea5e9' },
  { key: 'Teaching for Tomorrow', label: 'Teaching for Tomorrow', color: '#15803d' },
];

export default function App() {
  // ── Data ─────────────────────────────────────────────────────────────────
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTeachers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/teachers');
      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      const data = await res.json();
      setTeachers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchTeachers(); }, [fetchTeachers]);

  // ── Tab + selection ───────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState('city');
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [drilledState, setDrilledState] = useState(null);

  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
    setSelectedState(null);
    setSelectedCity(null);
    setDrilledState(null);
  }, []);

  const handleDrillDown = useCallback((abbr) => {
    setDrilledState(abbr);
    setSelectedCity(null);
  }, []);

  const handleBackToNational = useCallback(() => {
    setDrilledState(null);
    setSelectedState(null);
    setSelectedCity(null);
  }, []);

  const handleDrilledCityClick = useCallback((cityKey) => {
    setSelectedCity(cityKey);
  }, []);

  // ── Filters ───────────────────────────────────────────────────────────────
  const [programFilter, setProgramFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [startDateFrom, setStartDateFrom] = useState(null);
  const [startDateTo, setStartDateTo] = useState(null);

  // ── Derived data ──────────────────────────────────────────────────────────
  const filteredTeachers = useMemo(() => {
    let result = teachers;
    if (programFilter !== 'All') result = result.filter(t => t.programs?.includes(programFilter));
    if (statusFilter === 'Active')  result = result.filter(t => t.completionStatus === 'In Progress');
    if (statusFilter === 'Alumni')  result = result.filter(t => t.completionStatus === 'Complete');
    if (startDateFrom) result = result.filter(t => t.startDate && t.startDate >= startDateFrom);
    if (startDateTo)   result = result.filter(t => t.startDate && t.startDate <= startDateTo);
    return result;
  }, [teachers, programFilter, statusFilter, startDateFrom, startDateTo]);

  const programCounts = useMemo(() => {
    const counts = {};
    for (const t of teachers) {
      for (const p of (t.programs || [])) counts[p] = (counts[p] || 0) + 1;
    }
    return counts;
  }, [teachers]);

  const totalStates  = useMemo(() => new Set(filteredTeachers.map(t => t.state).filter(Boolean)).size, [filteredTeachers]);
  const totalSchools = useMemo(() => new Set(filteredTeachers.map(t => t.school).filter(Boolean)).size, [filteredTeachers]);

  const teachersByState = useMemo(() =>
    filteredTeachers.reduce((acc, t) => {
      if (!acc[t.state]) acc[t.state] = [];
      acc[t.state].push(t);
      return acc;
    }, {}), [filteredTeachers]);

  const maxCount = Math.max(0, ...Object.values(teachersByState).map(a => a.length));

  const teachersByCity = useMemo(() =>
    filteredTeachers.reduce((acc, t) => {
      if (!t.city || !t.state) return acc;
      const key = `${t.city}, ${t.state}`;
      if (!acc[key]) acc[key] = [];
      acc[key].push(t);
      return acc;
    }, {}), [filteredTeachers]);

  const maxCityCount = useMemo(() =>
    Math.max(0, ...Object.values(teachersByCity).map(a => a.length)), [teachersByCity]);

  // ── Keyboard ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      if (e.key !== 'Escape') return;
      if (drilledState) handleBackToNational();
      else { setSelectedState(null); setSelectedCity(null); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [drilledState, handleBackToNational]);

  // ── Side panel helpers ────────────────────────────────────────────────────
  const parsedCity = selectedCity ? (() => {
    const parts = selectedCity.split(', ');
    return { stateAbbr: parts[parts.length - 1], city: parts.slice(0, -1).join(', ') };
  })() : null;

  const showDrilledCityPanel  = activeTab === 'state' && drilledState && selectedCity && parsedCity;
  const showDrilledStatePanel = activeTab === 'state' && selectedState && !selectedCity;
  const legendMax = activeTab === 'city' ? maxCityCount : maxCount;
  const hasDateFilter = startDateFrom || startDateTo;

  // ── Sidebar shared styles ─────────────────────────────────────────────────
  const sectionLabel = { color: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', marginBottom: 10, display: 'block' };
  const divider = { height: 1, background: 'rgba(255,255,255,0.07)', margin: '20px 0' };

  return (
    <LoginGate>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>

        {/* ── Header ── */}
        <header style={{
          background: '#111128', borderBottom: '1px solid rgba(255,255,255,0.06)',
          flexShrink: 0, padding: '0 20px', height: 50,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 26, height: 26, borderRadius: 6,
              background: 'linear-gradient(135deg,#F5501C,#F5A623)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13,
            }}>🔥</div>
            <span style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>aiEDU</span>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13, marginLeft: 2 }}>Participant Map</span>
          </div>
          <button
            onClick={fetchTeachers}
            disabled={loading}
            style={{
              background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.6)', borderRadius: 6, padding: '5px 12px',
              fontSize: 12, fontWeight: 600, cursor: loading ? 'wait' : 'pointer',
              opacity: loading ? 0.5 : 1, fontFamily: 'inherit',
            }}
          >
            {loading && teachers.length > 0 ? '↻ Refreshing…' : '↻ Refresh'}
          </button>
        </header>

        {/* ── Body ── */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

          {/* ── Sidebar ── */}
          <aside style={{
            width: 232, background: '#16162e', flexShrink: 0,
            borderRight: '1px solid rgba(255,255,255,0.06)',
            display: 'flex', flexDirection: 'column',
            padding: '24px 16px', overflowY: 'auto',
          }}>

            {/* Stats */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginBottom: 24 }}>
              {[
                { label: statusFilter === 'Active' ? 'Active' : statusFilter === 'Alumni' ? 'Alumni' : 'Participants', value: filteredTeachers.length },
                { label: 'States',  value: totalStates },
                { label: 'Schools', value: totalSchools },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div style={{ color: '#fff', fontSize: 30, fontWeight: 800, lineHeight: 1, letterSpacing: '-0.02em' }}>
                    {value}
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11, fontWeight: 600, marginTop: 3 }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>

            <div style={divider} />

            {/* Status filter */}
            <div>
              <span style={sectionLabel}>STATUS</span>
              <div style={{ display: 'flex', gap: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 8, padding: 3 }}>
                {[
                  { key: 'All',    label: 'All' },
                  { key: 'Active', label: 'Active' },
                  { key: 'Alumni', label: 'Alumni' },
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setStatusFilter(key)}
                    style={{
                      flex: 1, padding: '7px 0', fontSize: 11, fontWeight: 700,
                      borderRadius: 6, border: 'none', fontFamily: 'inherit',
                      background: statusFilter === key ? '#F5501C' : 'transparent',
                      color: statusFilter === key ? '#fff' : 'rgba(255,255,255,0.35)',
                      cursor: statusFilter === key ? 'default' : 'pointer',
                      transition: 'all 0.15s',
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div style={divider} />

            {/* Program filter */}
            <div>
              <span style={sectionLabel}>PROGRAM</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {[{ key: 'All', label: 'All Programs', color: null }, ...PROGRAM_META].map(({ key, label, color }) => {
                  const isActive = programFilter === key;
                  const count = key !== 'All' ? (programCounts[key] ?? 0) : null;
                  return (
                    <button
                      key={key}
                      onClick={() => setProgramFilter(key)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 9,
                        padding: '8px 10px', borderRadius: 7, border: 'none',
                        background: isActive ? 'rgba(255,255,255,0.09)' : 'transparent',
                        cursor: 'pointer', width: '100%', textAlign: 'left',
                        transition: 'background 0.12s',
                        fontFamily: 'inherit',
                      }}
                    >
                      <span style={{
                        width: 7, height: 7, borderRadius: '50%', flexShrink: 0,
                        background: isActive && color ? color : isActive ? '#fff' : 'rgba(255,255,255,0.18)',
                        transition: 'background 0.12s',
                      }} />
                      <span style={{
                        flex: 1, fontSize: 12, fontWeight: isActive ? 700 : 500,
                        color: isActive ? '#fff' : 'rgba(255,255,255,0.45)',
                        transition: 'color 0.12s',
                      }}>{label}</span>
                      {count != null && (
                        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', fontWeight: 500 }}>{count}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={divider} />

            {/* Cohort date range */}
            <div>
              <span style={sectionLabel}>COHORT START</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[
                  { val: startDateFrom, set: setStartDateFrom, placeholder: 'From' },
                  { val: startDateTo,   set: setStartDateTo,   placeholder: 'To' },
                ].map(({ val, set, placeholder }) => (
                  <input
                    key={placeholder}
                    type="date"
                    value={val || ''}
                    onChange={e => set(e.target.value || null)}
                    style={{
                      background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 6, padding: '7px 9px', fontSize: 12,
                      color: val ? '#fff' : 'rgba(255,255,255,0.25)',
                      width: '100%', outline: 'none', colorScheme: 'dark', fontFamily: 'inherit',
                    }}
                  />
                ))}
                {hasDateFilter && (
                  <button
                    onClick={() => { setStartDateFrom(null); setStartDateTo(null); }}
                    style={{
                      fontSize: 11, color: '#F5501C', background: 'transparent',
                      border: 'none', cursor: 'pointer', textAlign: 'left',
                      padding: '2px 2px', fontFamily: 'inherit', fontWeight: 600,
                    }}
                  >
                    ✕ Clear dates
                  </button>
                )}
              </div>
            </div>

            <div style={divider} />

            {/* View toggle */}
            <div>
              <span style={sectionLabel}>VIEW</span>
              <div style={{ display: 'flex', gap: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 8, padding: 3 }}>
                {[{ key: 'city', label: 'By City' }, { key: 'state', label: 'By State' }].map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => handleTabChange(key)}
                    style={{
                      flex: 1, padding: '7px 0', fontSize: 11, fontWeight: 700,
                      borderRadius: 6, border: 'none', fontFamily: 'inherit',
                      background: activeTab === key ? '#F5501C' : 'transparent',
                      color: activeTab === key ? '#fff' : 'rgba(255,255,255,0.35)',
                      cursor: activeTab === key ? 'default' : 'pointer',
                      transition: 'all 0.15s',
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

          </aside>

          {/* ── Map area ── */}
          <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#f4f4f8', position: 'relative' }}>

              {/* Loading */}
              {loading && teachers.length === 0 && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 36, marginBottom: 10 }} className="animate-pulse">🔥</div>
                    <p style={{ fontSize: 13, fontWeight: 700, color: '#888' }}>Loading educators…</p>
                  </div>
                </div>
              )}

              {/* Error */}
              {error && teachers.length === 0 && !loading && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                  <div style={{ textAlign: 'center', padding: '0 24px' }}>
                    <div style={{ fontSize: 32, marginBottom: 10 }}>⚠️</div>
                    <p style={{ fontSize: 14, fontWeight: 700, color: '#222244', marginBottom: 4 }}>Unable to load data</p>
                    <p style={{ fontSize: 12, color: '#888', marginBottom: 16 }}>{error}</p>
                    <button className="btn-primary text-sm" onClick={fetchTeachers}>Try Again</button>
                  </div>
                </div>
              )}

              {/* Map */}
              {teachers.length > 0 && (
                <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
                  {activeTab === 'state' ? (
                    <USMap
                      teachersByState={teachersByState}
                      maxCount={maxCount}
                      selectedState={selectedState}
                      onStateClick={setSelectedState}
                      teachersByCity={teachersByCity}
                      maxCityCount={maxCityCount}
                      onCityClick={handleDrilledCityClick}
                      selectedCity={selectedCity}
                      drilledState={drilledState}
                      onDrillDown={handleDrillDown}
                      onBackToNational={handleBackToNational}
                    />
                  ) : (
                    <CityBubbleMap
                      teachersByCity={teachersByCity}
                      maxCityCount={maxCityCount}
                      selectedCity={selectedCity}
                      onCityClick={setSelectedCity}
                    />
                  )}
                </div>
              )}

              {/* Legend */}
              {teachers.length > 0 && <Legend maxCount={legendMax} activeTab={activeTab} />}
            </div>

            {/* Side panel */}
            {showDrilledCityPanel && (
              <SidePanel
                key={selectedCity}
                stateAbbr={parsedCity.stateAbbr}
                cityName={parsedCity.city}
                teachers={teachersByCity[selectedCity] || []}
                onClose={() => setSelectedCity(null)}
              />
            )}
            {showDrilledStatePanel && (
              <SidePanel
                key={selectedState}
                stateAbbr={selectedState}
                teachers={teachersByState[selectedState] || []}
                onClose={() => { if (drilledState) handleBackToNational(); else setSelectedState(null); }}
              />
            )}
            {activeTab === 'city' && selectedCity && parsedCity && (
              <SidePanel
                key={`city-${selectedCity}`}
                stateAbbr={parsedCity.stateAbbr}
                cityName={parsedCity.city}
                teachers={teachersByCity[selectedCity] || []}
                onClose={() => setSelectedCity(null)}
              />
            )}
          </div>
        </div>
      </div>
    </LoginGate>
  );
}
