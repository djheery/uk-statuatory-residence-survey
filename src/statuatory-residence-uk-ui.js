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
      return NQ
    },
    displaySelectQuestion: (q) => {
      selectors.answerContainer.innerHTML += `
        <div class="survey-select-container"> 
          <select name="survey-select-box" class="select-box" id="survey-select-box">

          </select>
        </div>
      `
      const selectBox = document.querySelector('#survey-select-box')
      for(let i = 0; i < q.options.length; i++) {
        selectBox.innerHTML += `
        <option value="${q.options[i]}" data-tiesNeeded=${q.tiesNeeded[i]} data-NQ='${UK_STATUATORY_RESIDENCE_UI.setNextQuestionDataset(i, q)}'>${q.options[i]}</option>`
      } 
    },
    displayPreviousQuestion: () => {

    },
    displayFinalVerdict: (Q, dnq, st, stn) => {
      selectors.questionContainer.innerHTML = ``
      selectors.answerContainer.innerHTML = ``
      if(dnq !== null) {
        Q.QUALIFIES.length >= 1 ? 
        UK_STATUATORY_RESIDENCE_UI.automaticResidenceTestQualifies(dnq) : 
        UK_STATUATORY_RESIDENCE_UI.automaticResidenceTestDNQ()
      } else {
          console.log(st, stn)
          stn >= st.length ? 
            UK_STATUATORY_RESIDENCE_UI.sufficientTiesTestQualifies(st, stn) :
            UK_STATUATORY_RESIDENCE_UI.sufficientTiesTestDNQ()
      }
      
      
      UK_STATUATORY_RESIDENCE_UI.displayFinalResultLine(Q)
    },
    automaticResidenceTestQualifies: (q) => {
      selectors.resultsContainer.innerHTML = `
      <div class="final-verdict-container">
        <p>The answers you have provided indicate that <span class="fw-bold">you may qualify</span> as a UK resident according to the "Automatic Residence test".<br>Our reasoning for coming to this conclusion is based on your answers. You can find the reasoning below. We reccomend that you contact a proffessional before declaring as a UK resident, they can help you understand the full extent of your residency status.</p>
        <ul class="reasons ar-test"></reasons>
      </div>`
      const reasons = document.querySelector('.reasons')
      UK_STATUATORY_RESIDENCE_UI.findAnswers(reasons, q)
    },
    automaticResidenceTestDNQ: () => {
      selectors.resultsContainer.innerHTML = `
      <div class="final-verdict-container">
        <p>The answers you have provided indicate that you <span class="fw-bold">do not qualify</span> as a UK resident according to the "Automatic Residence test".<br>You have chosen not to take the "sufficient ties test"; however,if you have reason to believe you may be classed as a UK resident, we reccomend you consult a professional.</p>
      </div>
      `
    },
    sufficientTiesTestDNQ: () => {
      selectors.resultsContainer.innerHTML = `
      <div class="final-verdict-container">
        <p>The answers you have provided indicate that you <span class="fw-bold">do not qualify</span> as a UK resident according to the "Automatic Residence test" and the "Sufficient Ties Test".<br>However,if you have reason to believe you may be classed as a UK resident, we reccomend you consult a professional.</p>
      </div>
      `
    },
    sufficientTiesTestQualifies: (st, stn) => {
      selectors.resultsContainer.innerHTML = `
      <div class="final-verdict-container">
        <p>The answers you have provided indicate that <span class="fw-bold">you may qualify</span> as a UK resident according to the "Sufficient Ties Test".<br>As an individual that spends ---ANSWER--- days in the UK you need ${stn} ties to qualify as a UK resident. Your answers show that you have met this qualification. The ties you have qualified for and their reasons are listed below.</p>
        <ul class="reasons st-test"></reasons>
      </div>`
      const reasons = document.querySelector('.reasons')
      UK_STATUATORY_RESIDENCE_UI.findAnswers(reasons, st)
    },
    displayReasonsSTT: (container, arr) => {
      for(i = 0; i < arr.length; i++) {
        container.innerHTML += `
          <li>${arr[i].tie}</li>
          <ul>
            <li>${arr[i].statement}</li>
          </ul>
        `
      }
    },
    displayReasonsAR: (container, arr) => {
      for(i = 0; i < arr.length; i++) {
        container.innerHTML += `
          <li>${arr[i].statement}</li>
        `
      }
    },
    findAnswers: (container, arr) => {
      container.classList.contains('ar-test') ?
        UK_STATUATORY_RESIDENCE_UI.displayReasonsAR(container, arr) :
        UK_STATUATORY_RESIDENCE_UI.displayReasonsSTT(container, arr)
    },
    displayFinalResultLine: (q) => {
      document.querySelector('.final-verdict-container').innerHTML += `
      <p>${q.QC}</p>
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