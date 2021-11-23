const UK_STATUATORY_RESIDENCE_UI = (() => {
  const selectors = {
    questionContainer: document.querySelector('.question-container'),
    btnContainer: document.querySelector('.question-btn__container'),
    answerContainer: document.querySelector('.answer-options-container'),
    confirmAnswerBtn: document.querySelector('.confirm-answer'),
    prevQuestion: document.querySelector('.prev-question'),
    resultsContainer: document.querySelector('.final-results-container')
  }

  return {
    getSelectors: () => {
      return selectors
    },
    setNextQuestionData: (id, qualifies) => {
      selectors.answerContainer.dataset.nextquestion = id;
      selectors.answerContainer.dataset.qualifies = qualifies
    },
    displayNextQuestion: (q) =>  {
      selectors.btnContainer.innerHTML = ''
      selectors.answerContainer.dataset.nextquestion = ''
      selectors.questionContainer.innerHTML = q.QC
      selectors.answerContainer.innerHTML = ''
      if(q.type === 'RADIO') UK_STATUATORY_RESIDENCE_UI.displayRadioQuestion(q)
      if(q.type === 'SELECT') UK_STATUATORY_RESIDENCE_UI.displaySelectQuestion(q)

    },
    displayRadioQuestion: (q) => {
      console.log(q.options)
      for(let i = 0; i < q.options.length; i++) {
        selectors.answerContainer.innerHTML += `
        <div class="radio-btn-container radio-y-n">
          <label for="survey-question" class="survey-option">${q.options[i]}</label>
          <input type="radio" data-NQ='${UK_STATUATORY_RESIDENCE_UI.setNextQuestionDataset(i, q)}' name="survey-radio-btn" id="survey-radio-btn" class="survey-radio-btn" data-QUALIFIES="${q.QUALIFIES[i]}">
        </div>
        `
      }

    },
    setNextQuestionDataset: (i, q) => {
      const NQ = q.NQ.length > 1 ? q.NQ[i] : q.NQ[0]
      console.log(NQ)
      return NQ
    },
    displaySelectQuestion: (q) => {
      selectors.answerContainer.innerHTML += `
        <div class="survey-select-container"> 
          <select name="survey-select-box" id="survey-select-box">

          </select>
        </div>
      `
      const selectBox = document.querySelector('#survey-select-box')
      for(let i = 0; i < q.selectOptions.length; i++) {
        selectBox.innerHTML += `<option value="${q.selectOptions.selectValue}">${q.selectOptions.selectTitle}</option>`
      } 
    },
    displayPreviousQuestion: () => {

    },
    displayFinalVerdict: (Q) => {
      selectors.questionContainer.innerHTML = ``
      selectors.answerContainer.innerHTML = ``
      if(Q.QUALIFIES.length >= 1) {
        selectors.resultsContainer.innerHTML = `
        <div class="final-verdict-container">
          <p>The answers you have provided indicate that you <span class="fw-bold">do not qualify</span> for the SEISS 5 grant. Based on the answers provided the following reasons may be why we have come to this conclusion</p>
          <ul class="reasons mgb-20"></ul>
        </div>

        `
        const reasons = document.querySelector('.reasons')
        for(let i = 0; i < Q.QUALIFIES.length; i++) {
          reasons.innerHTML += `
            <li>${Q.QUALIFIES[i].statement}</li>
          `
        }
      } else {
        selectors.resultsContainer.innerHTML = `
        <div class="final-verdict-container">
          <p class="mgb-20">The answers you have provided indicate that <span class="accent-clr fw-bold"> you do qualify </span> for the SEISS 5 grant. We reccomend you log in to your Self Assesment portal to find out further details on how you cab claim the grant.</p>
        </div>
        `
      }
      
      document.querySelector('.final-verdict-container').innerHTML += `
        <p>${Q.QC}</p>
      `
    },
    setBtnData: () => {

    },
    transitionOut: () => {
      selectors.answerContainer.classList.remove('transition-two')
      selectors.questionContainer.classList.remove('transition-two')
      selectors.answerContainer.classList.add('transition')  
      selectors.questionContainer.classList.add('transition')  
    },
    transitionIn: () => {
      selectors.answerContainer.classList.remove('transition')
      selectors.questionContainer.classList.remove('transition')
      selectors.answerContainer.classList.add('transition-two')
      selectors.questionContainer.classList.add('transition-two')
    },
  }
})()