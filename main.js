console.log("Welcome to Tic Tac Toe");

let clickSound = new Audio("Music/plasticBubbleClick.wav");
let gameOver = new Audio("Music/gameover.mp3");
let gameWin = new Audio("Music/gamewin.wav");

let turn = "X";
let isGameover = false;

let stepCheck=0;
let count =0;

//Function to change the turn 
const changeTurn =()=>{
    return turn == "X"? "O": "X";
}

//Function to check for a win
const checkWin =()=>{
    let boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        [0,1,2,2.5,5,0],
        [3,4,5,2.5,15,0],
        [6,7,8,2.5,25,0],
        [0,3,6,-7.5,15,90],
        [1,4,7,2.5,15,90],
        [2,5,8,12.5,15,90],
        [0,4,8,0,15,45],
        [2,4,6,0,15,-45],

    ]

    
    if(screen.width<=800 )
    {
        wins = [
            [0,1,2,5,10,0],
            [3,4,5,5,30,0],
            [6,7,8,5,50,0],
            [0,3,6,-15,30,90],
            [1,4,7,5,30,90],
            [2,5,8,25,30,90],
            [0,4,8,0,30,45],
            [2,4,6,0,30,-45],
    
        ]
        
    }

    wins.forEach(e=>{

        count= count+1;
  
       
        if( boxtext[e[0]].innerText ===boxtext[e[1]].innerText && boxtext[e[1]].innerText ===boxtext[e[2]].innerText && boxtext[e[0]].innerText !=='' )
        {
            gameWin.play();
            document.getElementsByClassName("info")[0].innerText = boxtext[e[0]].innerText + " Won";
            isGameover= true;
            document.querySelector('.imgBox').getElementsByTagName('img')[0].style.width ="200px";
            
            if(count===7 || count===8){
                if(screen.width>800)
                    document.querySelector('.line').style.width ="30vw";
                else
                    document.querySelector('.line').style.width ="60vw";
            }
            else
            {
                if(screen.width>800)
                    document.querySelector('.line').style.width ="25vw";
                else
                    document.querySelector('.line').style.width ="50vw";
            }


            document.querySelector(".line").style.transform = `translate(${e[3]}vw,${e[4]}vw) rotate(${e[5]}deg)`;

        }

    })

}

//Game Logic 
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element=>{
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click',(e)=>{
        if(boxtext.innerText ==""){
          boxtext.innerText = turn;
          turn = changeTurn();
          clickSound.play();

          stepCheck= stepCheck+1;

          count=0;
          if(!isGameover)
          checkWin();

          if(stepCheck===9 && isGameover===false){
            gameOver.play();
            document.getElementsByClassName("info")[0].innerText = "Nobody Won !!";
          }
           

          if(!isGameover && stepCheck!==9)
          document.getElementsByClassName("info")[0].innerText = "Turn for "+ turn;
        }
    })

})



// Add onclick listener to reset button 
reset.addEventListener('click', (e)=>{
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element=>{
        element.innerText="";
    })

    turn="X";

    isGameover=false;
    stepCheck=0;
    count=0;

    document.getElementsByClassName("info")[0].innerText = "Turn for "+ turn;
    document.querySelector('.imgBox').getElementsByTagName('img')[0].style.width ="0";
    document.querySelector('.line').style.width ="0";

    
})


