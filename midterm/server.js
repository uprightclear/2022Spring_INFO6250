const express = require('express');
const app = express();
const PORT = 3000;
const cookieParser = require('cookie-parser');
const uuidv4 = require('uuid').v4;
const webPage = require('./webPage');
const users = require('./users');
const words = require('./words')

const checkUsername = function (username) {
    const errors = [];
    const clean = username.replace(/[^A-Za-z0-9_]+/g, '');

    if(clean === 'dog') {
        errors.push('username cannot be dog');
    }
    if (clean !== username) {
        errors.push('username contained disallowed characters');
    }
    if (!username) {
        errors.push('username was empty');
    }
    return errors.length ? errors : '';
}

app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static('./public'));

const sessions = {};

//get the homepage
app.get('/', (req, res) => {
    const sid = req.cookies.sid;
    if(sid && sessions[sid]) {
        const username = sessions[sid].username;
        if(!users[username]) {
            users.set(username);
        }
        const answer = users[username].answer;
        console.log(`logged in as ${username} and answer is ${answer}`);
        res.send(webPage.guessPage(username, '-----',answer));
        return;
    }
    res.send(webPage.loginPage());
});

//login
app.post('/login', (req, res) => {
    const username = req.body.username.trim();
    const errors = checkUsername(username);
    if(errors){
        res.status(401).send(webPage.loginFail(errors));
        return;
    }
    //The server will create a UUID-based session id and store it in a cookie.
    //The server will also associate that sid with the username.
    const sid = uuidv4();
    sessions[sid] = {username};
    res.cookie('sid', sid);
    res.redirect('/');
});

//guess word
app.post('/guess', express.urlencoded({ extended: false }), (req, res) => {
    let guessedWord = req.body.guessedWord;
    const sid = req.cookies.sid;
    const username = sessions[sid].username;
    const answer = users[username].answer;
    users[username].invalid = false;
    users[username].occured = false;
    if (!guessedWord) {
        res.redirect('/');
    } else if (!words.includes(guessedWord)) {
        users[username].invalid = true;
        res.redirect('/');
    } else if (users[username].guessedLists[guessedWord]) {
        users[username].occured = true;
        res.redirect('/');
    } else if (guessedWord === answer) {
        users[username].isWon = true;
        res.redirect('/success');
    } else {
        const matches = webPage.correctGuessedLetters(username, guessedWord);
        const turns = Object.keys(users[username].guessedLists).length + 1;
        users[username].guessedLists[guessedWord] = {
            matches: matches,
            turns: turns
        }
        res.redirect('/');
    }
});

//success
app.get('/success', (req, res) => {
    res.send(`
    <link rel="stylesheet" href="/CSS/styles.css">
    <div class="winning-page">
        <p>You have won the game!</p>
        <form class="back-home" action="/new-game" method="post">
            <button type="submit">Play Again</button>
        </form>
    </div>
    `);
})

//start a new game
app.post('/new-game', (req, res) => {
    const sid = req.cookies.sid;

    if(sid && sessions[sid]) {
        const username = sessions[sid].username;
        users.setNewWord(username);
        users[username].guessedLists = [];
        res.redirect('/');
    } else {
        res.send(webPage.loginFail('Please login at first!'));
    }
})

//logOut
app.post('/logout', (req, res) => {
    const sid = req.cookies.sid;
    delete sessions[sid];
    res.clearCookie('sid');
    res.redirect('/');
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))