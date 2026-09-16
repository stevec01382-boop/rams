// Default / suggested wording carried over from the Hutchi Master RAMS
// Template, refreshed against current UK guidance where noted. All of this
// is editable per-project in the app -- these are starting points, not
// fixed text, matching the template's own instruction not to leave fields
// as a generic placeholder.

export const GENERIC_PRACTICES_DEFAULTS = {
  manualHandling:
    'Lifting of [insert equipment/materials] -- assessed per the Manual Handling Operations Regulations 1992 (as amended). Mechanical aids and team lifts used where the load/task requires it. Refer to RA03 (Manual Handling).',
  havs:
    'No activities are expected to produce significant Hand-Arm Vibration. All powered hand tools are low-vibration (bought or hired) and exposure is kept below the HAVS exposure action value of 2.5 m/s^2 A(8) per the Control of Vibration at Work Regulations 2005. Refer to RA10 (Noise, Dust & Vibration).',
  noise:
    'Hearing protection (minimum SNR 35 dB, EN352-2) is issued to all engineers for any task above the lower noise exposure action value of 80 dB LEP,d (Control of Noise at Work Regulations 2005). Noise-producing tools are used in short bursts and scheduled to minimise disturbance to occupied areas.',
  radiation:
    'No laser equipment will be used during these works. [If applicable: insert laser class (acceptable: Class 1, 2 or 3A) and specific controls -- warning signage and trained/briefed operatives required for Class 3B or 4].',
  accessEgress:
    'Access to site will only be via the points identified during the site induction. Operatives will follow the principal contractor’s traffic management plan. Materials will be delivered as close to the point of works as feasible. A banksman will accompany vehicle movements where applicable.',
}

export const WORK_AT_HEIGHT_DEFAULTS = {
  hierarchy:
    'All works at height are carried out per the hierarchy of controls in the Work at Height Regulations 2005. Where practicable, works are carried out from a general access scaffold. If space does not allow this, a PASMA-trained operative erects a mobile tower. If space does not allow a tower, podium steps are used. If space does not allow a podium, step ladders are used as a last resort for short-duration, low-risk tasks only. Three points of contact are maintained at all times -- refer to RA07.',
  fallingObjects:
    'Tools and equipment are lifted to the working platform by passing up or mechanical lifting -- never thrown. Toe boards/brick guards are fitted to prevent falling objects. Materials that could roll are contained. A demarcated drop zone / exclusion zone is maintained around the working platform.',
}

export const PLANT_MATERIALS_DEFAULTS = {
  plant: '',
  materials: '',
  technicalInfo: '',
  waste:
    'Operatives collect waste in buckets and remove it to the relevant skips/bins as directed by the principal contractor/client. Waste is segregated (general/recyclable/hazardous) per site requirements and controlled waste is transferred with a valid waste transfer note where required.',
  housekeeping:
    'Materials are kept in low quantities in designated storage areas. Small items are kept in sectioned boxes/buckets. Cables are pulled in with caution to avoid trip hazards. See RA13 (Slips/Trips & Falls).',
  spills:
    'No hazardous liquids are normally used. Operatives refer to the relevant COSHH sheet and a spill kit is available on site for any liquids/fluids in use.',
}

export const PERMITS_DEFAULTS = {
  required: 'no', // 'yes' | 'no'
  type: '',
  issuedBy: '',
  note: 'All operatives are trained and familiar with the Permit to Work process. Permit requirements are confirmed with the principal contractor/client before work starts -- never assumed.',
}

export const TRAINING_DEFAULT =
  'Minimum standard training (post-probation): PASMA (Combined), IPAF 3a/3b, Working at Height, Asbestos Awareness (UKATA), ECS (related discipline). Advanced training: SSSTS, SMSTS. Other training: on-site training (by Project Engineers), use of steps/ladders, manual handling, industry-specific training, access control, and any other training relevant to the scope of works.'

export const PPE_TASK_SPECIFIC_DEFAULT =
  '4-point PPE (helmet, eye protection, hi-vis, safety footwear), chin strap, and appropriate respiratory protection (minimum FFP3 for any dust-generating task) as a baseline. Review and amend to match the actual hazards of this project.'

