import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import _map from "lodash/map";
// Copyright 2018 Kensho Technologies, LLC.
import * as React from 'react';
import PropTypes from 'prop-types';
import * as CustomPropTypes from '../CustomPropTypes';
import extractTooltipData from './extractTooltipData';

var getPadding = function getPadding(theme) {
  return theme.tooltipFontSize / 2;
};

var Tooltip =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(Tooltip, _React$PureComponent);

  function Tooltip() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args)) || this;

    _this.renderRow = function (d, i) {
      var _this$props = _this.props,
          layerProps = _this$props.layerProps,
          theme = _this$props.theme;
      var showKeys = !!layerProps.tooltipShowKeys;
      var padding = getPadding(theme);
      var style = {
        background: i % 2 ? theme.tooltipBackgroundFill : theme.tooltipEvenBackgroundFill
      };
      var keyStyle = {
        borderRight: "2px solid " + theme.tooltipKeyBorderStroke,
        padding: padding
      };
      var nameStyle = {
        padding: padding,
        textAlign: 'left',
        verticalAlign: 'top'
      };
      var valueStyle = {
        fontFamily: theme.fontFamilyMono,
        fontSize: theme.tooltipValueFontSize,
        padding: padding,
        textAlign: 'right',
        verticalAlign: 'top'
      };
      return React.createElement("tr", {
        style: style,
        key: i
      }, !!showKeys && React.createElement("td", {
        style: keyStyle
      }, d.key), React.createElement("td", {
        style: nameStyle
      }, d.name), React.createElement("td", {
        style: valueStyle
      }, d.value));
    };

    return _this;
  }

  var _proto = Tooltip.prototype;

  _proto.render = function render() {
    var _this$props2 = this.props,
        hoverData = _this$props2.hoverData,
        layerProps = _this$props2.layerProps,
        theme = _this$props2.theme;

    var _extractTooltipData = extractTooltipData(layerProps, hoverData),
        title = _extractTooltipData.title,
        values = _extractTooltipData.values;

    var style = {
      background: theme.tooltipBackgroundFill,
      boxShadow: "1px 1px 1px " + theme.tooltipBoxShadowFill,
      color: theme.tooltipTextFill,
      fontFamily: theme.fontFamily,
      fontSize: theme.tooltipFontSize,
      maxWidth: 320,
      opacity: 0.96
    };
    var titleStyle = {
      fontSize: theme.tooltipTitleFontSize,
      fontWeight: theme.tooltipTitleFontWeight,
      padding: getPadding(theme),
      textAlign: 'left',
      verticalAlign: 'top'
    };
    return React.createElement("div", {
      style: style
    }, !!title && React.createElement("div", {
      style: titleStyle
    }, title), React.createElement("table", {
      style: {
        width: '100%',
        borderCollapse: 'collapse'
      }
    }, React.createElement("tbody", null, _map(values, this.renderRow))));
  };

  return Tooltip;
}(React.PureComponent);

export { Tooltip as default };
Tooltip.propTypes = process.env.NODE_ENV !== "production" ? {
  hoverData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  layerProps: PropTypes.object.isRequired,
  // eslint-disable-line react/forbid-prop-types
  theme: CustomPropTypes.theme
} : {};