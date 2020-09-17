import React, {useState} from 'react';
import './App.css';
import Progress from './Progress';
import Question from './Question';
import Answers from './Answers';


function App() {

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentAnswer, setAnswer] = useState('');
  const [answers, setAnswers] = useState([]);
  const [error, setError] = useState('');
  const [showResults, setResults] = useState(false);
  const questions = [
    {
      id: 1,
      question: 'What is ReactJS?',
      answer_a: 'Server side framework',
      answer_b: 'User-interface framework',
      answer_c: 'Library for building interaction interfaces',
      answer_d: 'Library for building responsive website',
      correct_answer: 'b'
    },
    {
      id: 2,
      question: 'React is mainly used for building ___.',
      answer_a: 'Database',
      answer_b: 'User interface',
      answer_c: 'Design Platform',
      answer_d: 'Conectivity',
      correct_answer: 'b',
    },
    {
      id: 3,
      question: 'Ref is used for referring an element or component returned by ___.',
      answer_a: 'refer()',
      answer_b: 'reduce()',
      answer_c: 'render()',
      answer_d: 'react()',
      correct_answer: 'a',
    },
    {
      id: 4,
      question: 'Which statement about Hooks is not true?',
      answer_a: 'Hooks are completely opt-in, ther`s no need to rewrite existing code',
      answer_b: 'Hooks are still in beta and not available yet',
      answer_c: 'Hooks are 100% backwards-compatibile and can be used side by side with classes',
      answer_d: 'All of the above',
      correct_answer: 'c',
    },
    {
      id: 5,
      question: 'Which one is not a Hook?',
      answer_a: 'useState()',
      answer_b: 'useConst()',
      answer_c: 'useReducer()',
      answer_d: 'All of the above',
      correct_answer: 'b',
    },
    {
      id: 6,
      question: 'The arbitrary inputs of components are called ___.',
      answer_a: 'Keys',
      answer_b: 'Components',
      answer_c: 'Ref',
      answer_d: 'Href',
      correct_answer: 'a',
    },
    {
      id: 7,
      question: 'What will happen if you call setState() inside render() method?',
      answer_a: 'Repetitive output appears on the screen',
      answer_b: 'Duplicate key error',
      answer_c: 'Stack overflow error',
      answer_d: 'Nothing happens',
      correct_answer: 'c',
    },
    {
      id: 8,
      question: 'Which of the following is the correct syntax for a button click event handler foo?',
      answer_a: '<button onclick={this.foo()}>',
      answer_b: '<button onclick={this.foo}>',
      answer_c: '<button onClick={this.foo()}>',
      answer_d: '<button onClick={this.foo}>',
      correct_answer: 'd',
    },
    {
      id: 9,
      question: 'Which of the following methods in a React Component is called after the component is rendered for the first time?',
      answer_a: 'componentDidUpdate',
      answer_b: 'componentDidMount',
      answer_c: 'componentMounted',
      answer_d: 'componentUpdated',
      correct_answer: 'a',
    },
    {
      id: 10,
      question: 'What is used to pass data to a component from outside?',
      answer_a: 'setStates',
      answer_b: 'props',
      answer_c: 'fetch',
      answer_d: 'render with arguments',
      correct_answer: 'd',
    },
  ];

  const question = questions[currentQuestion];

  const handleClick = e => {
    setAnswer(e.target.value);
    setError('');
  };

  const renderError = () => {
    if(!error) {
      return;
    }
    return <div className="error">{error}</div>
  };

  const renderUserAnswer = (question, answer) => {
    if(question.correct_answer === answer.answer) {
      return <span className="correct">Correct</span>;
    }
    return <span className="failed">Failed</span>
  };
  

  const renderResultData = () => {
    return answers.map(answer => {
      const question = questions.find(question => question.id === answer.questionId);
      return (
        <div key={question.id}>
          {question.question} - {renderUserAnswer(question, answer)}
        </div>
      );
    });
  };

  const restart = () => {
    setAnswers([]);
    setAnswer('');
    setCurrentQuestion(0);
    setResults(false);
  }

  const next = () => {
    const answer = {questionId: question.id, answer: currentAnswer};
    if(!currentAnswer) {
      setError('Please select one option');
      return;
    }
    answers.push(answer);
    setAnswers(answers);
    setAnswer('');

    if(currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      return;
    }
   
    setResults(true);
  }

  if(showResults) {
    return(
      <div className="container results">
        <h2>Result:</h2>
        <ul>{renderResultData()}</ul>
        <button className="btn btn-primary" onClick={restart}>Restart</button>
      </div>
    );
  } else {
    return (
      <div className="main-container">
        <h1>React quiz</h1>
        <Progress 
            total={questions.length} 
            currentQuestion={currentQuestion +1}  
        />
        <Question 
            question={question.question}
        />
            {renderError()}
        <Answers 
            question={question} 
            currentAnswer={currentAnswer} 
            handleClick={handleClick}
        />
        <button className="btn btn-primary" 
            onClick={next}>Confirm and continue
        </button> 
      </div>
    );
  }
}

export default App;
