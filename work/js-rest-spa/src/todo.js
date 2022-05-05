"use strict";
(function() {
    let inventoryData = [];
    const MESSAGES = {
        networkError: 'Trouble connecting to the network.  Please try again',
        default: 'Something went wrong.  Please try again',
    };

    const listEl = document.querySelector('#inventory-app .inventories');
    const inputEl = document.querySelector('#inventory-app .to-add');
    const buttonEl = document.querySelector('#inventory-app .add');
    const status = document.querySelector('#inventory-app .status');

    checkForSession();
    addAbilityToLogin();
    addAbilityToLogout();
    disableButtonIfNoInput();
    addAbilityToAddItems();
    addAbilityToDeleteItems();
    addAbilityToIncreaseInventory();
    addAbilityToDecreaseInventory();

    function disableButtonIfNoInput() {
        inputEl.addEventListener('input', () => {
            buttonEl.disabled = !inputEl.value;
        });
    }

    function addAbilityToAddItems() {
        buttonEl.addEventListener('click', (e) => {
            fetch(`/inventory`, {
                method: 'POST',
                headers: new Headers({
                    'content-type': 'application/json'
                }),
                body: JSON.stringify({
                    name: inputEl.value,
                })
            })
                .then( response => {
                    if(response.ok) {
                        return response.json();
                    } else {
                        return response.json().then(err => Promise.reject(err));
                    }
                })
                .then( inventory => {
                    inventoryData = inventory;
                    inputEl.value = '';
                    render(inventory);
                    updateStatus('Opreration success.');
                })
                .catch(err => updateStatus("You have an error: " + err.error));
        });
    }

    function addAbilityToIncreaseInventory() {
        listEl.addEventListener('click', (e) => {
            if(!e.target.classList.contains('increase')) {
                return;
            }
            const itemId = e.target.dataset.itemid;
            fetch(`/inventory/increase/${itemId}`, {
                method: 'POST'
            })
                .then( response => {
                    if(response.ok) {
                        return response.json();
                    } else {
                        return response.json().then(err => Promise.reject(err));
                    }
                })
                .then( inventory => {
                    inventoryData = inventory;
                    render(inventoryData);
                    updateStatus('Opreration success.');
                })
                .catch(err => updateStatus("You have an error: " + err.error));
        });
    }

    function addAbilityToDecreaseInventory() {

        listEl.addEventListener('click', (e) => {
            if(!e.target.classList.contains('decrease')) {
                return;
            }

            const itemId = e.target.dataset.itemid;
            const item = inventoryData[itemId];
            const name = item.name;
            const quantity = item.quantity - 1;
            fetch(`/inventory/decrease/${itemId}`, {
                method: 'POST',
                headers: new Headers({
                    'content-type': 'application/json'
                }),
                body: JSON.stringify({
                    itemId: {
                        itemId: itemId,
                        name: name,
                        quantity: quantity
                    }
                })
            })
                .then( response => {
                    if(response.ok) {
                        return response.json();
                    } else {
                        return response.json().then(err => Promise.reject(err));
                    }
                })
                .then( inventory => {
                    inventoryData = inventory;
                    render(inventoryData);
                    updateStatus('Opreration success.');
                })
                .catch(err => updateStatus("You have an error: " + err.error));
        });
    }

    function updateStatus( message ) {
        status.innerText = message;
    }

    function setLoggedIn( isLoggedIn ) {
        const loginEl = document.querySelector('main');
        if(isLoggedIn) {
            loginEl.classList.remove('not-logged-in');
            loginEl.classList.add('logged-in');
        } else {
            loginEl.classList.add('not-logged-in');
            loginEl.classList.remove('logged-in');
        }
        render(inventoryData);
        renderStatus('');
    }

    function renderOnLogin(todos) {
        inventoryData = todos;
        setLoggedIn(true);
    }

    function checkForSession() {
        fetchSession()
            .then( populateTodos )
            .catch( () => setLoggedIn(false) );
    }

    function addAbilityToLogin() {
        const buttonEl = document.querySelector('.login button');
        const usernameEl = document.querySelector('.login__username');
        buttonEl.addEventListener('click', (e) => {
            const username = usernameEl.value;
            fetchLogin(username)
                .then( renderOnLogin )
                .catch( error => renderStatus(error) );
        });
    }

    function addAbilityToLogout() {
        const buttonEl = document.querySelector('.logout');
        buttonEl.addEventListener('click', (e) => {
            inventoryData = [];
            fetchLogout()
                .then( () => setLoggedIn(false) )
                .catch( error => renderStatus(error) );
        });
    }

    function populateTodos() {
        fetchTodos()
            .then( rawTodos => {
                inventoryData = rawTodos;
                setLoggedIn(true);
                render(inventoryData);
                renderStatus('');
            })
            .catch( error => {
                renderStatus(error);
            });
    }


    function addAbilityToDeleteItems() {
        listEl.addEventListener('click', (e) => {
            if(!e.target.classList.contains('delete')) {
                return;
            }

            const itemId = e.target.dataset.itemid;
            fetch(`/inventory/${itemId}`, {
                method: 'DELETE'
            })
                .then( response => {
                    if(response.ok) {
                        return response.json();
                    } else {
                        return response.json().then(err => Promise.reject(err));
                    }
                })
                .then( inventory => {
                    inventoryData = inventory;
                    render(inventoryData);
                    updateStatus('Opreration success.');
                })
                .catch(err => updateStatus("You have an error: " + err.error));
        });
    }

    function fetchTodos() {
        return fetch('/api/todos')
            .catch( () => Promise.reject({ error: 'networkError' }) )
            .then( response => {
                if (response.ok) {
                    return response.json();
                }
                return response.json()
                    .catch( error => Promise.reject({ error }) )
                    .then( err => Promise.reject(err) );
            });
    }

    function fetchSession() {
        return fetch('/api/session', {
            method: 'GET',
        })
            .catch( () => Promise.reject({ error: 'networkError' }) )
            .then( response => {
                if (response.ok) {
                    return response.json();
                }
                return response.json()
                    .catch( error => Promise.reject({ error }) )
                    .then( err => Promise.reject(err) );
            });
    }

    function fetchLogout() {
        return fetch('/api/session', {
            method: 'DELETE',
        })
            .catch( () => Promise.reject({ error: 'networkError' }) )
            .then( response => {
                if (response.ok) {
                    return response.json();
                }
                return response.json()
                    .catch( error => Promise.reject({ error }) )
                    .then( err => Promise.reject(err) );
            });
    }

    function fetchLogin(username) {
        return fetch('/api/session', {
            method: 'POST',
            headers: new Headers({
                'content-type': 'application/json'
            }),
            body: JSON.stringify({ username }),
        })
            .catch( () => Promise.reject({ error: 'networkError' }) )
            .then( response => {
                if (response.ok) {
                    return response.json();
                }
                return response.json()
                    .catch( error => Promise.reject({ error }) )
                    .then( err => Promise.reject(err) );
            });
    }

    function render( inventory ) {
        const html = Object.values(inventory).map( (item, index) => {
            return `
        <li class="inventory ${item.quantity === 0 ? "out-of-stock" : ""}">
            <div class="inventory-container">
                <span class="inventory-name" data-itemId="${item.itemId}">${item.name}</span>
                <div class="inventory-quantity">
                    <button class="decrease" data-itemId="${item.itemId}" ${item.quantity === 0 ? "disabled" : ""}>-</button>
                    <span class="quantity-value" data-itemId="${item.itemId}">${item.quantity}</span>
                    <button class="increase" data-itemId="${item.itemId}">+</button>
                </div>
                <button class="delete" data-itemId="${item.itemId}">X Delete</button>
            </div>
        </li>
      `;

        }).join('');
        listEl.innerHTML = html;
        buttonEl.disabled = !inputEl.value;
    }

    function renderStatus(message) {
        const statusEl = document.querySelector('.status');
        if( !message ) {
            statusEl.innerText = '';
            return;
        }
        const key = message?.error ? message.error : 'default';
        statusEl.innerText = MESSAGES[key] || MESSAGES.default;
    }

})();
