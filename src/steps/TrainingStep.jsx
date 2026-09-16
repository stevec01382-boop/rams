import React from 'react'
import { SectionCard, TextArea } from '../components/Fields.jsx'

export default function TrainingStep({ data, setSection }) {
  return (
    <SectionCard
      title="6.0 Training"
      help="Outline standard training for the work activities on this project. Operatives must be competent for the tasks they are expected to carry out. Add / remove training requirements to match the actual scope of this project."
    >
      <TextArea label="Training requirements" value={data.training} onChange={v => setSection('training', v)} rows={6} />
    </SectionCard>
  )
}
