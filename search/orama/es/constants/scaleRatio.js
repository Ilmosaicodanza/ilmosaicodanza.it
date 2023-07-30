// Copyright 2018 Kensho Technologies, LLC.
import isBrowser from './isBrowser';
var devicePixelRatio = isBrowser ? window.devicePixelRatio : 1;
var ctx = isBrowser ? document.createElement('canvas').getContext('2d') : {};
var backingStoreRatio = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1; // the ratio by which a canvas should be scaled to match the display DPI

export default devicePixelRatio / backingStoreRatio;