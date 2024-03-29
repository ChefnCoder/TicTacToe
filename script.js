let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; //playerX, playerO
let count = 0; //To Track Draw

//below all are winning patterns
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];


boxes.forEach((box) => {

    box.addEventListener("click", () => {
      if (turnO) {
        //playerO
        box.innerText = "O";
        turnO = false;
      } else {
        //playerX
        box.innerText = "X";
        turnO = true;
      }
      //this inbuilt func disables the box
      box.disabled = true;
      count++; //we increased count now
      
      //we check for winner through check winner function when counts becomes 3 or more 
      if(count>=3){
      var isWinner = checkWinner(); 
      }

      //game draw 
      if (count === 9 && !isWinner) {
        gameDraw();
      }
      
    });
  });

const resetGame = (buttonname) => {
  clickeffect(buttonname,"linear-gradient(black,black")
  turnO = true;
  count = 0;      
  enableBoxes();
  msgContainer.classList.add("hide");
};



const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, ${winner} is Winner`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {

        showWinner(pos1Val);
        return true;
      }
    }
  }
};

newGameBtn.addEventListener("click", ()=>{
    resetGame(newGameBtn);
});
resetBtn.addEventListener("click",()=>{
   resetGame(resetBtn)
});

function clickeffect(buttoname,newbackgroundImage){
    var computedStyle = window.getComputedStyle(buttoname);
    var oldbackgroundImage = computedStyle.backgroundImage;
    buttoname.style.backgroundImage = newbackgroundImage;
    setTimeout(function(){
        buttoname.style.backgroundImage = oldbackgroundImage;
    },100)
}