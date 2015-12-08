var fs = require('fs');
var sleep = require('sleep');
//var Circuit = require('./circuit');

var input = fs.readFileSync('input.txt', 'utf8').split("\n");

/*var circuit = new Circuit();

for (var i = 0; i < input.length; i++) {
    var instruction = input[i].trim();

    if(!instruction) continue;

    circuit.instructionParser(instruction);
}

console.log(circuit.wireList());*/

var wires = {};

for (var i = 0; i < input.length; i++) {
    var instruction = input[i];

    if(instruction === '') continue;

    instruction = instruction.split('->');
    var instr = instruction[0].trim();
    var target = instruction[1].trim();

    wires[target] = instr;
}

//console.log(wires);

/*var l = 0;
do {
    l++;

    for (var i in wires) {
        var instruction = wires[i];

        var matches = null;

        if (!isNaN(instruction)) {
            if (typeof instruction === 'string') {
                wires[i] = parseInt(instruction, 10);
            }

            continue;
        }

        if (matches = instruction.match(/^([a-z]+)$/)) {
            var input1 = matches[1];

            if (isNaN(wires[input1])) {
                continue;
            }

            wires[i] = parseInt(wires[input1], 10);
        }
        else if (matches = instruction.match(/^([a-z0-9]+) AND ([a-z0-9]+)$/)) { // wire receives input from AND gate
            var input1 = matches[1];
            var input2 = matches[2];

            if (isNaN(input1)) { // input 1 looks to be a wire
                if (isNaN(wires[input1])) { // input wire is unresolved
                    continue;
                }
            }

            if (isNaN(input2)) { // input 1 looks to be a wire
                if (isNaN(wires[input2])) { // input wire is unresolved
                    continue;
                }
            }

            wires[i] = wires[input1] & wires[input2];
        }
        else if (matches = instruction.match(/^([a-z0-9]+) OR ([a-z0-9]+)$/)) {
            var input1 = matches[1];
            var input2 = matches[2];

            if (isNaN(input1)) { // input 1 looks to be a wire
                if (isNaN(wires[input1])) { // input wire is unresolved
                    continue;
                }
            }

            if (isNaN(input2)) { // input 1 looks to be a wire
                if (isNaN(wires[input2])) { // input wire is unresolved
                    continue;
                }
            }

            wires[i] = wires[input1] | wires[input2];
        }
        else if (matches = instruction.match(/^([a-z0-9]+) LSHIFT ([0-9]+)$/)) {
            var input1 = matches[1];
            var input2 = matches[2];

            if (isNaN(input1)) {
                if (isNaN(wires[input1])) {
                    continue;
                }

                wires[i] = wires[input1] << input2;
            }
            else {
                wires[i] = input1 << input2;
            }
        }
        else if (matches = instruction.match(/^([a-z0-9]+) RSHIFT ([0-9]+)$/)) {
            var input1 = matches[1];
            var input2 = matches[2];

            if (isNaN(input1)) { // input 1 looks to be a wire
                if (isNaN(wires[input1])) { // input wire is unresolved
                    continue;
                }

                wires[i] = wires[input1] >> input2;
            }
            else {
                wires[i] = input1 >> input2;
            }


        }
        else if (matches = instruction.match(/^NOT ([a-z]+)$/)) {
            var input1 = matches[1];

            if (isNaN(parseInt(input1, 10))) { // input 1 looks to be a wire
                if (isNaN(parseInt(wires[input1], 10))) { // input wire is unresolved
                    continue;
                }
            }

            wires[i] = ~wires[input1];
        }
    }

} while (l < 100);*/
//} while (isNaN(parseInt(wires[a])));

var cache = {

}

function resolveWire(wire) {
    if (wires.hasOwnProperty(wire)) {
        return to16bit(resolveWire(wires[wire]));
    }
    else {
        if (!isNaN(wire)) {
            return to16bit(wire);
        }
        else {
            var result = null;

            if (cache[wire]) {
                result = cache[wire];
                return result;
            }

            if (wire.indexOf('AND') > -1) {
                var values = wire.split(' AND ');

                var input1 = values[0];
                var input2 = values[1];

                result = to16bit(resolveWire(input1) & resolveWire(input2));
            }
            else if (wire.indexOf('OR') > -1) {
                var values = wire.split(' OR ');

                var input1 = values[0];
                var input2 = values[1];

                result = to16bit(resolveWire(input1) | resolveWire(input2));
            }
            else if (wire.indexOf('RSHIFT') > -1) {
                var values = wire.split(' RSHIFT ');

                var input1 = values[0];
                var input2 = values[1];

                result = to16bit(resolveWire(input1) >> resolveWire(input2));
            }
            else if (wire.indexOf('LSHIFT') > -1) {
                var values = wire.split(' LSHIFT ');

                var input1 = values[0];
                var input2 = values[1];

                result = to16bit(resolveWire(input1) << resolveWire(input2));
            }
            else if (wire.indexOf('NOT') > -1) {
                var values = wire.split('NOT ');

                var input1 = values[1];

                result = to16bit(~resolveWire(input1));
            }

            cache[wire] = result;
            return result;
        }
    }
}

