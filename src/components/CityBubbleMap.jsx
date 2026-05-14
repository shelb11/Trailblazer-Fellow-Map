import { useState, useCallback, useMemo } from 'react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';
import { feature } from 'topojson-client';
import Tooltip from './Tooltip';
import ZoomControls from './ZoomControls';
import { getStateColor, SELECTED_STROKE_COLOR, EMPTY_STATE_COLOR } from '../utils/colorUtils';
import { getCityCoords } from '../utils/cityCoordinates';

// Import the TopoJSON and extract states once at module level
import topoData from 'us-atlas/states-10m.json';
const statesGeoJSON = feature(topoData, topoData.objects.states);

/** r = 4 × √count */
function getBubbleRadius(count) {
  if (count <= 0) return 0;
  return 4 * Math.sqrt(count);
}

/** Light grey for background state borders */
const BORDER_COLOR = '#ddd';

const DEFAULT_CENTER = [-96, 38];
const DEFAULT_ZOOM = 1;
const MIN_ZOOM = 1;
const MAX_ZOOM = 8;

export default function CityBubbleMap({ teachersByCity, maxCityCount, selectedCity, onCityClick }) {
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, data: null });
  const [position, setPosition] = useState({ coordinates: DEFAULT_CENTER, zoom: DEFAULT_ZOOM });

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

  // Pre-compute city entries with valid coordinates, sorted so smaller bubbles render on top
  const cityEntries = useMemo(() => {
    const entries = [];
    for (const [cityKey, teachers] of Object.entries(teachersByCity)) {
      // cityKey is "City, ST"
      const parts = cityKey.split(', ');
      const city = parts.slice(0, -1).join(', '); // handle cities with commas
      const stateAbbr = parts[parts.length - 1];
      const coords = getCityCoords(city, stateAbbr);
      if (coords) {
        entries.push({ cityKey, city, stateAbbr, coords, teachers, count: teachers.length });
      }
    }
    // Sort descending by count so large bubbles render first (underneath)
    entries.sort((a, b) => b.count - a.count);
    return entries;
  }, [teachersByCity]);

  const handleMouseEnter = useCallback(
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

  const handleMouseMove = useCallback((evt) => {
    setTooltip((prev) => ({ ...prev, x: evt.clientX, y: evt.clientY }));
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTooltip((prev) => ({ ...prev, visible: false }));
  }, []);

  const handleClick = useCallback(
    (entry) => {
      onCityClick(entry.cityKey === selectedCity ? null : entry.cityKey);
    },
    [onCityClick, selectedCity]
  );

  return (
    <div style={{ position: 'relative', width: '70%', margin: '0 auto', marginTop: '-20px' }}>
      <ZoomControls onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} onReset={handleReset} />

      <ComposableMap
        projection="geoAlbersUsa"
        projectionConfig={{ scale: 950 }}
        width={960}
        height={580}
        style={{ width: '100%', height: 'auto', display: 'block' }}
      >
        <ZoomableGroup
          center={position.coordinates}
          zoom={position.zoom}
          onMoveEnd={handleMoveEnd}
          minZoom={MIN_ZOOM}
          maxZoom={MAX_ZOOM}
        >
          {/* Background states — light grey, non-interactive */}
          <Geographies geography={statesGeoJSON}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={EMPTY_STATE_COLOR}
                  stroke={BORDER_COLOR}
                  strokeWidth={0.5 / position.zoom}
                  style={{
                    default: { outline: 'none' },
                    hover: { outline: 'none' },
                    pressed: { outline: 'none' },
                  }}
                />
              ))
            }
          </Geographies>

          {/* City bubbles */}
          {cityEntries.map((entry) => {
            const isSelected = entry.cityKey === selectedCity;
            const fill = getStateColor(entry.count, maxCityCount);
            const r = getBubbleRadius(entry.count) / position.zoom;

            return (
              <Marker key={entry.cityKey} coordinates={entry.coords}>
                <circle
                  r={r}
                  fill={fill}
                  fillOpacity={0.85}
                  stroke={isSelected ? SELECTED_STROKE_COLOR : '#fff'}
                  strokeWidth={(isSelected ? 2.5 : 1) / position.zoom}
                  style={{ cursor: 'pointer', transition: 'r 0.2s ease, stroke 0.2s ease' }}
                  onMouseEnter={(evt) => handleMouseEnter(entry, evt)}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleClick(entry)}
                />
              </Marker>
            );
          })}
        </ZoomableGroup>
      </ComposableMap>

      <Tooltip {...tooltip} />
    </div>
  );
}
