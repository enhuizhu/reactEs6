'use strict';

jest.dontMock("../product.jsx");

import Products from "../product.jsx";
import React from "react/addons";
import productsStore from "../../stores/productsStore.js";

describe("product component", () => {
	let myTestUtils = null,
		component = null;


	beforeEach(() => {
		let {TestUtils} = React.addons;
		
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

		let config = {
			products: mockProducts
		}

		myTestUtils = TestUtils;
		component = myTestUtils.renderIntoDocument(<Products config={config}/>);
	});

	it("render list of products", function() {
		let list = myTestUtils.findRenderedDOMComponentWithTag(component, "ul");
		
		expect(list.props.children.length).toEqual(3);

		list.props.children.forEach((child, index) => {
			expect(child.type).toEqual("li");
			expect(child.key).toEqual((index + 1).toString());
		});
	});
});



