export enum HttpStatusCode {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    CONFLICT = 409,
    INTERNAL_SERVER = 500
}

interface ScannerErrorArgs {
    name?: string;
    httpStatusCode?: HttpStatusCode;
    description: string;
    isOperational?: boolean;
}

export class ScannerError extends Error {
    public readonly name: string;
    public readonly httpStatusCode: HttpStatusCode;
    public readonly isOperational: boolean = true;

    constructor (args: ScannerErrorArgs) {
        super(args.description);

        Object.setPrototypeOf(this, new.target.prototype);
        
        this.name = args.name || 'ScannerError';
        this.httpStatusCode = args.httpStatusCode || HttpStatusCode.INTERNAL_SERVER;

        if(this.isOperational !== undefined) {
            this.isOperational = args.isOperational;
        }
        Error.captureStackTrace(this);
    }
}
