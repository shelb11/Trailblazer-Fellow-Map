// Vercel serverless function — fetches participants from multiple aiEDU programs
// Pulls directly from each program's participant table, joins educator location data.
// Env vars: AIRTABLE_API_KEY, AIRTABLE_BASE_ID

const STATE_NAME_TO_ABBR = {
  Alabama:'AL',Alaska:'AK',Arizona:'AZ',Arkansas:'AR',California:'CA',
  Colorado:'CO',Connecticut:'CT',Delaware:'DE',Florida:'FL',Georgia:'GA',
  Hawaii:'HI',Idaho:'ID',Illinois:'IL',Indiana:'IN',Iowa:'IA',Kansas:'KS',
  Kentucky:'KY',Louisiana:'LA',Maine:'ME',Maryland:'MD',Massachusetts:'MA',
  Michigan:'MI',Minnesota:'MN',Mississippi:'MS',Missouri:'MO',Montana:'MT',
  Nebraska:'NE',Nevada:'NV','New Hampshire':'NH','New Jersey':'NJ',
  'New Mexico':'NM','New York':'NY','North Carolina':'NC','North Dakota':'ND',
  Ohio:'OH',Oklahoma:'OK',Oregon:'OR',Pennsylvania:'PA','Rhode Island':'RI',
  'South Carolina':'SC','South Dakota':'SD',Tennessee:'TN',Texas:'TX',
  Utah:'UT',Vermont:'VT',Virginia:'VA',Washington:'WA','West Virginia':'WV',
  Wisconsin:'WI',Wyoming:'WY','District of Columbia':'DC','Puerto Rico':'PR',
};

function toAbbr(raw) {
  if (!raw) return '';
  const trimmed = raw.trim();
  if (/^[A-Z]{2}$/.test(trimmed)) return trimmed;
  return STATE_NAME_TO_ABBR[trimmed] || trimmed;
}

function pickFirst(val) {
  return Array.isArray(val) ? (val[0] || '').trim() : (val || '').trim();
}

const NYC_BOROUGHS = new Set(['bronx', 'brooklyn', 'queens', 'staten island', 'manhattan']);

function normalizeCity(city) {
  if (!city) return city;
  const lower = city.toLowerCase();
  if (NYC_BOROUGHS.has(lower) || lower === 'new york' || lower === 'new york city') return 'New York City';
  const parenMatch = lower.match(/^new york(?:\s+city)?\s*\(([^)]+)\)/);
  if (parenMatch) return 'New York City';
  return city;
}

function getHeadshotUrl(field) {
  if (!Array.isArray(field) || field.length === 0) return null;
  const attachment = field[0];
  const thumbs = attachment.thumbnails || {};
  return thumbs.large?.url || thumbs.small?.url || attachment.url || null;
}

// STF uses "Completed" (with 'd'), Trailblazers uses "Complete" — normalise both to "Complete"
function normalizeStatus(raw) {
  const s = (raw || '').trim();
  if (s === 'Completed' || s === 'Complete') return 'Complete';
  return s; // preserves "In Progress", "Withdrawn", etc.
}

// ── Airtable pagination helper ──────────────────────────────────────────────
async function fetchAirtablePages(baseId, tableName, filter, headers) {
  const baseUrl = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`;
  let allRecords = [];
  let offset = null;

  do {
    const parts = [];
    if (filter) parts.push(`filterByFormula=${encodeURIComponent(filter)}`);
    if (offset) parts.push(`offset=${offset}`);
    const url = `${baseUrl}${parts.length ? '?' + parts.join('&') : ''}`;
    const res = await fetch(url, { headers });

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Airtable API ${res.status} (${tableName}): ${body}`);
    }

    const data = await res.json();
    allRecords = allRecords.concat(data.records);
    offset = data.offset || null;
  } while (offset);

  return allRecords;
}

// ── Fetch Spark the Future Participants ─────────────────────────────────────
async function fetchSTFParticipants(baseId, headers) {
  const filter = 'OR({Completion Status} = "Completed", {Completion Status} = "In Progress")';
  const records = await fetchAirtablePages(baseId, 'Spark the Future | Participants', filter, headers);
  return records.map(r => {
    const f = r.fields || {};
    return {
      id: r.id,
      educatorId: (f['Educators'] || [])[0] || null,
      completionStatus: normalizeStatus(f['Completion Status']),
      startDate: pickFirst(f['Start Date (from Cohort Name)']) || null,
      program: 'Spark the Future',
    };
  });
}

// ── Fetch Teaching for Tomorrow Participants ────────────────────────────────
async function fetchTfTParticipants(baseId, headers) {
  // Guard both spellings in case the field value varies across cohorts
  const filter = 'OR({Completion Status} = "Completed", {Completion Status} = "Complete", {Completion Status} = "In Progress")';
  const records = await fetchAirtablePages(baseId, 'Teaching for Tomorrow | Participants', filter, headers);
  return records.map(r => {
    const f = r.fields || {};
    return {
      id: r.id,
      educatorId: (f['Educators'] || [])[0] || null,
      completionStatus: normalizeStatus(f['Completion Status']),
      startDate: pickFirst(f['Start Date (from Cohort Name)']) || null,
      program: 'Teaching for Tomorrow',
    };
  });
}

