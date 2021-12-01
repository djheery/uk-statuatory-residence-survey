  const UK_STATUATORY_RESIDENCE_APP = (() => {
  const state = UK_STATUATORY_RESIDENCE_STATE.getState()
  const questions = UK_STATUATORY_RESIDENCE_STATE.getQuestions()
  const ui = UK_STATUATORY_RESIDENCE_UI.getSelectors()
  const loadEventListeners = () => {      
      ui.answerContainer.addEventListener('change', e => {
        let targetQuestion = e.target.dataset.nq; 
        let qualifies = e.target.dataset.qualifies; 
        if(e.target.classList.contains('select-box')) {
          targetQuestion = getSelectQuestion(e.target);
          qualifies = parseFloat(getTiesNeeded(e.target));
        }
      setData(parseFloat(targetQuestion), qualifies)
    })
    ui.btnContainer.addEventListener('click', checkQuestion)
  }

  const checkQuestion = (e) => {
    if(e.target.classList.contains('prev-btn')) previousQuestion()
    if(e.target.classList.contains('start-survey-btn')) setData(1, 'false')
  }

  const nextQuestionUi = (nq) => {
    UK_STATUATORY_RESIDENCE_UI.transitionOut()
    setTimeout((() => {
      nq.id === -1 ? console.log(true) : UK_STATUATORY_RESIDENCE_UI.displayNextQuestion(nq)
      UK_STATUATORY_RESIDENCE_UI.transitionIn()
    }), 800)
  }

  const setData = (id, qualificationBool) => {
    const CQ = questions.find(q => q.id === state.CQ)
    UK_STATUATORY_RESIDENCE_STATE.updatePreviousQuestion(state.CQ)
    UK_STATUATORY_RESIDENCE_STATE.updateCurrentQuestion(id)
    UK_STATUATORY_RESIDENCE_UI.setNextQuestionData(id)
    const NQ = questions.find(q => q.id === id)
    const testType = UK_STATUATORY_RESIDENCE_STATE.checkTestType(NQ.testType)
    if(testType === 'FINAL') prepareResults(id, NQ, CQ, qualificationBool)
    testType === 'AR' ? autoresidentTest(id, NQ, CQ, qualificationBool) : sufficienttiesTest(id, NQ, CQ, qualificationBool)
  }

  const autoresidentTest = (id, nq, cq, bool) => {
    if(id === 4 && UK_STATUATORY_RESIDENCE_STATE.checkAutoResident() === true) {
      UK_STATUATORY_RESIDENCE_UI.displayFinalVerdict(
        questions.find(q => q.id === -1),
        state.QUALIFIES,
        null, null)
    } else {
      UK_STATUATORY_RESIDENCE_STATE.addQualificationReason(bool, cq)
      nextQuestionUi(nq)
    }
  }

  const sufficienttiesTest = (id, nq, cq, bool) => {
    if(id === -1) {
      console.log(bool)
      const tiesNeeded = state.tiesNeeded;
      prepareResults(id, nq, null, null, state.ties, tiesNeeded)
      console.log(state.ties, state.tiesNeeded);
    } else {
      UK_STATUATORY_RESIDENCE_STATE.updateTies(bool, cq)
      nextQuestionUi(nq)
    }
  }

  const prepareResults = (id, nq, cq, bool, ties, tiesNeeded) => {
    if(cq.id === 4) {
      UK_STATUATORY_RESIDENCE_UI.displayFinalVerdict(nq, state.QUALIFIES, null, null)
    } else {
      UK_STATUATORY_RESIDENCE_UI.displayFinalVerdict(nq, null, ties, tiesNeeded)
    }
  }

  const previousQuestion = () => {

  }

  const getSelectQuestion = (target) => {
     return target.options[target.selectedIndex].dataset.nq
  }

  const getTiesNeeded = (target) => {
    return target.options[target.selectedIndex].dataset.tiesneeded
  };

  return {
    init: () => {
      loadEventListeners()
    }
  }
})(UK_STATUATORY_RESIDENCE_UI, UK_STATUATORY_RESIDENCE_STATE)

UK_STATUATORY_RESIDENCE_APP.init()