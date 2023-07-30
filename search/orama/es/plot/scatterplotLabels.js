import _map from "lodash/map";
import _flatten from "lodash/flatten";
import _cloneDeep from "lodash/cloneDeep";
import withCachedContext from '../utils/withCachedContext';
import labeler from '../utils/labeler';
import { THEME } from '../defaults';
import getPlotValues from './getPlotValues';
var localLabeler = labeler();

function getTextRenderData(props, datum, idx) {
  var plotRect = props.plotRect,
      _props$theme = props.theme,
      theme = _props$theme === void 0 ? THEME : _props$theme,
      _props$scatterplotLab = props.scatterplotLabelsBounds,
      scatterplotLabelsBounds = _props$scatterplotLab === void 0 ? true : _props$scatterplotLab;
  var values = getPlotValues(props, datum, idx, {
    text: '',
    fill: theme.textFill
  });
  var width = withCachedContext(function (ctx) {
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

export default function scatterplotLabels(props) {
  if (!props.xScale && !props.yScale) return undefined;

  var labelData = _map(_flatten(props.data), function (datum, idx) {
    return getTextRenderData(props, datum, idx);
  });

  var anchorData = _map(labelData, function (d) {
    return {
      x: d.x,
      y: d.y,
      r: 8
    };
  });

  localLabeler.plotRect(_cloneDeep(props.plotRect)).label(labelData).anchor(anchorData).start(100);
  return labelData;
}