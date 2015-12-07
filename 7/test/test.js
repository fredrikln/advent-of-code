var assert = require('assert');

var Wire = require('../wire');
var Gate = require('../gate');
var Circuit = require('../circuit');

describe('Gate', function () {
    describe('AND', function () {
        it('should accept two values and return the bitwise AND as an output', function () {
            var gate = new Gate('AND');

            gate.input(2); // 10
            gate.input(1); // 01

            assert.equal(0, gate.value()); // 00

            var gate2 = new Gate('AND');

            gate2.input(3); // 011
            gate2.input(4); // 100

            assert.equal(0, gate2.value()); // 000

            var gate3 = new Gate('AND');

            gate3.input(7); // 111
            gate3.input(3); // 011

            assert.equal(3, gate3.value()); // 011
        });
    });

    describe('OR', function () {
        it('should accept two values and return the bitwise OR as an output', function () {
            var gate = new Gate('OR');

            gate.input(1); // 01
            gate.input(2); // 10

            assert.equal(3, gate.value()); // 11

            var gate2 = new Gate('OR');

            gate2.input(7); // 111
            gate2.input(0); // 000

            assert.equal(7, gate2.value()); // 111
        });
    });

    describe('LSHIFT', function () {
        it('should accept an input and lshift amount and return an output', function () {
            var gate = new Gate('LSHIFT');

            gate.input(1); // 1
            gate.input(1); // 1 step

            assert.equal(2, gate.value()); // 10

            var gate2 = new Gate('LSHIFT');

            gate2.input(2); // 10
            gate2.input(2); // 2 step

            assert.equal(8, gate2.value()); // 1000

            var gate3 = new Gate('LSHIFT');

            gate3.input(1); // 1
            gate3.input(5); // 5 steps

            assert.equal(32, gate3.value()); //100000
        });
    });

    describe('NOT', function () {
        it('should accept a value and return the bitwise NOT as an answer in 16 bits unsigned', function () {
            var gate = new Gate('NOT');

            gate.input(1); //0000000000000001

            assert.equal(65534, gate.value()); // 1111111111111110

            var gate2 = new Gate('NOT');

            gate2.input(1023); // 0000001111111111

            assert.equal(64512, gate2.value());
        });
    });

    describe('RSHIFT', function () {
        it('should accept a value and rshift amount and return an output', function () {
            var gate = new Gate('RSHIFT');

            gate.input(1); // 1
            gate.input(1); // 1 step

            assert.equal(0, gate.value()); // 0

            var gate2 = new Gate('RSHIFT');

            gate2.input(1024); // 10000000000
            gate2.input(2); // 2 steps

            assert.equal(256, gate2.value()); // 00100000000
        });
    });

    describe('Signal', function () {
        it('should not be provided until all inputs are filled', function () {
            var gate = new Gate('AND');
            gate.input(2);

            assert(gate.value() === null);

            var gate2 = new Gate('AND');
            gate2.input(1);
            gate2.input(2);

            assert(gate2.value() !== null);

            var gate3 = new Gate('OR');
            gate3.input(2);

            assert(gate3.value() === null);

            var gate4 = new Gate('OR');
            gate4.input(1);
            gate4.input(2);

            assert(gate4.value() !== null);

            var gate5 = new Gate('RSHIFT');
            gate5.input(2);

            assert(gate5.value() === null);

            var gate6 = new Gate('RSHIFT');
            gate6.input(1);
            gate6.input(2);

            assert(gate6.value() !== null);

            var gate7 = new Gate('LSHIFT');
            gate7.input(2);

            assert(gate7.value() === null);

            var gate8 = new Gate('LSHIFT');
            gate8.input(1);
            gate8.input(2);

            assert(gate8.value() !== null);

            var gate9 = new Gate('NOT');

            assert(gate9.value() === null);

            var gate10 = new Gate('NOT');
            gate10.input(2);

            assert(gate10.value() !== null);
        });
    });

    describe('Input', function () {
        it('should accept values as inputs', function () {
            var gate = new Gate('AND');
            gate.input(1);
            gate.input(2);

            assert.equal(0, gate.value());
        });

        it('should accept wires as inputs', function () {
            var wire = new Wire(1);
            var wire2 = new Wire(2);

            var gate = new Gate('AND');
            gate.input(wire);
            gate.input(wire2);

            assert.equal(0, gate.value());

            var wire3 = new Wire(2);
            var wire4 = new Wire(2);

            var gate2 = new Gate('AND');
            gate2.input(wire3);
            gate2.input(wire4);

            assert.equal(2, gate2.value());
        });
    });
});

describe('Wire', function () {
    describe('input', function () {
        it('should accept an integer as an input and return it', function () {
            var input = 1;
            var wire = new Wire(input);

            assert.equal(1, wire.value());

            var input2 = 2;
            var wire2 = new Wire(input2);

            assert.equal(2, wire2.value());
        });

        it('should accept a gate as input and return its value', function () {
            var gate = new Gate('AND');
            gate.input(1);
            gate.input(3);

            var wire = new Wire(gate);
            assert.equal(wire.value(), 1);

            var gate2 = new Gate('AND');
            gate2.input(1); // missing second input, should return null

            var wire2 = new Wire(gate2);
            assert(wire2.value() === null);
        });
    });
});

