const quizData = [
    {
        question: "Vous aimez les sports en plein air?",
        answers: {
            a: { text: "Je déteste", points: 2 },
            b: { text: "Je ne l'aime pas", points: 1 },
            c: { text: "Je suis neutre", points: 3 },
            d: { text: "Je l'aime", points: 4 },
            e: { text: "Je l'adore", points: 5 }
        }
    },
    {
        question: "Vous aimez jouer en équipe?",
        answers: {
            a: { text: "Je déteste", points: 5 },
            b: { text: "Je ne l'aime pas", points: 2 },
            c: { text: "Je suis neutre", points: 1 },
            d: { text: "Je l'aime", points: 3 },
            e: { text: "Je l'adore", points: 4}
        }
    },
    {
        question: "Vous aimez jouer avec des balles?",
        answers: {
            a: { text: "Je déteste", points: 5 },
            b: { text: "Je ne l'aime pas", points: 2 },
            c: { text: "Je suis neutre", points: 3 },
            d: { text: "Je l'aime", points: 1 },
            e: { text: "Je l'adore", points: 4 }
        }
    },
    {
        question: "Vous aimez les sports intenses?",
        answers: {
            a: { text: "Je déteste", points: 3 },
            b: { text: "Je ne l'aime pas", points: 1 },
            c: { text: "Je suis neutre", points: 5 },
            d: { text: "Je l'aime", points: 2 },
            e: { text: "Je l'adore", points: 4 }
        }
    },
    {
        question: "Est-ce que vous êtes sportif?",
        answers: {
            a: { text: "Non", points: 3 },
            b: { text: "Un peu", points: 5 },
            c: { text: "Oui", points: 4 }
        }
    }
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
        alert("Veuillez sélectionner une réponse.");
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
    let sport = "Inconnu";

    if (totalPoints >= 1 && totalPoints <= 5) {
        sport = "Basket";
    } else if (totalPoints >= 6 && totalPoints <= 10) {
        sport = "Badminton";
    } else if (totalPoints >= 11 && totalPoints <= 15) {
        sport = "Volley";
    } else if (totalPoints >= 16 && totalPoints <= 20) {
        sport = "Football";
    } else if (totalPoints >= 21 && totalPoints <= 25) {
        sport = "Courir";
    }

    resultsContainer.innerHTML = `Votre sport est ${sport}.`;
}

buildQuiz();

submitButton.addEventListener('click', showNextQuestion);
