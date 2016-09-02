'use strict';
// jest.enableAutomock();
jest.dontMock("../productsStore");

describe("productsStore", () => {
	let productsStore = null;
	let mockProducts = [
		{
			id: 1,
			title: "egg"
		},
		{
			id: 2,
			title: "onion"
		},
		{
			id: 3,
			title: "ginger"
		}
	];

	beforeEach(()=> {
		productsStore = require("../productsStore");
		productsStore.setProducts([].concat(mockProducts));
	});

	it("getProductIndexBaseOnProductId", () => {
		expect(productsStore.getProductIndexBaseOnProductId(3)).toBe(2);
		expect(productsStore.getProductIndexBaseOnProductId(2)).toBe(1);
		expect(productsStore.getProductIndexBaseOnProductId(1)).toBe(0);
	});

	it("deleteProductById", () => {
		productsStore.deleteProductById(1);
		expect(productsStore.getAll().length).toBe(2);

		productsStore.deleteProductById(2);
		expect(productsStore.getAll().length).toBe(1);

		productsStore.deleteProductById(5);
		expect(productsStore.getAll().length).toBe(1);

		productsStore.deleteProductById(3);
		expect(productsStore.getAll().length).toBe(0);
	});

	it("addProduct", () => {
		productsStore.addProduct({
			id:4,
			title:"garlic"
		})

		expect(productsStore.getAll().length).toBe(4);
	});

})
