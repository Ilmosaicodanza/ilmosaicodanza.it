// Copyright 2018 Kensho Technologies, LLC.
import isBrowser from '../constants/isBrowser'; // a shared, cached offscreen canvas

var ctx = isBrowser && document.createElement('canvas').getContext('2d');
export default function withCachedContext(fn) {
  if (!ctx) return fn();
  ctx.save();
  var result = fn(ctx);
  ctx.restore();
  return result;
}