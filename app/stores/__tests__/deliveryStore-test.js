import deliveryStore from '../deliveryStore';

describe("deliveryStore", () => {
	it('genearteFullAddress', () => {
		deliveryStore.setAddress({
			tel: '07688632087',
			address1: 'flat 3 rainbow court',
			address2: 'chipley street',
			city: undefined,
			postCode:'se14, 6ez'
		});

		let expectedResult = 'flat 3 rainbow court, chipley street, se14, 6ez';
		expect(deliveryStore.genearteFullAddress()).toBe(expectedResult);
	});
});