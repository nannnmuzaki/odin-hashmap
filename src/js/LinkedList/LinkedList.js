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
    while (current !== null) {
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
      string += `( ${current.key}: ${current.value} ) -> `;
      current = current.nextNode;
    }

    return string + "null";
  }

  removeByKey(key) {
    const target = this.search(key);
    if (target === null) return false;

    if (target === this.#tailNode && target === this.#headNode) {
      this.#headNode = null;
      this.#tailNode = null;
      this.#listSize--;
      return true;
    }

    if (target === this.#headNode) {
      this.#head = this.#headNode.nextNode;
      this.#listSize--;
      return true;
    }

    if (target === this.#tailNode) {
      let current = this.#headNode;
      while (current.nextNode.nextNode !== null) {
        current = current.nextNode;
      }
      current.nextNode = null;
      this.#tail = current;
      this.#listSize--;
      return true;
    }

    let current = this.#headNode;
    while (current.nextNode !== target) {
      current = current.nextNode;
    }
    current.nextNode = current.nextNode.nextNode;
    this.#listSize--;
    return true;
  }
}
