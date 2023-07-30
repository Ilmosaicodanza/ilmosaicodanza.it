"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _bars = _interopRequireDefault(require("../plot/bars"));

var _createLayerComponent = _interopRequireDefault(require("./createLayerComponent"));

// Copyright 2018 Kensho Technologies, LLC.
var _default = (0, _createLayerComponent.default)(_bars.default);

exports.default = _default;