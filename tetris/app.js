//baraye shoru maqadir avalie ro ba DOMContentLoaded mitonim bznim ke saritar load shan
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  let squares = Array.from(document.querySelectorAll('.grid div'))
  const scoreDisplay = document.querySelector('#score')
  const startBtn = document.querySelector('#start-button')
  const width = 10
  let nextRandom = 0
  let timerId
  let score = 0
  const colors = [
    'orange',
    'red',
    'purple',
    'green',
    'blue'
  ]

  //The Tetrominoes
  const lTetromino = [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, width*2],
    [width, width*2, width*2+1, width*2+2]
  ]

  const zTetromino = [
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1],
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1]
  ]

  const tTetromino = [
    [1,width,width+1,width+2],
    [1,width+1,width+2,width*2+1],
    [width,width+1,width+2,width*2+1],
    [1,width,width+1,width*2+1]
  ]

  const oTetromino = [
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1]
  ]

  const iTetromino = [
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3],
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3]
  ]

  const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

  let current_Positioin = 4
  let current_Rotation = 0

  //console.log(theTetrominoes[3],squares[0],timerId)

  //randomly select a Tetromino and its first rotation
  let random = Math.floor(Math.random()*theTetrominoes.length)
  let current_Shape = theTetrominoes[random][current_Rotation]

  //draw the Tetromino
  function draw() {
    current_Shape.forEach(index => {
      squares[current_Positioin + index].classList.add('tetromino')
      squares[current_Positioin + index].style.backgroundColor = colors[random]
    })
  }

  //undraw the Tetromino
  function undraw() {
    current_Shape.forEach(index => {
      squares[current_Positioin + index].classList.remove('tetromino')
      squares[current_Positioin + index].style.backgroundColor = ''

    })
  }

  //assign functions to Arrow clicks
  function control(e) {
    if(e.keyCode === 37) {
      moveLeft()
    } else if (e.keyCode === 38) {
      rotate()
      //up
    } else if (e.keyCode === 39) {
      moveRight()
    } else if (e.keyCode === 40) {
      moveDown()
    }
  }
  document.addEventListener('keyup', control)

  //move down function
  function moveDown() {
    undraw()
    current_Positioin += width
    draw()
    freeze()
  }

  //freeze function
  function freeze() {
    if(current_Shape.some(index => squares[current_Positioin + index + width].classList.contains('taken'))) {
      current_Shape.forEach(index => squares[current_Positioin + index].classList.add('taken'))
      //start a new tetromino falling
      random = nextRandom
      nextRandom = Math.floor(Math.random() * theTetrominoes.length)
      current_Shape = theTetrominoes[random][current_Rotation]
      current_Positioin = 4
      draw()
      displayShape()
      addScore()
      gameOver()
    }
  }

  //move the tetromino left, unless is at the edge or there is a blockage
  function moveLeft() {
    undraw()
    //mishe baraye kenareha mesle kaf blockhaye taken bzarim
    const isAtLeftEdge = current_Shape.some(index => (current_Positioin + index) % width === 0)
    if(!isAtLeftEdge) current_Positioin -=1
    //shayad samte chap taken shode bashad. pas barmigarde ye khune aqab
    if(current_Shape.some(index => squares[current_Positioin + index].classList.contains('taken'))) {
      current_Positioin +=1
    }
    draw()
  }

  //move the tetromino right, unless is at the edge or there is a blockage
  function moveRight() {
    undraw()
    const isAtRightEdge = current_Shape.some(index => (current_Positioin + index) % width === width -1)
    if(!isAtRightEdge) current_Positioin +=1
    if(current_Shape.some(index => squares[current_Positioin + index].classList.contains('taken'))) {
      current_Positioin -=1
    }
    draw()
  }

  
  ///FIX ROTATION OF TETROMINOS AT THE EDGE 
  function isAtRight() {
    return current_Shape.some(index=> (current_Positioin + index + 1) % width === 0)  
  }
  
  function isAtLeft() {
    return current_Shape.some(index=> (current_Positioin + index) % width === 0)
  }
  
  function checkRotatedPosition(P){
    P = P || current_Positioin       //get current position.  Then, check if the piece is near the left side.
    //console.log(p)
	if ((P+1) % width < 4) {        //add 1 because the position index can be 1 less than where the piece is      
      if (isAtRight()){            //use actual position to check if it's flipped over to right side
        current_Positioin += 1    //if so, add one to wrap it back 
        checkRotatedPosition(P)  //check again.  Pass position from start, since long block might need to move more.
      }
    }
    else if (P % width > 5) {
      if (isAtLeft()){
        current_Positioin -= 1
       checkRotatedPosition(P)
      }
    }
  }
  
  //rotate the tetromino
  function rotate() {
    undraw()
    current_Rotation ++
    if(current_Rotation === current_Shape.length) { //if the current rotation gets to 4, make it go back to 0
      current_Rotation = 0
    }
    current_Shape = theTetrominoes[random][current_Rotation]
    checkRotatedPosition()
    draw()
  }
  /////////

  
  
  //show next tetromino in mini-grid display
  const displaySquares = document.querySelectorAll('.mini-grid div')
  const displayWidth = 4
  const display_Position = 1


  //the Tetrominos without rotations
  const upNextTetrominoes = [
    [1, displayWidth+1, displayWidth*2+1, 2], //lTetromino
    [0, displayWidth, displayWidth+1, displayWidth*2+1], //zTetromino
    [1, displayWidth, displayWidth+1, displayWidth+2], //tTetromino
    [0, 1, displayWidth, displayWidth+1], //oTetromino
    [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1] //iTetromino
  ]

  //display the next shape in the mini-grid display
  function displayShape() {
    //remove current tetromino form the entire mini-grid
    displaySquares.forEach(square => {
      square.classList.remove('tetromino')
      square.style.backgroundColor = ''
    })
    upNextTetrominoes[nextRandom].forEach( index => {
      displaySquares[display_Position + index].classList.add('tetromino')
      displaySquares[display_Position + index].style.backgroundColor = colors[nextRandom]
    })
  }

  //add functionality to the button
  startBtn.addEventListener('click', () => {
    if (timerId) {
      clearInterval(timerId)
      timerId = null
    } else {
      draw()
      timerId = setInterval(moveDown, 1000)
      //timerId=true
      nextRandom = Math.floor(Math.random()*theTetrominoes.length)
      displayShape()
      //next shape changes after click on pause
    }
  })

  //add score
  function addScore() {
    for (let i = 0; i < 199; i +=width) {
      const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]

      if(row.every(index => squares[index].classList.contains('taken'))) {
        score +=10
        scoreDisplay.innerHTML = score
        row.forEach(index => {
          squares[index].classList.remove('taken')
          squares[index].classList.remove('tetromino')
          squares[index].style.backgroundColor = ''
        })
        const squaresRemoved = squares.splice(i, width)
        squares = squaresRemoved.concat(squares)
        squares.forEach(cell => grid.appendChild(cell))
      }
    }
  }

  //game over
  function gameOver() {
    if(current_Shape.some(index => squares[current_Positioin + index].classList.contains('taken'))) {
      scoreDisplay.innerHTML = 'end'
      clearInterval(timerId)
      timerId=null
      document.querySelector('.score').style.backgroundColor='red'
   }
  }

})
