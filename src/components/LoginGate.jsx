import { useState } from 'react';

const SESSION_KEY = 'aiedu_auth';

export default function LoginGate({ children }) {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === '1');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (authed) return children;

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        sessionStorage.setItem(SESSION_KEY, '1');
        setAuthed(true);
      } else {
        setError('Incorrect password');
      }
    } catch {
      setError('Connection error — try again');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      minHeight: '100vh', background: '#f3f3f6',
    }}>
      <div style={{
        background: '#fff', borderRadius: 16, padding: '40px 48px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)', textAlign: 'center', width: 320,
      }}>
        <div style={{
          width: 48, height: 48, borderRadius: 12, display: 'flex',
          alignItems: 'center', justifyContent: 'center', fontSize: 22,
          background: 'linear-gradient(135deg, #F5501C, #F5A623)', margin: '0 auto 16px',
        }}>
          🔥
        </div>
        <h1 style={{ fontSize: 18, fontWeight: 700, color: '#222244', margin: '0 0 6px' }}>
          aiEDU Cohort Map
        </h1>
        <p style={{ fontSize: 13, color: '#888', margin: '0 0 24px' }}>
          Enter your password to continue
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            autoFocus
            style={{
              width: '100%', padding: '10px 14px', borderRadius: 8,
              border: '1px solid #e0e0e0', fontSize: 14, marginBottom: 10,
              boxSizing: 'border-box', outline: 'none', color: '#222244',
            }}
          />
          {error && (
            <p style={{ fontSize: 12, color: '#F5501C', margin: '0 0 10px' }}>{error}</p>
          )}
          <button
            type="submit"
            disabled={loading || !password}
            style={{
              width: '100%', padding: '10px 0', borderRadius: 8,
              background: '#F5501C', color: '#fff', fontWeight: 700,
              fontSize: 14, border: 'none',
              cursor: loading || !password ? 'default' : 'pointer',
              opacity: loading || !password ? 0.5 : 1,
              transition: 'opacity 0.15s',
            }}
          >
            {loading ? 'Checking…' : 'Continue'}
          </button>
        </form>
      </div>
    </div>
  );
}
