class Err {
    constructor() {
        this.errors = [];
    }
    /* 
    *   msg: message (string) to show
    *   variants: 'primary', 'secondary', 'success', 'danger' (default),
    *            'warning', 'info', 'light', 'dark'
    *   elapsedTime: time in seconds to hide msg
    *                `true` for permanent (user dismissable)
    */
    showError = function (mesg, variant = "danger", elapsedTime = 5) {
        this.errors.push({ msg: mesg, elapsedTime: elapsedTime, variant: variant });
    };
    getErrors = function () {
        return this.errors;
    };
}

const err = new Err()
export default err