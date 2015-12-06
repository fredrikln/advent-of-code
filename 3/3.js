var fs = require('fs'),
    lines = fs.readFileSync('input.txt').toString().split("\n"),
    i = 0;

var instructions = lines[0];

var x = 0;
var y = 0;

// Second scenario
// Santa
var x2 = 0;
var y2 = 0;

// Robo-santa
var rx = 0;
var ry = 0;

// Starting state: house at 0,0 has one present
var houses = {
    0: {
        0: 1
    }
};

// Second scenario
var robohouses = {
    0: {
        0: 2
    }
};

for (var i = 0; i < instructions.length; i++) {
    var instruction = instructions[i];

    switch (instruction) {
        case '>':
            x++;

            // Second scenario
            if (i%2 === 0) {
                x2++;
            }
            else {
                rx++;
            }

            break;

        case 'v':
            y++;

            // Second scenario
            if (i%2 === 0) {
                y2++;
            }
            else {
                ry++;
            }

            break;

        case '<':
            x--;

            // Second scenario
            if (i%2 === 0) {
                x2--;
            }
            else {
                rx--;
            }

            break;

        case '^':
            y--;

            // Second scenario
            if (i%2 === 0) {
                y2--;
            }
            else {
                ry--;
            }

            break;
    }

    if (typeof houses[x] === 'undefined') {
        houses[x] = {};
    }

    if (typeof houses[x][y] === 'undefined') {
        houses[x][y] = 0;
    }

    // Second scenario
    if (i%2 === 0) {
        if (typeof robohouses[x2] === 'undefined') {
            robohouses[x2] = {};
        }
        if (typeof robohouses[x2][y2] === 'undefined') {
            robohouses[x2][y2] = 0;
        }

        robohouses[x2][y2]++;
    }
    else {
        if (typeof robohouses[rx] === 'undefined') {
            robohouses[rx] = {};
        }
        if (typeof robohouses[x2][y2] === 'undefined') {
            robohouses[rx][ry] = 0;
        }

        robohouses[rx][ry]++;
    }


    houses[x][y]++;
}

var numHousesWithPresents = 0;

for (var i in houses) {
    for (var j in houses[i]) {
        numHousesWithPresents++;
    }
}

var numHousesWithPresentsRobo = 0;

for (var i in robohouses) {
    for (var j in robohouses[i]) {
        numHousesWithPresentsRobo++;
    }
}

console.log(numHousesWithPresents);
console.log(numHousesWithPresentsRobo);

