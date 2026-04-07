import { HashSet } from "./HashSet.js";

describe("HashSet class", () => {
  let set;
  beforeEach(() => {
    set = new HashSet();
  });

  describe("HashSet initialization", () => {
    test("HashSet have 16 capacity/array length after initialization", () => {
      expect(set.capacity).toBe(16);
    });

    test("HashSet have 0 entries after initialization", () => {
      expect(set.length).toBe(0);
    });
  });

  describe("HashSet set(key)", () => {
    test("correctly throw a TypeError when the key is not a string", () => {
      expect(() => set.set(2)).toThrow(TypeError);
      expect(() => set.set({})).toThrow(TypeError);
      expect(() => set.set([])).toThrow(TypeError);
      expect(() => set.set(null)).toThrow(TypeError);
      expect(() => set.set(NaN)).toThrow(TypeError);
      expect(() => set.set(Infinity)).toThrow(TypeError);
      expect(() => set.set()).toThrow(TypeError);
    });
    test("add a key into the HashSet", () => {
      expect(set.set("test")).toBe(set);
    });

    test("overwrite the key when the argument key is exist in the HashSet, \nbasically nothing is done", () => {
      set.set("test");
      expect(set.length).toBe(1);
      expect(set.set("test")).toBe(set);
      expect(set.length).toBe(1);
    });

    test("add multiple key into the HashSet", () => {
      set.set("test");
      set.set("test1");
      set.set("test2");
      expect(set.length).toBe(3);
      expect(set.set("test2")).toBe(set);
      expect(set.length).toBe(3);
    });

    test("add 12 key into the HashSet to trigger HashSet buckets array to grow", () => {
      set.set("test");
      set.set("test1");
      set.set("test2");
      set.set("test3");
      set.set("test4");
      set.set("test5");
      set.set("test6");
      set.set("test7");
      set.set("test8");
      set.set("test9");
      set.set("test10");
      expect(set.length).toBe(11);
      expect(set.capacity).toBe(16);
      expect(set.set("test11").length).toBe(12);
      expect(set.set("test12").capacity).toBe(32);
    });
  });

  describe("HashSet has(key)", () => {
    test("correctly throw a TypeError when the key is not a string", () => {
      expect(() => set.has(2)).toThrow(TypeError);
      expect(() => set.has({})).toThrow(TypeError);
      expect(() => set.has([])).toThrow(TypeError);
      expect(() => set.has(null)).toThrow(TypeError);
      expect(() => set.has(NaN)).toThrow(TypeError);
      expect(() => set.has(Infinity)).toThrow(TypeError);
      expect(() => set.has()).toThrow(TypeError);
    });

    test("return true when the target key exist", () => {
      set.set("test");
      expect(set.has("test")).toBe(true);
    });

    test("return true when the target key exist in a multiple entries HashSet", () => {
      set.set("test");
      set.set("test10");
      set.set("test12");
      expect(set.has("test10")).toBe(true);
    });

    test("return true when the target key exist in a multiple entries HashSet \nwhere a bucket contains more than one key pair", () => {
      set.set("test10");
      set.set("test12");
      set.set("test");
      set.set("test4");
      expect(set.hash("test4")).toBe(set.hash("test4"));
      expect(set.has("test4")).toBe(true);
    });

    test("return false when the target key doesn't exist", () => {
      set.set("test");
      expect(set.has("test2")).toBe(false);
    });

    test("return false when the target key doesn't in a multiple entries HashSet", () => {
      set.set("test");
      set.set("test10");
      set.set("test12");
      expect(set.has("test14")).toBe(false);
    });

    test("return false when the target key doesn't exist in a multiple entries HashSet \nwhere a bucket contains more than one key pair", () => {
      set.set("test10");
      set.set("test12");
      set.set("test");
      set.set("test4");
      expect(set.hash("test")).toBe(set.hash("test4"));
      expect(set.has("test14")).toBe(false);
    });

    test("return false when the target key hashCode is the same with other entries \n but the target key doesn't exist in a multiple entries HashSet", () => {
      set.set("test10");
      set.set("test12");
      set.set("test");
      expect(set.hash("test")).toBe(set.hash("test4"));
      expect(set.has("test4")).toBe(false);
    });
  });

  describe("HashSet remove(key)", () => {
    test("correctly throw a TypeError when the key is not a string", () => {
      expect(() => set.remove(2)).toThrow(TypeError);
      expect(() => set.remove({})).toThrow(TypeError);
      expect(() => set.remove([])).toThrow(TypeError);
      expect(() => set.remove(null)).toThrow(TypeError);
      expect(() => set.remove(NaN)).toThrow(TypeError);
      expect(() => set.remove(Infinity)).toThrow(TypeError);
      expect(() => set.remove()).toThrow(TypeError);
    });

    test("return true and remove the target when the target key exist", () => {
      set.set("test");
      expect(set.length).toBe(1);
      expect(set.remove("test")).toBe(true);
      expect(set.length).toBe(0);
    });

    test("return true and remove the target when the target key exist in a multiple entries HashSet", () => {
      set.set("test");
      set.set("test10");
      set.set("test12");
      expect(set.length).toBe(3);
      expect(set.remove("test")).toBe(true);
      expect(set.length).toBe(2);
    });

    test("return true when the target key exist in a multiple entries HashSet \nwhere a bucket contains more than one key pair", () => {
      set.set("test10");
      set.set("test12");
      set.set("test");
      set.set("test4");
      expect(set.hash("test")).toBe(set.hash("test4"));
      expect(set.length).toBe(4);
      expect(set.remove("test4")).toBe(true);
      expect(set.length).toBe(3);
    });

    test("return false when the target key doesn't exist", () => {
      set.set("test", "test");
      expect(set.length).toBe(1);
      expect(set.remove("test4")).toBe(false);
      expect(set.length).toBe(1);
    });

    test("return false when the target key doesn't exist in a multiple entries HashSet", () => {
      set.set("test");
      set.set("test10");
      set.set("test12");
      expect(set.length).toBe(3);
      expect(set.remove("test14")).toBe(false);
      expect(set.length).toBe(3);
    });

    test("return false when the target key hashCode is the same with other entries \n but the target key doesn't exist in a multiple entries HashSet", () => {
      set.set("test10");
      set.set("test12");
      set.set("test");
      expect(set.hash("test")).toBe(set.hash("test4"));
      expect(set.length).toBe(3);
      expect(set.remove("test4")).toBe(false);
      expect(set.length).toBe(3);
    });
  });

  describe("HashSet obj.length", () => {
    test("correctly count entries length", () => {
      set.set("test10");
      set.set("test12");
      set.set("test");
      expect(set.length).toBe(3);
      expect(set.remove("test")).toBe(true);
      expect(set.length).toBe(2);
    });

    test("correctly count entries length after buckets growth", () => {
      set.set("test", "test");
      set.set("test1");
      set.set("test2");
      set.set("test3");
      set.set("test4");
      set.set("test5");
      set.set("test6");
      set.set("test7");
      set.set("test8");
      set.set("test9");
      set.set("test10");
      expect(set.length).toBe(11);
      set.remove("test");
      expect(set.length).toBe(10);
      set.set("test11");
      expect(set.length).toBe(11);
      expect(set.capacity).toBe(16);
      expect(set.set("test12").length).toBe(12);
      expect(set.capacity).toBe(32);
    });
  });

  describe("HashSet clear()", () => {
    test("remove all keys, reset length, reset entries and buckets", () => {
      set.set("test10");
      set.set("test12");
      set.set("test");
      expect(set.length).toBe(3);
      set.clear();
      expect(set.has("test")).toBe(false);
      expect(set.length).toBe(0);
      expect(set.capacity).toBe(16);
    });

    test("correctly remove all keys, reset capacity, reset length and buckets after buckets growth", () => {
      set.set("test1");
      set.set("test2");
      set.set("test3");
      set.set("test4");
      set.set("test5");
      set.set("test6");
      set.set("test7");
      set.set("test8");
      set.set("test9");
      set.set("test10");
      set.set("test11");
      expect(set.length).toBe(11);
      expect(set.capacity).toBe(16);
      expect(set.set("test12").length).toBe(12);
      expect(set.capacity).toBe(32);
      set.clear();
      expect(set.has("test1")).toBe(false);
      expect(set.capacity).toBe(16);
    });
  });

  describe("HashSet keys()", () => {
    test("return array containing all keys", () => {
      set.set("test10");
      set.set("test12");
      set.set("test");
      expect(set.keys()).toEqual(["test10", "test", "test12"]);
      expect(set.keys().length).toBe(3);
    });

    test("return array containing all keys after buckets growth", () => {
      set.set("test1");
      set.set("test2");
      set.set("test3");
      set.set("test4");
      set.set("test5");
      set.set("test6");
      set.set("test7");
      set.set("test8");
      set.set("test9");
      set.set("test10");
      set.set("test11");
      expect(set.length).toBe(11);
      expect(set.capacity).toBe(16);
      expect(set.keys()).toEqual([
        "test2",
        "test3",
        "test10",
        "test4",
        "test11",
        "test5",
        "test6",
        "test7",
        "test8",
        "test9",
        "test1",
      ]);
      expect(set.keys().length).toBe(11);
      expect(set.set("test12", "test12").length).toBe(12);
      expect(set.keys()).toEqual([
        "test2",
        "test3",
        "test4",
        "test5",
        "test6",
        "test7",
        "test8",
        "test9",
        "test10",
        "test11",
        "test12",
        "test1",
      ]);
      expect(set.keys().length).toBe(12);
      expect(set.capacity).toBe(32);
    });
  });
});
