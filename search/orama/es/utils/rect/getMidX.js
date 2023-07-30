// Copyright 2018 Kensho Technologies, LLC.
import rectBase from './rectBase';
/**
 * Get the medium `x` of a `Rect`
 * @memberOf  /utils/rectUtils
 *
 * @param  {Rect} rectInput
 * @return {number}
 */

export default function getMidX(rectInput) {
  var rect = Object.assign({}, rectBase, rectInput);
  return rect.x + rect.width / 2;
}