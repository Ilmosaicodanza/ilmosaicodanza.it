// Copyright 2018 Kensho Technologies, LLC.
// generate the renderLayers and renderData by running the plot functions of the props root and
// the props.layers
export default function getLayer(props) {
  var plot = props.plot;
  return {
    layerProps: props,
    renderData: plot ? plot(props) : []
  };
}