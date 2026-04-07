import { LinkedList } from "./LinkedList.js";

describe("LinkedList Class", () => {
  let list;

  beforeEach(() => {
    list = new LinkedList();
  });

  describe("Initialization", () => {
    it("starts with size 0 and null head/tail", () => {
      expect(list.size).toBe(0);
      expect(list.head).toBe(null);
      expect(list.tail).toBe(null);
    });
  });

  describe("Insertion (append)", () => {
    it("appends to an empty list", () => {
      list.append("A", "B");
      expect(list.size).toBe(1);
      expect(list.head.key).toBe("A");
      expect(list.head.value).toBe("B");
      expect(list.tail.key).toBe("A");
      expect(list.tail.value).toBe("B");
    });

    it("appends multiple values and updates tail", () => {
      list.append("A", "a");
      list.append("B", "b");
      expect(list.size).toBe(2);
      expect(list.head.key).toBe("A");
      expect(list.head.value).toBe("a");
      expect(list.tail.key).toBe("B");
      expect(list.tail.value).toBe("b");
    });
  });

  describe("Search (search)", () => {
    it("returns null when search() a node on an empty list", () => {
      expect(list.search("")).toBe(null);
    });

    it("throws an type error when search() a list with non-string argument", () => {
      expect(() => list.search()).toThrow(TypeError);
      expect(() => list.search(NaN)).toThrow(TypeError);
      expect(() => list.search(2)).toThrow(TypeError);
    });

    it("correctly search a node when search() a list with only a single node", () => {
      list.append("A", "a");
      expect(list.search("A").key).toBe("A");
    });

    it("correctly search a node when search() a list with multiple node", () => {
      list.append("A", "a");
      list.append("B", "b");
      list.append("C", "c");
      list.append("D", "d");
      expect(list.search("A").key).toBe("A");
      expect(list.search("B").key).toBe("B");
      expect(list.search("C").key).toBe("C");
      expect(list.search("D").key).toBe("D");
    });

    it("correctly return null when search() a list with non-existing node key", () => {
      list.append("A", "a");
      list.append("B", "b");
      expect(list.search("C")).toBe(null);
    });
  });

  describe("Deletion (removeByKey)", () => {
    it("returns false when removeByKey an empty list", () => {
      expect(list.removeByKey("")).toBe(false);
    });

    it("handles removeByKey a list with exactly 1 node", () => {
      list.append("A", "a");
      expect(list.removeByKey("A")).toBe(true);
      expect(list.size).toBe(0);
      expect(list.head).toBe(null);
      expect(list.tail).toBe(null);
    });

    it("removes the correct node when removeByKey a list with multiple nodes", () => {
      list.append("A", "a");
      list.append("B", "b");
      list.append("C", "c");
      list.append("D", "d");
      expect(list.removeByKey("C")).toBe(true);
      expect(list.removeByKey("D")).toBe(true);
      expect(list.size).toBe(2);
      expect(list.head.key).toBe("A");
      expect(list.tail.key).toBe("B");
    });

    it("returns false when removeByKey a nonexistant node in a list", () => {
      list.append("A", "a");
      list.append("B", "b");
      expect(list.size).toBe(2);
      expect(list.removeByKey("Z")).toBe(false);
    });
  });
});
