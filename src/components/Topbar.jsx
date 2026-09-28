import React from 'react'
import logo from '../assets/hutchi-logo.png'

export default function Topbar({ route, navigate, saveState }) {
  return (
    <div className="topbar">
      <img src={logo} alt="Hutchi" />
      <div className="brand">
        RAMS Builder
        <small>Hutchi UK — By Hutchison Technologies</small>
      </div>
      <nav>
        <a href="#/" className={route === 'home' || route === '' ? 'active' : ''}>Home</a>
        <a href="#/records" className={route === 'records' ? 'active' : ''}>Records</a>
        <button className={route.startsWith('new') || route.startsWith('edit') ? 'active' : ''} onClick={() => navigate('/new')}>
          New RAMS
        </button>
      </nav>
      {saveState && (
        <span style={{ fontSize: '0.72rem', color: '#C9C6E0', marginLeft: 4 }}>
          {saveState === 'saving' ? 'Saving draft…' : saveState === 'saved' ? 'Draft saved on this device' : 'Could not save draft'}
        </span>
      )}
    </div>
  )
}
