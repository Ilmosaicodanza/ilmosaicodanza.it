// Copyright 2018 Kensho Technologies, LLC.
export default function createLayerComponent(plot) {
  var Layer = function Layer() {
    return null;
  };

  if (plot) Layer.defaultProps = {
    plot: plot
  };
  return Layer;
}