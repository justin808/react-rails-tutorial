/** @jsx React.DOM */

var React = require('react');
var AffixMixin = require('./AffixMixin');
var domUtils = require('./utils/domUtils');

var Affix = React.createClass({displayName: 'Affix',
  statics: {
    domUtils: domUtils
  },

  mixins: [AffixMixin],

  render: function () {
    var holderStyle = {top: this.state.affixPositionTop};
    return this.transferPropsTo(
      React.DOM.div( {className:this.state.affixClass, style:holderStyle}, 
        this.props.children
      )
    );
  }
});

module.exports = Affix;