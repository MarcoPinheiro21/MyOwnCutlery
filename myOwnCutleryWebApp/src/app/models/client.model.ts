import { Address } from './address.model';

export class Client {
  constructor(
    public id: number,
    public name: string,
    public vatNumber: number,
    public address: Address,
    public phoneNumber: number,
    public email: string,
    public priority: number
  ) {}
}
