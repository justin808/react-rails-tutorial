/** @jsx React.DOM */

var React = require('react');
var ValidComponentChildren = require('./utils/ValidComponentChildren');
var classSet = require('./utils/classSet');

var Badge = React.createClass({displayName: 'Badge',
  propTypes: {
    pullRight: React.PropTypes.bool,
  },

  render: function () {
    var classes = {
      'pull-right': this.props.pullRight,
      'badge': ValidComponentChildren.hasValidComponent(this.props.children)
    };
    return this.transferPropsTo(
      React.DOM.span( {className:classSet(classes)}, 
        this.props.children
      )
    );
  }
});

module.exports = Badge;
