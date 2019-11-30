
export declare class OrdersApiDomainException extends Error{

    private readonly response;
    private readonly status;
    readonly message: any;

    constructor(response: string | object, status: number);
    getResponse(): string | object;
    getStatus(): number;
    toString(): string;
    private getErrorString;
    static createBody(message: object | string, error?: string, statusCode?: number): object;
}