describe('Circuit', function () {
    describe('instructionParser', function () {
        it('should input values to wires', function () {
            var circuit = new Circuit();

            circuit.instructionParser('123 -> x');
            circuit.instructionParser('256 -> y');

            assert.deepEqual(circuit.wireList(), {x: 123, y: 256});
        });

        it('should input wires to wires', function () {
            var circuit = new Circuit();

            circuit.instructionParser('123 -> x');
            circuit.instructionParser('x -> y');

            assert.deepEqual(circuit.wireList(), {x: 123, y: 123});
        });

        it('should input AND gates to wires and the wire should output the gates value', function () {
            var circuit = new Circuit();

            circuit.instructionParser('63 -> x');
            circuit.instructionParser('77 -> y');
            circuit.instructionParser('x AND y -> z');

            assert.deepEqual(circuit.wireList(), {x: 63, y: 77, z: 13});

            var circuit2 = new Circuit();

            circuit2.instructionParser('2 -> x');
            circuit2.instructionParser('3 -> y');
            circuit2.instructionParser('x AND y -> z');

            assert.deepEqual(circuit2.wireList(), {x: 2, y: 3, z: 2});

            var circuit3 = new Circuit();

            circuit3.instructionParser('3 -> y');
            circuit3.instructionParser('1 AND y -> z');

            assert.deepEqual(circuit3.wireList(), {y: 3, z: 1});
        });

        it('should input OR gates to wires and the wire should output the gates value', function () {
            var circuit = new Circuit();

            circuit.instructionParser('1 -> x');
            circuit.instructionParser('2 -> y');
            circuit.instructionParser('x OR y -> z');

            assert.deepEqual(circuit.wireList(), {x: 1, y: 2, z: 3});

            var circuit2 = new Circuit();

            circuit2.instructionParser('2 -> x');
            circuit2.instructionParser('4 -> y');
            circuit2.instructionParser('x OR y -> z');

            assert.deepEqual(circuit2.wireList(), {x: 2, y: 4, z: 6});

            var circuit3 = new Circuit();

            circuit3.instructionParser('2 -> x');
            circuit3.instructionParser('x OR 3 -> z');

            assert.deepEqual(circuit3.wireList(), {x: 2, z: 3});
        });

        it('should input RSHIFT gates to wires and the wire should output the gates value', function () {
            var circuit = new Circuit();

            circuit.instructionParser('1 -> x');
            circuit.instructionParser('x RSHIFT 2 -> z');

            assert.deepEqual(circuit.wireList(), {x: 1, z: 0});

            var circuit2 = new Circuit();

            circuit2.instructionParser('8 -> x');
            circuit2.instructionParser('x RSHIFT 2 -> z');

            assert.deepEqual(circuit2.wireList(), {x: 8, z: 2});
        });

        it('should input LSHIFT gates to wires and the wire should output the gates value', function () {
            var circuit = new Circuit();

            circuit.instructionParser('1 -> x');
            circuit.instructionParser('x LSHIFT 2 -> z');

            assert.deepEqual(circuit.wireList(), {x: 1, z: 4});

            var circuit2 = new Circuit();

            circuit2.instructionParser('1 -> x');
            circuit2.instructionParser('x LSHIFT 3 -> z');

            assert.deepEqual(circuit2.wireList(), {x: 1, z: 8});
        });

        it('should input NOT gates to wires and the wire should output the gates value', function () {
            var circuit = new Circuit();

            circuit.instructionParser('1 -> x');
            circuit.instructionParser('NOT x -> z');

            assert.deepEqual(circuit.wireList(), {x: 1, z: 65534});

            var circuit2 = new Circuit();

            circuit2.instructionParser('1023 -> x');
            circuit2.instructionParser('NOT x -> z');

            assert.deepEqual(circuit2.wireList(), {x: 1023, z: 64512 });
        });

        it('should output the correct values according to example', function () {
            var input = [
                "123 -> x",
                "456 -> y",
                "x AND y -> d",
                "x OR y -> e",
                "x LSHIFT 2 -> f",
                "y RSHIFT 2 -> g",
                "NOT x -> h",
                "NOT y -> i"
            ];

            var circuit = new Circuit();

            for (var i = 0; i < input.length; i++) {
                var instruction = input[i];

                circuit.instructionParser(instruction);
            }

            assert.deepEqual(circuit.wireList(), {
                d: 72,
                e: 507,
                f: 492,
                g: 114,
                h: 65412,
                i: 65079,
                x: 123,
                y: 456
            });
        });

        it('should allow values to be applied to wires later', function () {
            var input = [
                'b -> a',
                '5 -> b'
            ];

            var circuit = new Circuit();

            for (var i = 0; i < input.length; i++) {
                var instruction = input[i];

                circuit.instructionParser(instruction);
            }

            assert.deepEqual(circuit.wireList(), {
                a: 5,
                b: 5
            });

            var input2 = [
                'b -> a',
                'a AND 5 -> c',
                '7 -> b'
            ];

            var circuit2 = new Circuit();

            for (var i = 0; i < input2.length; i++) {
                var instruction = input2[i];

                circuit2.instructionParser(instruction);
            }

            assert.deepEqual(circuit2.wireList(), {
                a: 7,
                b: 7,
                c: 5
            });
        });
    });
});
