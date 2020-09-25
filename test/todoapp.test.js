import { html, fixture, expect } from "@open-wc/testing";
import sinon from "sinon";

import "../src/addtodo";
import "../src/todoapp";

const todoList = [
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

let el;

describe("<todo-app>", async () => {
  before(async () => {
    // runs before all tests in this block
    el = await fixture("<todo-app></todo-app>");
  });

  it("has a add element which has input", async () => {
    el._todoList = todoList;
    const addTodoElement = el.shadowRoot.querySelector("add-todo");

    expect(
      addTodoElement.shadowRoot.querySelector("input").getAttribute("id")
    ).to.equal("todo-input");
  });

  it("has a add element which has input", async () => {
    el._todoList = todoList;
    const addTodoElement = el.shadowRoot.querySelector("add-todo");

    expect(
      addTodoElement.shadowRoot.querySelector("input").getAttribute("id")
    ).to.equal("todo-input");
  });

  it("should listen to add event", async () => {
    const todoEventListner = sinon.spy(
      el.shadowRoot.querySelector("add-todo"),
      "addEventListener"
    );
    el._addTodoListener();
    expect(todoEventListner.calledWith("onAdd")).to.equal(true);
  });

  it("listener should render each todo", async () => {
    const mock = sinon.mock(el);
    const renderEachTodoItem = mock.expects("_renderEachTodoItem");
    const event = {
      detail: [
        {
          name: "Session on Webcomponents",
          status: "undone",
        },
      ],
    };
    renderEachTodoItem.withArgs(event.detail);
    el._addTodo(event);
    mock.verify();
  });
});
