const json2html = require("node-json2html");

let data = [
  { name: "Heat", age: "1995" },
  { name: "Snatch", age: "2000" },
  { flavor: "Swiss", price: 5 },
];

let transform = {
  "<>": "div",
  html: [
    { "<>": "p", html: "${name}" },
    { "<>": "h1", html: "${age}" },
    { "<>": "li", html: "${flavor}" },
    { "<>": "li", html: "${price}" },
  ],
};

let html = json2html.render(data, transform);

console.log(html.split("><").join(">/n<"));
