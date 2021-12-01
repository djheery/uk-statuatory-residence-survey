const UK_STATUATORY_RESIDENCE_STATE = (() => {
  const state = {
    CQ: 0,
    NQ: 1,
    PQ: [],
    PA: [],
    residentInPrevious: false,
    QUALIFIES: [],
    testType: 'AR',
    ties: [],
    tiesNeeded: 0,
    questionType: '',
  }

  const questions = [
    {
      id: -1,
      testType: 'FINAL',
      QC: 'You\'ve finished our survey we hope it helped you, if you have any issues regarding UK tax do not hesitate to <a href="https://bambridgeaccountants.com/contact-us" target="_blank" class="blog-link">contact us</a>.',
      NQ: [-1],
      PQ: state.PQ,
      PA: state.PA,
      QUALIFIES: state.QUALIFIES,
      CT: state.test,
      ties: state.ties,
      tieCount: state.ties.length
    },
    {
      id: 1,
      testType: 'AR',
      QC: 'Have you worked in the UK for 365 days with no sufficient break?',
      options: ['Yes', 'No'],
      tieTester: false,
      NQ: [3, 2],
      QUALIFIES: [true, false],
      CT: "automatic",
      type: 'RADIO',
      statement: 'If you work in the UK for 365 days with no sufficient break, you will be considered a resident under the \'Automatic Residence Test\''
    },
    {
      id: 2,
      testType: 'AR',
      QC: 'Have you spent over 183 days in the UK?',
      options: ['Yes', 'No'],
      tieTester: false,
      NQ: [3],
      QUALIFIES: [true, false],
      type: 'RADIO',
      statement: 'If you have spent over 183 days in the UK it is likley that you will be considered a resident under the \'Automatic Residence Test\''
    },
    {
      id: 3,
      testType: 'AR',
      QC: 'Do you own a Home in the UK?',
      options: ['Yes', 'No'],
      tieTester: false,
      NQ: [31, 4],
      QUALIFIES: [false, false],
      type: 'RADIO',
      statement: ''
    },
    {
      id: 31,
      testType: 'AR',
      QC: 'Have you spent 91 consecutive days (3 months) at this Home in the past year?',
      options: ['Yes', 'No'],
      tieTester: false,
      NQ: [4],
      QUALIFIES: [true, false],
      type: 'RADIO',
      statement: 'If you have spent 91 consecutive days in your UK home you will be considered a resident under the \'Automatic Residence Test\''
    },
    {
      id: 4,
      testType: 'AR',
      QC: 'Your answers indicate that you <span class="fw-bold">do not</span> qualify as a UK resident under the Automatic residence test. Would you like to take the sufficient ties test?',
      options: ['Yes', 'No'],
      tieTester: false,
      NQ: [5, -1],
      QUALIFIES: [false, false],
      type: 'RADIO',
      statement: '',
    },
    {
      id: 5,
      testType: 'ST',
      QC: 'Do you have accommodation in the United Kingdom?', 
      options: ['Yes', 'no'],
      tieTester: false,
      NQ: [51, 6],
      QUALIFIES: [false, false],
      type: 'RADIO',
      statement: '',
    },
    {
      id: 51,
      testType: 'ST',
      QC: 'Has this accommodation been available to you for a continuous period of at least 91 days (3 months)',
      options: ['Yes', 'No'],
      tieTester: false,
      NQ: [511, 52],
      QUALIFIES: [false, false],
      type: 'RADIO',
      statement: ''
    },
    {
      id: 511,
      testType: 'ST',
      QC: 'Have you spent <span class="fw-bold">one or more</span> night in this accommodation in the chosen tax year?',
      options: ['Yes', 'No'],
      tieTester: true,
      NQ: [6, 52],
      QUALIFIES: [true, false],
      tie: 'accomodation',
      type: 'RADIO',
      statement: 'By having available, and staying in bought or rented accomodation the you qualify for the accomodation tie to the UK',
    },
    {
      id: 52,
      testType: 'ST', 
      QC: 'Is this accommodation owned by a close relative? ',
      options: ['Yes', 'No'],
      tieTester: false,
      NQ: [521, 6],
      QUALIFIES: [false, false],
      tieQualifier: 'accomodation',
      tie: 'accomodation',
      type: 'RADIO',
      statement: '',
    }, 
    {
      id: 521,
      testType: 'ST', 
      QC: 'Have you stayed at this accomodation for more 16 or more nights? ',
      options: ['Yes', 'No'],
      tieTester: true,
      NQ: [6],
      QUALIFIES: [true, false],
      tie: 'accomodation',
      type: 'RADIO',
      statement: 'If you stay with a close relative for 16 or more nights, you are considered having an accomodation tie in the UK.',
    },
    {
      id: 6,
      testType: 'ST', 
      QC: 'Do you have a spouse or civil partner whom is located in the UK?',
      options: ['Yes', 'No'],
      tieTester: true,
      NQ: [7, 61],
      QUALIFIES: [true, false],
      tie: 'family',
      type: 'RADIO',
      statement: 'If you have a spouse or civil partner whom is located in the UK you <span class="fw-bold">may be</span> considered to have a family tie, for the purpouse of this survey we have counted this as 1 family tie.',
    },
    {
      id: 61,
      testType: 'ST', 
      QC: 'Are you the parent of a child that is considered a UK resident, and is under the age of 18 ?',
      options: ['Yes', 'No'],
      tieTester: true,
      NQ: [7],
      QUALIFIES: [true, false],
      tie: 'family',
      type: 'RADIO',
      statement: 'If you have a child under the age of 18, whom is located in the UK you <span class="fw-bold">may be</span> considered to have a family tie, for the purpouse of this survey we have counted this as family tie.',
    },
    {
      id: 7,
      testType: 'ST', 
      QC: 'Have you worked in the UK for 40 or more days (whether continuosly or intermittently)? - A work day is considered working for a period of three or more hours',
      options: ['Yes', 'No'],
      tieTester: true,
      NQ: [8],
      QUALIFIES: [true, false],
      tie: 'work',
      type: 'RADIO',
      statement: 'If you worked in the UK for 40 or more days, you are considered to have a work tie to the uk',
    },
    {
      id: 8,
      testType: 'ST', 
      QC: 'Have you spent 90 days (3 months) or more in this or any of the 3 tax years preceeding the tax year in question?',
      options: ['Yes', 'No'],
      tieTester: true,
      NQ: [9],
      QUALIFIES: [true, false],
      tie: '90 day',
      type: 'RADIO',
      statement: 'If you spent 90 or more days in the UK in this or any of the 3 tax years preceeding the tax year in question, you are considered to have a 90 day tie to the UK',
    },
    {
      id: 9,
      testType: 'ST', 
      QC: 'In the tax year in question, have you spent the majority of your days in the UK?',
      options: ['Yes', 'No'],
      tieTester: true,
      NQ: [10],
      QUALIFIES: [true, false],
      tie: '90 day',
      type: 'RADIO',
      statement: 'If the majority of your year has been spent in the UK, you are considered to have a country tie to the UK.',
    },
    {
      id: 10,
      testType: 'ST', 
      QC: 'Were you a resident in any of the previous tax years?',
      options: ['Yes', 'No'],
      tieTester: false,
      NQ: [11, 12],
      QUALIFIES: [false, false],
      tie: 'RESIDENCY',
      type: 'RADIO',
      statement: 'If you were a resident in previous years this affects how many ties you need to be considered a UK resident.',
    },
    {
      id: 11,
      testType: 'ST', 
      QC: 'How many days did you spend in the UK in the Tax year?',
      options: ['More than 45 but Fewer than 91', 'More than 90 but fewer than 121', 'More than 120', 'None of these'],
      tieTester: false,
      NQ: [-1],
      QUALIFIES: [false, false],
      tiesNeeded: [4, 3, 2, 'DNQ'],
      type: 'SELECT',
      statement: 'If you were a resident in previous years this affects how many ties you need to be considered a UK resident.',
    },
    {
      id: 12,
      testType: 'ST', 
      QC: 'How many days did you spend in the UK in the Tax year?',
      options: ['More than 15 but fewer than 46 ','More than 45 but Fewer than 91', 'More than 90 but fewer than 121', 'More than 120', 'None of these'],
      tieTester: false,
      NQ: [-1],
      QUALIFIES: [false, false],
      tiesNeeded: [4, 3, 2, 1, 'DNQ'],
      type: 'SELECT',
      statement: 'If you were a resident in previous years this affects how many ties you need to be considered a UK resident.',
    }
  ]

  return {
    getQuestions: () => {
      return questions
    },
    getState: () => {
      return state
    },
    updateCurrentQuestion: (CQ) => {
      state.CQ = CQ
    },
    updateNextQuestion: (NQ) => {
      state.NQ = NQ 
    },
    updatePreviousQuestion: (PQ, t, type) => {
      state.PQ.push(PQ)
    }, 
    removePreviousQuestion: (Q) => {
      state.PQ.pop()
      state.PA.pop()
    },
    addQualificationReason: (bool, q) => {
      if (bool != 'false') {
        state.QUALIFIES.push({question: q.id, statement: q.statement})
        console.log(state.QUALIFIES)
      } 
    },
    updateTies: (bool, q) => {
      if(bool != 'false')
        state.ties.push({tie: q.tie, statement: q.statement})
    }, 
    updateQuestionType: (type) => {
      state.type = type
    },
    updateTiesNeeded: (tn) => {
      state.tiesNeeded = tn
    }, 
    checkTestType: (tt) => {
      if(tt !== state.testType) state.testType = tt
      return state.testType
    },
    checkAutoResident: () => {
      const result = state.QUALIFIES.length >= 1 ? true : false
      console.log(result)
      return result 
    }
  }
})()