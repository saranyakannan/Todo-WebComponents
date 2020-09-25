import { html, fixture, expect } from "@open-wc/testing";
import sinon from "sinon";

import "../src/addtodo";

let el;

describe("<add-todo>", async () => {
  before(async () => {
    el = await fixture("<add-todo></add-todo>");
  });

  it("keypress event should be called", async () => {
    const addInputEventListner = sinon.spy(
      el.shadowRoot.querySelector("input"),
      "addEventListener"
    );

    el._bindKeyPress();

    addInputEventListner.restore();
    expect(addInputEventListner.calledWith("keypress")).to.equal(true);
  });

  it("dispatch to be called with proper value", async () => {
    const e = {
      keyCode: 13,
      target: { value: "add new todo" },
    };

    const eventspy = sinon.spy();

    el.addEventListener("onAdd", eventspy);

    el._addTodo(e);

    expect(eventspy.called).to.equal(true);
  });

  it("dispatch to be called with empty value", async () => {
    const e = {
      keyCode: 13,
      target: { value: "" },
    };

    el._addTodo(e);
  });
});
