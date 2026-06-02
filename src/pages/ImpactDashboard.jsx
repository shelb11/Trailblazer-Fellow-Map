import { useState, useEffect, useMemo } from 'react';

const STATE_ABBR_TO_NAME = {
  AL:'Alabama',AK:'Alaska',AZ:'Arizona',AR:'Arkansas',CA:'California',
  CO:'Colorado',CT:'Connecticut',DE:'Delaware',FL:'Florida',GA:'Georgia',
  HI:'Hawaii',ID:'Idaho',IL:'Illinois',IN:'Indiana',IA:'Iowa',KS:'Kansas',
  KY:'Kentucky',LA:'Louisiana',ME:'Maine',MD:'Maryland',MA:'Massachusetts',
  MI:'Michigan',MN:'Minnesota',MS:'Mississippi',MO:'Missouri',MT:'Montana',
  NE:'Nebraska',NV:'Nevada',NH:'New Hampshire',NJ:'New Jersey',
  NM:'New Mexico',NY:'New York',NC:'North Carolina',ND:'North Dakota',
  OH:'Ohio',OK:'Oklahoma',OR:'Oregon',PA:'Pennsylvania',RI:'Rhode Island',
  SC:'South Carolina',SD:'South Dakota',TN:'Tennessee',TX:'Texas',
  UT:'Utah',VT:'Vermont',VA:'Virginia',WA:'Washington',WV:'West Virginia',
  WI:'Wisconsin',WY:'Wyoming',DC:'District of Columbia',PR:'Puerto Rico',
};

const FOCUS_STATES = ['CA','DC','HI','MD','VA'];
const ALL_STATES = Object.keys(STATE_ABBR_TO_NAME).sort();

function inRange(dateStr, from, to) {
  if (!dateStr) return false;
  const d = new Date(dateStr);
  if (from && d < from) return false;
  if (to   && d > to)   return false;
  return true;
}

function pct(n, d) {
  if (!d) return 0;
  return Math.round((n / d) * 100);
}

function fmt(n) { return (n || 0).toLocaleString(); }

