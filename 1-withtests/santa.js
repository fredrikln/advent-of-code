module.exports = {
    endsOnFloor: function (input) {
        // Santa starts on floor 0
        var floor = 0;

        for (var i = 0; i < input.length; i++) {
            var instruction = input[i];

            floor += this.move(instruction);
        }

        return floor;
    },
    firstBasement: function (input) {
        var floor = 0;

        for (var i = 0; i < input.length; i++) {
            var instruction = input[i];

            floor += this.move(instruction);

            if (floor === -1) {
                return i+1;
            }
        }
    },
    move: function(instruction) {
        switch (instruction) {
            case '(':
                return 1;

            case ')':
                return -1;
        }

        return 0;
    }
};
