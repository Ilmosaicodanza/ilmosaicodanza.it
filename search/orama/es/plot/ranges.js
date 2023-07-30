import _isNumber from "lodash/isNumber";
import _flatten from "lodash/flatten";
import _map from "lodash/map";
import getPath2D from '../utils/getPath2D';
import getPlotValues from './getPlotValues';

function rangesRender(props, datum, idx) {
  var backgroundOffset = props.backgroundOffset,
      plotRect = props.plotRect;
  var path2D = getPath2D();
  var values = getPlotValues(props, datum, idx);

  if (_isNumber(values.x1) && _isNumber(values.x2) && _isNumber(values.y1) && _isNumber(values.y2)) {
    path2D.rect(values.x1, values.y1, values.x2 - values.x1, values.y2 - values.y1);
  } else if (_isNumber(values.x1) && _isNumber(values.x2)) {
    path2D.rect(values.x1, plotRect.y - backgroundOffset, values.x2 - values.x1, plotRect.height + backgroundOffset * 2);
  } else if (_isNumber(values.y1) && _isNumber(values.y2)) {
    path2D.rect(plotRect.x - backgroundOffset, values.y1, plotRect.width + backgroundOffset * 2, values.y2 - values.y1);
  }

  return Object.assign({}, values, {
    path2D: path2D,
    type: 'area'
  });
}

export default function ranges(props) {
  if (!props.xScale && !props.yScale) return undefined;
  return _map(_flatten(props.data), function (datum, idx) {
    return rangesRender(props, datum, idx);
  });
}