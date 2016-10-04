'use strict';
import menuStore from '../menuStore';

describe("menuStore", () => {	
	let mockMenus = [
		{
			id: 1,
			title: "starter",
			href:"/starter",
			active: "false"
		},
		{
			id: 2,
			title: "main",
			href: "/main",
			active: "false",
		},
		{
			id: 3,
			title: "desert",
			href: "/desert",
			active: "false"
		}
	];

	menuStore.setMenus(mockMenus);

	it("getMenuByName", () => {
		expect(menuStore.getMenuByName("starter")).toEqual({
			id: 1,
			title: 'starter',
			href: '/starter',
			active: 'false'
		});

		expect(menuStore.getMenuByName("fdasfstarter")).toEqual(false);
	});

})
