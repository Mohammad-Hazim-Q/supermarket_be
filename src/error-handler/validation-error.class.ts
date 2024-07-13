

export class ValidationError {

    errors = [];
    message = "Validation Error";

    constructor(errors: any[]) {
        this.errors = errors;
    }
}