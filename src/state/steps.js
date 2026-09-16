export const STEPS = [
  { id: 'project', num: '', label: 'Document Control & Project Details' },
  { id: 'scope', num: '1.0', label: 'Scope of Works' },
  { id: 'riskAssessments', num: '2.0', label: 'Risk Assessments' },
  { id: 'coshh', num: '2.1', label: 'COSHH Assessments' },
  { id: 'genericPractices', num: '2.2-2.6', label: 'Generic Working Practices' },
  { id: 'workAtHeight', num: '3.0-3.1', label: 'Work at Height' },
  { id: 'plantMaterials', num: '4.0-4.5', label: 'Plant, Materials & Site Controls' },
  { id: 'permits', num: '5.0', label: 'Permits' },
  { id: 'training', num: '6.0', label: 'Training' },
  { id: 'ppe', num: '7.0', label: 'PPE' },
  { id: 'emergency', num: '8.0', label: 'Emergency Arrangements' },
  { id: 'communication', num: '9.0', label: 'Communication & Review' },
  { id: 'methodStatement', num: '11.0', label: 'Method Statement' },
  { id: 'signoff', num: '', label: 'Sign-off & Signatures' },
  { id: 'review', num: '', label: 'Review, PDF & Send' },
]

export function stepIndex(id) {
  return STEPS.findIndex(s => s.id === id)
}
