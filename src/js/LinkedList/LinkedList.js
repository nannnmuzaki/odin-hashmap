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

  append(value) {
    if (!this.#headNode) {
      const node = new ListNode(value);
      this.#head = node;
      this.#tail = node;
    } else {
      const node = new ListNode(value);
      this.#tailNode.nextNode = node;
      this.#tail = node;
    }
    this.#listSize++;
  }

  prepend(value) {
    if (!this.#headNode) {
      const node = new ListNode(value);
      this.#head = node;
      this.#tail = node;
    } else {
      const node = new ListNode(value);
      node.nextNode = this.#headNode;
      this.#head = node;
    }
    this.#listSize++;
  }

  pop() {
    if (this.#listSize <= 0) return undefined;

    const head = this.#headNode;
    this.#headNode = head.nextNode;
    this.#listSize--;

    if (this.#listSize === 0) {
      this.#tailNode = null;
    }

    return head.value;
  }

  at(index) {
    if (this.#listSize <= 0) return undefined;
    if (index < 0) return undefined;
    if (index >= this.#listSize) return undefined;
    if (index === this.#listSize - 1) return this.#tailNode.value;

    let start = this.#headNode;
    let i = 0;
    while (i !== index) {
      start = start.nextNode;
      i++;
    }
    return start.value;
  }

  contains(value) {
    if (this.#listSize <= 0) return undefined;
    if (Object.is(undefined, value)) return false;
    if (Object.is(this.#headNode.value, value)) return true;
    if (Object.is(this.#tailNode.value, value)) return true;

    let current = this.#headNode.nextNode;
    while (current.nextNode !== null) {
      if (Object.is(current.value, value)) return true;
      current = current.nextNode;
    }
    return false;
  }

  findIndex(value) {
    if (this.#listSize <= 0) return -1;
    if (Object.is(undefined, value)) return -1;
    if (Object.is(this.#headNode.value, value)) return 0;
    if (Object.is(this.#tailNode.value, value)) return this.#listSize - 1;

    let current = this.#headNode.nextNode;
    let index = 1;
    while (current.nextNode !== null) {
      if (Object.is(current.value, value)) return index;
      current = current.nextNode;
      index++;
    }
    return -1;
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

  insertAt(index, ...values) {
    if (index < 0) throw new RangeError("Valid index starts from 0");
    if (index > this.#listSize) throw new RangeError("Index is out of bound");

    if (index === 0) {
      if (values.length === 1) {
        this.prepend(values[0]);
        return values[0];
      } else {
        let i = values.length - 1;
        while (i >= 0) {
          this.prepend(values[i]);
          i--;
        }
        return values;
      }
    }

    if (index === this.#listSize) {
      if (values.length === 1) {
        this.append(values[0]);
        return values[0];
      } else {
        let i = 0;
        while (i < values.length) {
          this.append(values[i]);
          i++;
        }
        return values;
      }
    }

    let current = this.#headNode;
    let i = 0;
    while (i !== index - 1) {
      current = current.nextNode;
      i++;
    }

    let j = 0;
    let temp = current.nextNode;
    while (j < values.length) {
      const node = new ListNode(values[j]);
      if (j === values.length - 1) {
        current.nextNode = node;
        current = node;
        current.nextNode = temp;
        this.#listSize++;
      } else {
        current.nextNode = node;
        current = node;
        this.#listSize++;
      }
      j++;
    }
    return values;
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
