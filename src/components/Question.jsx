import React from 'react';
import { useContext } from 'react';
import { QuizContext } from '../context/quiz';
import './Question.css';
import Option from './Option';

const Question = () => {
    const [quizState, dispatch] = useContext(QuizContext);
    const currentQuestion = quizState.questions?.[quizState.currentQuestion];
    
    if (!currentQuestion) {
        return null; // ou um "Carregando..."
    }

    const onSelectedOption = (option) => {
        dispatch({
            type: "CHECK_ANSWER",
            payload: { answer: currentQuestion.answer, option },
        });
    };

    return (
        <div id="question">
            <p>Question {quizState.currentQuestion + 1} of {quizState.questions.length}</p>
            <h2>{currentQuestion.question}</h2>
            <div id="options_container">
                {currentQuestion.options?.map((option) => (
                    <Option 
                        key={option} 
                        option={option} 
                        answer={currentQuestion.answer} 
                        selectedOption={() => onSelectedOption(option)} 
                        hide={quizState.optionToHide === option ? "hide" : null} 
                    />
                ))}
            </div>

            {!quizState.answerSelected && (
                <>
                    {currentQuestion.tip && (
                        <button onClick={() => dispatch({ type: "SHOW_TIP" })}>Tip!</button>
                    )}
                    <button onClick={() => dispatch({ type: "REMOVE_OPTION" })}>
                        Exclude one
                    </button>
                </>
            )}

            {quizState.help === "tip" && (
                <p>{currentQuestion.tip}</p>
            )}

            {quizState.answerSelected && (
                <button onClick={() => dispatch({ type: "CHANGE_QUESTION" })}>
                    Continuar
                </button>
            )}
        </div>
    );
};

export default Question;
