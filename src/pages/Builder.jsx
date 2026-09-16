import React, { useMemo, useState } from 'react'
import { STEPS } from '../state/steps.js'
import { stepStatus } from '../lib/validate.js'

import ProjectStep from '../steps/ProjectStep.jsx'
import ScopeStep from '../steps/ScopeStep.jsx'
import RiskAssessmentsStep from '../steps/RiskAssessmentsStep.jsx'
import CoshhStep from '../steps/CoshhStep.jsx'
import GenericPracticesStep from '../steps/GenericPracticesStep.jsx'
import WorkAtHeightStep from '../steps/WorkAtHeightStep.jsx'
import PlantMaterialsStep from '../steps/PlantMaterialsStep.jsx'
import PermitsStep from '../steps/PermitsStep.jsx'
import TrainingStep from '../steps/TrainingStep.jsx'
import PpeStep from '../steps/PpeStep.jsx'
import EmergencyStep from '../steps/EmergencyStep.jsx'
import CommunicationStep from '../steps/CommunicationStep.jsx'
import MethodStatementStep from '../steps/MethodStatementStep.jsx'
import SignOffStep from '../steps/SignOffStep.jsx'
import ReviewStep from '../steps/ReviewStep.jsx'

const STEP_COMPONENTS = {
  project: ProjectStep,
  scope: ScopeStep,
  riskAssessments: RiskAssessmentsStep,
  coshh: CoshhStep,
  genericPractices: GenericPracticesStep,
  workAtHeight: WorkAtHeightStep,
  plantMaterials: PlantMaterialsStep,
  permits: PermitsStep,
  training: TrainingStep,
  ppe: PpeStep,
  emergency: EmergencyStep,
  communication: CommunicationStep,
  methodStatement: MethodStatementStep,
  signoff: SignOffStep,
  review: ReviewStep,
}

export default function Builder({ data, setData, onExit, onNewDraft }) {
  const [idx, setIdx] = useState(0)
  const step = STEPS[idx]
  const StepComponent = STEP_COMPONENTS[step.id]

  const statuses = useMemo(() => STEPS.map(s => stepStatus(s.id, data)), [data])

  function patch(section, patchObj) {
    setData(prev => ({ ...prev, [section]: { ...prev[section], ...patchObj } }))
  }
  function setSection(section, value) {
    setData(prev => ({ ...prev, [section]: value }))
  }

  const goto = (i) => setIdx(Math.max(0, Math.min(STEPS.length - 1, i)))

  return (
    <div className="page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
        <div>
          <h2 style={{ marginBottom: 2 }}>
            {data.project.clientName ? data.project.clientName : 'New RAMS'}
            {data.project.jobRef ? ` — ${data.project.jobRef}` : ''}
          </h2>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Draft auto-saves to this device. Section {idx + 1} of {STEPS.length}.
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-ghost" onClick={onNewDraft}>Start a different RAMS</button>
          <button className="btn btn-secondary btn-sm" onClick={onExit}>Exit to home</button>
        </div>
      </div>

      <div className="layout-with-rail">
        <div className="rail">
          {STEPS.map((s, i) => (
            <button
              key={s.id}
              className={`rail-item ${i === idx ? 'active' : ''} ${statuses[i]}`}
              onClick={() => goto(i)}
            >
              <span className="dot">{statuses[i] === 'done' ? '✓' : s.num || (i + 1)}</span>
              <span>{s.label}</span>
            </button>
          ))}
        </div>

        <div>
          <StepComponent data={data} patch={patch} setSection={setSection} setData={setData} />

          <div className="actions-footer">
            <button className="btn btn-secondary" disabled={idx === 0} onClick={() => goto(idx - 1)}>
              ← Back
            </button>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{step.num} {step.label}</div>
            <button className="btn btn-primary" disabled={idx === STEPS.length - 1} onClick={() => goto(idx + 1)}>
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
