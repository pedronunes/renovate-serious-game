const fs = require('fs');
const path = require('path');

const appJs = fs.readFileSync('app.js', 'utf8');

// Extract INITIAL_UI_COORDINATES_MAP
const match = appJs.match(/const INITIAL_UI_COORDINATES_MAP = (\{[\s\S]*?\});/);
if (match) {
  const coordsObj = eval(`(${match[1]})`);
  console.log('--- Current Master Coordinates Blueprint ---');
  console.log(JSON.stringify(coordsObj, null, 2));
} else {
  console.log('Coordinates map not found!');
}
