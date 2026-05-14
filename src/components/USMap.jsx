import { useState, useCallback, useMemo } from 'react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';
import { feature } from 'topojson-client';
import { geoCentroid, geoPath, geoAlbersUsa } from 'd3-geo';
import Tooltip from './Tooltip';
import ZoomControls from './ZoomControls';
import { STATE_NAME_TO_ABBR } from '../utils/stateUtils';
import { getStateColor, SELECTED_STROKE_COLOR, EMPTY_STATE_COLOR } from '../utils/colorUtils';
import { getCityCoords } from '../utils/cityCoordinates';

// Import the TopoJSON and extract states once at module level
import topoData from 'us-atlas/states-10m.json';
const statesGeoJSON = feature(topoData, topoData.objects.states);

// Projection matching the map's configuration — used for computing state bounds
const MAP_WIDTH = 960;
const MAP_HEIGHT = 580;
const MAP_SCALE = 950;
const boundsProjection = geoAlbersUsa().scale(MAP_SCALE).translate([MAP_WIDTH / 2, MAP_HEIGHT / 2]);
const pathGenerator = geoPath().projection(boundsProjection);

/** Light grey for state borders on white background */
const BORDER_COLOR = '#ccc';

const DEFAULT_CENTER = [-96, 38];
const DEFAULT_ZOOM = 1;
const MIN_ZOOM = 1;
const MAX_ZOOM = 8;

/** r = 4 × √count */
function getBubbleRadius(count) {
  if (count <= 0) return 0;
  return 4 * Math.sqrt(count);
}

/**
 * Compute SVG transform parameters to zoom into a specific state.
 * Returns { k, tx, ty, transformString } or null.
 */
function computeDrillTransform(geo) {
  const centroid = geoCentroid(geo);
  const projected = boundsProjection(centroid);
  if (!projected) return null;

  const [cx, cy] = projected;
  const bounds = pathGenerator.bounds(geo);

  if (!bounds || isNaN(bounds[0][0]) || isNaN(bounds[1][0])) {
    return null;
  }

  const [[x0, y0], [x1, y1]] = bounds;
  const stateWidth = x1 - x0;
  const stateHeight = y1 - y0;

  if (stateWidth <= 0 || stateHeight <= 0) return null;

  const padding = 0.55;
  const kx = (MAP_WIDTH * padding) / stateWidth;
  const ky = (MAP_HEIGHT * padding) / stateHeight;
  const k = Math.min(kx, ky, MAX_ZOOM);
  const zoom = Math.max(k, 2);

  const tx = MAP_WIDTH / 2 - cx * zoom;
  const ty = MAP_HEIGHT / 2 - cy * zoom;

  return {
    k: zoom,
    tx,
    ty,
    transformString: `translate(${tx}, ${ty}) scale(${zoom})`,
  };
}

