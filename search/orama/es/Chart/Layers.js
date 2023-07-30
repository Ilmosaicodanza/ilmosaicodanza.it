import _map from "lodash/map";
// Copyright 2018 Kensho Technologies, LLC.
import * as React from 'react';
import PropTypes from 'prop-types';
import * as CustomPropTypes from '../CustomPropTypes';
import Canvas from '../canvas/Canvas';
import basicRender from '../canvas/basicRender';
export default function Layers(props) {
  var backgroundOffset = props.backgroundOffset,
      height = props.height,
      plotRect = props.plotRect,
      renderLayers = props.renderLayers,
      theme = props.theme,
      width = props.width;
  return _map(renderLayers, function (renderLayer, i) {
    return React.createElement(Canvas, {
      backgroundOffset: backgroundOffset,
      clip: true,
      height: height,
      key: i,
      layerProps: renderLayer.layerProps,
      plotRect: plotRect,
      render: basicRender,
      renderData: renderLayer.renderData,
      theme: theme,
      width: width
    });
  });
}
Layers.propTypes = process.env.NODE_ENV !== "production" ? {
  backgroundOffset: PropTypes.number,
  height: PropTypes.number,
  plotRect: CustomPropTypes.plotRect.isRequired,
  renderLayers: PropTypes.arrayOf(PropTypes.object),
  theme: CustomPropTypes.theme.isRequired,
  width: PropTypes.number
} : {};