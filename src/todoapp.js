import AddTodo from "./addtodo";
import EachTodoItem from "./eachtodo";

const templateTodoApp = document.createElement("template");
templateTodoApp.innerHTML = `
    <style>
        section {
          margin: 60px auto;
          position: relative;
          max-width: 400px;
        }
        #song-list {
          margin: 0;
          padding: 0;
          list-style: none;
          max-height: 300px;
          overflow: auto;
          border-radius: 4px;
          background: #FFFFFF;
          box-shadow: 0 2px 4px 0 #CEAE5A;
        }
    </style>
    <section>
    <add-todo></add-todo>
    <ul id="todo-list"></ul>
    </section>`;

export default class TodoApp extends HTMLElement {
  constructor() {
    super();

    this._root = this.attachShadow({ mode: "open" });

    // initial state
    this._todoList = [
      {
        name: "Morning Huddle",
        status: "done",
      },
      {
        name: "Session on Webcomponents",
        status: "undone",
      },
      {
        name: "Evening huddle",
        status: "undone",
      },
    ];
  }

  connectedCallback() {
    this._root.appendChild(templateTodoApp.content.cloneNode(true));
    this._renderEachTodoItem(this._todoList);
    this._addTodoListener();
  }

  _renderEachTodoItem(todoList) {
    console.log(todoList);
    todoList.forEach((todo) => {
      this._root
        .querySelector("#todo-list")
        .appendChild(document.createElement("each-todo-item"));

      const $todoElement = this._root.querySelector("#todo-list").lastChild;

      $todoElement._todo = todo;

      $todoElement.setAttribute("name", todo.name);
      $todoElement.setAttribute("status", todo.status);
    });
  }

  _addTodoListener() {
    const _addTodoElem = this._root.querySelector("add-todo");
    _addTodoElem.addEventListener("onAdd", this._addTodo.bind(this));
  }

  _addTodo(e) {
    console.log("Comes here");
    console.log(e.detail);
    this._renderEachTodoItem(e.detail);
  }
}

window.customElements.define("todo-app", TodoApp);
