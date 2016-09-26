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
				quantity: 2
			}
		]);

		basketAction.addToBasket({
			id: 2,
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
				quantity: 2
			},
			{
				id: 2,
				description: "test",
				name: "test",
				price: 3,
				quantity: 1
			}
		]);
	});

	it("removeItem", () => {
		basketStore.setItems([
			{
				id:1,
				description: "test",
				name: "test",
				price: 3,
				quantity: 2
			},
			{
				id: 2,
				description: "test",
				name: "test",
				price: 3,
				quantity: 1
			}
		]);



		basketAction.deleteItem({
			id:1,
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
			},
			{
				id: 2,
				description: "test",
				name: "test",
				price: 3,
				quantity: 1
			}
		]);
	});
})