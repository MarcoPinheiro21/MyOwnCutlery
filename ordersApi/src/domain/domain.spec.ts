import { Address } from "./address.domain";
import { Customer } from "./customer.domain";
import { Order } from "./order.domain";
import { OrderStates } from "../enums/orderStates.enum";
import { CustomerDetails } from "./customer-details.domain";
import { Product } from "./product.domain";

const address = new Address('testStreet', '1000-000', 'testTown', 'testCountry');
const customer = new Customer('id1', 'testName1', '999999999', address, '901000000',
    'email@email.com', 1, 'testUserId1');

const customerDetails = new CustomerDetails(
    customer.getId(),
    customer.getName(),
    customer.getVatNumber(),
    customer.getAddress())

const product1 = new Product('pId1', 10, 'P01');
const product2 = new Product('pId2', 10, 'P02');
const products: Product[] = [product1, product2];

const order = new Order('ordId', customerDetails, products, '2019-12-31T00:00:00', OrderStates.INPROGRESS);
const order2 = new Order('ordId', customerDetails, products, '2019-12-31T00:00:00', OrderStates.COMPLETED);
const order3 = new Order('ordId', customerDetails, products, '2019-12-31T00:00:00', OrderStates.CANCELLED);


describe('Domain Address', () => {

    it('should be defined', () => {
        expect(address).toBeDefined();
    });

    describe('setStreet', () => {
        it('should throw when new street is null or has invalid length', async () => {
            expect((address.setStreet(''))).rejects.toThrowError('Customer\'s address cannot be empty');
            expect((address.setStreet(null))).rejects.toThrowError('Customer\'s address cannot be empty');
            expect((address.setStreet('newAddress'))).toBeDefined();
        });
    });

    describe('setPostalCode', () => {
        it('should throw when new postal code is null or has invalid length', async () => {
            expect((address.setPostalCode(''))).rejects.toThrowError('Customer\'s postal code should have 4 characters at least');
            expect((address.setPostalCode('110'))).rejects.toThrowError('Customer\'s postal code should have 4 characters at least');
            expect((address.setPostalCode(null))).rejects.toThrowError('Customer\'s postal code should have 4 characters at least');
            expect((address.setPostalCode('2000-999'))).toBeDefined();
        });
    });

    describe('setTown', () => {
        it('should throw when new town is null or has invalid length', async () => {
            expect((address.setTown(''))).rejects.toThrowError('Customer\'s town cannot be empty');
            expect((address.setTown(null))).rejects.toThrowError('Customer\'s town cannot be empty');
            expect((address.setTown('newTown'))).toBeDefined();
        });
    });

    describe('setCountry', () => {
        it('should throw when new country is null or has invalid length', async () => {
            expect((address.setCountry(''))).rejects.toThrowError('Customer\'s country cannot be empty');
            expect((address.setCountry(null))).rejects.toThrowError('Customer\'s country cannot be empty');
            expect((address.setCountry('new Country'))).toBeDefined();
        });
    });

});

