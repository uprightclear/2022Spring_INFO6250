const words = require('./words');

const users = {
    set: function (username) {
        users[username] = {
            guessedLists: [],
            answer: getRandomWord(words),
            invalid: false,
            occured: false,
            isWon: false
        }
    },

    setNewWord: function (username) {
        users[username].answer = getRandomWord(words);
    }
};

const getRandomWord = function (words) {
    const pickNum = Math.floor(Math.random() * words.length);
    return words[pickNum].toLowerCase();
}

module.exports = users;