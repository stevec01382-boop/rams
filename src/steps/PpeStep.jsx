import React from 'react'
import { SectionCard, TextArea } from '../components/Fields.jsx'
import { PPE_STANDARDS } from '../data/defaults.js'

function StandardList({ title, items }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: 4 }}>{title}</div>
      <ul className="subtle-list">
        {items.map((t, i) => <li key={i}>• {t}</li>)}
      </ul>
    </div>
  )
}

export default function PpeStep({ data, patch }) {
  return (
    <>
      <SectionCard
        title="7.0 PPE — Mandatory (as per UK and European standards)"
        help="Task-specific PPE is identified per risk assessment below. State grade and standard, and consider additional PPE required by the working environment (e.g. cut-resistant arm protection for ceiling voids)."
      >
        <TextArea label="Task-specific PPE for this project" value={data.ppe.taskSpecific} onChange={v => patch('ppe', { taskSpecific: v })} rows={4} />
      </SectionCard>

      <SectionCard title="7.1 Standard PPE reference (prints in the PDF, company standard)">
        <StandardList title="7.1.1 Hand Protection" items={PPE_STANDARDS.hand} />
        <StandardList title="7.1.2 Ear Protection" items={PPE_STANDARDS.ear} />
        <StandardList title="7.1.3 RPE — Respiratory Protection Equipment" items={PPE_STANDARDS.rpe} />
        <StandardList title="7.1.4 Safety Helmets" items={PPE_STANDARDS.helmet} />
        <StandardList title="7.1.5 Foot Protection" items={PPE_STANDARDS.foot} />
        <StandardList title="7.1.6 Eye Protection" items={PPE_STANDARDS.eye} />
        <StandardList title="7.1.7 Harness and Lanyard" items={PPE_STANDARDS.harness} />
      </SectionCard>
    </>
  )
}