describe('Domain Customer', () => {

    it('should be defined', () => {
        expect(customer).toBeDefined();
    });

    describe('updateDeliveryAddress', () => {
        it('should not update customer address if new address fields are null', async () => {

            const spySetStreet = jest.spyOn(address, 'setStreet');
            const spySetPostalCode = jest.spyOn(address, 'setPostalCode');
            const spySetTown = jest.spyOn(address, 'setTown');
            const spySetCountry = jest.spyOn(address, 'setCountry');

            customer.updateDeliveryAddress(null, null, null, null);
            expect(spySetStreet).not.toHaveBeenCalled();
            expect(spySetPostalCode).not.toHaveBeenCalled();
            expect(spySetTown).not.toHaveBeenCalled();
            expect(spySetCountry).not.toHaveBeenCalled();

            customer.updateDeliveryAddress('street', '9000', 'town', 'country');
            expect(spySetStreet).toHaveBeenCalled();
            expect(spySetPostalCode).toHaveBeenCalled();
            expect(spySetTown).toHaveBeenCalled();
            expect(spySetCountry).toHaveBeenCalled();
        });
    });

    describe('setName', () => {
        it('should throw exception when new name is null or has invalid length', async () => {
            try {
                customer.setName('');
            } catch (error) {
                expect(error.message).toBe('Customer\'s name cannot be empty ')
            }
        });

        it('should be defined when new name is valid', async () => {
            const spy = jest.spyOn(customer, 'setName');
            customer.setName('newCustomerName')
            expect(spy).toHaveBeenCalled();
        });
    });

    describe('setVatNumber', () => {
        it('should throw exception when new VatNumber is null or has invalid length', async () => {
            try {
                customer.setVatNumber('');
            } catch (error) {
                expect(error.message).toBe('Customer\'s vat number is invalid')
            }
        });

        it('should throw exception when new VatNumber does not follow regex [0-9]{9}', async () => {
            try {
                customer.setVatNumber('A12999999');
            } catch (error) {
                expect(error.message).toBe('Customer\'s vat number is invalid')
            }
        });

        it('should be defined when new vatNumber is valid', async () => {
            const spy = jest.spyOn(customer, 'setVatNumber');
            customer.setVatNumber('987987987')
            expect(spy).toHaveBeenCalled();
        });
    });

    describe('setPhoneNumber', () => {
        it('should throw exception when new phone number is null or has invalid length', async () => {
            try {
                customer.setPhoneNumber(null);
            } catch (error) {
                expect(error.message).toBe('Customer\'s phone number is invalid')
            }
        });

        it('should throw exception when new phone number does not follow regex [0-9]{9}', async () => {
            try {
                customer.setPhoneNumber('9010010010');
            } catch (error) {
                expect(error.message).toBe('Customer\'s phone number is invalid')
            }
        });

        it('should be defined when new phone number is valid', async () => {
            const spy = jest.spyOn(customer, 'setPhoneNumber');
            customer.setPhoneNumber('987987987')
            expect(spy).toHaveBeenCalled();
        });
    });

    describe('setEmail', () => {
        it('should throw exception when new email is null or has invalid length', async () => {
            try {
                customer.setEmail(null);
            } catch (error) {
                expect(error.message).toBe('Customer\'s email is invalid')
            }
        });

        it('should throw exception when new email has forbidden characters', async () => {
            try {
                customer.setEmail('em#mail@email.com');
            } catch (error) {
                expect(error.message).toBe('Customer\'s email is invalid')
            }
        });

        it('should throw exception when new email does not follow email regex', async () => {
            try {
                customer.setEmail('email@email');
            } catch (error) {
                expect(error.message).toBe('Customer\'s email is invalid')
            }
        });

        it('should be defined when new email is valid', async () => {
            const spy = jest.spyOn(customer, 'setEmail');
            customer.setEmail('newemail@email.com')
            expect(spy).toHaveBeenCalled();
        });
    });

    describe('setPriority', () => {
        it('should throw exception when new priority is null', async () => {
            try {
                customer.setPriority(null);
            } catch (error) {
                expect(error.message).toBe('Customer\'s priority range must be between 1 - 5')
            }
        });

        it('should throw exception when new priority has a invalid value', async () => {
            try {
                customer.setPriority(7);
            } catch (error) {
                expect(error.message).toBe('Customer\'s priority range must be between 1 - 5')
            }
        });

        it('should be defined when new email is valid', async () => {
            const spy = jest.spyOn(customer, 'setPriority');
            customer.setPriority(5)
            expect(spy).toHaveBeenCalled();
        });
    });

    describe('setUserId', () => {
        it('should throw exception when new userId is null', async () => {
            try {
                customer.setUserId(null);
            } catch (error) {
                expect(error.message).toBe('Customer\'s user ID is invalid')
            }
        });

        it('should be defined when new email is valid', async () => {
            const spy = jest.spyOn(customer, 'setUserId');
            customer.setUserId('newUserID')
            expect(spy).toHaveBeenCalled();
        });
    });
});

describe('Domain Order', () => {

    it('should be defined', () => {
        expect(order).toBeDefined();
    });

    describe('addProduct', () => {

        it('should add a new product to order\'s products list', () => {
            expect(order.getProducts().length).toBe(2);
            order.addProduct('pID3', 20, 'P03');
            expect(order.getProducts().length).toBe(3);
            expect(order.getProducts()[2]).toStrictEqual(new Product('pID3', 20, 'P03'));
        });
    });

    describe('updateDeliveryDate', () => {

        it('should throw exception when new date is null', async () => {
            try {
                order.updateDeliveryDate(null);
            } catch (error) {
                expect(error.message).toBe('Delivery date is invalid.')
            }
        });

        it('should throw exception when new date format is invalid', async () => {
            try {
                order.updateDeliveryDate('2020-01-15');
            } catch (error) {
                expect(error.message).toBe('Delivery date is invalid.')
            }
        });

        it('should be defined when new email is valid', async () => {
            const spy = jest.spyOn(order, 'updateDeliveryDate');
            order.updateDeliveryDate('2020-01-15T00:00:00')
            expect(spy).toHaveBeenCalled();
        });
    });

    describe('hasProduct', () => {

        it('should return boolean true if product id exist within order\'s products list', async () => {
            expect(order.hasProduct('pId1')).resolves.toBe(true);
        });

        it('should return boolean false if product id does not exist within order\'s products list', async () => {
            expect(order.hasProduct('pId5')).resolves.toBe(false);
        });
    });

    describe('findProduct', () => {

        it('should return product object if found', async () => {
            expect(order.findProduct('pId1')).resolves.toStrictEqual(new Product('pId1', 10, 'P01'));
        });

        it('should return null if products does not exist', async () => {
            expect(order.findProduct('pId5')).resolves.toBe(null);
            console.log(order.getProducts().length);
        });
    });

    describe('deleteProduct', () => {

        it('should return null if products does not exist', async () => {
            expect(order.getProducts().length).toBe(3);
            expect(order.deleteProduct('pId15')).resolves.toBe(null);
            expect(order.getProducts().length).toBe(3);
        });

        it('should deleteProduct product object if found', async () => {
            expect(order.getProducts().length).toBe(3);
            let resultOrder: Order = await order.deleteProduct('pID3');
            expect(resultOrder.getProducts().length).toBe(2);
        });

    });

    describe('cancelOrder', () => {

        it('should throw exception when the order status is completed', async () => {
            expect(order2.cancel()).rejects.toThrowError('The order has already been completed.');
        });

        it('should throw exception when the order status is already cancelled', async () => {
            expect(order3.cancel()).rejects.toThrowError('The order has already been cancelled.');
        });

        it('should change order status to Cnacelled when order status is IN PROGRESS', async () => {
            let orderResult = order.cancel();
            expect((await orderResult).getStatus()).toBe('Cancelled');
        });

    });

});