import _reduce from "lodash/reduce";
import _omit from "lodash/omit";
import _map from "lodash/map";
var PROPS_TO_OMIT = ['onUpdate', 'onState', 'layerProps', 'rootProps']; // Start with the input props, send them to the first transform, merge the returned new props back
// to the props. Do again with the next transform.
// const rootProps = chartTransformFlow(props, t1, t2, t3)

function removeDimArrays(props) {
  var names = _map(props.groupedKeys, function (key) {
    return key + "Array";
  });

  return _omit(props, names);
}

function transformFlow(_ref) {
  var first = _ref[0],
      rest = _ref.slice(1);

  return _reduce(rest, function (acc, d) {
    return Object.assign({}, acc, d(acc));
  }, _omit(first, PROPS_TO_OMIT));
}

export default function chartTransformFlow() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return removeDimArrays(transformFlow(args));
}