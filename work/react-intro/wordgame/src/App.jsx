import './App.css';
import { useState } from 'react';
import Play from './Play';
import Result from './Result';

function App() {
  const [guessWord, setGuessWord] = useState();
  return (
      <div className="app">
        <Play setGuessWord={setGuessWord} />
        <Result guessWord={guessWord} />
      </div>
  );
}

export default App;