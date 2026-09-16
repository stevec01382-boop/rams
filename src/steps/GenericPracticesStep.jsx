import React from 'react'
import { SectionCard, TextArea } from '../components/Fields.jsx'

export default function GenericPracticesStep({ data, patch }) {
  const g = data.genericPractices
  const set = (field) => (v) => patch('genericPractices', { [field]: v })

  return (
    <>
      <SectionCard title="2.2 Manual Handling" help="Describe any manual handling tasks for this project and refer to relevant risk assessments.">
        <TextArea label="Response" value={g.manualHandling} onChange={set('manualHandling')} rows={3} />
      </SectionCard>
      <SectionCard title="2.3 Hand-Arm Vibration" help="Confirm HAVS exposure and controls for this project.">
        <TextArea label="Response" value={g.havs} onChange={set('havs')} rows={3} />
      </SectionCard>
      <SectionCard title="2.4 Noise" help="What activities will generate noise? How can noise be minimised? Will a noise risk assessment be undertaken?">
        <TextArea label="Response" value={g.noise} onChange={set('noise')} rows={3} />
      </SectionCard>
      <SectionCard title="2.5 Radiation / Lasers" help="Consider risks to eyesight from lasers during setting-out. Acceptable classifications: Class 1, 2, 3A. Warnings required for Class 3B or 4.">
        <TextArea label="Response" value={g.radiation} onChange={set('radiation')} rows={3} />
      </SectionCard>
      <SectionCard title="2.6 Access / Egress" help="Access to and from site, one-way circuits, pedestrian/vehicle separation, unloading, parking.">
        <TextArea label="Response" value={g.accessEgress} onChange={set('accessEgress')} rows={3} />
      </SectionCard>
    </>
  )
}
