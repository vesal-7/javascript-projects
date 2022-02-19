const quizData = [
    {
        question: "What is the most used programming language in 2021?",
        a: "Java",
        b: "C++",
        c: "Python",
        d: "JavaScript",
        correct: "d",
    },
    {
        question: "Who is the President of US?",
        a: "George W. Bush",
        b: "Donald Trump",
        c: "Joe Baiden",
        d: "Hillary Clinton",
        correct: "c",
    },
    {
        question: "What does HTML stand for?",
        a: "Hypertext Markup Language",
        b: "Cascading Style Sheet",
        c: "Jason Object Notation",
        d: "The Worldwide Computer Network",
        correct: "a",
    },
    {
        question: "What year was JavaScript launched?",
        a: "1996",
        b: "1995",
        c: "1994",
        d: "none of the above",
        correct: "b",
    },
]

const quiz = document.getElementById("quiz")
const answerEls = document.querySelectorAll(".answer")//answer input elements
const question_text = document.getElementById("question")
const a_text = document.getElementById("a_text")
const b_text = document.getElementById("b_text")
const c_text = document.getElementById("c_text")
const d_text = document.getElementById("d_text")
const submitBtn = document.getElementById("submit")

let currentQuiz = 0
let score = 0

loadQuiz()

//to load each quiz
function loadQuiz() {
    deselectAnswers()

    const currentQuizData = quizData[currentQuiz]

    question_text.innerText = currentQuizData.question
    a_text.innerText = currentQuizData.a
    b_text.innerText = currentQuizData.b
    c_text.innerText = currentQuizData.c
    d_text.innerText = currentQuizData.d
}

//to determine which answer is clicked
function getSelected() {
    let answer='' 

    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            answer = answerEl.id;
        };
    })

    return answer;
}

//to deselect radio buttons for the next question
function deselectAnswers() {
    answerEls.forEach(answerEl => {
        answerEl.checked = false;
    });
}

submitBtn.addEventListener("click", () => {
    // check to see the answer
    const answer = getSelected()

    if (answer!='') {
        if (answer === quizData[currentQuiz].correct) {
            score++
        }

        currentQuiz++
        if (currentQuiz < quizData.length) {
            loadQuiz()
        } else {
            quiz.innerHTML = `
                <h2>You answered correctly ${score}/${quizData.length} of questions.</h2>
                
                <button onclick="location.reload()">Reload</button>
            `
        }
    }
});
