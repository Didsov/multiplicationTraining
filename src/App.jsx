import { useEffect, useState } from "react";
import Button from "./components/Button";
import Problem from "./components/Problem";
import Clock from "./components/Clock";

const SETTINGS = {
  pull: [2, 3, 4, 5, 6, 7, 8, 9],
  selectedPull: [2, 3, 4, 5, 6, 7, 8, 9],
  countProblem: 20,
};

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function getMMSS(sec){
    const date = new Date(null);
    date.setSeconds(sec); // specify value for SECONDS here
    const result = date.toISOString().slice(14, 19);
    return result
}

function App() {
  const [isWork, setisWork] = useState(false);
  const [isDone, setisDone] = useState(false);
  const [isTimerWork, setIsTimerWork] = useState(false);
  const [time, setTime] = useState(0)
  const [answerCount, setAnswerCount] = useState(0)
  const [lastTime, setLastTime] = useState(0)
  const [problems, setProblems] = useState([]); // Массив задач
  const [answers, setAnswers] = useState([]); // Введенные ответы

  const generateProblems = () => {
    const newProblems = Array.from({ length: SETTINGS.countProblem }).map(
      () => ({
        A: getRandomElement(SETTINGS.selectedPull),
        B: getRandomElement(SETTINGS.selectedPull),
      })
    );
    setProblems(newProblems);
    setAnswers(Array(SETTINGS.countProblem).fill("")); // Инициализируем ответы пустыми строками
  };


  const handleReStartTimer = () =>{
    setIsTimerWork(true)
    setTime(0)
  }
  const handleStopTimer = ()=>{
    setLastTime(time)
    setIsTimerWork(false)
  }
  const handleStart = () => {
    generateProblems();
    setisWork(true);
    setisDone(false);
    handleReStartTimer();
    setAnswers(Array(SETTINGS.countProblem).fill(""));
  };
  const handleReStart = () => {
    handleStart();
  };
  const handleDone = () => {
    let counter = 0;
    problems.map((problem, index)=>{
      if(problem.A * problem.B === parseInt(answers[index])){
        counter += 1
      }
    })
    setAnswerCount(counter)
    setisDone(true);
    handleStopTimer();

    console.log(problems)
  };
  const handleInputChange = (index, value) => {
    if (/^\d{0,2}$/.test(value)) {
      const newAnswers = [...answers];
      newAnswers[index] = value;
      setAnswers(newAnswers);
    }
  };


  useEffect(() => {
    let timer = null;
    if (isTimerWork) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1); // Каждую секунду увеличиваем время на 1
      }, 1000);
    } else if (!isTimerWork && time !== 0) {
      clearInterval(timer); // Очищаем интервал, если таймер неактивен
    }
    return () => clearInterval(timer); // Очищаем таймер при размонтировании
  }, [isTimerWork, time]);

  return (
    <>
      <div className="flex justify-center bg-slate-100 min-w-screen min-h-screen p-4">
        <div className=" flex flex-col items-center   max-w-[400px] w-full">
          <Clock time={time}/>
          {!isWork && (
            <>
              <Button handleClick={handleStart} color={"green"}>
                Start
              </Button>
            </>
          )}
          {isWork && (
            <>
              <Button handleClick={handleReStart} color={"red"}>
                ReStart
              </Button>
              <ul className="flex text-xl flex-wrap flex-row  p-2 m-2 justify-center ">
                {problems.map((problem, index) => (
                  <Problem
                    key={index}
                    A={problem.A}
                    B={problem.B}
                    isDone={isDone}
                    answer={answers[index]}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                  />
                ))}
              </ul>
              {!isDone ? (
                <Button handleClick={handleDone} color={"green"}>
                  Done
                </Button>
              ) : (
                <>
                <Button handleClick={handleReStart} color={"green"}>
                  RESTART
                </Button>
                
                <p>Решено: {answerCount}/{SETTINGS.countProblem} ({answerCount/SETTINGS.countProblem *100}%) за {getMMSS(lastTime)}</p>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
