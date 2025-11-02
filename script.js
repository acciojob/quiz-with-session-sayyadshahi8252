// your JS code here.

// Do not change code below this line
// This code will just display the questions to the screen
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// ✅ Select DOM elements
const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreDiv = document.getElementById("score");

// ✅ Load saved progress from sessionStorage
let progress = JSON.parse(sessionStorage.getItem("progress")) || {};

// ✅ Render questions
function renderQuestions() {
  questionsElement.innerHTML = ""; // clear before rendering
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");

    const questionText = document.createElement("p");
    questionText.textContent = question.question;
    questionElement.appendChild(questionText);

    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
      choiceElement.type = "radio";
      choiceElement.name = `question-${i}`;
      choiceElement.value = choice;

      // ✅ Restore saved choice if exists
      if (progress[i] === choice) {
        choiceElement.checked = true;
      }

      // ✅ Save progress on selection
      choiceElement.addEventListener("change", () => {
        progress[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(progress));
      });

      const choiceLabel = document.createElement("label");
      choiceLabel.textContent = choice;

      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceLabel);
      questionElement.appendChild(document.createElement("br"));
    }

    questionsElement.appendChild(questionElement);
  }
}

// ✅ Submit button logic
submitButton.addEventListener("click", () => {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (progress[i] === questions[i].answer) {
      score++;
    }
  }

  scoreDiv.textContent = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem("score", score);
});

// ✅ Show score if it exists in localStorage
const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  scoreDiv.textContent = `Your score is ${savedScore} out of ${questions.length}.`;
}

// ✅ Render questions on load
renderQuestions();
