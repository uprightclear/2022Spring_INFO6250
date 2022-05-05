const express = require('express');
const app = express();
const PORT = 3000;
const cookieParser = require('cookie-parser');
const uuidv4 = require('uuid').v4;
const webPage = require('./webPage');

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
const storedData = {};
//get the homepage
app.get('/', (req, res) => {
    const sid = req.cookies.sid;
    if(sid && sessions[sid]) {
        const username = sessions[sid].username;
        if(!storedData[username]) {
            storedData[username] = {word: ''};
        }
        // res.send(`You are logged in as ${username}`);
        res.send(webPage.dataPage(username, storedData[username].word));
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

//changeWord
app.post('/change', (req, res) => {
    const word = req.body.word.trim();
    const sid = req.cookies.sid;
    const username = sessions[sid].username;
    storedData[username] = {word};
    res.redirect('/');
});

//logOut
app.post('/logout', (req, res) => {
    const sid = req.cookies.sid;
    delete sessions[sid];
    res.clearCookie('sid');
    res.redirect('/');
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`))