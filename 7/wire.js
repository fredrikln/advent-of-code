function Wire(value) {
    this.wireValue = value;

    return this;
}

Wire.prototype.input = function (input) {
    this.wireValue = input;
};

Wire.prototype.value = function () {
    if (typeof this.wireValue === 'object') {
        return this.wireValue.value();
    }

    return this.wireValue;
};


module.exports = Wire;
