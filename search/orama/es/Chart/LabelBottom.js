// Copyright 2018 Kensho Technologies, LLC.
import * as React from 'react';
import PropTypes from 'prop-types';
import * as CustomPropTypes from '../CustomPropTypes'; // component that positions and styles the bottom label of the `Chart` component

export default function LabelBottom(props) {
  var plotRect = props.plotRect,
      text = props.text,
      theme = props.theme;
  var style = {
    bottom: 0,
    fontSize: theme.axisLabelFontSize,
    fontWeight: theme.axisLabelFontWeight,
    left: plotRect.x,
    overflow: 'hidden',
    position: 'absolute',
    textAlign: 'center',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: plotRect.width
  };
  return React.createElement("div", {
    style: style
  }, text);
}
LabelBottom.propTypes = process.env.NODE_ENV !== "production" ? {
  plotRect: CustomPropTypes.plotRect.isRequired,
  text: PropTypes.string,
  theme: CustomPropTypes.theme.isRequired
} : {};