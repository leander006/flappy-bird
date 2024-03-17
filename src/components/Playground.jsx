
import React, {useState, useEffect} from 'react'
import Bird from './Bird'
import Pipes from './Pipes'
import '../Playground.css'

const Playground = ({level,score,setLevel,setScore}) => {
  const [birdPosition, setBirdPosition] = useState({x: 50, y: 200})
  const [pipes, setPipes] = useState([])
  const [gameOver, setGameOver] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)

  const pipeImages = [
    'https://media.geeksforgeeks.org/wp-content/uploads/20231211115753/6d2a698f31595a1.png',
    'https://i.stack.imgur.com/lJa2g.png', // Add more pipe image URLs as needed
    // Add more pipe image URLs as needed
  ]

  
  const jump = () => {
    if (!gameOver && gameStarted) {
      setBirdPosition(prev => ({...prev, y: prev.y - 60}))
    } else if (!gameOver && !gameStarted) {
      // Start the game on the first jump
      setGameStarted(true)
    } else {
      // Restart the game
      setBirdPosition({x: 50, y: 200})
      setPipes([])
      setGameOver(false)
      setGameStarted(true)
    }
  }

  const checkCollision = () => {
      const birdTop = birdPosition.y;
      const birdBottom = birdPosition.y + 50;
      const birdLeft = birdPosition.x;
      const birdRight = birdPosition.x + 50;

      pipes.forEach((pipe) => {
          const pipeTop = pipe.y;
          const pipeBottom = pipe.y + 600;
          const pipeLeft = pipe.x;
          const pipeRight = pipe.x + 100;

          const isColliding =
              birdRight > pipeLeft &&
              birdLeft < pipeRight &&
              birdBottom > pipeTop &&
              birdTop < pipeBottom;

          if (isColliding) {
              if (birdLeft > pipeLeft && birdRight < pipeRight && birdBottom < pipeBottom) {
                  // Bird has crashed through the pipe, increase score
                  setScore((prevScore) => prevScore + 1);
              } else {
                  // Bird has hit the pipe, end the game
                  setGameOver(true);
                  setGameStarted(false);
              }
          }
      });

      // Check if bird is out of the screen vertically
      if (birdBottom > 800 || birdTop < -170) {
          // Bird is out of bounds, end the game
          setGameOver(true);
          setGameStarted(false);
      }
  };

  useEffect(() => {
    checkCollision()
  }, [birdPosition, pipes, gameOver])

  useEffect(() => {
    const gravity = setInterval(() => {
      setBirdPosition(prev => ({...prev, y: prev.y + 5}))
      checkCollision()
    }, 30)

    const pipeGenerator = setInterval(() => {
      if (!gameOver && gameStarted) {
        setPipes(prev => [
          ...prev,
          {
            x: 400,
            y: 300,
          },
        ])
      }
    }, 2000)

    const pipeMove = setInterval(() => {
      if (!gameOver && gameStarted) {
        setPipes(prev => prev.map(pipe => ({...pipe, x: pipe.x - 5})))
      }
    }, 30)

    return () => {
      clearInterval(gravity)
      clearInterval(pipeGenerator)
      clearInterval(pipeMove)
    }
  }, [gameOver, gameStarted])

  return (
    <div className={`Playground ${gameOver ? 'game-over' : ''}`} onClick={jump}>
      <Bird birdPosition={birdPosition} />
      {pipes.map((pipe, index) => (
        <Pipes key={index} src={pipeImages[index % 2]} pipePosition={pipe} />
      ))}
      {gameOver && (
        <center>
          <div className="game-over-message">
            Game Over!
            <br />
            <p
              style={{
                backgroundColor: 'blue',
                padding: '2px 6px',
                borderRadius: '5px',
              }}
            >
              Click anywhere to Restart
            </p>
            <h1>Score: {score}</h1>
            <h1>Level: {level}</h1>
          </div>

        </center>
      )}
    </div>
  )
}

export default Playground