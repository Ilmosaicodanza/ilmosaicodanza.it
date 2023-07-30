"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _brushes = _interopRequireDefault(require("../plot/brushes"));

var _createLayerComponent = _interopRequireDefault(require("./createLayerComponent"));

// Copyright 2018 Kensho Technologies, LLC.
var _default = (0, _createLayerComponent.default)(_brushes.default);

exports.default = _default;