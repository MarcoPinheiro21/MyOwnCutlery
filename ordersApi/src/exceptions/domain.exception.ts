import { HttpException } from "@nestjs/common";

export class OrdersApiDomainException extends HttpException {
    constructor(response: string | object) {
        super(response, 400);
    }
}