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

function findLongestPath(location, locations, visited, totalDistance) {

    if (Object.keys(locations).length == visited.length) {
        return totalDistance;
    }

    var visitedArray = visited.slice(0);
    visitedArray.push(location);

    var max = 0;
    for (var i in locations) {
        if (visited.indexOf(i) > -1) {
            continue;
        }

        var newTotal = totalDistance + locations[location][i];

        var distance = findLongestPath(i, locations, visitedArray, newTotal);
        if (distance > max) {
            max = distance;
        }
    }

    return max;

}

for (var i in data) {
    var location = i;
    var visited = [i];

    console.log(i, findLongestPath(location, data, visited, 0));
}

console.log(data);

