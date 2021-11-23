const UK_STATUATORY_RESIDENCE_APP = (() => {
  const state = UK_STATUATORY_RESIDENCE_STATE.getState()
  const questions = UK_STATUATORY_RESIDENCE_STATE.getQuestions()
  const ui = UK_STATUATORY_RESIDENCE_UI.getSelectors()
  const loadEventListeners = () => {
    ui.answerContainer.addEventListener('click', e => {
      console.log(e.target.dataset.qualifies)
      setData(parseFloat(e.target.dataset.nq), e.target.dataset.qualifies)
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
      UK_STATUATORY_RESIDENCE_UI.displayNextQuestion(nq)
      UK_STATUATORY_RESIDENCE_UI.transitionIn()
    }), 800)
  }

  const setData = (id, qualificationBool) => {
    const CQ = questions.find(q => q.id === state.CQ)
    UK_STATUATORY_RESIDENCE_STATE.updatePreviousQuestion(state.CQ)
    UK_STATUATORY_RESIDENCE_STATE.updateCurrentQuestion(id)
    UK_STATUATORY_RESIDENCE_UI.setNextQuestionData(id)
    const NQ = questions.find(q => q.id === id)
    NQ.tieTester === false ?
      UK_STATUATORY_RESIDENCE_STATE.addQualificationReason(qualificationBool, CQ) :
      UK_STATUATORY_RESIDENCE_STATE.updateTies(qualificationBool, CQ)
    nextQuestionUi(NQ)
  }

  const previousQuestion = () => {

  }

  return {
    init: () => {
      loadEventListeners()
    }
  }
})(UK_STATUATORY_RESIDENCE_UI, UK_STATUATORY_RESIDENCE_STATE)

UK_STATUATORY_RESIDENCE_APP.init()