import React from 'react'

export default function ParticipantBlock({ title, data, onChange, removable, onRemove }) {
  const field = (key) => ({
    value:    data[key] || '',
    onChange: (e) => onChange(key, e.target.value),
    className: 'form-input',
  })

  return (
    <div className="participant-block">
      <div className="participant-block-header">
        <div className="participant-block-title">{title}</div>
        {removable && (
          <button className="participant-block-remove" onClick={onRemove} type="button">
            ✕ Remove
          </button>
        )}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Full Name <span>*</span></label>
          <input {...field('name')} placeholder="Enter full name" />
        </div>
        <div className="form-group">
          <label className="form-label">Email Address <span>*</span></label>
          <input {...field('email')} type="email" placeholder="email@example.com" />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Phone Number <span>*</span></label>
          <input {...field('phone')} placeholder="+91 XXXXX XXXXX" />
        </div>
        <div className="form-group">
          <label className="form-label">College Name <span>*</span></label>
          <input {...field('college')} placeholder="Your college name" />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Year of Study <span>*</span></label>
          <select className="form-select" value={data.year || ''} onChange={(e) => onChange('year', e.target.value)}>
            <option value="">Select Year</option>
            <option>1st Year</option>
            <option>2nd Year</option>
            <option>3rd Year</option>
            <option>4th Year</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Department <span>*</span></label>
          <input {...field('dept')} placeholder="e.g., Computer Science" />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Roll / Register Number <span>*</span></label>
        <input {...field('rollNo')} placeholder="e.g., 22CS001" />
      </div>
    </div>
  )
}
