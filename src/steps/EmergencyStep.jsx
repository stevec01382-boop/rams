import React from 'react'
import { SectionCard, Text, TextArea } from '../components/Fields.jsx'

export default function EmergencyStep({ data, patch }) {
  const e = data.emergency
  const set = (field) => (v) => patch('emergency', { [field]: v })
  return (
    <>
      <SectionCard title="8.0 Emergency Arrangements" help="Where is the First Aid kit kept, and what is the rescue plan for specific operations?">
        <TextArea label="First Aid kits" value={e.firstAidKits} onChange={set('firstAidKits')} rows={2} />
        <TextArea label="Confined space" value={e.confinedSpace} onChange={set('confinedSpace')} rows={2} />
        <TextArea label="Falls from height" value={e.fallsFromHeight} onChange={set('fallsFromHeight')} rows={2} />
        <TextArea label="Isolated work areas" value={e.isolatedWorkAreas} onChange={set('isolatedWorkAreas')} rows={2} />
      </SectionCard>

      <SectionCard title="8.1 Rescue from MEWP" help="Complete only if a Mobile Elevating Work Platform is used on this project.">
        <label className="checkbox-row" style={{ marginBottom: 10 }}>
          <input type="checkbox" checked={e.mewpApplicable} onChange={ev => patch('emergency', { mewpApplicable: ev.target.checked })} />
          A MEWP will be used on this project
        </label>
        {e.mewpApplicable && <TextArea label="MEWP rescue plan" value={e.mewpRescue} onChange={set('mewpRescue')} rows={4} />}
      </SectionCard>

      <SectionCard title="8.2 Accident Reporting" help="Company policy, in addition to on-site regulations.">
        <TextArea label="Accident reporting" value={e.accidentReporting} onChange={set('accidentReporting')} rows={3} />
      </SectionCard>

      <SectionCard title="8.3 First Aid on Site">
        <TextArea label="Qualified person arrangement" value={e.firstAidOnSite} onChange={set('firstAidOnSite')} rows={2} />
      </SectionCard>
      <SectionCard title="8.4 Pedestrian / Traffic Route Arrangements">
        <TextArea label="Arrangement" value={e.pedestrianTraffic} onChange={set('pedestrianTraffic')} rows={2} />
      </SectionCard>
      <SectionCard title="8.5 Fire Safety Arrangements">
        <TextArea label="Additional controls" value={e.fireSafety} onChange={set('fireSafety')} rows={2} />
      </SectionCard>
      <SectionCard title="8.6 Task Lighting" help="Portable halogen lighting is not normally permitted on site.">
        <TextArea label="Lighting arrangements" value={e.taskLighting} onChange={set('taskLighting')} rows={2} />
      </SectionCard>
    </>
  )
}
