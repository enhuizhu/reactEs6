'use strict';

import basketAction from '../basketAction';
import basketStore from '../../stores/basketStore';

describe('basketAction', () => {
	beforeEach(() => {
		basketStore.emptyBasket();
	});

	it('addToBasket', () => {
		basketAction.addToBasket({
			id: 1,
			description: "test",
			name: "test",
			price: 3
		});

		expect(basketStore.getItems()).toEqual([
			{
				id:1,
				description: "test",
				name: "test",
				price: 3,
				quantity: 1
			}
		]);
	});
})