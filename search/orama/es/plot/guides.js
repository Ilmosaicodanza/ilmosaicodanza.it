import _isNumber from "lodash/isNumber";
import _flatten from "lodash/flatten";
import _map from "lodash/map";
import getMinX from '../utils/rect/getMinX';
import getMaxX from '../utils/rect/getMaxX';
import getMinY from '../utils/rect/getMinY';
import getMaxY from '../utils/rect/getMaxY';
import getPath2D from '../utils/getPath2D';
import getPlotValues from './getPlotValues';

function getGuideRenderData(props, datum, idx) {
  var backgroundOffset = props.backgroundOffset,
      plotRect = props.plotRect;
  var path2D = getPath2D();
  var values = getPlotValues(props, datum, idx);

  if (_isNumber(values.x)) {
    path2D.moveTo(values.x, getMinY(plotRect) - backgroundOffset);
    path2D.lineTo(values.x, getMaxY(plotRect) + backgroundOffset);
  } else if (_isNumber(values.y)) {
    path2D.moveTo(getMinX(plotRect) - backgroundOffset, values.y);
    path2D.lineTo(getMaxX(plotRect) + backgroundOffset, values.y);
  }

  return Object.assign({}, values, {
    path2D: path2D,
    type: 'line'
  });
}

export default function guides(props) {
  if (!props.xScale && !props.yScale) return undefined;
  return _map(_flatten(props.data), function (datum, idx) {
    return getGuideRenderData(props, datum, idx);
  });
}