import {
  GENERIC_PRACTICES_DEFAULTS,
  WORK_AT_HEIGHT_DEFAULTS,
  PLANT_MATERIALS_DEFAULTS,
  PERMITS_DEFAULTS,
  TRAINING_DEFAULT,
  PPE_TASK_SPECIFIC_DEFAULT,
  EMERGENCY_DEFAULTS,
  COMMUNICATION_DEFAULTS,
} from '../data/defaults.js'

export function newId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  return 'id-' + Math.random().toString(36).slice(2) + Date.now().toString(36)
}

export function today() {
  return new Date().toISOString().slice(0, 10)
}

function addMonths(dateStr, months) {
  const d = new Date(dateStr)
  d.setMonth(d.getMonth() + months)
  return d.toISOString().slice(0, 10)
}

export function blankOperative() {
  return { id: newId(), name: '', role: '', signature: null, signedAt: null }
}

export function blankCustomRA() {
  return {
    ref: '',
    title: '',
    custom: true,
    personsAffected: [],
    hazards: [{ hazard: '', risk: '', s: 1, l: 1, control: '', rs: 1, rl: 1, notes: '' }],
    reviewDate: addMonths(today(), 12),
  }
}

export function blankCustomCOSHH() {
  return {
    ref: '',
    product: '',
    custom: true,
    manufacturer: '',
    activity: '',
    personsAtRisk: [],
    classifications: [],
    healthRisks: '',
    controls: '',
    firstAid: '',
    storage: '',
    disposal: '',
    reviewDate: addMonths(today(), 12),
  }
}

export function blankCustomMS() {
  return { ref: '', activity: '', custom: true, relatedRA: [], relatedCOSHH: [], steps: [''] }
}

export function createInitialData() {
  return {
    meta: {
      id: newId(),
      createdAt: new Date().toISOString(),
      formVersion: 1,
      status: 'draft', // draft | completed
    },
    project: {
      clientName: '',
      jobRef: '',
      revision: 'Rev0',
      issueDate: today(),
      siteName: '',
      location: '',
      startDate: '',
      startTime: '',
      pmName: '',
      pmPhone: '',
      pmEmail: '',
      personnel: [{ id: newId(), name: '', role: '' }],
      qaReviewerName: '',
      qaReviewDate: '',
    },
    scope: {
      description: '',
    },
    riskAssessments: {
      selected: [], // [{ ref, attachedYes, reviewOverrideDate }]
      custom: [],
    },
    coshh: {
      selected: [],
      custom: [],
    },
    genericPractices: { ...GENERIC_PRACTICES_DEFAULTS },
    workAtHeight: { ...WORK_AT_HEIGHT_DEFAULTS },
    plantMaterials: { ...PLANT_MATERIALS_DEFAULTS },
    permits: { ...PERMITS_DEFAULTS },
    training: TRAINING_DEFAULT,
    ppe: { taskSpecific: PPE_TASK_SPECIFIC_DEFAULT },
    emergency: { ...EMERGENCY_DEFAULTS },
    communication: { ...COMMUNICATION_DEFAULTS },
    methodStatement: {
      selected: [],
      custom: [],
      sequenceNotes: '',
    },
    signOff: {
      operatives: [blankOperative()],
      reviewer: { name: '', role: 'SHEQ / QA Reviewer', signature: null, signedAt: null },
      clientRep: { enabled: false, name: '', role: '', signature: null, signedAt: null },
    },
    distribution: {
      recipients: '',
      message: '',
    },
  }
}
