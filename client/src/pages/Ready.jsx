import { useState } from "react";
import Button from "../ui/Button";

function Ready({ onClick, start }) {
  const [animation, setAnimation] = useState(false);

  return (
    <div className={`flex flex-col items-center justify-center gap-5 ${animation ? "go-down-animation" : ""}`}>
      <p className="text-3xl text-neutral-300 uppercase">Are you ready?</p>

      <Button
        onClick={() => {
          setAnimation(true);
          setTimeout(() => onClick(true), 1000);
        }}
        styleType="fill"
        customeStyle="px-10 text-lg font-semibold"
      >
        GO
      </Button>
    </div>
  );
}

export default Ready;
