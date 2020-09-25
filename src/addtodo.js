const addTodoTemplate = document.createElement("template");
addTodoTemplate.innerHTML = `
    <style>
        #todo-input {
            position: relative;
            width: 100%;
            border: 0;
            outline: none;
            padding: 10px 15px;
            margin: 3px 0;
            font-weight: 300;
            box-sizing: border-box;
            border-radius: 4px;
            background: #FFFFFF;
            box-shadow: 0 2px 4px 0 #CEAE5A;
            font-family: AvenirNext-Regular;
            font-size: 14px;
            color: #333333;
        }
    </style>
    <input id="todo-input" type="text" value="" placeholder="Add your todo's for the day" />
`;

export default class AddTodo extends HTMLElement {
  constructor() {
    super();
    this._root = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this._root.appendChild(addTodoTemplate.content.cloneNode(true));

    this._bindKeyPress();
  }

  _bindKeyPress() {
    this.$input = this._root.querySelector("input");

    this.$input.addEventListener("keypress", this._addTodo.bind(this));
  }

  _addTodo(e) {
    console.log(e);
    if (e.keyCode === 13) {
      if (!e.target.value) return;

      const todoItem = [
        {
          name: e.target.value,
          status: false,
        },
      ];

      this._root.querySelector("input").value = "";

      this.dispatchEvent(new CustomEvent("onAdd", { detail: todoItem }));
    }
  }
}

window.customElements.define("add-todo", AddTodo);
