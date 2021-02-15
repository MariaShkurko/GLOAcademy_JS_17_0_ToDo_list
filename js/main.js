"use strict";

const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');

const todoData = [];

const render = () => {
    todoList.textContent = '';
    todoCompleted.textContent = '';

    todoData.forEach((item) => {
        const li = document.createElement('li');

        li.classList.add('todo-item');
        li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
            '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
            '</div>';

        if (item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }

        const btnTodoComplete = li.querySelector('.todo-complete'),
            btnTodoRemove = li.querySelector('.todo-remove');

        btnTodoComplete.addEventListener('click', () => {
            item.completed = !item.completed;
            localStorage.setItem('todoData', JSON.stringify(todoData));
            render();
        });

        btnTodoRemove.addEventListener('click', () => {
            const index = todoData.indexOf(item);
            todoData.splice(index, 1);
            localStorage.setItem('todoData', JSON.stringify(todoData));
            render();
        });
    });
};

if (localStorage.getItem('todoData')) {
    JSON.parse(localStorage.getItem('todoData')).forEach((item) => {
        todoData.push(item);
    });
}

todoControl.addEventListener('submit', (e) => {
    e.preventDefault();

    if (headerInput.value !== '') {
        const newTodo = {
            value: headerInput.value,
            completed: false
        };

        todoData.push(newTodo);

        localStorage.setItem('todoData', JSON.stringify(todoData));

        render();

        headerInput.value = '';
    }
});

render();