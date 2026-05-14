export default function MapTabs({ activeTab, onTabChange }) {
  const tabs = [
    { key: 'state', label: 'By State' },
    { key: 'city', label: 'By City' },
  ];

  return (
    <div
      className="flex gap-1 px-4 pt-3 pb-0"
      style={{ background: '#ffffff' }}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className="text-sm font-bold px-5 py-2 transition-colors"
            style={{
              color: isActive ? '#222244' : '#999',
              background: isActive ? '#ffffff' : 'transparent',
              borderBottom: isActive ? '2.5px solid #F5501C' : '2.5px solid transparent',
              borderRadius: '0',
              cursor: isActive ? 'default' : 'pointer',
            }}
          >
            {tab.label}
          </button>
        );
      })}
      {/* Bottom border line across full width */}
      <div className="flex-1" style={{ borderBottom: '1px solid #E0E0E0', alignSelf: 'flex-end' }} />
    </div>
  );
}
