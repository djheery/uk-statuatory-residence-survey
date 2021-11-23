const UK_STATUATORY_RESIDENCE_STATE = (() => {
  const state = {
    CQ: 0,
    NQ: 1,
    PQ: [],
    PA: [],
    QUALIFIES: [],
    ties: [],
    questionType: '',
  }

  const questions = [
    {
      id: -1,
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
      QC: 'Have you spent <span class="fw-bold">one or more</span> night in this accommodation in the chosen tax year?',
      options: ['Yes', 'No'],
      tieTester: false,
      NQ: [6, 52],
      QUALIFIES: [true, false],
      tie: 'accomodation',
      type: 'RADIO',
      statement: 'By having, and staying in bought or rented accomodation the United Kingdom',
    },
    {
      id: 52, 
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
      QC: 'Have you stayed at this accomodation for more 16 or more nights? ',
      options: ['Yes', 'No'],
      tieTester: false,
      NQ: [521, 6],
      QUALIFIES: [true, false],
      tie: 'accomodation',
      type: 'RADIO',
      statement: '',
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
    updateTies: (tie, statement) => {

      state.ties.push({tie, statement})
    }, 
    updateQuestionType: (type) => {
      state.type = type
    }
  }
})()