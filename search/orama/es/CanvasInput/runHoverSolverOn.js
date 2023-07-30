// Copyright 2018 Kensho Technologies, LLC.
export default function runHoverSolverOn(dataUnderMouse) {
  var layerProps = dataUnderMouse.layerProps,
      renderDatum = dataUnderMouse.renderDatum,
      hoverData = dataUnderMouse.hoverData,
      localMouse = dataUnderMouse.localMouse;
  if (!renderDatum || !layerProps) return dataUnderMouse;
  var hoverSolver = layerProps.hoverSolver || renderDatum.hoverSolver;
  if (!hoverSolver) return dataUnderMouse;
  var hoverSolverData = hoverSolver(layerProps, hoverData, renderDatum, localMouse);
  return {
    layerProps: layerProps,
    hoverRenderData: hoverSolverData.hoverRenderData,
    hoverData: hoverSolverData.hoverData,
    renderDatum: renderDatum,
    localMouse: localMouse
  };
}