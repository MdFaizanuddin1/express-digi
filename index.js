import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello world");
});
app.get("/ice-tea", (req, res) => {
  res.send("ice tea");
});
app.get("/tea", (req, res) => {
  res.send("milk Tea");
});

app.use(express.json());
let teaData = [];
let nextId = 1;

// add tea
app.post("/teas", (req, res) => {
  // console.log("req.body is", req.body);
  const { name, price } = req.body;
  const newTea = {
    id: nextId++,
    name,
    price,
  };
  teaData.push(newTea);
  res.status(201).send(newTea);
});

//get all tea
app.get("/teas", (req, res) => {
  res.status(200).send(teaData);
});

// get a tea with id
app.get("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("404 Tea not found");
  } else {
    res.status(200).send(tea);
  }
});

// update tea
app.put("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    res.status(404).send("404 tea not found");
  }
  const { name, price } = req.body;
  tea.name = name;
  tea.price = price;

  res.status(200).send(tea);
});

// delete tea
app.delete("/teas/:id", (req, res) => {
  const index = teaData.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send("404, tea not found");
  const deletedTEa = teaData.splice(index, 1);
  return res.status(200).send(deletedTEa);
});

app.listen(port, () => {
  console.log("server started on", port, "...");
});
