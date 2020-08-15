import React, { useState } from 'react';
import nextIcon from '../../images/nextIcon.svg'
import checkIcon from '../../images/checkIcon.svg'
import completed from '../../images/completed.svg'
import sad from '../../images/sad.svg'
import styles from './Main.module.css';

const totalQuestions = 10

// props interface
type Props = {
    question: string
    setNumber: Function
    number: number
    answers: string[]
    questionNm: number
    correctAnswer: string
    startQuiz: Function
}

// Final result interface
type AnswerObject = {
    question: string
    answer: string
    correct: boolean
    correctAnswer: string
    questionNm: number
}

const Main: React.FC<Props> = ({
    question,
    setNumber,
    number,
    answers,
    questionNm,
    correctAnswer,
    startQuiz,
}) => {

    // States
    const [score, setScore] = useState(0)
    const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
    const [userAnswer, setUserAnswer] = useState(false)
    const [gameOver, setGameOver] = useState(false)
    const [correctNumber, setCorrectNumber] = useState(0)

    // Next button function
    const handleNextButton = () => {
        if (number !== totalQuestions - 1) {
            setNumber((prev: number) => prev + 1)
            setUserAnswer(false)
        }
        else {
            return null
        }
    }

    // check answer
    const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
        const answer = e.currentTarget.value
        const correct = correctAnswer === answer

        if (correct) {
            setScore(prev => prev + 10)
            setCorrectNumber(prev => prev + 1)
        }

        const answerObject = {
            question: question,
            answer,
            correct,
            correctAnswer: correctAnswer,
            questionNm: questionNm,
        }
        setUserAnswers((prev) => [...prev, answerObject])
        userAnswers ? setUserAnswer(true) : setUserAnswer(false)
    }

    const handleResult = () => {
        return (
            userAnswers.length === 10 ?
                setGameOver(true) : null
        )
    }

    return (
        <div className={styles.container} style={gameOver ? { overflow: 'scroll' } : undefined} >

            {/* Progress Bar Container */}
            <div className={styles.progressBarContainer}>
                <progress
                    // id="file"
                    value={number + 1}
                    max={totalQuestions}
                    className={styles.bar}
                ></progress>
                {
                 userAnswers.length === 10
                        ?
                        <img src={checkIcon} className={styles.checkIcon} />
                        :
                        <p className={styles.questionNm}>{questionNm}/{totalQuestions}</p>
                }
            </div>

            {/* Questions and Answers Card */}
            {
                !gameOver && userAnswers.length !== 10
                    ?
                    <div className={styles.gameContainer}>

                        {/* <p className={styles.score}>Score: {score}</p> */}

                        <h6 className={styles.question}>{question}</h6>

                        <div className={styles.answersContainer}>
                            {
                                answers.map(answer => (
                                    <button
                                        disabled={userAnswer}
                                        value={answer}
                                        onClick={checkAnswer}
                                    >
                                        {answer}
                                    </button>
                                ))
                            }
                        </div>

                        {number !== totalQuestions - 1 && userAnswer ? <img src={nextIcon} onClick={handleNextButton} className={styles.nextIcon} /> : null}

                    </div>
                    : null}

            {/*  Result */}
            {
                userAnswers.length === 10 && !gameOver ?
                    number === totalQuestions - 1 
                    ? 
                    <div className={styles.resultsContainer}>

                        <img src={correctNumber < 5 ? sad : completed} />
                        <h1 style={score < 50 ? {color: '#c80e13'} : {color: 'green'}}>Completed</h1> 
                        <h2 className={styles.score}>Score: <span style={score < 50 ? {color: '#c80e13'} : {color: 'green'}}>{score}</span></h2>
                        <h3>Correct: <span style={correctNumber < 5 ? {color: '#c80e13'} : {color: 'green'}}>{correctNumber}</span></h3>
                        <p style={score < 50 ? {color: '#c80e13'} : {color: 'green'}}>
                            {correctNumber < 5 ? `You can do better than this.` : `Great Job!`}
                        </p>
                        <button onClick={handleResult}>Complete Details</button> 

                    </div>
                    : null 
                    : null
            }

            {/* Result Details */}
            {
                gameOver && userAnswers.length === 10 ?
                    <div className={styles.resultDetails}>
                        {
                            userAnswers.map(item => (
                                <>
                                    <h2>Question {item.questionNm}</h2>
                                    <p>Question: {item.question}</p>
                                    <p>Your Answer: {item.answer}</p>
                                    <p>Correct Answer: {item.correctAnswer}</p>
                                    <p>{item.correct ? `Is your answer correct?: Yes` : `Is your answer correct?: No`}</p>
                                </>
                            ))}
                    </div> : null
            }

        </div>
    );
}

export default Main
