"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _points = _interopRequireDefault(require("../plot/points"));

var _createLayerComponent = _interopRequireDefault(require("./createLayerComponent"));

// Copyright 2018 Kensho Technologies, LLC.
var _default = (0, _createLayerComponent.default)(_points.default);

exports.default = _default;