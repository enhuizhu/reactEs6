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
	},

	registerUserLogin: function(callback) {
		this.on(userConstrants.LOGIN, callback);
	},

	registerUserLogout: function(callback) {
		this.on(userConstrants.LOGOUT, callback);
	},

	removeUserLoginListener: function(callback) {
		this.removeListener(constrants.LOGIN, callback);
	},

	removeUserLogoutListener: function(callback) {
		this.removeListener(constrants.LOGOUT, callback);
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
				this.setToken(payLoad.token);
				this.emitUserLogin();
				break;

			case userConstrants.LOGOUT:
				this.logout();
				this.emitUserLogout();
				break;
			default:
				break;
		}

	})
});

module.exports = userStore;
