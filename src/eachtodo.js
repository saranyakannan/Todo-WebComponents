const templateTodoItem = document.createElement("template");
templateTodoItem.innerHTML = `
    <style>
      li.item {
        font-size: 20px;
        display: block;
        position: relative;
        border-bottom: 1px solid #eee;
      }
      li.item:after {
        content: "";
        clear: both;
        display: block;
      }
      li.item .like {
        width: 15px;
        height: 15px;
        position: absolute;
        left: 14px;
        top: 12px;
        background: url(https://storage.googleapis.com/adaptiveyou-signup/heart-icon.svg) no-repeat center;
        background-size: 15px;
        cursor: pointer;
      }
      li.item .like.active {
        background: url('https://storage.googleapis.com/adaptiveyou-signup/heart-icon-selected.svg') no-repeat center;
        background-size: 15px;
      }
      li.item label {
        white-space: pre;
        word-break: break-word;
        padding: 10px 10px 10px 40px;
        display: block;
        transition: .2s linear;
        font-family: AvenirNext-Medium;
        font-size: 14px;
        color: #333333;
        letter-spacing: -0.34px;
      }
      li.item button {
        margin: 0;
        padding: 0;
        border: 0;
        background: none;
        outline: none;
      }
      li.item .close {
        position: absolute;
        top: 15px;
        right: 10px;
        font-size: 20px;
        color: #000;
        opacity: .6;
        cursor: pointer;
        background: url(https://storage.googleapis.com/adaptiveyou/adaptiveu-v2/icons/close-icon.svg) no-repeat center;
        height: 15px;
        width: 15px;
      }
      li.item .close:hover {
        opacity: 1;
      }
    </style>
    <li class="item">
        <input type="checkbox"></input>
        <label></label>
    </li>
`;

export default class EachTodoItem extends HTMLElement {
  constructor() {
    super();
    this._root = this.attachShadow({ mode: "open" });
  }

  get name() {
    return this.getAttribute("name");
  }

  set name(val) {
    if (val) this.setAttribute("name", val);
  }

  get status() {
    return this.getAttribute("status");
  }

  set status(val) {
    if (val) this.setAttribute("status", val);
  }

  connectedCallback() {
    console.log("coneected callback");
    this._root.appendChild(this._render(this.todoMap));
    this._statusEvenHandler(this._root.querySelector("li.item"));
  }

  static get observedAttributes() {
    return ["name", "status"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "status") {
      if (newValue == "done" || newValue == "undone") {
        this._root.querySelector("li").querySelector("input").checked =
          newValue === "done" ? "checked" : "";
      }
    }

    if (name === "name") {
      this._root
        .querySelector("li")
        .querySelector("label").innerHTML = newValue;
    }
  }

  _render(eachTodoItem) {
    let todoItem = templateTodoItem.content.cloneNode(true);
    return todoItem;
  }

  _statusEvenHandler(elem) {
    elem.addEventListener("click", (e) => {
      this.setAttribute(
        "status",
        this.getAttribute("status") === "true" ? "false" : "true"
      );
    });
  }
}

window.customElements.define("each-todo-item", EachTodoItem);
