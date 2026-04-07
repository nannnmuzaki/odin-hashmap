import { ListNode } from "./ListNode.js";

describe("ListNode Class", () => {
  it("initializes with a key and value and a null nextNode by default", () => {
    const node = new ListNode("A", "B");
    expect(node.key).toBe("A");
    expect(node.value).toBe("B");
    expect(node.nextNode).toBe(null);
  });

  it("initializes with a null value by default when value argument is ommited", () => {
    const node = new ListNode("A");
    expect(node.key).toBe("A");
    expect(node.value).toBe(null);
  });

  it("allows setting nextNode to another ListNode", () => {
    const node1 = new ListNode("A");
    const node2 = new ListNode("B");
    node1.nextNode = node2;
    expect(node1.nextNode.key).toBe("B");
  });
});
