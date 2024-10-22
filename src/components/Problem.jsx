import classNames from "classnames";
import React from "react";

const Problem = ({A, B, answer, onChange, isDone}) => {
  const intAnswer = parseInt(answer)
  const problemStyle = classNames(
    'flex rounded-xl m-2 ', {
      'bg-gradient-to-r from-green-300 to-green-100': isDone && A*B === intAnswer,
      'bg-gradient-to-r from-red-300 to-red-100': isDone &&  A*B !== intAnswer,
    }
  )
  return (
    <li className={problemStyle}  >
      <p className="m-2"> {`${A} x ${B} = `} </p>
      <input
        type="tel"
        id="problem_1"
        className=" max-w-12 border rounded-md m-2 p-0 flex px-2"
        value={answer}
        onChange={onChange}
        disabled={isDone}
      />
    </li>
  );
};

export default Problem;
