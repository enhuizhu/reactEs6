'use strict';

jest.dontMock("../menu.jsx");

import Menu from "../menu.jsx";
import React from "react/addons";

describe("menu component", () => {
	let myTestUtils = null,
		component = null,
		data = null;


	beforeEach(() => {
		let {TestUtils} = React.addons;
		
		data = [
			{
				id: 1,
				title: "egg", 
				href: "#egg",
				active: true
			},
			{
				id: 2,
				title: "onion",
				href: "#onion",
				active: false
			},
			{
				id: 3,
				title: "ginger",
				href: "#genger",
				active: false
			}
		];

		myTestUtils = TestUtils;
	});

	it("render list of link", () => {
		component = myTestUtils.renderIntoDocument(<Menu data={data}/>);
		let list = myTestUtils.findRenderedDOMComponentWithTag(component, "ul");
		
		expect(list.props.children.length).toEqual(3);

		list.props.children.forEach((child, index) => {
			expect(child.type).toEqual("li");
			expect(child.key).toEqual(index.toString());
		});

		let activeLink = myTestUtils.findRenderedDOMComponentWithClass(component, "active");
		expect(activeLink.props.href).toEqual("#egg");
		expect(activeLink.props.className).toEqual("active");
		expect(activeLink.props.children).toEqual("egg");
	});

	it("when active link change, the dom shoud updated", () => {
		data[0].active = false;
		data[1].active = true;
		component = myTestUtils.renderIntoDocument(<Menu data={data}/>);

		let activeLink = myTestUtils.findRenderedDOMComponentWithClass(component, "active");
		expect(activeLink.props.href).toEqual("#onion");
		expect(activeLink.props.className).toEqual("active");
		expect(activeLink.props.children).toEqual("onion");
	});
});



