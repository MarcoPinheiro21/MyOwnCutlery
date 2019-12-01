import { HttpException } from "@nestjs/common";

export class OrdersApiDomainException extends HttpException {
    constructor(response: string | object, code?: number) {
        super(response, code == null ? 400 : code);
    }
}