/** @jsx React.DOM */

module React from 'react';
import { CommentBox } from './CommentBox';

var $ = require('jquery');

var render = function() {
  React.renderComponent(
    <CommentBox url="comments.json" pollInterval={2000} />,
    document.getElementById('content')
  );
}

$(function() {
  render();
  // Next part is to make this work with turbo-links
  $(document).on("page:change", function () {
    if ($("#content").length > 0) {
      render();
    }
  });
});
