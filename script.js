'use strict';
const questionSet = [
  { 
    number: 1,
    text: `In this show two friends go on many odd adventures. One is a human boy, the other is a dog with unique abilities. 
What is the name of the human boy?`,
    ans1: `Finn`,
    ans2: `Jake`, 
    ans3: `Shelby`, 
    ans4: `Simon`
  }, 

  {
    number: 2,
    text: `What is Finn's purpose in life?`,
    ans1: `Travel and conquer the Land of Ooo`, 
    ans2: `Eat as many Eggo waffles as humanly possible`, 
    ans3: `Help anyone who needs help`, 
    ans4: `Master the Yo-Yo`
  }, 

  {
    number: 3,
    text: `Here's a sweet question: Who rules the Candy Kingdom?`,
    ans1: `Cinnamon Bun`, 
    ans2: `Princess Bubblegum`, 
    ans3: `Ice King`, 
    ans4: `Lumpy Space Princess`
  }, 
  {
    number: 4, 
    text: `Which episode was the first aired on Adventure Time?`,
    ans1: `Puhoy`, 
    ans2: `Her Parents`, 
    ans3: `Slumber Party Panic`, 
    ans4: `The Chamber of Frozen Blades`
  }, 
  {
    number: 5,
    text: `Which of these super abilities does NOT apply to Jake?`,
    ans1: `Fantastic stretching`, 
    ans2: `Powerful imagination`, 
    ans3: `Incredible shrinking`,
    ans4: `Super speed`
  }, 
  {
    number: 6,
    text: `What is Princess Bubblegum's favorite pastime?`,
    ans1: `Science`, 
    ans2: `Math`, 
    ans3: `Scrabble`, 
    ans4: `Gardening`
  }, 
  {
    number: 7,
    text: `Marceline the Vampire Queen is not a traditional vampire. What does she primarily eat?`,
    ans1: `Snails`, 
    ans2: `Ramen`, 
    ans3: `Shades of red`, 
    ans4: `Maple syrup`
  }, 
  {
    number: 8,
    text: `What is the animal that can be seen somewhere in every episode?`,
    ans1: `Dog`, 
    ans2: `Beaver`, 
    ans3: `Platypus`, 
    ans4: `Snail`
  }, 
  {
    number: 9,
    text: `Which of these is a Candy Kingdom resident who has been known to deal with dark magic?`,
    ans1: `Starchy`, 
    ans2: `Cinnamon Bun`, 
    ans3: `Peppermint Butler`, 
    ans4: `Mr. Cupcake`
  }, 
  {
    number: 10,
    text: `Which of the following is NOT a princess?`,
    ans1: `Ghost Princess`, 
    ans2: `Ice Princess`, 
    ans3: `Flame Princess`, 
    ans4: `Princess Princess Princess`
  }
];

const ANSWERS = [ 
  `Finn`, 
  `Help anyone who needs help`,
  `Princess Bubblegum`, 
  `Slumber Party Panic`, 
  `Super speed`, 
  `Science`, 
  `Shades of red`, 
  `Snail`, 
  `Peppermint Butler`,
  `Ice Princess`
];

let questionNum = 1;

let correctAnswers = 0;

function questionTemplate(correctAnswers, question, questionsAnswered) {
  return `
    <section id="question-page" role="main">
    <h2 id="question">${question.text}</h2>
    
    <form>
      <fieldset>
        <label>
          <input class="answer" type="radio" name="option" checked></input>
          <span>${question.ans1}</span>
        </label>
  
        <label>
          <input class="answer" type="radio" name="option"></input>
          <span>${question.ans2}</span>
        </label>
  
        <label>
          <input class="answer" type="radio" name="option"></input>
          <span>${question.ans3}</span>
        </label>
  
        <label>
          <input class="answer" type="radio" name="option"></input>
          <span>${question.ans4}</span>
        </label>
      </fieldset>  
      <button id="submit-button">Submit</button>
    </form>
    <div id="status-bar">
      <span id="question-count">Question: ${question.number}/10</span>
      <span id="score-count">Score: ${correctAnswers}/${questionsAnswered}</span>
    </div>
  </section>
  `;
}

function handleStartButton() {
  $('#start-button').click(function(event){
    event.preventDefault()
    nextQuestion();
  });
}

function handleSubmitButton() {
  $('.quiz-box').on('click', '#submit-button', function(event) {
    event.preventDefault()

    const answer = $('input:checked').siblings('span');

    const userIsCorrect = checkUserAnswer(answer);
    if(userIsCorrect) {
      generateCorrectFeedback();
    } else {
      generateIncorrectFeedback();
    }
  });
}

function handleNextButton() {
  $('.quiz-box').on('click', '#next-button', function(event) {
    event.preventDefault()

    if(questionNum === 10) {
      createResultsPage(correctAnswers);
    } else {
      iterateQuestion();
      nextQuestion();
  }
  });
}

function handleRestartButton() {
  $(".quiz-box").on('click', '#start-over-button', function(event) {
    event.preventDefault()
    questionNum = 1;

    correctAnswers = 0;

    nextQuestion();
  });
}

function nextQuestion() {

  const question = questionSet[questionNum - 1];

  const questionsAnswered = questionNum - 1;

  $(".quiz-box").html(questionTemplate(correctAnswers, question, questionsAnswered));

  $("#start-button").hide();
}

function checkUserAnswer(answer) {
  if(answer.text() === ANSWERS[questionNum - 1]) {
    return true;
  } else {
    return false;
  }
}

function generateCorrectFeedback() {
  $(".quiz-box").html(correctFeedback);
  iterateCorrectAnswers();
}

const correctFeedback = `
  <section class="feedback-page" role="main">
    <h2>Yaaasss!</h2>
<img id="feedback-img" src ="https://media.giphy.com/media/13p77tfexyLtx6/giphy.gif" alt = "Jake and Dancing Bug">
    <button id="next-button">Next</button>
  </section>
`;

function generateIncorrectFeedback() {
  $(".quiz-box").html(incorrectFeedbackTemplate(questionNum));
}

function incorrectFeedbackTemplate(questionNum) {
  return `
    <section class="feedback-page" role="main">
      <h2>Dungeon! One million years!!! It was: ${ANSWERS[questionNum - 1]}!</h2>
      <img id="feedback-img" src="https://media.giphy.com/media/3eKdC7REvgOt2/giphy.gif" alt="Lemongrab Screaming.">
      <button id="next-button">Next</button>
    </section>
`;
}

function iterateQuestion() {
  questionNum++;
}

function iterateCorrectAnswers() {
  correctAnswers++;
}

function createResultsPage(correctAnswers) {
  $(".quiz-box").html(`
    <section id="final-page">
      <h2>Final Score: ${correctAnswers} out of 10</h2>
      <img id="final-img" src="https://media.giphy.com/media/ccQ8MSKkjHE2c/giphy.gif" alt="Finn and Princess Bubblegum Mathematical.">
      <button id="start-over-button">Start Over</button>
    </section>
  `);
}

function handleButtons() {
  handleStartButton();
  handleSubmitButton();
  handleNextButton();
  handleRestartButton();
}

$(handleButtons);