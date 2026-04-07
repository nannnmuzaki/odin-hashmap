import { HashMap } from "./HashMap.js";

describe("HashMap class", () => {
  let map;
  beforeEach(() => {
    map = new HashMap();
  });

  describe("HashMap initialization", () => {
    test("hashmap have 16 capacity/array length after initialization", () => {
      expect(map.capacity).toBe(16);
    });

    test("HashMap have 0 entries after initialization", () => {
      expect(map.length).toBe(0);
    });
  });

  describe("HashMap set(key, value)", () => {
    test("correctly throw a TypeError when the key is not a string", () => {
      expect(() => map.set(2, "test")).toThrow(TypeError);
      expect(() => map.set({}, "test")).toThrow(TypeError);
      expect(() => map.set([], "test")).toThrow(TypeError);
      expect(() => map.set(null, "test")).toThrow(TypeError);
      expect(() => map.set(NaN, "test")).toThrow(TypeError);
      expect(() => map.set(Infinity, "test")).toThrow(TypeError);
      expect(() => map.set()).toThrow(TypeError);
    });
    test("add a key value into the HashMap", () => {
      expect(map.set("test", "test")).toBe(map);
    });

    test("overwrite a value into existing key in the HashMap", () => {
      map.set("test", "test");
      expect(map.length).toBe(1);
      expect(map.set("test", "test2")).toBe(map);
      expect(map.length).toBe(1);
    });

    test("add multiple key value into the HashMap", () => {
      map.set("test", "test");
      map.set("test1", "test1");
      map.set("test2", "test2");
      expect(map.length).toBe(3);
      expect(map.set("test2", "test2t")).toBe(map);
      expect(map.length).toBe(3);
    });

    test("add 12 key value into the HashMap to trigger HashMap buckets array to grow", () => {
      map.set("test", "test");
      map.set("test1", "test1");
      map.set("test2", "test2");
      map.set("test3", "test3");
      map.set("test4", "test4");
      map.set("test5", "test5");
      map.set("test6", "test6");
      map.set("test7", "test7");
      map.set("test8", "test8");
      map.set("test9", "test9");
      map.set("test10", "test10");
      expect(map.length).toBe(11);
      expect(map.capacity).toBe(16);
      expect(map.set("test11", "test11").length).toBe(12);
      expect(map.set("test12", "test11").capacity).toBe(32);
    });
  });

  describe("HashMap get(key)", () => {
    test("correctly throw a TypeError when the key is not a string", () => {
      expect(() => map.get(2)).toThrow(TypeError);
      expect(() => map.get({})).toThrow(TypeError);
      expect(() => map.get([])).toThrow(TypeError);
      expect(() => map.get(null)).toThrow(TypeError);
      expect(() => map.get(NaN)).toThrow(TypeError);
      expect(() => map.get(Infinity)).toThrow(TypeError);
      expect(() => map.get()).toThrow(TypeError);
    });

    test("return the correct value when the target key value exist", () => {
      map.set("test", "testo");
      expect(map.get("test")).toBe("testo");
    });

    test("return the correct value when the target key value exist in a multiple entries HashMap", () => {
      map.set("test", "test");
      map.set("test10", "test10to");
      map.set("test12", "test12to");
      expect(map.get("test10")).toBe("test10to");
    });

    test("return the correct value when the target key value exist in a multiple entries HashMap \nwhere a bucket contains more than one key value pair", () => {
      map.set("test10", "test10to");
      map.set("test12", "test12to");
      map.set("test", "testto");
      map.set("test4", "test4to");
      expect(map.hash("test4")).toBe(map.hash("test4"));
      expect(map.get("test4")).toBe("test4to");
    });

    test("return null when the target node doesn't exist", () => {
      map.set("test", "test");
      expect(map.get("test2")).toBe(null);
    });

    test("return null when the target key value does't in a multiple entries HashMap", () => {
      map.set("test", "test");
      map.set("test10", "test10to");
      map.set("test12", "test12to");
      expect(map.get("test14")).toBe(null);
    });

    test("return null when the target key value doesn't exist in a multiple entries HashMap \nwhere a bucket contains more than one key value pair", () => {
      map.set("test10", "test10to");
      map.set("test12", "test12to");
      map.set("test", "testto");
      map.set("test4", "test4to");
      expect(map.hash("test4")).toBe(map.hash("test4"));
      expect(map.get("test14")).toBe(null);
    });

    test("return null when the target key hashCode is the same with other entries \n but the target key value doesn't exist in a multiple entries HashMap", () => {
      map.set("test10", "test10to");
      map.set("test12", "test12to");
      map.set("test", "testto");
      expect(map.hash("test4")).toBe(map.hash("test4"));
      expect(map.get("test4")).toBe(null);
    });
  });

  describe("HashMap has(key)", () => {
    test("correctly throw a TypeError when the key is not a string", () => {
      expect(() => map.has(2)).toThrow(TypeError);
      expect(() => map.has({})).toThrow(TypeError);
      expect(() => map.has([])).toThrow(TypeError);
      expect(() => map.has(null)).toThrow(TypeError);
      expect(() => map.has(NaN)).toThrow(TypeError);
      expect(() => map.has(Infinity)).toThrow(TypeError);
      expect(() => map.has()).toThrow(TypeError);
    });

    test("return true when the target key value exist", () => {
      map.set("test", "testo");
      expect(map.has("test")).toBe(true);
    });

    test("return true when the target key value exist in a multiple entries HashMap", () => {
      map.set("test", "test");
      map.set("test10", "test10to");
      map.set("test12", "test12to");
      expect(map.has("test10")).toBe(true);
    });

    test("return true when the target key value exist in a multiple entries HashMap \nwhere a bucket contains more than one key value pair", () => {
      map.set("test10", "test10to");
      map.set("test12", "test12to");
      map.set("test", "testto");
      map.set("test4", "test4to");
      expect(map.hash("test4")).toBe(map.hash("test4"));
      expect(map.has("test4")).toBe(true);
    });

    test("return false when the target key value doesn't exist", () => {
      map.set("test", "test");
      expect(map.has("test2")).toBe(false);
    });

    test("return false when the target key value doesn't in a multiple entries HashMap", () => {
      map.set("test", "test");
      map.set("test10", "test10to");
      map.set("test12", "test12to");
      expect(map.has("test14")).toBe(false);
    });

    test("return false when the target key value doesn't exist in a multiple entries HashMap \nwhere a bucket contains more than one key value pair", () => {
      map.set("test10", "test10to");
      map.set("test12", "test12to");
      map.set("test", "testto");
      map.set("test4", "test4to");
      expect(map.hash("test")).toBe(map.hash("test4"));
      expect(map.has("test14")).toBe(false);
    });

    test("return false when the target key hashCode is the same with other entries \n but the target key value doesn't exist in a multiple entries HashMap", () => {
      map.set("test10", "test10to");
      map.set("test12", "test12to");
      map.set("test", "testto");
      expect(map.hash("test")).toBe(map.hash("test4"));
      expect(map.has("test4")).toBe(false);
    });
  });

  describe("HashMap remove(key)", () => {
    test("correctly throw a TypeError when the key is not a string", () => {
      expect(() => map.remove(2)).toThrow(TypeError);
      expect(() => map.remove({})).toThrow(TypeError);
      expect(() => map.remove([])).toThrow(TypeError);
      expect(() => map.remove(null)).toThrow(TypeError);
      expect(() => map.remove(NaN)).toThrow(TypeError);
      expect(() => map.remove(Infinity)).toThrow(TypeError);
      expect(() => map.remove()).toThrow(TypeError);
    });

    test("return true and remove the target when the target key value exist", () => {
      map.set("test", "testo");
      expect(map.length).toBe(1);
      expect(map.remove("test")).toBe(true);
      expect(map.length).toBe(0);
    });

    test("return true and remove the target when the target key value exist in a multiple entries HashMap", () => {
      map.set("test", "test");
      map.set("test10", "test10to");
      map.set("test12", "test12to");
      expect(map.length).toBe(3);
      expect(map.remove("test")).toBe(true);
      expect(map.length).toBe(2);
    });

    test("return true when the target key value exist in a multiple entries HashMap \nwhere a bucket contains more than one key value pair", () => {
      map.set("test10", "test10to");
      map.set("test12", "test12to");
      map.set("test", "testto");
      map.set("test4", "test4to");
      expect(map.hash("test")).toBe(map.hash("test4"));
      expect(map.length).toBe(4);
      expect(map.remove("test4")).toBe(true);
      expect(map.length).toBe(3);
    });

    test("return false when the target key value doesn't exist", () => {
      map.set("test", "test");
      expect(map.length).toBe(1);
      expect(map.remove("test4")).toBe(false);
      expect(map.length).toBe(1);
    });

    test("return false when the target key value doesn't exist in a multiple entries HashMap", () => {
      map.set("test", "test");
      map.set("test10", "test10to");
      map.set("test12", "test12to");
      expect(map.length).toBe(3);
      expect(map.remove("test14")).toBe(false);
      expect(map.length).toBe(3);
    });

    test("return false when the target key hashCode is the same with other entries \n but the target key value doesn't exist in a multiple entries HashMap", () => {
      map.set("test10", "test10to");
      map.set("test12", "test12to");
      map.set("test", "testto");
      expect(map.hash("test")).toBe(map.hash("test4"));
      expect(map.length).toBe(3);
      expect(map.remove("test4")).toBe(false);
      expect(map.length).toBe(3);
    });
  });
});
