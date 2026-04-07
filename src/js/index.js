import "../css/style.css";

import { LinkedList } from "./LinkedList/LinkedList.js";
import { HashMap } from "./HashMap/HashMap.js";

window.LinkedList = LinkedList;
window.HashMap = HashMap;

const map = new HashMap();

window.map = map;

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
// console.log(map.set("test11", "test11"));
