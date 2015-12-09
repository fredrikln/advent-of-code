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

function findLongestPath(location, locations, visited) {



}

console.log(data);

