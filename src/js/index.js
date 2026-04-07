import "../css/style.css";

import { LinkedList } from "./LinkedList/LinkedList.js";
import { HashMap } from "./HashMap/HashMap.js";
import { HashSet } from "./HashSet/HashSet.js";

window.LinkedList = LinkedList;
window.HashMap = HashMap;
window.HashSet = HashSet;

const map = new HashMap();
const set = new HashSet();

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

console.log(map.set("test10", "test10"));
console.log(map.set("test11", "test11"));

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

console.log(set.set("test10"));
console.log(set.set("test11"));
