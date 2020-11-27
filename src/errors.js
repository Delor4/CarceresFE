class Err {
    constructor() {
        this.errors = [];
    }
    showError = function (mesg, elapsedTime = 5) {
        this.errors.push({ msg: mesg, elapsedTime: elapsedTime });
    };
    getErrors = function () {
        return this.errors;
    };
}

const err = new Err()
export default err