// ── Fetch Trailblazer Participants ──────────────────────────────────────────
function mapTrailblazerRecord(record) {
  const f = record.fields || {};
  return {
    id: record.id,
    educatorId: (f['Educators'] || [])[0] || null,
    name: f['Full Name'] || '',
    school: pickFirst(f['School (from Educators)']),
    city: normalizeCity(pickFirst(f['School City (from Educators)'])),
    state: toAbbr(pickFirst(f['State (from Educators)'])),
    headshot: getHeadshotUrl(f['Headshot']),
    completionStatus: normalizeStatus(f['Y1 Completion Status']),
    startDate: pickFirst(f['Start Date (from Cohort Name)']) || null,
    programs: ['Trailblazers'],
  };
}

async function fetchTrailblazers(baseId, headers) {
  const tableName = process.env.AIRTABLE_TABLE_NAME || 'Trailblazers | Participants';
  const records = await fetchAirtablePages(baseId, tableName, null, headers);
  const statuses = {};
  records.forEach(r => { const s = r.fields?.['Y1 Completion Status'] || '__empty__'; statuses[s] = (statuses[s] || 0) + 1; });
  console.log('[Trailblazers] Y1 Completion Status values:', JSON.stringify(statuses));
  return records.map(mapTrailblazerRecord);
}

// ── Fetch Educator location data for a set of record IDs ───────────────────
async function fetchEducatorMap(baseId, headers, educatorIds) {
  if (educatorIds.length === 0) return new Map();

  // Chunk into groups of 100 to stay well under URL length limits
  const CHUNK = 100;
  const map = new Map();

  for (let i = 0; i < educatorIds.length; i += CHUNK) {
    const chunk = educatorIds.slice(i, i + CHUNK);
    const checks = chunk.map(id => `RECORD_ID()="${id}"`);
    const filter = chunk.length === 1 ? checks[0] : `OR(${checks.join(', ')})`;

    const records = await fetchAirtablePages(baseId, 'Educators', filter, headers);
    for (const r of records) {
      const f = r.fields || {};
      const stateVal = f['State'];
      const stateName = typeof stateVal === 'object' && stateVal !== null ? stateVal.name : (stateVal || '');
      map.set(r.id, {
        name: f['Name'] || '',
        school: pickFirst(f['District/Org']) || (f['School'] || '').trim(),
        city: normalizeCity((f['School/District City'] || f['School City'] || '').trim()),
        state: toAbbr(stateName),
      });
    }
  }

  return map;
}

// ── Merge all participants, dedup by educator ID ────────────────────────────
function mergeParticipants(stfParts, tftParts, trailblazers, educatorMap) {
  const byEducator = new Map();

  function upsert(key, record) {
    if (byEducator.has(key)) {
      const existing = byEducator.get(key);
      for (const p of record.programs) {
        if (!existing.programs.includes(p)) existing.programs.push(p);
      }
      // Keep "In Progress" if any linked program is still active
      if (record.completionStatus === 'In Progress') existing.completionStatus = 'In Progress';
      // Prefer the earliest cohort start date
      if (record.startDate && (!existing.startDate || record.startDate < existing.startDate)) {
        existing.startDate = record.startDate;
      }
      if (record.headshot) existing.headshot = record.headshot;
      if (record.name) existing.name = record.name;
    } else {
      byEducator.set(key, { ...record });
    }
  }

  for (const p of stfParts) {
    if (!p.educatorId) continue;
    const edu = educatorMap.get(p.educatorId);
    if (!edu) continue;
    upsert(p.educatorId, {
      id: p.id,
      educatorId: p.educatorId,
      name: edu.name,
      school: edu.school,
      city: edu.city,
      state: edu.state,
      headshot: null,
      completionStatus: p.completionStatus,
      startDate: p.startDate,
      programs: ['Spark the Future'],
    });
  }

  for (const p of tftParts) {
    if (!p.educatorId) continue;
    const edu = educatorMap.get(p.educatorId);
    if (!edu) continue;
    upsert(p.educatorId, {
      id: p.id,
      educatorId: p.educatorId,
      name: edu.name,
      school: edu.school,
      city: edu.city,
      state: edu.state,
      headshot: null,
      completionStatus: p.completionStatus,
      startDate: p.startDate,
      programs: ['Teaching for Tomorrow'],
    });
  }

  for (const tb of trailblazers) {
    // Use educator ID as dedup key when available, fall back to participant record ID
    upsert(tb.educatorId || tb.id, tb);
  }

  return Array.from(byEducator.values());
}

// ── Main fetch ──────────────────────────────────────────────────────────────
async function fetchAllRecords() {
  const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID } = process.env;

  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
    throw new Error('Missing AIRTABLE_API_KEY or AIRTABLE_BASE_ID env vars');
  }

  const headers = { Authorization: `Bearer ${AIRTABLE_API_KEY}` };

  // Fetch all three participant tables in parallel
  const [stfParts, tftParts, trailblazers] = await Promise.all([
    fetchSTFParticipants(AIRTABLE_BASE_ID, headers),
    fetchTfTParticipants(AIRTABLE_BASE_ID, headers),
    fetchTrailblazers(AIRTABLE_BASE_ID, headers),
  ]);

  // Collect unique educator IDs needed for STF + TfT location lookup
  const educatorIds = [
    ...new Set([
      ...stfParts.map(p => p.educatorId).filter(Boolean),
      ...tftParts.map(p => p.educatorId).filter(Boolean),
    ]),
  ];

  const educatorMap = await fetchEducatorMap(AIRTABLE_BASE_ID, headers, educatorIds);

  return mergeParticipants(stfParts, tftParts, trailblazers, educatorMap);
}

// ── Handler ─────────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const teachers = await fetchAllRecords();
    res.status(200).json(teachers);
  } catch (err) {
    console.error('Airtable fetch error:', err.message);
    res.status(502).json({ error: 'Failed to fetch from Airtable', detail: err.message });
  }
}
