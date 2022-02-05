const items = [
    'Сдать проектную работу',
    'Покормить собаку',
    'Выгулять кота'
];

const template = document.querySelector('#item_template').content;
const list = document.querySelector('.list');
const input = document.querySelector('.form__input');
const button = document.querySelector('.form__submit');

function render() {
    items.forEach(renderItem);
}

function renderItem(text) {
    const newItem = template.cloneNode(true);
    newItem.querySelector('.item__text').innerText = text;

    addListeners(newItem)
    list.appendChild(newItem);
}

function addListeners(el) {
    el.querySelector('.delete').addEventListener('click', handleDelete)
    el.querySelector('.duplicate').addEventListener('click', handleDuplicate)
    el.querySelector('.edit').addEventListener('click', handleEdit)
}

function handleDelete(event) {
    event.target.closest('.list__item').remove();
    resetForm();
}

function handleDuplicate(event) {
    const text = event.target.closest('.list__item').querySelector('.item__text').textContent

    renderItem(text);
}

let item;

function handleEdit(event) {
    item = event.target.closest('.list__item');
    const text = item.querySelector('.item__text').textContent;

    input.value = text;
    button.value = 'Изменить';
    button.removeEventListener('click', addItem);
    button.addEventListener('click', handleConfirmEdit);
}

function handleConfirmEdit() {
    item.querySelector('.item__text').innerText = input.value;

    resetForm();
}

function resetForm() {
    button.value = 'Добавить';
    button.removeEventListener('click', handleConfirmEdit);
    button.addEventListener('click', addItem);
    input.value = '';
}

function addItem(event) {
    renderItem(input.value);
}

button.addEventListener('click', addItem);

render()
