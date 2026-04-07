import { ListNode } from "./ListNode.js";

export class LinkedList {
  #headNode = null;
  #tailNode = null;
  #listSize = 0;

  constructor() {}

  get head() {
    return this.#headNode;
  }

  set #head(node) {
    if (!(node instanceof ListNode) && node !== null) {
      throw new Error("Linked List must only contain List of Node");
    }
    this.#headNode = node;
  }

  get tail() {
    return this.#tailNode;
  }

  set #tail(node) {
    if (!(node instanceof ListNode) && node !== null) {
      throw new Error("Linked List must only contain List of Node");
    }
    this.#tailNode = node;
  }

  get size() {
    return this.#listSize;
  }

  append(key, value) {
    if (!this.#headNode) {
      const node = new ListNode(key, value);
      this.#head = node;
      this.#tail = node;
    } else {
      const node = new ListNode(key, value);
      this.#tailNode.nextNode = node;
      this.#tail = node;
    }
    this.#listSize++;
  }

  search(key) {
    if (typeof key !== "string") throw new TypeError("Key must be a string");
    if (this.#listSize <= 0) return null;
    if (Object.is(this.#headNode.key, key)) return this.#headNode;
    if (Object.is(this.#tailNode.key, key)) return this.#tailNode;

    let current = this.#headNode;
    while (current.nextNode !== null) {
      if (Object.is(current.key, key)) return current;
      current = current.nextNode;
    }
    return null;
  }

  toString() {
    if (this.#listSize <= 0) return "";
    let current = this.#headNode;
    let string = "";
    while (current !== null) {
      string += `( ${current.value} ) -> `;
      current = current.nextNode;
    }

    return string + "null";
  }

  removeAt(index) {
    if (index < 0) throw new RangeError("Valid index starts from 0");
    if (index >= this.#listSize) throw new RangeError("Index is out of bound");

    if (index === 0) {
      return this.pop();
    }
    if (index === this.#listSize - 1) {
      let current = this.#headNode;
      while (current.nextNode.nextNode !== null) {
        current = current.nextNode;
      }
      const temp = current.nextNode;
      current.nextNode = null;
      this.#tail = current;
      this.#listSize--;
      return temp.value;
    }
    if (index >= 0 && index < this.#listSize - 1) {
      let i = 0;
      let current = this.#headNode;
      while (i !== index - 1) {
        current = current.nextNode;
        i++;
      }
      const temp = current.nextNode;
      current.nextNode = current.nextNode.nextNode;
      this.#listSize--;
      return temp.value;
    }
  }
}
