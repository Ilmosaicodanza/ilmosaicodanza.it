// Copyright 2018 Kensho Technologies, LLC.
import * as React from 'react';
import PropTypes from 'prop-types';
import * as CustomPropTypes from '../CustomPropTypes'; // component that positions and styles the left label of the `Chart` component

export default function LabelLeft(props) {
  var plotRect = props.plotRect,
      text = props.text,
      theme = props.theme;
  var style = {
    fontSize: theme.axisLabelFontSize,
    fontWeight: theme.axisLabelFontWeight,
    left: 0,
    overflow: 'hidden',
    position: 'absolute',
    textAlign: 'center',
    textOverflow: 'ellipsis',
    top: plotRect.y,
    transform: 'translate(-100%) rotate(-90deg)',
    transformOrigin: '100% 0',
    whiteSpace: 'nowrap',
    width: plotRect.height
  };
  return React.createElement("div", {
    style: style
  }, text);
}
LabelLeft.propTypes = process.env.NODE_ENV !== "production" ? {
  plotRect: CustomPropTypes.plotRect.isRequired,
  text: PropTypes.string,
  theme: CustomPropTypes.theme.isRequired
} : {};