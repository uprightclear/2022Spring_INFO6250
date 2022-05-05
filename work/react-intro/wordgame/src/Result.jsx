const target = "RECAT";

function isValidWord(guess) {
    const clean = guess.replace(/[^A-Za-z]+/g, '');
    return clean === guess;
}

function countMatches(guess, target) {
    let matches = 0;
    const letterCount = {};
    for (let letter of target.toLowerCase()) {
        letterCount[letter] = letterCount[letter] + 1 || 1;
    }

    for (let letter of guess.toLowerCase()) {
        if (letterCount[letter]) {
            letterCount[letter] -= 1;
            matches += 1;
        }
    }

    return matches;
}

function Result({ guessWord }) {
    let result = '';
    let resultClass = '';
    if (!guessWord) {
        result = 'Please input your guess...';
        resultClass = "waiting";
    } else if (!isValidWord(guessWord)) {
        result = `contains disallowed characters!`;
        resultClass = "invalid";
    } else if (guessWord.toLowerCase() === target.toLowerCase()) {
        result = `is the secret word!`;
        resultClass = "win";
    } else if (guessWord.length !== target.length) {
        result = `was not a valid word.`;
        resultClass = "invalid";
    } else {
        const matches = countMatches(guessWord, target);
        result = `had ${matches} letters in common.`;
        resultClass = "match";
    }
    return (
        <div className="result">
            <div className={resultClass}>
                <span className="guess-word">{guessWord}</span>
                {result}
            </div>
        </div>
    );
}

export default Result;