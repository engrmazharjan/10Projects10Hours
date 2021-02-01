
const quizData = [
    {
        question: 'What is the meaning of Pakistan?',
        a: 'Muslim Land',
        b: 'Land Of Five Rivers',
        c: 'Desert',
        d: 'Holy Land',
        correct: 'd',
    }, {
        question: 'Who is the first Governor General of Pakistan?',
        a: 'Mohammed Ali Jinnah', 
        b: 'Liaquat Ali Khan', 
        c: 'Ayub Khan',
        d: 'Iskander MirzaCorrect',
        correct: 'a',
    }, {
        question : 'What was the major event of 1971?',
        a: 'Bangladesh broke away from Pakistan',
        b: 'Explosion of nuclear bomb', 
        c: 'Tashkent Agreement',
        d: 'Nawaz Sharif became Prime Minister',
        correct: 'a',
    }, {
        question: 'In which year did Pakistan win the Cricket World Cup?',
        a: '1975', 
        b: '1987', 
        c: '1992', 
        d: '1996',
        correct: 'c',
    }, {
        question: 'When did Pakistan win Olympic gold medal in Hockey for the first time?',
        a: '1948',
        b: '1952', 
        c: '1960', 
        d: '1964',
        correct: 'c', 
    }, {
         question: 'What year was JavaScript Launched?',
         a: '1997',
         b: '1999',
         c: '1994',
         d: 'none of the above',
         correct: 'd',
    }
];

const quiz = document.getElementById('quiz');

const answerEls = document.querySelectorAll('.answer'); 

const questionEl = document.getElementById('question');

const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');

const submitBtn = document.getElementById('submit');

let currentQuiz = 0;
let score = 0; 

loadQuiz();

function loadQuiz() {
    deselectAnswers(); 
    let currentQuizData = quizData[currentQuiz];
    
    questionEl.innerText = currentQuizData.question;

    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d; 
}

// Get Selected Answer
function getSelected() {
    
    let answer = undefined;

    answerEls.forEach((answerEl) => {
        if (answerEl.checked) {
            answer = answerEl.id;    
        }
    });
    return answer; 
}

function deselectAnswers() {
    answerEls.forEach((answerEl) => {
        answerEl.checked = false;
    })
 } 

submitBtn.addEventListener('click', () => {  
    // check to see the answer
    let answer = getSelected();
    console.log(answer);

    if (answer) {
        if (answer === quizData[currentQuiz].correct) {
            score++;
        }
        currentQuiz++;
        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            // Show Results 
            quiz.innerHTML = `<h2> You Answered correctly at ${score}/${quizData.length} questions.</h2>
            
            <button onclick ='location.reload()'>Reload</button>`;
        }
    }
});