import React from 'react';

export default function Logo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem' }}>
      <img
        src="https://via.placeholder.com/32"
        alt="Logo"
        style={{ height: '2rem' }}
      />
      <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>Portfolio Của Tôi</span>
    </div>
  );
}
