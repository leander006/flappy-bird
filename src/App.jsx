
import React from 'react'
import Playground from './components/Playground'
import { useState } from 'react'

const App = () => {
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  return (
    <div>
      <Playground score={score} level={level} setLevel={setLevel} setScore={setScore}/>
    </div>
  )
}

export default App