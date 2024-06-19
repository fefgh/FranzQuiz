const quizData = [
    {
        question: "Vous aimez les sport au plen air",
        answers: {
            a: { text: "je déteste", points: 1 },
            b: { text: "je ne l'aime pas", points: 2 },
            c: { text: "je suis neutre ", points: 3 },
            d: { text: "je l'aime", points: 4 },
            e: { text: "je l'adore ", points: 5 }
        }
    },
    {
        question: "Vous aimez jouer en équipe",
        answers: {
            a: { text: "je déteste", points: 1 },
            b: { text: "je ne l'aime pas", points: 2 },
            c: { text: "je suis neutre", points: 3 },
            d: { text: "je l'aime", points: 4 },
            e: { text: "je l'adore", points: 5 }
        }
    },
    {
        question: "Vous aimez jouer avec des balles?",
        answers: {
            a: { text: "je déteste", points: 1 },
            b: { text: "je ne l'aime pas", points: 2 },
            c: { text: "je suis neutre ", points: 3 },
            d: { text: "je l'aime", points: 4 },
            e: { text: "je l'adore", points: 5 }
        }
    },
        {
        question: "Vous aimez les sports intenses?",
        answers: {
            a: { text: "je déteste", points: 1 },
            b: { text: "je ne l'aime pas", points: 2 },
            c: { text: "je suis neutre ", points: 3 },
            d: { text: "je l'aime", points: 4 },
            e: { text: "je l'adore", points: 5 }
        }
    },
    {
        question: "Est-ce que vous êtes sportif?",
        answers: {
            a: { text: "non", points: 1 },
            b: { text: "un peu", points: 2 },
            c: { text: "oui ", points: 3 },
        }
    },
    {
        question: "",
        answers: {
            a: { text: "je déteste", points: 1 },
            b: { text: "je ne l'aime pas", points: 2 },
            c: { text: "je suis neutre ", points: 3 },
            d: { text: "je l'aime", points: 4 },
            e: { text: "je l'adore", points: 5 }
        }
    },
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
        job = "Le foot";
    } else if (totalPoints >= 11 && totalPoints <= 20) {
        job = "Le Badminton";
    } else if (totalPoints >= 21 && totalPoints <= 29) {
        job = "Le Volley";
    } else if (totalPoints >= 30 && totalPoints <= 40) {
        job = "Le Basket";
    }
    // Weitere Jobkategorien können hier hinzugefügt werden

    resultsContainer.innerHTML = `Basierend auf deinen Antworten passt der Job ${job} am besten zu dir.`;
}

buildQuiz();

submitButton.addEventListener('click', showNextQuestion);
