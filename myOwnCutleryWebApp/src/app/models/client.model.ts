import { Address } from './address.model';

export class Client {
  constructor(
    public _id: string,
    public name: string,
    public vatNumber: string,
    public address: Address,
    public phoneNumber: string,
    public email: string,
    public priority: number,
    public userId: string
  ) {}
}
