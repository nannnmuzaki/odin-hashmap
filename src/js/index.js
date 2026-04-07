import "../css/style.css";

import { LinkedList } from "./LinkedList/LinkedList.js";
import { HashMap } from "./HashMap/HashMap.js";

window.LinkedList = LinkedList;
window.HashMap = HashMap;

const map = new HashMap();

window.map = map;

map.set("bla bla", "blub");
map.set("bla bl", "blub");
map.set("bla ba", "blub");
map.set("bla la", "blub");
map.set("ba bla", "blub");
map.set("labla", "blub");
map.set("blabla", "blub");
map.set("blal", "blub");
map.set("bla blu", "blub");
map.set("abla", "blub");
console.log(map.set("bla", "blub"));
console.log(map.set("blat", "blub"));
