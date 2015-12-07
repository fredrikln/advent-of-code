var fs = require('fs');
var Circuit = require('./circuit');

var input = fs.readFileSync('input.txt', 'utf8').split("\n");

var circuit = new Circuit();

for (var i = 0; i < input.length; i++) {
    var instruction = input[i].trim();

    if(!instruction) continue;

    circuit.instructionParser(instruction);
}

console.log(circuit.wireList());



// TODO
// Tryck in alla instruktioner i en array
// Loopa arrayen om och om igen till alla wires är lösta och det går att räkna ut a, typ..
