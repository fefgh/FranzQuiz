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
    },
    {
        question: "Magst du es mit Kindern zu Arbeiten",
        answers: {
            a: { text: "Gar nicht", points: 1 },
            b: { text: "Nicht wirklich", points: 2 },
            c: { text: "Ein bisschen", points: 3 },
            d: { text: "Ziemlich", points: 4 },
            e: { text: "Sehr", points: 5 }
        }
    },
    // Weitere Fragen können hier hinzugefügt werden
];

const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

function buildQuiz() {
    const output = [];

    quizData.forEach((currentQuestion, questionNumber) => {
        const answers = [];

        for (const letter in currentQuestion.answers) {
            answers.push(
                `<label>
                    <input type="radio" name="question${questionNumber}" value="${letter}">
                    ${letter} :
                    ${currentQuestion.answers[letter].text}
                </label>`
            );
        }

        output.push(
            `<div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join('')} </div>`
        );
    });

    quizContainer.innerHTML = output.join('');
}

function showResults() {
    let totalPoints = 0;

    quizData.forEach((currentQuestion, questionNumber) => {
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = document.querySelector(selector).value;
        totalPoints += currentQuestion.answers[userAnswer].points;
    });

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

submitButton.addEventListener('click', showResults);
