var fs = require('fs');

var input = fs.readFileSync('input.txt', 'utf8').split("\n");

var data = {

};

var visited = [];

for (var i in input) {
    var edge = input[i];

    if (!edge) {
        continue;
    }

    var edge = edge.split(' = ');
    var distance = parseInt(edge[1], 10);

    var locations = edge[0].split(' to ');

    var fromLocation = locations[0];
    var toLocation = locations[1];

    if (!data[fromLocation]) {
        data[fromLocation] = {};
    }

    if (!data[toLocation]) {
        data[toLocation] = {};
    }

    data[fromLocation][toLocation] = distance;
    data[toLocation][fromLocation] = distance;
}

function findShortestUnvisitedFrom(location) {
    var possible = data[location];

    var distance = 9999;
    var location = '';

    for (var i in possible) {
        var hasVisited = false;
        for (var j in visited) {
            if (visited[j] == i) {
                hasVisited = true;
            }
        }

        if (hasVisited) {
            continue;
        }

        if (possible[i] < distance) {
            distance = possible[i];
            location = i;
        }
    }

    visited.push(location);

    return location;
}

var location = 'Arbre';
visited.push(location);

console.log(location);
while ((location = findShortestUnvisitedFrom(location)) !== '') {
    console.log(location);
}

var distance = 0;
for (var i = 1; i < visited.length-1; i++) {
    var from = visited[i-1];
    var to = visited[i];

    distance += data[from][to];
}

console.log(distance);

