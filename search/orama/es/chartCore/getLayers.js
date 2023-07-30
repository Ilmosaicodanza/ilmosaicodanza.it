// Copyright 2018 Kensho Technologies, LLC.
import * as React from 'react';
export default function getLayers(props) {
  var layers = React.Children.map(props.children, function (child) {
    return child && child.props.plot ? child.props : undefined;
  });
  return {
    layers: layers
  };
}