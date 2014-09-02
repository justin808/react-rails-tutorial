/** @jsx React.DOM */

var React = require('react');
var classSet = require('./utils/classSet');
var BootstrapMixin = require('./BootstrapMixin');


var Popover = React.createClass({displayName: 'Popover',
  mixins: [BootstrapMixin],

  propTypes: {
    placement: React.PropTypes.oneOf(['top','right', 'bottom', 'left']),
    positionLeft: React.PropTypes.number,
    positionTop: React.PropTypes.number,
    arrowOffsetLeft: React.PropTypes.number,
    arrowOffsetTop: React.PropTypes.number,
    title: React.PropTypes.renderable
  },

  getDefaultProps: function () {
    return {
      placement: 'right'
    };
  },

  render: function () {
    var classes = {};
    classes['popover'] = true;
    classes[this.props.placement] = true;
    classes['in'] = this.props.positionLeft != null || this.props.positionTop != null;

    var style = {};
    style['left'] = this.props.positionLeft;
    style['top'] = this.props.positionTop;
    style['display'] = 'block';

    var arrowStyle = {};
    arrowStyle['left'] = this.props.arrowOffsetLeft;
    arrowStyle['top'] = this.props.arrowOffsetTop;

    return (
      React.DOM.div( {className:classSet(classes), style:style}, 
        React.DOM.div( {className:"arrow", style:arrowStyle} ),
        this.props.title ? this.renderTitle() : null,
        React.DOM.div( {className:"popover-content"}, 
            this.props.children
        )
      )
    );
  },

  renderTitle: function() {
    return (
      React.DOM.h3( {className:"popover-title"}, this.props.title)
    );
  }
});

module.exports = Popover;