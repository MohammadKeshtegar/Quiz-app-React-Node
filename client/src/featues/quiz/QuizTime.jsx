import { useEffect, useState } from "react";

function QuizTime({ time, setIsFinished }) {
  const [leftTime, setLeftTime] = useState(time);
  const minutes = Math.floor(leftTime / 60);
  const seconds = leftTime % 60;

  useEffect(
    function () {
      const id = setInterval(() => {
        if (leftTime > 0) setLeftTime((leftTime) => leftTime - 1);
        else setIsFinished(true);
      }, 1000);

      return () => clearInterval(id);
    },
    [leftTime, setIsFinished]
  );

  return <p className="text-lg text-neutral-400">{`${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}</p>;
}

export default QuizTime;
