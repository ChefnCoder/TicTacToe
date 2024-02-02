var boxes = document.querySelectorAll(".box");  //chosen all box and made it under boxes array
let resetBtn = document.querySelector("#reset-btn"); //chosen reset btn
let newGameBtn = document.querySelector("#new-btn"); //chosen new game btn
let msgContainer = document.querySelector(".msg-container"); //chosen msg container
let msg = document.querySelector("#msg"); //chosen msg class
let body = document.querySelector("body");
let xscore = document.querySelector(".xscore");
let oscore = document.querySelector(".oscore");

let turnO = true; //playerX, playerO
let count = 0; //To Track Draw
let xwin=0,owin=0;
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

//boxes was an array so used foreach to iterate over each box
boxes.forEach((box) => {
    
  //added an event listener on each box to know if its clicked
    box.addEventListener("click", () => {
      //this is else to fill the text whatever required
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
      count++; //we increased count, remeber tracking for draw case na
      
      //we check for winner through check winner function when counts becomes 3 or more 
      if(count>=3){
      var isWinner = checkWinner(); 
      }

      //game draw case 
      if (count === 9 && !isWinner) {
        gameDraw();
      }
      
    });
  });


//game draw function, here we show user game is draw and we disable all boxes so no more elemnt can be filled
const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

// disable boxes function run a for loop over each box of boxes array and make them disabled....shit thats brutal
const disableBoxes = () => {
  //let loopvariable of arrayname ->syntax
  for (let box of boxes) {
    box.disabled = true;
  }
};

//enable boxes function runs a loop over boxes array and and make each box enabled and then also change inner text to empty
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

//show winner function firstly display congratulation line and then disables boxes.
const showWinner = (winner) => {
  if(winner=="X") {
    xwin++;
    xscore.innerHTML="X Won: "+xwin+" times";
  }
  else {
    owin++;
    oscore.innerHTML="O Won: "+owin+" times";
  }
  //console.log(typeof(winner));
  msg.innerText = `Congratulations, ${winner} is Winner`;
  msgContainer.classList.remove("hide");
};

const audio = new Audio();
audio.src ="./click.mp3";
//chechwinner function
//here we iterate over winpatterns named array and for every index
const checkWinner = () => {
  //at every iteration over winpatterns, pattern = value at that idx, so pattern holds subarray at that idx 
  //now pattern subarray holds indexes na, so when u do pattern[0]= u get value of idx it holds.
  //now we went to that idx box and made it box1 , similarly chosen box2 and box 3 
  //then we accessed their innertext and matched them to check if they are equal.
  for (let pattern of winPatterns) {
    var box1 = boxes[pattern[0]]; 
    var box2 = boxes[pattern[1]];
    var box3 = boxes[pattern[2]];

    var pos1Val = box1.innerText; 
    var pos2Val = box2.innerText;
    var pos3Val = box3.innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {

        disableBoxes();
        changeboxcolor(box1,box2,box3);
        audio.play();
        setTimeout(()=>{
          showWinner(pos1Val);
        },700)
        return true;
      }
    }
  }
};

function changeboxcolor(box1,box2,box3){
  //console.log(typeof box1);
  box1.style.backgroundColor ="#ff595e";
  box2.style.backgroundColor ="#ff595e";
  box3.style.backgroundColor ="#ff595e";
}


const audio2 = new Audio();
audio2.src ="./clicksound.mp3";
newGameBtn.addEventListener("click", ()=>{
    audio2.play();
    resetGame(newGameBtn);
});
resetBtn.addEventListener("click",()=>{
   audio2.play();
   resetGame(resetBtn);
   xwin=0;
   owin=0;
   xscore.innerHTML="X Won: ";
   oscore.innerHTML="O Won: ";

});

//resetgame function takes the buttonname as argument on whom these functions are to be applied
//now first click effect is ran over button and then some variables are redefined to reset game,i.e turn0,count
//boxes are enabled using enablebpx function and then the msg displaying is hidden again.
const resetGame = (buttonname) => {
  clickeffect(buttonname,"linear-gradient(black,black");
  body.classList.add("hide");
    setTimeout(()=>{
      body.classList.remove("hide");
      turnO = true; 
      count = 0;      
      enableBoxes();
      for (let box of boxes) {
        box.style.backgroundColor="#06e9d2";
      }
      msgContainer.classList.add("hide");
    },200)
  
  };


function clickeffect(buttoname,newbackgroundImage){
    var computedStyle = window.getComputedStyle(buttoname);
    var oldbackgroundImage = computedStyle.backgroundImage;
    buttoname.style.backgroundImage = newbackgroundImage;
    setTimeout(function(){
        buttoname.style.backgroundImage = oldbackgroundImage;
    },100)
}