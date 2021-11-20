const SEISS_SURVEY_APP = (() => {
  const state = SEISS_SURVEY_STATE.getState()
  const questions = SEISS_SURVEY_STATE.getQuestions()
  const ui = SEISS_SURVEY_UI.getSelectors()
  const loadEventListeners = () => {
    ui.answerContainer.addEventListener('click', e => nextQuestion(e))
    ui.btnContainer.addEventListener('click', checkQuestion)
  }

  const checkQuestion = (e) => {
    if(e.target.classList.contains('prev-btn')) previousQuestion()
    if(e.target.classList.contains('start-survey-btn')) nextQuestion()
  }

  const nextQuestion = (e) => {
    SEISS_SURVEY_UI.transitionOut()
    setTimeout(() => {
      const targetID = parseInt(ui.answerContainer.dataset.nextquestion)
      const nextQuestion = questions.find(q => q.id === targetID)
        if(e) {
          if(e.target.dataset.dnq !== 'false') {
            SEISS_SURVEY_STATE.updateDoesNotQualify(questions.find(q => q.id === state.CQ)) 
          }
        }
      SEISS_SURVEY_STATE.updateCurrentQuestion(nextQuestion.id)
      SEISS_SURVEY_STATE.updateNextQuestion(nextQuestion.NQ[0])
      nextQuestion.id !== -1 ?
        SEISS_SURVEY_UI.displayNextQuestion(nextQuestion) :
        SEISS_SURVEY_UI.displayFinalVerdict(nextQuestion)
      SEISS_SURVEY_UI.transitionIn()
    }, 800)
  }

  const previousQuestion = () => {

  }

  return {
    init: () => {
      loadEventListeners()
    }
  }
})(SEISS_SURVEY_UI, SEISS_SURVEY_STATE)

SEISS_SURVEY_APP.init()