const quizData = [
    {
        question: "Vous aimez les sports en plein air?",
        answers: {
            a: { text: "Je déteste", points: { foot: 2, basket: 4, volley: 3, badminton: 5, courir: 1 } },
            b: { text: "Je ne l'aime pas", points: { foot: 2, basket: 5, volley: 3, badminton: 4, courir: 1 } },
            c: { text: "Je suis neutre", points: { foot: 3, basket: 3, volley: 5, badminton: 2, courir: 2 } },
            d: { text: "Je l'aime", points: { foot: 5, basket: 3, volley: 4, badminton: 1, courir: 4 } },
            e: { text: "Je l'adore", points: { foot: 4, basket: 2, volley: 3, badminton: 0, courir: 5 } }
        }
    },
    {
        question: "Vous aimez jouer en équipe?",
        answers: {
            a: { text: "Je déteste", points: { foot: 0, basket: 1, volley: 1, badminton: 3, courir: 5 } },
            b: { text: "Je ne l'aime pas", points: { foot: 1, basket: 2, volley: 1, badminton: 2, courir: 4 } },
            c: { text: "Je suis neutre", points: { foot: 2, basket: 2, volley: 3, badminton: 5, courir: 2 } },
            d: { text: "Je l'aime", points: { foot: 4, basket: 4, volley: 5, badminton: 3, courir: 1 } },
            e: { text: "Je l'adore", points: { foot: 5, basket: 2, volley: 4, badminton: 3, courir: 0 } }
        }
    },
    {
        question: "Vous aimez jouer avec des balles?",
        answers: {
            a: { text: "Je déteste", points: { foot: 1, basket: 1, volley: 1, badminton: 1, courir: 5 } },
            b: { text: "Je ne l'aime pas", points: { foot: 2, basket: 2, volley: 2, badminton: 2, courir: 3 } },
            c: { text: "Je suis neutre", points: { foot: 3, basket: 3, volley: 3, badminton: 3, courir: 2 } },
            d: { text: "Je l'aime", points: { foot: 4, basket: 4, volley: 4, badminton: 4, courir: 0 } },
            e: { text: "Je l'adore", points: { foot: 5, basket: 5, volley: 5, badminton: 5, courir: 0 } }
        }
    },
    {
        question: "Vous aimez les sports intenses?",
        answers: {
            a: { text: "Je déteste", points: { foot: 1, basket: 1, volley: 1, badminton: 2, courir: 0 } },
            b: { text: "Je ne l'aime pas", points: { foot: 1, basket: 2, volley: 1, badminton: 2, courir: 1 } },
            c: { text: "Je suis neutre", points: { foot: 3, basket: 4, volley: 4, badminton: 4, courir: 3 } },
            d: { text: "Je l'aime", points: { foot: 5, basket: 2, volley: 3, badminton: 4, courir: 4 } },
            e: { text: "Je l'adore", points: { foot: 4, basket: 3, volley: 3, badminton: 4, courir: 5 } }
        }
    },
    {
        question: "Est-ce que vous êtes sportif?",
        answers: {
            a: { text: "Non", points: { foot: 1, basket: 1, volley: 4, badminton: 2, courir: 3 } },
            b: { text: "Un peu", points: { foot: 3, basket: 2, volley: 3, badminton: 4, courir: 4 } },
            c: { text: "Oui", points: { foot: 5, basket: 5, volley: 5, badminton: 5, courir: 5 } }
        }
    }
];

const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

let currentQuestion = 0;
let totalPoints = { foot: 0, basket: 0, volley: 0, badminton: 0, courir: 0 };

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
    const points = quizData[currentQuestion].answers[userAnswer].points;

    for (const sport in points) {
        totalPoints[sport] += points[sport];
    }

    currentQuestion++;

    if (currentQuestion < quizData.length) {
        buildQuiz();
    } else {
        showResults();
    }
}

function showResults() {
    let maxPoints = 0;
    let chosenSport = "Inconnu";

    for (const sport in totalPoints) {
        if (totalPoints[sport] > maxPoints) {
            maxPoints = totalPoints[sport];
            chosenSport = sport;
        }
    }

    resultsContainer.innerHTML = `Votre sport est ${chosenSport}.`;
}

buildQuiz();

submitButton.addEventListener('click', showNextQuestion);
