import { Children, createContext, useReducer } from "react";
import questions from '../data/questions_complete'

const STAGES = ["Start","Category", "Playing", "End"]

const inicialState = {
    gameStage: STAGES[0],
    questions, 
    currentQuestion: 0,
    score: 0,
    answerSelected: false,
    optionToHide: null,
}
console.log(inicialState)

const quizReducer =(state, action) =>{
    switch(action.type){
        case "CHANGE_STATE":
            return {
                ...state, //use the previous state 
                gameStage: STAGES[1],
            }

        case "START_GAME":
            let quizQuestions = [];
            //const selectedCategory = state.questions.find((category) => category.category === action.payload);
            
            state.questions.forEach((question) =>{
                if(question.category === action.payload){
                    quizQuestions = question.questions;
                    
                }
            });
            console.log('Perguntas carregadas:', quizQuestions);
            return{
                ...state,
                questions: quizQuestions,
                currentQuestion: 0,
                gameStage: STAGES[2],
                
            }

        
        case "REORDER_QUESTIONS":
            //const reordedQuestions = state.questions.sort(() => {
            //return Math.random() - 0.5;
            //});
            
            const reordedQuestions = [...state.questions].sort(() => Math.random() - 0.5);
            console.log('Perguntas embaralhadas:', reordedQuestions);

            return {
                ...state,
                questions: reordedQuestions,
            };

        case "CHANGE_QUESTION":
            const nextQuestion = state.currentQuestion +1;
            let endGame = false;
            answerSelected: false;


            if(!state.questions[nextQuestion]){
                endGame = true;
            }

            return{
                ...state,
                currentQuestion: nextQuestion,
                gameStage: endGame ? STAGES[3] : state.gameStage,
                answerSelected: false,
                help: false,
                optionToHide: null,
            }

        case "NEW_GAME":
            return{
                inicialState,
                answerSelected: false,
            }
            

        case "CHECK_ANSWER": {
        if (state.answerSelected) return state; // Não permite verificar a resposta mais de uma vez.

        const answer = action.payload.answer;
        const option = action.payload.option;
        let correctAnswer = 0;

        if (answer === option) {
            correctAnswer = 1;  // Marca a resposta como certa
        }

        return {
            ...state,
            score: state.score + correctAnswer,  // Atualiza a pontuação corretamente
            answerSelected: true,  // Marca que uma resposta foi selecionada
        };
        }

        case "SHOW_TIP":{
            return{
                ...state,
                help: "tip",
            }
        }

        case "REMOVE_OPTION":{
            const questionWithoutOption = state.questions[state.currentQuestion];
            let repeat = true;
            let optionToHide;
            

            questionWithoutOption.options.forEach((option)=>{
                if(option !== questionWithoutOption.answer && repeat){
                    optionToHide = option;
                    repeat = false;
                }
            });
            return{
                ...state,
                optionToHide,
                help: true,
            }
        }

        default:
            return state;
    }
}

export const QuizContext = createContext();
//export const useQuiz = () => useContext(QuizContext);


export const QuizProvider = ({children}) =>{
    const value = useReducer(quizReducer, inicialState);
    return <QuizContext.Provider value ={value}>{children}</QuizContext.Provider>;
}