"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = scatterplotLabels;

var _map2 = _interopRequireDefault(require("lodash/map"));

var _flatten2 = _interopRequireDefault(require("lodash/flatten"));

var _cloneDeep2 = _interopRequireDefault(require("lodash/cloneDeep"));

var _withCachedContext = _interopRequireDefault(require("../utils/withCachedContext"));

var _labeler = _interopRequireDefault(require("../utils/labeler"));

var _defaults = require("../defaults");

var _getPlotValues = _interopRequireDefault(require("./getPlotValues"));

var localLabeler = (0, _labeler.default)();

function getTextRenderData(props, datum, idx) {
  var plotRect = props.plotRect,
      _props$theme = props.theme,
      theme = _props$theme === void 0 ? _defaults.THEME : _props$theme,
      _props$scatterplotLab = props.scatterplotLabelsBounds,
      scatterplotLabelsBounds = _props$scatterplotLab === void 0 ? true : _props$scatterplotLab;
  var values = (0, _getPlotValues.default)(props, datum, idx, {
    text: '',
    fill: theme.textFill
  });
  var width = (0, _withCachedContext.default)(function (ctx) {
    if (!ctx) return values.text.length;
    ctx.font = theme.plotFontSize + "px " + theme.fontFamilyMono;
    return ctx.measureText(values.text).width;
  });

  if (scatterplotLabelsBounds) {
    if (values.x + width > plotRect.width + plotRect.x) values.x = values.x - width - 20;
    if (values.y < plotRect.y + 20) values.y += 20;
  }

  return Object.assign({}, values, {
    id: idx,
    name: values.text,
    width: width + 10,
    selected: true,
    height: 22,
    textAlign: 'left',
    textBaseline: 'middle',
    type: 'text'
  });
}

function scatterplotLabels(props) {
  if (!props.xScale && !props.yScale) return undefined;
  var labelData = (0, _map2.default)((0, _flatten2.default)(props.data), function (datum, idx) {
    return getTextRenderData(props, datum, idx);
  });
  var anchorData = (0, _map2.default)(labelData, function (d) {
    return {
      x: d.x,
      y: d.y,
      r: 8
    };
  });
  localLabeler.plotRect((0, _cloneDeep2.default)(props.plotRect)).label(labelData).anchor(anchorData).start(100);
  return labelData;
}