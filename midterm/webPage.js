const words = require('./words');
const users = require('./users');

const webPage = {
    loginPage: function() {
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Guess Word Game</title>
                <link rel="stylesheet" href="/CSS/styles.css">
            </head>
            <body>
                <div class="login">
                    <h1>Login to start the game</h1>
                    <form action="/login" method="POST">
                        Username: <input name="username">
                        <button type="submit">Login</button>
                    </form>
                </div>
            </body>
            </html>
        `;
    },

    loginFail: function (errors) {
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Guess Word Game</title>
                <link rel="stylesheet" href="/CSS/styles.css">
            </head>
            <body>
                <div class="loginFile">
                    <p>${errors}</p>
                    <p>Please <a href="/">Retry</a></p>                    
                </div>
            </body>
            </html>
        `
    },

    guessPage: function (username, guessedWord, answer) {
        let wordList = '<p>';
        for(let i = 0; i < words.length; i++) {
            if( i !== 0 && i % 10 === 0) {
                wordList += '<br>' + words[i] + ' ';
            } else {
                wordList += words[i] + ' ';
            }
        }
        wordList += '</p>';
        return `
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <title>Guess Word Game</title>
            <link rel="stylesheet" href="/CSS/styles.css">
        </head>
        <body>
            <div class="guessPage">
                <h2>Guess the Word</h2>
                <p class="userInfo">Username: ${username}</p>
                <div class="option">
                    <form action="/logout" method="POST"><button type="submit">Logout</button></form>
                    <form action="/new-game" method="POST"><button type="submit">Restart</buttom></form>
                </div>
                <div class="word-list">
                    <h3>World List</h3>
                    ${wordList}
                </div>
                <div class="wrapper">
                    <input type="hidden" name="answer">
                    <div>
                        <form class="input-form" action="/guess" method="POST">
                            <input class="input-guess-text" name="guessedWord" value="" placeholder="Place input your guess" required/>
                            <button type="submit">Submit</buttom>
                        </form>
                    </div>
                    <div class="errorMessage">
                        ${webPage.checkValid(username)}
                    </div>
                    <div class="wrong-answers-container">
                        <div class="wrong-label">Your Guess</div>
                        ${webPage.guessedWordsPost(username)}
                    </div>
                </div>
            </div>
        </body>
        </html>
        `
    },

    checkValid: function (username) {
        if(users[username].invalid) return `Your guess is invalid, please check the Word List.`;
        else if (users[username].occured) return 'This word has been guessed, please try another.'
        return ``;
    },

    guessedWordsPost: function (username) {
        return ` <ul class="guessedWords">` +
            Object.keys(users[username].guessedLists).map(word => `
            <li>
                <div class="word">
                    <p>#${users[username].guessedLists[word]['turns']} ${word} matches ${users[username].guessedLists[word]['matches']}</p>
                </div>
            </li>
            `).join('') +
            `</ul>`;
    },

    correctGuessedLetters: function (username, guessedWord) {
        const ans = users[username].answer;
        let matches = 0;
        const letterCount = {};

        for (let letter of ans.toLowerCase()) {
            if (letterCount[letter]) {
                letterCount[letter] += 1;
            } else {
                letterCount[letter] = 1;
            }
        }

        for (let letter of guessedWord.toLowerCase()) {
            if (letterCount[letter]) {
                letterCount[letter] -= 1;
                matches += 1;
            }
        }
        console.log(`This is letter Matched count: ${matches}`);
        return matches;
    },


}

module.exports = webPage;