import _some from "lodash/some";
import _reduce from "lodash/reduce";
import _map from "lodash/map";
import _last from "lodash/last";
import _isEmpty from "lodash/isEmpty";
import _head from "lodash/head";
import _get from "lodash/get";
import _findIndex from "lodash/findIndex";
import _find from "lodash/find";
import getPath2D from '../utils/getPath2D';
import notPlotNumber from '../utils/notPlotNumber';
import plotValue from './plotValue';
import getPlotValues from './getPlotValues';
import splineInterpolation from './splineInterpolation'; // `points` is used to generate render data for lines and multilines
// it handles `x`, `y`, 'stroke'(color) and 'lineWisdth'

export function getPointData(props, datum) {
  var path2D = getPath2D();
  var x = plotValue(props, datum, undefined, 'x');
  var y = plotValue(props, datum, undefined, 'y');
  var r = plotValue(props, datum, undefined, 'strokeWidth', 2) + 1.5;
  if (notPlotNumber([x, y, r])) return undefined;
  path2D.arc(x, y, r, 0, 2 * Math.PI);
  return {
    hoverAlpha: 0.8,
    path2D: path2D,
    type: 'area'
  };
}

var getHoverSolverObj = function getHoverSolverObj(props, renderDatum, hoverData) {
  return {
    hoverRenderData: [renderDatum, getPointData(props, hoverData)],
    renderDatum: renderDatum,
    hoverData: hoverData
  };
};
/* eslint-disable react/destructuring-assignment */


export function hoverSolver(props, _hoverData, renderDatum, localMouse) {
  var xRaw = props.xScale.invert(localMouse.x);

  if (props.xType === 'ordinal') {
    var _hoverData2 = _find(_hoverData, function (d) {
      return _get(d, props.x) === xRaw;
    });

    return getHoverSolverObj(props, renderDatum, _hoverData2);
  }

  var hoverIndex = _findIndex(_hoverData, function (d) {
    return _get(d, props.x) > xRaw;
  });

  if (hoverIndex === 0) {
    var _hoverData3 = _hoverData[hoverIndex];
    return getHoverSolverObj(props, renderDatum, _hoverData3);
  }

  if (hoverIndex === -1) {
    var _hoverData4 = _last(_hoverData);

    return getHoverSolverObj(props, renderDatum, _hoverData4);
  }

  var px = _get(_hoverData[hoverIndex], props.x);

  var x = _get(_hoverData[hoverIndex - 1], props.x);

  if (xRaw - px < x - xRaw) {
    var _hoverData5 = _hoverData[hoverIndex - 1];
    return getHoverSolverObj(props, renderDatum, _hoverData5);
  }

  var hoverData = _hoverData[hoverIndex];
  return getHoverSolverObj(props, renderDatum, hoverData);
} // generate the array of render data

function getLineRenderData(props, data, idx) {
  if (_isEmpty(data)) return undefined;
  var path2D = getPath2D();
  var values = getPlotValues(props, _head(data), idx, {
    hoverAlpha: 0.2
  });

  if (props.interpolate) {
    splineInterpolation(props, data, path2D);
  } else {
    path2D.moveTo(values.x, values.y);

    _reduce(data, function (shouldDrawPoint, d) {
      var x = plotValue(props, d, idx, 'x');
      var y = plotValue(props, d, idx, 'y');
      if (notPlotNumber([x, y])) return false;
      if (shouldDrawPoint) path2D.lineTo(x, y);else path2D.moveTo(x, y);
      return true;
    }, true);
  }

  return Object.assign({}, values, {
    data: data,
    hoverSolver: hoverSolver,
    path2D: path2D,
    type: 'line'
  });
}

export default function lines(props) {
  if (!props.xScale || !props.yScale) return undefined;
  var data = _some(props.data, Array.isArray) ? props.data : [props.data];
  return _map(data, function (d, i) {
    return getLineRenderData(props, d, i);
  });
}