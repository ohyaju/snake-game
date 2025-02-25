"use client";
import { useEffect, useState } from "react";
import { useInterval } from 'usehooks-ts';
const size = 20;

const board = {
  width: 10,
  height: 10,
};

export default function Home() {
  const [head, setHead] = useState({ top: 0, left: 0 });
  const [direction, setDirection] = useState("right");

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      switch (e.code) {
        case "ArrowUp": {
          setDirection("up");
          break;
        }
        case "ArrowDown": {
          setDirection("down");
          break;
        }
        case "ArrowRight": {
          setDirection("right");
          break;
        }
        case "ArrowLeft": {
          setDirection("left");
          break;
        }
      }
    });
  });

  function gameLoop() {
    let newLeft = head.left;
    let neewTop = head.top;

    switch (direction) {
      case "right": {
        newLeft = head.left + 1;
        if (board.width <= newLeft) {
          newLeft = 0;
        }
        break;
      }
      case "left": {
        newLeft = head.left - 1;
        if (newLeft < 0) {
          newLeft = board.width - 1;
        }
        break;
      }
      case "down": {
        newLeft = head.top + 1;
        if (board.height <= newTop) {
          newTop = 0;
        }
        break;
      }
      case "up": {
        newTop = head.top - 1;
        if (newTop < 0) {
          newTop = board.height - 1;
        }
        break;
      }
    }

    setHead({ top: newTop, left: newLeft });
  }

  useInterval(() => {
    gameLoop();
  }, 500);



  return (
    <div>
      <div style={{ width: board.width * size, height: board.height * size }} className="relative bg-pink-300 mx-auto mt-16">
        <div style={{ top: head.top * size, left: head.left * size, width: size, height: size }} className="absolute bg-slate-600 rounded-full"></div>
      </div>
      <div className="flex gap-4 justify-center mt-10">
        <button onClick={() => setDirection("up")}>up</button>
        <button onClick={() => setDirection("up")}>down</button>
        <button onClick={() => setDirection("up")}>right</button>
        <button onClick={() => setDirection("up")}>left</button>
      </div>
    </div>
  );
}
