import _sortBy from "lodash/sortBy";
import _some from "lodash/some";
import _reduce from "lodash/reduce";
import _omit from "lodash/omit";
import _map from "lodash/map";
import _isNaN from "lodash/isNaN";
import _head from "lodash/head";
import _get from "lodash/get";
import getScaleKeyByHash from '../plot/getScaleKeyByHash';
import getTooltipFormat from '../chartCore/getTooltipFormat';
var ACCESSORS_TOOLTIP_ORDER = {
  y: 1,
  y0: 2,
  y1: 3,
  y2: 4,
  x: 5,
  x0: 6,
  x1: 7,
  x2: 8,
  radius: 9,
  fill: 10,
  stroke: 11,
  lineWidth: 12
};

function getDatum(data) {
  return Array.isArray(data) ? _head(data) : data;
}

function isDisplayable(value) {
  return value !== 'NaN' && value !== undefined && !_isNaN(value);
}

var tooltipValuesForStrings = function tooltipValuesForStrings(tooltipExtraDimensions, datum) {
  return _reduce(tooltipExtraDimensions, function (acc, key) {
    var rawValue = _get(datum, key);

    var value = rawValue instanceof Date ? rawValue.toDateString() : rawValue;
    if (isDisplayable(value)) acc.push({
      name: key,
      value: value
    });
    return acc;
  }, []);
};

function tooltipValuesForObjects(tooltipExtraDimensions, datum) {
  return _map(tooltipExtraDimensions, function (obj) {
    var accessor = obj.accessor,
        value = obj.value,
        _obj$format = obj.format,
        format = _obj$format === void 0 ? function (d) {
      return d;
    } : _obj$format,
        name = obj.name;
    return {
      name: name || accessor,
      value: format(value || _get(datum, accessor))
    };
  });
}

function getExtraTooltipValues(props, datum) {
  var tooltipExtraDimensions = props.tooltipExtraDimensions;
  return _some(tooltipExtraDimensions, function (dimension) {
    return typeof dimension === 'string';
  }) ? tooltipValuesForStrings(tooltipExtraDimensions, datum) : tooltipValuesForObjects(tooltipExtraDimensions, datum);
}
/* eslint-disable react/destructuring-assignment */


export default function extractTooltipData(props, hoverData) {
  var localKeys = props.localKeys,
      tooltipKeys = props.tooltipKeys,
      _props$accessorsToolt = props.accessorsTooltipOrder,
      accessorsTooltipOrder = _props$accessorsToolt === void 0 ? ACCESSORS_TOOLTIP_ORDER : _props$accessorsToolt;
  var datum = getDatum(hoverData);

  var tooltipValues = _reduce(tooltipKeys || localKeys, function (acc, key) {
    var scaleKey = getScaleKeyByHash(props, key);
    var keyAlias = props[key + "Alias"] || key;
    var name = props[key + "Name"] || props[key];
    var formatter = props[scaleKey + "TooltipFormat"] || getTooltipFormat(props, scaleKey);
    var value = formatter(_get(datum, props[key]));
    var order = accessorsTooltipOrder[key];
    if (isDisplayable(value)) acc.push({
      key: keyAlias,
      name: name,
      value: value,
      order: order
    });
    return acc;
  }, []);

  var extraTooltipValues = getExtraTooltipValues(props, datum);

  var orderedTooltipValues = _map(_sortBy(tooltipValues, 'order'), function (values) {
    return _omit(values, 'order');
  });

  var title = props.titleValue || datum[props.title];
  var values = orderedTooltipValues.concat(extraTooltipValues);
  return {
    title: title,
    values: values
  };
}