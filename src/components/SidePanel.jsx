import TeacherCard from './TeacherCard';
import { STATE_ABBR_TO_NAME } from '../utils/stateUtils';

export default function SidePanel({ stateAbbr, teachers, onClose, cityName }) {
  const fullStateName = STATE_ABBR_TO_NAME[stateAbbr] || stateAbbr;
  const displayName = cityName || fullStateName;

  return (
    <div
      className="side-panel-enter flex flex-col"
      style={{
        width: 360,
        flexShrink: 0,
        background: '#ffffff',
        borderLeft: '1px solid #E0E0E0',
        overflow: 'hidden',
      }}
    >
      {/* ── Header ── */}
      <div
        className="flex items-start justify-between px-4 py-4 flex-shrink-0"
        style={{ borderBottom: '1px solid #E0E0E0' }}
      >
        <div>
          <div className="flex items-center gap-2">
            <span
              className="text-[11px] font-bold px-2 py-0.5 tracking-widest"
              style={{ background: '#F5501C', color: '#fff', borderRadius: '3px' }}
            >
              {stateAbbr}
            </span>
            <h2 className="text-base font-bold" style={{ color: '#222244' }}>{displayName}</h2>
          </div>
          <p className="text-xs mt-1" style={{ color: '#666' }}>
            {teachers.length} Educator{teachers.length !== 1 ? 's' : ''}
          </p>
        </div>

        <button
          className="btn-icon mt-0.5"
          style={{ background: '#eee', color: '#444' }}
          onClick={onClose}
          aria-label="Close panel"
        >
          ✕
        </button>
      </div>

      {/* ── Body ── */}
      <div className="flex-1 overflow-y-auto">
        {teachers.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full py-16 px-6 text-center">
            <div className="text-5xl mb-4 opacity-40">📭</div>
            <p className="text-sm" style={{ color: '#666' }}>
              No educators in {displayName} yet.
            </p>
          </div>
        ) : (
          <div className="p-4 space-y-3">
            {teachers.map((teacher) => (
              <TeacherCard key={teacher.id} teacher={teacher} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
