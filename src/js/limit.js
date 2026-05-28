import { validatorError } from "./enums.js";

export function validateNumberInput(value) {
    let response = {
        valid: true,
        error: validatorError.GOOD
    };

    if(value === "") {
        response.valid = false;
        response.error = validatorError.EMPTY;
    }

    if(!Number.isInteger(Number(value))) {
        response.valid = false;
        response.error = validatorError.NOT_INTEGER;
    }

    return response;
}