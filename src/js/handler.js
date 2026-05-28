import { validatorError } from "./enums.js";
import { validateNumberInput } from "./limit.js";

export function handleIntegerInput(element, callback, limitFrom = 1, limitTo = Infinity) {
    element.addEventListener("input", function(e) {
        let value = e.target.value;

        console.log("Value: " + value);

        let response = validateNumberInput(value);

        if (!response.valid) {
            console.log("Error: " + response.error);

            if(response.error === validatorError.NOT_INTEGER) {
                value = limitFrom;
            }
        }

        value = Math.min(value, limitTo);

        callback(value);
    });
}