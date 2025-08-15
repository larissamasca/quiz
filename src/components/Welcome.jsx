import { useContext } from "react"
import Quiz from "../img/quiz.svg"
import "./Welcome.css"
import { QuizContext } from "../context/quiz"

const Welcome = () => {
  const [quizState, dispatch] = useContext(QuizContext);

  return (
    <div id="welcome">
        <h2>Welcome!</h2>
        <p>Click on the button to get started:</p>
        <button onClick={()=> dispatch({type:"CHANGE_STATE"})}>Get started!</button>
        <img src={Quiz} alt="quiz start"/>
    </div>
  )
}

export default Welcome