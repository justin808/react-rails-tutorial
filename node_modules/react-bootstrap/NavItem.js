/** @jsx React.DOM */

var React = require('react');
var classSet = require('./utils/classSet');
var BootstrapMixin = require('./BootstrapMixin');

var NavItem = React.createClass({displayName: 'NavItem',
  mixins: [BootstrapMixin],

  propTypes: {
    onSelect: React.PropTypes.func,
    active: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    href: React.PropTypes.string,
    title: React.PropTypes.string
  },

  getDefaultProps: function () {
    return {
      href: '#'
    };
  },

  render: function () {
    var classes = {
      'active': this.props.active,
      'disabled': this.props.disabled
    };

    return this.transferPropsTo(
      React.DOM.li( {className:classSet(classes)}, 
        React.DOM.a(
          {href:this.props.href,
          title:this.props.title,
          onClick:this.handleClick,
          ref:"anchor"}, 
          this.props.children
        )
      )
    );
  },

  handleClick: function (e) {
    if (this.props.onSelect) {
      e.preventDefault();

      if (!this.props.disabled) {
        this.props.onSelect(this.props.key,this.props.href);
      }
    }
  }
});

module.exports = NavItem;