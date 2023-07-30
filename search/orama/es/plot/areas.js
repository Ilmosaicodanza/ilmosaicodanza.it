import _reject from "lodash/reject";
import _last from "lodash/last";
import _isFinite from "lodash/isFinite";
import _isEmpty from "lodash/isEmpty";
import _head from "lodash/head";
import _findIndex from "lodash/findIndex";
import _find from "lodash/find";
import _eachRight from "lodash/eachRight";
import _each from "lodash/each";
import _get from "lodash/get";
import getMaxY from '../utils/rect/getMaxY';
import getPath2D from '../utils/getPath2D';
import notPlotNumber from '../utils/notPlotNumber';
import splitBy from '../utils/splitBy';
import getPlotValues from './getPlotValues';
import plotValue from './plotValue';
export function isPlotNumber(value) {
  return Array.isArray(value) ? value.some(_isFinite) : _isFinite(value);
}

function isNullPoint(props) {
  return function (datum, idx) {
    return plotValue(props, datum, idx, 'x', null) === null || plotValue(props, datum, idx, 'x0', null) === null || plotValue(props, datum, idx, 'y', null) === null || plotValue(props, datum, idx, 'y0', null) === null;
  };
}

export function getPointData(props, datum, yKey) {
  var path2D = getPath2D();
  var x = plotValue(props, datum, undefined, 'x');
  var y = plotValue(props, datum, undefined, yKey);
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
    hoverRenderData: [renderDatum, getPointData(props, hoverData, 'y'), getPointData(props, hoverData, 'y0')],
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
}

function getAreaRenderData(props, data, idx) {
  if (_isEmpty(data)) return {
    showHover: false
  };
  var path2D = getPath2D();
  path2D.moveTo(plotValue(props, _head(data), idx, 'x', 0), plotValue(props, _head(data), idx, 'y', 0));

  _each(data, function (d) {
    var x = plotValue(props, d, idx, 'x');
    var y = plotValue(props, d, idx, 'y');
    if (notPlotNumber([x, y])) return;
    path2D.lineTo(x, y);
  });

  var y0 = plotValue(props, _head(data), idx, 'y0');
  var x0 = plotValue(props, _head(data), idx, 'x0'); // if there's no base position accessors

  if (notPlotNumber(y0) && notPlotNumber(x0)) {
    var localY0 = props.yScale(0) || getMaxY(props.plotRect);
    path2D.lineTo(plotValue(props, _last(data), idx, 'x', 0), localY0);
    path2D.lineTo(plotValue(props, _head(data), idx, 'x', 0), localY0); // if the base is on the y axis
  } else if (isPlotNumber(y0) && notPlotNumber(x0)) {
    _eachRight(data, function (d) {
      var x = plotValue(props, d, idx, 'x');
      var localY0 = plotValue(props, d, idx, 'y0');
      if (notPlotNumber([x, localY0])) return;
      path2D.lineTo(x, localY0);
    }); // if the base is on the x axis

  } else if (notPlotNumber(y0) && isPlotNumber(x0)) {
    _eachRight(data, function (d) {
      var localX0 = plotValue(props, d, idx, 'x0');
      var y = plotValue(props, d, idx, 'y');
      if (notPlotNumber([localX0, y])) return;
      path2D.lineTo(localX0, y);
    });
  }

  path2D.closePath();
  var values = getPlotValues(props, _head(data), idx, {
    hoverAlpha: 0.25
  });
  return Object.assign({}, values, {
    data: data,
    hoverSolver: hoverSolver,
    path2D: path2D,
    type: 'area'
  });
}

function splitDataAtNulls(props, data) {
  var checkNullPoint = isNullPoint(props);
  return _reject(splitBy(data, checkNullPoint).map(function (arr) {
    return _reject(arr, checkNullPoint);
  }), _isEmpty);
}

export default function areas(props) {
  if (!props.xScale || !props.yScale) return undefined;
  var data = splitDataAtNulls(props, props.data);

  if (Array.isArray(_head(data))) {
    return data.reduce(function (acc, datum, idx) {
      return acc.concat(getAreaRenderData(props, datum, idx));
    }, []);
  }

  return [getAreaRenderData(props, props.data)];
}