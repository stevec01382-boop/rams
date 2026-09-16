import React from 'react'
import { SectionCard, TextArea } from '../components/Fields.jsx'

export default function ScopeStep({ data, patch }) {
  return (
    <SectionCard
      title="1.0 Scope of Works"
      help='Provide a full description of the works involved. Do not use a generic placeholder such as "New site project" — describe the actual activities (e.g. 1st/2nd fix cabling, containment, terminations, testing & commissioning, balustrading, etc.) so the scope matches the method statement selected later.'
    >
      <TextArea
        label="Scope of works"
        rows={8}
        value={data.scope.description}
        onChange={v => patch('scope', { description: v })}
        placeholder="Describe the actual scope of work for this project..."
      />
    </SectionCard>
  )
}