export default function USMap({
  teachersByState,
  maxCount,
  selectedState,
  onStateClick,
  teachersByCity,
  maxCityCount,
  onCityClick,
  selectedCity,
  drilledState,
  onDrillDown,
  onBackToNational,
}) {
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, data: null });
  const [position, setPosition] = useState({ coordinates: DEFAULT_CENTER, zoom: DEFAULT_ZOOM });

  // Compute the drill-down SVG transform from the state geometry
  const drillTransform = useMemo(() => {
    if (!drilledState) return null;
    const geo = statesGeoJSON.features.find(
      (f) => STATE_NAME_TO_ABBR[f.properties.name] === drilledState
    );
    if (!geo) return null;
    return computeDrillTransform(geo);
  }, [drilledState]);

  // City entries for the drilled state
  const cityEntries = useMemo(() => {
    if (!drilledState || !teachersByCity) return [];
    const entries = [];
    for (const [cityKey, teachers] of Object.entries(teachersByCity)) {
      const parts = cityKey.split(', ');
      const stateAbbr = parts[parts.length - 1];
      if (stateAbbr !== drilledState) continue;
      const city = parts.slice(0, -1).join(', ');
      const coords = getCityCoords(city, stateAbbr);
      if (coords) {
        entries.push({ cityKey, city, stateAbbr, coords, teachers, count: teachers.length });
      }
    }
    entries.sort((a, b) => b.count - a.count);
    return entries;
  }, [drilledState, teachersByCity]);

  // Max city count within the drilled state (for bubble sizing)
  const drilledMaxCityCount = useMemo(() => {
    if (cityEntries.length === 0) return 1;
    return Math.max(1, ...cityEntries.map((e) => e.count));
  }, [cityEntries]);

  /* ── Zoom controls (national view only) ────────────────────────────────── */

  const handleZoomIn = useCallback(() => {
    setPosition((pos) => ({ ...pos, zoom: Math.min(pos.zoom * 1.5, MAX_ZOOM) }));
  }, []);

  const handleZoomOut = useCallback(() => {
    setPosition((pos) => ({ ...pos, zoom: Math.max(pos.zoom / 1.5, MIN_ZOOM) }));
  }, []);

  const handleReset = useCallback(() => {
    setPosition({ coordinates: DEFAULT_CENTER, zoom: DEFAULT_ZOOM });
  }, []);

  const handleMoveEnd = useCallback((pos) => {
    setPosition(pos);
  }, []);

  /* ── Back to national ─────────────────────────────────────────────────── */

  const handleBack = useCallback(() => {
    onBackToNational();
  }, [onBackToNational]);

  /* ── Mouse / click handlers ────────────────────────────────────────────── */

  const handleStateMouseEnter = useCallback(
    (geo, evt) => {
      const abbr = STATE_NAME_TO_ABBR[geo.properties.name];
      const teachers = abbr ? (teachersByState[abbr] || []) : [];
      setTooltip({
        visible: true,
        x: evt.clientX,
        y: evt.clientY,
        data: { stateName: geo.properties.name, stateAbbr: abbr || '??', teachers },
      });
    },
    [teachersByState]
  );

  const handleMouseMove = useCallback((evt) => {
    setTooltip((prev) => ({ ...prev, x: evt.clientX, y: evt.clientY }));
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTooltip((prev) => ({ ...prev, visible: false }));
  }, []);

  const handleStateClick = useCallback(
    (geo) => {
      const abbr = STATE_NAME_TO_ABBR[geo.properties.name];
      if (!abbr) return;
      if (drilledState) return;
      onDrillDown(abbr);
      onStateClick(abbr);
      setTooltip((prev) => ({ ...prev, visible: false }));
    },
    [drilledState, onDrillDown, onStateClick]
  );

  const handleCityMouseEnter = useCallback(
    (entry, evt) => {
      setTooltip({
        visible: true,
        x: evt.clientX,
        y: evt.clientY,
        data: {
          stateName: entry.city,
          stateAbbr: entry.stateAbbr,
          teachers: entry.teachers,
          cityName: entry.city,
        },
      });
    },
    []
  );

  const handleCityClick = useCallback(
    (entry) => {
      onCityClick(entry.cityKey === selectedCity ? null : entry.cityKey);
    },
    [onCityClick, selectedCity]
  );

  /* ── Shared geography renderer ─────────────────────────────────────────── */

  const renderStates = (zoom) => (
    <Geographies geography={statesGeoJSON}>
      {({ geographies }) =>
        geographies.map((geo) => {
          const abbr = STATE_NAME_TO_ABBR[geo.properties.name];
          const teachers = abbr ? (teachersByState[abbr] || []) : [];
          const count = teachers.length;
          const isDrilledTarget = abbr && abbr === drilledState;
          const isSelected = abbr && abbr === selectedState && !drilledState;

          const fill = drilledState
            ? isDrilledTarget ? '#ffffff' : EMPTY_STATE_COLOR
            : getStateColor(count, maxCount);

          const strokeColor = isDrilledTarget || isSelected ? SELECTED_STROKE_COLOR : BORDER_COLOR;
          const strokeW = isDrilledTarget || isSelected
            ? 2.5 / zoom
            : 0.6 / zoom;

          return (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill={fill}
              stroke={strokeColor}
              strokeWidth={strokeW}
              style={{
                default: {
                  outline: 'none',
                  filter: isDrilledTarget ? 'brightness(1.1)' : 'none',
                  opacity: drilledState && !isDrilledTarget ? 0.3 : 1,
                },
                hover: {
                  outline: 'none',
                  filter: drilledState ? 'none' : 'brightness(1.3) saturate(1.15)',
                  cursor: drilledState ? 'default' : 'pointer',
                  opacity: drilledState && !isDrilledTarget ? 0.3 : 1,
                },
                pressed: {
                  outline: 'none',
                  filter: 'brightness(0.92)',
                  opacity: drilledState && !isDrilledTarget ? 0.3 : 1,
                },
              }}
              onMouseEnter={(evt) => !drilledState && handleStateMouseEnter(geo, evt)}
              onMouseMove={!drilledState ? handleMouseMove : undefined}
              onMouseLeave={!drilledState ? handleMouseLeave : undefined}
              onClick={() => handleStateClick(geo)}
            />
          );
        })
      }
    </Geographies>
  );

  /* ── Render ────────────────────────────────────────────────────────────── */

  const isDrilled = drilledState && drillTransform;
  const currentZoom = isDrilled ? drillTransform.k : position.zoom;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Zoom controls only in national view */}
      {!isDrilled && (
        <ZoomControls onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} onReset={handleReset} />
      )}

      {/* Back button in drilled view */}
      {isDrilled && (
        <button
          onClick={handleBack}
          style={{
            position: 'absolute',
            top: 12,
            left: 12,
            zIndex: 20,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '6px 14px',
            background: '#222244',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
            transition: 'background 0.15s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#333366')}
          onMouseLeave={(e) => (e.currentTarget.style.background = '#222244')}
        >
          ← Back to US
        </button>
      )}

      <ComposableMap
        projection="geoAlbersUsa"
        projectionConfig={{ scale: MAP_SCALE }}
        width={MAP_WIDTH}
        height={MAP_HEIGHT}
        style={{ width: '100%', height: 'auto', display: 'block' }}
      >
        {isDrilled ? (
          /* ── Drilled view: direct SVG transform (bypasses ZoomableGroup) ── */
          <g transform={drillTransform.transformString}>
            {renderStates(currentZoom)}

            {/* City bubbles */}
            {cityEntries.map((entry) => {
              const isSelected = entry.cityKey === selectedCity;
              const fill = getStateColor(entry.count, drilledMaxCityCount);
              const r = getBubbleRadius(entry.count) / currentZoom;

              return (
                <Marker key={entry.cityKey} coordinates={entry.coords}>
                  <circle
                    r={r}
                    fill={fill}
                    fillOpacity={0.85}
                    stroke={isSelected ? SELECTED_STROKE_COLOR : '#fff'}
                    strokeWidth={(isSelected ? 2.5 : 1.2) / currentZoom}
                    style={{ cursor: 'pointer', transition: 'r 0.2s ease, stroke 0.2s ease' }}
                    onMouseEnter={(evt) => handleCityMouseEnter(entry, evt)}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleCityClick(entry)}
                  />
                </Marker>
              );
            })}
          </g>
        ) : (
          /* ── National view: ZoomableGroup for interactive pan/zoom ── */
          <ZoomableGroup
            center={position.coordinates}
            zoom={position.zoom}
            onMoveEnd={handleMoveEnd}
            minZoom={MIN_ZOOM}
            maxZoom={MAX_ZOOM}
          >
            {renderStates(position.zoom)}
          </ZoomableGroup>
        )}
      </ComposableMap>

      <Tooltip {...tooltip} />
    </div>
  );
}
