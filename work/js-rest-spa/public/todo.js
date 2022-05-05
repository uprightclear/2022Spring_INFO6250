/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!*********************!*\
  !*** ./src/todo.js ***!
  \*********************/


(function () {
  var inventoryData = [];
  var MESSAGES = {
    networkError: 'Trouble connecting to the network.  Please try again',
    "default": 'Something went wrong.  Please try again'
  };
  var listEl = document.querySelector('#inventory-app .inventories');
  var inputEl = document.querySelector('#inventory-app .to-add');
  var buttonEl = document.querySelector('#inventory-app .add');
  var status = document.querySelector('#inventory-app .status');
  checkForSession();
  addAbilityToLogin();
  addAbilityToLogout();
  disableButtonIfNoInput();
  addAbilityToAddItems();
  addAbilityToDeleteItems();
  addAbilityToIncreaseInventory();
  addAbilityToDecreaseInventory();

  function disableButtonIfNoInput() {
    inputEl.addEventListener('input', function () {
      buttonEl.disabled = !inputEl.value;
    });
  }

  function addAbilityToAddItems() {
    buttonEl.addEventListener('click', function (e) {
      fetch("/inventory", {
        method: 'POST',
        headers: new Headers({
          'content-type': 'application/json'
        }),
        body: JSON.stringify({
          name: inputEl.value
        })
      }).then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then(function (err) {
            return Promise.reject(err);
          });
        }
      }).then(function (inventory) {
        inventoryData = inventory;
        inputEl.value = '';
        render(inventory);
        updateStatus('Opreration success.');
      })["catch"](function (err) {
        return updateStatus("You have an error: " + err.error);
      });
    });
  }

  function addAbilityToIncreaseInventory() {
    listEl.addEventListener('click', function (e) {
      if (!e.target.classList.contains('increase')) {
        return;
      }

      var itemId = e.target.dataset.itemid;
      fetch("/inventory/increase/".concat(itemId), {
        method: 'POST'
      }).then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then(function (err) {
            return Promise.reject(err);
          });
        }
      }).then(function (inventory) {
        inventoryData = inventory;
        render(inventoryData);
        updateStatus('Opreration success.');
      })["catch"](function (err) {
        return updateStatus("You have an error: " + err.error);
      });
    });
  }

  function addAbilityToDecreaseInventory() {
    listEl.addEventListener('click', function (e) {
      if (!e.target.classList.contains('decrease')) {
        return;
      }

      var itemId = e.target.dataset.itemid;
      var item = inventoryData[itemId];
      var name = item.name;
      var quantity = item.quantity - 1;
      fetch("/inventory/decrease/".concat(itemId), {
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
      }).then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then(function (err) {
            return Promise.reject(err);
          });
        }
      }).then(function (inventory) {
        inventoryData = inventory;
        render(inventoryData);
        updateStatus('Opreration success.');
      })["catch"](function (err) {
        return updateStatus("You have an error: " + err.error);
      });
    });
  }

  function updateStatus(message) {
    status.innerText = message;
  } /////////////////////////////////


  function setLoggedIn(isLoggedIn) {
    // Notice how more complicated this is because we're not basing this off of state data
    // Not just here, but in the places we have to change our login status
    var loginEl = document.querySelector('main');

    if (isLoggedIn) {
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
    fetchSession().then(populateTodos)["catch"](function () {
      return setLoggedIn(false);
    });
  }

  function addAbilityToLogin() {
    var buttonEl = document.querySelector('.login button');
    var usernameEl = document.querySelector('.login__username');
    buttonEl.addEventListener('click', function (e) {
      var username = usernameEl.value;
      fetchLogin(username).then(renderOnLogin)["catch"](function (error) {
        return renderStatus(error);
      });
    });
  }

  function addAbilityToLogout() {
    var buttonEl = document.querySelector('.logout');
    buttonEl.addEventListener('click', function (e) {
      inventoryData = [];
      fetchLogout().then(function () {
        return setLoggedIn(false);
      })["catch"](function (error) {
        return renderStatus(error);
      });
    });
  }

  function populateTodos() {
    fetchTodos().then(function (rawTodos) {
      inventoryData = rawTodos;
      setLoggedIn(true);
      render(inventoryData);
      renderStatus('');
    })["catch"](function (error) {
      console.log(!error);
      renderStatus(error);
    });
  }

  function addAbilityToDeleteItems() {
    listEl.addEventListener('click', function (e) {
      if (!e.target.classList.contains('delete')) {
        return;
      }

      var itemId = e.target.dataset.itemid;
      fetch("/inventory/".concat(itemId), {
        method: 'DELETE'
      }).then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then(function (err) {
            return Promise.reject(err);
          });
        }
      }).then(function (inventory) {
        inventoryData = inventory;
        render(inventoryData);
        updateStatus('Opreration success.');
      })["catch"](function (err) {
        return updateStatus("You have an error: " + err.error);
      });
    });
  }

  function fetchTodos() {
    return fetch('/api/todos')["catch"](function () {
      return Promise.reject({
        error: 'networkError'
      });
    }).then(function (response) {
      if (response.ok) {
        return response.json();
      }

      return response.json()["catch"](function (error) {
        return Promise.reject({
          error: error
        });
      }).then(function (err) {
        return Promise.reject(err);
      });
    });
  }

  function fetchSession() {
    return fetch('/api/session', {
      method: 'GET'
    })["catch"](function () {
      return Promise.reject({
        error: 'networkError'
      });
    }).then(function (response) {
      if (response.ok) {
        return response.json();
      }

      return response.json()["catch"](function (error) {
        return Promise.reject({
          error: error
        });
      }).then(function (err) {
        return Promise.reject(err);
      });
    });
  }

  function fetchLogout() {
    return fetch('/api/session', {
      method: 'DELETE'
    })["catch"](function () {
      return Promise.reject({
        error: 'networkError'
      });
    }).then(function (response) {
      if (response.ok) {
        return response.json();
      }

      return response.json()["catch"](function (error) {
        return Promise.reject({
          error: error
        });
      }).then(function (err) {
        return Promise.reject(err);
      });
    });
  }

  function fetchLogin(username) {
    return fetch('/api/session', {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json'
      }),
      body: JSON.stringify({
        username: username
      })
    })["catch"](function () {
      return Promise.reject({
        error: 'networkError'
      });
    }).then(function (response) {
      if (response.ok) {
        return response.json();
      }

      return response.json()["catch"](function (error) {
        return Promise.reject({
          error: error
        });
      }).then(function (err) {
        return Promise.reject(err);
      });
    });
  }

  function render(inventory) {
    var html = Object.values(inventory).map(function (item, index) {
      return "\n        <li class=\"inventory ".concat(item.quantity === 0 ? "out-of-stock" : "", "\">\n            <div class=\"inventory-container\">\n                <span class=\"inventory-name\" data-itemId=\"").concat(item.itemId, "\">").concat(item.name, "</span>\n                <div class=\"inventory-quantity\">\n                    <button class=\"decrease\" data-itemId=\"").concat(item.itemId, "\" ").concat(item.quantity === 0 ? "disabled" : "", ">-</button>\n                    <span class=\"quantity-value\" data-itemId=\"").concat(item.itemId, "\">").concat(item.quantity, "</span>\n                    <button class=\"increase\" data-itemId=\"").concat(item.itemId, "\">+</button>\n                </div>\n                <button class=\"delete\" data-itemId=\"").concat(item.itemId, "\">X Delete</button>\n            </div>\n        </li>\n      ");
    }).join('');
    listEl.innerHTML = html;
    buttonEl.disabled = !inputEl.value;
  }

  function renderStatus(message) {
    var statusEl = document.querySelector('.status');

    if (!message) {
      statusEl.innerText = '';
      return;
    }

    var key = message !== null && message !== void 0 && message.error ? message.error : 'default';
    statusEl.innerText = MESSAGES[key] || MESSAGES["default"];
  }
})();
/******/ })()
;
//# sourceMappingURL=todo.js.map