console.log('1. a = ' + resolveWire('a'));


wires['b'] = resolveWire('a');//resolveWire('a');
cache = {};

console.log('2. a = ' + resolveWire('a'));

// function parseInstruction(instruction) {
//     var instruction = instruction.split('->');

//     var wire = instruction[1].trim();
//     var instruction = instruction[0].trim();

//     wires[wire] = instruction;
// }

// function resolveWire(wire) {
//     var wireName = wire;

//     if (!isNaN(parseInt(wire, 10))) {
//         return to16bit(wire);
//     }
//     else {
//         var matches = null;
//         wire = wires[wire];

//         if (matches = wire.match(/^([a-z]+)$/)) {
//             wires[wire] = resolveWire(matches[1]);
//             return wires[wire];
//         }
//         else if (matches = wire.match(/^([a-z0-9]+) AND ([a-z0-9]+)$/)) {
//             return to16bit(resolveWire(matches[1]) & resolveWire(matches[2]));
//         }
//         else if (matches = wire.match(/^([a-z0-9]+) OR ([a-z0-9]+)$/)) {
//             return to16bit(resolveWire(matches[1]) | resolveWire(matches[2]));
//         }
//         else if (matches = wire.match(/^([a-z0-9]+) LSHIFT ([0-9]+)$/)) {
//             return to16bit(resolveWire(matches[1]) << matches[2]);
//         }
//         else if (matches = wire.match(/^([a-z0-9]+) RSHIFT ([0-9]+)$/)) {
//             return to16bit(resolveWire(matches[1]) >> matches[2]);
//         }
//         else if (matches = wire.match(/^NOT ([a-z0-9]+)$/)) {
//             return to16bit(~resolveWire(matches[1]));
//         }
//         else if (!isNaN(parseInt(wire, 10))) {
//             return to16bit(wire);
//         }
//         else {
//             console.log('apa');
//             return 0;
//         }
//     }

//     return 0;

//     // if (isNaN(parseInt(wire, 10))) {
//     //     var wire = wires[wire];

//     //     var matches = null;

//     //     if (!isNaN(parseInt(wire, 10))) {
//     //         wires[wireName] = wire;
//     //         return to16bit(wire);
//     //     }

//     //     if (matches = wire.match(/([a-z0-9]+) AND ([a-z0-9]+)/)) {
//     //         wires[wireName] = resolveWire(matches[1]) & resolveWire(matches[2]);
//     //         return wires[wireName];
//     //     }
//     //     else if (matches = wire.match(/([a-z0-9]+) OR ([a-z0-9]+)/)) {
//     //         wires[wireName] = resolveWire(matches[1]) | resolveWire(matches[2]);
//     //         return wires[wireName];
//     //     }
//     //     else if (matches = wire.match(/([a-z0-9]+) LSHIFT ([0-9]+)/)) {
//     //         wires[wireName] = resolveWire(matches[1]) << resolveWire(matches[2]);
//     //         return wires[wireName];
//     //     }
//     //     else if (matches = wire.match(/([a-z0-9]+) RSHIFT ([a-z0-9]+)/)) {
//     //         wires[wireName] = resolveWire(matches[1]) >> resolveWire(matches[2]);
//     //         return wires[wireName];
//     //     }
//     //     else if (matches = wire.match(/NOT ([a-z0-9]+)/)) {
//     //         wires[wireName] = ~resolveWire(matches[1]);
//     //         return wires[wireName];
//     //     }
//     //     else if (matches = wire.match(/^([a-z]+)$/)) {
//     //         wires[wireName] = resolveWire(matches[1]);
//     //         return wires[wireName];
//     //     }
//     //     else {
//     //         return to16bit(wire);
//     //     }
//     // }
//     // else {
//     //     return to16bit(wire);
//     // }
// }

function to16bit(value) {
    return ((1 << 16) - 1) & value;
}

// console.log(resolveWire('a'));
