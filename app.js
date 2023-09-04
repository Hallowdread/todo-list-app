// ? Creating the DOM
const todoInput = document.querySelector('.todo-input');
const inputSubmit = document.querySelector('.input-submit');
const todoList = document.querySelector('.todo-list');
const todoContainer = document.querySelector('.todo-container');

// ? Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
inputSubmit.addEventListener('click',addTodo);
todoList.addEventListener('click', checkDelete);

// ? Functions
function addTodo(e) {
    //* Removes the default submit
    e.preventDefault();
    if (todoInput.value === ''){
        alert('Please enter the todos')
    }else{
        // * Create DIV
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        // * Create the LI
        const newItem = document.createElement('li');
        newItem.classList.add('item');
        newItem.innerText = todoInput.value;
        todoDiv.appendChild(newItem);
        // * Save to local storage
        saveTodos(todoInput.value);
        // * Create Check button
        const checkBtn = document.createElement('button');
        checkBtn.classList.add('check-btn');
        checkBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
        todoDiv.appendChild(checkBtn);
        // * Create Trash button
        const trashBtn = document.createElement('button');
        trashBtn.classList.add('trash-btn');
        trashBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
        todoDiv.appendChild(trashBtn);
        // * Append the DIV 
        todoList.appendChild(todoDiv);
        // * Clear the input value
        todoInput.value = '';
    };
};

function checkDelete (e) {
    const item = e.target;
    //* Delete 
    if(item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        todo.classList.add('drop');
        removeLocalTodos (todo);
        todo.addEventListener('transitionend', () => {
            todo.remove();
        });
    };

    // * Check
    if(item.classList[0] === 'check-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    };
};

// ? LOCAL STORAGE
function saveTodos(todo) {
    //* To Check If Its Saved In The Local Storage Already
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else {
        todos =JSON.parse(localStorage.getItem('todos'))
    };
    
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function removeLocalTodos(todo) {
    //* To check if something is saved in the local storage already
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
};
  
function getTodos() {
    //* To check if something is saved in the local storage already
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    };

    todos.forEach(function(todo) {
        // * Create DIV
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        // * Create the LI
        const newItem = document.createElement('li');
        newItem.classList.add('item');
        newItem.innerText = todo;
        todoDiv.appendChild(newItem);
        // * Create Check button
        const checkBtn = document.createElement('button');
        checkBtn.classList.add('check-btn');
        checkBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
        todoDiv.appendChild(checkBtn);
        // * Create Trash button
        const trashBtn = document.createElement('button');
        trashBtn.classList.add('trash-btn');
        trashBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
        todoDiv.appendChild(trashBtn);
        // * Append the DIV 
        todoList.appendChild(todoDiv);
        // * Clear the input value
        todoInput.value = '';
    });
};


