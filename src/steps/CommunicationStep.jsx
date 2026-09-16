import React from 'react'
import { SectionCard, TextArea } from '../components/Fields.jsx'

export default function CommunicationStep({ data, patch }) {
  const c = data.communication
  const set = (field) => (v) => patch('communication', { [field]: v })
  return (
    <>
      <SectionCard title="9.0 Communicating to the Operatives" help="Including those who do not have English as a first language.">
        <TextArea label="Briefing arrangements" value={c.briefing} onChange={set('briefing')} rows={3} />
      </SectionCard>
      <SectionCard title="9.1 Person(s) Responsible for Monitoring / Reviewing Safe Systems of Work">
        <TextArea label="Names and contact numbers" value={c.monitoring} onChange={set('monitoring')} rows={2} />
      </SectionCard>
      <SectionCard title="9.2 Review Dates">
        <TextArea label="Review arrangement" value={c.reviewDates} onChange={set('reviewDates')} rows={2} />
      </SectionCard>
      <SectionCard title="9.3 Amendments Authorised By & Communicated To">
        <TextArea label="Amendment record" value={c.amendments} onChange={set('amendments')} rows={2} />
      </SectionCard>
    </>
  )
}
