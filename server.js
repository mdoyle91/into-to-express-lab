const express = require(`express`);
const PORT = process.env.PORT || 3001;

const app = express();

app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
});

app.get(`/`, (req, res) => {
  res.send(`Welcome to my page`);
});

app.get(`/greetings/:username`, (req, res) => {
  res.send({
    msg: `Greetings ${req.params.username}`,
  });
});

app.get(`/roll/:number`, (req, res) => {
  const num = parseInt(req.params.number);
  console.log(num);
  if (!isNaN(num)) {
    const newNum = Math.ceil(Math.random() * num);
    res.send(`You rolled a ${newNum}`);
  } else {
    res.send(`You must specify a number.`);
  }
});

const item = [
  { name: `shiny ball`, price: 5.95 },
  { name: `autographed picture of a dog`, price: 10 },
  { name: `vintage 1970s yogurt SOLD AS-IS`, price: 0.99 },
];

app.get(`/collectibles/:item`, (req, res) => {
  if (item[req.params.item]) {
    res.send(
      `So you want ${item[req.params.item].name}?For ${
        item[req.params.item].price
      }, it can be yours!`
    );
  } else {
    res.send(
      `The item you're seeking is currently out of stock! Please check back later`
    );
  }
});

const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" },
];

app.get(`/shoes`, (req, res) => {
  const { type, minPrice, maxPrice } = req.query;

  let filteredShoes = shoes;

  if (type) {
    filteredShoes = filteredShoes.filter(
      (sho) => sho.type.toLowerCase() === type.toLowerCase() //ChatGPT told me to use the toLowerCase and also suggested that abbreviated word "sho"--I don't understand the reason for either
    );
  }
  if (minPrice) {
    filteredShoes = filteredShoes.filter(
      (sho) => sho.price >= parseFloat(minPrice)
    );
  } //Got parseFloat method from ChatGPT to ensure that the number is read as a number rather than as a string.

  if (maxPrice) {
    filteredShoes = filteredShoes.filter(
      (sho) => sho.price <= parseFloat(maxPrice)
    );
  }

  res.send(filteredShoes);
});

app.get(`/*`, (req, res) => {
  res.send({
    error: `404 file not found`,
  });
});
