const SEISS_SURVEY_STATE = (() => {
  const state = {
    CQ: 0,
    NQ: 1,
    PQ: [],
    PA: [],
    DNQ: []
  }

  const questions = [
    {
      id: -1,
      QC: 'You\'ve finished our survey we hope it helped you, if you have any issues regarding UK tax do not hesitate to <a href="https://bambridgeaccountants.com/contact-us" target="_blank" class="blog-link">contact us</a>.',
      NQ: [-1],
      PQ: state.PQ,
      PA: state.PA,
      DNQ: state.DNQ
    },
    {
      id: 1,
      QC: 'Have you worked in the UK for 365 days with no sufficient break?',
      options: ['Yes', 'No'],
      NQ: [3, 2],
      DNQ: [true, false],
      statement: 'If you work in the UK for 365 days with no sufficient break, you will be considered a resident under the \'Automatic Residence Test\''
    },
    {
      id: 2,
      QC: 'Have you spent over 183 days in the UK?',
      options: ['Yes', 'No'],
      NQ: [3],
      DNQ: [false, true],
      statement: 'If you have spent over 183 days in the UK it is likley that you will be considered a resident under the \'Automatic Residence Test\''
    },
    {
      id: 3,
      QC: 'Do you own a Home in the UK?',
      options: ['Yes', 'No'],
      NQ: [31, 4],
      DNQ: [false, false],
      statement: ''
    },
    {
      id: 31,
      QC: 'Have you spent 91 consecutive days (3 months) at this Home in the past year?',
      options: ['Yes', 'No'],
      NQ: [4],
      DNQ: [true, false],
      statement: 'If you have spent 91 consecutive days in your UK home you will be considered a resident under the \'Automatic Residence Test\''
    },
    {
      id: 4,
      QC: 'Have you carried out trade in <span class="fw-bold">both</span> 2019/20 and 2020/21',
      options: ['Yes', 'No'],
      NQ: [4],
      DNQ: [false, true],
      statement: 'You must have carried out trade in both the 2019/20 and 2020/21 tax years',
    },
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
    updateDoesNotQualify: (q) => {
    
      state.DNQ.push({question: q.id, statement: q.statement})
    }
  }
})()