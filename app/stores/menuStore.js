'use strict';

let dispatcher = require('../dispatcher/dispatcher');
let assign = require('object-assign');
let EventEmitter = require('events').EventEmitter;
let menuConstants = require('../constants/menuConstants');


let _menus = [
	{
		title: "HOME",
		href: "/",
		active: true
	},
	{
		title: "STARTER",
		href: "/products/starter",
		active: false
	},
	{
		title: "NODDLES",
		href: "/products/noodle",
		active: false
	},
	{
		title: "RICE",
		href: "/products/rice",
		active: false
	},
	{
		title: "VEGETABLE",
		href: "/products/vegetable",
		active: false
	},
	{
		title: "PORK",
		href: "/products/port",
		active: false
	},
	{
		title: "BEEF",
		href: "/products/beef",
		active: false
	},
	{
		title: "DESERT",
		href: "/products/starter",
		active: false
	}
	];

let CHAGNE_EVENT = "change";

let menuStore = assign({}, EventEmitter.prototype, {

	addChagneListener: function(callback) {
		this.on(CHAGNE_EVENT, () => {
			callback(_menus);
		});
	},

	emitChange: function() {
		this.emit(CHAGNE_EVENT);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHAGNE_EVENT, callback);
	},

	getMenus: function() {
		return _menus;
	},

	setMenus: function(newMenus) {
		_menus = [].concat(newMenus);
	},

	setActiveMenu: function(url) {
		let newMenus = [].concat(_menus);

		newMenus.map((v) => {
			if(v.href == url) {
				v.active = true;
			}else{
				v.active = false;
			}
		});

		_menus = newMenus;
	},

	index: dispatcher.register((payLoad) => {
		switch(payLoad.action) {
			case menuConstants.SET_ACTIVE_URL:
				menuStore.setActiveMenu(payLoad.data);
				menuStore.emitChange();
				break;
			default:
				break;
		}
	})
});

module.exports = menuStore;