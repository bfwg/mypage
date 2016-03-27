'use strict';
let React = require('react');
let { SvgIcon } = require('material-ui');
let { PureRenderMixin } = require('react-addons-pure-render-mixin');

const FaceBook = React.createClass({

  displayName: 'FaceBook',

  render() {
    return (
      <SvgIcon {...this.props}>
        <path fill="#3B5998" d="M19,4V7H17A1,1 0 0,0 16,8V10H19V13H16V20H13V13H11V10H13V7.5C13,5.56 14.57,4 16.5,4M20,2H4A2,2 0 0,0 2,4V20A2,2 0 0,0 4,22H20A2,2 0 0,0 22,20V4C22,2.89 21.1,2 20,2Z" />
      </SvgIcon>
    );
  },

});

module.exports = FaceBook;
