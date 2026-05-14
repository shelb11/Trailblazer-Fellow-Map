export default function ZoomControls({ onZoomIn, onZoomOut, onReset }) {
  const btnStyle = {
    width: 32,
    height: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#fff',
    border: '1px solid #E0E0E0',
    color: '#222244',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    lineHeight: 1,
    userSelect: 'none',
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: 12,
        right: 12,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
        zIndex: 10,
      }}
    >
      <button style={{ ...btnStyle, borderBottom: 'none', borderRadius: '8px 8px 0 0' }} onClick={onZoomIn} aria-label="Zoom in">
        +
      </button>
      <button style={btnStyle} onClick={onZoomOut} aria-label="Zoom out">
        −
      </button>
      <button
        style={{ ...btnStyle, borderTop: 'none', borderRadius: '0 0 8px 8px', fontSize: '11px', fontWeight: 600 }}
        onClick={onReset}
        aria-label="Reset zoom"
      >
        ↺
      </button>
    </div>
  );
}
