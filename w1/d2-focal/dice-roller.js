const args = process.argv.splice(2);
let result = [];


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min)
}

for (let i = 0; i < args[0]; i++) {
result.push(getRandomInt(1,6))
}

console.log(`Rolled ${args[0]} dice : ${result.join()}`)

