var santa = require('../santa');

var assert = require('assert');

describe('Challenge 1', function () {
    describe('Part 1: Santa ends up on floor', function () {
        it('should end up on starting floor', function () {
            assert.equal(0, santa.endsOnFloor('(())'));
            assert.equal(0, santa.endsOnFloor('()()'));
        });

        it('should end up on third floor', function () {
            assert.equal(3, santa.endsOnFloor('((('));
            assert.equal(3, santa.endsOnFloor('(()(()('));
            assert.equal(3, santa.endsOnFloor('))((((('));
        });

        it('should end up on first basement level', function () {
            assert.equal(-1, santa.endsOnFloor('())'));
            assert.equal(-1, santa.endsOnFloor('))('));
        });

        it('should end up on third basement level', function () {
            assert.equal(-3, santa.endsOnFloor(')))'));
            assert.equal(-3, santa.endsOnFloor(')())())'));
        });
    });

    describe('Part 2: Santa enters basement on instruction', function () {
        it('should enter basement on instruction one', function () {
            assert.equal(1, santa.firstBasement(')'));
        });

        it('should enter basement on instruction five', function () {
            assert.equal(5, santa.firstBasement('()())'));
        });
    });
});
