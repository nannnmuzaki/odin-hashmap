export class ListNode {
  #key = null;
  #value = null;
  #nextNode = null;

  constructor(value) {
    this.value = value;
  }

  get key() {
    return this.#key;
  }

  set key(key) {
    if (typeof key !== string) {
      throw new TypeError("key must be a string");
    }
    this.#key = key;
  }

  get value() {
    return this.#value;
  }

  set value(data = null) {
    this.#value = data;
  }

  get nextNode() {
    return this.#nextNode;
  }

  set nextNode(node) {
    if (!(node instanceof ListNode) && node !== null) {
      throw new Error("Next Node must be a type of ListNode");
    }
    this.#nextNode = node;
  }
}
