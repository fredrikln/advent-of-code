var fs = require('fs');

var lines = fs.readFileSync('input.txt').toString().split("\n");

var grid = {};

for (var i = 0; i < 1000; i++) {
    for (var j = 0; j < 1000; j++) {
        if (typeof grid[i] === 'undefined') grid[i] = {};
        grid[i][j] = 0;
    }
}

for (var k = 0; k < lines.length; k++) {
    var line = lines[k];

    var matches = line.match(/(turn on|toggle|turn off) ([0-9]{1,3},[0-9]{1,3}) through ([0-9]{1,3},[0-9]{1,3})/i);

    if (matches === null) continue;

    var instruction = matches[1];
    var starting = matches[2].split(',');
    var ending = matches[3].split(',');


    for (var i = parseInt(starting[0], 10); i <= parseInt(ending[0], 10); i++) {
        for (var j = parseInt(starting[1], 10); j <= parseInt(ending[1], 10); j++) {
            switch (instruction) {
                case 'turn on':
                    grid[i][j] += 1;
                    break;

                case 'toggle':
                    grid[i][j] += 2;
                    break;

                case 'turn off':
                    if (grid[i][j] > 0) {
                        grid[i][j] -= 1;
                    }

                    break;
            }
        }
    }
}

var totalBrightness = 0;
for (var i in grid) {
    for (var j in grid[i]) {
        totalBrightness += grid[i][j];
    }
}

console.log(totalBrightness);
