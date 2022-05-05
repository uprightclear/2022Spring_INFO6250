const uuid = require('uuid').v4;

function makeInventoryList() {
    const id = uuid();

    const inventoryList = {};
    const inventorys = {
        [id]: {
            itemId: id,
            name: "example",
            quantity: 8
        }
    }

    inventoryList.getInventorys = function () {
        return inventorys;
    }

    inventoryList.getInventory = function (id) {
        return inventorys[id];
    }

    inventoryList.addInventory = function (name) {
        const id = uuid();
        inventorys[id] = {
            itemId: id,
            name: name,
            quantity: 0
        }
        return id;
    }

    inventoryList.deleteInventory = function (id) {
        delete inventorys[id];
    }

    inventoryList.increaseInventory = function (id) {
        inventorys[id].quantity++;
    }

    inventoryList.decreaseInventory = function (id) {
        inventorys[id].quantity--;
    }

    return inventoryList;
}


module.exports = {
    makeInventoryList
};