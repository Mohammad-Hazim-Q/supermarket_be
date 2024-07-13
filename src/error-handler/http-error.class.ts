
export class HttpException {

    status: number;
    customCode: string;
    message: string;
    constructor(data: { status: number, message: string, customCode: string }) {
        // super(data.message);
        this.message = data.message;
        this.status = data.status;
        this.customCode = data.customCode;
    }
}