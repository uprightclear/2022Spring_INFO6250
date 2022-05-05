const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

const sessions = require('./sessions');
const inventoryStorage = require('./inventoryStorage');
const users = require('./users');

app.use(cookieParser());
app.use(express.static('./public'));
app.use(express.json());

// Sessions
app.get('/api/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if(!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }
    res.json({ username });
});

app.post('/api/session', (req, res) => {
    const { username } = req.body;
    if(!username) {
        res.status(400).json({ error: 'required-username' });
        return;
    }
    if(username === 'dog') {
        res.status(403).json({ error: 'auth-insufficient' });
        return;
    }
    const sid = sessions.addSession(username);
    const existingUserData = users.getUserData(username);
    if(!existingUserData) {
        users.addUserData(username, inventoryStorage.makeInventoryList());
    }
    res.cookie('sid', sid);
    res.json(users.getUserData(username).getInventorys());
});

app.delete('/api/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if(sid) {
        res.clearCookie('sid');
    }
    if(username) {
        // Delete the session, but not the user data
        sessions.deleteSession(sid);
    }
    // We don't report any error if sid or session didn't exist
    // Because that means we already have what we want
    res.json({ username });
});

// Todos
app.get('/api/todos', (req, res) => {
    // Session checks for these are very repetitive - a good place to abstract out
    // I've left the repetitive sections here for ease of learning
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if(!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }
    res.json(users.getUserData(username).getInventorys());
});

app.post('/inventory', express.json(), (req,res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if(!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }
    const {name} = req.body;
    if (!name) {
        res.status(400).json({error: `item name missing`});
    } else {
        const inventoryList = users.getUserData(username);
        inventoryList.addInventory(name);
        res.json(inventoryList.getInventorys());
    }
});

app.delete('/inventory/:itemId', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    const itemId = req.params.itemId;
    if (!itemId) {
        res.status(400).json({error: `itemId missing`});
    } else {
        const inventoryList = users.getUserData(username);
        inventoryList.deleteInventory(itemId);
        res.json(inventoryList.getInventorys());
    }
});

app.post('/inventory/increase/:itemId', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    const itemId = req.params.itemId;
    if (!itemId) {
        res.status(400).json({error: `itemId missing`});
    } else {
        const inventoryList = users.getUserData(username);
        inventoryList.increaseInventory(itemId);
        res.json(inventoryList.getInventorys());
    }
});

app.post('/inventory/decrease/:itemId', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    const itemId = req.params.itemId;
    if (!itemId) {
        res.status(400).json({error: `itemId missing`});
    } else {
        const inventoryList = users.getUserData(username);
        inventoryList.decreaseInventory(itemId);
        res.json(inventoryList.getInventorys());
    }
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