// ── KPI Card ──────────────────────────────────────────────────────────────────
function KpiCard({ label, value, sub, accent }) {
  return (
    <div style={{
      background: '#1a1a38',
      border: `1px solid ${accent ? '#F5501C' : 'rgba(255,255,255,0.08)'}`,
      borderTop: accent ? '3px solid #F5501C' : '1px solid rgba(255,255,255,0.08)',
      borderRadius: 10,
      padding: '18px 20px',
    }}>
      <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>
        {label}
      </div>
      <div style={{ fontSize: 36, fontWeight: 800, color: '#fff', lineHeight: 1, letterSpacing: '-0.02em' }}>
        {value}
      </div>
      {sub && <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 6 }}>{sub}</div>}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function ImpactDashboard() {
  const [rawData, setRawData]       = useState(null);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);
  const [dateFrom, setDateFrom]     = useState('2025-04-01');
  const [dateTo, setDateTo]         = useState(new Date().toISOString().split('T')[0]);
  const [stateFilter, setStateFilter] = useState('');
  const [tableView, setTableView]   = useState('all'); // 'all' | 'focus'
  const [sortCol, setSortCol]       = useState('total');
  const [sortDir, setSortDir]       = useState('desc');
  const [copied, setCopied]         = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/impact');
      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      setRawData(await res.json());
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const range = useMemo(() => ({
    from: dateFrom ? new Date(dateFrom + 'T00:00:00') : null,
    to:   dateTo   ? new Date(dateTo   + 'T23:59:59') : null,
  }), [dateFrom, dateTo]);

  // ── Filtered counts ───────────────────────────────────────────────────────
  const kpis = useMemo(() => {
    if (!rawData) return {};

    const stateMatch = (abbr) => !stateFilter || abbr === stateFilter;

    const tbComplete = rawData.trailblazers.filter(r =>
      inRange(r.createdTime, range.from, range.to) &&
      r.completionStatus === 'Complete' &&
      stateMatch(r.state)
    ).length;

    const tbEnrolled = rawData.trailblazers.filter(r =>
      inRange(r.createdTime, range.from, range.to) && stateMatch(r.state)
    ).length;

    const stfComplete = rawData.stf.filter(r =>
      inRange(r.createdTime, range.from, range.to) && r.completionStatus === 'Complete'
    ).length;

    const tftComplete = rawData.tft.filter(r =>
      inRange(r.createdTime, range.from, range.to) && r.completionStatus === 'Complete'
    ).length;

    const plcComplete = rawData.plc.filter(r =>
      inRange(r.createdTime, range.from, range.to) && r.completionStatus === 'Complete'
    ).length;

    const webFiltered = rawData.webinars.filter(r =>
      inRange(r.createdTime, range.from, range.to) && stateMatch(r.state)
    );
    const webAttended = webFiltered.filter(r => r.attended).length;
    const web50pct    = webFiltered.filter(r => r.attended && r.duration >= 1800).length;

    const dlFiltered = rawData.downloads.filter(r =>
      inRange(r.createdTime, range.from, range.to) && stateMatch(r.state)
    ).length;

    return {
      tbComplete, tbEnrolled, stfComplete, tftComplete, plcComplete,
      totalTrained: tbComplete + stfComplete + tftComplete + plcComplete,
      webTotal: webFiltered.length, webAttended, web50pct,
      dlFiltered,
    };
  }, [rawData, range, stateFilter]);

  // ── State breakdown table ─────────────────────────────────────────────────
  const stateRows = useMemo(() => {
    if (!rawData) return [];

    const map = {};
    const inc = (abbr, field) => {
      if (!abbr) abbr = '??';
      if (!map[abbr]) map[abbr] = { tb: 0, webinars: 0, downloads: 0 };
      map[abbr][field]++;
    };

    rawData.trailblazers.forEach(r => {
      if (!inRange(r.createdTime, range.from, range.to)) return;
      if (r.completionStatus !== 'Complete') return;
      inc(r.state, 'tb');
    });
    rawData.webinars.forEach(r => {
      if (!inRange(r.createdTime, range.from, range.to)) return;
      inc(r.state, 'webinars');
    });
    rawData.downloads.forEach(r => {
      if (!inRange(r.createdTime, range.from, range.to)) return;
      inc(r.state, 'downloads');
    });

    const focusSet = new Set(FOCUS_STATES);
    let states = Object.keys(map).filter(s => s !== '??').sort();
    if (tableView === 'focus') states = states.filter(s => focusSet.has(s));
    if (stateFilter) states = states.filter(s => s === stateFilter);

    const rows = states.map(abbr => {
      const d = map[abbr] || {};
      return {
        abbr,
        name: STATE_ABBR_TO_NAME[abbr] || abbr,
        tb: d.tb || 0,
        webinars: d.webinars || 0,
        downloads: d.downloads || 0,
        total: (d.tb || 0) + (d.webinars || 0) + (d.downloads || 0),
      };
    });

    rows.sort((a, b) => {
      const dir = sortDir === 'asc' ? 1 : -1;
      if (sortCol === 'state') return dir * a.name.localeCompare(b.name);
      return dir * (a[sortCol] - b[sortCol]);
    });

    return rows;
  }, [rawData, range, tableView, stateFilter, sortCol, sortDir]);

  // ── Funder text ───────────────────────────────────────────────────────────
  const funderText = useMemo(() => {
    if (!kpis.totalTrained && kpis.totalTrained !== 0) return '';
    const fromStr = range.from?.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) || 'start';
    const toStr   = range.to?.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) || 'today';
    const scope   = stateFilter ? STATE_ABBR_TO_NAME[stateFilter] || stateFilter : 'nationally';

    return [
      `aiEDU Impact Data — ${fromStr} to ${toStr}${stateFilter ? ` (${scope})` : ''}`,
      ``,
      `EDUCATORS TRAINED (${scope}):`,
      `  Trailblazers: ${fmt(kpis.tbComplete)} completed (${fmt(kpis.tbEnrolled)} enrolled)`,
      `  Spark the Future: ${fmt(kpis.stfComplete)} completed`,
      `  Teaching for Tomorrow: ${fmt(kpis.tftComplete)} completed`,
      `  PLC: ${fmt(kpis.plcComplete)} completed`,
      `  Total trained: ${fmt(kpis.totalTrained)}`,
      ``,
      `WEBINARS:`,
      `  ${fmt(kpis.webTotal)} registered; ${fmt(kpis.webAttended)} attended (${pct(kpis.webAttended, kpis.webTotal)}% of registrants); ${fmt(kpis.web50pct)} attended ≥50% of the session (${pct(kpis.web50pct, kpis.webAttended)}% of attendees)`,
      ``,
      `CURRICULUM DOWNLOADS:`,
      `  ${fmt(kpis.dlFiltered)} download requests ${stateFilter ? `in ${scope}` : 'nationally'}`,
    ].join('\n');
  }, [kpis, range, stateFilter]);

  // ── Sort handler ─────────────────────────────────────────────────────────
  const handleSort = (col) => {
    if (sortCol === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortCol(col); setSortDir('desc'); }
  };

  const sortIcon = (col) => {
    if (sortCol !== col) return ' ↕';
    return sortDir === 'asc' ? ' ↑' : ' ↓';
  };

  // ── Shared styles ─────────────────────────────────────────────────────────
  const sectionLabel = { fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', display: 'block', marginBottom: 8 };
  const divider = { height: 1, background: 'rgba(255,255,255,0.07)', margin: '20px 0' };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden', background: '#111128' }}>

      {/* Controls sidebar + content */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

        {/* Sidebar */}
        <aside style={{
          width: 220, background: '#16162e', borderRight: '1px solid rgba(255,255,255,0.06)',
          flexShrink: 0, padding: '24px 16px', overflowY: 'auto', display: 'flex', flexDirection: 'column',
        }}>
          {/* KPI quick stats */}
          {!loading && rawData && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 8 }}>
              <div>
                <div style={{ color: '#fff', fontSize: 28, fontWeight: 800, lineHeight: 1 }}>{fmt(kpis.totalTrained)}</div>
                <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11, fontWeight: 600, marginTop: 3 }}>Trained</div>
              </div>
              <div>
                <div style={{ color: '#fff', fontSize: 28, fontWeight: 800, lineHeight: 1 }}>{fmt(kpis.webTotal)}</div>
                <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11, fontWeight: 600, marginTop: 3 }}>Webinar Registrants</div>
              </div>
              <div>
                <div style={{ color: '#fff', fontSize: 28, fontWeight: 800, lineHeight: 1 }}>{fmt(kpis.dlFiltered)}</div>
                <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11, fontWeight: 600, marginTop: 3 }}>Downloads</div>
              </div>
            </div>
          )}

          <div style={divider} />

          {/* Date range */}
          <div>
            <span style={sectionLabel}>Date Range</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                { val: dateFrom, set: setDateFrom, label: 'From' },
                { val: dateTo,   set: setDateTo,   label: 'To' },
              ].map(({ val, set, label }) => (
                <div key={label}>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginBottom: 3 }}>{label}</div>
                  <input
                    type="date"
                    value={val}
                    onChange={e => set(e.target.value)}
                    style={{
                      background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 6, padding: '6px 8px', fontSize: 12,
                      color: '#fff', width: '100%', outline: 'none',
                      colorScheme: 'dark', fontFamily: 'inherit',
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div style={divider} />

          {/* State filter */}
          <div>
            <span style={sectionLabel}>Filter by State</span>
            <select
              value={stateFilter}
              onChange={e => setStateFilter(e.target.value)}
              style={{
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 6, padding: '7px 8px', fontSize: 12,
                color: stateFilter ? '#fff' : 'rgba(255,255,255,0.35)',
                width: '100%', outline: 'none', fontFamily: 'inherit',
              }}
            >
              <option value="">All States</option>
              <optgroup label="Focus States">
                {FOCUS_STATES.map(abbr => (
                  <option key={abbr} value={abbr}>{STATE_ABBR_TO_NAME[abbr]} ({abbr})</option>
                ))}
              </optgroup>
              <optgroup label="All States">
                {ALL_STATES.filter(a => !FOCUS_STATES.includes(a)).map(abbr => (
                  <option key={abbr} value={abbr}>{STATE_ABBR_TO_NAME[abbr]} ({abbr})</option>
                ))}
              </optgroup>
            </select>
            {stateFilter && (
              <button
                onClick={() => setStateFilter('')}
                style={{ marginTop: 6, fontSize: 11, color: '#F5501C', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'inherit', fontWeight: 600 }}
              >
                ✕ Clear state filter
              </button>
            )}
          </div>

          <div style={divider} />

          {/* Reload */}
          <button
            onClick={fetchData}
            disabled={loading}
            style={{
              background: loading ? 'rgba(255,255,255,0.05)' : 'rgba(245,80,28,0.15)',
              border: '1px solid rgba(245,80,28,0.3)',
              color: loading ? 'rgba(255,255,255,0.3)' : '#F5501C',
              borderRadius: 7, padding: '8px 0', fontSize: 12, fontWeight: 700,
              cursor: loading ? 'wait' : 'pointer', width: '100%', fontFamily: 'inherit',
            }}
          >
            {loading ? '↻ Loading…' : '↻ Reload Data'}
          </button>
        </aside>

        {/* Main content */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '28px 32px' }}>

          {/* Loading */}
          {loading && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 300 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>⚡</div>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>Fetching data from Airtable…</p>
              </div>
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div style={{ background: 'rgba(229,62,62,0.1)', border: '1px solid rgba(229,62,62,0.3)', borderRadius: 8, padding: 16, color: '#fc8181', fontSize: 13 }}>
              ⚠️ Error: {error}
            </div>
          )}

          {/* Dashboard */}
          {!loading && rawData && (
            <>
              {/* KPI Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 28 }}>
                <KpiCard label="Trailblazers Completed" value={fmt(kpis.tbComplete)} sub={`${fmt(kpis.tbEnrolled)} enrolled`} accent />
                <KpiCard label="Spark the Future" value={fmt(kpis.stfComplete)} sub="Completed" />
                <KpiCard label="Teaching for Tomorrow" value={fmt(kpis.tftComplete)} sub="Completed" />
                <KpiCard label="PLC" value={fmt(kpis.plcComplete)} sub="Completed" />
                <KpiCard label="Total Trained" value={fmt(kpis.totalTrained)} sub="All cohort programs" accent />
                <KpiCard label="Webinar Registrants" value={fmt(kpis.webTotal)} sub={`${fmt(kpis.webAttended)} attended (${pct(kpis.webAttended, kpis.webTotal)}%)`} />
                <KpiCard label="Curriculum Downloads" value={fmt(kpis.dlFiltered)} sub="Unique requests" />
              </div>

              {/* State Breakdown Table */}
              <div style={{ background: '#1a1a38', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: 24, marginBottom: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
                  <h2 style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>
                    State Breakdown — Trailblazers + Webinars + Downloads
                  </h2>
                  <div style={{ display: 'flex', gap: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 8, padding: 3 }}>
                    {[{ key: 'all', label: 'All States' }, { key: 'focus', label: 'Focus (CA, DC, HI, MD, VA)' }].map(({ key, label }) => (
                      <button
                        key={key}
                        onClick={() => setTableView(key)}
                        style={{
                          padding: '6px 12px', fontSize: 11, fontWeight: 700, borderRadius: 6,
                          border: 'none', fontFamily: 'inherit',
                          background: tableView === key ? '#F5501C' : 'transparent',
                          color: tableView === key ? '#fff' : 'rgba(255,255,255,0.35)',
                          cursor: 'pointer',
                        }}
                      >{label}</button>
                    ))}
                  </div>
                </div>

                {stateRows.length === 0 ? (
                  <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>No data for current filters.</p>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                      <thead>
                        <tr>
                          {[
                            { col: 'state', label: 'State' },
                            { col: 'tb', label: 'Trailblazers' },
                            { col: 'webinars', label: 'Webinar Registrants' },
                            { col: 'downloads', label: 'Curriculum Downloads' },
                            { col: 'total', label: 'Total' },
                          ].map(({ col, label }) => (
                            <th
                              key={col}
                              onClick={() => handleSort(col)}
                              style={{
                                textAlign: col === 'state' ? 'left' : 'right',
                                padding: '8px 12px', fontSize: 11, fontWeight: 700,
                                color: sortCol === col ? '#F5501C' : 'rgba(255,255,255,0.4)',
                                textTransform: 'uppercase', letterSpacing: '0.05em',
                                borderBottom: '1px solid rgba(255,255,255,0.08)',
                                cursor: 'pointer', userSelect: 'none', whiteSpace: 'nowrap',
                              }}
                            >{label}{sortIcon(col)}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {stateRows.map((row, i) => (
                          <tr key={row.abbr} style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
                            <td style={{ padding: '9px 12px', color: '#fff', fontWeight: 600 }}>
                              {row.name}
                              <span style={{ marginLeft: 6, fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>{row.abbr}</span>
                            </td>
                            {['tb','webinars','downloads','total'].map(col => (
                              <td key={col} style={{
                                padding: '9px 12px', textAlign: 'right',
                                color: col === 'total' ? '#F5501C' : row[col] > 0 ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.2)',
                                fontWeight: col === 'total' ? 700 : 400,
                                borderLeft: col === 'total' ? '1px solid rgba(255,255,255,0.06)' : 'none',
                              }}>
                                {fmt(row[col])}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Funder Copy Block */}
              <div style={{ background: '#1a1a38', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: 24 }}>
                <h2 style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 14 }}>📋 Copy for Funder Report</h2>
                <pre style={{
                  background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 8, padding: '14px 16px', fontSize: 12, lineHeight: 1.8,
                  color: 'rgba(255,255,255,0.75)', whiteSpace: 'pre-wrap', fontFamily: 'monospace',
                  overflowX: 'auto',
                }}>
                  {funderText}
                </pre>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(funderText).then(() => {
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    });
                  }}
                  style={{
                    marginTop: 12, background: copied ? '#22c55e' : '#F5501C',
                    color: '#fff', border: 'none', borderRadius: 6,
                    padding: '8px 16px', fontSize: 12, fontWeight: 700,
                    cursor: 'pointer', fontFamily: 'inherit', transition: 'background 0.2s',
                  }}
                >
                  {copied ? '✓ Copied!' : 'Copy to clipboard'}
                </button>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
