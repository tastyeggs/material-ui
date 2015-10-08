var React = require('react');
var Classable = require('./mixins/classable');
var DialogWindow = require('./dialog-window.jsx');
var FlatButton = require('./flat-button.jsx');
var IconButton = require('./icon-button.jsx');

var Dialog = React.createClass({

  mixins: [Classable],

  propTypes: {
    title: React.PropTypes.string,
    actions: React.PropTypes.array,
    showCloseButton: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      actions: []
    };
  },

  render: function() {
    var {
      className,
      title,
      actions,
      ...other
    } = this.props;
    var classes = this.getClasses('mui-dialog');
    var actions = this._getDialogActions();

    var closeButton = this.props.showCloseButton? (
      <svg version="1.1" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" onClick={this.dismiss}>
          <g><g>
              <path d="M75.765,18.367c-2.334-2.333-6.152-2.333-8.484,0L50.309,35.338L33.338,18.367c-2.333-2.333-6.152-2.333-8.485,0    l-8.485,8.485c-2.333,2.334-2.333,6.152,0,8.485l16.97,16.971l-16.97,16.971c-2.333,2.333-2.333,6.151,0,8.485l8.485,8.485    c2.333,2.333,6.152,2.333,8.485,0l16.971-16.971L67.28,86.25c2.332,2.333,6.15,2.333,8.484,0l8.486-8.485    c2.332-2.334,2.332-6.152,0-8.485L67.28,52.309l16.971-16.971c2.332-2.333,2.332-6.152,0-8.485L75.765,18.367z">
              </path>
          </g></g>
      </svg>
    ) : null;

    return (
      <DialogWindow
        {...other}
        ref="dialogWindow"
        className={classes}
        actions={actions}>

        <h3 className="mui-dialog-title">{this.props.title}{closeButton}</h3>
        <div ref="dialogContent" className="mui-dialog-content">
          {this.props.children}
        </div>

      </DialogWindow>
    );
  },

  dismiss: function() {
    this.refs.dialogWindow.dismiss();
  },

  show: function() {
    this.refs.dialogWindow.show();
  },

  _getDialogActions: function() {
    return this.props.actions.map(function(a, index) {
      var onClickHandler = a.onClick ? a.onClick : this.dismiss;
      return (
        <FlatButton
          key={index}
          secondary={true}
          onClick={onClickHandler}
          label={a.text} />
      );
    }.bind(this));
  }

});

module.exports = Dialog;