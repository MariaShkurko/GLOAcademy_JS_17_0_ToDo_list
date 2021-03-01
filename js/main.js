class ToDo {
    constructor(form, input, todoList, todoCompleted) {
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoCompleted = document.querySelector(todoCompleted);
        this.todoData = new Map(JSON.parse(localStorage.getItem('todoList')));
    }

    addToStorage() {
        localStorage.setItem('todoList', JSON.stringify([...this.todoData]));
    }

    render() {
        this.todoList.textContent = '';
        this.todoCompleted.textContent = '';
        this.todoData.forEach(this.createItem, this);
        this.addToStorage();
    }

    createItem(todo) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.key = todo.key;
        li.insertAdjacentHTML('beforeend', `
            <span class="text-todo">${todo.value}</span>
            <div class="todo-buttons">
                <button class="todo-remove"></button>
                <button class="todo-complete"></button>
            </div>
        `);

        if (todo.completed) {
            this.todoCompleted.append(li);
        } else {
            this.todoList.append(li);
        }
    }

    addTodo(e) {
        e.preventDefault();
        if (this.input.value.trim()) {
            const newTodo = {
                value: this.input.value,
                completed: false,
                key: this.generteKey(),
            };
            this.todoData.set(newTodo.key, newTodo);
            this.render();
            this.input.value = '';
        } else {
            alert('Вы не ввели задачу!');
        }
    }

    generteKey() {
        return Math.random().toString(16).substring(2, 15) + Math.random().toString(16).substring(2, 15);
    }

    deleteItem(btn) {
        this.todoData.delete(btn.parentElement.parentElement.key);
        this.render();
    }

    completedItem(btn) {
        const item = this.todoData.get(btn.parentElement.parentElement.key);
        item.completed = !item.completed;
        this.render();
    }

    handler() {
        document.querySelector('.todo-container').addEventListener('click', event => {
            if (event.target.classList.contains('todo-remove')) {
                this.deleteItem(event.target);
            }
            if (event.target.classList.contains('todo-complete')) {
                this.completedItem(event.target);
            }
        });
    }

    init() {
        this.form.addEventListener('submit', this.addTodo.bind(this));
        this.render();
        this.handler();
    }
}

const todo = new ToDo('.todo-control', '.header-input', '.todo-list', '.todo-completed');
todo.init();
