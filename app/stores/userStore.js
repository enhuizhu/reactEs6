import dispatcher from "../dispatcher/dispatcher";
import userConstrants from "../constants/userConstants";
import assign from "object-assign";
import _ from "underscore";

let EventEmitter = require("events").EventEmitter;

let userStore = assign({}, EventEmitter.prototype, {
	setToken: function(token) {
		sessionStorage.setItem("token", token);
	},

	getToken: function(token) {
		sessionStorage.getItem("token", token);
	},

	isLogin: function() {
		return _.isEmpty(sessionStorage.getItem("token")) ? false : true;
	},

	logout: function() {
		sessionStorage.removeItem("token");
		sessionStorage.removeItem("userInfo");
	},

	setUserInfo: function(userInfo) {
		sessionStorage.setItem("userInfo",userInfo);
	},

	getUserInfo: function() {
		return sessionStorage.getItem(userInfo);
	},

	registerUserLogin: function(callback) {
		this.on(userConstrants.LOGIN, callback);
	},

	registerUserLogout: function(callback) {
		this.on(userConstrants.LOGOUT, callback);
	},

	removeUserLoginListener: function(callback) {
		this.removeListener(userConstrants.LOGIN, callback);
	},

	removeUserLogoutListener: function(callback) {
		this.removeListener(userConstrants.LOGOUT, callback);
	},

	emitUserLogin: function() {
		this.emit(userConstrants.LOGIN);
	},

	emitUserLogout: function() {
		this.emit(userConstrants.LOGOUT);
	},

	dispatcherIndex: dispatcher.register((payLoad) => {
		switch(payLoad.action) {
			case userConstrants.SET_TOKEN:
				userStore.setToken(payLoad.data.token);
				userStore.setUserInfo(payLoad.data.username);
				userStore.emitUserLogin();
				break;

			case userConstrants.LOGOUT:
				userStore.logout();
				userStore.emitUserLogout();
				break;
			default:
				break;
		}

	})
});

module.exports = userStore;
