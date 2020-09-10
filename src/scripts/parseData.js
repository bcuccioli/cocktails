#!/usr/bin/env node

const fs = require('fs');

const lines = fs.readFileSync(`${__dirname}/../data/all_drinks.csv`, 'utf8')
  .split('\n');

const drinks = lines.slice(1).map((drink) => {
  const cells = drink.split(',');

  return {
    name: cells[1],
    img: cells[6],
    ingredients: cells.slice(9, 24).map((s) => s.trim()).filter((s) => !!s),
    measures: cells.slice(25, 40).map((s) => s.trim()).filter((s) => !!s),
    instructions: cells[24],
  };
})
.filter((d) => d.ingredients.length > 0);

console.log(JSON.stringify(drinks, null, 2));
