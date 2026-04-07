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

  // get(key) takes one argument as a key and returns the value that is assigned to this key. If a key is not found, return null.

  // has(key) takes a key as an argument and returns true or false based on whether or not the key is in the hash map.

  // remove(key) takes a key as an argument. If the given key is in the hash map, it should remove the entry with that key and return true. If the key isn’t in the hash map, it should return false.

  // length() returns the number of stored keys in the hash map.

  // clear() removes all entries in the hash map.

  // keys() returns an array containing all the keys inside the hash map.

  // values() returns an array containing all the values.

  // entries() returns an array that contains each key, value pair. Example: [[firstKey, firstValue], [secondKey, secondValue]]

  // extra credit : Create a HashSet class or factory function that behaves the same as a HashMap but only contains keys with no values
}
