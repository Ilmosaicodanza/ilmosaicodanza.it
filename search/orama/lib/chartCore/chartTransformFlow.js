"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = chartTransformFlow;

var _reduce2 = _interopRequireDefault(require("lodash/reduce"));

var _omit2 = _interopRequireDefault(require("lodash/omit"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var PROPS_TO_OMIT = ['onUpdate', 'onState', 'layerProps', 'rootProps']; // Start with the input props, send them to the first transform, merge the returned new props back
// to the props. Do again with the next transform.
// const rootProps = chartTransformFlow(props, t1, t2, t3)

function removeDimArrays(props) {
  var names = (0, _map2.default)(props.groupedKeys, function (key) {
    return key + "Array";
  });
  return (0, _omit2.default)(props, names);
}

function transformFlow(_ref) {
  var first = _ref[0],
      rest = _ref.slice(1);

  return (0, _reduce2.default)(rest, function (acc, d) {
    return Object.assign({}, acc, d(acc));
  }, (0, _omit2.default)(first, PROPS_TO_OMIT));
}

function chartTransformFlow() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return removeDimArrays(transformFlow(args));
}