"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _scatterplotLabels = _interopRequireDefault(require("../plot/scatterplotLabels"));

var _createLayerComponent = _interopRequireDefault(require("./createLayerComponent"));

// Copyright 2018 Kensho Technologies, LLC.
var _default = (0, _createLayerComponent.default)(_scatterplotLabels.default);

exports.default = _default;