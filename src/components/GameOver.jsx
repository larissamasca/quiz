import React from 'react'
import { useContext } from 'react'
import { QuizContext } from '../context/quiz'
import './GameOver.css'

import WellDone from '../img/welldone.svg'

const GameOver = () => {
    const [quizState, dispatch] = useContext(QuizContext);
    return (
        <div id="gameover">
            <h2>Game Over!</h2>
            <p>Score: {quizState.score}</p>
            <p>You get right {quizState.score} of {quizState.questions.length} questions!</p>
            <img src={WellDone} alt="finish" />
            <button onClick={() => dispatch({type: "NEW_GAME"})}>Restart</button>
        </div>
    )
}

export default GameOver