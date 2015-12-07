function Gate(type) {
    this.type = type;
    this.inputs = [];

    return this;
}

Gate.prototype.input = function (value) {
    this.inputs.push(value);
};

Gate.prototype.value = function () {

    if (this.type === 'AND' || this.type === 'OR' || this.type == 'RSHIFT' || this.type == 'LSHIFT') {
        if (this.inputs.length < 2) {
            return null;
        }
    }
    else if (this.type == 'NOT') {
        if (this.inputs.length < 1) {
            return null;
        }
    }

    switch(this.type) {
        case 'AND':
            return this.to16bit(this.inputValue(0) & this.inputValue(1));

        case 'OR':
            return this.to16bit(this.inputValue(0) | this.inputValue(1));

        case 'LSHIFT':
            return this.to16bit(this.inputValue(0) << this.inputValue(1));

        case 'NOT':
            return this.to16bit(~this.inputValue(0));

        case 'RSHIFT':
            return this.to16bit(this.inputValue(0) >> this.inputValue(1));
    }
};

Gate.prototype.inputValue = function (input) {
    if (typeof this.inputs[input] === 'object') {
        return this.inputs[input].value();
    }

    return this.inputs[input];
};

Gate.prototype.to16bit = function (value) {
    return ((1 << 16) - 1) & value;
};


module.exports = Gate;
