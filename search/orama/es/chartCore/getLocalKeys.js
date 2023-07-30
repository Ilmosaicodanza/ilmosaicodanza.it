import _pick from "lodash/pick";
import _map from "lodash/map";
import _keys from "lodash/keys";
import { ACCESSORS_NAMES } from '../defaults';
export function layerMapper(layer) {
  var localAccessors = _pick(layer, layer.accessorsNames || ACCESSORS_NAMES);

  return Object.assign({}, layer, {
    localAccessors: localAccessors,
    localKeys: _keys(localAccessors)
  });
}
export default function getLocalKeys(props) {
  return {
    layers: _map(props.layers, layerMapper)
  };
}