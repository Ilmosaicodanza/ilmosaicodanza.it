"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = Layers;

var _map2 = _interopRequireDefault(require("lodash/map"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var CustomPropTypes = _interopRequireWildcard(require("../CustomPropTypes"));

var _Canvas = _interopRequireDefault(require("../canvas/Canvas"));

var _basicRender = _interopRequireDefault(require("../canvas/basicRender"));

// Copyright 2018 Kensho Technologies, LLC.
function Layers(props) {
  var backgroundOffset = props.backgroundOffset,
      height = props.height,
      plotRect = props.plotRect,
      renderLayers = props.renderLayers,
      theme = props.theme,
      width = props.width;
  return (0, _map2.default)(renderLayers, function (renderLayer, i) {
    return React.createElement(_Canvas.default, {
      backgroundOffset: backgroundOffset,
      clip: true,
      height: height,
      key: i,
      layerProps: renderLayer.layerProps,
      plotRect: plotRect,
      render: _basicRender.default,
      renderData: renderLayer.renderData,
      theme: theme,
      width: width
    });
  });
}

Layers.propTypes = process.env.NODE_ENV !== "production" ? {
  backgroundOffset: _propTypes.default.number,
  height: _propTypes.default.number,
  plotRect: CustomPropTypes.plotRect.isRequired,
  renderLayers: _propTypes.default.arrayOf(_propTypes.default.object),
  theme: CustomPropTypes.theme.isRequired,
  width: _propTypes.default.number
} : {};