import { LinkedList } from "../LinkedList/LinkedList.js";

export class HashMap {
  #entries = 0;
  #load_factor = 0.75;
  #capacity = 16;
  #buckets = null;

  constructor() {
    this.#buckets = new Array(16).fill(null);
  }

  hash(key) {
    if (typeof key !== "string") throw new TypeError("Key must be a string");
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.#capacity;
    }

    return hashCode;
  }

  get length() {
    return this.#entries;
  }

  get capacity() {
    return this.#capacity;
  }

  set(key, value) {
    let hashCode = this.hash(key);
    let bucket = this.#buckets[hashCode];

    if (bucket !== null && bucket instanceof LinkedList) {
      const targetNode = bucket.search(key);
      if (targetNode !== null) {
        targetNode.value = value;
        return this;
      }
    }

    const growthTrigger = Math.floor(this.#capacity * this.#load_factor);
    if (this.#entries + 1 >= growthTrigger) {
      const oldBuckets = this.#buckets;
      const oldCapacity = this.#capacity;
      this.#entries = 0;
      this.#buckets = new Array(this.#capacity * 2).fill(null);
      this.#capacity *= 2;

      for (let i = 0; i < oldCapacity; i++) {
        if (oldBuckets[i] !== null && oldBuckets[i] instanceof LinkedList) {
          const size = oldBuckets[i].size;
          let currentNode = oldBuckets[i].head;
          for (let j = 0; j < size; j++) {
            this.set(currentNode.key, currentNode.value);
            currentNode = currentNode.nextNode;
          }
        }
      }

      hashCode = this.hash(key);
      bucket = this.#buckets[hashCode];
    }

    if (bucket === null || !(bucket instanceof LinkedList)) {
      bucket = new LinkedList();
      this.#buckets[hashCode] = bucket;
    }

    bucket.append(key, value);
    this.#entries++;
    return this;
  }

  get(key) {
    const hashCode = this.hash(key);
    const bucket = this.#buckets[hashCode];
    let target = null;

    if (bucket !== null && bucket instanceof LinkedList) {
      target = bucket.search(key);
    }

    if (target !== null) return target.value;
    return null;
  }

  has(key) {
    const hashCode = this.hash(key);
    const bucket = this.#buckets[hashCode];
    let target = null;

    if (bucket !== null && bucket instanceof LinkedList) {
      target = bucket.search(key);
    }

    if (target !== null) return true;
    return false;
  }

  remove(key) {
    const hashCode = this.hash(key);
    const bucket = this.#buckets[hashCode];
    let deleted = false;

    if (bucket !== null && bucket instanceof LinkedList) {
      deleted = bucket.removeByKey(key);
    }

    if (deleted === true) this.#entries--;

    return deleted;
  }

  clear() {
    this.#entries = 0;
    this.#capacity = 16;
    this.#buckets = new Array(this.#capacity).fill(null);
    return this;
  }

  #traverse(callbackFn) {
    for (let i = 0; i < this.#capacity; i++) {
      if (this.#buckets[i] !== null && this.#buckets[i] instanceof LinkedList) {
        let currentNode = this.#buckets[i].head;
        for (let j = 0; j < this.#buckets[i].size; j++) {
          callbackFn(currentNode);
          currentNode = currentNode.nextNode;
        }
      }
    }
  }

  keys() {
    const keys = [];
    this.#traverse((node) => {
      keys.push(node.key);
    });
    return keys;
  }

  // keys() returns an array containing all the keys inside the hash map.

  // values() returns an array containing all the values.

  // entries() returns an array that contains each key, value pair. Example: [[firstKey, firstValue], [secondKey, secondValue]]

  // extra credit : Create a HashSet class or factory function that behaves the same as a HashMap but only contains keys with no values
}
