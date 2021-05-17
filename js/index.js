let inpDir = {
    x:0,
    y:0
}

const foodSound = new Audio('../food.mp3')
const gameOverSound = new Audio('../gameover.mp3')
const moveSound = new Audio('../move.mp3')
const musicSound = new Audio('../music.mp3')
let speed = 12;
let score = 0;
let setTime = 0;
let a = 2
let b = 16
let snakeArr = [
    {
        x:13,
        y:17
    }
]
let food = {
    x:2,
    y:8
}
//functions will be here
function main(cTime){
    // console.log(cTime)
    window.requestAnimationFrame(main)
    if((cTime - setTime)/1000 < 1/speed){
        return
    }
    setTime = cTime
    gameEngine()

}
function isCollide(snake){
    //when bump into itself
    for(let i = 1; i< snake.length;i++){
        if(snake[0].x === snake[i].x && snake[0].y === snake[i].y ){
            return true
        }
    }
    //when collide with border
    if(snake[0].x <=0 || snake[0].x >=24 || snake[0].y <=0 || snake[0].y >=18){
        return true
    }
  
}
function gameEngine(){
    
    //1. updating the snake array
    if(isCollide(snakeArr)){
        gameOverSound.play()
        musicSound.pause();
        alert("Game Over!!! please press any key to continue.")
        inpDir = {
            x:0,
            y:0
        }
        snakeArr=[
            {
                x:13,
                y:17
            }
        ]
        musicSound.play();
        score = 0
    }
    //if you have eaten the food increase the snake length, generate new food, update the score
    if(snakeArr[0].x === food.x && snakeArr[0].y === food.y){
        foodSound.play();
        snakeArr.unshift({x:snakeArr[0].x+inpDir.x,y:snakeArr[0].y+inpDir.y})
        food={x :Math.floor(Math.random()*(b - a) + a),
            y : Math.floor(Math.random()*(b - a) + a)}
            score = score + 1
            scored.innerHTML = "Score : " + score
    }

    //moving snake 
    for (let i = snakeArr.length - 2; i >=0 ; i--){
        console.log(snakeArr[i])
        snakeArr[i+1] = {...snakeArr[i]}
    }
    snakeArr[0].x = snakeArr[0].x + inpDir.x
    snakeArr[0].y = snakeArr[0].y + inpDir.y
    //2. creating and displaying snake and food
    //      a. displaying snake
    board.innerHTML = ""
    snakeArr.forEach((el,index) => {
        const snakeElement = document.createElement("div")
        snakeElement.style.gridColumnStart = el.x
        snakeElement.style.gridRowStart= el.y
        if(index === 0){
            snakeElement.classList.add("head")
        }else{
            snakeElement.classList.add("snake")
        }
        board.appendChild(snakeElement)
    });

    //      b. displaying food
    const foodElement = document.createElement("div")
    foodElement.style.gridColumnStart = food.x
    foodElement.style.gridRowStart= food.y
    foodElement.classList.add("food")
    board.appendChild(foodElement)
}



//main logic of game will be here
window.requestAnimationFrame(main)
window.addEventListener('keydown',(el)=>{
    switch(el.key){
        case "ArrowUp":
            console.log("ArrowUp")
            moveSound.play()
            inpDir.x = 0
            inpDir.y = -1
            break
        case "ArrowDown":
            console.log("ArrowDown")
            moveSound.play()
            inpDir.x = 0
            inpDir.y = 1
            break
        case "ArrowLeft":
            console.log("ArrowLeft")
            moveSound.play()
            inpDir.x = -1
            inpDir.y = 0
            break
        case "ArrowRight":
            console.log("ArrowRight")
            moveSound.play()
            inpDir.x = 1
            inpDir.y = 0
            break

        default:break
    }
})