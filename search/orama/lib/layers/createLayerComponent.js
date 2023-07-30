"use strict";

exports.__esModule = true;
exports.default = createLayerComponent;

// Copyright 2018 Kensho Technologies, LLC.
function createLayerComponent(plot) {
  var Layer = function Layer() {
    return null;
  };

  if (plot) Layer.defaultProps = {
    plot: plot
  };
  return Layer;
}