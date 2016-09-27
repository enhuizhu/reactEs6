'use strict';

let dispatcher = require('../dispatcher/dispatcher');
let menuConstants = require('../constants/menuConstants');
let assign = require('object-assign');
let EventEmitter = require('events').EventEmitter;
let _menus = [];
let CHAGNE_EVENT = "change";

