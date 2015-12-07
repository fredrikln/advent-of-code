var Wire = require('./wire');
var Gate = require('./gate');

function Circuit() {
    this.wires = {};
}

Circuit.prototype.instructionParser = function (instruction) {
    instruction = instruction.split('->').map(function (i) {
        return i.trim();
    });

    var input = instruction[0];
    var target = instruction[1];

    var output = null;

    var matches = null;
    if ( matches = input.match(/([a-z0-9]+) AND ([a-z0-9]+)/) ) {
        var gate = new Gate('AND');

        if (!isNaN(parseInt(matches[1], 10))) {
            gate.input(matches[1]);
        }
        else {
            gate.input(this.wires[matches[1]]);
        }

        if (!isNaN(parseInt(matches[2], 10))) {
            gate.input(matches[2]);
        }
        else {
            gate.input(this.wires[matches[2]]);
        }

        output = gate;
    }
    else if ( matches = input.match(/([a-z0-9]+) OR ([a-z0-9]+)/) ) {
        var gate = new Gate('OR');

        if (!isNaN(parseInt(matches[1], 10))) {
            gate.input(matches[1]);
        }
        else {
            gate.input(this.wires[matches[1]]);
        }

        if (!isNaN(parseInt(matches[2], 10))) {
            gate.input(matches[2]);
        }
        else {
            gate.input(this.wires[matches[2]]);
        }

        output = gate;
    }
    else if ( matches = input.match(/([a-z0-9]+) RSHIFT ([0-9]+)/) ) {
        var gate = new Gate('RSHIFT');

        if (!isNaN(parseInt(matches[1], 10))) {
            gate.input(matches[1]);
        }
        else {
            gate.input(this.wires[matches[1]]);
        }

        gate.input(matches[2]);

        output = gate;
    }
    else if ( matches = input.match(/([a-z0-9]+) LSHIFT ([0-9]+)/) ) {
        var gate = new Gate('LSHIFT');

        if (!isNaN(parseInt(matches[1], 10))) {
            gate.input(matches[1]);
        }
        else {
            gate.input(this.wires[matches[1]]);
        }

        gate.input(matches[2]);

        output = gate;
    }
    else if ( matches = input.match(/NOT ([a-z]+)/) ) {
        var gate = new Gate('NOT');

        if (!isNaN(parseInt(matches[1], 10))) {
            gate.input(matches[1]);
        }
        else {
            gate.input(this.wires[matches[1]]);
        }

        output = gate;
    }
    else {
        if (isNaN(parseInt(input, 10))) {
            if (!this.wires[input]) {
                this.wires[input] = new Wire();
            }

            output = new Wire(this.wires[input]);
        }
        else {
            output = new Wire(input);
        }
    }

    if (this.wires[target]) {
        this.wires[target].input(output);
    }
    else {
        this.wires[target] = output;
    }
};

Circuit.prototype.wireList = function () {
    var out = {};

    for (var wire in this.wires) {
        if (typeof this.wires[wire] === 'object') {
            if (this.wires[wire].inputWire) {
                var input = this.wires[wire].inputWire;

                this.wires[wire] = new Wire(this.wires[input]);
            }

            out[wire] = this.wires[wire].value();
        }
        else {
            out[wire] = this.wires[wire];
        }
    }

    return out;
};

module.exports = Circuit;
