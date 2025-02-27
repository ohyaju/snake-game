"use client";
import { useEffect, useState } from "react";
import { useInterval } from 'usehooks-ts';

const size = 20;

const board = {
  width: 10,
  height: 10,
};

export default function Home() {
  const [head, setHead] = useState({ top: 3, left: 5 });
  const [speed,setSpeed] = useState(200);
  const [food,setFood] =useState({top:5,left:5})
  const [tails, setTails] = useState([
    { top: 3, left: 2 },
    { top: 3, left: 3 },
    { top: 3, left: 4 },
  ]);

  const [direction, setDirection] = useState("right");
  const [newDirection, setNewDirection]=useState("right");

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
    let nextDirection = "right";
    if (newDirection === "right" && direction !== "left"){
      nextDirection="right";
    } else if (newDirection === "left" && direction !== "right"){
      nextDirection="left";
    } else if (newDirection === "up" && direction !== "down"){
      nextDirection="up";
    } else if (newDirection === "down" && direction !== "up"){
      nextDirection="down"; 
    }
    setDirection(newDirection);

    let newLeft = head.left;
    let newTop = head.top;

    const newTails = [...tails];
    newTails.push(head);
    newTails.shift();
    setTails(newTails);

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
 //check game over
 if (tails.find((tail)=>tail.left === newLeft && tail.top === newTop)){
  setSpeed (null);
  // alert("GAMEOVER");
  // location.reload();
 }
 setHead ({top: newTop, left: newLeft});
 
 if (newTop === food.top && newLeft === food.left){
  newTails.push(head);
  setTails(newTails);
  generateNewFood();
 }
}

function generateNewFood (){
  const newFoodTop = getRandomInt (board.height);
  const newFoodLeft = getRandomInt (board.width);

  setFood ({top: newFoodTop, left: newFoodLeft});
}
function getRandomInt(max){
  return Math.floor(Math.random() * max);
}
  useInterval(() => {
    gameLoop();
  }, speed);

  function changeDirection (newDirection){
    setNewDirection(newDirection);
  }


  return (
    <div>
      < div style={{ width: board.width * size, height: board.height * size }} className="relative bg-pink-300 mx-auto mt-16">
        <div style={{ top: head.top * size, left: head.left * size, width: size, height: size }} className="absolute bg-slate-600 rounded-full"></div>

        <div style={{ top: food.top * size, left: food.left * size, width: size, height: size }} className="absolute bg-blue-600 rounded-full"></div>


        {tails.map((tail,index) => (
          <div key={`${tail.left}-${tail.top}-${index}`}
           style={{
            top: tail.top * size,
             left: tail.left * size,
            width: size,
          height:size,
         }} 
         className="absolute bg-green-600 rounded-full"
         ></div>
        ))}
      </div>
      <div className="flex gap-4 justify-center mt-10">
        <button onClick={() => setDirection("up")}>up</button>
        <button onClick={() => setDirection("down")}>down</button>
        <button onClick={() => setDirection("right")}>right</button>
        <button onClick={() => setDirection("left")}>left</button>
      </div>
    </div>
  );
}