export const PPE_STANDARDS = {
  hand: [
    'Rigger (outside heavy work) -- Cut Level 1, EN388, or equivalent.',
    'General handling / grip -- EN388, or equivalent.',
    'Cut-resistant -- EN388, or equivalent.',
    'Heat resistance -- EN388 & EN407, or equivalent (select per task).',
  ],
  ear: [
    'For use with hammer drills or other noise-generating equipment. Minimum standard SNR 35 dB, meeting EN352-2. Worn above the lower noise exposure action value of 80 dB LEP,d.',
  ],
  rpe: [
    'RPE must be adequate (suitable for the hazard/exposure level) and suitable (right for the wearer, task and environment). Consider all construction-generated fumes, vapours and dusts including Respirable Crystalline Silica (RCS).',
    'General low-impact work: particle filtration to EN149 FFP2 minimum.',
    'Any RCS-generating work (drilling, chasing, cutting masonry/concrete/tile): minimum FFP3, or half-mask/PAPR with P3 filter for higher-impact or prolonged work. RCS workplace exposure limit is 0.1 mg/m3 (8-hr TWA) per HSE EH40 -- one of the most stringent WELs in the guidance.',
    'Higher-impact / gas-vapour work: half-mask with appropriate filters; specific contamination-free storage; face-fit testing arranged and recorded. Ref. HSG53.',
  ],
  helmet: [
    'Working at height -- conforms to EN397 with chin strap.',
    'General works -- conforms to EN397 (standard company issue).',
  ],
  foot: [
    'Minimum standard (or equivalent) as specified by the company PPE standard. Steel toe cap only -- no composite glass fibre or moulded plastic unless specified.',
  ],
  eye: [
    'Safety eyewear for general use -- protection against UV, low-energy impact and extreme temperature; anti-scratch/anti-fog; adjustable non-slip bridge (or equivalent).',
  ],
  harness: [
    'Harness and lanyards must be checked before every use (mandatory check). Report any doubt about condition to your supervisor immediately -- do not use equipment you are not entirely happy with. Standard company kit or equivalent to EN361/EN354/EN355.',
  ],
}

export const EMERGENCY_DEFAULTS = {
  firstAidKits: 'On all company vehicles, plus site first aid provision per the principal contractor.',
  confinedSpace: 'Not applicable to this scope of works. [Confirm and update if applicable.]',
  fallsFromHeight: 'In accordance with site regulations / first aid provided by the principal contractor where applicable. Emergency services contact confirmed on arrival on site.',
  isolatedWorkAreas: 'Not applicable to this scope of works. [Confirm and update if applicable.]',
  mewpApplicable: false,
  mewpRescue:
    'Failure of upper controls while elevated: operator uses auxiliary controls to lower the boom safely. Operator incapacitated / auxiliary functions fail: an appointed person trained in lower ground controls lowers the platform. Failure of lower ground controls: appointed person uses auxiliary ground controls. Failure of all normal and auxiliary functions: refer to BS8460 section 6.6, Rescue from Height.',
  accidentReporting:
    'Contact the office and report any incident/accident/near miss without delay. Use the current Accident Book carried in company vehicles, or request an Accident/Incident Report Form from the office. Reportable incidents (as defined by RIDDOR 2013) are notified to HSE within the statutory timescale. Reports are allocated a reference number and investigated by senior management; outcomes are recorded and may update company risk assessments or method statements.',
  firstAidOnSite:
    'For sites with a principal contractor, it is their duty to provide a qualified first aider. [Confirm arrangement for this project.]',
  pedestrianTraffic:
    'Operatives adhere to the principal contractor’s traffic management plan for the area of work. [Confirm/insert project-specific detail.]',
  fireSafety:
    '[Confirm whether the works increase fire risk and, if so, the additional controls in place -- e.g. hot works permit, fire watch, extinguisher on hand for any soldering/hot works.]',
  taskLighting:
    '[Confirm lighting arrangements -- e.g. supplied site lights or head torches for detailed works. Portable halogen lighting is not normally permitted on site.]',
}

export const COMMUNICATION_DEFAULTS = {
  briefing:
    'All operatives are made aware of the site-specific methods of working and risk assessments during pre-start meetings and toolbox talks, including those who do not have English as a first language (translated briefing / toolbox talk arranged where required). Operatives sign this document prior to works commencing.',
  monitoring: '[Insert Name] -- [insert telephone]\n[Insert Name] -- [insert telephone]',
  reviewDates:
    'Reviews are carried out as required and checked on each site visit/inspection, or in the event of any accident/incident.',
  amendments:
    '[This section must be completed at the point any amendment is made -- do not leave blank once the RAMS is live.]',
}

export const GENERAL_PRE_START =
  'Prior to works, operatives arrive on site and notify the main contractor/client of their arrival, and undergo any site inductions. Environmental hazards such as asbestos are identified by the client or main contractor with reference to the site asbestos register. If any area of works may contain asbestos, a suitable on-site risk assessment is carried out. Under no circumstances is asbestos disturbed; suitable PPE is worn at all times. Operatives apply this method statement and the attached risk assessments. All equipment and materials are installed, terminated and commissioned by trained, competent personnel to recognised industry standards, whilst maintaining the principal contractor’s/client’s Health & Safety Policy and site rules. At the work area, operatives survey the area with the client/main contractor to identify and deal with any potential hazards before starting, and confirm working instructions with the Project Manager. Designated work areas are cordoned off and kept tidy at all times.'

export const RISK_MATRIX = {
  severity: [
    { v: 1, label: 'No Injury' },
    { v: 2, label: 'Minor Injury' },
    { v: 3, label: '>7 Day Injury' },
    { v: 4, label: 'Major Injury' },
    { v: 5, label: 'Death' },
  ],
  likelihood: [
    { v: 1, label: 'Almost Never' },
    { v: 2, label: 'Seldom' },
    { v: 3, label: 'Possible' },
    { v: 4, label: 'Probable' },
    { v: 5, label: 'Frequently' },
  ],
  bands: [
    { label: 'Low', range: '1-6' },
    { label: 'Medium', range: '8-12' },
    { label: 'High', range: '15-25' },
  ],
}
