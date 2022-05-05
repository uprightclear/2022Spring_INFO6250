import { useState } from 'react';

function Play({ setGuessWord }) {
    const [input, setInput] = useState('');
    return (
        <div className="guess-form">
            <span>Enter your guess: </span>
            <input onChange={(e) => setInput(e.target.value)} value={input}/>
            <button onClick={() => { setGuessWord(input); setInput('') }} disabled={!input}>Submit</button>
        </div>
    );
}
export default Play;
