'use strict';

import basketStore from "../basketStore.js";

describe("basketstore", () => {
	beforeEach(() => {
		basketStore.emptyBasket();
	});

	it("addToBasket", () => {
		let result = basketStore.addToBasket({
			id: 1,
			descrition: "test",
			name: "test",
			price: 3
		});

		expect(result).toEqual([{
			id: 1,
			descrition: "test",
			name: "test",
			price: 3,
			quantity: 1
		}]);

		expect(basketStore.getTotal()).toBe(3);

		expect(basketStore.addToBasket({
			id: 1,
			descrition: "test",
			name: "test",
			price: 3
		})).toEqual([{
			id: 1,
			descrition: "test",
			name: "test",
			price: 3,
			quantity: 2
		}]);

		expect(basketStore.getTotal()).toBe(6);

		expect(basketStore.addToBasket({
			id:2,
			descrition: "test2",
			name: "test2",
			price: 4
		})).toEqual([{
			id: 1,
			descrition: "test",
			name: "test",
			price: 3,
			quantity: 2
		},
		{
			id: 2,
			descrition: "test2",
			name: "test2",
			price: 4,
			quantity: 1
		}
		]);

		expect(basketStore.getTotal()).toBe(10);

		expect(basketStore.getTotalQuantity()).toBe(3);
	});

	it("remove item", () => {
		let newArr = [{
			id: 1, 
			descrition: "test",
			name: "test",
			price: 3,
			quantity: 1
		}];

		let result = basketStore.addToBasket({
			id: 1,
			descrition: "test",
			name: "test",
			price: 3
		})

		expect(result).toEqual(newArr);

		basketStore.addToBasket({
			id: 1,
			descrition: "test",
			name: "test",
			price: 3
		});

		expect(basketStore.removeItem(1)).toEqual([{
			id: 1,
			descrition: "test",
			name: "test",
			price: 3,
			quantity: 1
		}]);
	});




});





