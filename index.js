const express = require("express");
const app = express();
const methodOverride = require("method-override");
const mysql = require("mysql2");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const PORT = process.env.PORT || 4152;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));


let cnt = [
  { id: 1, cmnt: "nice" },
  { id: 2, cmnt: "good" },
  { id: 3, cmnt: "beautiful" },
  { id: 4, cmnt: "well" },
  { id: 5, cmnt: "amazing" },
];

let users = [
  { user: "naina", pass: "##naina" },
  { user: "misti", pass: "##misti" },
  { user: "vishakha", pass: "##vishakha" },
  { user: "shreya", pass: "##shreya" },
  { user: "samriddhi", pass: "##samriddhi" },
  { user: "subhi", pass: "##subhi" },
];

app.get("/", (req, res) => {
  let idd = 2;
  let iid = cnt.find((i) => i.id === idd);
  res.render("home", { iid });
});

app.get("/home", (req, res) => {
  res.render("others");
});

app.get("/gotoform", (req, res) => {
  res.render("form");
});

app.post("/form", (req, res) => {
  let { username, password } = req.body;
  let us = users.find((u) => u.user === username && u.pass === password);
  if (us) {
    res.render("info", { username });
  } else {
    res.send(
      '<h1>The password is wrong. Please try again.....</h1><br><button><a href="/">Back</a></button>'
    );
  }
});

app.get("/img", (req, res) => {
  res.render("index", { cnt });
});

app.post("/cmnt", (req, res) => {
  let { cmnt } = req.body;
  cnt.push({ id: uuidv4(), cmnt });
  console.log(cnt);
  res.redirect("/img");
});

app.get("/sdata", (req, res) => {
  let xi = cnt.find((i) => i.id === 2);
  res.render("details", { xi });
});

app.patch("/sdata/hi", (req, res) => {
  let { arw } = req.body;
  let xi = cnt.find((i) => i.id === 2);
  xi.cmnt = arw;
  res.redirect("/img");
});

app.delete("/sdata/hi", (req, res) => {
  cnt = cnt.filter((i) => i.id !== 2);
  res.redirect("/img");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.post("/contact", (req, res) => {
  let { name, email, message } = req.body;
  let m = `INSERT INTO contact (name, email, message) VALUES ("${name}", "${email}", "${message}")`;
  connection.query(m, function (err, results) {
    if (err) throw err;
    console.log(results);
    res.redirect("/contact");
  });
});
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "misti",
  password: "ssz123",
});

app.get("/dbdata", (req, res) => {
  let q = "SELECT * FROM students WHERE id = 2";
  connection.query(q, function (err, results) {
    if (err) throw err;
    console.log(results);
    res.render("dbdata", { ejdata: results });
  });
});

app.post("/dbdata", (req, res) => {
  let { id, name, age } = req.body;
  let q = `INSERT INTO students (id, name, age) VALUES (${id}, "${name}", ${age})`;
  connection.query(q, function (err, results) {
    if (err) throw err;
    console.log(results);
    res.redirect("/dbdata");
  });
});

app.get("/home/:id", (req, res) => {
  let { id } = req.params;
  let ii = cnt.find((i) => i.id == id);
  console.log(ii);
  res.render("index", { cnt, iid: ii });
});

app.post("/home/good", (req, res) => {
  res.send("hello....");
});

app.post("/sdata", (req, res) => {
  let { arw } = req.body;
  let idd = 2;
  let iid = cnt.find((i) => i.id === idd);
  iid.cmnt = arw;
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
