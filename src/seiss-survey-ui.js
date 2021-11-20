const SEISS_SURVEY_UI = (() => {
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
    displayNextQuestion: (q) =>  {
      selectors.btnContainer.innerHTML = ''
      if(q.id !== -1) {
        selectors.answerContainer.dataset.nextquestion = q.NQ[0]
        selectors.questionContainer.innerHTML = q.QC
        selectors.answerContainer.innerHTML = ''
        for(let i = 0; i < q.options.length; i++) {
          selectors.answerContainer.innerHTML += `
          <div class="radio-btn-container radio-y-n">
            <label for="survey-question" class="survey-option">${q.options[i]}</label>
            <input type="radio" name="survey-radio-btn" id="survey-radio-btn" class="survey-radio-btn" data-dnq="${q.DNQ[i]}">
          </div>
          `
        }
      }
    },
    displayPreviousQuestion: () => {

    },
    displayFinalVerdict: (Q) => {
      selectors.questionContainer.innerHTML = ``
      selectors.answerContainer.innerHTML = ``
      if(Q.DNQ.length >= 1) {
        selectors.resultsContainer.innerHTML = `
        <div class="final-verdict-container">
          <p>The answers you have provided indicate that you <span class="fw-bold">do not qualify</span> for the SEISS 5 grant. Based on the answers provided the following reasons may be why we have come to this conclusion</p>
          <ul class="reasons mgb-20"></ul>
        </div>

        `
        const reasons = document.querySelector('.reasons')
        for(let i = 0; i < Q.DNQ.length; i++) {
          reasons.innerHTML += `
            <li>${Q.DNQ[i].statement}</li>
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