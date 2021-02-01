
// References
const form = document.getElementById('form');
const input = document.getElementById('input');
const todosUL = document.getElementById('todos');

// parse LS
const todos = JSON.parse(localStorage.getItem('todos'));

if (todos) {
    todos.forEach((todo) => {
        addTodo(todo);
    });
}

// Hit enter--> if input is empty don't submit
// other submit the form
form.addEventListener('submit', (e) => {
    e.preventDefault();

    addTodo();
});

// Add todo
function addTodo(todo) {
    let todoText = input.value;
    console.log(todoText);

    if (todo) {
        todoText = todo.text;
    }
    if (todoText) {
        const todoEl = document.createElement('li');
        if (todo && todo.completed) {
            todoEl.classList.add('completed');
        }
        todoEl.innerText = todoText;
        console.log(todoEl.innerText);
        
        todoEl.addEventListener('click', () => {
            todoEl.classList.toggle('completed');
            
            updateLS();
        });

        // right click to delete todo
        todoEl.addEventListener('contextmenu', (e) => {
            e.preventDefault();

            todoEl.remove();
            updateLS();
        });

        todosUL.appendChild(todoEl);
        input.value = '';
        updateLS();
    }
}

// update Local Storage
function updateLS() {
    const todosEl = document.querySelectorAll('li');
    const todos = [];

    todosEl.forEach((todoEl) => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains('completed'),
        });
    });
    localStorage.setItem('todos', JSON.stringify(todos));

}