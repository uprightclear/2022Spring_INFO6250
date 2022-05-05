"use strict";
(function iife() {

    const Items = [
        {
            item: 'example',
            quant: 0
        }
    ];

    const itemList = document.querySelector('#list-app .item-list');
    const input = document.querySelector('#list-app input');
    const addButton = document.querySelector('#list-app button');
    const substractButton = document.querySelector('.item-list .substract');

    //give an example at first
    render(Items);
    disableAddButton();
    addItem();
    deleteItem();
    addQuant();
    subtractQuant();

    function render(Items) {

        const html = Items.map((listItem, index) => {
            return `
            <li>
                <button class="delete" data-index="${index}">x</button>
                <span class="item" data-index="${index}">${listItem.item}</span>
                <div id="quant-container">
                    <button class="substract" data-index="${index}"> - </button>
                    <span class="quant">${listItem.quant}</span>
                    <button class="addition" data-index="${index}"> + </button>
                </div>
            </li>
            `;
        }).join('');

        itemList.innerHTML = html;

        addButton.disabled = !input.value;
    }

    //disable add button if no input
    function disableAddButton() {
        input.addEventListener('input', () => {
            addButton.disabled = !input.value;
        });
    }

    //add new item
    function addItem() {
        addButton.addEventListener('click', (e) => {
            const newList = {
                item: input.value,
                quant: 0
            };
            Items.push(newList);
            input.value = '';
            render(Items);
        });
    }

    //delete item
    function deleteItem() {
        itemList.addEventListener('click', (e) => {
            if (!e.target.classList.contains('delete')) {
                return;
            }
            const index = e.target.dataset.index;
            Items.splice(index, 1);
            render(Items);
        });
    }

    //increase item
    function addQuant() {
        itemList.addEventListener('click', (e) => {
            if (!e.target.classList.contains('addition')) {
                return;
            }
            const index = e.target.dataset.index;
            Items[index].quant++;
            render(Items);
        });
    }

    //decrease item
    function subtractQuant() {
        itemList.addEventListener('click', (e) => {
            if (!e.target.classList.contains('substract')) {
                return;
            }
            const index = e.target.dataset.index;
            if (Items[index].quant === 0) {
                substractButton.disabled;
            }
            Items[index].quant--;
            render(Items);
        });
    }

})();