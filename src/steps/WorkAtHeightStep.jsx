import React from 'react'
import { SectionCard, TextArea } from '../components/Fields.jsx'

export default function WorkAtHeightStep({ data, patch }) {
  const w = data.workAtHeight
  return (
    <>
      <SectionCard title="3.0 Work at Height" help="Apply the hierarchy of controls per the Work at Height Regulations 2005. Describe fall prevention measures for this project.">
        <TextArea label="Access equipment hierarchy" value={w.hierarchy} onChange={v => patch('workAtHeight', { hierarchy: v })} rows={4} />
      </SectionCard>
      <SectionCard title="3.1 Falling Objects Prevention" help="Storage of tools/materials at height, tethering, exclusion zones, sequencing.">
        <TextArea label="Falling-object controls" value={w.fallingObjects} onChange={v => patch('workAtHeight', { fallingObjects: v })} rows={4} />
      </SectionCard>
    </>
  )
}
