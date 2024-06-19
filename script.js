const quizData = [
    {
        question: "Wie gerne arbeitest du im Freien?",
        answers: {
            a: { text: "Gar nicht gerne", points: 1 },
            b: { text: "Nicht so gerne", points: 2 },
            c: { text: "Eher neutral", points: 3 },
            d: { text: "Gerne", points: 4 },
            e: { text: "Sehr gerne", points: 5 }
        }
    },
    {
        question: "Wie gut bist du im Umgang mit Zahlen?",
        answers: {
            a: { text: "Sehr schlecht", points: 1 },
            b: { text: "Nicht so gut", points: 2 },
            c: { text: "Durchschnittlich", points: 3 },
            d: { text: "Gut", points: 4 },
            e: { text: "Sehr gut", points: 5 }
        }
    },
    {
        question: "Bist du kreativ und handwerklich begabt?",
        answers: {
            a: { text: "Gar nicht", points: 1 },
            b: { text: "Nicht wirklich", points: 2 },
            c: { text: "Ein bisschen", points: 3 },
            d: { text: "Ziemlich", points: 4 },
            e: { text: "Sehr", points: 5 }
        }
    }
    // Weitere Fragen können hier hinzugefügt werden
];

const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

let currentQuestion = 0;
let totalPoints = 0;

function buildQuiz() {
    const currentQuizData = quizData[currentQuestion];

    const output = [];
    const answers = [];

    for (const letter in currentQuizData.answers) {
        answers.push(
            `<label>
                <input type="radio" name="question" value="${letter}">
                ${letter} :
                ${currentQuizData.answers[letter].text}
            </label>`
        );
    }

    output.push(
        `<div class="question"> ${currentQuizData.question} </div>
        <div class="answers"> ${answers.join('')} </div>`
    );

    quizContainer.innerHTML = output.join('');
}

function showNextQuestion() {
    const answerContainer = quizContainer.querySelector('.answers');
    const selector = `input[name=question]:checked`;

    if (!answerContainer.querySelector(selector)) {
        alert("Bitte wähle eine Antwort aus.");
        return;
    }

    const userAnswer = answerContainer.querySelector(selector).value;
    totalPoints += quizData[currentQuestion].answers[userAnswer].points;

    currentQuestion++;

    if (currentQuestion < quizData.length) {
        buildQuiz();
    } else {
        showResults();
    }
}

function showResults() {
    let job = "Unbekannt";

    if (totalPoints >= 1 && totalPoints <= 10) {
        job = "Friseur";
    } else if (totalPoints >= 11 && totalPoints <= 20) {
        job = "Bauarbeiter";
    } else if (totalPoints >= 21 && totalPoints <= 30) {
        job = "Verkäufer";
    } else if (totalPoints >= 31 && totalPoints <= 40) {
        job = "Ingenieur";
    } else if (totalPoints >= 41 && totalPoints <= 50) {
        job = "Lehrer";
    }
    // Weitere Jobkategorien können hier hinzugefügt werden

    resultsContainer.innerHTML = `Basierend auf deinen Antworten passt der Job ${job} am besten zu dir.`;
}

buildQuiz();

submitButton.addEventListener('click', showNextQuestion);
