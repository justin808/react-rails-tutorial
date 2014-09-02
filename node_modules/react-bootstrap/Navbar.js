/** @jsx React.DOM */

var React = require('react');
var BootstrapMixin = require('./BootstrapMixin');
var CustomPropTypes = require('./utils/CustomPropTypes');
var classSet = require('./utils/classSet');
var cloneWithProps = require('./utils/cloneWithProps');
var ValidComponentChildren = require('./utils/ValidComponentChildren');
var createChainedFunction = require('./utils/createChainedFunction');
var Nav = require('./Nav');


var Navbar = React.createClass({displayName: 'Navbar',
  mixins: [BootstrapMixin],

  propTypes: {
    fixedTop: React.PropTypes.bool,
    fixedBottom: React.PropTypes.bool,
    staticTop: React.PropTypes.bool,
    inverse: React.PropTypes.bool,
    fluid: React.PropTypes.bool,
    role: React.PropTypes.string,
    componentClass: CustomPropTypes.componentClass,
    brand: React.PropTypes.renderable,
    toggleButton: React.PropTypes.renderable,
    onToggle: React.PropTypes.func,
    navExpanded: React.PropTypes.bool,
    defaultNavExpanded: React.PropTypes.bool
  },

  getDefaultProps: function () {
    return {
      bsClass: 'navbar',
      bsStyle: 'default',
      role: 'navigation',
      componentClass: React.DOM.nav
    };
  },

  getInitialState: function () {
    return {
      navExpanded: this.props.defaultNavExpanded
    };
  },

  shouldComponentUpdate: function() {
    // Defer any updates to this component during the `onSelect` handler.
    return !this._isChanging;
  },

  handleToggle: function () {
    if (this.props.onToggle) {
      this._isChanging = true;
      this.props.onToggle();
      this._isChanging = false;
    }

    this.setState({
      navOpen: !this.state.navOpen
    });
  },

  isNavOpen: function () {
    return this.props.navOpen != null ? this.props.navOpen : this.state.navOpen;
  },

  render: function () {
    var classes = this.getBsClassSet();
    var componentClass = this.props.componentClass;

    classes['navbar-fixed-top'] = this.props.fixedTop;
    classes['navbar-fixed-bottom'] = this.props.fixedBottom;
    classes['navbar-static-top'] = this.props.staticTop;
    classes['navbar-inverse'] = this.props.inverse;

    return this.transferPropsTo(
      componentClass( {className:classSet(classes)}, 
        React.DOM.div( {className:this.props.fluid ? 'container-fluid' : 'container'}, 
          (this.props.brand || this.props.toggleButton || this.props.toggleNavKey) ? this.renderHeader() : null,
          ValidComponentChildren.map(this.props.children, this.renderChild)
        )
      )
    );
  },

  renderChild: function (child) {
    return cloneWithProps(child, {
      navbar: true,
      collapsable: this.props.toggleNavKey != null && this.props.toggleNavKey === child.props.key,
      expanded: this.props.toggleNavKey != null && this.props.toggleNavKey === child.props.key && this.isNavOpen(),
      key: child.props.key,
      ref: child.props.ref
    });
  },

  renderHeader: function () {
    var brand;

    if (this.props.brand) {
      brand = React.isValidComponent(this.props.brand) ?
        cloneWithProps(this.props.brand, {
          className: 'navbar-brand'
        }) : React.DOM.span( {className:"navbar-brand"}, this.props.brand);
    }

    return (
      React.DOM.div( {className:"navbar-header"}, 
        brand,
        (this.props.toggleButton || this.props.toggleNavKey != null) ? this.renderToggleButton() : null
      )
    );
  },

  renderToggleButton: function () {
    var children;

    if (React.isValidComponent(this.props.toggleButton)) {
      return cloneWithProps(this.props.toggleButton, {
        className: 'navbar-toggle',
        onClick: createChainedFunction(this.handleToggle, this.props.toggleButton.props.onClick)
      });
    }

    children = (this.props.toggleButton != null) ?
      this.props.toggleButton : [
        React.DOM.span( {className:"sr-only", key:0}, "Toggle navigation"),
        React.DOM.span( {className:"icon-bar", key:1}),
        React.DOM.span( {className:"icon-bar", key:2}),
        React.DOM.span( {className:"icon-bar", key:3})
    ];

    return (
      React.DOM.button( {className:"navbar-toggle", type:"button", onClick:this.handleToggle}, 
        children
      )
    );
  }
});

module.exports = Navbar;
