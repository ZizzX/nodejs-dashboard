export class HttpError extends Error {
    public statusCode: number;
    public context?: string;
    constructor(statusCode: number, public message: string, context?: string) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.context = context;
    }
}
