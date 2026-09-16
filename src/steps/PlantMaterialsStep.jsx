import React from 'react'
import { SectionCard, TextArea } from '../components/Fields.jsx'

export default function PlantMaterialsStep({ data, patch }) {
  const m = data.plantMaterials
  const set = (field) => (v) => patch('plantMaterials', { [field]: v })
  return (
    <>
      <SectionCard title="4.0 Plant / Equipment / Tools" help="List plant and equipment to be used on site.">
        <TextArea label="Plant, hand tools, powered tools and test instruments" value={m.plant} onChange={set('plant')} rows={3} placeholder="e.g. Mobile tower, cordless drills, cable pulling equipment, CAT & Genny, test instruments..." />
      </SectionCard>
      <SectionCard title="4.1 Materials" help='List materials, or confirm a Materials Addendum is genuinely attached — do not state "see addendum" unless it is.'>
        <TextArea label="Materials" value={m.materials} onChange={set('materials')} rows={3} />
      </SectionCard>
      <SectionCard title="4.2 Technical Information" help="Any information critical to H&S (structural engineer reports, previous H&S plans, drawings, specifications). Confirm applicability rather than defaulting to N/A.">
        <TextArea label="Technical information" value={m.technicalInfo} onChange={set('technicalInfo')} rows={3} />
      </SectionCard>
      <SectionCard title="4.3 Waste Removal" help="How will waste be removed? Where are skips/bins? What is the procedure for controlled waste?">
        <TextArea label="Waste arrangements" value={m.waste} onChange={set('waste')} rows={3} />
      </SectionCard>
      <SectionCard title="4.4 Housekeeping and Storage" help="How will materials be stored and housekeeping standards maintained?">
        <TextArea label="Storage arrangements" value={m.housekeeping} onChange={set('housekeeping')} rows={3} />
      </SectionCard>
      <SectionCard title="4.5 Prevention of Leaks and Spills" help="For activities generating water/fluids.">
        <TextArea label="Spill-prevention arrangements" value={m.spills} onChange={set('spills')} rows={3} />
      </SectionCard>
    </>
  )
}
